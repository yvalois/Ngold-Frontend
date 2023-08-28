const initialState = {
    loading: false,
    error: null,
    errorMsg: null,
    pools: [],
    accountPools: [],
    Data: null,
    tokenPrice: null,
    allowance: null
}

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOADING_DATA':
            return {
                ...state,
                loading: true,
                error: null,
                errorMsg: null,
            }
        case 'LOADING_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                pools: action.payload.pools,
                accountPools: action.payload.accountPools,
                Data: action.payload.Data,
                tokenPrice: action.payload.tokenPrice,
                allowance: action.payload.allowance,
        }
        case 'LOADING_DATA_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.errorMsg,
            }
        case 'UPDATE_DATA':
            return {
                ...state,
                pools: action.payload.pools,
                accountPools: action.payload.accountPools,
                Data: action.payload.Data,
                tokenPrice: action.payload.tokenPrice,
                allowance: action.payload.allowance,
            }
        case 'LOG_OUT':
            return {
                ...state,
                pools: null,
                accountPools: null,
                Data: null,
                tokenPrice: null,
                allowance: null
            }
        default:
            return state
        }
}

export default dataReducer;