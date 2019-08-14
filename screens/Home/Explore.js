//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ScrollView,FlatList,} from 'react-native';
import Wrapper from "./Wrapper";
import SearchBar from  "./components/SearchBar";
import Categories from "./components/Categories";
import Products from "./components/Products";
import LoadMoreButton from "./components/LoadMoreButton";

import {connect} from 'react-redux';

import Loader from "../major_components/Loader";


class Explore extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText:"",
            loading:false
        }
    }
    onSearchChange(text){
        this.setState({
            searchText:text
        });
        console.log(text);

    }
   onCategorySelected(name){
       //trigger intent with that category
       this.props.navigation.push("ExploreCategory");

   }
   onProductSelect(product){
       //open product screen
       this.props.navigation.push("ExploreProduct",{product});
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

    this.props.loadCategories();
    this.props.loadProducts();
    setTimeout(()=>{ 
        this.props.toggleLoading();
    },1000)
  }
 componentDidUpdate(){
     console.log("updated");
    //  console.log(this.props.products);
 }
    render() { 
       
        return ( 
            this.props.loading?<Loader/> :
             <Wrapper>
                <SearchBar onChangeText={this.onSearchChange.bind(this)}/>
                <ScrollView>
                    <Categories
                       categories={this.props.categories}
                       onCategorySelected={this.onCategorySelected.bind(this)} />
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
    loadCategories:()=>{
        dispatch({
            type: "LOAD_CATEGORIES"
        })
    },
    toggleLoading:()=>{
        dispatch({type:"TOGGLE_LOADING"})
    }
});



export default connect(mapStateToProps,mapDispatchToProps)(Explore);
