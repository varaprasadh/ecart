
const config={ 
    base_url: "https://bazarkam.com",
    AUTH_TOKEN: "",
}                   


export default function (state = config, action) {
    switch (action.type) {
        case "CLEAR_AUTH_TOKEN":
            return {...state,AUTH_TOKEN:''}
        case "SET_AUTH_TOKEN":
            return {...state,AUTH_TOKEN:action.AUTH_TOKEN}
        default:
            return state; 
    }
} 
     
              