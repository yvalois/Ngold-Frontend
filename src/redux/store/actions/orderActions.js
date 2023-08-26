import {Api} from '../../../utils/Api';

const requestOrder = () => ({
    type: "REQUEST_ORDER",
});

const receiveOrder = payload => ({
    type: "RECEIVE_ORDER",
    payload: payload,
});

const errorOrder = payload => ({
    type: "ERROR_ORDER",
    payload: payload,
});

const updateOrder = payload => ({
    type: "UPDATE_ORDER",
    payload: payload,
});

const deleteOrder = payload => ({
    type: "DELETE_ORDER",
    payload: payload,
});

const savingOrder = () => ({
    type: "SAVING_ORDER",
});

const orderSaved = payload => ({
    type: "ORDER_SAVED",
    payload: payload,
});

export const fetchOrder = () => async dispatch => {
    dispatch(requestOrder());
    try {
        const data = await Api.getOrders();
     
        dispatch(receiveOrder(data));
    }
    catch (error) {
        dispatch(errorOrder(error));
    }
}

export const createOrder = (order) => async dispatch => {
 
    dispatch(requestOrder());
    dispatch(savingOrder());
    try {
        const data = await Api.createOrder(order);
     
        dispatch(receiveOrder(data));
        
    }
    catch (error) {
        dispatch(errorOrder(error));
        dispatch(orderSaved(false));
    }
}

export const confirmOrCancelOrder = (orderId, finalStatus) => async dispatch => {
    dispatch(requestOrder());
    dispatch(savingOrder());
    try {
        const data = await Api.confirmOrCancel(orderId, finalStatus);
        dispatch(receiveOrder(data.orders));
    }
    catch (error) {
        dispatch(errorOrder(error));
        dispatch(orderSaved(false));
    }
}