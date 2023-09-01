const INITIAL_STATE = {
    bannedAccounts: [],
    loading: false,
    error: null,
    errorMsg: null,
    bannedLoaded: false
}

const bannedReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOADING_BANNED':
            return {
                ...state,
                loading: true,
                error: null,
                errorMsg: null,
            }
        case 'LOADING_BANNED_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                bannedLoaded: true,
                bannedAccounts: action.payload.bannedAccounts,
            }
        case 'LOADING_BANNED_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.errorMsg,
            }
        default:
            return state;
    }
}

export default bannedReducer;
