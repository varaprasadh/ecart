import React, { Component,PureComponent } from 'react';
import { View, Text, StyleSheet,FlatList,RefreshControl} from 'react-native';
import Product_Explore from "./Product_Explore";

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
                        contentContainerStyle={styles.productContainer}
                        keyExtractor={(item)=>item.id+""}
                        renderItem={({item})=> (
                            <View>
                                <Product_Explore 
                                    onProductSelect={this.props.onProductSelect.bind(this)}
                                    product={item}
                                />
                            </View>
                            )}
                        initialNumToRender={10}
                        
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


export default Products;
