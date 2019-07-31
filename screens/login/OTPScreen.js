//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';
import styled from 'styled-components';
import { getCurrentFrame } from 'expo/build/AR';
import { TabHeading } from 'native-base';

// create a component
class MyClass extends Component {
    
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.validateOTP=this.validateOTP.bind(this);
        this.inputrefs=[];
        this.passcodes=Array(6).fill(null);

    }
    handleChange(event,current){
        let {text}=event.nativeEvent;
        this.passcodes[current-1]=text;
        if(text.length>0 && current != 6){
            this.inputrefs[current].focus();
        }
        if(current==6 || this.passcodes.join('').length==6){
            this.validateOTP();
        }
    }
    validateOTP(){
          let otpString=this.passcodes.join("");
          //dosomething with otpstring
          console.log(otpString);
          this.inputrefs[5].blur();
          
    }
    handleKeyPress(event,current){
        let {key}=event.nativeEvent;
        console.log(key); 
         if(key==="Backspace" && current > 1 && this.passcodes[current-1].length==0){
            this.inputrefs[current-2].focus(); 
        }
    }
    componentDidMount(){
        // this.input1.focus();
        this.inputrefs[0].focus();
    }
    render() {
        return (
            <View style={styles.container}>
              <View  style={{flexDirection:"row",display:"flex"}}>
                <OTPBox>
                    <TextInput maxLength={1} keyboardType="number-pad" ref={input1=>this.inputrefs.push(input1)} onChange={e=>this.handleChange(e,1)}  onKeyPress={e=>this.handleKeyPress(e,1)} style={styles.otp_input_style} ></TextInput>
                </OTPBox> 
                <OTPBox>
                    <TextInput maxLength={1} keyboardType="number-pad" ref={input2=>this.inputrefs.push(input2)} onChange={e=>this.handleChange(e,2)} onKeyPress={e=>this.handleKeyPress(e,2)} style={styles.otp_input_style} ></TextInput>
                </OTPBox> 
                <OTPBox>
                    <TextInput  maxLength={1} keyboardType="number-pad" ref={input3=>this.inputrefs.push(input3)} onChange={e=>this.handleChange(e,3)} onKeyPress={e=>this.handleKeyPress(e,3)} style={styles.otp_input_style} ></TextInput>
                </OTPBox> 
                <OTPBox>
                    <TextInput maxLength={1} keyboardType="number-pad" ref={input4=>this.inputrefs.push(input4)} onChange={e=>this.handleChange(e,4)} onKeyPress={e=>this.handleKeyPress(e,4)} style={styles.otp_input_style} ></TextInput>
                </OTPBox> 
                <OTPBox>
                    <TextInput maxLength={1} keyboardType="number-pad" ref={input5=>this.inputrefs.push(input5)} onChange={e=>this.handleChange(e,5)} onKeyPress={e=>this.handleKeyPress(e,5)} style={styles.otp_input_style} ></TextInput>
                </OTPBox> 
                <OTPBox>
                    <TextInput maxLength={1} keyboardType="number-pad" ref={input6=>this.inputrefs.push(input6)} onChange={e=>this.handleChange(e,6)} onKeyPress={e=>this.handleKeyPress(e,6)} style={styles.otp_input_style} ></TextInput>
                </OTPBox> 
              </View>
              <View style={{width:200,marginTop:30}}>
                <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",color:"#7f8c8d"}}>we have sent you a OTP to your Mobile Number! Enter here!</Text>
              </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    otp_input_style:{
        fontSize:30,
    }
});
 

const OTPBox=styled.View`
    border-width:2px;
    border-color:#2ecc71;
    width:50;
    height:50;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:10;
    margin-left:5;
`

//make this component available to the app
export default MyClass;
