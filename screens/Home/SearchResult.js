import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView,ImageBackground} from 'react-native';
import Wrapper from './Wrapper';
import Products from './components/Products';
import Header from '../major_components/Header';

import {connect} from 'react-redux';
import Loader from '../major_components/Loader';
import EmptyItems from '../major_components/EmptyItems';
import { showMessage } from 'react-native-flash-message';


class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
        query:props.navigation.getParam('query'),
        loading:false,
        products:[]
    };
  }
  componentWillMount(){
    this.setState({
      loading:true
    })
    fetch(`${this.props.baseUrl}/products?q=${this.state.query}`, {
      method: "GET",
      headers: {
        "AUTH-TOKEN": this.props.AUTH_TOKEN,
        "Content-Type":"application/json"
      }
    }).then(res => res.json()).then(data => {
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
                    // images: carouselImages.length ? carouselImages : [require('../product_images/noimage.jpg')],
                    img: p.images[0] ? {
                      uri: p.images[0]
                    } : require('../Home/product_images/noimage.jpg'),
                    quantity: p.quantity
                  }
                  return parsedProduct;
              });
            this.setState({
              products:products,
            });
       }
       this.setState({
         loading:false
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
  render() {
    console.log("load finieshed,",this.state);
    return ( 
      this.state.loading?<Loader/>:
      <Wrapper>
        <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
        <View style={{marginBottom:40}}>
            <Header title="Results" backbutton backHandler={this.props.navigation.goBack}/>
              { this.state.products.length>0?
                <ScrollView>
                    <Products notitle
                      products={this.state.products}
                      onProductSelect={this.onProductSelect.bind(this)}
                  />
                </ScrollView>
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
