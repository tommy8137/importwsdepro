import { handleActions } from 'redux-actions';
import { actionTypes } from './NotificationSystemActions';

const initialState = {
  notifications: []
};

export default handleActions({
  [actionTypes.PUSH_NOTIFICATION]: (state, payload) => {
    const { notifications } = payload;
    return {
      ...state,
      notifications: [
        ...state.notifications,
        notifications
      ]
    };
  },

  [actionTypes.POP_NOTIFICATION]: (state, payload) => {
    const { uid } = payload;
    return {
      ...state,
      notifications: state.notifications.filter(n => n.uid !== uid)
    };
  },
}, initialState);
