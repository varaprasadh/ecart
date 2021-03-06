/*
  load items
  remove item
*/
const wishlist={
  loading:true,
  items:[]
}

export default function (state =wishlist, action) {
  switch (action.type) { 
    case "LOAD_WISHLIST":
           products = action.products;
           products = products.map(p => {
             let parsedProduct = {
               id: p.id,
               title: p.item_name,
               category: p.category,
               description: p.category,
               price: p.price,
               isInCart: p.is_incart,
               isinWishlist: p.is_inwishlist,
               img: p.images[0] ? {
                 uri: p.images[0]
               } : require('../product_images/noimage.jpg'),
               quantity: p.quantity,
               isActive:p.is_active
             } 
             return parsedProduct;
           });
           const uniqueproducts = Array.from(new Set(products.map(a => a.id)))
             .map(id => {
               return products.find(a => a.id === id)  
             });

           return {
             ...state,
             items: [...uniqueproducts]
           };

    case "ADD_TO_WISHLIST":
      console.log("add to wishlist reducer",action.product)
      items =state.items;
      items=items.filter(item=>item.id!=action.product.id)
      items = [...items, action.product];
      return {...state,items};
    case "REMOVE_FROM_WISHLIST":
      items=state.items;
      items=items.filter((item)=>{
        return item.id!=action.id;
      });
      return {...state,items}
    case "TOGGLE_WISHLIST_LOADING":
    newState = {
      ...state,
      loading: false
    }
    return newState;
    case "CHANGE_CART_STATUS_WISHLIST":
      items=[...state.items];
      items=items.map(item=>{
        if(item.id==action.id){
          item={...item,...action.obj}
        }
        return item;
      })   
       return {...state,items};
    default:
      return state;
  }
}
