import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableWithoutFeedback} from 'react-native'

export class CategoryItem extends Component {
    constructor(props){
        super(props);
        this.colors=[
          "#27ae60",
          "#d35400",
          "#2980b9",
          "#8e44ad",
          "#16a085"
        ]
    }
  
    render() {
        return (
            <TouchableWithoutFeedback  onPress={()=>this.props.onItemClick(this.props.name)}>
              <View style={[styles.item,{backgroundColor:this.colors[this.props.index%this.colors.length]}]}>
                <Text style={styles.name}>{this.props.name}</Text>
              </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles=StyleSheet.create({
    item:{
        paddingHorizontal:20,
        paddingVertical:5,
        backgroundColor:"#27ae60",
        borderRadius:10,
        marginHorizontal:5
      },
      name:{
        fontWeight:"bold", 
        fontSize:18,
        color:"white"
    },
})
export default CategoryItem
