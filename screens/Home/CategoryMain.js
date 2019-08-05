import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView} from 'react-native'
import Wrapper from './Wrapper';
import Categories from './components/Categories';
import SearchBar from './components/SearchBar';
import Header from '../major_components/Header';
import Products from './components/Products';


export class CategoryMain extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText:'',
            categoryName:"shoes"
        }
        this.subcat=this.props.navigation.getParam("subcat");

    }
    onChangeText(text){
      this.setState({
          searchText:text
      })
    }
    onCategorySelected(name){
        console.log("Sbucat",this.subcat);
        this.props.navigation.push("ExploreCategory",{subcat:true})

    }
   onProductSelect(){
       this.props.navigation.push("ExploreProduct")
   }
    render() {
        return (
           <Wrapper>
              <View style={[{marginTop:-10},styles.container]}>
              <Header title={this.state.categoryName} backbutton backHandler={()=>this.props.navigation.goBack()}/>
              <View style={{marginTop:10}}>
                <SearchBar
                    
                    onChangeText={this.onChangeText.bind(this)}
                />
              </View>
              <ScrollView>
              {
                !this.subcat?(
                 <Categories
                 sub
                 onCategorySelected={this.onCategorySelected.bind(this)}
              />):null }

                 <Products
                    onProductSelect={this.onProductSelect.bind(this)}
                />
              </ScrollView>
              </View>
           </Wrapper>
        )
    }
}
const styles=StyleSheet.create({

})

export default CategoryMain
