import { handleActions } from 'redux-actions';
import { actionTypes } from './intlUniversalActions';

const initialState = {
  initDone: false,
  language: null,
};

export default handleActions({
  [actionTypes.SWITCH_INTL]: (state, payload) => {
    const { initDone } = payload;
    return {
      ...state,
      initDone
    };
  },
  [actionTypes.SWITCH_INTL_SUCCESS]: (state, payload) => {
    const { initDone, language } = payload;
    return {
      ...state,
      initDone,
      language
    };
  },
}, initialState);
