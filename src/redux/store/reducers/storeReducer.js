const INITIAL_STATE = {
    loading: false,
    error: false,
    errorMsg: '',
    storeName: '',
    discount : 0,
    StoreLoaded: false,
}

const storeReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case 'REQUEST_STORE':
            return {
                ...state,
                loading: true,
            }
        case 'RECEIVE_STORE':
            return {
                ...state,
                loading: false,
                storeName: actions.payload.storeName,
                discount: actions.payload.discount,
                StoreLoaded: true,
            }
        case 'UPDATE_STORE':
            return {
                ...state,
                loading: false,
                storeName: actions.payload.storeName,
                discount: actions.payload.discount,
                StoreLoaded: true,
            }
        case 'ERROR_STORE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload,
            }

        default:
            return state;
    }
}

export default storeReducer;