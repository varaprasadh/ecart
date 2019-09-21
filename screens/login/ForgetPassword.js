import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ImageBackground,TextInput as Input} from 'react-native';

class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            submit_disabled:true,
            email:''
        }
    }
    
   confirm(){

   } 
    render() {
        submit_disabled = !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email);
        return (
        <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
        <View style={styles.container}>
            <View style={[styles.card]}>
               <Text style={{marginBottom:20,fontWeight:"bold",fontSize:20}}>Reset Password</Text>     
               <View className="input-row" style={styles.inputRow}>
                    <Text style={styles.label} >
                     Please provide us your registered email address.
                    </Text>
                    <Input 
                        ref={password=>this.password=password}
                        style={[styles.inputline,styles.input]}
                        keyboardType="email-address"
                        onChangeText={text=>this.setState({email:text})}
                        returnKeyType="go"/>
                </View>
                <TouchableOpacity 
                    onPress={this.confirm.bind(this)} 
                    disabled={submit_disabled} 
                        style={[styles.btn,{backgroundColor:submit_disabled?"gray":"green"}]}>
                        <Text style={{fontSize:20,color:"white",elevation:6}}>Confirm</Text>
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
        alignItems: 'center',
    },
    input:{
        fontSize:20,
        paddingRight:10,
        paddingTop:1,
        paddingLeft:10,
        fontSize:16
       },
       inputline:{
         borderWidth:1,
         borderColor:"#7f8c8d",
         borderRadius: 5,
    },
    inputRow:{
        display:"flex",
        marginBottom:5,
      },
      label:{
        fontWeight:"bold",
        color: "#e74c3c",
        marginBottom:20
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
