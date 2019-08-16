import {LOAD_EXPLORE,LOAD_CATEGORIES,LOAD_MORE} from '../actions/types';


const explore = {
  loading:true,
  products:[],
  categories:[],
};


//loaderstate on explore screen,
//load products
//load categories
//load more products


export default function(state = explore, action) {
  switch (action.type) {
    case "LOAD_EXPLORE":
      tempProducts.forEach(p=>{
        state.products.push(p);
      })
      return state;

      case "LOAD_CATEGORIES":
        tempCats.forEach(cat=>{
          state.categories.push(cat);
        })
        return state;

      case "LOAD_MORE":
        newState=state;
        tempProducts.forEach(p=>{
          p.id=state.products.length;
          newState.products.push(p);
        })
        return newState;
      case "MODIFY_ITEM_CART_STATUS":
        products = state.products;
        products.forEach(product=>{
          if(product.id==action.id){
            product.isInCart=action.value
          }
        })
        return {...state,products};
      
      case "MODIFY_ITEM_WISHLIST_STATUS":
        products = state.products;
        products.forEach(product=>{
          if(product.id==action.id){
            product.isinWishlist=action.value
          }
        })
        return {...state,products};
      
      case "TOGGLE_LOADING":
         newState={
           ...state,loading:false
         } 
         return newState;
      default:
      return state;
  }
}

const tempProducts = [{
  id: 1,
  title: "prayer beads",
  category: "devotional",
  price: 20,
  description:"some description about the product",
  img: require('../product_images/prayerbeads.jpg'),
  isInCart: false,
  isinWishlist: false
}, {
  id: 2,
  title: "sewing_kit",
  category: "devotional",
  price: 20,
  description: "some description about the product",
  img: require('../product_images/sewing_kit.jpg'),
  isInCart: false,
  isinWishlist: false
}, {
  id: 3,
  title: "sheha fatoota",
  category: "devotional",
  price: 20,
  description: "some description about the product",
  img: require('../product_images/sheha_fatoota.jpg'),
  isInCart: false,
  isinWishlist: false

}, {
  id: 4,
  title: "shesma medium",
  category: "devotional",
  description: "some description about the product",
  price: 20,
  img: require('../product_images/shesma_medium.jpg'),
  isInCart: false,
  isinWishlist: false
}, {
  id: 5,
  title: "wooden burner",
  category: "devotional",
  price: 20,
  description: "some description about the product",
  img: require('../product_images/wooden_burner2.jpg'),
  isInCart: false,
  isinWishlist: false
}]

const tempCats=[
  "Devotional",
  "blankets",
  "baking dishes",
  "cooking utensils",
  "baby items",
  "blankets"
]