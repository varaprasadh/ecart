//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ScrollView,FlatList,} from 'react-native';
import Wrapper from "./Wrapper";
import SearchBar from  "./components/SearchBar";
import Products from "./components/Products";
import LoadMoreButton from "./components/LoadMoreButton";

import {connect} from 'react-redux';

import Loader from "../major_components/Loader";


class Explore extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
           
        }
        this.page=1;
    }

   onProductSelect(product){
       //open product screen
       this.props.setCurrentProduct(product);
       this.props.navigation.push("ExploreProduct"); 
   }
  loadMoreProducts(){

    //   console.log(this.state.page,"page sd")
    //    this.setState({
    //        loading:true,
    //    });
    //    url = `https://cbdca1e0.ngrok.io/products?page=${encodeURIComponent(this.page)}`;
    //    console.log(url)
    //    fetch(url, {
    //        method:"GET",
    //        headers: {
    //            AUTH_TOKEN: "eyJhbGciOiJub25lIn0.eyJkYXRhIjoiNiJ9."
    //        }
    //    }).then(res=>res.json()).then(data=>{
    //        if(data.success==true){
    //         //    console.log(data);
    //            this.setState({ 
    //                loading:false,
    //            });
    //            this.props.loadMore(products);
    //        }
    //    })
       
  }
 

  componentWillMount(){

      fetch(`${this.props.baseUrl}/products?page=${this.state.page}&per_page=10`,{
          method:"get",
          headers:{
              AUTH_TOKEN: "eyJhbGciOiJub25lIn0.eyJkYXRhIjoiNiJ9."
          }
      }).then(res=>res.json()).then(data=>{
          if(data.success==true){
              this.page++;
              this.props.toggleLoading();
              this.props.loadProducts(data.products);
          }
      })
  }

  onSearch(text){
     if(text.trim()!==''){
         this.props.navigation.push('SearchResult',{query:text});
     }
 }
    render() { 
       
        return ( 
            this.props.loading?<Loader/> :
             <Wrapper>
                <SearchBar onSearch={this.onSearch.bind(this)} />
                <ScrollView>
                    <Products
                        products={this.props.products}
                        onProductSelect={this.onProductSelect.bind(this)}
                    />
                   <LoadMoreButton loading={this.state.loading} onPress={this.loadMoreProducts.bind(this)}/>
                </ScrollView>
              </Wrapper>
        ); 
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    label:{
        fontWeight:"bold",
        fontSize:25,
        paddingHorizontal:10,
        paddingVertical:10
    },
});

mapStateToProps=state=>{
    let {
        products,
        categories,
        loading
    } =state.Explore;
    return {
       products,
       categories,
       loading,
       baseUrl: state.Config.base_url
    } 
}
mapDispatchToProps=(dispatch)=> ({
    loadProducts:(products)=>{
        dispatch({type:"LOAD_EXPLORE",products})
    },
    loadMore:(products)=>{
        dispatch({
            type: "LOAD_MORE",
            products
        })
    },
    toggleLoading:()=>{
        dispatch({type:"TOGGLE_EXPLORE_LOADING"})
    },
    setCurrentProduct:(product)=>{dispatch({type:"SET_CURRENT_PRODUCT",product})}
});



export default connect(mapStateToProps,mapDispatchToProps)(Explore);
