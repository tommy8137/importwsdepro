import React, { useReducer, createContext } from 'react';
import _fpSet from 'lodash/fp/set';
import _fpOmit from 'lodash/fp/omit';
import PartlistResource from '~~apis/resource/PartlistResource';

export const MyContext = createContext();

const initialState = {
  // originTree: { layout: [] },
  tree: [],
  partItemInfo: {},
  formData: {},
  refs: [],
  tabs: [],
  scrollTop: 0,
  selectTab: '',
  menuAnchor: null,
  errorMessage: {},
  validateWithAllErrorMsg: false,
  submitTimes: 0,
  images: [],
  onSubmit: () => {},
  formVersion: '',
  needCePolicy: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR_MESSAGE': {
      return {
        ...state,
        errorMessage: {
          ...state.errorMessage,
          [action.errorPaths.join('.')]: action.errorContent
        },
      };
    }
    case 'REMOVE_ERROR_MESSAGE': {
      return {
        ...state,
        errorMessage: _fpOmit([action.errorPaths.join('.')])(state.errorMessage)
      };
    }
    case 'SET_ON_SUMBIT_FUNC':
      return { ...state, onSubmit: action.onSubmit };
    // case 'SET_ORIGIN_TREE':
    //   return { ...state, originTree: action.originTree };
    case 'SET_TREE':
      return {
        ...state,
        tree: action.tree
      };
    case 'CLEAR_FORM_DATA':
      return {
        ...state,
        formData: {}
      };
    case 'SET_FORM_DATA_ALL':
      return {
        ...state,
        formData: action.formData
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: _fpSet(action.formDataPaths, action.value)(state.formData)
      };
    case 'SET_SELECT_TAB':
      return {
        ...state,
        selectTab: action.selectTab,
        menuAnchor: null
      };
    case 'SET_SELECT_TABS':
      return {
        ...state,
        tabs: action.tabs,
      };
    // 左邊的menu點下去，右邊的form要移到對應的位置
    case 'SET_MENU_ANCHOR':
      return {
        ...state,
        menuAnchor: action.menuAnchor
      };
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.errorMessage,
        validateWithAllErrorMsg: action.validateWithAllErrorMsg
      };
    case 'SET_SUBMIT_TIMES':
      return {
        ...state,
        submitTimes: action.submitTimes
      };
    case 'SET_IMAGES':
      return {
        ...state,
        images: action.images,
      };

    case 'SET_FORM_VERSION':
      return {
        ...state,
        formVersion: action.formVersion,
      };
    case 'SET_PARTLIST_INFO':
      return {
        ...state,
        partItemInfo: action.partItemInfo,
      };

    case 'SET_CE_POLICY':
      return {
        ...state,
        needCePolicy: action.needCePolicy,
      };
    default:
      return state;
  }
};

const PartlistContextProvider = ({ children }) => {
  const [contextValues, dispatch] = useReducer(reducer, initialState);
  const { formData, onSubmit, tree, errorMessage, images, partItemInfo, validateWithAllErrorMsg } = contextValues;

  const validation = () => {
    // const hasError = traverse(errorMessage).reduce(function r(acc, item) {
    //   if (acc || !this.isLeaf) return acc;
    //   return item !== '';
    // }, false);
    // return hasError ? errorMessage : null;


    // 目前有兩種錯誤訊息：
    // 1: 必填欄位
    // 2: 欄位的值不存在下拉選單
    const hasError = Object.keys(errorMessage || {}).length > 0;
    const hasErrorOfRequired = Object.values(errorMessage || {}).filter(item => item !== '資料庫暫無此規格').length > 0;

    // 只要有error message 就鎖住
    if (validateWithAllErrorMsg) {
      return !hasError;
    }

    // 只要沒有必選欄位就不用鎖
    return !hasErrorOfRequired;
  };

  const handleSubmit = async () => {
    const price = await PartlistResource.getPriceObj(formData, tree);

    const payload = {
      Images: images,
      Price: { ...price.data, partItemInfo },
      formData,
      version: 2
    };
    onSubmit(errorMessage, payload, formData);
  };

  const forceRender = () => {
    dispatch({ type: 'SET_FORM_VERSION', formVersion: Date.now() });
  };

  const clearErrors = () => {
    dispatch({ type: 'SET_ERROR_MESSAGE', SET_ERROR_MESSAGE: {} });
  };

  const contextValueForProvider = [contextValues, dispatch, handleSubmit, validation, clearErrors];
  contextValueForProvider['contextValues'] = contextValues;
  contextValueForProvider['dispatch'] = dispatch;
  contextValueForProvider['handleSubmit'] = handleSubmit;
  contextValueForProvider['validation'] = validation;
  contextValueForProvider['forceRender'] = forceRender;
  contextValueForProvider['clearErrors'] = clearErrors;

  return (
    <MyContext.Provider value={contextValueForProvider} >
      {children}
    </MyContext.Provider>
  );
};

export default PartlistContextProvider;

