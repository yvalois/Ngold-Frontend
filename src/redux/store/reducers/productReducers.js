const PRODUCTS_INITAL_STATE = {
  products: [],
  loading: false,
  error: false,
  errorMsg: '',
  initialLoad: true,
}

const productsReducer = (state = PRODUCTS_INITAL_STATE, payload) => {
  switch (payload.type) {
    case 'REQUEST_PRODUCTS':
      return {
        ...state,
        loading: true,
      }
    case 'RECEIVE_PRODUCTS':
      return {
        ...state,
        loading: false,
        products: payload.payload.products,
        initialLoad: false,
      }
    case 'ERROR_PRODUCTS':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload.payload,
      }
    default:
      return state
  }
}

export default productsReducer;