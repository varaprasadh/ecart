//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


class Ship_AdressComponent extends Component {
  
   onSelect(){
       console.log("address changed",this.props.id);
       this.props.onSelect(this.props.id); 
   }
    render() {
        console.log("inside",this.props.label)
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
                    {this.props.selected?
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
        marginTop:10
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
});

export default Ship_AdressComponent;
