//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ScrollView,FlatList,} from 'react-native';
import Wrapper from "./Wrapper";
import SearchBar from  "./components/SearchBar";
import Categories from "./components/Categories";
import Products from "./components/Products";
import LoadMoreButton from "./components/LoadMoreButton";

// create a component
class Explore extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText:"",
            products:[

            ]
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
  loadMoreProducts(){

  }
  
    render() { 
        return ( 
               <Wrapper>
                <SearchBar onChangeText={this.onSearchChange.bind(this)}/>
                <ScrollView>
                    <Categories
                       onCategorySelected={this.onCategorySelected.bind(this)} />
                    <Products
                        onProductSelect={this.onProductSelect.bind(this)}
                    />
                   <LoadMoreButton loading onPress={this.loadMoreProducts.bind(this)}/>
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
    label:{
        fontWeight:"bold",
        fontSize:25,
        paddingHorizontal:10,
        paddingVertical:10
    },
});

//make this component available to the app
export default Explore;
