//import liraries
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import {Text,View,Input} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {Constants,Font,Asset} from "expo";

import {connect} from "react-redux";

import Loader from "../major_components/Loader";
import Wrapper from '../Home/Wrapper';
import Header from '../major_components/Header';
import { showMessage } from 'react-native-flash-message';
import Axios from 'axios';

import {TextInput} from 'react-native-paper';

class SignUpScreen extends Component {
    
    constructor(props){
        super(props); 
        this.state={
            firstname:"",
            lastname:"",
            mobile:"",
            email:"",
            area:"",
            block:"",
            street:"",
            lane:"",
            password:"",
            password_confirmation:"",
            loading:false
        }

      this.signUP=this.signUP.bind(this);
    }
   isValidFirstName(){
       return /^[a-zA-Z]+$/.test(this.state.firstname);
   }
   isValidLastName() {
       return /^[a-zA-Z]+$/.test(this.state.lastname);
   }
   isValidEmail(){
      const regex= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(this.state.email);
    }
   isValidMobile(){
     return /^\d{8}$/.test(this.state.mobile);
   }
   isValidArea(){
     return this.state.area!=="";
   }
   isValidBlock(){
     return this.state.block!=="";
   }
   isValidStreet(){
     return this.state.street!=="";
   }
   isValidLane(){
      return this.state.lane!=="";
   }
   isValidPassword(){
       return this.state.password.length>=4;
   }
   isValidConfirmPassword(){
        return this.state.password.length>=4 && this.state.password===this.state.password_confirmation;
   }
    isValidForm(){
      return (this.isValidFirstName() && this.isValidLastName() && this.isValidMobile()) && 
      this.isValidEmail() && 
      (this.isValidArea() && this.isValidBlock() && this.isValidStreet() && this.isValidLane()) &&
      (this.isValidPassword() && this.isValidConfirmPassword());
   }
   signUP(){
         let obj={
            email:this.state.email,
            first_name:this.state.firstname,
            last_name:this.state.lastname,
            phone_number:this.state.mobile,
            user_address: {
                area:this.state.area,
                block:this.state.block,
                street:this.state.street,
                lane:this.state.lane
            },
            password:this.state.password,
            password_confirmation:this.state.password_confirmation
         };
         console.log("singup",obj);
        this.setState({
            loading:true
        }); 
        Axios.post("/register",obj).then(({data})=>{
            console.log("debug dATA",data);
            if(data.success==true){
                this.props.navigation.push('OTP',{mobile:this.state.mobile,type:"signup"});
            }else{
                showMessage({
                    type:"danger",
                    message:"OOPS",
                    description:data.message.capitalize(),
                    autoHide:true
                });
            } 
            this.setState({
                loading:false
            });
        }).catch(err=>{
            showMessage({
                type:"danger",
                message:"Error",
                description:"something went wrong,try again",
                autoHide:true
            });
        });
   }

    render() {
        return (
          this.state.loading?<Loader/>:
      <Wrapper>
        <ImageBackground style={{width:"100%",height:"100%"}} source={require("../images/backgroundimage.jpg")}>
          <KeyboardAvoidingView enabled behavior={Platform.OS === "ios" ? "padding" : null} style={{flex:1}}>
            <Header backbutton title="Signup" backHandler={this.props.navigation.goBack}/>
                <View style={styles.container}>
                  <View style={{flex:1}}>
                    <View className="wrapper" style={styles.wrapper}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:10,height:450}} >
                               <View style={{paddingBottom:10}}>
                                    <View  style={styles.inputRow}>                              
                                        <TextInput
                                            label="First Name"
                                            mode = "outlined"
                                            error={!this.isValidFirstName() && this.state.firstname!=""}
                                            ref={firstname=>this.firstname=firstname}
                                            returnKeyType="next"
                                            placeholder="Enter First Name"
                                            value={this.state.firstname}
                                            onSubmitEditing={()=>this.lastname._root.focus()}
                                            onChangeText={text=>this.setState({firstname:text.trim()})}
                                        />
                                    </View>
                                    <View  style={styles.inputRow}>
                                        <TextInput
                                            label="Last Name"
                                            mode = "outlined"
                                            error={!this.isValidLastName() && this.state.lastname!=""}
                                            placeholder = "Enter Last Name"
                                            ref={lastname=>this.lastname=lastname} 
                                            returnKeyType="next"
                                            value={this.state.lastname}
                                            onSubmitEditing={()=>this.email._root.focus()}
                                            onChangeText={text=>this.setState({lastname:text.trim()})}
                                        />
                                    </View>
                                    <View  style={styles.inputRow}>
                                        <TextInput
                                            label="Email"
                                            mode = "outlined"
                                            error={!this.isValidEmail() && this.state.email!=""}
                                            returnKeyType="next"
                                            placeholderTextColor = "#bdc3c7"
                                            textContentType="emailAddress" 
                                            keyboardType="email-address"
                                            placeholder="Enter Email"
                                            value={this.state.email}
                                            ref={email=>this.email=email} 
                                            onSubmitEditing={()=> this.mobile._root.focus()}
                                            onChangeText={text=> this.setState({email:text.trim()})}
                                        />
                                    </View>
                                    <View  style={styles.inputRow}>
                                        <Text style={styles.label} >Mobile</Text>
                                        <View 
                                            style = {
                                                [styles.inputline, styles.input, {flex: 4 }, {
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    paddingLeft: 0
                                                },{
                                                    borderColor:!this.isValidMobile()&& this.state.mobile!=""?"red":"black"
                                                }]
                                            }
                                        >
                                            <Input value="+965"
                                              style={[{flex:1,textAlign:"center"}]}
                                              editable = {false} 
                                            />
                                            <Input 
                                                ref={mobile=>this.mobile=mobile}
                                                style={[{flex:4},styles.input]}
                                                textContentType="telephoneNumber"
                                                keyboardType="number-pad"
                                                returnKeyType="next"
                                                maxLength={8}
                                                placeholder="Enter Mobile Number"
                                                placeholderTextColor = "#bdc3c7"
                                                onSubmitEditing={()=>this.area._root.focus()}
                                                value={this.state.mobile}
                                                onChangeText={text=>this.setState({mobile:text.trim()})}
                                            />
                                        </View>
                                    </View>

                                    <View  style={styles.inputRow}>
                                        <Text style={styles.label} >Address</Text>
                                        <TextInput
                                            mode = "outlined"
                                            label="Door.No & Area"
                                            error={!this.isValidArea() && this.state.area!=""}
                                            ref={area=>this.area=area} 
                                            returnKeyType="next"
                                            placeholderTextColor = "#bdc3c7"
                                            placeholder="Enter Dno & area"
                                            onSubmitEditing={()=>this.block._root.focus()}
                                            value={this.state.area}
                                            onChangeText={text=>this.setState({area:text.trim()})}
                                        />
                                        <TextInput
                                            mode = "outlined"
                                            label="Block"
                                            error={!this.isValidBlock() && this.state.block!=""}
                                            ref={block=>this.block=block} 
                                            returnKeyType="next"
                                            placeholderTextColor = "#bdc3c7"
                                            placeholder="Enter block"
                                            onSubmitEditing={()=>this.street._root.focus()}
                                            value={this.state.block}
                                            onChangeText={text=>this.setState({block:text.trim()})}
                                        />
                                        <TextInput
                                            mode = "outlined"
                                            label="Street"
                                            error={!this.isValidStreet()&& this.state.street!=""}
                                            ref={street=>this.street=street} 
                                            returnKeyType="next"
                                            placeholderTextColor = "#bdc3c7"
                                            placeholder="Enter street"
                                            value={this.state.street}
                                            onSubmitEditing={()=> this.lane._root.focus()}
                                            onChangeText={text=>this.setState({street:text.trim()})}
                                        />
                                        <TextInput
                                            mode = "outlined"
                                            label="Lane"
                                            error={!this.isValidLane()&& this.state.lane!=""}
                                            ref={lane=>this.lane=lane} 
                                            returnKeyType="next"
                                            placeholderTextColor = "#bdc3c7"
                                            placeholder="Enter lane"
                                            value={this.state.lane}
                                            onSubmitEditing={()=>this.password._root.focus()}
                                            onChangeText={text=>this.setState({lane:text.trim()})}
                                        />
                                    </View>
                                    <View  style={styles.inputRow}>
                                        <Text style={styles.label} >Password</Text>
                                        <TextInput
                                            mode = "outlined"
                                            label="Password"
                                            error={!this.isValidPassword() && this.state.password!=""}
                                            ref={password=>this.password=password}
                                            returnKeyType="next"
                                            placeholder="Enter A Password"
                                            placeholderTextColor = "#bdc3c7"
                                            secureTextEntry={true}
                                            value={this.state.password}
                                            onSubmitEditing={()=>this.c_password._root.focus()}
                                            onChangeText={text=> this.setState({password:text.trim()})}
                                        />
                                    </View>
                                    <View style={styles.inputRow}>
                                        <TextInput
                                            mode = "outlined"
                                            label = "Confirm Password"
                                            error={!this.isValidConfirmPassword() && this.state.password_confirmation!=""}
                                            ref={c_password=>this.c_password=c_password}
                                            returnKeyType="go"
                                            placeholder="Confirm password" 
                                            onChangeText={text=>this.setState({password_confirmation:text})}
                                            secureTextEntry={true}
                                            value={this.state.password_confirmation}
                                            onChangeText={text=>{this.setState({ password_confirmation :text.trim()})}}
                                        />
                                    </View>
                                </View>
                            </ScrollView>  
                    </View>
                </View>
          </View>
          </KeyboardAvoidingView>
          <TouchableOpacity onPress={this.signUP.bind(this)} disabled={!this.isValidForm()}  style={[styles.btn_signup,{backgroundColor:!this.isValidForm()?"#7f8c8d":"#2ecc71"}]}>
               <Text style={{color:"white"}}>SIGN UP</Text>
          </TouchableOpacity>
        </ImageBackground>
        </Wrapper>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
    title:{
        fontWeight:"bold",
        fontSize:32
    },
    wrapper:{
        flex:1,
        paddingHorizontal:10,
        borderRadius:5,
        elevation:1,
        backgroundColor:"white"
      },
    input:{
        paddingTop: 1,
        paddingHorizontal:10
    },
    inputline:{
        borderBottomWidth:1,
        borderColor: "#646566",
        borderRadius: 5,
    },
    inputRow:{
        display:"flex",
        marginBottom:5
      },
   btn_signup:{
       height:50,
       backgroundColor:"#2ecc71",
       color:"#fff",
       display:"flex",
       justifyContent: 'center',
       alignItems:"center"
   },
   label:{
       fontWeight:"bold",
   }
});
mapState=state=>{
    return {
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}

export default connect(mapState)(SignUpScreen);

