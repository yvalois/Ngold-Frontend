const INITIAL_STATE = {
    subCategories: [],
    subCategoriesLoaded: false,
    loading: false,
    error: false,
    errorMessage: '',
}

const subCategoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_SUBCATEGORIES_START':
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: '',
            }
        case 'FETCH_SUBCATEGORIES_SUCCESS':
            return {
                ...state,
                subCategories: action.payload,
                subCategoriesLoaded: true,
                loading: false,
                error: false,
                errorMessage: '',
            }
        case 'FETCH_SUBCATEGORIES_FAILURE':
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

export default subCategoryReducer;