//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
// create a component

const d_width=Dimensions.get('window').width;


class Product extends Component {
   constructor(props){
       super(props)
      
   }

    render() {
        return (
          <View style={styles.container} >
           <View className="p-image" style={[styles.img,{flex:1,}]}>
                <Image source={this.props.productdata.src} 
                style={{flex:1,width:null,height:null,borderRadius:10,}}
                />
           </View>
           <View style={{flex:2}} style={styles.productInfo}>
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
             <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
               <Ionicons name={(()=>this.props.productdata.favourite?"ios-heart":"ios-heart-empty")()} 
                  size={25} color="red"/>
               <Text style={styles.remove_btn}>Remove</Text>
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
        marginLeft:100,
        borderWidth:1,
        borderColor:"red",
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:5
    }
});

//make this component available to the app
export default Product;
