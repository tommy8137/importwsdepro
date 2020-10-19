import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeCableFpcCleanSheetData from '~~apis/fakeData/FakeCableFpcCleanSheetData';

const debugStatus = {
  // getFpcParameters: true,

  // getCableFpcMaterialUnitPrice: true,
  // putCableFpcMaterialUnitPrice: true,

  // getCableFpcShieldingPrice: true,
  // putCableFpcShieldingPrice: true,
};

const CableFpcCleanSheetResource = {
  getFpcParameters: () => {
    if (debugStatus.getFpcParameters) {
      console.log('::::: API getFpcParameters :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFpcCleanSheetData.fakeGetFpcParameters());
    }
    return ApiService.get('/database/cablefpc/cablefpcParameter');
  },

  getCableFpcMaterialUnitPrice: () => {
    if (debugStatus.getCableFpcMaterialUnitPrice) {
      console.log('::::: API getCableFpcMaterialUnitPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFpcCleanSheetData.fakeGetCableFpcMaterialUnitPrice());
    }
    return ApiService.get('/database/cablefpc/materialUnitPrice');
  },

  putCableFpcMaterialUnitPrice: data => {
    if (debugStatus.putCableFpcMaterialUnitPrice) {
      console.log('::::: API putCableFpcMaterialUnitPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cablefpc/modify/materialUnitPrice', { data });
  },

  getCableFpcShieldingPrice: () => {
    if (debugStatus.getCableFpcShieldingPrice) {
      console.log('::::: API getCableFpcShieldingPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFpcCleanSheetData.fakeGetCableFpcShieldingPrice());
    }
    return ApiService.get('/database/cablefpc/shieldingPrice');
  },

  putCableFpcShieldingPrice: data => {
    if (debugStatus.putCableFpcShieldingPrice) {
      console.log('::::: API putCableFpcShieldingPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cablefpc/modify/shieldingPrice', { data });
  },
};

export default CableFpcCleanSheetResource;
