import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  let url = "";
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  if (action.method === "register") {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDQTMRAUOsKXG9M8V5Yi8NwcdQDLROW6Lk';
  }
  else if (action.method === "login") {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDQTMRAUOsKXG9M8V5Yi8NwcdQDLROW6Lk';
  }
  try {
    const response = yield axios.post(url, authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId))
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    put(actions.logout());
  } else {
    let time = yield new Date();
    var secT = yield time.getSeconds();
    var minT = yield time.getMinutes();
    var hrsT = yield time.getHours();
    var total_secondsT = yield (hrsT*3600) + (minT*60) + secT;
    let expirationDate = yield new Date(localStorage.getItem("expirationDate"));
    var sec = yield expirationDate.getSeconds();
    var min = yield expirationDate.getMinutes();
    var hrs = yield expirationDate.getHours();
    var total_seconds = (hrs*3600) + (min*60) + sec;
    yield console.log("new date is",new Date().getSeconds())
    yield console.log("experation date is",expirationDate.getSeconds())
    yield console.log(total_seconds - total_secondsT)
    if(total_seconds < total_secondsT){
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout(total_seconds));
    }
  }
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
}