//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { showMessage } from 'react-native-flash-message';
// create a component

const d_width=Dimensions.get('window').width;


class Product extends Component {
   constructor(props){
       super(props)
       this.state={
           quantity:props.productdata.quantity,
       }

   }
   increase(){
       if (this.state.quantity < this.props.productdata.availableQuantity) {
           this.setState({
           quantity:this.state.quantity+1
       },
       () =>{
            this.props.onValueChange(this.props.productdata.id, this.state.quantity);
       });
       }else{
           showMessage({
               type:"warning",
               message:"warning",
               description:"the quantity may not be available right now."
           })
       }
   }
   decrease(){
       this.setState({
           quantity: this.state.quantity>0?this.state.quantity-1:this.state.quantity
       },
        () => {
            if (this.state.quantity > 0) {
                this.props.onValueChange(this.props.productdata.id, this.state.quantity)
            }else{
                this.props.onRemove(this.props.productdata.id);
            }
        });
   }
 

    render() {
        currency = Number(this.props.productdata.price).toFixed(3)<1?"Fils":"KD";
        title = this.props.productdata.title;
        title = title.length < 25 ? title : title.substring(0,23)+"...";
        return (  
            <TouchableWithoutFeedback
             onPress={()=>this.props.onClick(this.props.productdata.id)}
            >
          <View style={styles.container} >
           <View style={[styles.img,{width:150}]}>
                <Image source={this.props.productdata.img} loadingIndicatorSource={require("./assets/img_loading.gif")}
                style={{flex:1,width:null,height:null,borderRadius:10,}}
                /> 
           </View>
           <View style={{flex:4}} style={styles.productInfo}>
                <Text numberOfLines={1} style={{fontSize:18,paddingVertical:10,textTransform:"capitalize"}}>
                     {title}
                </Text>
             <View>
               <Text style={[styles.price,{fontWeight:"bold",fontSize:18}]}>
                {Number(this.props.productdata.price).toFixed(3)} {currency}
                </Text>
             </View>
             <View style={styles.ctrlwrapper}>
             
               <View style={styles.qtyControls}>
                   <View style={styles.qtbtn}>
                       <TouchableWithoutFeedback onPress={this.decrease.bind(this)}>
                           <Ionicons name="ios-remove" color="#2ecc71" size={25}/>
                       </TouchableWithoutFeedback>
                   </View>
                   <View style={[styles.qtbtn,{backgroundColor:"#fff"}]}><Text>{this.state.quantity}</Text></View>
                   <View style={styles.qtbtn}>
                       <TouchableWithoutFeedback onPress={this.increase.bind(this)}>
                           <Ionicons name="ios-add" color="#2ecc71" size={25}/> 
                       </TouchableWithoutFeedback>
                   </View>
               </View>
               <View style={{flex:1,paddingHorizontal:5}}>
                   <TouchableOpacity onPress={()=>this.props.onRemove(this.props.productdata.id)}>
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
        width:d_width,
        height:150,
        flexDirection:"row",
        elevation:5, 
        marginTop:5  
    },
    productInfo:{
        paddingHorizontal:10
    },
    price:{
        color:"green",
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
        paddingVertical:5,
        paddingHorizontal:5,
        borderRadius:1,
        backgroundColor: "#e74c3c",
        textAlign:"center"
    },
    qtyControls: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#fff",
        width: 100,
        justifyContent:"space-around",
        marginRight:5,
        borderWidth:1,
        borderColor: "#7f8c8d",
        alignItems:"center"

    },
    qtbtn: {
        flex:1,
        paddingVertical: 2,
        paddingHorizontal: 2,
        justifyContent:"center",
        alignItems:"center"   ,
        borderColor: "#7f8c8d",
        borderLeftWidth:1,
        borderRightWidth:1
    },
    ctrlwrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: 200,
        alignItems:"center"
    }
});



export default Product;
