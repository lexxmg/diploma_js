
import { unsplashApi } from '../api/api';

const SET_AUTH = 'SET_AUTH',
      SET_AUTH_USER = 'SET_AUTH_USER',
      SET_AUTH_USER_NULL = 'SET_AUTH_USER_NULL';

export const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    auth
  }
}

export const setAuthUser = (user) => {
  return {
    type: SET_AUTH_USER,
    user
  }
}

export const setAuthUserNull = () => {
  return { type: SET_AUTH_USER_NULL }
}

export const login = () => {
  return dispatch => {
    unsplashApi.auth().then(() => {
      dispatch( setAuth(true) );
      return;
    }).then(() => {
      unsplashApi.getAuthUser().then(user => {
        dispatch( setAuthUser(user) );
      });
    });
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch( setAuth(false) );
    dispatch( setAuthUserNull() );
  }
}

export const isAutoriazed = () => {
  return dispatch => {
    if ( localStorage.getItem('token') ) {
      unsplashApi.getAuthUser().then(user => {
        dispatch( setAuthUser(user) );
        dispatch( setAuth(true) );
      });
    }
  }
}

const initialState = {
  isAuth: false,
  authUser: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: action.auth };
    case SET_AUTH_USER:
      return { ...state, authUser: { ...action.user } };
    case SET_AUTH_USER_NULL:
      return { ...state, authUser: null };
    default:
      return state;
  }
}

export default auth;
