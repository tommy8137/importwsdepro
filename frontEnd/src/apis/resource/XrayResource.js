import _ from 'lodash';
import CommonUtils from '~~utils/CommonUtils';
import FakeXrayData from '~~apis/fakeData/FakeXrayData';
import ApiService from '../ApiService';


const TIMEOUT = 30 * 60 * 1000;

const debugStatus = {
  putSpecGroup: false,
  deleteSpecGroup: false,
  postAddSpecGroup: false,
  getSpecGroupList: false,
  getSpecItemsList: false,
  getMeSpecItemsList: false,
  postLppAnalysis: false,
  postSpaAnalysis: false,
  postSpaExport: false,
  getProductTypeList: false,
  getType1List: false,
  getType2List: false,
  getSourcerList: false,
  getGroupItem: false,
  getSpecTitleList: false,
  getSpecItemByPartNumber: false
};


const XrayResource = {
  // PUT specGroup
  getSpecTitleList: (params) => {
    if (debugStatus.getSpecTitleList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeSpecTitle);
    }
    const { roleType, productType, type1, type2 } = params;
    return ApiService.get(`/xray/specTitle/${roleType}?productType=${productType}&type1=${type1}&type2=${type2}`);
  },
  // PUT specGroup
  putSpecGroup: (id, data) => {
    if (debugStatus.putSpecGroup) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeSpecIdResponse);
    }
    return ApiService.put(`/xray/specgroup/${id}`, { data });
  },
  // DELETE specGroup
  deleteSpecGroup: (id) => {
    if (debugStatus.deleteSpecGroup) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeDeleteSpecGroup(id));
    }
    return ApiService.delete(`/xray/specgroup/${id}`);
  },
  // POST add specGroup
  postAddSpecGroup: (data) => {
    if (debugStatus.postAddSpecGroup) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeAddSpecGroup(data));
    }
    return ApiService.post('/xray/specgroup', { data });
  },
  // GET spec group list
  getSpecGroupList: (roleType) => {
    if (debugStatus.getSpecGroupList) {
      return CommonUtils.fakeApiHelper(200, 'success', { specGroupList: FakeXrayData.fakeSpecGroupList });
    }
    return ApiService.get(`/xray/specgroups/${roleType}`);
  },
  // GET spec group list
  getGroupItem: (roleType, specGroupID) => {
    if (debugStatus.getGroupItem) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeGroupItem(specGroupID));
    }
    return ApiService.get(`/xray/specgroup/${roleType}?groupID=${specGroupID}`);
  },
  // GET SpecItemsList
  getSpecItemsList: (data) => {
    if (debugStatus.getSpecItemsList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeSpecGroupItemList);
    }
    return ApiService.post('/xray/EE/specs', { data });
  },
  // GET SpecItemsList
  getMeSpecItemsList: (data) => {
    if (debugStatus.getMeSpecItemsList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeMeSpecGroupItemList(data.specN));
    }
    return ApiService.post('/xray/ME/specs', { data });
  },
  // GET Product List
  getProductTypeList: (role) => {
    if (debugStatus.getProductTypeList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeProductTypeList);
    }
    return ApiService.get(`/xray/productType/${role}`);
  },
  // GET Type1 List
  getType1List: (role, productType) => {
    if (debugStatus.getType1List) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeType1List);
    }
    return ApiService.post(`/xray/type1/${role}`,
      { data: { productType } }
    );
  },
  // GET Type2 List
  getType2List: (role, productType, type1) => {
    if (debugStatus.getType2List) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeType2List);
    }
    return ApiService.post(`/xray/type2/${role}`,
      { data: { productType, type1 } }
    );
  },
  // GET Sourcer List
  getSourcerList: (role, productType, type1, type2) => {
    if (debugStatus.getSourcerList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeSourcerList);
    }
    return ApiService.post(`/xray/sourcers/${role}`,
      { data: { productType, type1, type2 }, timeout: 15000 }
    );
  },
  // GET Sourcer List
  getSpecItemByPartNumber: (role, data) => {
    if (debugStatus.getSpecItemByPartNumber) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeGroupItemPartNumber());
    }
    return ApiService.post(`/xray/partNumber/${role}`, { data });
  },
  // POST Xray LPP chart
  postLppAnalysis: (data) => {
    if (debugStatus.postLppAnalysis) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeLppData);
    }
    return ApiService.post('/xray/lpp/analysis', { data, timeout: TIMEOUT });
  },
  // POST Xray Spa analysis
  postSpaAnalysis: (roleType, data) => {
    if (debugStatus.postSpaAnalysis) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeXrayData.fakeSpaData);
    }
    return ApiService.post(`/xray/spa/analysis/${roleType}`, { data, timeout: TIMEOUT });
  },
  // SPA excel export
  postSpaExport: (roleType, data) => {
    if (debugStatus.postSpaExport) {
      return CommonUtils.fakeApiHelper(200, 'success', {});
    }
    return ApiService.post(`/xray/spa/export/${roleType}`, {
      data,
      responseType: 'blob',
      timeout: TIMEOUT
    });
  },
  // 檢查import excel 檔案錯誤訊息
  postReadFileAndCheck: (data, params) => {
    return ApiService.post('/xray/spa/multiple/partnumber/readFileAndCheck', {
      params,
      data,
      timeout: TIMEOUT
    });
  },
  // 下載template excel
  getImportTemplate: () => {
    return ApiService.get('/xray/spa/multiple/template/download', {
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT
    });
  },
  // 下載 Multiple Import 後的檔案
  postMultipleImportDownload: (data, roleType) => {
    // xray/spa/multiple/partnumber/analysis/:module
    // /xray/spa/summary/export
    return ApiService.post('/xray/spa/multiple/partnumber/analysis', {
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      data,
      timeout: TIMEOUT
    });
  },
  // 移除上傳暫存
  delMultipleImportCancel: (params) => {
    return ApiService.delete('/xray/spa/multiple/partnumber/cancel', {
      params
    });
  },
  // 取得廠區下拉選單
  getPurchaseOrgList: () => {
    return ApiService.get('/xray/spa/multiple/partnumber/purchaseOrg');
  },
  // 下載 CMP/BOM template excel
  getBomImportTemplate: () => {
    return ApiService.get('/xray/spa/multiple/bom/template/download', {
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT
    });
  },
  // COM 分析
  postCmpAnalysis: (data) => {
    return ApiService.post('/xray/spa/multiple/partnumber/Cmp/analysis', {
      data,
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT
    });
  },
  // BOM 分析
  postBomAnalysis: (data) => {
    return ApiService.post('/xray/spa/multiple/partnumber/Bom/analysis', {
      data,
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT
    });
  },
};

export default XrayResource;
