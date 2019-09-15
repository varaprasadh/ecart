import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import Wrapper from '../Wrapper';
import Header from '../../major_components/Header';

import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import Loader from '../../major_components/Loader';
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
    let {first_name,last_name,mobile}=this.state;
    if(first_name.trim()!='' && last_name.trim()!==''){
      return true;
    }
    return false;

  }
  saveProfile(){
    let obj={
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      phone_number:this.state.mobile
    }
    this.setState({
      loading:true
    });
   
    fetch(`http://18.219.157.9/profile_edit  `, {
      method:"POST",
      headers:{
        "content-Type":"application/json",
        "AUTH-TOKEN":this.props.AUTH_TOKEN
      },
      body:JSON.stringify(obj)
    }).then(res=>res.json()).then(data=>{
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
      <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
        <ImageBackground source={require("../../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
            <Header title="Edit Profile" backbutton backHandler={this.props.navigation.goBack}/>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text 
                      style={{fontSize:14,fontWeight:"bold",color:"#fff",marginBottom:20}}>
                       you can edit the below details !
                    </Text>
                    <View className="input-row" style={styles.inputRow}>
                        <Text style={styles.label} >First Name</Text>
                        <TextInput style={[styles.inputline,styles.input]}
                          value={this.state.first_name}
                          onChangeText={text=>this.setState({first_name:text})}
                        />
                    </View>
                    <View className="input-row" style={styles.inputRow}>
                        <Text style={styles.label} >Last Name</Text>
                        <TextInput style={[styles.inputline,styles.input]}
                          value={this.state.last_name}
                          onChangeText={text=>this.setState({last_name:text})}
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
                        onPress={this.saveProfile}
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
