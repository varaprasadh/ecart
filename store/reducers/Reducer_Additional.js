//change default shipping address

const global={
    isCurrentMain:true,
}

export default function (state = global, action) {
    switch (action.type) {
        case "CHANGE_CURRENT":
            return {...state,isCurrentMain:action.value}
        default:
            return state;
    }
}