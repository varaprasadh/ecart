import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList} from 'react-native';
import Product_Explore from "./Product_Explore";

class Products extends Component {
    render() {
        return (
            <View>
 
                    <Text style={styles.label}> Latest Products</Text>   

                       <FlatList
                            data={[{key:'1'},{key:'2'},{key:'3'},{key:'4'}]}
                            numColumns={2}
                            contentContainerStyle={styles.productContainer}
                            renderItem={(item)=> (
                                <Product_Explore 
                                    onProductSelect={this.props.onProductSelect.bind(this)}
                                    key={item.key}/>
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
