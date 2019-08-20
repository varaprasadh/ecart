import {
    combineReducers
} from 'redux';
import Reducer_Explore from './Reducer_Explore';
import Reducer_Wishlist from "./Reducer_Wishlist";
import Reducer_Cart from "./Reducer_Cart";
import Reducer_Checkout from "./Reducer_Checkout";
import Reducer_Additional from "./Reducer_Additional";
import Reducer_Search from "./Reducer_SearchResult";
import Reducer_Config from "./Reducer_config";

export default combineReducers({
  Config:Reducer_Config,
  Explore:Reducer_Explore,
  Cart:Reducer_Cart,
  Wishlist:Reducer_Wishlist,
  Checkout:Reducer_Checkout,
  Addition:Reducer_Additional,
  Search:Reducer_Search
});