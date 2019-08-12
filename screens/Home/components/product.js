//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
// create a component

const d_width=Dimensions.get('window').width;


class Product extends Component {
   constructor(props){
       super(props)
       this.state={
           quantity:1  
       }
   }
   increase(){
       this.setState({
           quantity:this.state.quantity+1
       });
   }
   decrease(){
       this.setState({
           quantity: this.state.quantity>0?this.state.quantity-1:this.state.quantity
       });
   }

    render() {
        return (
          <View style={styles.container} >
           <View className="p-image" style={[styles.img,{flex:1,maxWidth:200}]}>
                <Image source={this.props.productdata.src} 
                style={{flex:1,width:null,height:null,borderRadius:10,}}
                />
           </View>
           <View style={{flex:4}} style={styles.productInfo}>
             <View>
               <Text style={{fontSize:20,marginTop:20,marginBottom:10,textTransform:"capitalize"}}>
                     {this.props.productdata.name}
                </Text>
             </View>
             <View>
               <Text style={[styles.price,{fontWeight:"bold",fontSize:18}]}>
                $ {this.props.productdata.price}
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
               <View>
                   <Text style={styles.remove_btn}>Remove</Text>
               </View>
             </View>
           </View>
          </View>
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
        paddingLeft: 20,
        paddingRight:20
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
        color:"red",
        borderWidth:1,
        borderColor:"red",
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:5
    },
    qtyControls: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#fff",
        width: 100,
        justifyContent:"space-around",
        marginRight:5,
        borderWidth:1,
        borderColor: "#7f8c8d"

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
        width: 200
    }
});

//make this component available to the app
export default Product;
