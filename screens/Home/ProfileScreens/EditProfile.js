import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform} from 'react-native';
import Wrapper from '../Wrapper';
import Header from '../../major_components/Header';

import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import Loader from '../../major_components/Loader';
import Axios from 'axios';

import { TextInput as MTextInput } from 'react-native-paper'


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:this.props.first_name,
      last_name:this.props.last_name,
      mobile:this.props.mobile,
      loading:false
    };
    this.saveProfile=this.saveProfile.bind(this);
    this.isStateValid=this.isStateValid.bind(this);
  }  


  isStateValid(){
    let {first_name='',last_name='',mobile=""}=this.state;
    return (first_name.trim()!=='' && last_name.trim()!=='' && /^\d{8}$/.test(mobile) );
  }
  saveProfile(){
    if(!this.isStateValid()){
      return;
    }

    let obj={
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      phone_number:this.state.mobile
    }
    this.setState({
      loading:true
    });
    Axios.post("/profile_edit",obj,{headers:{ "AUTH-TOKEN":this.props.AUTH_TOKEN}})
   .then(({data})=>{
      if(data.success){
       showMessage({
         type:"success", 
         message: "success",
         description: "profile updated successfully!",
         autoHide:true 
       });
       let localNameObj={
         firstName:this.state.first_name,
         lastName:this.state.last_name,
         mobile:this.state.mobile
       }
       this.props.updateLocalName(localNameObj);
       this.props.navigation.goBack();
      }else{
        showMessage({
          type:"danger",
          message: "failed",
          description: "something went wrong try again later!",
          autoHide: true
        });
      }
      this.setState({
        loading: false
      });
    }).catch(err=>console.log(err))
  }
  render() {
 
     isValid=this.isStateValid();

    return (
      this.state.loading?<Loader/>:
      <Wrapper>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex:1}}>
        <ImageBackground source={require("../../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
            <Header title="Edit Profile" backbutton backHandler={this.props.navigation.goBack}/>
            <View style={styles.container}>
                <View style={styles.form}>
                    <View className="input-row" style={styles.inputRow}>
                        <MTextInput
                          label="First Name"
                          value={this.state.first_name}
                          error={this.state.first_name.trim()==""}
                          onChangeText={text=>this.setState({first_name:text})}
                        />
                    </View>
                    <View className="input-row" style={styles.inputRow}>
                      <MTextInput
                        label="Last Name"
                        value={this.state.last_name}
                        error={this.state.last_name.trim()==""}
                        onChangeText={text=>this.setState({last_name:text})}
                      />
                    </View>
                    <View className="input-row" style={[styles.inputRow,{flexDirection:"row"}]}>
                      <MTextInput
                        label="Country Code"
                        value="+956"
                        style={{flex:1}}
                        disabled={true}
                      />
                      <MTextInput
                        label="Mobile"
                        keyboardType="number-pad"
                        value={this.state.mobile}
                        error={!/^\d{8}$/.test(this.state.mobile)}
                        style={{flex:3}}
                        onChangeText={text=>this.setState({mobile:text})}
                      />
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <TouchableOpacity 
                        style={[styles.btn,{backgroundColor:"none"}]}
                        onPress={()=>this.props.navigation.goBack()}
                      > 
                        <View>
                          <Text style={{color:"tomato",fontSize:16}}>CANCEL</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.btn}
                        onPress={this.saveProfile}
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
      paddingVertical:10,
      paddingHorizontal:20,
      borderRadius:5,
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
    mobile:profile.mobile,
    baseUrl: state.Config.base_url,
    AUTH_TOKEN: state.Config.AUTH_TOKEN
  }
}

mapDispatch=dispatch=>{
  return {
    updateLocalName:(obj)=>{dispatch({type:"UPDATE_LOCAL_NAME",obj})},
  }
} 
export default connect(mapState,mapDispatch)(EditProfile);
