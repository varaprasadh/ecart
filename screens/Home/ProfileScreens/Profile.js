//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableWithoutFeedback} from 'react-native';
import Header from "../../major_components/Header";


// write a function to logout


class Profile extends Component {
   constructor(props){
       super(props);
       this.state={

       }
       this.logout=this.logout.bind(this);
   }
   componentDidMount(){
    this.props.navigation.push("ShippingAddress");
   }

   logout(){
    //clear data and redirect to login screen
   }
    render() {
        return (
            <View style={styles.container}>
               <Header title="Profile"/>
               <View style={{alignItems:"center"}}>
                   <Image style={styles.pro_Icon} source={require("./images/boy.png")}/>
                   <Text style={{fontSize:30,textAlign:"center",marginTop:20}}>John Doe</Text>
                </View>
                <View>
                   <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("EditProfile")} >
                    <View style={[styles.row]}>
                        <Image source={require("./images/Icon_Edit-Profile.png")}/>
                        <Text style={styles.btn_text}>Edit Profile</Text>
                    </View>
                   </TouchableWithoutFeedback>
                   <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("ShippingAddress")} >
                    <View style={[styles.row]}>
                        <Image source={require("./images/Icon_Location.png")}/>
                        <Text style={styles.btn_text} >Shipping Adress</Text>  
                    </View>
                   </TouchableWithoutFeedback>
                   <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("OrderHistory")}>
                    <View style={[styles.row]}>
                        <Image source={require("./images/Icon_History.png")}/>
                        <Text style={styles.btn_text} >Order History</Text>
                    </View>
                   </TouchableWithoutFeedback>
                   <TouchableWithoutFeedback onPress={this.logout} >
                    <View style={[styles.row]}>
                        <Image source={require("./images/Icon_Exit.png")}/>
                        <Text style={styles.btn_text} >Logout</Text>
                    </View>
                   </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:30
    },
    pro_Icon:{
        width:150,
        height:150,
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10
    },
    btn_text:{
        fontSize:18,
        paddingVertical:15,
        marginLeft:20
    }
});


export default Profile;
