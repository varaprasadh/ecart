import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView} from 'react-native'
import Wrapper from './Wrapper';
import Categories from './components/Categories';
import SearchBar from './components/SearchBar';
import Header from '../major_components/Header';
import Products from './components/Products';


//get temparary products from explore 
import {connect} from "react-redux";
export class CategoryMain extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText:'',
            categoryName:"shoes",
            categories: [
                "temp cat 1",
                "temp cat 2",
                "temp cat 3",
                "temp cat 4",
                "temp cat 5",
            ]
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
              <View style={[{marginTop:-10}]}>
              <Header title={this.state.categoryName} backbutton backHandler={()=>this.props.navigation.goBack()}/>
              <View style={{marginTop:10}}>
                <SearchBar
                    onChangeText={this.onChangeText.bind(this)}
                />
              </View>
              <ScrollView>
                <View style={{paddingBottom:100}}>
                  {!this.subcat?(
                    <Categories sub categories={this.state.categories}
                    onCategorySelected={this.onCategorySelected.bind(this)}/>)
                    :null 
                   }

                 <Products
                    products={this.props.products}
                    onProductSelect={this.onProductSelect.bind(this)}
                />
                </View>
              </ScrollView>
              </View>
           </Wrapper>
        )
    }
}
const styles=StyleSheet.create({

})

mapStateToProps=state=>{
    return {
        products:state.Explore.products
    }
}

export default connect(mapStateToProps)(CategoryMain);
