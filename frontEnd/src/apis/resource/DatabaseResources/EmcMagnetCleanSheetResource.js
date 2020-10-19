import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeEmcMagnetCleanSheetData from '~~apis/fakeData/FakeEmcMagnetCleanSheetData';

const debugStatus = {
  // Parameters
  getEmcMagnetParameters: false,

  // Material Price
  getMaterialPrice: false,

  // Cutting Material Loss Rate
  getCuttingMaterialLossRate: false,
  updateCuttingMaterialLossRate: false,

  // Magnetizing And Labor Price
  getMagnetizingAndLaborPrice: false,

};


const EmcMagnetCleanSheetResource = {

/* Parameters ------------------------------------------------------------------------------------------------------------------------------*/
  getEmcMagnetParameters: () => {
    if (debugStatus.getEmcMagnetParameters) {
      console.log('::::: API getEmcMagnetParameters :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeEmcMagnetCleanSheetData.fakeEmcMagnetParameters());
    }
    return ApiService.get('/database/emcmagnet/emcMagnetParameter');
  },

  /* Material Price ------------------------------------------------------------------------------------------------------------------------------*/
  getMaterialPrice: () => {
    if (debugStatus.getMaterialPrice) {
      console.log('::::: API getMaterialPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeEmcMagnetCleanSheetData.fakeMaterialPrice());
    }
    return ApiService.get('/database/emcmagnet/materialPrice');
  },

  /* Cutting Material Loss Rate ------------------------------------------------------------------------------------------------------------------------------*/
  getCuttingMaterialLossRate: () => {
    if (debugStatus.getCuttingMaterialLossRate) {
      console.log('::::: API getCuttingMaterialLossRate :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeEmcMagnetCleanSheetData.fakeCuttingMaterialLossRate());
    }
    return ApiService.get('/database/emcmagnet/cutLossRate');
  },

  updateCuttingMaterialLossRate: data => {
    if (debugStatus.updateCuttingMaterialLossRate) {
      console.log('::::: API updateCuttingMaterialLossRate :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/emcmagnet/modify/cutLossRate', { data });
  },

  /* Magnetizing And Labor Price ------------------------------------------------------------------------------------------------------------------*/
  getMagnetizingAndLaborPrice: () => {
    if (debugStatus.getMagnetizingAndLaborPrice) {
      console.log('::::: API getMagnetizingAndLaborPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeEmcMagnetCleanSheetData.fakeMagnetizingAndLaborPrice());
    }
    return ApiService.get('/database/emcmagnet/manPowerPrice');
  },
};


export default EmcMagnetCleanSheetResource;
