import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStackNavigator} from "react-navigation";
import Login from "./Login";
import DeliveryMain from "./DeliveryMain";
import DeliveryDetails from "./DeliveryDetails";

const DeliveryStack=createStackNavigator({
    DLogin:Login,
    DMain:DeliveryMain,
    DDettails:DeliveryDetails
},{
    initialRouteName: "DMain",
    headerMode:"none"
})

export default DeliveryStack
