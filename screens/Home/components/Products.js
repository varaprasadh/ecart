import React, { Component,PureComponent } from 'react';
import { View, Text, StyleSheet,FlatList,RefreshControl} from 'react-native';
import Product_Explore from "./Product_Explore";
import {connect} from "react-redux";


class Products extends Component {
    constructor(props){
        super(props);
        state={
            products:[]
        }
    }
   componentDidUpdate(prevprops){
       if(prevprops.products!==this.props.products){
        //    this.setState({
        //        products:this.props.products
        //    });
        // let filteredItems=this.props.products.filter((item)=>{
        //    return this.state.products.find(({id})=>item.id!=id)
        // })
        // console.log(filteredItems.length,"filtered length");


        // let filtered_data=[];
        // this.props.products.map(item=>{
        //     let found_index=this.state.products.findIndex(({id})=>item.id===id)
        //     console.log(found_index,item.id,item.title)
        //     if(found_index<0){
        //       filtered_data.push(item);
        //     }
        // });
        // console.log(filtered_data.length,"filtered data");
        // this.setState({
        //     products:[...this.state.products,...filtered_data]
        // })
        console.log("incoming update");
       }
   }
   componentWillMount(){
      this.setState({
          products: this.props.products
      })
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


export default connect()(Products);
