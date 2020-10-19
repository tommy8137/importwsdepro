import intl from 'react-intl-universal';

export const actionTypes = {
  INTL_INIT: 'INTL_INIT',
  SWITCH_INTL: 'SWITCH_INTL',
  SWITCH_INTL_SUCCESS: 'SWITCH_INTL_SUCCESS',
};

// locale data
const locales = {
  'en-US': require('../../locales/en-US.json'),
  'zh-CN': require('../../locales/zh-CN.json'),
  'zh-TW': require('../../locales/zh-TW.json'),
};


export function switchIntl(language) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SWITCH_INTL,
      initDone: false,
    });

    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    return intl.init({
      currentLocale: language, // TODO: determine locale here
      locales,
    }).then(() => {
      window.localStorage.setItem('language', language);
      // After loading CLDR locale data, start to render
      dispatch({
        type: actionTypes.SWITCH_INTL_SUCCESS,
        initDone: true,
        language,
      });
    });
  };
}

export function initIntl() {
  return (dispatch) => {
    const currentLocale = localStorage.getItem('language') || 'en-US';
    console.log('[initIntl]currentLocale', currentLocale);
    dispatch(switchIntl(currentLocale));
  };
}

