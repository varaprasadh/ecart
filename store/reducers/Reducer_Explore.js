
const explore = {
  loading:true,
  products:[],
  categories: []
};
function parseProduct(p){
 carouselImages=p.images.map(imgurl=>{
           return {
             uri:imgurl
           }
         });
    let parsedProduct = {
      id: p.id,
      title: p.item_name,
      category: p.category,
      description: p.category, 
      price: p.price,
      isInCart: p.is_incart,
      isinWishlist: p.is_inwishlist,
      images:carouselImages.length?carouselImages:[require('../product_images/noimage.jpg')],
      img: p.images[0] ? {
        uri: p.images[0]
      } : require('../product_images/noimage.jpg'),
      quantity: p.quantity,
    }
      return parsedProduct;
}

 
export default function(state = explore, action) {
  switch (action.type) {
    case "LOAD_EXPLORE":
       products=action.products;   
      return {...state,products:[...products]};
 
      case "LOAD_MORE":
        products = action.products;
        return {...state,products:[...state.products,...products]};
      //need to remove below both
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
      
      case "TOGGLE_EXPLORE_LOADING":
         newState={
           ...state,loading:false
         } 
         return newState;
      default:
      return state;
      case "LOAD_CATS":
        return {...state,categories:action.categories}
  }
}

