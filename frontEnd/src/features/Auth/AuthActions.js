
export const actionTypes = {
  AUTH___LOGIN: 'AUTH___LOGIN',
  AUTH___LOGIN_SUCCESS: 'AUTH___LOGIN_SUCCESS',
  AUTH___LOGIN_FAILED: 'AUTH___LOGIN_FAILED',
  AUTH___INITIALIZE_LOGIN_ERROR_MSG: 'AUTH___INITIALIZE_LOGIN_ERROR_MSG',
  AUTH___LOGOUT: 'AUTH___LOGOUT',
  AUTH___SET_USER_INFO: 'AUTH___SET_USER_INFOS',
};


export function login(value, fromPath) {
  return {
    type: actionTypes.AUTH___LOGIN,
    value,
    fromPath
  };
}

export function loginSuccess(response, fromPath) {
  console.log('ACTION login success');
  return {
    type: actionTypes.AUTH___LOGIN_SUCCESS,
    response,
    fromPath,
  };
}

export function loginFailed(error) {
  console.log('ACTION login failed');
  return {
    type: actionTypes.AUTH___LOGIN_FAILED,
    error: error.data,
  };
}

export function logout() {
  return {
    type: actionTypes.AUTH___LOGOUT,
  };
}


export function initializeLoginErrorMsg() {
  return {
    type: actionTypes.AUTH___INITIALIZE_LOGIN_ERROR_MSG,
  };
}

export function setUserInfo(userInfo) {
  return {
    type: actionTypes.AUTH___SET_USER_INFO,
    userInfo
  };
}

export default {};
