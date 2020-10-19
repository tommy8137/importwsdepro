import { handleActions } from 'redux-actions';
import _find from 'lodash/find';
import { PARTCATE_OPTIONS, INITIAL_SELECTED_PARTCATE } from '~~features/Database/DatabaseConstant';
import { actionTypes } from './DatabaseActions';


// Common的預設值 router頁的
const initialCommon = {
  schedule: '',
  formulaType: '',
  productTypeList: [],
  activeProductType: null,
};

// Common Parameters 的預設值
const initialParameters = {
  parameterList: [],
  schedule: '', // 下次生效日
  date: { // 三種日期
    last: '',
    current: '',
    next: '',
  },
};

// productType的預設值
const initialProductType = {
  productTypeList: [],
  addModalOpen: false
};

// Site的預設值
const initialSite = {
  siteList: []
};

// Material Price預設值
const initialMaterialPrice = {
  partCateOptions: PARTCATE_OPTIONS,
  selectedPartCate: INITIAL_SELECTED_PARTCATE,
  materialPriceDate: {},
  materialPriceList: [],
  leftTableActiveRowId: '',
  isLinkModalOpen: false,
  partCategory: [],
  linkItem: {
    materialSpecId: '',
    materialSpecName: '',
    materialId: '',
    materialName: '',
  },
  isEditMode: false,
  turning: {
    nutTypeList: [],
    partCate2List: [],
    materialMappingList: [],
  },
  diecut: {
    dieCutType2DropDwon: [],
  },
};

const initialState = {
  common: initialCommon,
  parameters: initialParameters,
  productType: initialProductType,
  site: initialSite,
  materialPrice: initialMaterialPrice,
  // import excel file
  isImportModalOpen: false,
  uploadFile: null,
  uploadResult: {},
  activeTab: 0,
  step: 1,
  uploadInfo: {
    uploadFile: null,
    uploadTempID: null,
    passCount: null,
    failCount: null,
    uploadItemOwner: [],
    designeeOptions: [],
    failRows: [],
  },
};

export default handleActions({
  /* MaterialPrice --------------------------------------------------------------------------------*/
  [actionTypes.DATABASE___SET_MATERIAL_PRICE_IS_EDITMODE]: (state, payload) => {
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        isEditMode: payload.isEditMode
      }
    };
  },
  [actionTypes.DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY_SUCCESS]: (state, payload) => {
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        isLinkModalOpen: false
      }
    };
  },
  [actionTypes.DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY]: (state, payload) => {
    const { linkItem } = payload;
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        linkItem
      }
    };
  },
  [actionTypes.DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY_SUCCESS]: (state, payload) => {
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        partCategory: payload.partCategory,
        isLinkModalOpen: true
      }
    };
  },
  [actionTypes.DATABASE___SET_MATERIAL_PRICE_LINK_MODAL]: (state, payload) => {
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        isLinkModalOpen: payload.isLinkModalOpen
      }
    };
  },
  [actionTypes.DATABASE___SET_MATERIAL_PRICE_SELECTED_PART_CATE]: (state, payload) => {
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        selectedPartCate: payload.selectedPartCate
      }
    };
  },

  [actionTypes.DATABASE___GET_MATERIAL_PRICE_LIST]: (state, payload) => {
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        // materialPriceList: initialMaterialPrice.materialPriceList,
      }
    };
  },
  [actionTypes.DATABASE___GET_MATERIAL_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { materialPriceDate, materialPriceList } = payload;

    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        materialPriceDate,
        materialPriceList,
      }
    };
  },
  [actionTypes.DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN_SUCCESS]: (state, payload) => {
    const { data } = payload;
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        turning: data
      }
    };
  },
  /* Common --------------------------------------------------------------------------------*/
  [actionTypes.DATABASE___GET_NEXT_SCHEDULE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      common: {
        ...state.common,
        ...payload,
      }
    };
  },

  [actionTypes.DATABASE___GET_PRODUCT_TYPE_SUCCESS]: (state, payload) => {
    const productTypeList = payload.productTypeList.map(item => ({ label: item.type_name, value: item.id }));
    const { activeProductType } = state.common;
    return {
      ...state,
      common: {
        ...state.common,
        productTypeList,
        activeProductType: activeProductType || productTypeList[0],
      }
    };
  },

  [actionTypes.DATABASE___SET_PRODUCT_TYPE]: (state, payload) => {
    const { activeProductType } = payload;
    return {
      ...state,
      common: {
        ...state.common,
        activeProductType,
      }
    };
  },
  /* Common Parameters ---------------------------------------------------------------------------------*/
  [actionTypes.DATABASE___GET_COMMON_PARAMETERS_SUCCESS]: (state, payload) => {
    const { data: parameters } = payload;
    return {
      ...state,
      parameters,
    };
  },

  /* Product Type ---------------------------------------------------------------------------------*/
  [actionTypes.DATABASE___GET_PRODUCT_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      productType: {
        ...state.productType,
        productTypeList: payload.productTypeList
      }
    };
  },
  [actionTypes.DATABASE___PUT_PRODUCT_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state
    };
  },
  [actionTypes.DATABASE___PUT_PRODUCT_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state
    };
  },
  [actionTypes.DATABASE___SET_PRODUCT_TYPE_LIST_ADD_MODAL_OPEN]: (state, payload) => {
    return {
      ...state,
      productType: {
        ...state.productType,
        addModalOpen: payload.addModalOpen
      }
    };
  },

  /* Site -----------------------------------------------------------------------------------------*/
  [actionTypes.DATABASE___GET_SITE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      site: {
        ...state.site,
        siteList: payload.siteList
      }
    };
  },

  /* Import -----------------------------------------------------------------------------------------*/
  [actionTypes.DATABASE___TOGGLE_IMPORT_MODAL]: (state, payload) => {
    return {
      ...state,
      isImportModalOpen: payload.status
    };
  },

  [actionTypes.DATABASE___UPDATE_STEP]: (state, payload) => {
    return {
      ...state,
      step: state.step + payload.status
    };
  },

  [actionTypes.DATABASE___RESET_MODAL]: (state, payload) => {
    return {
      ...state,
      step: 1,
      uploadInfo: {
        uploadFile: null,
        uploadTempID: null,
        passCount: null,
        failCount: null,
        uploadItemOwner: [],
        designeeOptions: [],
      },
    };
  },

  [actionTypes.DATABASE___UPDATE_IMPORT_FILE]: (state, payload) => {
    return {
      ...state,
      uploadInfo: {
        ...state.uploadInfo,
        uploadFile: payload.file
      }
    };
  },

  [actionTypes.DATABASE___UPLOAD_FILE_SUCCESS]: (state, payload) => {
    const { res: {
      uploadId: uploadTempID,
      passCount,
      failCount,
      failMessage: failRows,
    } } = payload;
    return {
      ...state,
      uploadInfo: {
        ...state.uploadInfo,
        uploadTempID,
        passCount,
        failCount,
        failRows,
      }
    };
  },
  //  GET DROPDOWN VALUE
  [actionTypes.DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN_SUCCESS]: (state, payload) => {
    return {
      ...state,
      materialPrice: {
        ...state.materialPrice,
        diecut: {
          dieCutType2DropDwon: payload.dieCutType2DropDwon,
        },
      },
    };
  },
}, initialState);
