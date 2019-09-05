import {
    combineReducers
} from 'redux';
import Reducer_Explore from './Reducer_Explore';
import Reducer_Wishlist from "./Reducer_Wishlist";
import Reducer_Cart from "./Reducer_Cart";
import Reducer_Checkout from "./Reducer_Checkout";
import Reducer_Additional from "./Reducer_Additional";
import Reducer_Config from "./Reducer_config";
import Reducer_Delivery from "./Reducer_Delivery";
import Reducer_orders from "./Reducer_orders";

export default combineReducers({
  Config:Reducer_Config,
  Explore:Reducer_Explore,
  Cart:Reducer_Cart,
  Wishlist:Reducer_Wishlist,
  Checkout:Reducer_Checkout,
  Addition:Reducer_Additional,
  Delivery: Reducer_Delivery,
  MyOrders: Reducer_orders
});