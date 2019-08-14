import React, { Component } from 'react'
import { Text, View,ScrollView,StyleSheet} from 'react-native'
import CategoryItem from "./CategoryItem";
export class Categories extends Component {
    constructor(props){
        super(props);
        this.onItemClick=this.onItemClick.bind(this);
        this.state={
            categories:this.props.categories||[]
        }
    }
    onItemClick(name){
       this.props.onCategorySelected(name);
    }

    render() {
        return (
           this.props.categories.length>0 &&
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>
                        {this.props.sub?"Sub Categories":"Categories"}
                    </Text>
                </View>
                <View style={styles.svWrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {
                          this.state.categories.map((catName,i)=>{
                            return (<CategoryItem onItemClick={this.onItemClick} index={i} name={catName} key={i}/>) 
                          })
                      }              
                              
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        paddingVertical:10
    },
 
    heading:{
        fontWeight:"bold",
        fontSize:25,
        paddingHorizontal:10,
        paddingVertical:10
    },

    svWrapper:{
        paddingVertical:10
    }
})

export default Categories;

