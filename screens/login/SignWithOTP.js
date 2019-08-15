import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput as Input} from 'react-native';

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
        this.input.focus();
    }

   

    handleChange(text){ 
          this.setState({
              number:text
          },()=>{
           if( this.state.number.length==10 ){ 
               this.input.blur();
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
                      <View><Text style={styles.label}>Verification</Text></View>
                      <View style={{width:200}}>
                        <Text style={styles.text}>Enter your registered mobile number</Text>
                      </View>
                      <View 
                       style={[styles.inputline,styles.input,{display:"flex",flexDirection:"row",paddingLeft:0}]}
                       > 
                        <Input 
                        value="+965" disabled 
                        style={[
                            {backgroundColor:"#ecf0f1",paddingVertical:10,paddingHorizontal:5,textAlign:"center"}]} 
                        />
                        <Input 
                        style={{flex:3,fontSize:20,}}
                        ref={input=>this.input=input}
                        onSubmitEditing={()=>this.input.blur()}
                        returnKeyType="go"
                        keyboardType="number-pad"
                        onChangeText={this.handleChange}
                        />
                      </View>
                     
                      <TouchableOpacity disabled={this.state.submit_disabled} 
                        onPress={()=>this.props.navigation.push('OTP')}
                        style={[styles.btn,{backgroundColor:this.state.submit_disabled?"gray":"green"}]}>
                        <Text style={{fontSize:20,color:"white",elevation:6}}>Get OTP</Text>
                      </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
   
    inputline:{
         borderWidth:1,
         borderColor:"#2ecc71",
         borderRadius: 5,
    },
    label:{marginBottom:10, fontSize:25,fontWeight:"bold",paddingVertical:10,alignSelf:"flex-start"},
    text:{
        fontSize:18,
        marginBottom:20,
        textAlign:"justify",
        textTransform:"capitalize"
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
