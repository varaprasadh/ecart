const Delivery = {
    orders:[]
}

export default function (state = Delivery, action) {
    switch (action.type) {
            case "SET_ORDERS":
                return {...state,orders:action.orders};
            case "MODIFY_STATUS":
                let orders=state.orders;
                console.log("modifying...",action.index,action.status)
                orders=orders.map((orderobj,index)=>{
                    if(index==action.index){
                        return {
                            ...orderobj,order:{...orderobj.order,status:action.status}
                        }
                    }
                    return orderobj;
                });
                return {...state,orders}
                default:
                    return state;
    }
}