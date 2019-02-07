import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START, 
    }
}

export const authSuccess = (token, userId) => {
  return {
      type: actionTypes.AUTH_SUCCESS,
      token: token,
      userId: userId
  }
}

export const authFailed = (error) => {
  return {
      type: actionTypes.AUTH_FAILED, 
      error: error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT
  }
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expTime
  }
}

export const auth = (email, password, method) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    method: method,
  }
}

export const authCheckState = (error) => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}