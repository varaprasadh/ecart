//change default shipping address

const global={
    isCurrentMain:true,
    currentProduct:null
}

export default function (state = global, action) {
    switch (action.type) {
        case "SET_CURRENT_PRODUCT":
            return {...state,currentProduct:action.product};
        case "CHANGE_CURRENT_ITEM_STATUS":
            newState={...state};
            if(action.id==state.currentProduct.id){
                newState={...state,...action.obj}
            }
            return newState;
        default:
            return state;
    }
}
