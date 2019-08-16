

import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import Product from "./components/Product_wishlist";
import Wrapper from './Wrapper';

import {connect} from "react-redux";
import Loader from '../major_components/Loader';
import EmptyItems from '../major_components/EmptyItems';
 


class WishList extends Component {
    
    componentDidMount(){
        this.props.loadWishlist();
        setTimeout(()=>{ 
          this.props.toggleLoading();
        },2000)
    }
    removeItem(id){
        this.props.removeFromWishlist(id);
        //from main
       if(this.props.mainIntentActive){
          this.props.changeWishlistStatus(id, false)
       }else{
           //change status from result data
           this.props.changeWishlistStatus_Result(id,false);
       }
        
    }
    render() {
        Items=[];
        this.props.wishlistItems.forEach((item,i)=>{
            Items.push(
                <Product key={i} productdata={item} onRemove={this.removeItem.bind(this)} />
            ); 
        }) 
        return (
         this.props.loading?<Loader/>:
            Items.length>0?
            <Wrapper>
                    <View style={{flex:1,marginTop:-10}}>
                        <ScrollView style={{flex:1,paddingBottom:35}}>
                            {(()=>Items)()}
                        </ScrollView> 
                    </View>
            </Wrapper>:
            <EmptyItems message="no items in wish list yet!!!"/>
        
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
        mainIntentActive: state.Addition.isCurrentMain
    }
}
mapDispatch=dispatch=>{
    return{
        removeFromWishlist:(id)=>{dispatch({type:"REMOVE_FROM_WISHLIST",id})},
        loadWishlist:()=>{dispatch({type:"LOAD_WISHLIST"})},
        toggleLoading:()=>{dispatch({type:"TOGGLE_WISHLIST_LOADING"})},
        changeWishlistStatus:(id,value)=>{dispatch({type:"MODIFY_ITEM_WISHLIST_STATUS",id,value})},
        changeWishlistStatus_Result:(id,value)=>{dispatch({type:"MODIFY_SEARCH_ITEM_WISHLIST_STATUS",id,value})}
    }
}

export default connect(mapStatetoProps,mapDispatch)(WishList);


