//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity,ImageBackground,AsyncStorage} from 'react-native';
import styled from 'styled-components';
import Loader from '../major_components/Loader';
import {connect} from 'react-redux'
import Wrapper from '../Home/Wrapper';
import {showMessage} from "react-native-flash-message";

class MyClass extends Component {
    
    constructor(props){
        super(props);
        this.state={
            btnDisabled:false,
            mobile:this.props.navigation.getParam('mobile'),
            type:this.props.navigation.getParam('type'),
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
       
        otpString = this.passcodes.join("");
        obj={
            phone_number:this.state.mobile,
            otp:otpString
        };
        this.setState({
            loading:true
        });
      if(this.state.type=="signup")  {
          console.log("signing up");
           fetch(`${this.props.baseUrl}/confirm_registration`, {
               method: "post",
               body: JSON.stringify(obj),
               headers: {
                   "content-type": "application/json"
               }
           }).then(res => res.json()).then(data => {
               if (data.success == true) {
                   //set config
                   //store auth_key in local
                  console.log("registration done");
                   showMessage({
                         type:"success",
                         message:"Success",
                         description:"Account Created Successfully!",
                         autoHide:true
                   });
                //    this.props.navagation.navigate('Login');
                    let AUTH_TOKEN = data.auth_token;
                    let role = data.role;
                    this.props.setAuthToken(AUTH_TOKEN);
                    AsyncStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
                    AsyncStorage.setItem('ROLE', role);
                    if (/customer/i.test(role)) {
                        this.props.navigation.navigate('Main');
                    } else {
                        showMessage({
                            type: "warning",
                            message: "Access Denied",
                            description: "only customers can access",
                            autoHide: true
                        });
                    }

               }else{
                   console.log("something wrong happend");
                   showMessage({
                       type:"danger",
                       message:"Failed",
                       description:"invalid OTP,try again",
                       autoHide:true
                   });
               }
               this.setState({
                   loading: false
               });
 
              
           }).catch(err =>{
               console.log("catcch")
               thi.setState({
                   loading:false
               })
           }); 
      }
      if (this.state.type == "signin_with_otp"){
          console.log("login with otp");
          fetch(`${this.props.baseUrl}/login_with_otp`,{
              method:"POST",
              headers:{
                  "content-Type":"application/json"
              },
              body:JSON.stringify(obj)
          }).then(res=>res.json()).then(data=>{
              if(data.success==true){
                 // save auth token
                 //navigate to main 
                     let AUTH_TOKEN = data.auth_token;
                     let role=data.role;
                     this.props.setAuthToken(AUTH_TOKEN);
                     AsyncStorage.setItem('AUTH_TOKEN',AUTH_TOKEN);
                     AsyncStorage.setItem('ROLE',role);
                     if(/customer/i.test(role)){
                         this.props.navigation.navigate('Main');
                     }else{
                         showMessage({
                             type:"warning",
                             message:"Access Denied",
                             description:"only customers can access",
                             autoHide:true
                         });
                     }
              }else{
               showMessage({
                   message:"wrong credintials",
                   description:"your mobile number or OTP might be wrong!",
                   autoHide:true,
                   type:"danger"
               });
               this.props.navigation.goBack();
              }
              this.setState({
                  loading:false
              });
              /*
                   {
                       message: "Verified successfully",
                       role: user.role,
                       success: true,
                       profile: user,
                       auth_token: generate_auth_token(user)
                   }
                   
                   */
          })
      }
      

    }
    render() {
        return (
        this.state.loading?<Loader/>:
       <ImageBackground source={require('../images/backgroundimage.jpg')} style={{width:"100%",height:"100%"}}>
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
                   onPress={this.login.bind(this)}
                   disabled={this.state.btnDisabled}  style={[styles.btn_signup,{backgroundColor:"#2ecc71"}]}>
               <Text style={{color:"white"}}>CONTINUE</Text>
              </TouchableOpacity> 
            </View>
        </View>
        </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
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
mapDispatch=dispatch=>{
    return {
        setAuthToken: (AUTH_TOKEN)=>{dispatch({type:"SET_AUTH_TOKEN",AUTH_TOKEN})}
    }
}

export default connect(mapState,mapDispatch)(MyClass);
