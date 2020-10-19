import { handleActions } from 'redux-actions';
import { actionTypes } from './LoadingActions';

const initialState = {
  isOnLoading: false
};

export default handleActions({
  [actionTypes.LOADING___TOGGLE_LOADING_STATUS]: (state, payload) => {
    return {
      ...state,
      isOnLoading: payload.isOnLoading
    };
  },
}, initialState);
