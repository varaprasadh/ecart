import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    RefreshControl,
    ScrollView,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';
import Wrapper from "./Wrapper";
import SearchBar from  "./components/SearchBar";
import Products from "./components/Products";
import LoadMoreButton from "./components/LoadMoreButton";
import {Ionicons} from "@expo/vector-icons";

import {connect} from 'react-redux';

import Loader from "../major_components/Loader";
import EmptyItems from '../major_components/EmptyItems';
import RetryButton from '../major_components/RetryButton';


class Explore extends Component {
    constructor(props){
        super(props);
        this.state={
            Mloading:false,
            loading:false,  
            page:1,
            error:false,
            refreshing:false
        }
       this.loadCats=this.loadCats.bind(this);
       this.onRefresh=this.onRefresh.bind(this);
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
              "AUTH-TOKEN": this.props.AUTH_TOKEN
          } 
      }).then(res=>res.json()).then(data=>{
          if(data.success==true){
              this.setState({
                  page:this.state.page+1,
                  loading:false
              });
            if (data.products.length == 0) {
                console.log("hiding button")
                this.setState({
                    hideLoadMoreButton: true
                })
            }
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
              "AUTH-TOKEN": this.props.AUTH_TOKEN
          } 
      }).then(res=>res.json()).then(data=>{
          if(data.success==true){
              this.setState({
                  page:this.state.page+1
              });
            //   this.props.toggleLoading();
              if(data.products.length<=4){
                  console.log("hiding button")
                  this.setState({
                      hideLoadMoreButton:true
                  })
              }
              this.props.loadProducts(data.products);
          } 
          this.setState({
              Mloading:false,
              error:false,
              refreshing: false
          })
      }).catch(err=>{
          this.setState({
              page:1,
              Mloading:false,
              error:true,
              refreshing:false
          });
      }); 
  }
 
  onRefresh(){
      this.setState({
          page:1,
          refreshing:true
      });
      this.loadInitialProducts();

  }

  componentWillMount(){ 
      this.loadInitialProducts();
      this.loadCats();
  }
 
  loadCats(){
        fetch(`${this.props.baseUrl}/category_with_sub_category`, {
            method: "GET",
            headers: {
                "AUTH-TOKEN": this.props.AUTH_TOKEN
            }
        }).then(res => res.json()).then(data => {
            if (data.success == true) {
                let rawCats = data.categories;
                let categories = rawCats.map(cat => {
                    let subcats = cat.sub_categories.map(subcat => {
                        return subcat.name;
                    });
                    return {
                        name: cat.category.name,
                        subcategories: subcats
                    }
                });
                this.props.setCategories(categories)
            }
        }).catch(err => console.log(err));
  }
  
  onSearch(text){
     if(text.trim()!==''){
         this.props.navigation.push('SearchResult',{query:text});
     }
 }
 handler(){
     this.loadInitialProducts();
     this.loadCats();
 }
 openDrawer(){ 
     this.props.navigation.openDrawer();
 }
    render() { 
       
        return (  
            this.state.Mloading?<Loader/> :
            this.state.error?<EmptyItems  message="something went wrong">
                <RetryButton onRetry={this.handler.bind(this)}/>
            </EmptyItems>:
             <Wrapper noBackground>
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
                       {this.props.products.length?
                        <View style={{flex:1}}>
                            <ScrollView style={{flex:1}}>
                                <Text style={styles.label}>Latest Products</Text>
                                
                                    <Products
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                        products={this.props.products}
                                        onProductSelect={this.onProductSelect.bind(this)}
                                    />
                                {
                                    !this.state.hideLoadMoreButton &&
                                      <LoadMoreButton loading={this.state.loading} onPress={this.loadMoreProducts.bind(this)}/>
                                }
                            </ScrollView>
                         </View>:
                        <EmptyItems message="No products are available!"/>
                       }
                </ImageBackground>
              </Wrapper>
        ); 
    }
}


const styles = StyleSheet.create({
  
    label:{
        fontWeight:"bold",
        fontSize:25,
        paddingHorizontal:10,
        paddingVertical:10,
        color:"#fff"
    },
    bottom:{
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        display:"flex",
        alignItems:"center"
    }
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