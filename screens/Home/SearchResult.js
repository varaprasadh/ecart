import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView,ImageBackground,FlatList} from 'react-native';
import Wrapper from './Wrapper';
import Header from '../major_components/Header';

import {connect} from 'react-redux';
import Loader from '../major_components/Loader';
import EmptyItems from '../major_components/EmptyItems';
import { showMessage } from 'react-native-flash-message';
import Product_Explore from './components/Product_Explore';
import Axios from 'axios';


class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
        query:props.navigation.getParam('query'),
        loading:false,
        products:[],
        page:1,
        loadignMore:false,
        finished:false
    };
    this.loadProducts=this.loadProducts.bind(this);
  }
  componentWillMount(){
    this.setState({
      loading:true
    })
    this.loadProducts();
    
  }

  loadProducts(){
    Axios.get("/products",{params:{page:this.state.page},headers:{"AUTH-TOKEN": this.props.AUTH_TOKEN,}})
    .then(({data}) => {
       if(data.success==true){
              products=data.products;
              products=products.map(p=>{
                  let parsedProduct = {
                    id: p.id,
                    title: p.item_name,
                    category: p.category,
                    description: p.category,
                    price: p.price,
                    isInCart: p.is_incart,
                    isinWishlist: p.is_inwishlist,
                    img: p.images[0] ? {
                      uri: p.images[0]
                    } : require('../Home/product_images/noimage.jpg'),
                    quantity: p.quantity
                  }
                  return parsedProduct;
              });
            this.setState({
              page:this.state.page+1,
              products:[...this.state.products,...products],
              finished:data.finished,
            });
       }
       this.setState({
         loading:false,
         loadignMore:false
       });
    }).catch(err=>{
      this.setState({
        loading:false 
      });
    }); 
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
  loadMore(){
     if(!this.state.loadignMore && !this.state.finished){
       this.setState({
         loadignMore: true
       });
       this.loadProducts();
     }
  }
  renderFooter(){
    return(
      (this.state.loadignMore) &&
        <View style={{alignItems:"center",paddingVertical:5}}>
          <Text style={{fontSize:20,color:"#27ae60"}}>Loading...</Text>
        </View>
    )
  }
  render() {
    return ( 
      this.state.loading?<Loader/>:
      <Wrapper>
        <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
        <View style={{flex:1}}>
            <Header title="Results" backbutton backHandler={this.props.navigation.goBack}/>
              { this.state.products.length>0? 
            <View style={{flex:1}}>
              <FlatList
                  style={{flex:1}}
                  data={this.state.products}
                  numColumns={2}
                  keyExtractor={(item)=>item.id+""}
                  onEndReached={this.loadMore.bind(this)}
                  onEndReachedThreshold={0.5}
                  renderItem={({item})=> (
                      <Product_Explore 
                              onProductSelect={this.onProductSelect.bind(this)}
                              product={item}
                        />
                      )}
                  ListFooterComponent={this.renderFooter.bind(this)}
                  initialNumToRender={10}   
                    />
            </View>
            :<EmptyItems message="No Products Found!"/>}
        </View>
        </ImageBackground>
      </Wrapper>
    );
  }
}

mapState=state=>{
    return {
      baseUrl: state.Config.base_url,
      AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
    }
}
export default connect(mapState,mapDispatch)(SearchResult);
