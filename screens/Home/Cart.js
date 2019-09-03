//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import Product from "./components/product"

import {connect} from "react-redux";
import EmptyItems from '../major_components/EmptyItems';
import Loader from '../major_components/Loader';
import Wrapper from './Wrapper';


class Cart extends Component {

   constructor(props){
       super(props);
       this.state={
           cartItems:props.cartItems,
       } 
   }
    componentWillMount(){
       fetch(`${this.props.baseUrl}/cart`,{
           method:"GET",
           headers:{
               "content-Type":"application/json",
               "AUTH_TOKEN":this.props.AUTH_TOKEN
           }  
       }).then(res=>res.json()).then(data=>{
           this.props.toggleLoading(); 
           if(data.success==true){ 
               //add that to cart state,
               data.products.forEach(product => {
                   console.log("debug each cart product")
                   parsedProduct={
                       ...product,...{
                           id: product.product_id,
                           title:product.product_name,
                           availableQuantity: product.product_actual_auantity,
                           price:product.price,
                           img: product.image_url?{uri: product.image_url}:require("./product_images/noimage.jpg")
                       }
                   };
                console.log(parsedProduct);
                this.props.addToCart(parsedProduct);
               })
           }
       }).catch(err=>err);

    } 
 removeFromCart(id){ 
    obj = { 
        product_id:id 
    };
    fetch(`${this.props.baseUrl}/remove_item_from_cart`,{
        method:"POST",
        headers:{
            "content-Type":"application/json",
            "AUTH_TOKEN":this.props.AUTH_TOKEN
        },
        body:JSON.stringify(obj)
    }).then(res=>res.json()).then(data=>{
        console.log(data);
        if(data.success==true){
            this.props.removeFromCart(id);
            this.props.changeCurrent(id,{isInCart:false})
        }
    }).catch(err=>console.log(err));
 }
   openProductPage(id){
       this.props.navigation.navigate("ExploreProduct",{id});
   }
    render() {
        cartProducts=[];
        console.log("rerender of cart")
        totalPrice=0;
        this.props.cartItems.forEach(item=>{
            totalPrice+=item.price*(item.quantity?item.quantity:1)
            cartProducts.push(
                <Product 
                    onClick={this.openProductPage.bind(this)}
                    productdata={item} 
                    key={item.id} 
                    onRemove={this.removeFromCart.bind(this)}
                    onValueChange={this.props.setQuantity.bind(this)}
                     />
            )
        })
        return( 
         this.props.loading?
         <Loader/>
         :totalPrice>0?
           <Wrapper noBackground>
            <View style={styles.container}>
                <View> 
                    <ScrollView 
                    style={{paddingBottom:20}}>
                    {(()=>cartProducts)()}
                    </ScrollView>
                </View>
                <View style={{height:70,alignSelf:"stretch"}}>
                    <View style={styles.checkouttab}>
                        <View>
                            <Text>Total</Text>
                            <Text style={{fontWeight:"bold",fontSize:18,color:"green"}}>{Number(totalPrice).toFixed(3)} KD</Text>
                        </View>
                        <TouchableOpacity 
                                style={styles.btn}
                                onPress={()=>this.props.navigation.push('Checkout')} >
                                <Text style={{color:"white",fontWeight:"bold"}}>CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Wrapper>
            :<EmptyItems message="Cart is Empty!"/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:30,
        paddingTop:30
    },
    checkouttab:{
        display:"flex",
        backgroundColor:"#fff",
        flexDirection:"row",
        paddingVertical:10,
        justifyContent:"space-between",
        elevation:3,
        paddingHorizontal:10
    },
    btn:{
        backgroundColor:"#27ae60",
        justifyContent:"center",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:40,
        paddingRight:40,
        borderRadius:5,   
    }
});

mapStateToProps=state=>{
    let {Cart} = state
    return {

       cartItems:Cart.items,
       loading:Cart.loading,
       baseUrl: state.Config.base_url,
       AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{ 
    return {
        addToCart:(product)=>{dispatch({type:"ADD_TO_CART",product})},
        removeFromCart:(id)=>{dispatch({type:"REMOVE_FROM_CART",id})},
        setQuantity:(id,quantity)=>{dispatch({type:"SET_QTY",id,quantity})},
        toggleLoading:()=>{dispatch({type:"TOGGLE_LOADING"})},
        changeCartStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_CART_STATUS",id,value})},
        changeCartStatus_Result:(id,value)=>{dispatch({type:"MODIFY_SEARCH_ITEM_CART_STATUS",id,value})},
        changeCurrent:(id,obj)=>{dispatch({type:"CHANGE_CURRENT_ITEM_STATUS",id,obj})}
    }
}
export default connect(mapStateToProps,mapDispatch)(Cart);

