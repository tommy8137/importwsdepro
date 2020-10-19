import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeCableFfcCleanSheetData from '~~apis/fakeData/FakeCableFfcCleanSheetData';

const debugStatus = {
  getCableFfcParameter: false,

  getCableFfcConnectorPrice: false,
  putCableFfcConnectorPrice: false,

  getCableFfcConnector: false,

  getCableFfcMaterialPrice: false,
  putCableFfcMaterialPrice: false,

  getCableFfcConnectorSpecPrice: false,
  putCableFfcConnectorSpecPrice: false,

  getCableFfcAccessoriesPrice: false,
  putCableFfcAccessoriesPrice: false,

  getCableFfcReinforcementBoardPrice: false,
  putCableFfcReinforcementBoardPrice: false,
};

const CableFfcCleanSheetResource = {
  getCableFfcParameter: (params) => {
    if (debugStatus.getCableFfcParameter) {
      console.log('::::: API getCableFfcParameter :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFfcCleanSheetData.fakeGetCableFfcParameter());
    }
    return ApiService.get('/database/cableffc/cableffcParameter', { params });
  },

  getCableFfcConnectorPrice: () => {
    if (debugStatus.getCableFfcConnectorPrice) {
      console.log('::::: API getCableFfcConnectorPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFfcCleanSheetData.fakeGetCableFfcConnectorPrice());
    }
    return ApiService.get('/database/cableffc/connectorPrice');
  },

  putCableFfcConnectorPrice: data => {
    if (debugStatus.putCableFfcConnectorPrice) {
      console.log('::::: API putCableFfcConnectorPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cableffc/modify/connectorPrice', { data });
  },

  getCableFfcConnector: () => {
    if (debugStatus.getCableFfcConnector) {
      console.log('::::: API getCableFfcConnector :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFfcCleanSheetData.fakeGetCableFfcConnector());
    }
    return ApiService.get('/database/cableffc/connector');
  },

  getCableFfcMaterialPrice: (params) => {
    if (debugStatus.getCableFfcMaterialPrice) {
      console.log('::::: API getCableFfcMaterialPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFfcCleanSheetData.fakeGetCableFfcMaterialPrice());
    }
    return ApiService.get('/database/cableffc/dtaio/materialPrice', { params });
  },

  putCableFfcMaterialPrice: (data) => {
    if (debugStatus.putCableFfcMaterialPrice) {
      console.log('::::: API putCableFfcMaterialPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cableffc/dtaio/modify/materialPrice', { data });
  },

  // DT/AIO connector price
  getCableFfcConnectorSpecPrice: (params) => {
    if (debugStatus.getCableFfcConnectorSpecPrice) {
      console.log('::::: API getCableFfcConnectorSpecPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFfcCleanSheetData.fakeGetCableFfcConnectorSpecPrice());
    }
    return ApiService.get('/database/cableffc/dtaio/connectorPrice', { params });
  },

  putCableFfcConnectorSpecPrice: (data) => {
    if (debugStatus.putCableFfcConnectorSpecPrice) {
      console.log('::::: API putCableFfcMaterialPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cableffc/dtaio/modify/connectorPrice', { data });
  },

  // DT/AIO 輔料
  getCableFfcAccessoriesPrice: (params) => {
    if (debugStatus.getCableFfcAccessoriesPrice) {
      console.log('::::: API getCableFfcAccessoriesPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFfcCleanSheetData.fakeGetCableFfcAccessoriesPrice());
    }
    return ApiService.get('/database/cableffc/dtaio/accessoriesPrice', { params });
  },

  putCableFfcAccessoriesPrice: (data) => {
    if (debugStatus.putCableFfcAccessoriesPrice) {
      console.log('::::: API putCableFfcMaterialPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cableffc/dtaio/modify/accessoriesPrice', { data });
  },

  // DT/AIO 補強板
  getCableFfcReinforcementBoardPrice: (params) => {
    if (debugStatus.getCableFfcReinforcementBoardPrice) {
      console.log('::::: API getCableFfcReinforcementBoardPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeCableFfcCleanSheetData.fakeGetCableFfcReinforcementBoardPrice());
    }
    return ApiService.get('/database/cableffc/dtaio/reinforcementBoardPrice', { params });
  },

  putCableFfcReinforcementBoardPrice: (data) => {
    if (debugStatus.putCableFfcReinforcementBoardPrice) {
      console.log('::::: API putCableFfcMaterialPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cableffc/dtaio/modify/reinforcementBoardPrice', { data });
  },

};

export default CableFfcCleanSheetResource;
