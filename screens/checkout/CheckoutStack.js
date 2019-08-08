import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStackNavigator} from 'react-navigation';
import CheckAddress from "./CheckAddress";
import CheckPayment from "./CheckPayment";
import CheckSummery from "./CheckSummery";



const CheckoutStack=createStackNavigator({
    CheckAddress:CheckAddress,
    CheckPayment:CheckPayment,
    CheckSummery:CheckSummery
},{
     initialRouteName:"CheckSummery",
     headerMode:"none"
})

export default CheckoutStack;
