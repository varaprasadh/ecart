import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity} from 'react-native'
import Wrapper from '../Home/Wrapper';
import Header from '../major_components/Header';
import {OrderItemsTable} from "../Home/ProfileScreens/OrderItemDetail"

import {connect} from "react-redux";

import {showMessage} from 'react-native-flash-message';
import Loader from '../major_components/Loader';
import CheckoutStatus from "./CheckoutStatus";


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


     let {firstName,lastName,email,mobile,area,street,block,lane}=this.state.address
     let items=[];
     total_cart_cost=0;
     this.props.cartItems.forEach(item=>{
         total_cart_cost+=item.price*item.quantity;
     })
     this.props.cartItems.map(item=>{
         items.push({
             product_id:item.id,
             quantity:item.quantity
         });
     })   
    let obj={
        billing_address:{
            first_name:firstName,
            last_name:lastName,
            email,
            phone_number:mobile,
            area,street,block,lane
        },
        items,
        total_cart_cost,
        payment_mode:this.state.payType
    }
   this.setState({
       loading:true
   })
   fetch(`${this.props.baseUrl}/cart_checkout`,{
       method:"POST",
       body:JSON.stringify(obj),
       headers:{
           'content-type':"application/json",
            AUTH_TOKEN: "eyJhbGciOiJub25lIn0.eyJkYXRhIjoiNiJ9."
       }
   }).then(res=>res.json()).then(data=>{
       console.log(data)
        if(data.success==true){
            this.setState({
                loading:false,
                checkout_done:true,
                triedCheckout:true
            });
            this.props.clearCart();
        }else{
           this.setState({
               triedCheckout:true,
               checkout_done:false,
               loading:false
           })
        }
    }).catch(err=>console.error(err)) 

    }

    render() {
       let {firstName,lastName,email,mobile,area,street,block,lane}=this.state.address
       billingAddress= `${firstName} ${lastName},${email},${mobile},${area},${street},${block},${lane}`
      
        return (
            this.state.loading?<Loader/>:
            this.state.triedCheckout != true ?
            <Wrapper>
                <View style={{marginTop:-10,flex:1}}>
                 <Header title="summery" backbutton backHandler={this.props.navigation.goBack}/>
                 <View style={{paddingVertical:20,paddingHorizontal:10}}>
                     <View style={styles.row}>
                         <Text style={styles.label}>payment type:</Text>
                         <Text style={styles.styledlabel}>{this.state.payType!="Cash"?"card":"cash on delivey"}</Text>
                     </View>
                    { this.state.payType!="Cash"?(
                        <View style={{borderBottomWidth:1,borderBottomColor:"#7f8c8d"}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}} >
                           <Text style={styles.label}>card number:</Text>
                           <Text>{"****".repeat(3)+this.state.cardNum.substr(-4)}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                           <Text style={styles.label}>name on card:</Text>
                           <Text>{this.state.cardName}</Text>
                        </View>
                     </View>
                    ):null  
                    }
                     <View style={[{flexDirection:"row",justifyContent:"space-between"}]}>
                         <Text style={[styles.label]}>Billing Address:</Text>
                         <Text style={[styles.address,{flex:2}]}>{billingAddress}</Text>
                     </View>
                 </View>
                 <View>
                     <OrderItemsTable items={this.props.cartItems}/>
                 </View>
                 <View className="bottombar" style={styles.checkouttab}>
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
            </Wrapper>:<CheckoutStatus  onContinue={this.onContinue.bind(this)} status={this.state.checkout_done}/>
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
             backgroundColor:"#fff",
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
     baseUrl: state.Config.base_url
    }
}
mapDispatch=dispatch=>{
    return {
        clearCart:()=>{dispatch({type:"EMPTY_THE_CART"})}
    }
}
export default connect(mapStateToProps,mapDispatch)(CheckSummery);
