import {Api} from '../../../utils/Api';


const requestStore = () => ({
    type: "REQUEST_STORE",
});

const receiveStore = payload => ({
    type: "RECEIVE_STORE",
    payload: payload,
});

const errorStore = payload => ({
    type: "ERROR_STORE",
    payload: payload,
});

const updateStore =(payload) => ({
    type: "UPDATE_STORE",
    payload: payload,
});

export const fetchStore = () => async dispatch => {
    dispatch(requestStore());
    try {
        const data = await Api.getStore();
        const storeName = data.name;
        const discount = data.discount;
        dispatch(receiveStore({
            storeName,
            discount,
        }));
    }
    catch (error) {
        dispatch(errorStore(error));
    }
}

export const updateStores = (store) => async dispatch => {
    dispatch(requestStore());
    try {
    
        const data = await Api.updateStore(store);
        const storeName = data.name;
        const discount = data.discount;
        dispatch(updateStore({
            storeName,
            discount,
        }));
    }
    catch (error) {
        dispatch(errorStore(error));
    }
}
