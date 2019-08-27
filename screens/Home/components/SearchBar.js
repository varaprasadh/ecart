import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchText:''
    }
  }

  onChangeText(text){
    this.setState({
      searchText:text
    });
  }
  render() {
    return (
     
          <View style={styles.container}>
            <TextInput style={styles.searchbar} 
              placeholder="search here"
              onChangeText={this.onChangeText.bind(this)}/>
             <TouchableOpacity 
              onPress={()=>this.props.onSearch(this.state.searchText)}
              >
               <View style={styles.icon}>
                   <Ionicons name="ios-search" size={25}/>
               </View>
             </TouchableOpacity>
        </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    height:50,
    backgroundColor:"#fff",
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
