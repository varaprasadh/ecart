import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ImageBackground,TextInput as Input} from 'react-native';

import {showMessage} from 'react-native-flash-message';
class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            submit_disabled:true,
            password:'',
            confirm_password:'',
            mobile: this.props.navigation.getParam('mobile'),
            otp: this.props.navigation.getParam('otp'),
        }
    }
    
   confirm(){
       let obj={
           otp:this.state.otp, 
           password:this.state.password,
           password_confirmation:this.state.confirm_password,
           phone_number:this.state.mobile
       }
      this.setState({
          loading:true
      });
       fetch('http://18.219.157.9/reset_password', {
           method: "POST",
           headers: {
               "content-Type": "application/json"
           },
           body: JSON.stringify(obj)
       }).then(res=>res.json()).then(data=>{
        if(data.success==true){
            showMessage({
                message:"success",
                description:"password has been reset!",
                type:"success"
            });
        }else{
             showMessage({
               message:"Failed",
               description:"something went wrong,Try Again Later!",
               type:"danger"
           });
        }
        this.setState({
            loading:false
        });
        this.props.navigation.navigate('Login');
       }).catch(err=>{
           this.setState({
               loading:false
           });
           showMessage({
               message:"Failed",
               description:"something went wrong,Try Again Later!",
               type:"danger"
           });
           this.props.navigation.navigate('Login');
       })
   } 
    render() {
        submit_disabled =!( this.state.password!='' && this.state.password.length>7 && this.state.password===this.state.confirm_password);
        return (
        <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
        <View style={styles.container}>
            <View style={[styles.card]}>
               <Text style={{marginBottom:20,fontWeight:"bold",fontSize:20}}>Reset Password</Text>     
               <View  style={styles.inputRow}>
                    <Text style={styles.label} >
                     Enter Your New Password.Password Length Must Be Minimum Of 8 Characters!
                    </Text>
                    <View style={styles.inputwrapper}>
                        <Input 
                        style={[styles.inputline,styles.input,]}
                        onChangeText={text=>this.setState({password:text})} 
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        returnKeyType="go"/>
                        <Input 
                            style={[styles.inputline,styles.input,{marginTop:10}]}
                            placeholder="Re-Enter Password"
                            secureTextEntry={true}
                            value={this.state.confirm_password}
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
