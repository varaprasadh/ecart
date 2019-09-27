

import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import Product from "./components/Product_wishlist";
import Wrapper from './Wrapper';

import {connect} from "react-redux";
import Loader from '../major_components/Loader';
import EmptyItems from '../major_components/EmptyItems';
 


class WishList extends Component {
    

    componentWillMount(){
        fetch(`${this.props.baseUrl}/wish_list`,{
            method:"GET",
            headers:{
                "content-Type":"application/json",
                "AUTH-TOKEN":this.props.AUTH_TOKEN
            }
        }).then(res=>res.json()).then(data=>{
            if(data.success==true){
                let products=data.products;
                this.props.toggleLoading();
                this.props.loadWishlist(products);
            }
            this.setState({
                loading:false 
            });
             this.props.toggleLoading();
        }).catch(err=>console.error(err));
    }
   openProductPage(id){
       this.props.navigation.navigate('ExploreProduct',{id})
   }
    removeItem(id){ 
        obj={
            product_id:id 
        };
        fetch(`${this.props.baseUrl}/remove_item_from_wish_list`,{
            method:"DELETE",
            headers:{
                "content-Type":"application/json",
                "AUTH-TOKEN":this.props.AUTH_TOKEN 
            },
            body:JSON.stringify(obj)
        }).then(res=>res.json()).then(data=>{
            if(data.success==true){
                this.props.removeFromWishlist(id);
                this.props.changeCurrent(id,{isinWishlist:false});
            }
        }).catch(err=>console.log(err));       
    }
    render() {
        Items=[];
        this.props.wishlistItems.forEach((item,i)=>{
            Items.push(
                <Product key={i} onClick={this.openProductPage.bind(this)} productdata={item} onRemove={this.removeItem.bind(this)} />
            ); 
        })  
        return (
         this.props.loading?<Loader/>:
            Items.length>0?
            <Wrapper noBackground>
                    <View style={{flex:1}}>
                        <ScrollView style={{flex:1,paddingBottom:35}}>
                            {(()=>Items)()}
                        </ScrollView> 
                    </View>
            </Wrapper>:
            <EmptyItems message="Wishlist is Empty!"/>
        )    
            
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        
    },
 
    btn:{
        backgroundColor:"#27ae60",
        justifyContent:"center",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:40,
        paddingRight:40,
        borderRadius:5,   
    }
});
mapStatetoProps=state=>{
    let {Wishlist}=state;
    return {
        wishlistItems:Wishlist.items,
        loading:Wishlist.loading,
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return{
        removeFromWishlist:(id)=>{dispatch({type:"REMOVE_FROM_WISHLIST",id})},
        loadWishlist:(products)=>{dispatch({type:"LOAD_WISHLIST",products})},
        toggleLoading:()=>{dispatch({type:"TOGGLE_WISHLIST_LOADING"})},
        changeWishlistStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_WISHLIST_STATUS",id,value})},
        changeWishlistStatus_Result:(id,value)=>{dispatch({type:"MODIFY_SEARCH_ITEM_WISHLIST_STATUS",id,value})},
        changeCurrent:(id,obj)=>{dispatch({type:"CHANGE_CURRENT_ITEM_STATUS",id,obj})}
    }
}

export default connect(mapStatetoProps,mapDispatch)(WishList);


