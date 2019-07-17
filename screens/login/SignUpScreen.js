//import liraries
import React, { Component } from 'react';
import { StyleSheet,ScrollView ,Button} from 'react-native';
import {Container,Content,Left,Right,Header,Text,View,Input} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
// create a component
class SignUpScreen extends Component {

    // async componentWillMount() {
    //     await Expo.Font.loadAsync({
    //         Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
    //         Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
    //         Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    //     });
    //     this.setState({ loading: false });
    // }


    render() {
        return (
          <Container style={styles.container}>
             
             
                    <Content>
                    <View style={{paddingTop:5,paddingBottom:5,display:"flex"}} >
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Ionicons name="ios-arrow-back" size={32} color="black" />
                            <Text style={{marginLeft:10}}>Back</Text>
                        </View>
                    </View>
                    <View className="wrapper" style={styles.wrapper}>
                        <View className="title">
                        <Text style={styles.title}>Sign Up</Text>
                        </View>
                        
                            <ScrollView className="form" style={{paddingLeft:10,paddingRight:10}}>
                                <View className="input-row" style={styles.inputRow}>
                                    <Text>Name</Text>
                                    <Input style={[styles.inputline,styles.input]}/>
                                </View>
                                <View className="input-row" style={styles.inputRow}>
                                    <Text>Mobile</Text>
                                    <Input style={[styles.inputline,styles.input]}/>
                                </View>
                                <View className="input-row" style={styles.inputRow}>
                                    <Text>Email</Text>
                                    <Input style={[styles.inputline,styles.input]}/>
                                </View>
                                <View className="input-row" style={styles.inputRow}>
                                    <Text>Email or Mobile</Text>
                                    <Input style={[styles.inputline,styles.input]}/>
                                </View>
                                <View className="input-row" style={styles.inputRow}>
                                    <Text>Email or Mobile</Text>
                                    <Input style={[styles.inputline,styles.input]}/>
                                </View>
                                <View className="input-row" style={styles.inputRow}>
                                    <Text>Email or Mobile</Text>
                                    <Input style={[styles.inputline,styles.input]}/>
                                </View>
                                <Button title="SIGN UP" color="#00C569"/>
                            </ScrollView>
                        
                        
                    </View>
                </Content>
             
           
          </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        paddingTop:20,
        backgroundColor:"#F5F5F5"
    },
    title:{
        fontWeight:"bold",
        fontSize:32
    },
    wrapper:{
        width:"100%",
        padding:10,
        marginTop: 20,
        backgroundColor:"#fff"
      },
      input:{
        fontSize:20,
        paddingRight:10,
        paddingTop:1,
        paddingBottom:1,
        paddingLeft:10
       },
       inputline:{
        borderBottomWidth:1,
        borderBottomColor:"green"
    },
    inputRow:{
        display:"flex",
        marginTop:10
      },
   btn_signup:{
       backgroundColor:"#00C569",
       color:"#fff"
   }
});

//make this component available to the app
export default SignUpScreen;
