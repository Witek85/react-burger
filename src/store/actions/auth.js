import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START, 
    }
}

export const authSuccess = (authData) => {
  return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData 
  }
}

export const authFailed = (error) => {
  return {
      type: actionTypes.AUTH_FAILED, 
      error: error
  }
}

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(authStart());
    let url = "";
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    if (method === "register") {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDQTMRAUOsKXG9M8V5Yi8NwcdQDLROW6Lk';
    }
    else if (method === "login") {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDQTMRAUOsKXG9M8V5Yi8NwcdQDLROW6Lk';
    }
    console.log(authData);
    console.log(method);
    console.log(url);
    axios.post(url, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data))
    })
    .catch(error => {
      console.log('error', error);
      dispatch(authFailed(error))
    })
  }
}

// 