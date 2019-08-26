import React,{Component} from 'react';
import { StyleSheet, Text, View ,StatusBar,NetInfo} from 'react-native';
import LoginStack from './screens/login/LoginStack';
import { createAppContainer,createStackNavigator,createSwitchNavigator } from 'react-navigation';
import HomeStack from "./screens/Home/HomeStack";

import ShippingAddress from "./screens/Home/ProfileScreens/ShippingAddress";
import OrderHistory from "./screens/Home/ProfileScreens/OrderHistory";
import OrderItemDetail from "./screens/Home/ProfileScreens/OrderItemDetail";

import CheckoutStack from "./screens/checkout/CheckoutStack";

import {Provider} from 'react-redux';

import store from "./store/store";

import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";

const rootStack=createStackNavigator({
  HomeStack:HomeStack,
  ShippingAddress:ShippingAddress,
  OrderHistory:OrderHistory,
  Checkout:CheckoutStack,
  OrderItemDetail:OrderItemDetail,
},{
  initialRouteName: "OrderHistory",
  headerMode:"none"
})
 
const root = createSwitchNavigator({
   LoginStack: LoginStack,
   Main:rootStack
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
  
    componentWillMount(){
      fetch(`${baseUrl}/profile`,{
        method:"GET",
        headers:{
          "AUTH_TOKEN": AUTH_TOKEN
        }
      }).then(res=>res.json()).then(data=>{
        if(data.success==true){
          profile=data.profile;
          let obj={
            name: profile.first_name + " " + profile.last_name,
            mobile: profile.phone_number,
            email: profile.email
          }
          store.dispatch({type:"SET_PROFILE",profile:obj});
        }
      })
      /*
      {
        "success": true,
        "profile": {
          "id": 8,
          "first_name": "Admin",
          "last_name": null,
          "phone_number": "8990",
          "email": "hafed_admin@gmail.com",
          "password_digest": "$2a$12$sAxtJjHjhZ4jgSy37MDYguhIG321mBvp7oqMgq4.VefOOVfWqFWsW",
          "address": null,
          "role": "Admin",
          "active": true,
          "created_at": "2019-08-10T11:06:20.901Z",
          "updated_at": "2019-08-10T11:06:20.901Z",
          "user_address": null
        }
      }
      
      */
    } 

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
