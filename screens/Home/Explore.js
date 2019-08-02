//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ScrollView,FlatList} from 'react-native';
import Wrapper from "./Wrapper";
import SearchBar from  "./components/SearchBar";
import Categories from "./components/Categories";
import Product_Explore from "./components/Product_Explore";

// create a component
class Explore extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText:""
        }
    }
    onSearchChange(text){
        this.setState({
            searchText:text
        });
        console.log(text);

    }
   onCategorySelected(name){
       //trigger intent with that category
       this.props.navigation.push("ExploreCategory");

   }
   onProductSelect(){
       //open product screen
       this.props.navigation.push("ExploreProduct");
       
   }

    render() {
        return (
            
               <Wrapper>
                <SearchBar onChangeText={this.onSearchChange.bind(this)}/>
                <ScrollView >
                    <Categories
                       onCategorySelected={this.onCategorySelected.bind(this)} />
                    <Text style={styles.label}> Latest Products</Text>   

                       <FlatList
                           data={[{key:'1'},{key:'2'},{key:'3'},{key:'4'}]}
                            numColumns={2}
                            contentContainerStyle={styles.productContainer}
                           renderItem={(item)=> (
                           <Product_Explore 
                                onProductSelect={this.onProductSelect.bind(this)}
                                key={item.key} />)}
                       />
                     
                </ScrollView>
              </Wrapper>
           
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    productContainer:{
        flex:1,
        // flexDirection:"row",
        // flexWrap:"wrap",
        alignItems:"center"
    },
    label:{
        fontWeight:"bold",
        fontSize:25,
        paddingHorizontal:10,
        paddingVertical:10
    },
});

//make this component available to the app
export default Explore;
