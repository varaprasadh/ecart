//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Cart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Cart</Text>
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
        backgroundColor: '#2980b9',
    },
});

//make this component available to the app
export default Cart;
