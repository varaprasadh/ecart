import React, { Component } from 'react'
import { 
    Text, View ,StatusBar,
    StyleSheet,Image,
    TouchableOpacity,
    TouchableWithoutFeedback,TextInput,
    KeyboardAvoidingView,
    ImageBackground
} from 'react-native'
import Header from "../major_components/Header";
import {Ionicons} from "@expo/vector-icons";
import Wrapper from '../Home/Wrapper';

import {connect} from "react-redux";

export class CheckPayment extends Component {
    box_checked=require("./icons/Checkbox_checked.png");
    box_unchecked=require("./icons/Checkbox_unchecked.png")
    constructor(props){
        super(props);
        this.state={
            paymentMode:"Cash",
            card_name:'',
            card_number:'',
            exp_month:'',
            exp_year:'',
            cvv:''
        }
    }

    validate(){
        this.props.setPayType(this.state.paymentMode);
        if(this.state.paymentMode=="Card"){
        card={
            name:this.state.card_name,
            number:this.state.card_number.replace(/\s/g,''),
            month:this.state.exp_month,
            year:this.state.exp_year,
            cvv:this.state.cvv
        }
         this.props.setCardDetails(card);

        }
        this.props.navigation.push("CheckSummery");
    }
    onNameChange(text){
        this.setState({
            card_name:text
        });
    }
    onNumberChange(text){
        this.setState({
            card_number:text
        })
    }
    onMonthChange(text){
        this.setState({
            exp_month:text
        })
    }
    onYearChange(text){
        this.setState({
            exp_year:text
        })
    }
    onCVVChange(text){
        this.setState({
            cvv:text
        })
    }
 
    render() {
        return (
           <Wrapper>
            <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
             <View style={{flex:1}}>
              <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
                    <Header title="Choose Payment Type" backbutton={true} backHandler={this.props.navigation.goBack}/> 
                    <View style={{flex:1}}>
                            <View style={styles.tab}>
                                <TouchableWithoutFeedback onPress={()=>this.setState({paymentMode:"Cash"})}>
                                    <View style={styles.row} >
                                        <Image 
                                            source={this.state.paymentMode=="Cash"?this.box_checked:this.box_unchecked} 
                                            style={{marginRight:20}}/>
                                        <Ionicons name="ios-wallet"  size={30}/>
                                        <Text style={styles.label}>Cash</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                       <View style={{flex:3}}>
                       {this.state.paymentMode=="Card"?(
                                <CardDetails
                                   onNameChange={this.onNameChange.bind(this)}
                                   onNumberChange={this.onNumberChange.bind(this)}
                                   onMonthChange={this.onMonthChange.bind(this)}
                                   onYearChange={this.onYearChange.bind(this)}
                                   onCVVChange={this.onCVVChange.bind(this)}
                                />
                            ):null} 
                       </View>
                
                    <View className="bottombar" style={styles.checkouttab}>
                       <TouchableOpacity 
                            style={[styles.btn,{backgroundColor:"#fff",borderWidth:1,borderColor:"#2ecc71"}]} 
                            onPress={()=>this.props.navigation.goBack()}>
                               <Text style={{color:"#2ecc71",fontWeight:"bold"}}>BACK</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.btn,]} 
                            onPress={this.validate.bind(this)}>
                               <Text style={{color:"white",fontWeight:"bold"}}>NEXT</Text>
                        </TouchableOpacity>   
                    </View>
                </KeyboardAvoidingView>
             </View>
            </ImageBackground>
           </Wrapper>
               
               
                 

        )
    }
}


const styles=StyleSheet.create({
   tab:{
    marginTop:10,
    backgroundColor:"#fff",
    paddingVertical:10,
    paddingHorizontal:10
   },
   row:{
       flexDirection:"row",
       alignItems:"center"
   },
   label:{
       fontSize:18,
       color:"#27ae60",
       marginLeft: 20,
   },
   btn:{
    backgroundColor:"#27ae60",
    justifyContent:"center",
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:40,
    paddingRight:40,
    borderRadius:5,  
    marginRight:20,
    marginLeft:20
   },
    checkouttab:{
        display:"flex",
        backgroundColor: "#dff9fb",
        height:70,
        flexDirection:"row",
        paddingTop:10,
        paddingBottom:10,
        justifyContent:"space-between",
        elevation:3,
        position:"absolute",
        bottom:0,
        left:0,
        right:0
    },
})
mapState=state=>{
    return {

    }
}
mapDispatch=dispatch=>{
    return {
      setPayType:(payType)=>{dispatch({type:"SET_PAYTYPE",payType})},
    }
}
export default connect(mapState,mapDispatch)(CheckPayment);
