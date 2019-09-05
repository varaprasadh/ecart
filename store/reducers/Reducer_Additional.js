//change default shipping address

const global={
    currentProduct:null,
    profile:{
        firstName:"",
        lastName:"",
        mobile:"",
        email:"",
        address:{
            area:"",
            block:"",
            street:"",
            lane:''
        }
    },
}

export default function (state = global, action) {
    switch (action.type) {
        case "SET_CURRENT_PRODUCT":
            return {...state,currentProduct:action.product};
        case "CHANGE_CURRENT_ITEM_STATUS":
            newState={...state};
            console.log("changing status")
            if(state.currentProduct && action.id==state.currentProduct.id){
                newState={...state,currentProduct:{...state.currentProduct,...action.obj}}
            }
            console.log(newState);
            return newState;
        case "SET_PROFILE":
            return {...state,profile:action.profile}
        case "UPDATE_LOCAL_NAME":
            return {...state,profile:{...state.profile,...action.obj}}
        default:
            return state;
    }
}
