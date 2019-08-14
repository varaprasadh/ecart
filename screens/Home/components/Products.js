import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList} from 'react-native';
import Product_Explore from "./Product_Explore";

class Products extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View>
                <Text style={styles.label}> Latest Products</Text>   

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
    label:{
        fontWeight:"bold",
        fontSize:25,
        paddingHorizontal:10,
        paddingVertical:10
    },
});

export default Products;
