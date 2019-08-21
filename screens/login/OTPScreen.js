//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Loader from '../major_components/Loader';
import {connect} from 'react-redux'

class MyClass extends Component {
    
    constructor(props){
        super(props);
        this.state={
            btnDisabled:false,
            mobile:this.props.navigation.getParam('mobile'),
            loading:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
        this.inputrefs=[];
        this.passcodes=Array(6).fill(null);
        this.login=this.login.bind(this);
        
    }
    handleChange(event,current){
        let {text}=event.nativeEvent;
        this.passcodes[current-1]=text;
        if(text.length>0 && current != 6){
            this.inputrefs[current].focus();
        }
        if(current==6 || this.passcodes.join('').length==6){
           this.inputrefs[5].blur();
        }
    }
   
    handleKeyPress(event,current){
        let {key}=event.nativeEvent;
        console.log(key); 
         if(key==="Backspace" && current > 1 && this.passcodes[current-1].length==0){
            this.inputrefs[current-2].focus(); 
        }
    }
    componentDidMount(){
        this.inputrefs[0].focus();
    }
    login(){
        /*
        {
            "phone_number": "+918500589739",
            "otp": "256035"
        }*/
        otpString = this.passcodes.join("");
        let obj={
            phone_number:this.state.mobile,
            otp:otpString
        };
        this.setState({
            loading:true
        });
        
       fetch(`${this.props.baseUrl}/confirm_registration`,{
           method:"post",
           body:JSON.stringify(obj),
           headers:{
               "content-type":"application/json"
           }
       }).then(res=>res.json()).then(data=>{
           if(data.success==true){
               //set config
               this.props.navagation.navigate('')
           }
           this.setState({
               loading:false
           })
           console.log(data);
       })

    }
    render() {
        return (
        this.state.loading?<Loader/>:
        <View style={styles.container}>
            <View style={styles.card}>
             <Text style={styles.label}>Verification</Text>
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
              <TouchableOpacity
                   onPress={this.login}
                   disabled={this.state.btnDisabled}  style={[styles.btn_signup,{backgroundColor:"#2ecc71"}]}>
               <Text style={{color:"white"}}>CONTINUE</Text>
              </TouchableOpacity> 
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
        alignItems:"center",
        backgroundColor: '#ecf0f1',
       
    },
    otp_input_style:{
        fontSize:30,
    },
    label:{marginBottom:10, fontSize:25,fontWeight:"bold",paddingVertical:10,alignSelf:"flex-start"},
    card:{ alignItems: 'center',backgroundColor:"#fff",
     elevation:3,paddingHorizontal:10,paddingVertical:20,
     borderRadius: 5,
    }, 
    btn_signup:{
        height:50,
        backgroundColor:"#2ecc71",
        color:"#fff",
        display:"flex",
        justifyContent: 'center',
        alignItems:"center",
        paddingHorizontal:20,
        marginTop:10
    },
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

mapState = state => {
    return {
        baseUrl: state.Config.base_url
    }
}

export default connect(mapState)(MyClass);
