/* load cart items
   remove item from cart
   change quantity of items
     - increase quantity
     - decrease quantity
*/

const tempCart = []

export default function (state = tempCart,action) {
     switch (action.type) {
          case 'ADD_TO_CART':
               newState=state;
               newState.push(action.product);
               return newState;
          case 'REMOVE_FROM_CART':
               newState=state;
               newState=newState.filter((product=>product.id!=action.id));
               return newState;
          default:
               return state;
     }
}

