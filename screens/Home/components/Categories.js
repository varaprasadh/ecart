import React, { Component } from 'react'
import { Text, View,ScrollView,StyleSheet} from 'react-native'
import CategoryItem from "./CategoryItem";
export class Categories extends Component {
    constructor(props){
        super(props);
        this.onItemClick=this.onItemClick.bind(this);
    }
    onItemClick(name){
       this.props.onCategorySelected(name);
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Categories</Text>
                </View>
                <View style={styles.svWrapper}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <CategoryItem onItemClick={this.onItemClick} name="shoes"/>               
                        <CategoryItem onItemClick={this.onItemClick} name="shoes2"/>               
                        <CategoryItem onItemClick={this.onItemClick} name="shoes3"/>               
                        <CategoryItem onItemClick={this.onItemClick} name="shoes4"/>               
                        <CategoryItem onItemClick={this.onItemClick} name="shoes5"/>               
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

