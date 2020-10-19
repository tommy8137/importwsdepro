import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeCableWireCleanSheetData from '~~apis/fakeData/FakeCableWireCleanSheetData';

const debugStatus = {
  // Parameters
  getCableWireParameters: false,

  // Material Price
  getMaterialPrice: false,

  // Connector Price
  getConnectorPrice: false,
  updateConnectorPrice: false,
};


const CableWireCleanSheetResource = {

  /* Parameters --------------------------------------------------------------------------------------------------------------------------------*/
  getCableWireParameters: () => {
    if (debugStatus.getCableWireParameters) {
      console.log('::::: API getCableWireParameters :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.get('/database/cablewire/cableWireParameter');
  },

  /* Material Price -----------------------------------------------------------------------------------------------------------------------------*/
  getMaterialPrice: () => {
    if (debugStatus.getMaterialPrice) {
      console.log('::::: API getMaterialPrice :::::');
      return CommonUtils.fakeApiHelper(
        1000,
        'success',
        FakeCableWireCleanSheetData.fakeGetMaterialPrice(),
      );
    }
    return ApiService.get('/database/cablewire/materialPrice');
  },

  /* Connector Price ----------------------------------------------------------------------------------------------------------------------------*/
  getConnectorPrice: () => {
    if (debugStatus.getConnectorPrice) {
      console.log('::::: API getConnectorPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success',  FakeCableWireCleanSheetData.fakeConnectorPrice());
    }
    return ApiService.get('/database/cablewire/connectorPrice');
  },

  updateConnectorPrice: (data) => {
    if (debugStatus.updateConnectorPrice) {
      console.log('::::: API updateConnectorPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/cablewire/modify/connectorPrice', { data });
  },
};


export default CableWireCleanSheetResource;
