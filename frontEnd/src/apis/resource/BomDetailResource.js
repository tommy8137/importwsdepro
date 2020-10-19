import CommonUtils from '~~utils/CommonUtils';
import FakeBomDetail from '~~apis/fakeData/FakeBomDetail';
import AppConfig from '~~config';
import ApiService from '../ApiService';


const debugStatus = {
  // getBomDetail
  getBomDetail: false,
  getAssignList: false,
  getBomVersionList: false,
  getDropdownvalue: false,
  getParentlevel: false,
  getPartCategoryByReferencePartNumber: false,
  // import file
  uploadFile: false,
  deleteTemp: false,
  getMappingInfo: false,
  confirmBomItem: false,
  uploadSourcerCost: false,
  putSourcerCost: false,
  getCopyList: false,
  informSourcer: false,
  informCE: false,
};


const BomDetailResource = {
  // 根據BomId重新計算所有的last price
  updateMEBomLastPrice: (bomID) => {
    return ApiService.put(`/bom/${bomID}/lastprice/`);
  },
  updateMEBomTableItems: (data, bomID, { sourcerCanEditCost }) => {
    if (sourcerCanEditCost) {
      return ApiService.put(`/bom/sourcerCost/cost/${bomID}`, {
        data,
      });
    }
    return ApiService.put(`/bom/${bomID}/bomItems/cost/`, {
      data,
    });
  },

  // 取得inputBOM頁面資訊
  getBomDetail: (info, data = null) => {
    if (debugStatus.getBomDetail) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeInputBom);
    }
    const { bomID, assign, } = info;
    return ApiService.post(
      `/bom/${bomID}/bomItems/${assign}`,
      { data }
    );
  },
  // 取得inputBOM 上方 assign列表
  getBomAssignList: (params) => {
    if (debugStatus.getAssignList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeBomAssignList);
    }
    const { bomID } = params;
    return ApiService.get(
      `/bom/${bomID}/bomAssignList`,
    );
  },

  // 取得版本下拉
  getBomVersionList: (bomID) => {
    if (debugStatus.getBomDetail) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeBomVersions);
    }
    return ApiService.get(`bom/completeversion/${bomID}`);
  },
  // part list
  // getPartListContent: () => {
  //   return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakePartListContent());
  // },
  // Input Bom
  uploadImage: (data, onUploadProgress) => {
    return ApiService.post('/bom/upload', {
      data,
      onUploadProgress
    });
  },
  getDropdownvalue: (productType = 'NB') => {
    if (debugStatus.getDropdownvalue) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeDropdownvalue);
    }
    return ApiService.get(`/bom/dropdownvalue/${productType}`);
  },
  getParentlevel: (params) => {
    if (debugStatus.getParentlevel) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeParentlevel);
    }
    const { level, bomID, bomItemId, versionid = '' } = params;
    return ApiService.get('/bom/parentlevel', {
      params: {
        level,
        bom_id: bomID,
        item_id: bomItemId,
        version_id: versionid,
      }
    });
  },

  getPartCategoryByReferencePartNumber: (partNumber) => {
    if (debugStatus.getPartCategoryByReferencePartNumber) {
      return console.log('API getPartCategoryByReferencePartNumber >>>', partNumber);
    }
    return ApiService.get(`/bom/getPartCategoryByReferencePartNumber/${partNumber}`);
  },

  // 取得單一筆bom item資料
  getBomItem: (bomID, bomDesigneeID, bomItemId, data) => {
    // console.log('取得單一筆bom item資料');
    if (!bomDesigneeID) {
      bomDesigneeID = 'all';
    }
    return ApiService.post(
      `/bom/${bomID}/bomItems/${bomDesigneeID}/${bomItemId}`,
      { data },
    );
  },
  // create bom item
  createBomItem: (data) => {
    // console.log('API CREATE');
    return ApiService.post('/bom/item', { data });
  },
  putBomItem: (data, bomItemId) => {
    // console.log('API UPDATE');
    return ApiService.put(`/bom/item/${bomItemId}`, { data });
  },

  // approve
  approveBom: (data) => {
    // console.log('API approveBom');
    return ApiService.post('/bom/approve', { data });
  },
  getCopyList: (bomId) => {
    if (debugStatus.getCopyList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeCopyList);
    }
    return ApiService.get(`/bom/copylist/${bomId}`);
  },
  getCopyProjectList: () => {
    if (debugStatus.getCopyListByProject) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeCopyList);
    }
    return ApiService.get('/bom/copylist/byproject');
  },

  // version complete
  completeBomVersion: (data) => {
    console.log('API completeBomVersion');
    return ApiService.post('/bom/complete', { data });
  },

  uploadFile: (data, bomID) => {
    if (debugStatus.uploadFile) {
      console.log('file', data);
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeUploadFileResult);
    }
    return ApiService.post(
      `/bom/uploadTempBomItem/${bomID}`,
      {
        data,
        timeout: 0
      }
    );
  },

  deleteTemp: (uploadTempID) => {
    if (debugStatus.deleteTemp) {
      console.log('tempID', uploadTempID);
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeRes);
    }
    return ApiService.delete(
      `/bom/uploadTempBomItem/${uploadTempID}`,
    );
  },

  getMappingInfo: (bomID, uploadTempID) => {
    if (debugStatus.getMappingInfo) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeMappingInfo);
    }
    return ApiService.get(
      `/bom/uploadBomItem/${bomID}/${uploadTempID}`,
    );
  },


  confirmBomItem: (bomID, uploadTempID, transferOwner) => {
    if (debugStatus.confirmBomItem) {
      console.log('data >>>', { bomID, transferOwner });
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeRes);
    }
    return ApiService.post(
      `/bom/confirmUploadBomItem/${uploadTempID}`,
      {
        data: { bomID, transferOwner },
        timeout: 5 * 60 * 1000
      },
    );
  },
  exportMEBomExcel: (bomID, currency, sku, data) => {
    return ApiService.post(`/bom/${bomID}/export/${sku}`, {
      data,
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: 5 * 60 * 1000
    });
  },

  exportMEBomCleansheetExcel: (bomId, versionId, partlistFormat) => {
    return ApiService.get(`/costgen/export/cleansheet?bomId=${bomId}&versionId=${versionId}&partlistFormat=${partlistFormat}`, {
      data: {},
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: 5 * 60 * 1000
    });
  },

  exportQuotationCleansheetExcel: (bomId, versionId, partlistFormat) => {
    return ApiService.get(`/costgen/export/quotation?bomId=${bomId}&versionId=${versionId}&partlistFormat=${partlistFormat}`, {
      data: {},
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: 5 * 60 * 1000
    });
  },

  downloadBomTemplate: () => {
    return ApiService.get('/bom/template/download',
      {
        responseType: 'blob',
      });
  },

  getMeBomValidRule: () => {
    return ApiService.get('/bom/bomItems/validRule');
  },

  getNoDependencyRule: () => {
    return ApiService.get('/bom/bomItems/noDependencyRule');
  },

  /**
   * 上傳sourcer cost檔案
   */
  uploadSourcerCost: (data, bomID = '', currency = '') => {
    if (debugStatus.uploadSourcerCost) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomDetail.fakeUploadFileResult);
    }
    return ApiService.post(
      `/bom/sourcerCost/excel/${bomID}`,
      {
        data,
      }
    );
  },

  /**
   * 更新指定的excel
   */
  putSourcerCost: (id) => {
    if (debugStatus.putSourcerCost) {
      console.log('id', id);
    }
    return ApiService.put(
      '/bom/sourcerCost/excel',
      {
        data: { id },
        timeout: 0
      }
    );
  },
  removeEmdmBom: (bomIds = []) => {
    return ApiService.delete(
      `${AppConfig.dbsyncIp}emdm/removeEMDMBOM`,
      {
        data: { bomIds },
      }
    );
  },
  syncEmdmBom: (ids = []) => {
    return ApiService.post(
      `${AppConfig.dbsyncIp}emdm/syncEMDMBOM`,
      {
        data: { ids },
      }
    );
  },
  informSourcer: (bomId) => {
    if (debugStatus.informSourcer) {
      return CommonUtils.fakeApiHelper(200, 'success', true);
    }
    return ApiService.post('/bom/mailToSourcer', {
      data: {
        bom_id: +bomId
      }
    });
  },
  informCE: (bomId) => {
    if (debugStatus.informCE) {
      return CommonUtils.fakeApiHelper(200, 'success', true);
    }
    return ApiService.post('/bom/mailToCE', {
      data: {
        bom_id: +bomId
      }
    });
  },
  getBomItemHistory: (bomId, sourceItemId) => {
    return ApiService.get(`/bom/${bomId}/itemHistory`, {
      params: {
        sourceItemID: sourceItemId
      }
    });
  },
};

export default BomDetailResource;
