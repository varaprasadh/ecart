import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Wrapper from '../Wrapper';
import Header from '../../major_components/Header';

import {showMessage} from "react-native-flash-message";

import {connect} from 'react-redux';
import Loader from '../../major_components/Loader';
import Axios from 'axios';


import { TextInput as MTextInput } from 'react-native-paper'


class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
     old_password:'',
     password:'',
     confirm_password:'',
     loading:false
    };
    this.changePassword=this.changePassword.bind(this);
    this.isStateValid=this.isStateValid.bind(this);

  }
  isStateValid(){
      let{old_password,password,confirm_password}=this.state;
     if(old_password.trim()!='' && password.trim().length>=4 && password==confirm_password){
       return true;
     }
     return false;
  }
  changePassword(){
     let {old_password,password,confirm_password}=this.state;
     let obj={
       old_password,
       new_password:password,
       confirm_password
     }
     this.setState({
       loading:true
     })
     Axios.post("/change_password",obj,{headers:{
         "AUTH-TOKEN": this.props.AUTH_TOKEN,
     }}).then(({data})=>{
        if(data.success){
          showMessage({
            message:"Success!",
            description:"password changed successfully!",
            autoHide:true,
            type:"success"
          });
          this.props.navigation.goBack();
        }else{
           showMessage({
             message: "failed!",
             description: "Old password might be wrong, try again!",
             autoHide: true,
             type:"danger"
           });
        }
        this.setState({
          loading:false
        })
     }).catch(err=>console.log(err))
  }
  render() {
 
    isValid=this.isStateValid();

    return (
    this.state.loading?<Loader/>:  
    <Wrapper>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex:1}}>
        <ImageBackground source={require("../../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
            <Header title="Change Password" backbutton backHandler={this.props.navigation.goBack}/>
            <View style={styles.container}>
                <View style={styles.form}>
                    <View className="input-row" style={styles.inputRow}>
                        <MTextInput
                            label="Old Password"
                            value={this.state.old_password}
                            secureTextEntry={true}
                            error={this.state.old_password.trim()==""}
                            onChangeText={text=>this.setState({old_password:text.trim()})}
                          />
                    </View>
                    <View className="input-row" style={styles.inputRow}>
                        <MTextInput
                          label="New Password"
                          value={this.state.password}
                          secureTextEntry={true}
                          error={this.state.password.length<4}
                          onChangeText={text=>this.setState({password:text.trim()})}
                        />
                    </View>
                    <View className="input-row" style={styles.inputRow}>
                        <MTextInput
                          label="Confirm Password"
                          value={this.state.confirm_password}
                          secureTextEntry={true}
                          error={this.state.confirm_password!==this.state.password || this.state.password.length<4}
                          onChangeText={text=>this.setState({confirm_password:text.trim()})}
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <TouchableOpacity 
                        style={[styles.btn,{backgroundColor:"none"}]}
                        onPress={()=>this.props.navigation.goBack()}
                      > 
                        <View>
                          <Text style={{color:"red",fontSize:16}}>CANCEL</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.btn}
                        onPress={this.changePassword}
                        disabled={!isValid}
                        > 
                        <View>
                          <Text style={{color:"#fff",fontSize:16}}>SAVE</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
        </KeyboardAvoidingView>
      </Wrapper>
    );
  }
}
const styles = StyleSheet.create({
   container:{
       paddingHorizontal:10,
       paddingVertical:20,
       flex:1
   },
    inputRow: {
      display: "flex",
      marginBottom: 5
    },
    form:{
      padding:10,
      borderRadius:5,
      borderWidth:1,
      borderColor:"#fff",
      backgroundColor:"white"
    },
      btn: {
        flex:1,
        marginTop:20,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:5,
        backgroundColor: "#2ecc71",
        color: "#fff",
        display: "flex",
        justifyContent: 'center',
        alignItems: "center"
      },
})
mapState=state=>{

  return {
    AUTH_TOKEN: state.Config.AUTH_TOKEN
  }
}

export default connect(mapState)(ChangePassword);
