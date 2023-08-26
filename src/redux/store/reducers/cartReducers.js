const CART_INITIAL_STATE = {
  products: [],
  loading: false,
  error: false,
  errorMsg: '',
  cartLoaded: false,
}

const cartReducer = (state = CART_INITIAL_STATE, payload) => {
  switch (payload.type) {
    case 'REQUEST_CART':
      return {
        ...state,
        loading: true,
      }
    case 'RECEIVE_CART':
      return {
        ...state,
        loading: false,
        cartLoaded: true,
        error: false,
        errorMsg: '',
        products: payload.payload,
      }
    case 'UPDATE_CART':
      return {
        ...state,
        loading: false,
        cartLoaded: true,
        error: false,
        products: payload.payload,
      }
    case 'ERROR_CART':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload.payload,
      }
    case 'LOGOUT_CART':
      return {
        ...state,
        loading: false,
        cartLoaded: false,
        error: false,
        errorMsg: '',
        products: [],
      }
    default:
      return state
  }
}

export default cartReducer;
