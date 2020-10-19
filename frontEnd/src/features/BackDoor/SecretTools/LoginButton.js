
import React, { useState, useEffect } from 'react';
import Button from '~~elements/Button';
import Resource from '~~apis/resource';
import { store, history } from '~~store';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';


function LoginButton(props) {
  // 登入Admin
  const loginAdmin = async (e) => {
    store.dispatch(LoadingActions.toggleLoadingStatus(true));

    const data = {
      username: '10700001',
      password: 'Wieprocure',
    };
    try {
      const { data: { userid, username, access_token: token, token_type: type } } = await Resource.AuthResource.login(data);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('tokentype', type);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('userid', userid);
      store.dispatch(NotificationSystemActions.pushNotification({ message: '成功', level: 'success' }));
      props.onClick(token);
    } catch (error) {
      store.dispatch(NotificationSystemActions.pushNotification({ message: '失敗', level: 'error' }));
    } finally {
      store.dispatch(LoadingActions.toggleLoadingStatus(false));
    }
  };
  return (
    <Button round onClick={loginAdmin}>登入Admin</Button>

  );
}

export default LoginButton;

