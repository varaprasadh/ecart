//change default shipping address

const global={
    isCurrentMain:true,
    savedAddress:[
        //  {
        //      title: "home Address",
        //      address:"some street,some road,some door",
        //  }, {
        //      title: "Office Address",
        //      address: "some street,some road,some door",
        //  }
    ]
}

export default function (state = global, action) {
    switch (action.type) {
        case "CHANGE_CURRENT":
            return {...state,isCurrentMain:action.value}
        default:
            return state;
    }
}
