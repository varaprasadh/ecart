import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import Wrapper from '../Wrapper';
import Header from '../../major_components/Header';

import {showMessage} from "react-native-flash-message";

import {connect} from 'react-redux';
import Loader from '../../major_components/Loader';
import Axios from 'axios';
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
      <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
        <ImageBackground source={require("../../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
            <Header title="Change Password" backbutton backHandler={this.props.navigation.goBack}/>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text 
                      style={{fontSize:14,fontWeight:"bold",color:"#fff",marginBottom:20}}>
                       Change Password Below!
                    </Text>
                    <View className="input-row" style={styles.inputRow}>
                        <Text style={styles.label} >Old Password</Text>
                        <TextInput style={[styles.inputline,styles.input]}
                          value={this.state.first_name}
                          secureTextEntry={true}
                          onChangeText={text=>this.setState({old_password:text})}
                        />
                    </View>
                    <View className="input-row" style={styles.inputRow}>
                        <Text style={styles.label} >New Password</Text>
                        <TextInput style={[styles.inputline,styles.input]}
                          secureTextEntry={true}
                          onChangeText={text=>this.setState({password:text})}
                        />
                    </View>
                    <View className="input-row" style={styles.inputRow}>
                        <Text style={styles.label} >Confirm Password</Text>
                        <TextInput style={[styles.inputline,styles.input]}
                          secureTextEntry={true}
                          onChangeText={text=>this.setState({confirm_password:text})}
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <TouchableOpacity 
                        style={[styles.btn,{backgroundColor:"#e74c3c"}]}
                        onPress={()=>this.props.navigation.goBack()}
                      > 
                        <View>
                          <Text style={{fontWeight:"bold",color:"#fff",fontSize:20}}>CANCEL</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.btn}
                        onPress={this.changePassword}
                        disabled={!isValid}
                        > 
                        <View>
                          <Text style={{fontWeight:"bold",color:"#fff",fontSize:20}}>SAVE</Text>
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
       justifyContent:"center",
       flex:1
   },
    input: {
        fontSize: 20,
        paddingVertical:5,
        paddingHorizontal:10,
        color:"#fff"
      },
      inputline: {
        borderWidth: 2,
        borderColor: "#27ae60",
        borderRadius: 5,
      },
      inputRow: {
        display: "flex",
        marginBottom: 5
      },
       label: {
         fontWeight: "bold",
         color: "#fff",
         fontSize:16
       },
      form:{
        backgroundColor: "#00000066",
        padding:10,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#fff"
      },
       btn: {
         flex:1,
         marginTop:20,
         height: 50,
         backgroundColor: "#2ecc71",
         color: "#fff",
         display: "flex",
         justifyContent: 'center',
         alignItems: "center"
       },
})
mapState=state=>{
  let {Addition} = state;
  let {profile} = Addition;

  return {
    first_name:profile.firstName,
    last_name:profile.lastName,
    baseUrl: state.Config.base_url,
    AUTH_TOKEN: state.Config.AUTH_TOKEN
  }
}

export default connect(mapState)(ChangePassword);
