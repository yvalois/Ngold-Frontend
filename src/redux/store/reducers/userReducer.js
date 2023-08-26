const USER_INITIAL_STATE = {
    loading: false,
    error : false,
    errorMsg: '',
    userDetails: [],
    loginSuccess: false,
    infoLoaded: false,
    mailsended: false,
    passChanged: false,
}

const userReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REQUEST_USER_DETAILS':
      return {
        ...state,
        loading: true,
      }
    case 'RECEIVE_USER_DETAILS':
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        userDetails: action.payload.userDetails,
        error: false,
        errorMsg: '',
        infoLoaded: true,
      }
    case 'ERROR_USER_DETAILS':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      }
      case 'NO_ERROR_USER_DETAILS':
        return {
          ...state,
          loading: false,
          error: false,
          errorMsg: "",
        }
    case 'LOG_OUT_USER':
      return {
        ...state,
        loading: false,
        loginSuccess: false,
        userDetails: [],
        error: false,
        errorMsg: '',
        
      }
    case 'REQUEST_SEND_MAIL':
      return {
        ...state,
        loading: true,
      }
    case 'RECEIVE_SEND_MAIL':
      return {
        ...state,
        loading: false,
        mailsended: true,
        error: false,
        errorMsg: '',
      }
    case 'REQUEST_CHANGE_PASSWORD':
      return {
        ...state,
        loading: true,
      }
    case 'RECEIVE_CHANGE_PASSWORD':
      return {
        ...state,
        loading: false,
        passChanged: action.payload.passChanged,
        error: false,
        errorMsg: '',
      }
    default:
      return state


  }
}

export default userReducer;