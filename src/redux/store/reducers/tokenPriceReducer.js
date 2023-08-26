const INITIAL_STATE = {
    tokenPrice: 0,
    loading: false,
    error: false,
    errorMsg: null,
    tokenPrice: 0,
    priceLoaded: false,
}

const tokenPriceReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOADING_TOKEN_PRICE':
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: null,
            }
        case 'LOADING_TOKEN_PRICE_SUCCESS':
            return {
                ...state,
                loading: false,
                error: false,
                errorMsg: null,
                tokenPrice: action.payload.tokenPrice,
                priceLoaded: true,
            }
        case 'LOADING_TOKEN_PRICE_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.errorMsg,
                tokenPrice: 0,
                priceLoaded: false,
            }
        default:
            return state
    }
}
export default tokenPriceReducer;