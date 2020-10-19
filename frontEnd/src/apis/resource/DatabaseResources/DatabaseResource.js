import CommonUtils from '~~utils/CommonUtils';
import FakeProductType from '~~apis/fakeData/FakeProductType';
import FakeMaterialPrice from '~~apis/fakeData/FakeMaterialPrice';
import FakeDatabaseData from '~~apis/fakeData/FakeDatabaseData';
import ApiService from '~~apis/ApiService';


const debugStatus = {
  // 共用
  getMaterialPricePartCategory: false,
  getNextSchedule: false,
  putNextSchedule: false,
  getProductType: false,

  updateCleanSheetParameters: false,
  updateCleanSheetNextPrice: false,

  // Product Type
  getProductTypeList: false,
  putProductTypeList: false,
  postProductTypeList: true,

  // Site
  getSiteList: false,
  updateSiteList: false,
  createSite: true,

  // Material Price
  getMaterialPriceList: false,
  updateMaterialPrice: false,
  addNewMaterialPriceItem: false,
  archiveMaterialPriceItem: false,
  unArchiveMaterialPriceItem: false,
  exportDiecutMaterialPrice: false,
  // common parameters
  getCommonParameters: false,
  // Import matrial price
  uploadMaterialPrice: false,
  putMaterialPrice: false,
  getPartCategoryList: false,
  getPartCategoryMaterialMapping: false,
  getNutTypeList: false,

};


const DatabaseResource = {
  /* 全Database共用 ----------------------------------------------------------------------------------------------*/
  getNextSchedule: (params) => {
    if (debugStatus.getNextSchedule) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeSchedule());
    }
    return ApiService.get('/database/common/nextDate', { params });
  },

  putNextSchedule: (data) => {
    if (debugStatus.putNextSchedule) {
      console.log('putNextSchedule :', data);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeSchedule());
    }
    return ApiService.post('/database/common/scheduleNew', { data });
  },

  putThermalNextSchedule: (data) => {
    if (debugStatus.putThermalNextSchedule) {
      console.log('putThermalNextSchedule :', data);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeSchedule());
    }
    return ApiService.post('/database/common/scheduleNew', { data });
  },

  getProductType: (params) => {
    if (debugStatus.getProductType) {
      return console.log('API getProductType ::::', params);
    }
    return ApiService.get('/database/common/productType/dropdown', { params });
  },

  // update 每個 clean sheet 的 Parameters
  updateCleanSheetParameters: (data) => {
    if (debugStatus.updateCleanSheetParameters) {
      console.log('API updateCleanSheetParameters :', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS!');
    }
    return ApiService.put('/database/common/modify/commonParameter', { data });
  },

  // update 每個 只有 next price 的 clean sheet
  updateCleanSheetNextPrice: (data) => {
    if (debugStatus.updateCleanSheetNextPrice) {
      console.log('API updateCleanSheetNextPrice >>>', data);
      return CommonUtils.fakeApiHelper(200, 'success', FakeDatabaseData.fakeSiteList());
    }
    return ApiService.put('/database/common/modify/price', { data });
  },

  /* MaterialPrice ----------------------------------------------------------------------------------------------*/
  putMaterialPricePartCategory: (type, data) => {
    if (debugStatus.putMaterialPricePartCategory) {
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.post(`/database/${type}/link/materialPrice`, {
      data
    });
  },

  getMaterialPricePartCategory: (type, material) => {
    if (debugStatus.getMaterialPricePartCategory) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeMaterialPrice.fakeGetPartCategory());
    }
    const params = {
      material,
    };
    return ApiService.get(`/database/${type}/partCategory`, {
      params
    });
  },

  getMaterialPriceList: (partCate) => {
    if (debugStatus.getMaterialPriceList) {
      console.log('API getMaterialPriceList >>>', partCate);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeMaterialPrice.fakeGetMaterialPriceList(partCate));
    }
    return ApiService.get(`/database/${partCate}/materialPrice`);
  },

  getMaterialPriceDieCutDropDown: () => {
    return ApiService.get('database/diecut/partCategory');
  },

  // 新增
  addNewMaterialPriceItem: (info) => {
    if (debugStatus.addNewMaterialPriceItem) {
      console.log('API addNewMaterialPriceItem >>>', info);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!');
    }
    return ApiService.post(`/database/${info.partCate}/${info.tableName}`, { data: info.data });
  },

  // 封存
  archiveMaterialPriceItem: (info) => {
    if (debugStatus.archiveMaterialPriceItem) {
      console.log('API archiveMaterialPriceItem >>>', info);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!');
    }
    return ApiService.post(`/database/${info.partCate}/archive/${info.tableName}`, { data: info.data });
  },

  // 封存
  unArchiveMaterialPriceItem: (info) => {
    if (debugStatus.unArchiveMaterialPriceItem) {
      console.log('API unArchiveMaterialPriceItem >>>', info);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!');
    }
    return ApiService.post(`/database/${info.partCate}/unblock/${info.tableName}`, { data: info.data });
  },


  // Metal專用
  updateMaterialPrice: (partCate, data) => {
    if (debugStatus.updateMaterialPrice) {
      console.log('API updateMaterialPrice >>>', partCate, data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!');
    }
    return ApiService.put(`/database/${partCate}/modify/materialPrice`, { data });
  },

  putMaterialSpec: (partCate, data) => {
    if (debugStatus.updateMaterialPrice) {
      console.log('API updateMaterialPrice >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!');
    }
    console.log('data >>>>>', data);
    return ApiService.put(`/database/${partCate}/modify/MaterialSpec`, { data });
  },

  /* Product Type ----------------------------------------------------------------------------------------------*/
  getProductTypeList: () => {
    if (debugStatus.getProductTypeList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeProductType.fakeGetProductTypeList());
    }
    return ApiService.get('/database/common/productType');
  },

  putProductTypeList: (data) => {
    if (debugStatus.putProductTypeList) {
      console.log('API putProductTypeList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'Success!');
    }
    return ApiService.put('/database/common/modify/productType', { data });
  },

  postProductTypeList: (data) => {
    if (debugStatus.postProductTypeList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeProductType.fakePostProductTypeList(data));
    }
    return ApiService.get('');
  },

  /* Site -----------------------------------------------------------------------------------------------------*/
  getSiteList: () => {
    if (debugStatus.getSiteList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeDatabaseData.fakeSiteList());
    }
    return ApiService.get('/database/common/site');
  },

  updateSiteList: (data) => {
    if (debugStatus.updateSiteList) {
      console.log('API updateSiteList >>>', data);
      return CommonUtils.fakeApiHelper(200, 'success', 'SUCCESS!');
    }
    return ApiService.put('/database/common/modify/site', { data });
  },

  createSite: (data) => {
    if (debugStatus.createSite) {
      console.log('API createSite >>>', data);
      return CommonUtils.fakeApiHelper(200, 'success', 'SUCCESS!');
    }
    return ApiService.get();
  },

  /* Common Parameters -----------------------------------------------------------------------------------------------------*/
  getCommonParameters: () => {
    if (debugStatus.getCommonParameters) {
      console.log('API getCommonParameters >>>');
      return CommonUtils.fakeApiHelper(200, 'success', FakeDatabaseData.fakeParameters());
    }
    return ApiService.get('/database/common/commonParameter');
  },

  exportDiecutMaterialPrice: () => {
    return ApiService.get('/database/diecut/export', {
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: 5 * 60 * 1000
    });
  },

  /**
   * 上傳die cut material price檔案
   */
  uploadMaterialPrice: (data, bomID = '', currency = '') => {
    if (debugStatus.uploadMaterialPrice) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeDatabaseData.fakeUploadFileResult);
    }
    return ApiService.post(
      '/database/diecut/check/materialprice',
      {
        data,
      }
    );
  },

  /**
   * 更新指定的excel
   */
  putMaterialPrice: (uploadId) => {
    if (debugStatus.putMaterialPrice) {
      console.log('uploadId', uploadId);
    }
    return ApiService.post(
      '/database/diecut/upload/materialprice',
      {
        data: { uploadId },
        timeout: 0
      }
    );
  },
  getPartCategoryList: () => {
    if (debugStatus.getPartCategoryList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakePartCategoryList());
    }
    return ApiService.get('/database/turning/partCategory');
  },
  getPartCategoryMaterialMapping: () => {
    if (debugStatus.getPartCategoryMaterialMapping) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakePartCategoryMaterialMapping());
    }
    return ApiService.get('/database/turning/material/partCategory');
  },
  getNutTypeList: () => {
    if (debugStatus.getNutTypeList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeNutTypeList());
    }
    return ApiService.get('/database/turning/nutType');
  },
  putNutType: (data) => {
    if (debugStatus.putNutType) {
      return CommonUtils.fakeApiHelper(1000, 'success');
    }
    return ApiService.post('/database/turning/nutType', { data });
  },
};

export default DatabaseResource;
