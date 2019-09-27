//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

import {connect} from 'react-redux';

class Product extends Component {
   constructor(props){
       super(props);
       this.state={
           product:props.productdata
       }
       this.remove=this.remove.bind(this);
       
   }
 
   remove(){
       this.props.onRemove(this.props.productdata.id);
   }

   addToCart() {
       obj = {
           product_id: this.state.product.id,
           price: this.state.product.price,
           quantity:1
       };
       fetch(`${this.props.baseUrl}/add_item_to_cart`, {
           method: "POST",
           body: JSON.stringify(obj),
           headers: {
               "content-Type": "application/json",
               "AUTH-TOKEN": this.props.AUTH_TOKEN
           }
       }).then(res => res.json()).then(data => {
           if (data.success == true) {
               this.props.changeCartStatus(this.state.product.id, true);
               this.props.addToCart({...this.state.product,...{quantity:1}});
               this.props.changeCurrentStatus(this.state.product.id, {
                   isInCart: true
               });
              this.props.changeCartStatus_wishlist(this.state.product.id,{isInCart:true});
           }
       });  
   }   
 
    
    render() {
       console.log("wishlist",this.props.productdata); 
        quantity=this.props.productdata.quantity||0;
        isInCart = this.props.productdata.isInCart;
        instock = this.props.productdata.quantity > 0 && (this.props.productdata.isActive || this.props.productdata.is_active)
        return ( 
      <TouchableWithoutFeedback onPress={()=>this.props.onClick(this.props.productdata.id)}>
          <View style={{height:150}}>
            <View style={styles.container}>
                <View style={[styles.img,{flex:2,minWidth:125,maxWidth:125}]}>
                        <Image source={this.props.productdata.img} 
                        style={{flex:1,width:null,height:null,borderRadius:10,}}
                        />
                </View> 
                <View style={{flex:3}} style={styles.productInfo}>
                    <View>
                         <Text style={{fontSize:20,marginTop:20,marginBottom:10,textTransform:"capitalize"}}>
                            {this.props.productdata.title}
                        </Text>
                    </View> 
                    <View> 
                    <Text style={[styles.price,{fontWeight:"bold",fontSize:18}]}>
                        {Number(this.props.productdata.price).toFixed(3)} KD
                        </Text> 
                    </View>
                    
                      <View style={{flexDirection:"row",alignItems:"center",marginTop:20}}>
                        <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center"}} disabled={!instock|| isInCart} onPress={this.addToCart.bind(this)}> 
                            <Text 
                                    style={[styles.remove_btn_stock,
                                        (()=>(instock||isInCart)?{backgroundColor:"#27ae60"}:{backgroundColor:"#f1c40f",paddingHorizontal:5})()]}>
                                    {isInCart?"IN CART":instock?"ADD TO CART":"OUT OF STOCK"}
                                </Text>
                        </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center"}} onPress={()=>this.remove()}>
                                <Text style={styles.remove_btn}>Remove</Text>
                            </TouchableOpacity>
                     </View>

                </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
        );
    } 

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
        flexDirection:"row",
        elevation:5, 
        marginTop:5  
    },
    productInfo:{
       paddingHorizontal:10,
       flex:1
    },
    price:{
        color:"green"
    },
    img:{
        paddingBottom:5,
        paddingTop:5,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:10
    },
    remove_btn:{
        color:"#fff",
        backgroundColor: "#e74c3c",
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:5,
        alignSelf: "stretch",
        textAlign: "center"
    },
    remove_btn_stock:{
        color:"#fff",
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:5,
        alignSelf:"stretch",
        textAlign:"center"
    }
});
mapState=state=>{
    return {
     baseUrl: state.Config.base_url,
     AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
        addToCart:(product)=>{dispatch({type:"ADD_TO_CART",product})},
        changeCartStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_CART_STATUS",id,value})},
        changeCurrentStatus:(id,obj)=>{dispatch({type:"CHANGE_CURRENT_ITEM_STATUS",id,obj})},
         changeCartStatus_wishlist:(id,obj)=>{
            dispatch({type:"CHANGE_CART_STATUS_WISHLIST",id,obj});
        }
    }
}


export default connect(mapState,mapDispatch)(Product);
