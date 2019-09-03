import React, { Component } from 'react';
import { 
    View, 
    Text,StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground
  } from 'react-native';
import Header from "../major_components/Header";

import Wrapper from "../Home/Wrapper";

import {connect} from "react-redux";

class CheckAddress extends Component {
 
    constructor(props){
        super(props);
        this.customAddress=this.props.navigation.getParam('custom')||false;
        let {profile}=this.props;
        let address=profile.address||{};
        console.log(this.customAddress,profile);
        this.state={
          firstName:this.customAddress?'':profile.firstName,
          lastName: this.customAddress ? '' : profile.lastName,
          mobile: this.customAddress ? '' : profile.mobile,
          area: this.customAddress ? '' : address.area || '',
          block: this.customAddress ? '' : address.block || '',
          street: this.customAddress ? '' : address.street || '',
          lane: this.customAddress ? '' : address.lane || ''
        }
    }
   
  onCheckout(){
         let {firstName,lastName,mobile,area,block,street,lane}=this.state;
         let billingAddress= {
             firstname:firstName,
             lastname: lastName, 
             mobile: mobile,
             area: area,
             street: street,
             block:block,
             lane: lane
         }
          this.props.setAddress(billingAddress);
          this.props.navigation.push('CheckPayment');
  }
  isValid(state){
      flag=false; 
      for (entry of Object.entries(state)){
          key=entry[0];
          value=entry[1];  
          console.log(key,value); 
          if(value.trim()==''){
               return false;
          }
          flag=true;
      } 
      if(!/^\d{8}$/.test(state.mobile)){
          flag=false
      }
      return flag;
  }
  render() {
      let btn_disabled = !this.isValid(this.state);
    return (
    <Wrapper>
     <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
      <View style={{flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={{flex:3}}>
            <KeyboardAvoidingView  style={{flex:1}}>
                <Header title="Checkout" backbutton={true} backHandler={()=>this.props.navigation.navigate('Cart')}/> 
                <View style={{flex:1,paddingHorizontal:10,}}>
                    <Text style={[styles.text,styles.styltext]}>SET DELIVERY ADDRESS</Text>
                    <ScrollView>
                        <View style={styles.inputstyle} >
                            <Text style={[{color:"#fff",fontWeight:"bold"}]}>First Name:</Text>
                            <TextInput placeholder="Enter First Name"
                            style={styles.input} 
                            value={this.state.firstName}
                            editable={this.customAddress}
                            returnKeyType="next"
                            onSubmitEditing={()=>this.lastName.focus()}
                            onChangeText={text=>this.setState({firstName:text})}
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <Text style={[{color:"#fff",fontWeight:"bold"}]}>Last Name:</Text>
                            <TextInput placeholder="Enter Last Name"
                            style={styles.input}
                            value={this.state.lastName}
                            editable={this.customAddress}
                            returnKeyType="next"
                            onSubmitEditing={()=>this.mobile.focus()}
                            ref={lastName=>this.lastName=lastName}
                            onChangeText={text=>this.setState({lastName:text})} 
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <Text style={[{color:"#fff",fontWeight:"bold"}]}>Mobile:</Text>
                            <View style={{flexDirection:"row"}}>
                                <TextInput value="+965"
                                style={[{flex:1,textAlign:"center",color:"#fff"}]}
                                editable={false} />
                                <TextInput placeholder="Enter Mobile Number"
                                keyboardType="phone-pad"
                                style={[styles.input,{flex:4}]}
                                value={this.state.mobile}
                                editable={this.customAddress}
                                returnKeyType="next"
                                maxLength={8}
                                onSubmitEditing={()=>this.area.focus()}
                                ref={mobile=>this.mobile=mobile}
                                onChangeText={text=>this.setState({mobile:text})} 
                                />
                            </View> 
                        </View>
                        <View style={styles.inputstyle} >
                            <Text style={[{color:"#fff",fontWeight:"bold"}]}>Area:</Text>
                            <TextInput placeholder="Enter Area"
                            style={styles.input} 
                            value={this.state.area}
                            editable={this.customAddress}
                            returnKeyType="next"
                            onSubmitEditing={()=>this.block.focus()}
                            ref={area=>this.area=area}
                            onChangeText={text=>this.setState({area:text})}
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <Text style={[{color:"#fff",fontWeight:"bold"}]}>Block:</Text>
                            <TextInput placeholder="Enter Block"
                            style={styles.input}
                            value={this.state.block}
                            editable={this.customAddress}
                            onSubmitEditing={()=>this.street.focus()}
                            ref={block=>this.block=block}
                            returnKeyType="next"
                            onChangeText={text=>this.setState({block:text})} 
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <Text style={[{color:"#fff",fontWeight:"bold"}]}>Street:</Text>
                            <TextInput placeholder="Enter Street"
                            style={styles.input} 
                            value={this.state.street}
                            returnKeyType="next"
                            onSubmitEditing={()=>this.lane.focus()}
                            ref={street=>this.street=street}
                            editable={this.customAddress}
                            onChangeText={text=>this.setState({street:text})}
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <Text style={[{color:"#fff",fontWeight:"bold"}]}>Lane:</Text>
                            <TextInput placeholder="Enter Lane" 
                            style={styles.input}
                            value={this.state.lane}
                            ref={lane=>this.lane=lane}
                            returnKeyType="go"
                            editable={this.customAddress}
                            onChangeText={text=>this.setState({lane:text})}
                            /> 
                        </View>
                        </ScrollView> 
                    </View>
            </KeyboardAvoidingView>
            
               
           
            <View className="bottombar" style={[styles.checkouttab]}>
                  
                    <TouchableOpacity 
                        disabled={btn_disabled} 
                        style={[styles.btn,btn_disabled?styles.btn_disabled:{}]} 
                        onPress={this.onCheckout.bind(this)}>
                        <Text style={{color:"white",fontWeight:"bold"}}>NEXT</Text>
                    </TouchableOpacity>   
            </View>   
        </KeyboardAvoidingView>
        </View>   
        </ImageBackground>
    </Wrapper>
   
    );
  }
}

const styles = StyleSheet.create({
    inputstyle:{
        borderBottomWidth:1,
        borderBottomColor: "#7f8c8d",
        marginTop:10,
    },
    input:{
        paddingVertical:5,
        paddingHorizontal:10,
        color:"#fff"
    },
    btn:{
        backgroundColor:"#27ae60",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5, 
        paddingHorizontal:30,
        paddingVertical:5,
    },
    btn_disabled:{
         backgroundColor:"#bdc3c7"
    },
    checkouttab:{
        display:"flex",
        borderWidth:2,
        borderColor: "#44bd32",
        height:70,
        flexDirection:"row",
        paddingVertical:10,
        paddingHorizontal:20,
        justifyContent:"flex-end",
        elevation:3
    },
    text: {
        fontSize:18,
        textAlign:"center",
        fontWeight:"bold"
    },
    styltext:{
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#2ecc71",
        color: "#fff",
        marginVertical:10,
    } 
});

mapStateToProps=state=>{
     let {Addition}=state;
     let {profile}=Addition;
    return {
        profile
    }
}
mapDispatch=dispatch=>{
    return {
        setAddress:(address)=>{dispatch({type:"SET_CHECKOUT_ADDRESS",address})}
    }
}
export default connect(mapStateToProps,mapDispatch)(CheckAddress);


