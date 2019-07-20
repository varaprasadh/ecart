//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class WishList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>WishList </Text>
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
        backgroundColor: '#f39c12',
    },
});


//make this component available to the app
export default WishList;
