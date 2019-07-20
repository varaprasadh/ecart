import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Button,TouchableOpacity,TouchableHighlight } from 'react-native';

class LoginScreen extends Component {
  constructor(props){
    super(props)
    const state={
      Email_Mobile:"",
      Password:""
    }
  }


  signIn(){
    //TODO 
    //make api call and check response

  }
 
  
    render() {
        return (
            <View className="container" style={styles.container}>
              <View  style={styles.wrapper}>
                   <View className="signin-container" style={styles.signinContainer}>
                    <View style={{marginLeft:10}}>
                        <Text style={styles.title}>Welcome,</Text> 
                        <Text>Sign in to Continue</Text> 
                    </View>
                    <View className="form" style={[styles.form]}>
                            <View className="input-row" style={styles.inputRow}>
                                <Text>Email or Mobile</Text>
                                <TextInput onSubmitEditing={()=>this.passwordInput.focus()} returnKeyType="next" style={[styles.inputline,styles.input]}/>
                            </View>
                            <View className="input-row" style={styles.inputRow} >
                                <Text>Password</Text>
                                <TextInput ref={passwordInput=>this.passwordInput=passwordInput} returnKeyType="go" secureTextEntry={true} style={[styles.inputline,styles.input]} />
                                <TouchableOpacity onPress={()=>this.props.navigation.push("ForgetPassword")} style={[styles.rightalign,{marginTop:10,marginBottom:10,}]}>
                                  <Text style={{color:"#e74c3c",fontWeight:"bold"}}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View> 
                            <TouchableOpacity style={styles.customBtn} onPress={()=>{
                              this.props.navigation.push('HomeStack')
                            }}>
                               <Text style={{color:"white",fontWeight:"bold"}}>Sign In</Text>
                            </TouchableOpacity>

                            <Text style={[styles.centerAlign,{marginTop:10,marginBottom:10}]}>-OR-</Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.push('SignWithOTP')} style={[styles.customBtn]}>
                              <Text style={{color:"white",fontWeight:"bold"}}>Sign In With OTP</Text>
                            </TouchableOpacity>

                    </View>
                   </View> 
                 <View>
                 <Text style={[styles.centerAlign,{marginTop:20,marginBottom:20}]}>-OR-</Text>
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
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#F5F5F5",
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
        borderRadius: 10
    },
    title:{
        fontWeight:"bold",
        fontSize:32
    },
    input:{
     fontSize:20,
     paddingRight:10,
     paddingTop:5,
     paddingBottom:5,
     paddingLeft:10
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

export default LoginScreen;
