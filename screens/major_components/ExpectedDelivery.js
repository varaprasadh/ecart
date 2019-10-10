import React, { Component } from 'react'
import { Text, View,StyleSheet} from 'react-native'

export class ExpectedDelivery extends Component {
    render() {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        orderDate = this.props.orderDate+'';
        orderDate=orderDate.split('-').reverse().join();
        dateobj = new Date(Date.parse(orderDate) || Date.now());
        numberOfDaysToAdd = 2;
        dateobj.setDate(dateobj.getDate() + numberOfDaysToAdd);

        day = days[dateobj.getDay()];
        day_date = dateobj.getDate();
        month=(Number(dateobj.getMonth())+1)+"";
        year = dateobj.getFullYear();
        date = day + ", " + day_date+"/"+month+"/"+year;

        return (
            <View style={styles.container}>
               <View>
                   <Text style={styles.heading}>
                       Expected Delivey Date :
                   </Text>
                   <Text style={styles.date}>
                      {date}
                   </Text>
               </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:"#fff",
        margin:10,
        borderRadius:10,
    },
    heading:{
        fontWeight:"bold",
        color: "#7f8c8d",
        padding:10
    },
    date:{
        color: "#27ae60",
        fontWeight:"bold",
        padding:5,
        fontSize:20
    }
})
export default ExpectedDelivery
