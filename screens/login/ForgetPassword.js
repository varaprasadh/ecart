//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {Input} from 'native-base';
// create a component
class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            submit_disabled:true,
            password1:'',
            password2:''
        }
        this.validate=this.validate.bind(this);

    }

   validate(key,value){
    this.setState({
        [key]:value
    },()=>{
        let {password1,password2}=this.state;
        this.setState({
            submit_disabled:!(password1==password2 && password1!=''&& password1.length>4)
        })
    })
   }
   changePassword(){
       
   }
    render() {
        return (
        <View style={styles.container}>
            <View style={[styles.card]}>
               <Text style={{marginBottom:20,fontWeight:"bold",fontSize:20}}>Reset Password</Text>     
               <View className="input-row" style={styles.inputRow}>
                    <Text style={styles.label} >Password</Text>
                    <Input 
                        ref={password=>this.password=password}
                        style={[styles.inputline,styles.input]}
                        secureTextEntry={true}
                        onChangeText={text=>this.validate("password1",text)}
                        returnKeyType="next"/>
                </View>
                <View className="input-row" style={styles.inputRow}>
                        <Text style={styles.label} >Confirm Password</Text>
                        <Input
                            ref={c_password=>this.c_password=c_password}
                            style={[styles.inputline,styles.input]}
                            onChangeText={text=>this.validate("password2",text)}
                            secureTextEntry={true}
                            returnKeyType="go"/> 
                </View>
                <TouchableOpacity 
                    onPress={this.changePassword.bind(this)} 
                    disabled={this.state.submit_disabled} 
                        style={[styles.btn,{backgroundColor:this.state.submit_disabled?"gray":"green"}]}>
                        <Text style={{fontSize:20,color:"white",elevation:6}}>Confirm</Text>
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
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    input:{
        fontSize:20,
        paddingRight:10,
        paddingTop:1,
        paddingLeft:10,
        width:300
       },
       inputline:{
         borderWidth:1,
         borderColor:"#7f8c8d",
         borderRadius: 5,
    },
    inputRow:{
        display:"flex",
        marginBottom:5,
        height:50
      },
      label:{
        fontWeight:"bold",
        color:"#2ecc71"
    },
    card:{
        backgroundColor:"white",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
        elevation:3,
        borderRadius:5
    },
    btn:{
        paddingBottom:5,
        paddingTop:5,
        backgroundColor:"green",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: 20,
        borderRadius:5,
    },
});

//make this component available to the app
export default ForgetPassword;
