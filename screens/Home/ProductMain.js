import React, { Component } from 'react';
import { View, Text,Animated,Image,
  ScrollView,StyleSheet,Easing,
  TouchableOpacity,TouchableWithoutFeedback
    } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Wrapper from "./Wrapper";

import {connect} from "react-redux";

class ProductMain extends Component {
  constructor(props) {
    super(props);
    prodObj = this.props.navigation.getParam('product');
    availableQuantity=prodObj.quantity
    this.state={
      product:{...prodObj,quantity:1,availableQuantity},
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
  this.props.changeCartStatus(this.state.product.id,true);
  this.props.addToCart(this.state.product);
  //when its added

  // this.setState({
  //   product:{...this.state.product,isInCart:true}
  // })
}
buy(){
  this.props.addToCart(this.state.product);
  this.props.navigation.navigate('Cart');
}    
addToWishlist(){
  this.props.changeWishlistStatus(this.state.product.id,true);
  this.props.addToWishlist(this.state.product);
  
  // this.setState({ 
  //   product:{...this.state.product,isinWishlist:true}
  // })
}
 
  render() {
    let instock=this.state.product.quantity>0;
    return (
      <Wrapper>
        <View style={[styles.container,{marginTop:-10,marginBottom:40}]}>
          <TouchableWithoutFeedback  onPress={()=>this.props.navigation.goBack()}>
          <View style={styles.backBtn}>
              <Ionicons name="ios-arrow-back" size={30}/>
              <Text style={{paddingHorizontal:10}}>Back</Text>
          </View>
          </TouchableWithoutFeedback>
          <ScrollView scrollEventThrottle={16}>
            <Animated.View style={[styles.imageWrapper,{opacity:this.imgOpacity}]}>
               <Image source={this.state.product.img} style={styles.image}/>
               <TouchableWithoutFeedback onPress={this.addToWishlist.bind(this)}>
                <View style={styles.Favourite}>
                 <Text 
                   style={{paddingHorizontal:10,color:"#e74c3c",fontWeight:"bold"}}>
                   {this.state.product.isinWishlist?"added to wishlist":" Add To wishlist"}
                 </Text>
                 <Ionicons color="#e74c3c" name={this.state.product.isinWishlist?"ios-heart":"ios-heart-empty"} size={30} />
                </View>
               </TouchableWithoutFeedback>
            </Animated.View>
            <View style={styles.details}>
               <Text style={styles.pName}>{this.state.product.title}</Text>
               <Text style={styles.pCat}>{this.state.product.category}</Text>
               <Text style={styles.pPrice} >{this.state.product.price}$</Text>
               <View style={styles.description}>
                  <Text style={[styles.pCat,{color:"#e74c3c",fontSize:20}]}>Description</Text>
                  <Text style={styles.descText}>{this.state.product.description} </Text>
               </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={this.addToCart.bind(this)} disabled={this.state.product.isInCart}>
                 <Text style={[styles.btn,styles.action_cart]}>
                    {this.state.product.isInCart?"IN CART":"ADD TO CART"}
                 </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.buy.bind(this)} disabled={!instock}>
                 <Text style={[styles.btn,!instock?{backgroundColor:"#e74c3c"}:{}]}>
                    {instock?"BUY":"OUT OF STOCK"}
                  </Text>
              </TouchableOpacity>
            </View> 
          </ScrollView>
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
    width:null,
    height:null,
    flex:1,
  },
  pName:{fontSize:22,fontWeight:"bold",color:"#2980b9",textTransform:"capitalize"},
  pCat:{fontWeight:"bold",fontSize:18,color:"#7f8c8d"},
  pPrice:{fontWeight:"bold",color:"green",fontSize:20},
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
  actions:{flex:1,
         paddingHorizontal:10,paddingVertical:10,
         flexDirection:"row",justifyContent:"space-around",},
  action_cart:{
    borderWidth:1,
    borderColor:"#27ae60",
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
    borderRadius:5,
    width:150
  }
});


mapStateToProps=state=>{

  return {
    wishlistItems:state.Wishlist.items,
    cartItems:state.Cart.items
  }
}

mapDispatch=dispatch=>{
  return {
    addToCart:(product)=>{dispatch({type:"ADD_TO_CART",product})},
    addToWishlist:(product)=>{dispatch({type:"ADD_TO_WISHLIST",product})},
    removeFromWishlist:(id)=>{dispatch({type:"REMOVE_FROM_WISHLIST",id})},
    changeCartStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_CART_STATUS",id,value})},
    changeWishlistStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_WISHLIST_STATUS",id,value})}
  }
}
export default connect(mapStateToProps, mapDispatch)(ProductMain);
