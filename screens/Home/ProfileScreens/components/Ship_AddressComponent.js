//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { TouchableWithoutFeedback,TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


class Ship_AdressComponent extends Component {
    
    onSelect() {
        console.log("address changed", this.props.id);
        this.props.onSelect(this.props.id);
    }

    render() {
        console.log("\nrendering the ship[\n")
        return (
            <TouchableWithoutFeedback onPress={this.onSelect.bind(this)} style={styles.container}>
               <View style={styles.row}>
                 <View style={{flex:3}}>
                    <Text style={{fontWeight:"bold",fontSize:20,textTransform:"capitalize"}}>{this.props.label}</Text>
                    <Text style={{fontSize:18,paddingVertical:10}}>
                     {this.props.content}
                    </Text>
                 </View>
                 <View style={{flex:1,alignItems:"flex-end",marginRight:20}}>
                  { !this.props.typeSelect?
                    <TouchableOpacity onPress={()=>this.props.onDelete(this.props.id)}>
                       <Ionicons name="ios-close" size={30} color="#e74c3c"/>
                   </TouchableOpacity>:
                    this.props.selected?
                         (<Image source={require("./icons/Checkbox_checked.png")}/>):
                         (<Image source={require("./icons/Checkbox_unchecked.png")}/>)
                   }
                 </View>
               </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal:20,
        paddingVertical:10,
        marginTop:5,
        borderBottomColor: '#7f8c8d',
        borderBottomWidth:1
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
});

export default Ship_AdressComponent;
