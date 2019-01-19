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

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    console.log(authData);
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDQTMRAUOsKXG9M8V5Yi8NwcdQDLROW6Lk', authData)
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