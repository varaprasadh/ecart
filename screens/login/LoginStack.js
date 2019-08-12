//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createStackNavigator,createDrawerNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from "./SignUpScreen";
import OTPScreen from "./OTPScreen";
import SignWithOTP from "./SignWithOTP";
import ForgetPassword from "./ForgetPassword";

import DeliveryStack from "../delivery_module/DeliveryStack";

const drawer = createDrawerNavigator({
    MainLogin: {
        screen: LoginScreen,
        navigationOptions: {
            title: "customer login",
        }
    },
    DLogin: {
        screen: DeliveryStack,
        navigationOptions: {
            title: "delivery men login",
        }
    }
}, {
    initialRouteName: "MainLogin"
})


const LoginStack =createStackNavigator({
    Login:drawer, 
    SignUP:SignUpScreen,
    OTP:OTPScreen,
    SignWithOTP:SignWithOTP,
    ForgetPassword:ForgetPassword
},{
    initialRouteName: "Login",
    headerMode:"none"
})





export default LoginStack;
