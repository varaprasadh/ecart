import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ImageBackground,TextInput as Input} from 'react-native';

import {showMessage} from 'react-native-flash-message';
class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            submit_disabled:true,
            password:'',
            confirm_password:''
        }
    }
    
   confirm(){
        showMessage({
            message:"TODO",
            description:"it's not implimented yet",
            type:"warning"
        })
   } 
    render() {
        submit_disabled =!( this.state.password!='' && this.state.password===this.state.confirm_password);
        return (
        <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
        <View style={styles.container}>
            <View style={[styles.card]}>
               <Text style={{marginBottom:20,fontWeight:"bold",fontSize:20}}>Reset Password</Text>     
               <View  style={styles.inputRow}>
                    <Text style={styles.label} >
                     Enter Your New Password.
                    </Text>
                    <View style={styles.inputwrapper}>
                        <Input 
                        style={[styles.inputline,styles.input,]}
                        keyboardType="number-pad"
                        onChangeText={text=>this.setState({password:text})} 
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        returnKeyType="go"/>
                        <Input 
                            style={[styles.inputline,styles.input,{marginTop:10}]}
                            keyboardType="number-pad"
                            placeholder="Re-Enter Password"
                            secureTextEntry={true}
                            onChangeText={text=>this.setState({confirm_password:text})}
                            returnKeyType="go"/>
                    </View>
                    <TouchableOpacity 
                        onPress={this.confirm.bind(this)} 
                        disabled={submit_disabled} 
                        style={[styles.btn,{backgroundColor:submit_disabled?"#95a5a6":"#2ecc71"}]}>
                           <Text style={{fontSize:20,color:"white",elevation:2}}>SUBMIT</Text>
                   </TouchableOpacity>
                </View>
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
        // alignItems: 'center',
    },
    input:{
        fontSize:20,
        paddingHorizontal:10,
        paddingTop:1,
        fontSize:16,       
    },
    inputline:{
        borderColor:"#7f8c8d",
        borderBottomWidth:1
    },
    inputRow:{
        marginBottom:5,
      },
      inputwrapper:{
        display:"flex"
      },
    row:{
        display:"flex",
        flexDirection:"row",
        marginBottom:5,
      },
      label:{
        fontWeight:"bold",
        color: "#e74c3c",
        marginBottom:20
    },
    card:{
        backgroundColor:"white",
        paddingVertical:10,
        paddingHorizontal:30,
        elevation:3,
        borderRadius:5,
        marginHorizontal:20
    },
    btn:{
        paddingVertical:5,
        backgroundColor:"green",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: 20,
        borderRadius:5,
    },
});

export default ForgetPassword;
