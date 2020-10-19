import jwt from 'jsonwebtoken';
import config from '~~config';

export function checkAuth() {
  try {
    const token = sessionStorage.getItem('token');
    const type = sessionStorage.getItem('tokentype');
    const decoded = jwt.verify(token.replace(`${type} `, ''), config.secret);
    return !!token && decoded;
  } catch (err) {
    sessionStorage.clear();
    return false;
  }
}

export function getPureToken() {
  let pureToken = '';
  if (checkAuth()) {
    const token = sessionStorage.getItem('token');
    const { tokenType } = config;
    pureToken = token.replace(`${tokenType} `, '');
  }

  return pureToken;
}

export default {};


/**
  JWT 驗證

import jwt from 'jsonwebtoken';
import appcfg from '~~config';

export function checkAuth() {
  const token = sessionStorage.getItem('token') || null;
  const { secretKey, prefix } = appcfg.jwtSetting;
  let isValid = false;
  try {
    jwt.verify(token.replace(prefix, ''), secretKey);
    isValid = true;
  } catch (err) {
    isValid = false;
  }
  return isValid;
}

 */
