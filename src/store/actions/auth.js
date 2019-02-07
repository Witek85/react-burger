import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());

    // ----

    // } else {
    //   const expirationDate = localStorage.getItem('expirationDate');
    //   if (expirationDate <= new Date()) {
    //     dispatch(logout());
    //   } else {
    //     const userId = localStorage.getItem('userId');
    //     dispatch(authSuccess(token, userId));
    //     dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) * 1000 ));
    //   }
    // }

    // ----

    } else {
      let time = new Date();
      var secT = time.getSeconds();
      var minT = time.getMinutes();
      var hrsT = time.getHours();
      var total_secondsT = (hrsT*3600) + (minT*60) + secT;
      let expirationDate = new Date(localStorage.getItem("expirationDate"));
      var sec = expirationDate.getSeconds();
      var min = expirationDate.getMinutes();
      var hrs = expirationDate.getHours();
      var total_seconds = (hrs*3600) + (min*60) + sec;
      console.log("new date is",new Date().getSeconds())
      console.log("experation date is",expirationDate.getSeconds())
      console.log(total_seconds - total_secondsT)
      if(total_seconds < total_secondsT){
          dispatch(logout());
      } else {
          const userId = localStorage.getItem("userId");
          dispatch(authSuccess(token, userId));
          dispatch(checkAuthTimeout(total_seconds));
      }
    }

    // ----
  }
}