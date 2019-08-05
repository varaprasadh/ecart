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
     this.props.navigation.push("OrderHistory");
   }

   logout(){
    //clear data and redirect to login screen
   }
    render() {
        return (
            <View style={styles.container}>
               <Header title="Profile"/>
               <View style={{flexDirection:"row",marginVertical:10,borderBottomWidth:2,borderBottomColor:"#7f8c8d"}}>
                   <Image style={styles.pro_Icon} source={require("./images/boy.png")}/>
                   <View style={styles.details}>
                       <Text style={styles.name}>john doe</Text>
                       <Text style={styles.mobile}>9988773344</Text>
                       <Text style={styles.email}>johndoen@test.com</Text>
                   </View>
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
    },
    details:{
        alignSelf:"flex-start",
        paddingVertical:20,
        paddingHorizontal:10,
    },
    name:{
     color:"#34495e",
     fontSize:20,
     fontWeight:"bold",
   },
    email:{
      fontSize:16
    },
    mobile:{
      fontSize:16
    }

});


export default Profile;
