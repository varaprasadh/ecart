//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import Product from "./components/product"

import {connect} from "react-redux";
import EmptyItems from '../major_components/EmptyItems';
import Loader from '../major_components/Loader';


class Cart extends Component {

   constructor(props){
       super(props);
       this.state={
           cartItems:props.cartItems,
       }
   }
  componentDidMount(){
      setTimeout(()=>{
        this.props.toggleLoading();
      },2000)
  } 
 removeFromCart(id){
     this.props.removeFromCart(id);
     this.props.changeCurrent(id,{isInCart:false})
 }
   
    render() {
        cartProducts=[];
        console.log("rerender of cart")
        totalPrice=0;
        this.props.cartItems.forEach(item=>{
            totalPrice+=item.price*(item.quantity?item.quantity:1)
            cartProducts.push(
                <Product 
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
            (<View style={styles.container}>
                <View > 
                    <ScrollView style={{paddingBottom:20}}>
                    {(()=>cartProducts)()}
                    </ScrollView>
                </View>
                <View style={{height:70,alignSelf:"stretch"}}>
                    <View style={styles.checkouttab}>
                        <View>
                            <Text>Total</Text>
                            <Text style={{fontWeight:"bold",fontSize:18,color:"green"}}>{totalPrice}$</Text>
                        </View>
                        <TouchableOpacity 
                                style={styles.btn}
                                onPress={()=>this.props.navigation.push('Checkout')} >
                                <Text style={{color:"white",fontWeight:"bold"}}>CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            ):<EmptyItems message="you got no items in cart yet!"/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        paddingBottom:30,
        paddingTop:40
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
    }
}
mapDispatch=dispatch=>{
    return {
        removeFromCart:(id)=>{dispatch({type:"REMOVE_FROM_CART",id})},
        setQuantity:(id,quantity)=>{dispatch({type:"SET_QTY",id,quantity})},
        toggleLoading:()=>{dispatch({type:"TOGGLE_LOADING"})},
        changeCartStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_CART_STATUS",id,value})},
        changeCartStatus_Result:(id,value)=>{dispatch({type:"MODIFY_SEARCH_ITEM_CART_STATUS",id,value})},
        changeCurrent:(id,obj)=>{dispatch({type:"CHANGE_CURRENT_ITEM_STATUS",id,obj})}
    }
}
export default connect(mapStateToProps,mapDispatch)(Cart);

