
const config={ 
    base_url: "https://913de35c.ngrok.io",
    AUTH_TOKEN: "eyJhbGciOiJub25lIn0.eyJkYXRhIjoiNSJ9.",
    // AUTH_TOKEN: "eyJhbGciOiJub25lIn0.eyJkYXRhIjoiMjEifQ.", del
}                   
        //     
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
   
            