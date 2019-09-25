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
import { showMessage } from 'react-native-flash-message';

class ProductMain extends Component {
  constructor(props) {
    super(props);
    this.id=this.props.navigation.getParam('id');
    this.state={
      product:null,
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
 }
 componentWillMount(){
   fetch(`${this.props.baseUrl}/product/${this.id}`,{
     method:"GET",
     headers:{
       "content-type":"application/json",
       "AUTH-TOKEN":this.props.AUTH_TOKEN
     }
   }).then(res=>res.json()).then(data=>{
     if(data.success){
      product=data.product;
      carouselImages=product.images.map(imgurl=>{
           return {
             uri:imgurl
        }});
      parsedProduct = {
           id: product.id,
           title: product.item_name,
           category: product.category,
           description: product.description, 
           price: product.price,
           isInCart: product.is_incart,
           isinWishlist: product.is_inwishlist,
           images:carouselImages.length?carouselImages:[require("../Home/product_images/noimage.jpg")],
           img: product.images[0] ? {
             uri: product.images[0]
           }: require("../Home/product_images/noimage.jpg"),
           availableQuantity: product.quantity,
           quantity:1,
           is_active:product.is_active
      };
      this.props.setCurrentProduct(parsedProduct);
      this.setState({
        product:parsedProduct,
        loading:false
      }); 
    }
   });
 }

addToCart(){
   obj={
     product_id: this.state.product.id,
     price: this.state.product.price, 
     quantity: this.state.product.quantity
   }; 
  fetch(`${this.props.baseUrl}/add_item_to_cart`,{
   method:"POST",
   body:JSON.stringify(obj),
   headers:{
     "content-Type":"application/json",
      "AUTH-TOKEN": this.props.AUTH_TOKEN
   }
  }).then(res=>res.json()).then(data=>{
    if(data.success==true){
      this.props.changeCartStatus(this.state.product.id, true);
      this.props.addToCart(this.state.product);
      this.props.changeCurrentStatus(this.state.product.id, {
        isInCart: true
      });
    }
  }).catch(err=>{
    console.log("ebug here",err);
  })
}

buy(){
   this.props.addToCart(this.state.product);
   this.addToCart();
   this.props.changeCurrentStatus(this.state.product.id, {
     isInCart: true
   });
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
      "AUTH-TOKEN":this.props.AUTH_TOKEN
    },
    body:JSON.stringify(obj)
  }).then(res=>res.json()).then(data=>{
    if(data.success){
        this.props.changeWishlistStatus(this.state.product.id, true);
        this.props.addToWishlist(this.state.product);
        this.props.changeCurrentStatus(this.state.product.id, {
          isinWishlist: true
        });
    }
  }).catch(err=>console.log(err));

}
increaseQTY(){
   if(this.state.product.availableQuantity>this.state.product.quantity){
     this.setState({
       product:{...this.state.product,quantity: this.state.product.quantity + 1}
     })
   }else{
     showMessage({
       type:"warning",
       message:"Info",
       description:"Quantity that you are tryig to set might not be available"
     })
   }
}
decreaseQTY(){
  if(this.state.product.quantity>1){
    this.setState({
      product:{...this.state.product,quantity: this.state.product.quantity - 1}
    })
  }
}
 
  render() {
    // console.log("main product",this.state.product);
    return (
      this.state.loading?<Loader/>: 
      <Wrapper noBackground>
      {
         instock = this.state.product.quantity > 0 && this.state.product.is_active
      }
        <View style={[styles.container,{marginBottom:40}]}>
          <TouchableWithoutFeedback  onPress={()=>this.props.navigation.goBack()}>
          <View style={styles.backBtn}>
              <Ionicons name="ios-arrow-back" size={30} color="#27ae60"/>
              <Text style={{paddingHorizontal:10,color:"#27ae60",fontWeight:"bold"}}>Back</Text>
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
                 <Text style={styles.styledPrice}>{Number(this.state.product.price).toFixed(3)} KD</Text>
               </View>
               <View style={styles.description}>
                  <Text style={[styles.pCat,{color:"#e74c3c",fontSize:20}]}>Description</Text>
                  <Text style={styles.descText}>
                     {this.state.product.description?this.state.product.description:"description not available"} 
                  </Text>
               </View>
            </View> 
          </ScrollView> 
        </View>
         <View style={styles.actions}>
            {instock>0 && <View style={styles.qt_controls}>
              <Text style={{padding:10,color:"#27ae60",fontWeight:"bold"}}>Choose Quantity</Text>
              <View style={styles.qt_controls_btns}>
                  <TouchableOpacity style={styles.qt_btn}
                    onPress={this.decreaseQTY.bind(this)}
                  >
                    <Ionicons name="ios-remove" size={25}/>
                  </TouchableOpacity>
                  <Text style={styles.qtValue}>
                    {this.state.product.quantity}
                  </Text>
                  <TouchableOpacity style={styles.qt_btn}
                    onPress={this.increaseQTY.bind(this)}
                  >
                    <Ionicons name="ios-add" size={25} />
                  </TouchableOpacity>
              </View>
            </View>}
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={[{flex:1},{...!instock?{display:"none"}:{}}]} onPress={this.addToCart.bind(this)} disabled={this.props.product.isInCart}>
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
   backgroundColor: "#fff",
   height:50,
   justifyContent:"space-around",
   alignItems:"center",
   borderRadius:20,
   flexDirection:"row",
   elevation:3
   
  },
  qt_controls:{
     backgroundColor:"#fff"
  },
  qt_controls_btns:{
    flexDirection:"row",
    // backgroundColor: "#bdc3c7",
    borderWidth:2,
    borderColor: "#27ae60"
  },
  qt_btn: {
    flex: 2,
    alignItems: "center",
    justifyContent: 'center',
    padding:10,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderColor: "#27ae60",
    backgroundColor: "#ecf0f1"
  },
  qtValue: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#fff"
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
  pName:{fontSize:22,fontWeight:"bold",color:"#fff",textTransform:"capitalize"},
  pCat:{fontWeight:"bold",fontSize:18,color:"#7f8c8d"},
  pPrice:{fontWeight:"bold",color:"green",fontSize:20,alignSelf:"flex-end"},
  details:{
    flex:1,
    paddingHorizontal:10,
    paddingVertical:10,
    paddingBottom:150
  },
  description:{
      borderTopWidth:1,
      borderTopColor:"#7f8c8d",
      marginVertical:10,
  }, 
  descText:{
     fontSize:18,
     color:"#fff"
  },
  actions:{
    position:"absolute",
    bottom:0,
    width:"100%",
    flex:1,
    alignSelf:"stretch",

  },
  action_cart:{
    backgroundColor:"#fff",
    color:"#27ae60"
  },
  btn:{
    paddingHorizontal:10,
    paddingVertical:15,
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
  Addition= state.Addition;
  // console.log(Addition);

  return {
    product: Addition.currentProduct,
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
    changeCurrentStatus:(id,obj)=>{dispatch({type:"CHANGE_CURRENT_ITEM_STATUS",id,obj})},
    setCurrentProduct:(product)=>{dispatch({type:"SET_CURRENT_PRODUCT",product})}
  }
}
export default connect(mapStateToProps, mapDispatch)(ProductMain);
