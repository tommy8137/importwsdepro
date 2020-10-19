import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import _ from 'lodash';
import TableGridUtils from '~~utils/TableGridUtils';
import { actionTypes } from './BomDetailActions';

const initialState = {
  // HOTFIX: RD 在n.7的版本不能編BOM表和partlist(為了不讓n.7變回n.5)
  canEditWhenNPointSeven: true,
  userInfo: {},
  // part list
  isPartItemOpen: false,
  partItemInfo: {
    bom_id: '',
    type1: '',
    type2: '',
  },
  // bom detail
  bomID: '',
  bomPreviewUrl: '',
  bomData: {
    editAble: false,
    projectName: '',
    emdmVersion: '',
    totalItems: 0,
    skuDesc: '',
    bomItems: [],
    uploadFlag: false,
    partItems: [],
    unEditCount: 0,
    version: null,
    projectSource: null,
  },
  // assign list
  assignData: {
    approvalAble: false,
    completeAble: false,
    assignList: []
  },
  // selected assign item
  assignItem: {
    bomDesigneeID: null,
    isFunctionTeam: false,
    assign: '',
    order: null,
    employeeName: '',
    employeeID: '',
    tabOwner: false,
  },
  // inputBOM table header config
  // InputBomHeaderConfig,
  // ADD item selector
  dropdownData: [],
  //
  partListContent: [],
  // modal
  isPartListEditModalOpen: false,
  // input BOM Add/Edit modal
  modalInfo: {
    action: null,
    isModalOpen: false
  },
  parentlevel: [],
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
  bomDetail: {},
  /* ********** 修改me Input bom 需要帶 bomItemId********** */
  bomItemId: null,
  isEditMode: false,
  // 後端的資料
  originalMEBomTableList: [],
  // 修改中資料的暫存檔
  tmpMEBomTableList: [],
  // 修改的資料，驗證不通過的error紀錄
  itemsValidateErrorObj: null,
  /* ********** 修改me Input bom 需要帶 bomItemId********** */

  // search (input BOM、Partlist)
  searchValue: {
    inputbom: '',
    partlist: '',
  },
  // ME inputBom 上方info的開關
  isInputBomInfoOpen: true,
  // 目前觀看的小版本id
  currentVersion: { value: 'CURRENT', label: '' },
  // 改用這個控制唯讀
  historyMode: false,
  versionsList: [],
  columns: [],
  productTypeList: [],
  selectedSkuNum: 'sku1',
  emdmImgList: [],
};


export default handleActions({
  /* ********** 修改me Input bom 價錢部分  ********** */
  [actionTypes.BOM___SET_IS_EDIT_MODE]: (state, payload) => {
    const { boolean } = payload;
    return {
      ...state,
      isEditMode: boolean
    };
  },
  [actionTypes.BOM___UPDATE_ROW_ITEM_VALIDATE_ERROR]: (state, payload) => {
    const { errorsList, rowId, rowKey } = payload;
    let updatedItemsValidateError = R.assocPath([rowId, 'errors', rowKey], errorsList, state.itemsValidateErrorObj);
    return {
      ...state,
      itemsValidateErrorObj: updatedItemsValidateError
    };
  },
  [actionTypes.BOM___UPDATE_ME_BOM_TABLE_CELL_BY_ID]: (state, payload) => {
    const { id, rowKey, rowValue } = payload;
    const alter = R.map(
      R.when(R.propEq('id', id), R.assoc(rowKey, rowValue)),
    )(state.tmpMEBomTableList);
    return {
      ...state,
      tmpMEBomTableList: alter
    };
  },
  [actionTypes.BOM___CANCEL_EDIT_MEBOM_TABLE]: (state, payload) => {
    // 把錯誤清空
    // 把修改的table還原
    return {
      ...state,
      tmpMEBomTableList: state.originalMEBomTableList,
      itemsValidateErrorObj: TableGridUtils.genItemsValidateErrorObj(state.originalMEBomTableList)
    };
  },
  [actionTypes.BOM___SAVE_MEBOM_TABLE]: (state, payload) => {
    return {
      ...state,
    };
  },
  [actionTypes.BOM___SAVE_MEBOM_TABLE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isEditMode: false
    };
  },
  [actionTypes.BOM___LEAVE_EDIT_MODE]: (state, payload) => {
    return {
      ...state,
      /* *********** 切換身份的時候，要把編輯模式 reset *********** */
      isEditMode: false,
      originalMEBomTableList: [],
      // 修改中資料的暫存檔
      // tmpMEBomTableList: [],
      // 修改的資料，驗證不通過的error紀錄
      itemsValidateErrorObj: null,
      /* *********** 切換身份的時候，要把編輯模式 reset END *********** */
    };
  },
  /* ********** 修改me Input bom 價錢部分 END ********** */
  [actionTypes.BOM___UPDATE_BOM_ITEM_ID]: (state, payload) => {
    return {
      ...state,
      bomItemId: payload.bomItemId
    };
  },
  [actionTypes.BOM___SET_ACTIVETAB]: (state, payload) => {
    return {
      ...state,
      activeTab: payload.activeTab
    };
  },
  // GET: Assign-list
  [actionTypes.BOM___GET_BOM_ASSIGNLIST_SUCCESS]: (state, payload) => {
    const { assignData, assignItem } = payload;
    // 如果發現那個assign-tab有自己，就把他切過去
    return {
      ...state,
      assignData,
      ...assignItem ?
        { assignItem } :
        {
          assignItem: {
            bomDesigneeID: null,
            isFunctionTeam: false,
            assign: '',
            order: null,
            employeeName: '',
            employeeID: '',
            tabOwner: false
          }
        }
    };
  },

  // GET: InputBOM Detail
  [actionTypes.BOM___GET_BOMDETAIL]: (state, payload) => {
    const { bomID } = payload.params;
    return {
      ...state,
      bomID,
    };
  },
  [actionTypes.BOM___GET_BOMITEMLIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      bomData: payload.bomData,
      // 為了修改的功能，要把原始的內容存下來
      originalMEBomTableList: payload.bomData.bomItems,
      tmpMEBomTableList: payload.bomData.bomItems,
      itemsValidateErrorObj: TableGridUtils.genItemsValidateErrorObj(payload.bomData.bomItems),
    };
  },
  // SET assign item
  [actionTypes.BOM___SET_BOM_ASSIGN]: (state, payload) => {
    return {
      ...state,
      assignItem: payload.assignItem ?
        payload.assignItem : {
          isFunctionTeam: false,
          assign: '',
          order: null,
          employeeName: '',
          employeeID: '',
        }
    };
  },
  [actionTypes.BOM___TOGGLE_PART_LIST_EDIT_MODAL]: (state, payload) => {
    return {
      ...state,
      isPartListEditModalOpen: payload.status
    };
  },

  [actionTypes.BOM___TOGGLE_BOM_ITEM_MODAL]: (state, payload) => {
    const { action, status } = payload;
    return {
      ...state,
      modalInfo: {
        action: status ? action : null,
        isModalOpen: status
      },
    };
  },
  //  GET DROPDOWN VALUE
  [actionTypes.BOM___GET_DROPDOWN_VALUE_SUCCESS]: (state, payload) => {
    const { data } = payload.response;
    const dropdownData = R.groupBy(d => d.field_name, data);
    // 把所有下拉選項依照 field_name 分組
    return {
      ...state,
      dropdownData
    };
  },
  [actionTypes.BOM___GET_BOM_PARENTLEVEL_SUCCESS]: (state, payload) => {
    return {
      ...state,
      parentlevel: payload.parentlevel
    };
  },
  [actionTypes.BOM___SET_BOM_MODAL_INFO]: (state, payload) => {
    return {
      ...state,
      modalInfo: { ...state.modalInfo, ...payload.modalInfo }
    };
  },
  // import file
  [actionTypes.BOM___TOGGLE_IMPORT_MODAL]: (state, payload) => {
    return {
      ...state,
      isImportModalOpen: payload.status
    };
  },
  [actionTypes.BOM___UPDATE_STEP]: (state, payload) => {
    return {
      ...state,
      step: state.step + payload.status
    };
  },
  [actionTypes.BOM___RESET_MODAL]: (state, payload) => {
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
  [actionTypes.BOM___UPDATE_IMPORT_FILE]: (state, payload) => {
    return {
      ...state,
      uploadInfo: {
        ...state.uploadInfo,
        uploadFile: payload.file
      }
    };
  },
  [actionTypes.BOM___UPLOAD_FILE_SUCCESS]: (state, payload) => {
    const { res: {
      upload_tmp_id: uploadTempID,
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
  [actionTypes.BOM___GET_MAPPING_INFO_SUCCESS]: (state, payload) => {
    const { res } = payload;
    const options = res.bomDesignee.map(item => {
      return {
        label: item.value,
        value: item.key
      };
    });
    return {
      ...state,
      uploadInfo: {
        ...state.uploadInfo,
        uploadItemOwner: res.uploadItemOwner,
        designeeOptions: options,
      }
    };
  },

  [actionTypes.BOM___TOGGLE_PART_ITEM]: (state, payload) => {
    return {
      ...state,
      isPartItemOpen: payload.status,
    };
  },

  [actionTypes.BOM___UPDATE_PART_ITEM_INFO]: (state, payload) => {
    const { id, type1, type2 } = payload;
    return {
      ...state,
      partItemInfo: {
        bom_id: id,
        type1,
        type2,
      },
    };
  },
  [actionTypes.BOM___GET_PART_ITEM_DETAIL_SUCCESS]: (state, payload) => {
    const { res } = payload;
    return {
      ...state,
      bomDetail: res,
    };
  },
  // HOTFIX: RD 在n.7的版本不能編BOM表和partlist(為了不讓n.7變回n.5)
  [actionTypes.BOM___CHECK_CAN_EDIT_WHEN_N_POINT_SEVEN_SUCCESS]: (state, payload) => {
    const { canEditWhenNPointSeven, userInfo } = payload;
    return {
      ...state,
      canEditWhenNPointSeven,
      userInfo,
    };
  },
  // detail的搜尋
  [actionTypes.BOM___UPDATE_SEARCH_KEYWORD]: (state, payload) => {
    const { searchValue } = payload;
    return {
      ...state,
      searchValue: {
        ...state.searchValue,
        ...searchValue,
      }
    };
  },
  [actionTypes.BOM___RESET_BOM_DETAIL]: (state) => {
    return {
      ...initialState,
    };
  },
  // inputBom info的開關
  [actionTypes.BOM___TOGGLE_INPUTBOM_INFO]: (state, payload) => {
    const { isInputBomInfoOpen } = payload;
    return {
      ...state,
      isInputBomInfoOpen
    };
  },
  // 切換版本
  [actionTypes.BOM___UPDATE_CURRENT_VERSION]: (state, payload) => {
    const { currentVersion, currentVersion: { value } } = payload;
    const historyMode = value !== 'CURRENT';
    return {
      ...state,
      currentVersion,
      historyMode,
    };
  },
  // 取得版本列表
  [actionTypes.BOM___GET_VERSIONS_SUCCESS]: (state, payload) => {
    // const { versionsList, currentVersion, } = payload;
    const { versionsList, } = payload;
    return {
      ...state,
      versionsList,
      // currentVersion,
    };
  },
  // 過濾grid的欄位
  [actionTypes.BOM___FILTER_GRID_COLUMNS]: (state, payload) => {
    const { columns } = payload;
    return {
      ...state,
      columns,
    };
  },
  [actionTypes.BOM___GET_PRODUCTTYPE_LIST_SUCCESS]: (state, payload) => {
    const { data } = payload;
    return {
      ...state,
      productTypeList: data,
    };
  },
  [actionTypes.BOM___SET_SELECTED_SKU_NUM]: (state, payload) => {
    const { selectedSkuNum } = payload;
    return {
      ...state,
      selectedSkuNum,
    };
  },
  [actionTypes.BOM___GET_EMDM_IMAGES]: (state, payload) => {
    const { selectedSkuNum } = payload;
    return {
      ...state,
      selectedSkuNum,
    };
  },
  [actionTypes.BOM___GET_EMDM_IMAGES_SUCCESS]: (state, payload) => {
    const { emdmImgList } = payload;
    return {
      ...state,
      emdmImgList,
    };
  },
  [actionTypes.BOM___RESET_EMDM_IMAGES]: (state, payload) => {
    return {
      ...state,
      emdmImgList: {
        ...initialState.emdmImgList,
      },
    };
  },
}, initialState);
