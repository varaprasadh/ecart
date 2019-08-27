import React, { Component } from 'react';
import { View, Text,Animated,Image,
  ScrollView,StyleSheet,Easing,
  TouchableOpacity,TouchableWithoutFeedback
    } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Wrapper from "./Wrapper";

import BackgroundCarousel from "../major_components/BackgroundCarousel";

import {connect} from "react-redux";
import Loader from '../major_components/Loader';

class ProductMain extends Component {
  constructor(props) {
    super(props);
    prodObj = this.props.product;
    availableQuantity=prodObj.quantity
    this.state={
      product:{...prodObj,quantity:1,availableQuantity},
      loading:true
    }
    this.imgOpacity=new Animated.Value(0);
    this.addToCart=this.addToCart.bind(this);
  } 

 componentDidMount(){
  Animated.timing(this.imgOpacity,{ 
        duration:300,
        toValue:1,
        easing:Easing.ease
      }).start(); 
      console.log(this.state.product);
 }

addToCart(){
   obj={
     product_id: this.state.product.id,
     price: this.state.product.price, 
     quantity: 1
   }; 
  fetch(`${this.props.baseUrl}/add_item_to_cart`,{
   method:"POST",
   body:JSON.stringify(obj),
   headers:{
     "content-Type":"application/json",
      "AUTH_TOKEN": this.props.AUTH_TOKEN
   }
  }).then(res=>res.json()).then(data=>{
    console.log("added to cart",data);
    if(data.success==true){
      this.props.changeCartStatus(this.state.product.id, true);
      this.props.addToCart(this.state.product);
      this.props.changeCurrentStatus(this.state.product.id, {
        isInCart: true
      });
    }
  });
}

buy(){
  this.props.addToCart(this.state.product);
  this.props.navigation.navigate('Cart');
}    
addToWishlist(){
  obj = {
    product_id:this.state.product.id
  }
  fetch(`${this.props.baseUrl}/add_item_to_wish_list`,{
    method:"POST",
    headers:{
      "content-Type":"application/json",
      "AUTH_TOKEN":this.props.AUTH_TOKEN
    },
    body:JSON.stringify(obj)
  }).then(res=>res.json()).then(data=>{
    console.log("adding to wishlist",data)
    if(data.success){
        this.props.changeWishlistStatus(this.state.product.id, true);
        this.props.addToWishlist(this.state.product);
        this.props.changeCurrentStatus(this.state.product.id, {
          isinWishlist: true
        });
    }
  }).catch(err=>console.log(err));

}
 
  render() {
    let instock=this.props.product.quantity>0;
    return (
      this.state.loading?<Loader/>: 
      <Wrapper noBackground>
        <View style={[styles.container,{marginBottom:40}]}>
          <TouchableWithoutFeedback  onPress={()=>this.props.navigation.goBack()}>
          <View style={styles.backBtn}>
              <Ionicons name="ios-arrow-back" size={30}/>
              <Text style={{paddingHorizontal:10}}>Back</Text>
          </View>
          </TouchableWithoutFeedback>
          <ScrollView scrollEventThrottle={16}>
            <Animated.View style={[styles.imageWrapper,{opacity:this.imgOpacity}]}>
               <View style={styles.image}>
                  <BackgroundCarousel images={this.state.product.images}/>
               </View>
              
               <TouchableWithoutFeedback onPress={this.addToWishlist.bind(this)} disabled={this.props.product.isinWishlist}>
                <View style={styles.Favourite}>
                 <Text 
                   style={{paddingHorizontal:10,color:"#e74c3c",fontWeight:"bold"}}>
                   {this.props.product.isinWishlist?"Added to Wishlist":" Add to Wishlist"}
                 </Text>
                 <Ionicons color="#e74c3c" name={this.props.product.isinWishlist?"ios-heart":"ios-heart-empty"} size={30} />
                </View>
               </TouchableWithoutFeedback>
            </Animated.View>
            <View style={styles.details}>
               <Text style={styles.pName}>{this.state.product.title}</Text>
               <Text style={styles.pCat}>{this.state.product.category}</Text>
               <View style={[styles.pPrice,{flexDirection:"row",alignItems:"center"}]}>
                 {/* <Text style={{fontWeight:"bold",color:"#27ae60",fontSize:20}}></Text> */}
                 <Text style={styles.styledPrice}>{this.state.product.price} KD</Text>
               </View>
               <View style={styles.description}>
                  <Text style={[styles.pCat,{color:"#e74c3c",fontSize:20}]}>Description</Text>
                  <Text style={styles.descText}>{this.state.product.description} </Text>
               </View>
            </View> 
          </ScrollView>
        </View>
         <View style={styles.actions}>
              <TouchableOpacity style={{flex:1}} onPress={this.addToCart.bind(this)} disabled={this.props.product.isInCart}>
                 <Text style={[styles.btn,styles.action_cart]}>
                    {this.props.product.isInCart?"IN CART":"ADD TO CART"}
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1}} onPress={this.buy.bind(this)} disabled={!instock}>
                 <Text style={[styles.btn,!instock?{backgroundColor:"#e74c3c"}:{}]}>
                    {instock?"BUY":"OUT OF STOCK"}
                  </Text>
              </TouchableOpacity>
          </View>
      </Wrapper>
    );
  }
}


const styles=StyleSheet.create({
  imageWrapper:{
    height:300,
    position:"relative"
  },
  backBtn:{
   position:"absolute",
   top:20,
   left:10,
   zIndex:10,
   paddingHorizontal:10,
   backgroundColor:"#fff",
   height:50,
   justifyContent:"space-around",
   alignItems:"center",
   borderRadius:50,
   flexDirection:"row"
  },
  Favourite:{
     position:"absolute",
     bottom:20,
     right:10,
     flexDirection:"row",
     alignItems:"center",
     backgroundColor:"#fff",
     borderRadius:10,
     paddingVertical:5,
     paddingHorizontal:10
  },
  image:{
    flex:1,
  },
  pName:{fontSize:22,fontWeight:"bold",color:"#2980b9",textTransform:"capitalize"},
  pCat:{fontWeight:"bold",fontSize:18,color:"#7f8c8d"},
  pPrice:{fontWeight:"bold",color:"green",fontSize:20,alignSelf:"flex-end"},
  details:{
    flex:1,
    paddingHorizontal:10,
    paddingVertical:10,
  },
  description:{
      borderTopWidth:1,
      borderTopColor:"#7f8c8d",
      marginVertical:10,
  }, 
  descText:{
     fontSize:18,
     color:"#34495e"
  },
  actions:{
    position:"absolute",
    bottom:0,
    width:"100%",
    flex:1,
    flexDirection:"row",
    alignSelf:"stretch",
    backgroundColor:"red"
  },
  action_cart:{
    backgroundColor:"#fff",
    color:"#27ae60"
  },
  btn:{
    paddingHorizontal:10,
    paddingVertical:10,
    backgroundColor:"#27ae60",
    fontSize:18,
    fontWeight:"bold",
    color:"#fff",
    textAlign:"center",
    flex:1
  },
  styledPrice:{
    backgroundColor: "#27ae60",
    fontWeight:"bold",
    fontSize:20,
    color:"#fff",
    paddingHorizontal:20,
    paddingVertical:5,
    borderRadius:10
  }
});


mapStateToProps=state=>{

  return {
    Addition:state.Addition,
    wishlistItems:state.Wishlist.items,
    cartItems:state.Cart.items,
    product:state.Addition.currentProduct,
    baseUrl: state.Config.base_url,
    AUTH_TOKEN: state.Config.AUTH_TOKEN
  }
}

mapDispatch=dispatch=>{
  return {
    addToCart:(product)=>{dispatch({type:"ADD_TO_CART",product})},
    addToWishlist:(product)=>{dispatch({type:"ADD_TO_WISHLIST",product})},
    removeFromWishlist:(id)=>{dispatch({type:"REMOVE_FROM_WISHLIST",id})},
    changeCartStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_CART_STATUS",id,value})},
    changeWishlistStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_WISHLIST_STATUS",id,value})},
    changeCurrentStatus:(id,obj)=>{dispatch({type:"CHANGE_CURRENT_ITEM_STATUS",id,obj})}
  }
}
export default connect(mapStateToProps, mapDispatch)(ProductMain);
