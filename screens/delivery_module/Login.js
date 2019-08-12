import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet ,TextInput} from 'react-native';
import Wrapper from '../Home/Wrapper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    // this.props.navigation.push('DDettails');
  }
  signIn(){
       this.props.navigation.push('DMain')
  }
  render() {
    return (
      <Wrapper>
          <View style={styles.container}>
           <Text style={styles.title}>Login</Text>
            <View className="form" style={[styles.form]}>
              <View className="input-row" style={styles.inputRow}>
                  <Text>Email or Mobile</Text>
                  <TextInput onSubmitEditing={()=>this.passwordInput.focus()} returnKeyType="next" style={[styles.inputline,styles.input]}/>
              </View>
              <View className="input-row" style={styles.inputRow} >
                  <Text>Password</Text>
                  <TextInput ref={passwordInput=>this.passwordInput=passwordInput} 
                             returnKeyType="go" secureTextEntry={true} 
                             style={[styles.inputline,styles.input]} />
              </View> 
              <TouchableOpacity style={[styles.customBtn]} onPress={this.signIn.bind(this)}>
                  <Text style={{color:"white",fontWeight:"bold"}}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Wrapper>
    ); 
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#F5F5F5",
        padding:10
      },
    title:{
        fontWeight:"bold",
        fontSize:32
    },
    input:{
     fontSize:20,
     paddingRight:10,
     paddingTop:5,
     paddingBottom:5,
     paddingLeft:10
    },
    form:{
      padding:20,
      marginTop:20,
      backgroundColor:"#fff",
      elevation: 3,

    },
    inputRow:{
      display:"flex",
      marginTop:10
    },
    inputline:{
        borderBottomWidth:1,
        borderBottomColor:"green"
    },
    customBtn:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center", 
      borderWidth:2,
      borderRadius:5,
      borderColor:"#2ecc71",
      backgroundColor:"#2ecc71",
      paddingVertical:5,
      marginTop:10
    }
});


export default Login;
