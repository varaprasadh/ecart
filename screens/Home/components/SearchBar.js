import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { Right } from 'native-base';
import { BottomNavigation } from 'react-native-paper';
class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     
          <View style={styles.container}>
            <TextInput style={styles.searchbar} 
              placeholder="search here"
              onChangeText={this.props.onChangeText.bind(this)}/>
            <View style={styles.icon}>
              <Ionicons name="ios-search" size={25}/>
            </View>
        </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    height:50,
    backgroundColor:"#ecf0f1",
    alignSelf:"stretch",
    flexDirection: 'row',
    borderRadius:20,
    marginHorizontal:10,
    paddingHorizontal:10,
  },
 
  icon:{
      flex:1,
      alignItems:"center",
      justifyContent: 'center',
  },
  searchbar:{
    flex:4,
    paddingHorizontal:10,
    paddingVertical:2,
    fontSize:18,
    color:"#7f8c8d"
  }
})
export default SearchBar;
