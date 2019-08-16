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
      items=tempWishlist.items;
      return {...state,items}
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
    case "TOGGLE_LOADING":
    newState = {
      ...state,
      loading: false
    }
    return newState;
    default:
      return state;
  }
}

const tempWishlist={
  loading:false,
  items:[
    {
      id:1,
      title:"prayer beads",
      price:20,
      quantity:0,
      img: require('../product_images/prayerbeads.jpg')
    },
    {
      id:2,
      title:"shesma medium",
      price:20,
      quantity:1,
      img: require('../product_images/sewing_kit.jpg'),
    },
    {
      id:3,
      title:"shesma medium",
      price:20,
      quantity:null,
      img: require('../product_images/prayerbeads.jpg')
    },
    {
      id:4,
      title:"shesma medium",
      price:20,
      quantity:1,
      img: require('../product_images/sewing_kit.jpg')
    },
    {
      id:5,
      title:"shesma medium",
      price:20,
      quantity:null,
      img: require('../product_images/prayerbeads.jpg')
    },
  ]
}