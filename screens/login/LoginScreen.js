import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Button,TouchableOpacity,TouchableHighlight,ScrollView,ImageBackground } from 'react-native';

import {connect} from "react-redux"
import {AsyncStorage} from 'react-native';
import Loader from '../major_components/Loader';

import {showMessage} from "react-native-flash-message";
class LoginScreen extends Component {
  constructor(props){
    super(props)
     this.state={
      Email_Mobile:"",
      password:"",
      loading:false
    }
  }

  signIn(){
   
    let obj={
        email: this.state.Email_Mobile.trim().toLowerCase(),
        password:this.state.password.trim()
    };
    if(obj.email!='' && obj.password !=''){
       this.setState({
         loading:true
       })
        fetch(`${this.props.baseUrl}/login_with_password`, {
          method: "post",
          body: JSON.stringify(obj),
          headers: {
            "content-type": "application/json"
          }
        }).then(res => res.json()).then(data => {
          console.log(data)
          if (data.success == true) {
            AsyncStorage.setItem('AUTH_TOKEN', data.auth_token,(err)=>{
              AsyncStorage.setItem('ROLE', data.role);
              this.props.setAuthToken(data.auth_token);
              this.props.navigation.navigate('Main');
            })
          }else {
              this.setState({
                loading:false
              });
              showMessage({
                message:"login failed",
                type:"danger",
                description:"credintials might be wrong",
                autoHide:true
              });
          }
        })
    }
    
  }
  forgetPassword(){
    this.props.navigation.push("ForgetPassword");
  }
  
    render() { 
        return (
          this.state.loading?<Loader/>:
          <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
          <ScrollView contentContainerStyle={{flex:1}} showsHorizontalScrollIndicator={false}>
            <View className="container" style={styles.container}>  
              <View  style={styles.wrapper}>
                   <View className="signin-container" style={styles.signinContainer}>
                    <View style={{marginLeft:10}}>
                        <Text style={styles.title}>Welcome,</Text> 
                        <Text>Sign in to Continue</Text> 
                    </View>
                    <View className="form" style={[styles.form]}>
                            <View className="input-row" style={styles.inputRow}>
                                <Text style={styles.formLable}>Email</Text>
                                <TextInput 
                                   onSubmitEditing={()=>this.passwordInput.focus()}
                                   onChangeText={text=>this.setState({Email_Mobile:text})}
                                   keyboardType="email-address"
                                   returnKeyType="next" style={[styles.inputline,styles.input]}/>
                            </View>
                            <View className="input-row" style={styles.inputRow} >
                                <Text style={styles.formLable}>Password</Text>
                                <TextInput
                                    onChangeText={text=>this.setState({password:text})} 
                                    returnKeyType="go" secureTextEntry={true} style={[styles.inputline,styles.input,{marginBottom:10}]} />
                                {/* <TouchableOpacity onPress={this.forgetPassword.bind(this)} style={[styles.rightalign,{marginTop:10,marginBottom:10,}]}>
                                  <Text style={{color:"#e74c3c",fontWeight:"bold"}}>Forgot Password?</Text>
                                </TouchableOpacity> */}
                            </View> 
                            <TouchableOpacity style={styles.customBtn} onPress={this.signIn.bind(this)}>
                               <Text style={{color:"white",fontWeight:"bold"}}>Sign In</Text>
                            </TouchableOpacity>

                            <Text style={[styles.centerAlign,{marginTop:10,marginBottom:10}]}>-OR-</Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('SignWithOTP')} style={[styles.customBtn]}>
                              <Text style={{color:"white",fontWeight:"bold"}}>Sign In With OTP</Text>
                            </TouchableOpacity>
                    </View>
                   </View> 
                 <View>
                 <Text style={[styles.centerAlign,{marginTop:20,marginBottom:20,color:"white"}]}>-OR-</Text>
                </View>
                <View>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.push("SignUP") 
                   }}
                 style={[styles.customBtn,{borderColor:"#e74c3c",backgroundColor:"#e74c3c"}]}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Sign Up</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          </ImageBackground>
        );  
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        padding:10,
    },
    wrapper:{
      width:"100%",
      padding:10,
      marginTop: 100
    },
    signinContainer:{ 
        padding:10,
        backgroundColor:"#FFFFFF",
        borderRadius: 10,
        elevation:3
    },
    formLable:{
        fontWeight:"bold",
    
      },
    title:{
        fontWeight:"bold",
        fontSize:32
    },
    input:{
     fontSize:18,
     paddingRight:10,
     paddingTop:5,
     paddingBottom:5,
     paddingLeft:10,
     color: "#2980b9"
    },
    form:{
      padding:5,
      marginTop:20
    },
    inputRow:{
      display:"flex",
      marginTop:10
    },
    rightalign:{
      alignSelf:"flex-end"
    }, 
    centerAlign:{
        alignSelf:"center"
    },

    inputline:{
        borderBottomWidth:1,
        borderBottomColor:"green"
    },
    Buttonred:{
       backgroundColor:"red",
       alignSelf:"stretch"    
    },
    btn:{
     marginTop:5
    },
    customBtn:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center", 
      borderWidth:2,
      borderRadius:5,
      borderColor:"#2ecc71",
      backgroundColor:"#2ecc71",
      paddingTop:5,
      paddingBottom:5
    }
});

mapState = state => {
  return {
    baseUrl: state.Config.base_url
  }
}
mapDispatch=dispatch=>{
  return {
    setAuthToken:(AUTH_TOKEN)=>{dispatch({type:"SET_AUTH_TOKEN",AUTH_TOKEN})}
  }
}

export default connect(mapState,mapDispatch)(LoginScreen);
