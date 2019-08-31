import React,{Component} from 'react';
import { StyleSheet, Text, View ,StatusBar,NetInfo} from 'react-native';
import LoginStack from './screens/login/LoginStack';
import { createAppContainer,createStackNavigator,createSwitchNavigator } from 'react-navigation';
import HomeStack from "./screens/Home/HomeStack";

import OrderHistory from "./screens/Home/ProfileScreens/OrderHistory";
import OrderItemDetail from "./screens/Home/ProfileScreens/OrderItemDetail";

import CheckoutStack from "./screens/checkout/CheckoutStack";

import EditProfile from "./screens/Home/ProfileScreens/EditProfile";
import ChangePassword from "./screens/Home/ProfileScreens/ChangePassword";
import ProductMain from "./screens/Home/ProductMain"
import SearchResult from "./screens/Home/SearchResult";

import DeliveryStack from "./screens/delivery_module/DeliveryStack";


import {Provider} from 'react-redux';
import store from "./store/store";

import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";

const rootStack=createStackNavigator({
  HomeStack:HomeStack,
  OrderHistory:OrderHistory,
  ExploreProduct:ProductMain,
  SearchResult: SearchResult,
  Checkout:CheckoutStack,
  EditProfile:EditProfile,
  ChangePassword: ChangePassword,
  OrderItemDetail:OrderItemDetail,

},{
  initialRouteName: "OrderHistory", 
  headerMode:"none"                                                                                                                                                                                                                                       
})
 
const root = createSwitchNavigator({
   LoginStack: LoginStack,
   Main:rootStack,
   Delivery: DeliveryStack
},{  
  initialRouteName: "Main",
  headerMode:"none",
})
 
const GlobalState = store.getState();

baseUrl=GlobalState.Config.base_url;
AUTH_TOKEN=GlobalState.Config.AUTH_TOKEN;

const RootNavigation = createAppContainer(root);

 //korada.santoshkumar611@gmail.com

export default class App extends Component{
  
    componentDidMount() {
      
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }  
    handleConnectivityChange = isConnected => {
      if (!isConnected) {
          showMessage({
            message: "No internet!",
            description: "make sure you are connected to internet",
            type: "danger",
            autoHide: false
          });
      }else{
        hideMessage();
      }
    };
  
  render(){
    
    return(
      <Provider store={store}>
        <View style={{flex:1}}>
          <RootNavigation/>
          <FlashMessage position="top"/>
        </View>
      </Provider>
    )
  }
}
