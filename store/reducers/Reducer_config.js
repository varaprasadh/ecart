//change default shipping address

const config={
    base_url: "https://cbdca1e0.ngrok.io"
}

export default function (state = config, action) {
    switch (action.type) {
        default:
            return state;
    }
}
