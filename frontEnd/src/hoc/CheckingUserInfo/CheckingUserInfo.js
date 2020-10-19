import React, { useState, useEffect } from 'react';
import Resource from '~~apis/resource';
import { store } from '~~store';
import * as AuthActions from '~~features/Auth/AuthActions';

function CheckingUserInfo() {
  return (Conponent) => {
    const WrappedComponent = (props) => {
      // const { role_group: roleGroup, role_name: roleName, } = userInfo;

      useEffect(() => {
        getUserInfo();
      }, []);

      async function getUserInfo() {
        const userID = sessionStorage.getItem('userid');
        if (userID) {
          try {
            const res = await Resource.AllAccountResource.getUserInfoNop(userID);
            const newUserInfo = res?.data?.userInfo || {};
            store.dispatch(AuthActions.setUserInfo(newUserInfo));
          } catch (e) {
            console.log('e >>>', e);
          }
        }
      }
      return <Conponent {...props} />;
    };

    return WrappedComponent;
  };
}

export default CheckingUserInfo;
