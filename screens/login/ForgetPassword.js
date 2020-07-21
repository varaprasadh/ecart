import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ImageBackground,TextInput as Input} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import Wrapper from '../Home/Wrapper';
import Header from "../major_components/Header";
import Axios from 'axios';
import Loader from '../major_components/Loader';

class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            submit_disabled:true,
            mobile:''
        }
    }
    
   confirm(){
       this.setState({
           loading:true
       });
        let obj = {
            phone_number: this.state.mobile
        }
       Axios.post("/generate_otp",obj)
       .then(({data})=>{
            if(data.success==true){
              this.props.navigation.push('OTP',{mobile:this.state.mobile,type:"reset_password"})
            }else{
                showMessage({
                    message:"Failed",
                    description:data.message,
                    type:"danger"
                });
            }
        this.setState({
            loading:false
        })
       }).catch(err=>{
           this.setState({
               loading:false
           });
           showMessage({
               message:"Failed",
               description:"Something went wrong",
               autoHide:true,
               type:"danger"
            });
       })
   } 
    render() {
        submit_disabled = !/^\d{8}$/.test(this.state.mobile);
        return (
            this.state.loading?<Loader/>:
       <Wrapper>
        <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
        <Header backbutton title="Reset Password" backHandler={this.props.navigation.goBack} color="#fff"/>
        <View style={styles.container}>
            <View style={[styles.card]}>
               <Text style={{paddingVertical:5,fontWeight:"bold",fontSize:20}}>Reset Password</Text>     
               <View className="input-row" style={styles.inputRow}>
                    <Text style={styles.label} >
                     Enter The Registered Mobile Number!
                    </Text>
                    <View style={styles.row}>
                        <Input 
                            style={[styles.inputline,styles.input,{marginRight:5}]}
                            value="+965"
                            editable={false}
                            />
                        <Input 
                            style={[styles.inputline,styles.input,{flex:4}]}
                            keyboardType="number-pad"
                            onChangeText={text=>this.setState({mobile:text})}
                            maxLength={8}
                            value={this.state.mobile}
                            returnKeyType="go"/>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={this.confirm.bind(this)} 
                    disabled={submit_disabled} 
                        style={[styles.btn,{backgroundColor:submit_disabled?"#95a5a6":"#2ecc71"}]}>
                        <Text style={{fontSize:20,color:"white",elevation:6}}>CONFIRM</Text>
                </TouchableOpacity>
            </View>   
        </View>
        
        </ImageBackground>
        </Wrapper>
        );
    }
}
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
        borderColor:"#7f8c8d",
        borderBottomWidth:1
    },
    inputRow:{
        display:"flex",
        marginBottom:5,
    },
    row:{
        display:"flex",
        flexDirection:"row",
        marginBottom:5,
      },
    label:{
        color: "#595957",
        marginBottom:20
    },
    card:{
        backgroundColor:"white",
        paddingVertical:10,
        paddingHorizontal:30,
        elevation:3,
        borderRadius:5
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

mapState = state => {
    return {
        baseUrl: state.Config.base_url,
    }
}

export default connect(mapState)(ForgetPassword);
