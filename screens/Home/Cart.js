//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import Product from "./components/product"

const d_width=Dimensions.get('window').width;
// create a component
const images=[
     require("./product_images/prayerbeads.jpg"),
     require("./product_images/sewing_kit.jpg"),
     require("./product_images/sheha_fatoota.jpg"),
     require("./product_images/shesma_medium.jpg"),
     require("./product_images/prayerbeads.jpg"),
     require("./product_images/sewing_kit.jpg"),
     require("./product_images/sheha_fatoota.jpg"),
]

class Cart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View >
                    <ScrollView style={{paddingBottom:20}}>
                        <Product productdata={{name:"prayer beads",price:"120 ",src:images[0],favourite:false}} />
                        <Product productdata={{name:"sheha fatoota",price:"120 ",src:images[2],favourite:true}} />
                        <Product productdata={{name:"shesma medium",price:"120 ",src:images[3],favourite:false}} />
                        <Product productdata={{name:"sewing kit",price:"120 ",src:images[1],favourite:true}} />
                        <Product productdata={{name:"prayer beads",price:"120 ",src:images[4],favourite:true}} />
                        <Product productdata={{name:"test product",price:"120 ",src:images[5],favourite:false}} />
                        <Product productdata={{name:"shesma medium",price:"120 ",src:images[6],favourite:false}} />
                    </ScrollView>
                </View>
                <View style={styles.checkouttab}>
                   <View>
                     <Text>Total</Text>
                     <Text style={{fontWeight:"bold",fontSize:18,color:"green"}}>$1000</Text>
                   </View>
                   <TouchableOpacity 
                        style={styles.btn}
                        onPress={()=>this.props.navigation.push('Checkout')}
                   >
                     <Text style={{color:"white",fontWeight:"bold"}}>CHECKOUT</Text>
                   </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        paddingBottom:35,
        paddingTop:40
    },
    checkouttab:{
        display:"flex",
        backgroundColor:"#fff",
        height:70,
        flexDirection:"row",
        paddingTop:10,
        paddingBottom:10,
        justifyContent:"space-around",
        width:d_width,
        elevation:3
    
    },
    btn:{
        backgroundColor:"#27ae60",
        justifyContent:"center",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:40,
        paddingRight:40,
        borderRadius:5,   
    }
});

export default Cart;
