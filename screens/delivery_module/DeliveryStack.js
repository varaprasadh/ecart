import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStackNavigator} from "react-navigation";
import DeliveryMain from "./DeliveryMain";
import DeliveryDetails from "./DeliveryDetails";
import ChangePassword from "./ChangePassword";
  
const DeliveryStack=createStackNavigator({
    DMain:DeliveryMain,
    DDettails:DeliveryDetails,
    ChangePassword: ChangePassword

},{
    initialRouteName: "DMain",
    headerMode:"none"
})

export default DeliveryStack

