// set current address
// set payment type

// ----on click of next
 
// --if paytype==card

// set name on card
// set card number
// set exp_month
// set year
// set cvv
const checkout={
    address:'',
    payType:'',
    card:{
        name:'',
        number:'',
        month:'',
        year:'',
        cvv:''
    }
}

export default function (state = checkout, action) {
    switch (action.type) {
        case "SET_CHECKOUT_ADDRESS":
            return {...state,address:action.address}
        case "SET_PAYTYPE":
            return {...state,payType:action.payType}
        case "SET_CARD_DETAILS":
            return {...state,card:action.card}
        default:
            return state;
    }
}