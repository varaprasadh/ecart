/* load cart items
   remove item from cart
   change quantity of items
     - increase quantity
     - decrease quantity
*/

const tempCart = {
     loading:true,
     items:[]
} 
  
export default function (state = tempCart,action) {
     switch (action.type) {
          case "TOGGLE_LOADING":
               newState = {
                    ...state,
                    loading: false
               }
               return newState;
          case 'ADD_TO_CART':
               items =state.items;
               items=items.filter(item=>item.id!=action.product.id)
               items = [...items, action.product];
               console.log("added to cart");
               return {...state,items};
          case 'REMOVE_FROM_CART':
               items=state.items;
               items = items.filter((product => product.id != action.id));
               return {...state,items};
          case 'SET_QTY':
               items = state.items;
               items = items.map(product => {
                    console.log(action);
                    if (product.id === action.id) {
                         product["quantity"] = action.quantity;
                    }
                    return product;
               })
               return {...state,items}
          default:
               return state;
     }
}

