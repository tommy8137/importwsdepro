import * as R from 'ramda';

export const USER_MODAL_TYPE = {
  MEEE: 0,
  SCODE: 1
};

export const USER_MODAL_STEP = {
  USER: 0,
  TYPE1: 1,
  PRODUCTTYPE: 2,
};

export const USER_MODAL_MODE = {
  ADD: 'ADD',
  EDIT: 'EDIT'
};

export const USER_MODAL_HEADER_TEXT = {
  [USER_MODAL_STEP.USER]: {
    [USER_MODAL_MODE.ADD]: 'Add New Account',
    [USER_MODAL_MODE.EDIT]: 'Edit Account',
  },
  [USER_MODAL_STEP.TYPE1]: {
    [USER_MODAL_MODE.ADD]: 'Set Permission for Type I in XRay',
    [USER_MODAL_MODE.EDIT]: 'Set Permission for Type I in XRay',
  },
  [USER_MODAL_STEP.PRODUCTTYPE]: {
    [USER_MODAL_MODE.ADD]: 'Set Permission for Product Type in Bom',
    [USER_MODAL_MODE.EDIT]: 'Set Permission for Product Type in Bom',
  }
};

export const USER_MODAL_FILTER_TYPE = {
  ALL: 0,
  ME: 1,
  EE: 2
};

export const USER_MODAL_FILTER_TYPE_TEXT = {
  [USER_MODAL_FILTER_TYPE.ALL]: '',
  [USER_MODAL_FILTER_TYPE.ME]: 'ME',
  [USER_MODAL_FILTER_TYPE.EE]: 'EE'
};

export const CONTACT_WINDOW = 'CONTACT_WINDOW';

export const USER_MODAL_GET_TYPE1_PERMISSION = (rbacList = {}) => {
  return {
    isEE: R.path(['View', 'allow', 'xray.ee'], rbacList),
    isME: R.path(['View', 'allow', 'xray.me'], rbacList)
  };
};

export const USER_MODAL_GET_PRODUCTTYPE_PERMISSION = (rbacList = {}) => {
  return {
    isPTME: R.path(['List', 'allow', 'me_bom_projects'], rbacList),
    isPTEE: R.path(['List', 'allow', 'ee_bom_projects'], rbacList),
  };
};

export const USER_MODAL_TRANSFORM_RBACLIST = (rbacList = {}) => R.map(a => R.map(b => R.mergeAll(b.map(c => ({ [c]: true }))), a), rbacList);

export const USER_MODAL_GET_FILTERTYPE_BY_RBACLIST = (rbacList = {}) => {
  const { isEE, isME } = USER_MODAL_GET_TYPE1_PERMISSION(rbacList);

  if (isME && isEE) {
    return USER_MODAL_FILTER_TYPE.ALL;
  }
  if (isME) {
    return USER_MODAL_FILTER_TYPE.ME;
  }
  if (isEE) {
    return USER_MODAL_FILTER_TYPE.EE;
  }
  return false;
};

export const USER_MODAL_GET_PRODUCTTYPE_BY_RBACLIST = (rbacList = {}) => {
  const { isPTME, isPTEE } = USER_MODAL_GET_PRODUCTTYPE_PERMISSION(rbacList);
  if (isPTME && isPTEE) {
    return USER_MODAL_FILTER_TYPE.ALL;
  }

  if (isPTME) {
    return USER_MODAL_FILTER_TYPE.ME;
  }
  if (isPTEE) {
    return USER_MODAL_FILTER_TYPE.EE;
  }
  return false;
};


export default {};

