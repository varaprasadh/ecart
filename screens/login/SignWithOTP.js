import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput as Input,ImageBackground} from 'react-native';

import { showMessage } from 'react-native-flash-message';
import Loader from '../major_components/Loader';
import Axios from 'axios';
import Header from '../major_components/Header';
import Wrapper from '../Home/Wrapper';
class MyClass extends Component {
     
    constructor(props){
        super(props);
        this.state={
            mobile:null,
        }
    }
    componentDidMount(){
        this.input.focus();
    }
    isValidMobile(){
        return /^\d{8}$/.test(this.state.mobile);
    }

    continue(){
        let obj={
            	phone_number:this.state.mobile
        }
        this.setState({
            loading:true
        });
        Axios.post("/generate_otp",obj).then(({data})=>{
            if(data.success==true){
             this.props.navigation.push('OTP',{mobile:this.state.mobile,type:"signin_with_otp"})
            }
            else{
                showMessage({
                    type:"warning",
                    message:"Failed",
                    description:data.message,
                    autoHide:true
                });
                this.props.navigation.goBack();
            } 
            this.setState({
                loading:false 
            }) 
        }).catch(err=>{
            showMessage({
                type:"danger",
                message:"Failed",
                description:"something went wrong,try again later",
                autoHide:true
            });
            this.props.navigation.goBack();
        })
       
    }
 
    render() { 
        return (
              this.state.loading?<Loader/>:
            <Wrapper>
               <ImageBackground style={{width:"100%",height:"100%"}} source={require("../images/backgroundimage.jpg")}>    
               <Header backbutton title="SignIn With Mobile" backHandler={this.props.navigation.goBack}/>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View><Text style={styles.label}>Verification</Text></View>
                        <View>
                            <Text style={styles.text}>Enter your registered mobile number</Text>
                        </View>
                        <View 
                            style={[styles.inputline,styles.input,{display:"flex",flexDirection:"row",paddingLeft:0}]}
                        > 
                            <Input 
                                value="+965"
                                editable={false} 
                                style={[{paddingVertical:10,paddingHorizontal:5,textAlign:"center"}]} 
                            />
                            <Input 
                                style={{flex:1}}  
                                maxLength={8}
                                ref={input=>this.input=input}
                                onSubmitEditing={()=>this.input.blur()}
                                returnKeyType="go"
                                keyboardType="number-pad"
                                value={this.state.mobile}
                                onChangeText={text=>this.setState({mobile:text.trim()})}
                            />
                        </View>
                        
                        <TouchableOpacity disabled={!this.isValidMobile} 
                            onPress={this.continue.bind(this)}
                            style={[styles.btn,{backgroundColor:!this.isValidMobile()?"gray":"green"}]}>
                            <Text style={{fontSize:20,color:"white",elevation:6}}>CONTINUE</Text>
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
   
    inputline:{
         borderWidth:1,
         borderColor:"#2ecc71",
         borderRadius: 5,
    },
    label:{
        marginBottom:10, 
        fontSize:25,fontWeight:"bold",
        paddingVertical:10,
        alignSelf:"flex-start"
    },
    text:{
        marginBottom:20,
        textAlign:"justify",
        textTransform:"capitalize",
        textAlign:"center"
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
    card:{
        backgroundColor:"white",
        paddingVertical:10,
        paddingHorizontal:30,
        elevation:3,
        borderRadius:5
    }
});

export default MyClass;
