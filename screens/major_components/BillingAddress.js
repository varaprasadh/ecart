import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

class BillingAddress extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
      console.log("address mounted..")
      address=this.props.address
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Billing Address :</Text>
        <View style={{}}>
            <View style={[{flexDirection:"row"},styles.frow]}>
                <Text style={styles.key}>name :</Text>
                <Text style={styles.value}>{`${address.first_name} ${address.last_name}`}</Text>
            </View>
            <View style={[{flexDirection:"row"},styles.frow]}>
                <Text style={styles.key}>mobile :</Text>
                <Text style={styles.value}>{`+965 ${address.phone_number}`}</Text>
            </View>
            <View style={[{flexDirection:"row"},styles.frow]}>
                <Text style={styles.key}>area :</Text>
                <Text style={styles.value}>{`${address.area}`}</Text>
            </View>
            <View style={[{flexDirection:"row"},styles.frow]}>
                <Text style={styles.key}>street :</Text>
                <Text style={styles.value}>{`${address.street}`}</Text>
            </View>
            <View style={[{flexDirection:"row"},styles.frow]}>
                <Text style={styles.key}>block :</Text>
                <Text style={styles.value}>{`${address.block}`}</Text>
            </View>
            <View style={[{flexDirection:"row"},styles.frow]}>
                <Text style={styles.key}>lane :</Text>
                <Text style={styles.value}>{`${address.lane}`}</Text>
            </View>
            </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
    container:{
        // flex:1,
        padding:10,
        backgroundColor:"#fff",
        borderRadius:10,
        margin:10
    },
    key:{
        paddingHorizontal: 20,
        flex: 1,
        color: "#7f8c8d",
        textTransform: "capitalize"
    },
    value: {
        flex: 3
    },
     frow: {
         paddingVertical: 2
     },
     heading:{
         fontWeight:"bold",
         color: "#e74c3c",
         padding:5
     }
})

export default BillingAddress;

