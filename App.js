import React,{Component} from 'react';
import { StyleSheet, Text, View ,StatusBar,NetInfo} from 'react-native';
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

import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";

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
