
import { Api } from '../../../utils/Api';
import { removeToken } from "../../../utils/localstorage";

const requestUser = () => ({
  type: "REQUEST_USER_DETAILS",
});

const receiveUser = payload => ({
  type: "RECEIVE_USER_DETAILS",
  payload
});

const requestSendMail = () => ({
  type: "REQUEST_SEND_MAIL",
});

const receiveSendMail = payload => ({
  type: "RECEIVE_SEND_MAIL",
  payload: payload
});

const errorUser = payload => ({
  type: "ERROR_USER_DETAILS",
  payload: payload,
});

export const noErrorUser = payload => ({
  type: "NO_ERROR_USER_DETAILS",
});

const logOutUser = () => ({
  type: "LOG_OUT_USER",
});

const RequestChangePassword = () => ({
  type: "REQUEST_CHANGE_PASSWORD",
});

const receiveChangePassword = payload => ({
  type: "RECEIVE_CHANGE_PASSWORD",
  payload: payload, 
});


export const getUserDetails = () => async dispatch => {
  dispatch(requestUser());
  try {
    const data = await Api.getUser();
    dispatch(receiveUser({
      userDetails: data
    }));
  }
  catch (error) {
    dispatch(errorUser(error));
  }

}

export const fetchSignIn = ({ email, password }) => async dispatch => {
  try {
    const data = await Api.sigIn({ email, password });

    dispatch(receiveUser({
      userDetails: data.user,
    }));
  }
  catch (error) {
    dispatch(errorUser(error));
  }
}

export const fetchSignUp = (fullName, email, password) => async dispatch => {
  try {
    const data = await Api.sigUp(fullName, email, password);
    dispatch(receiveUser({
      userDetails: data.user,
    }));

  }
  catch (error) {
    dispatch(errorUser(error.response.data.message));

  }
}

export const verifyEmail = (code) => async dispatch => {
  try {
    const data = await Api.verifyEmail(code);
    dispatch(receiveUser({
      userDetails: data.user,
    }));
  }
  catch (error) {
    dispatch(errorUser({
      errorMsg: error.message,

    }));
  }
}

export const requestChangePassword = (email) => async dispatch => {
  dispatch(requestSendMail());
  try {
    const data = await Api.requestChangePassword(email);
    dispatch(receiveSendMail({
      mailsended: true,
    }));
  }
  catch (error) {
    return error;
  }
}

export const changePassword = (code, password, email) => async dispatch => {
  dispatch(RequestChangePassword());
  try {
    const data = await Api.changePassword(code, password, email);
    dispatch(receiveChangePassword({
      passChanged: data.changedPassword
    }));
 
  }
  catch (error) {
    dispatch(errorUser({
      errorMsg: error.message,
    }));
  }
}

export const logOut = () => async dispatch => {
  dispatch(logOutUser());
  removeToken();
}
