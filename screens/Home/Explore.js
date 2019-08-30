//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ScrollView,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import Wrapper from "./Wrapper";
import SearchBar from  "./components/SearchBar";
import Products from "./components/Products";
import LoadMoreButton from "./components/LoadMoreButton";
import {Ionicons} from "@expo/vector-icons";

import {connect} from 'react-redux';

import Loader from "../major_components/Loader";
import EmptyItems from '../major_components/EmptyItems';


class Explore extends Component {
    constructor(props){
        super(props);
        this.state={
            Mloading:false,
            loading:false,  
            page:1,
            error:false
        }
       
    }

   onProductSelect(product){
       this.props.navigation.push("ExploreProduct",{id:product.id}); 
   }
  loadMoreProducts(){

       this.setState({
           loading:true,
       });
    fetch(`${this.props.baseUrl}/products?page=${this.state.page}`,{
          method:"GET",
          headers:{ 
              AUTH_TOKEN: this.props.AUTH_TOKEN
          } 
      }).then(res=>res.json()).then(data=>{
          if(data.success==true){
              this.setState({
                  page:this.state.page+1,
                  loading:false
              });
             this.props.loadMore(data.products);
          }
      }).catch(err=>console.log(err)); 
       
  }
  
  loadInitialProducts(){
       this.setState({
          Mloading:true
      });
      fetch(`${this.props.baseUrl}/products?page=${this.state.page}`,{
          method:"GET",
          headers:{ 
              AUTH_TOKEN: this.props.AUTH_TOKEN
          } 
      }).then(res=>res.json()).then(data=>{
          if(data.success==true){
              this.setState({
                  page:this.state.page+1
              });
            //   this.props.toggleLoading();
              this.props.loadProducts(data.products);
          }
          this.setState({
              Mloading:false
          })
      }).catch(err=>{
          this.setState({
              Mloading:false,
              error:true
          });
      }); 
  }
  componentWillMount(){ 
      this.loadInitialProducts();
      fetch(`${this.props.baseUrl}/category_with_sub_category`,{
        method:"GET",
        headers:{
           "AUTH_TOKEN": this.props.AUTH_TOKEN
        }
      }).then(res=>res.json()).then(data=>{
        if(data.success==true){
          let rawCats = data.categories;
          let categories=rawCats.map(cat=>{
            let subcats = cat.sub_categories.map(subcat=>{
              return subcat.name;
            });
            return {
              name: cat.category.name,
              subcategories:subcats
            }
          });
         this.props.setCategories(categories)
        }
      }).catch(err=>console.log(err));

  }

  onSearch(text){
     if(text.trim()!==''){
         this.props.navigation.push('SearchResult',{query:text});
     }
 }
 handler(){
     this.loadInitialProducts();
 }
 openDrawer(){
     this.props.navigation.openDrawer();
 }
    render() { 
       
        return ( 
            this.state.Mloading?<Loader/> :
            this.state.error?<EmptyItems retryButton message="something went wrong" handler={this.handler.bind(this)}/>:
             <Wrapper noBackground>
                {/* <View style={{backgroundColor:"#fff",padding:10}}> */}
                <ImageBackground style={{width:"100%",height:"100%"}} source={require("../images/backgroundimage.jpg")}>
                   <View style={{flexDirection:"row",alignItems:"center",paddingLeft:10}}>
                        <TouchableWithoutFeedback
                         onPress={this.openDrawer.bind(this)}
                         >
                            <Ionicons name="ios-menu" size={45} color="#fff"/> 
                        </TouchableWithoutFeedback>
                        <View style={{flex:1}}>
                            <SearchBar onSearch={this.onSearch.bind(this)}/>
                        </View>
                   </View>
                    <ScrollView>
                        <Text style={styles.label}>Latest Products</Text>
                        <Products
                            products={this.props.products}
                            onProductSelect={this.onProductSelect.bind(this)}
                        />
                    <LoadMoreButton loading={this.state.loading} onPress={this.loadMoreProducts.bind(this)}/>
                    </ScrollView>
                </ImageBackground>
                {/* </View> */}
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
        paddingVertical:10,
        color:"#fff"
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
       baseUrl: state.Config.base_url,
       AUTH_TOKEN: state.Config.AUTH_TOKEN
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
    setCurrentProduct:(product)=>{dispatch({type:"SET_CURRENT_PRODUCT",product})},
    setCategories:(categories)=>{dispatch({type:"LOAD_CATS",categories})}
});



export default connect(mapStateToProps,mapDispatchToProps)(Explore);
connect