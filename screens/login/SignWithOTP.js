//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {Input,Card, Col} from 'native-base';
import { Colors } from 'react-native-paper';

// create a component
class MyClass extends Component {
     
    constructor(props){
        super(props);
        this.state={
            number:null,
            submit_disabled:true
        }
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        this.input._root.focus();
    }
    handleChange(text){ 
          this.setState({
              number:text
          },()=>{
           if( this.state.number.length==10 ){
               this.input._root.blur();
               //enable submit button
               this.setState({
                   submit_disabled:false
               });
           }else{
            this.setState({
                submit_disabled:true
            });
           }
          });
    
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                   
                      <View style={{width:200}}>
                        <Text style={styles.text}>Enter your registered mobile number</Text>
                      </View>
                      <View style={{display:"flex",flexDirection:"row",}}>
                        <Input 
                          value="+965" disabled 
                          style={[styles.inputline,styles.input, 
                            {flex:2,backgroundColor:"#ecf0f1",paddingLeft:1,paddingRight:0,textAlign:"center"}]} 
                         />
                        <Input 
                         ref={input=>this.input=input}
                         style={[styles.inputline,styles.input,{flex:4}]} 
                         onSubmitEditing={()=>this.input._root.blur()}
                         returnKeyType="go"
                         keyboardType="number-pad"
                         onChangeText={this.handleChange}
                         />
                      </View>
                      <TouchableOpacity disabled={this.state.submit_disabled} 
                        style={[styles.btn,{backgroundColor:this.state.submit_disabled?"gray":"green"}]}>
                        <Text style={{fontSize:20,color:"white",elevation:6}}>Get OTP</Text>
                      </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    input:{
        fontSize:20,
        paddingRight:10,
        paddingTop:1,
        paddingLeft:10,
    },
    inputline:{
         borderWidth:1,
         borderColor:"#7f8c8d",
         borderRadius: 5,
    },
    text:{
        fontSize:20,
        marginBottom:20,
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
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
        elevation:3,
        borderRadius:5
    }
});

//make this component available to the app
export default MyClass;
