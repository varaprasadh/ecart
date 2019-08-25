//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";



class Product extends Component {
   constructor(props){
       super(props);
       this.remove=this.remove.bind(this);
   }
 
   remove(){
       this.props.onRemove(this.props.productdata.id);
   }
    render() {
        quantity=this.props.productdata.quantity||0;
        instock=quantity>0 
        return (
          <View style={{height:150}}>
            <View style={styles.container}>
                <View className="p-image" style={[styles.img,{flex:1,maxWidth:200}]}>
                        <Image source={this.props.productdata.img}
                            loadingIndicatorSource={require("./assets/img_loading.gif")}
                           style={{flex:1,width:null,height:null,borderRadius:10,}}
                        />
                </View>
                <View style={{flex:2}} style={styles.productInfo}>
                    <View>
                    <Text style={{fontSize:20,marginTop:20,marginBottom:10,textTransform:"capitalize"}}>
                            {this.props.productdata.title}
                        </Text>
                    </View>
                    <View>
                    <Text style={[styles.price,{fontWeight:"bold",fontSize:18}]}>
                        $ {this.props.productdata.price}
                        </Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
                       <Text 
                            style={[styles.remove_btn_stock,
                                (()=>instock?{backgroundColor:"#27ae60"}:{backgroundColor:"#e74c3c",paddingHorizontal:5})()]}>
                            {instock?" in stock":"out of stock"}
                        </Text>
                        <TouchableOpacity onPress={()=>this.remove()}>
                            <Text style={styles.remove_btn}>Remove</Text>
                        </TouchableOpacity>
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
        flexDirection:"row",
        elevation:5, 
        marginTop:5  
    },
    productInfo:{
        paddingLeft: 20,
        paddingRight:20
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
        color:"red",
        fontSize:18,
        borderWidth:1,
        borderColor:"red",
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:5
    },
    remove_btn_stock:{
        color:"#fff",
        fontSize:18,
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:5,
        marginRight:5
    }
});

export default Product;
