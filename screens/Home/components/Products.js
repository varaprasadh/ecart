import React, { Component,PureComponent } from 'react';
import { View, Text, StyleSheet,FlatList,RefreshControl} from 'react-native';
import Product_Explore from "./Product_Explore";

class Products extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{paddingHorizontal:10,flex:1}} >
                    
            </View>
        )
    }
}
const styles = StyleSheet.create({
    productContainer:{
        flex:1,
        alignItems:"center"
    },
});


export default Products;
