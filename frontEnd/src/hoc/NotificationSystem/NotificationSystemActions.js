import React, { Component, PureComponent } from 'react';
import uuid from 'uuid';

import Icon from '~~elements/Icon';


export const actionTypes = {
  PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
  POP_NOTIFICATION: 'POP_NOTIFICATION',
};


/*
  message: string // [必填] 要顯示的文字
  autoDismiss: number,  // [option] n秒後消失，0表示永不消失
  level: string // [必填] 有2種 warning | error | success,
*/
export function pushNotification(notification) {
  let notifications;
  // 預設position為tc，表示顯示在頁面中間
  switch (notification.level) {
    case 'success':
      notifications = {
        title: <Icon icon="IcoSuccess" style={{ width: '5.87rem' }} />,
        position: 'tc',
        autoDismiss: 2,
        uid: uuid.v4(),
        ...notification,
      };
      break;
    case 'error':
      notifications = {
        title: <Icon icon="IcoFail" style={{ width: '5.87rem' }} />,
        position: 'tc',
        autoDismiss: 2,
        uid: uuid.v4(),
        ...notification,
      };
      break;
    case 'warning':
      notifications = {
        title: <Icon icon="IcoAlarm" style={{ width: '5.87rem', transform: 'scale(0.7)' }} />,
        position: 'tc',
        autoDismiss: 2,
        uid: uuid.v4(),
        ...notification,
      };
      break;
    default:
      notifications = {
        ...notification,
        level: 'success',
        title: <Icon icon="IcoSuccess" style={{ width: '5.87rem' }} />,
        position: 'tc',
        autoDismiss: 2,
        uid: uuid.v4(),
        ...notification,
      };
      break;
  }
  return {
    type: actionTypes.PUSH_NOTIFICATION,
    notifications,
  };
}

export function popNotification(uid) {
  // console.log('uid POP', uid);
  return {
    type: actionTypes.POP_NOTIFICATION,
    uid,
  };
}

