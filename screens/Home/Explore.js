import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    RefreshControl,
    ScrollView,
    FlatList,
    ImageBackground,
    TouchableWithoutFeedback,
} from 'react-native';
import noImage from './product_images/noimage.jpg';


import Wrapper from "./Wrapper";
import SearchBar from  "./components/SearchBar";
import Products from "./components/Products";
import LoadMoreButton from "./components/LoadMoreButton";
import {Ionicons} from "@expo/vector-icons";

import {connect} from 'react-redux';

import Loader from "../major_components/Loader";
import EmptyItems from '../major_components/EmptyItems';
import RetryButton from '../major_components/RetryButton';
import Product_Explore from './components/Product_Explore';
import { showMessage } from 'react-native-flash-message';
import Axios from 'axios';


class Explore extends Component {
    constructor(props){
        super(props);
        this.state={
            Mloading:false,
            loading:false,  
            page:1,
            error:false,
            refreshing:false,
            products:[]
        }
       this.loadCats=this.loadCats.bind(this);
       this.onRefresh=this.onRefresh.bind(this);
       this.loadInitialProducts = this.loadInitialProducts.bind(this);
    }

   onProductSelect(product){
        if (this.props.AUTH_TOKEN == "") {
            showMessage({
                description: "Login To Use Full Features, Click This to Exit Guest Mode",
                message: "Login Required",
                type: "danger",
                onPress: () => this.props.navigation.navigate('Login')
            });
            
        }else{
           this.props.navigation.push("ExploreProduct",{id:product.id}); 
        }
   }
  loadMoreProducts(){

       this.setState({
           loading:true,
       });
       Axios.get("/products",{params:{page:this.state.page},headers:{
          "AUTH-TOKEN": this.props.AUTH_TOKEN
       }}).then(({data})=>{
          if(data.success==true){
              
            if (data.products.length == 0) {
                this.setState({
                    hideLoadMoreButton: true
                })
            }else{
             let _products = data.products.map(p => this.parseProduct(p))
             this.setState({
                 page: this.state.page + 1,
                 hideLoadMoreButton:data.finished,
                 loading: false,
                //  products: [...this.state.products, ..._products],
             });
             this.props.loadMore(_products);
            }
            
          }
      }).catch(err=>{
          //handle error
      }); 
       
  }
   parseProduct(p) {
      carouselImages = p.images.map(imgurl => {
          return {
              uri: imgurl
          }
      });
      let parsedProduct = {
          id: p.id,
          title: p.item_name,
          category: p.category,
          description: p.category,
          price: p.price,
          isInCart: p.is_incart,
          isinWishlist: p.is_inwishlist,
          images: carouselImages.length ? carouselImages : [require("./product_images/noimage.jpg")],
          img: p.images[0] ? {
              uri: p.images[0]
          }: require("./product_images/noimage.jpg"),
          quantity: p.quantity,
      }
      return parsedProduct;
  }

  loadInitialProducts(){


       this.setState({
          Mloading:true
      });

     console.log(Axios.defaults.baseURL,"damn");
      Axios.get(`/products`,{params:{page:this.state.page},headers:{ "AUTH-TOKEN": this.props.AUTH_TOKEN}})
      .then(({data})=>{
          if(data.success==true){
              if(data.products.length<=4){
                 
                  this.setState({
                      hideLoadMoreButton:true
                  })
              }
              let _products=data.products.map(p=>this.parseProduct(p))
              this.setState({
                  page: this.state.page + 1,
                //   products:[...this.state.products,..._products]
                });
              this.props.loadProducts(_products);

          } 
          this.setState({
              Mloading:false,
              error:false,
              refreshing: false
          })
      }).catch(err=>{
          console.log(err);
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
      },()=>{
          this.loadInitialProducts();
      });
      
  }

  componentWillMount(){ 
      this.loadInitialProducts();
      this.loadCats();
  }

  async loadCats(){
       
        let categories=[];
        try{
            let data = await Axios.get("/category").then(({data})=>data);
            let _categories=data.categories;
            _categories.map(async cat=>{
                var subcats = await Axios.get("/sub_category",{params:{category_id:cat.id}}).then(({data})=>data);
                var _subcats = subcats.sub_categories.map(subcat => subcat.name);
                categories.push({
                    name:cat.name,
                    subcategories:_subcats
                });
            });
            this.props.setCategories(categories);
        }
        catch(err){
            //handle the error for subcategoris
        }
       
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
                                <View style={{flex:1}}>       
                                    <View style={{paddingHorizontal:10}} >
                                        <FlatList
                                            data={this.props.products}
                                            numColumns={2}
                                            keyExtractor={(item)=>item.id.toString()}
                                            renderItem={({item})=> (
                                                    <Product_Explore 
                                                        onProductSelect={this.onProductSelect.bind(this)}
                                                        product={item}
                                                    />)}
                                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}
                                            ListHeaderComponent ={()=>(<Text style={styles.label}>Latest Products</Text>)}
                                            ListFooterComponent={()=>(!this.state.hideLoadMoreButton &&
                                            <LoadMoreButton loading={this.state.loading} onPress={this.loadMoreProducts.bind(this)}/>)}
                                        />

                                    </View>
                                    {
                                        
                                    }
                                </View>
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
    },
    productContainer: {
        flex: 1,
        alignItems:"center"
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