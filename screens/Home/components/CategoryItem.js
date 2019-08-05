import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableWithoutFeedback} from 'react-native'

export class CategoryItem extends Component {
    constructor(props){
        super(props);

    }
  
    render() {
        return (
            <TouchableWithoutFeedback  onPress={()=>this.props.onItemClick(this.props.name)}>
              <View style={styles.item}>
                <Text style={styles.name}>{this.props.name}</Text>
              </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles=StyleSheet.create({
    item:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:"#bdc3c7",
        borderRadius:10,
        marginHorizontal:5
      },
      name:{
        fontWeight:"bold", 
        fontSize:18
    },
})
export default CategoryItem
