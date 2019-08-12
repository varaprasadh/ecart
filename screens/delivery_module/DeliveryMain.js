import React, { Component } from 'react';
import { View, Text,ScrollView,FlatList,StyleSheet,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import Wrapper from '../Home/Wrapper';
import {Ionicons} from "@expo/vector-icons"
class DeliveryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  onSelect(id){
      //trigger deatials intent with that id;
      this.props.navigation.push("DDettails");
  }
  logout(){

  }
  render() {
    return (
      <Wrapper>
          <View style={styles.container}>
              <View style={{flexDirection:"row"}} >
                   <View >
                       <Text style={styles.title}>welcome!!</Text>
                       <Text style={styles.sTitle}>your pending deliveries</Text>
                   </View>
                   <View style={{alignItems:"flex-end",flex:1}}>
                      <TouchableOpacity onPress={this.logout.bind(this)}>
                           <Text style={styles.logout}>Logout</Text>
                      </TouchableOpacity>
                   </View>
              </View>
              <View style={{flex:1}}>
                  <FlatList data={["1","2","3","4","5","1","2","3","4","5"]} 
                   keyExtractor={item=>item} 
                   renderItem={item=><Item onSelect={this.onSelect.bind(this)}/>}
                   showsVerticalScrollIndicator={false}
                   ItemSeparatorComponent={()=><View style={{borderWidth:1}}></View>}
                   />
              </View>
          </View>
      </Wrapper>
    );
  }
}

class Item extends Component{
    onSelect(){
        this.props.onSelect(123);
    }
    render(){
        return(
           <TouchableWithoutFeedback onPress={this.onSelect.bind(this)}>
            <View style={styles.item}>
            <View style={{flex:2}}>
                <View style={styles.frow}>
                    <Text style={styles.label}>order Id:</Text>
                    <Text style={[styles.text,]} >9988776655</Text>
                </View>
                <View style={styles.frow}>
                    <Text style={styles.label}>customer name:</Text>
                    <Text style={[styles.text,]} >john doe</Text>
                </View>
                <View style={styles.frow}>
                    <Text style={styles.label} >mobile number:</Text>
                    <Text style={[styles.text,]}  >9988776655</Text>
                </View>
            </View>
            <View style={{alignItems:"flex-end",flex:1,}}>
                <Ionicons name="ios-arrow-forward" size={25}/>
            </View>
            </View>
           </TouchableWithoutFeedback>
        )
    }

}

const styles=StyleSheet.create({
    container:{
        paddingHorizontal:10,
        flex:1
    },
     title: {
         fontSize:20,
         paddingVertical:10,
         paddingHorizontal:10,
         fontWeight:"bold"
     },
     sTitle:{
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        backgroundColor: "#2980b9",
        alignSelf:"flex-start",
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10,
        color:"#fff"

     },
      label:{
       flex:1,
       color: "#2c3e50"
     },
     text:{
        flex:1,
        fontWeight:"bold",
        color: "#2980b9"
    }, 
     item:{
       paddingVertical:10,
       borderBottomColor:"#000",
       flexDirection: 'row',
       alignItems:"center",
       flex:1
     },
     frow:{
         flexDirection:"row",
     },
     logout: {
         backgroundColor: "#e74c3c",
         paddingHorizontal: 10,
         paddingVertical: 5,
         color: "#fff",
         fontWeight: "bold",
         borderRadius: 5
     }
})
export default DeliveryMain;
