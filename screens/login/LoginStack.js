//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from "./SignUpScreen";
import OTPScreen from "./OTPScreen";
import SignWithOTP from "./SignWithOTP";
import ForgetPassword from "./ForgetPassword";


const LoginStack =createStackNavigator({
    Login:LoginScreen, 
    SignUP:SignUpScreen,
    OTP:OTPScreen,
    SignWithOTP:SignWithOTP,
    ForgetPassword:ForgetPassword
},{
    initialRouteName:"SignWithOTP", 
    headerMode:"none"
})


export default LoginStack;
