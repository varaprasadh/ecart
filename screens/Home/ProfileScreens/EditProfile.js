//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from "../../major_components/Header";

class EditProfile extends Component {
    render() {
        return ( 
            <View style={styles.container}>
               <Header backbutton title="Edit Profile" goBack={this.props.navigation.goBack.bind(this)} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        paddingTop:20
    },
});


export default EditProfile;
