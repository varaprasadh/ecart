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
            loading:false
        }
    }

   onProductSelect(product){
       //open product screen
       this.props.setCurrentProduct(product);
       this.props.navigation.push("ExploreProduct");
   }
  loadMoreProducts(){
       this.setState({
           loading:true
       });
       setTimeout(()=>{
           this.props.loadMore();
          this.setState({
              loading:false
          })
       },3000)
  }
   
  componentDidMount(){
    //  this.props.navigation.push('SearchResult',{query:"TEMP"});
    this.props.loadProducts();
    setTimeout(()=>{ 
        this.props.toggleLoading();
    },1000)
  }
 componentDidUpdate(){
     console.log("updated");
    //  console.log(this.props.products);
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






// define your styles
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
       loading
    }
}
mapDispatchToProps=(dispatch)=> ({
    loadProducts:()=>{
        dispatch({type:"LOAD_EXPLORE"})
    },
    loadMore:()=>{
        dispatch({
            type: "LOAD_MORE"
        })
    },
    toggleLoading:()=>{
        dispatch({type:"TOGGLE_EXPLORE_LOADING"})
    },
    setCurrentProduct:(product)=>{dispatch({type:"SET_CURRENT_PRODUCT",product})}
});



export default connect(mapStateToProps,mapDispatchToProps)(Explore);
