import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,RefreshControl} from 'react-native';
import Product_Explore from "./Product_Explore";
import {connect} from "react-redux";


class Products extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{paddingHorizontal:10}} >
                    <FlatList
                        data={this.props.products}
                        numColumns={2}
                        extraData={this.props}
                        contentContainerStyle={styles.productContainer}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=> (
                            <Product_Explore 
                                onProductSelect={this.props.onProductSelect.bind(this)}
                                product={item}
                                />
                            )}
                    />
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
mapState=state=>{
    return {}
}
mapDispatch=dispatch=>{
    return {
        loadProducts:(products)=>{dispatch({type:"LOAD_EXPLORE",products})},
    }
}

export default connect()(Products);
