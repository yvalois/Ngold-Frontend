const INITIAL_STATE = {
    categories: [],
    categoriesLoaded: false,
    loading: false,
    error: false,
    errorMessage: '',
}

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_START':
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: '',
            }
        case 'FETCH_CATEGORIES_SUCCESS':
            return {
                ...state,
                categories: action.payload,
                categoriesLoaded: true,
                loading: false,
                error: false,
                errorMessage: '',
            }
        case 'FETCH_CATEGORIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }
        default:
            return state
    }
}

export default categoryReducer;