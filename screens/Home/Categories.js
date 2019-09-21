import React, { Component } from 'react';
import { View, Text,TouchableWithoutFeedback,StyleSheet,ScrollView} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

import {connect} from "react-redux";
import EmptyItems from '../major_components/EmptyItems';


class Categories extends Component {
  constructor(props) {
    super(props);
  }
 onItemClick(query){
  this.props.onItemClick(query);
 }
  render() {

    return (
     this.props.categories.length?
       <ScrollView style={{flex:1}}>
        <View style={styles.container}>
        <Text style={{fontWeight:"bold",fontSize:18,color:"#fff"}}>Categories</Text>
          {
            this.props.categories.map((cat,i)=>{
              return(
                <TouchableWithoutFeedback  key={i}>
                <View> 
                    <Category 
                      onItemClick={this.onItemClick.bind(this)}
                      name={cat.name} 
                      subcategories={cat.subcategories}/>
                </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </View>
      </ScrollView>:<EmptyItems message="No categories available!"/>
    );
  }
}
class Category extends Component{
  constructor(props){
    super(props);
    this.state={
      open:false
    }
  }
  toggleExpand(){
    this.setState({
      open:!this.state.open
    })
  }
  openResult(){
    this.props.onItemClick(this.props.name);
  }
  toggleOrOpen(){
    this.props.subcategories.length ? this.toggleExpand() : this.openResult()
  }
  render(){
    return(
      <View style={styles.cat_container}>
        <TouchableWithoutFeedback
         onPress={this.toggleOrOpen.bind(this)}
        >
          <View style={styles.cat}>
              <Text style={styles.catTitle}>{this.props.name}</Text>
             { this.props.subcategories && this.props.subcategories.length?
               <View style={{marginRight:20}}>
              {
                this.state.open==false?
                <Ionicons name="ios-add" size={25} color="#27ae60"/>:
                <Ionicons name="ios-remove" size={25} color="#e74c3c"/>
              }
              </View>:null
             }
          </View>
        </TouchableWithoutFeedback>
        <View style={{display:this.state.open?"flex":"none"}}>
        {
          (this.props.subcategories)?
            this.props.subcategories.map((subcat,i)=>{
            return (
              <TouchableWithoutFeedback key={i} onPress={()=>this.props.onItemClick(subcat)}>
              <View style={styles.subcat}>
                <Text style={{color:"#fff"}}>{subcat}</Text>
              </View>
              </TouchableWithoutFeedback>
            )
          })
          :null
        }
        </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  container:{
    paddingHorizontal:10,
    paddingVertical:10
  },
  cat_container:{
    borderBottomWidth:1,
    borderBottomColor: "#7f8c8d",
    padding:10
  },
  cat:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
   catTitle:{
     fontSize:15,
     fontWeight:"bold",
     paddingRight:30,
     textTransform:"capitalize",
     color:"#fff"
    },
  subcat:{
    paddingLeft:20,
    paddingVertical:10
  }
})
mapState=state=>{
  let {Explore} = state;
  // console.log(Explore);
  return {
     categories:Explore.categories
  }
}

export default connect(mapState)(Categories);
