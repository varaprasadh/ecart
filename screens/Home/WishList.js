

import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import Product from "./components/Product_wishlist";


const d_width=Dimensions.get('window').width;

const images=[
     require("./product_images/prayerbeads.jpg"),
     require("./product_images/sewing_kit.jpg"),
     require("./product_images/sheha_fatoota.jpg"),
     require("./product_images/shesma_medium.jpg"),
     require("./product_images/prayerbeads.jpg"),
     require("./product_images/sewing_kit.jpg"),
     require("./product_images/sheha_fatoota.jpg"),
]

class WishList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                  <ScrollView style={{flex:1,paddingTop:20}}>
                   <Product productdata={{name:"prayer beads",price:"120 ",src:images[0],instock:true}} />
                   <Product productdata={{name:"shesma medium",price:"120 ",src:images[3]}} />
                   <Product productdata={{name:"sheha fatoota",price:"120 ",src:images[2],instock:true}} />
                   <Product productdata={{name:"sewing kit",price:"120 ",src:images[1]}} />
                   <Product productdata={{name:"prayer beads",price:"120 ",src:images[4],instock:true}} />
                   <Product productdata={{name:"test product",price:"120 ",src:images[5]}} />
                   <Product productdata={{name:"shesma medium",price:"120 ",src:images[6]}} />
                  </ScrollView> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        
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

export default WishList;


