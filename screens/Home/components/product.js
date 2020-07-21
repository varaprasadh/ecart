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
            <TouchableWithoutFeedback>
                <View style={styles.container} >
                    <TouchableWithoutFeedback onPress={()=>this.props.onClick(this.props.productdata.id)} >
                        <View style={[styles.img,{width:125}]}>
                            <Image source={this.props.productdata.img} loadingIndicatorSource={require("./assets/img_loading.gif")}
                                style={{flex:1,width:null,height:null,borderRadius:10,}}
                            /> 
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.productInfo,{flex:1}]}>
                           <TouchableWithoutFeedback onPress={()=>this.props.onClick(this.props.productdata.id)} >
                                <View>
                                    <Text numberOfLines={1} style={{fontSize:18,paddingVertical:10,textTransform:"capitalize"}}>
                                    {title}
                                    </Text>
                                    <Text style={[styles.price,{fontWeight:"bold",fontSize:18}]}>
                                        {Number(this.props.productdata.price).toFixed(3)} {currency}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
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
                                <View style={{flex:1}}>
                                    <TouchableOpacity style={{flex:1}} onPress={()=>this.props.onRemove(this.props.productdata.id)}>
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
        marginTop:2,
        padding:5
    },
    productInfo:{
        paddingHorizontal:10,
    },
    price:{
        color:"green",
    },
    img:{
        borderRadius:5
    },
    remove_btn:{
        color:"#fff",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:5,
        paddingHorizontal:5,
        borderRadius:5,
        backgroundColor: "#e74c3c",
        textAlign:"center"
    },
    qtyControls: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#fff",
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
        alignItems:"center",
    },
    compenstateBoader:{
        borderColor: "#7f8c8d",
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    ctrlwrapper: {
        alignSelf:"stretch",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:"auto",
        alignItems:"center",
    }
});



export default Product;
