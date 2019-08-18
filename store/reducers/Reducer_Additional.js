//change default shipping address

const global={
    isCurrentMain:true,
    savedAddress:[
         {
             title: "home Address",
             address:"some street,some road,some door",
         }, {
             title: "Office Address",
             address: "some street,some road,some door",
         }
    ]
}

export default function (state = global, action) {
    switch (action.type) {
        case "CHANGE_CURRENT":
            return {...state,isCurrentMain:action.value};
        case "ADD_NEW_ADDRESS":
            console.log("adding new add");
            savedAddress=state.savedAddress;
            savedAddress.push({title:action.title,address:action.address});
            return {...state,savedAddress}
        case "DELETE_SAVED_ADDRESS":
            savedAddress=state.savedAddress;
            savedAddress = savedAddress.filter((ad, index) => {
                return index!=action.index
            });
            return {...state,savedAddress}
        default:
            return state;
    }
}
