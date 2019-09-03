import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStackNavigator} from 'react-navigation';
import CheckAddress from "./CheckAddress";
import CheckPayment from "./CheckPayment";
import CheckSummery from "./CheckSummery";
import CheckAddressSelect from "./CheckAddressSelect";


const CheckoutStack=createStackNavigator({
    CheckAddressSelect: CheckAddressSelect,
    CheckAddress:CheckAddress,
    CheckPayment:CheckPayment,
    CheckSummery:CheckSummery
},{   
     initialRouteName: "CheckAddress",
     headerMode:"none"
})

export default CheckoutStack;
