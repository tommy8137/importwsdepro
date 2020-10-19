import { handleActions } from 'redux-actions';
import { actionTypes } from './AuthActions';

const initialState = {
  isLoggedin: false,
  errorMsg: '',
  userInfo: {}
};

export default handleActions({
  [actionTypes.AUTH___LOGIN]: (state) => {
    return {
      ...state,
    };
  },
  [actionTypes.AUTH___LOGIN_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isLoggedin: true,
    };
  },
  [actionTypes.AUTH___LOGIN_FAILED]: (state, payload) => {
    let errorMsg;
    switch (payload.error) {
      case 'Account or Password is not correct':
      case 'AUTH FAILED':
        errorMsg = '帳號或密碼無效';
        break;
      case 'Error Password Over Three Times':
        errorMsg = '由於安全性問題, 帳號已被鎖定。\n 請五分鐘後再嘗試。';
        break;
      default:
        break;
    }
    return {
      ...state,
      isLoggedin: false,
      errorMsg,
    };
  },
  [actionTypes.AUTH___INITIALIZE_LOGIN_ERROR_MSG]: (state, payload) => {
    return {
      ...state,
      errorMsg: '',
    };
  },
  [actionTypes.LOGOUT]: (state) => {
    return {
      ...state,
      isLoggedin: false
    };
  },
  [actionTypes.AUTH___SET_USER_INFO]: (state, payload) => {
    return {
      ...state,
      userInfo: payload.userInfo
    };
  }
}, initialState);
