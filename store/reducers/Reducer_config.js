//change default shipping address

const config={ 
    base_url: "https://2d1d5190.ngrok.io",
    AUTH_TOKEN: "eyJhbGciOiJub25lIn0.eyJkYXRhIjoiNSJ9."
}

export default function (state = config, action) {
    switch (action.type) {
        default:
            return state; 
    }
}

         