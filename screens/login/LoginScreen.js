import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Button,TouchableOpacity } from 'react-native';

class LoginScreen extends Component {
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
                                <TextInput style={[styles.inputline,styles.input]}/>
                            </View>
                            <View className="input-row" style={styles.inputRow} >
                                <Text>Password</Text>
                                <TextInput secureTextEntry={true} style={[styles.inputline,styles.input]} />
                                <Text style={[styles.rightalign,{marginTop:10,marginBottom:10}]}>Forgot Password?</Text>
                            </View> 
                            <Button  color="#00C569" title="Sign in"></Button>
                    </View>
                   </View> 
                 <View>
                 <Text style={[styles.centerAlign,{marginTop:20,marginBottom:20}]}>-OR-</Text>
                </View>
                <View>
                  <Button title="SING UP" color="#FF3D00"/>
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
    }
  
});

export default LoginScreen;
