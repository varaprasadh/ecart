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
                    <Header title="Checkout" backbutton={true} backHandler={this.props.navigation.goBack}/> 
                    <View style={{flex:1}}>
                            <Text style={[styles.stext,styles.styltext]}>Payment Type</Text>
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
                                {/* <TouchableWithoutFeedback onPress={()=>this.setState({paymentMode:"Card"})}>
                                    <View style={styles.row}>
                                        <Image 
                                        source={this.state.paymentMode=="Card"?this.box_checked:this.box_unchecked} 
                                        style={{marginRight:20}}/>
                                        <Ionicons name="ios-card" size={30}/>
                                        <Text  style={styles.label}>Card</Text>
                                    </View>
                                </TouchableWithoutFeedback> */}
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

class CardDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            ccNumber:''
        }
        this.onNumberChange=this.onNumberChange.bind(this);
    }
    onNumberChange(text){
        let parsedNumber;
        let temp=[];
        let tempText=text.trim().replace(/\s/g,"");
        for(let i=0;i<tempText.length;i++){
            temp.push(tempText[i]);
            if((i+1)%4==0){
                temp.push(" ");
            }
        }
        parsedNumber=temp.join("");
        console.log(parsedNumber);
        
        this.setState({
          ccNumber:parsedNumber
        })
        this.props.onNumberChange(text.trim().replace(' ',''));
    }
    render(){
        return(
        
         <View style={{paddingHorizontal:10,zIndex:10,backgroundColor:"white"}}>   
                <View style={styles.inputstyle}>
                    <Text style={styles.text}>Name on Card</Text>
                    <TextInput 
                        placeholder="Name on Card " 
                        style={styles.add_type}
                        returnKeyType="next"
                        autoCorrect={false}
                        autoCompleteType="name"
                        onSubmitEditing={()=>this.cardnum.focus()}
                        onChangeText={text=>this.props.onNameChange(text)}/>
                </View> 
                <View style={styles.inputstyle}>
                    <Text style={styles.text}>Card Number</Text>
                    <TextInput 
                        placeholder="Card Number " 
                        style={styles.add_type}
                        returnKeyType="next"
                        keyboardType="number-pad"
                        autoCompleteType="cc-number"
                        value={this.state.ccNumber}
                        maxLength={16+3}
                        ref={cardnum=>this.cardnum=cardnum}
                        onSubmitEditing={()=>this.month.focus()}
                        onChangeText={(text)=>this.onNumberChange(text)}/>
                </View> 
                <View style={[styles.row,{alignItems:"flex-end",marginTop:10}]}>
                   <View>
                   <Text style={styles.text}>Expiry Date</Text>
                   
                    <View style={[styles.row,]}>
                            <View style={[styles.inputstyle,{width:100}]}>
                                    <Text style={styles.text}>month</Text>
                                    <TextInput 
                                        placeholder="MM"
                                        style={styles.add_type}
                                        returnKeyType="next"
                                        keyboardType="number-pad"
                                        ref={month=>this.month=month}
                                        onSubmitEditing={()=>this.year.focus()}
                                        maxLength={2}
                                        onChangeText={(text)=>this.props.onMonthChange(text)}/>
                                </View> 
                                <View style={[styles.inputstyle,{width:100}]}>
                                    <Text style={styles.text}>year</Text>
                                    <TextInput 
                                        style={styles.add_type}
                                        placeholder="YY"
                                        returnKeyType="next"
                                        keyboardType="number-pad"
                                        ref={year=>this.year=year}
                                        maxLength={2}
                                        onSubmitEditing={()=>this.cvv.focus()}
                                        onChangeText={(text)=>this.props.onYearChange(text)}/>
                                </View>
                        </View>
                  
                   </View>
                   <View style={[styles.inputstyle,{width:150}]}>
                           <Text style={styles.text}>CVV</Text>
                            <TextInput 
                                 keyboardType="number-pad"
                                style={styles.add_type}
                                returnKeyType="next"
                                ref={cvv=>this.cvv=cvv}
                                maxLength={4}
                                onChangeText={(text)=>this.props.onCVVChange(text)}/>
                    </View>
                </View>
         </View>
       
        
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
    btn_disabled:{
     backgroundColor:"#bdc3c7"
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
    inputstyle:{
        borderWidth:2,
        borderColor:"#2980b9",
        marginTop:10,
        borderRadius:2,
        marginRight:10,
        paddingHorizontal:2,
        paddingVertical:2
    },
    text:{
        fontWeight:"bold",
        color:"#27ae60",
        paddingHorizontal:5,
    },
    stext: {
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
})
mapState=state=>{
    return {

    }
}
mapDispatch=dispatch=>{
    return {
      setPayType:(payType)=>{dispatch({type:"SET_PAYTYPE",payType})},
      setCardDetails:(card)=>{dispatch({type:"SET_CARD_DETAILS",card})}
    }
}
export default connect(mapState,mapDispatch)(CheckPayment);
