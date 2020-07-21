import React, { Component } from 'react';
import { View, Text,Animated,Image,
  ScrollView,StyleSheet,Easing,
  TouchableOpacity, TouchableWithoutFeedback, Modal
    } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

import {Ionicons} from "@expo/vector-icons";
import Wrapper from "./Wrapper";

import BackgroundCarousel from "../major_components/BackgroundCarousel";

import {connect} from "react-redux";
import Loader from '../major_components/Loader';
import { showMessage } from 'react-native-flash-message';
import Axios from 'axios';


class ProductMain extends Component {
  constructor(props) {
    super(props);
    this.id= this.props.navigation.getParam('id');
    this.state={
      product:null,
      loading:true,
      viewerImages:[],
      viewer:false,

      cartButtonLoading:false,
      wishlistButtonLoading:false
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
   Axios.get(`/product/${this.id}`,{headers:{ "AUTH-TOKEN":this.props.AUTH_TOKEN}})
  .then(({data})=>{
     if(data.success){
      product=data.product;
      carouselImages=product.images.map(imgurl=>{
           return {
             uri:imgurl
        }});
      viewerImages=product.images.map(url=>({url}))
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
        loading:false,
        viewerImages
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
   this.setState({
     cartButtonLoading:true
   })
   Axios.post("/add_item_to_cart",obj,{headers:{"AUTH-TOKEN": this.props.AUTH_TOKEN}})
   .then(({data})=>{
    if(data.success==true){
      this.props.changeCartStatus(this.state.product.id, true);
      this.props.addToCart(this.state.product);
      this.props.changeCurrentStatus(this.state.product.id, {
        isInCart: true
      });
    }
  }).catch(err=>{}).finally(()=>{
    this.setState({
      cartButtonLoading:false
    })
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
  this.setState({
    wishlistButtonLoading:true
  })
  Axios.post("/add_item_to_wish_list",obj,{headers:{"AUTH-TOKEN":this.props.AUTH_TOKEN}})
  .then(({data})=>{
    if(data.success){
        this.props.changeWishlistStatus(this.state.product.id, true);
        console.log("debug1",this.state.product);
        this.props.addToWishlist({...this.state.product,...{quantity:this.state.product.availableQuantity}});
        this.props.changeCurrentStatus(this.state.product.id, {
          isinWishlist: true
        });
    }
  }).catch(err=>{}).finally(()=>{
    this.setState({
      wishlistButtonLoading:false
    })
  })

}
increaseQTY(){
   if(this.state.product.availableQuantity>this.state.product.quantity){
     this.setState({
       product:{...this.state.product,quantity: this.state.product.quantity + 1}
     })
   }else{
     showMessage({
       type:"warning",
       message:"out of stock",
       description:"no more items left!"
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
    currency='';
    if(!this.state.loading){
     currency=Number(this.state.product.price)<1?"Fils":"KD";
    }

    return (
      this.state.loading?<Loader/>: 
      <Wrapper noBackground>
      {
         instock = this.state.product.availableQuantity > 0 && this.state.product.is_active
      } 
        <Modal visible={this.state.viewer} transparent={true}>
            <View style={{flex:1,position:"relative"}}>
              <TouchableWithoutFeedback onPress={()=>this.setState({viewer:false})}>
                <View style={[styles.eye,{backgroundColor:"#000",zIndex:99}]}>
                  <Ionicons name="ios-close" size={50} color="#fff"/>
                </View>
              </TouchableWithoutFeedback>
              <ImageViewer enableSwipeDown imageUrls={this.state.viewerImages}
                 onCancel={()=>this.setState({viewer:false})}
                 enablePreload
              />
            </View>
        </Modal>
        <View style={[styles.container,{marginBottom:40}]}>
          <TouchableWithoutFeedback  onPress={()=>this.props.navigation.goBack()}>
          <View style={styles.backBtn}>
              <Ionicons name="ios-arrow-back" size={30} color="#27ae60"/>
              <Text style={{paddingHorizontal:10,color:"#27ae60",fontWeight:"bold"}}>Back</Text>
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>this.setState({viewer:true})}>
            <View style={[styles.eye]}>
              <Ionicons name="ios-eye" size={30} color="#000"/>
            </View>
          </TouchableWithoutFeedback>
          <ScrollView scrollEventThrottle={16}>
            <Animated.View style={[styles.imageWrapper,{opacity:this.imgOpacity}]}>
              <TouchableWithoutFeedback onLongPress={()=>this.setState({viewer:true})}>
                <View style={styles.image}>
                    <BackgroundCarousel images={this.state.product.images}/>
                </View>
               </TouchableWithoutFeedback>
              
               <TouchableWithoutFeedback onPress={this.addToWishlist.bind(this)} disabled={this.props.product.isinWishlist}>
                <View style={styles.Favourite}>
                 <Text 
                   style={{paddingHorizontal:10,color:"#e74c3c"}}>
                   {this.props.product.isinWishlist?"Added to Wishlist":" Add to Wishlist"}
                 </Text>
                 <Ionicons color="#e74c3c" name={this.props.product.isinWishlist?"ios-heart":"ios-heart-empty"} size={30} />
                </View>
               </TouchableWithoutFeedback>
            </Animated.View>
            <View style={styles.details}>
               <Text style={styles.pName}>{this.state.product.title}</Text>
               <Text style={styles.pCat}>{this.state.product.category}</Text>
               <View style={[{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}]}>
                 <Text style={styles.styledPrice}>{Number(this.state.product.price).toFixed(3)} {currency}</Text>
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
                 {this.state.cartButtonLoading?
                 <Text style={[styles.btn,styles.action_cart]}>
                   Please Wait
                 </Text>:
                 <Text style={[styles.btn,styles.action_cart]}>
                    {this.props.product.isInCart?"IN CART":"ADD TO CART"}
                 </Text>
                 }
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
   paddingHorizontal:15,
   paddingVertical:10,
   backgroundColor: "#fff",
   justifyContent:"space-between",
   alignItems:"center",
   borderRadius:5,
   flexDirection:"row",
   elevation:3
  },
  qt_controls:{
     backgroundColor:"#fff"
  },
  qt_controls_btns:{
    flexDirection:"row",
    borderWidth:1,
    borderColor: "#27ae60"
  },
  qt_btn: {
    flex: 2,
    alignItems: "center",
    justifyContent: 'center',
    padding:10,
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
  pName:{
    fontSize:22,
    fontWeight:"bold",
    color:"#fff",
    textTransform:"capitalize"
  },
  pCat:{
    fontWeight:"bold",
    fontSize:18,
    color:"#7f8c8d"
  },
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
    borderRadius:5
  },
  eye: {
    position: "absolute",
    right: 10,
    top: 20,
    width: 50,
    height: 50,
    zIndex: 10,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor:"white",
    borderRadius:5,
    elevation:2
  }
});


mapStateToProps=state=>{
  return {
    product:state.Addition.currentProduct,
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
