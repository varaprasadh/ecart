
const explore = {
  loading:true,
  products:[],
  categories: [{
      name: "cat1",
      subcategories: ["subcat1", "subcat2", "subcat3", "subcat4"]
    },
    {
      name: "cat2",
      subcategories: ["subcat1", "subcat2", "subcat3", "subcat4"]
    },
    {
      name: "cat3",
      subcategories: ["subcat1", "subcat2", "subcat3", "subcat4"]
    },
    {
      name: "cat4",
    }
  ]
};


//loaderstate on explore screen,
//load products
//load categories
//load more products
/*
 {
   id: 4,
   title: "shesma medium",
   category: "devotional",
   description: "some description about the product",
   price: 20,
   img: require('../product_images/shesma_medium.jpg'), //main
   images:['','','']
   isInCart: false,
   isinWishlist: false,
   quantity: 4
 }
*/
 
export default function(state = explore, action) {
  switch (action.type) {
    case "LOAD_EXPLORE":
       products=action.products;
       products=products.map(p=>{
         carouselImages=p.images.map(imgurl=>{
           return {
             uri:imgurl
           }
         })
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
           quantity: p.quantity
         }
      return parsedProduct;
      })    
        
      return {...state,products:[...state.products,...products]};
 
      case "LOAD_MORE":
        products = action.products;
        products.forEach(p=>{
         
          state.products.push(p);
        })
        return state;
        
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
  isinWishlist: false,
  quantity:0
}, {
  id: 2,
  title: "sewing_kit",
  category: "devotional",
  price: 20,
  description: "some description about the product",
  img: require('../product_images/sewing_kit.jpg'),
  isInCart: false,
  isinWishlist: false,
  quantity: 4,
}, {
  id: 3,
  title: "sheha fatoota",
  category: "devotional",
  price: 20,
  description: "some description about the product",
  img: require('../product_images/sheha_fatoota.jpg'),
  isInCart: false,
  isinWishlist: false,
  quantity: 0

}, {
  id: 4,
  title: "shesma medium",
  category: "devotional",
  description: "some description about the product",
  price: 20,
  img: require('../product_images/shesma_medium.jpg'),
  isInCart: false,
  isinWishlist: false,
  quantity: 4
}, {
  id: 5,
  title: "wooden burner",
  category: "devotional",
  price: 20,
  description: "some description about the product",
  img: require('../product_images/wooden_burner2.jpg'),
  isInCart: false,
  isinWishlist: false,
  quantity: 4
}]
const tempCats=[
  {
    name:"cat1",
    subcats:["subcat1","subcat2","subcat3","subcat4"]
  },
  {
    name:"cat2",
    subcats:["subcat1","subcat2","subcat3","subcat4"]
  },
  {
    name:"cat3",
    subcats:["subcat1","subcat2","subcat3","subcat4"]
  }
]