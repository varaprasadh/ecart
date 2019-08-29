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

import {Provider} from 'react-redux';

import store from "./store/store";

import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";

const rootStack=createStackNavigator({
  HomeStack:HomeStack,
  OrderHistory:OrderHistory,
  Checkout:CheckoutStack,
  EditProfile:EditProfile,
  ChangePassword: ChangePassword,
  OrderItemDetail:OrderItemDetail,

},{
  initialRouteName: "HomeStack",
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
          profile = data.profile;
          let obj={
            firstName: profile.first_name,
            lastName: profile.last_name,
            mobile: profile.phone_number,
            email: profile.email,
            address: profile.user_address
          }
          store.dispatch({type:"SET_PROFILE",profile:obj});
        }
      }).catch(err=>console.log(err));
      fetch(`${baseUrl}/category_with_sub_category`,{
        method:"GET",
        headers:{
           "AUTH_TOKEN": AUTH_TOKEN
        }
      }).then(res=>res.json()).then(data=>{
        if(data.success==true){
          let rawCats = data.categories;
          let categories=rawCats.map(cat=>{
            let subcats = cat.sub_categories.map(subcat=>{
              return subcat.name;
            });
            return {
              name: cat.category.name,
              subcategories:subcats
            }
          });
          store.dispatch({type:"LOAD_CATS",categories});
        }
      })
    } 
  /*
   categories: [{
       name: "Sports",
       subcategories: ["Tennis", "cricket", "hockey"]
     },
     {
       name: "Genaral",
       subcategories: ["shesha", "toys"]
     },
     {
       name: "Shesha",
     },
   ]
  */
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
