const ORDER_INITIAL_STATE = {
    loading: false,
    error: false,
    errorMsg: '',
    orderLoaded: false,
    orders: [],
    users: [],
    savingOrder: false,
    orderSaved: null,
}

const adminOrdersReducer = (state = ORDER_INITIAL_STATE, actions) => {
    switch (actions.type) {
        case 'REQUEST_ADMIN_ORDER':
            return {
                ...state,
                loading: true,
                orderLoaded: false,
            }
        case 'RECEIVE_ADMIN_ORDER':
            return {
                ...state,
                loading: false,
                orderLoaded: true,
                error: false,
                errorMsg: '',
                orders: actions.payload.orders,
                users: actions.payload.users,
            }
        case 'UPDATE_ADMIN_ORDER':
            return {
                ...state,
                loading: false,
                orderLoaded: true,
                error: false,
                orders: actions.payload,
            }
        case 'UPDATE_ADMIN_OUSERS':
            return {
                ...state,
                loading: false,
                orderLoaded: true,
                error: false,
                users: actions.payload,
            }
        case 'ERROR_ADMIN_ORDER':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: actions.payload,
            }
        case 'LOGOUT_ADMIN_ORDER':
            return {
                ...state,
                loading: false,
                orderLoaded: false,
                error: false,
                errorMsg: '',
                orders: [],
            }
        case 'SAVING_ADMIN_ORDER':
            return {
                ...state,
                savingOrder: true,
                orderLoaded: false,
            }   
        case 'ORDER_ADMIN_SAVED':
            return {
                ...state,
                savingOrder: false,
                orderLoaded: true,
                orderSaved: actions.payload,
            }

        default:
            return state
    }
}

export default adminOrdersReducer;