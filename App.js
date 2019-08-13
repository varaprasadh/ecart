import React,{Component} from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';
import LoginStack from './screens/login/LoginStack';
import { createAppContainer,createStackNavigator } from 'react-navigation';
import HomeStack from "./screens/Home/HomeStack";

import EditProfile from "./screens/Home/ProfileScreens/EditProfile"
import ShippingAddress from "./screens/Home/ProfileScreens/ShippingAddress";
import OrderHistory from "./screens/Home/ProfileScreens/OrderHistory";
import OrderItemDetail from "./screens/Home/ProfileScreens/OrderItemDetail";

import CheckoutStack from "./screens/checkout/CheckoutStack";

import {Provider} from 'react-redux';
// import {createStore} from "redux";
import store from "./store/store";


const rootStack=createStackNavigator({
  LoginStack:LoginStack,
  HomeStack:HomeStack,
  EditProfile:EditProfile,
  ShippingAddress:ShippingAddress,
  OrderHistory:OrderHistory,
  Checkout:CheckoutStack,
  OrderItemDetail:OrderItemDetail,
},{
  initialRouteName: "HomeStack",
  headerMode:"none"
})


const RootNavigation=createAppContainer(rootStack);

// const store=createStore(()=>{},{})


export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <RootNavigation/>
      </Provider>
    )
  }
}
