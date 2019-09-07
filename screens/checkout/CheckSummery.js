import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native'
import Wrapper from '../Home/Wrapper';
import Header from '../major_components/Header';
import {OrderItemsTable} from "../Home/ProfileScreens/OrderItemDetail"

import {connect} from "react-redux";

import {showMessage} from 'react-native-flash-message';
import Loader from '../major_components/Loader';
import CheckoutStatus from "./CheckoutStatus";
import { AuthSession } from 'expo';


export class CheckSummery extends Component {
    constructor(props){
        super(props);
        let {checkoutData}=props;
        this.state={
            payType: checkoutData.payType,
            address: checkoutData.address,
            cardNum: checkoutData.card.number,
            cardName:checkoutData.card.name,
            loading:false,
            checkout_done:false,
            triedCheckout:false
        }
        console.log("this is the data", this.props.cartItems);
    }

    onContinue() {
        this.props.navigation.navigate('Explore');
    }

    processOrder(){


     let {firstname,lastname,email,mobile,area,street,block,lane,id}=this.state.address
     let items=[];
     total_cart_cost=0;
     this.props.cartItems.forEach(item=>{
         total_cart_cost+=item.price*item.quantity;
     })
     this.props.cartItems.map(item=>{
         items.push({
             product_id:item.id,
             quantity:item.quantity,
             price:item.price
         });
     })   
    let obj={
        billing_address:{
            billing_address_id:id||null,
            first_name:firstname,
            last_name:lastname,
            email,
            phone_number:mobile,
            area,street,block,lane
        },

        items,
        total_cart_cost,
        payment_mode:this.state.payType
    }
  /*
  {
      "billing_address": {
          "billing_address_id": 25,
          "first_name": "zdgse",
          "last_name": "sgsgsg",
          "email": "sgsg.sgs@sgs.com",
          "phone_number": "8106492369",
          "area": "fsfsfs",
          "street": "fsfsfs",
          "block": "gsgsfss",
          "lane": "sgsggs"
      },
      "items": [{
          "product_id": 2,
          "quantity": 2
      }],
      "total_cart_cost": 50,
      "payment_mode": "Cash"
  }
  */
 /*
 addToCart() {
     obj = {
         product_id: this.state.product.id,
         price: this.state.product.price,
         quantity: this.state.product.quantity
     };
     fetch(`${this.props.baseUrl}/add_item_to_cart`, {
         method: "POST",
         body: JSON.stringify(obj),
         headers: {
             "content-Type": "application/json",
             "AUTH_TOKEN": this.props.AUTH_TOKEN
         }
     }).then(res => res.json()).then(data => {
         // console.log("added to cart",data);
         if (data.success == true) {
             this.props.changeCartStatus(this.state.product.id, true);
             this.props.addToCart(this.state.product);
             this.props.changeCurrentStatus(this.state.product.id, {
                 isInCart: true
             });
         }
     });
 }

  */
 
 updatePromises=items.map(item=>{
      return fetch(`${this.props.baseUrl}/add_item_to_cart`, {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
              "content-Type": "application/json",
              "AUTH_TOKEN": this.props.AUTH_TOKEN
          }
      });
 });
 Promise.all([...updatePromises]).then(successlogs=>{

      fetch(`${this.props.baseUrl}/cart_checkout`, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
              'content-type': "application/json",
              "AUTH_TOKEN": this.props.AUTH_TOKEN
          }
      }).then(res => res.json()).then(data => {
          console.log(data)
          if (data.success == true) {
              this.setState({
                  loading: false,
                  checkout_done: true,
                  triedCheckout: true
              });
              this.props.clearCart();
          } else {
              this.setState({
                  triedCheckout: true,
                  checkout_done: false,
                  loading: false
              })
          }
      }).catch(err => {
           this.setState({
               triedCheckout: true,
               checkout_done: false,
               loading: false
           });
      })
 

 }).catch(errors=>{
     console.log(errors);
     this.setState({
         loading:false
     });
     showMessage({
         type:"danger",
         message:"Failed",
         description:"somethig wennt wrong try again!",
         autoHide:true
     });
 })

   this.setState({
       loading:true
   })

    }

    render() {
       let {firstname,lastname,mobile,area,street,block,lane}=this.state.address
       billingAddress= `${firstname} ${lastname},${mobile},${area},${street},${block},${lane}`
      
        return (
            this.state.loading?<Loader/>:
            this.state.triedCheckout != true ?
            <Wrapper>
               <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
                <Header title="Summary" backbutton backHandler={this.props.navigation.goBack}/>
                <View style={{flex:1,padding:10}}>
                 <View style={{paddingVertical:20,paddingHorizontal:10,backgroundColor:"#fff"}}>
                     <View style={styles.row}>
                         <Text style={styles.label}>Payment Type :</Text>
                         <Text style={styles.styledlabel}>{this.state.payType!="Cash"?"card":"cash on delivey"}</Text>
                     </View>

                     <View style={[]}>
                         <Text style={[styles.label]}>Billing Address:</Text>
                         <Text style={[styles.text]}>{billingAddress}</Text>
                     </View>
                 </View>
                 <View style={{backgroundColor:"#fff"}}>
                     <OrderItemsTable items={this.props.cartItems}/>
                 </View>
                 <View style={styles.checkouttab}>
                       <TouchableOpacity 
                            style={[styles.btn,{backgroundColor:"#fff",borderWidth:1,borderColor:"#2ecc71"}]} 
                            onPress={()=>this.props.navigation.goBack()}
                           >
                               <Text style={{color:"#2ecc71",fontWeight:"bold"}}>BACK</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.btn,]}
                            onPress={this.processOrder.bind(this)} 
                            >
                               <Text style={{color:"white",fontWeight:"bold"}}>CONFIRM</Text>
                        </TouchableOpacity>   
                    </View>
                </View> 
              </ImageBackground>
            </Wrapper>:
            <CheckoutStatus onContinue={this.onContinue.bind(this)} status={this.state.checkout_done}>
               {this.state.checkout_done&& 
                     <OrderItemsTable items={this.props.cartItems}/>
               }
            </CheckoutStatus>
        )
    }
}

 const styles=StyleSheet.create({
        row:{
            flexDirection:'row',
            justifyContent:"space-between",
            borderBottomColor:"#95a5a6",
            borderBottomWidth:1,
            paddingVertical:5
        },
        label:{
          fontWeight:"bold",
          fontSize:16,
          paddingVertical:5,
          color:"#2980b9"
        },
        address:{
          paddingHorizontal:10,
          paddingVertical:5,
          color:"#2c3e50",
          textTransform:"capitalize"
        },
        styledlabel:{
          paddingHorizontal:10,
          backgroundColor:"#2980b9",
          paddingVertical:4,
          borderRadius:5,
          color:"#fff",
          fontWeight:"bold"
        },
        btn:{
         backgroundColor:"#27ae60",
         justifyContent:"center",
         paddingTop:5,
         paddingBottom:5,
         paddingLeft:40,
         paddingRight:40,
         borderRadius:5,  
         marginRight:20,
         marginLeft:20
        },
         btn_disabled:{
          backgroundColor:"#bdc3c7"
         },
         checkouttab:{
             display:"flex",
             backgroundColor: "#dff9fb",
             height:70,
             flexDirection:"row",
             paddingTop:10,
             paddingBottom:10,
             justifyContent:"space-between",
             elevation:3,
             position:"absolute",
             bottom:0,
             left:0,
             right:0
         },
   
         text:{
             fontWeight:"bold",
             color:"#27ae60",
             paddingHorizontal:5,
     
         }
     })
mapStateToProps=state=>{
    return {
     cartItems:state.Cart.items,
     checkoutData:state.Checkout,
     baseUrl: state.Config.base_url,
     AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
        clearCart:()=>{dispatch({type:"EMPTY_THE_CART"})}
    }
}
export default connect(mapStateToProps,mapDispatch)(CheckSummery);
