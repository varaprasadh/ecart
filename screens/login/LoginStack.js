import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createStackNavigator,createDrawerNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from "./SignUpScreen";
import OTPScreen from "./OTPScreen";
import SignWithOTP from "./SignWithOTP";
import ForgetPassword from "./ForgetPassword";

import ResetPassword from "./ResetPassword";


const LoginStack =createStackNavigator({
    Login: LoginScreen,
    SignUP:SignUpScreen,
    OTP:OTPScreen,
    SignWithOTP:SignWithOTP,
    ForgetPassword: ForgetPassword,
    ResetPassword:ResetPassword
},{ 
    initialRouteName: "Login",
    headerMode:"none"
});

export default LoginStack;
