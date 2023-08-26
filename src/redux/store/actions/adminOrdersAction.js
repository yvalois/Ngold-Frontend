import {Api} from '../../../utils/Api';

const requesAdminOrders = () => ({
    type: "REQUEST_ADMIN_ORDER",
});

const receiveAdminOrders = payload => ({
    type: "RECEIVE_ADMIN_ORDER",
    payload: payload,
});

const errorAdminOrders = payload => ({
    type: "ERROR_ADMIN_ORDER",
    payload: payload,
});

const updateAdminOrders = payload => ({
    type: "UPDATE_ADMIN_ORDER",
    payload: payload,
});

const updateAdminUsers = payload => ({
    type: "UPDATE_ADMIN_OUSERS",
    payload: payload,
});

export const fetchAdminOrders = () => async dispatch => {
    dispatch(requesAdminOrders());
    try {
        const data = await Api.getAdminOrders();
        const data2 = await Api.getUsers();
       
        dispatch(receiveAdminOrders({
            orders:data
            ,users:data2
        }));
    }
    catch (error) {
        dispatch(errorAdminOrders(error));
    }
}



export const confirmOrCancelOrder = (orderId, finalStatus) => async dispatch => {
    dispatch(requesAdminOrders());
    try {
        const data = await Api.confirmOrCancel(orderId, finalStatus);
        const data2 = await Api.getUsers();

        dispatch(receiveAdminOrders({
            orders:data,
            users:data2
        }));
    }
    catch (error) {
        dispatch(errorAdminOrders(error));
    }
}

export const modifyUserRole = (userId, newRole) => async dispatch => {
    dispatch(requesAdminOrders());
    try {
      
        const data = await Api.modifyUserRole(userId, newRole);
        dispatch(updateAdminUsers(data));
    }
    catch (error) {
        dispatch(errorAdminOrders(error));
    }
}

