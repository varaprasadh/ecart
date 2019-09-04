const Delivery = {
    orders:[]
}

export default function (state = Delivery, action) {
    switch (action.type) {
            case "SET_ORDERS":
                return {orders:action.orders};
            case "MODIFY_STATUS":
                let orders=state.orders;
                console.log("modifying...",action.index,action.status);
                let updatedOrders=[];
                orders=orders.map((orderobj,index)=>{
                    let newOrder=orderobj;
                    if(index==action.index){
                        // return {
                        //     ...orderobj,order:{...orderobj.order,status:action.status}
                        // }
                     newOrder={...newOrder,order:{...newOrder.order,status:action.status}}
                    }
                    updatedOrders.push(newOrder);
                });
                return {...state,orders:updatedOrders}
                default:
                    return state;
    }
} 