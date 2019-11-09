import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,RefreshControl} from 'react-native';
import Product_Explore from "./Product_Explore";
import {connect} from "react-redux";


class Products extends Component {
   constructor(props){
       super(props);
       this.state={
           products:this.props.products
       }
        console.log("explore product item created once", )
   }

    renderItem=({item})=>{
        return(
         <Product_Explore 
            onProductSelect={this.props.onProductSelect.bind(this)}
            product={item}
            key={item.index}
            />
        )
    }
   
    render() {
        console.log("renderinig flatlist ...");
        return (
            <View style={{paddingHorizontal:10}} >
                    <FlatList
                        data={this.props.products}
                        extraData={this.props}
                        numColumns={2}
                        contentContainerStyle={styles.productContainer}
                        keyExtractor={(item)=>item.id}
                        removeClippedSubviews={true}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        maxToRenderPerBatch={10}
                        windowSize={10}
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
// mapState=state=>{
//      let {products} = state.Explore;
//      return {
//          products
//      }
// }
// mapDispatch=dispatch=>{
//     return {
//         loadProducts:(products)=>{dispatch({type:"LOAD_EXPLORE",products})},
//     }
// }

export default connect()(Products);
