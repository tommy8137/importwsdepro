import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeThermalCleanSheetData from '~~apis/fakeData/FakeThermalCleanSheetData';

const debugStatus = {
  // Thermal Parameters
  getThermalParameters: false,

  // Fan Baseline Price
  getFanBaselinePrice: false,
  updateFanBaselinePrice: false,

  // Fan Bearing
  getFanBearing: false,

  // Fan Bearing Price
  getFanBearingPrice: false,
  updateFanBearingPrice: false,

  // Fan Material
  getFanMaterial: false,

  // Fan Material Price
  getFanMaterialPrice: false,
  updateFanMaterialPrice: false,

  // Magnet Material
  getMagnetMaterial: false,
  updateMagnetMaterial: false,

  // Magnet Material Price
  getMagnetMaterialPrice: false,
  updateMagnetMaterialPrice: false,

  // Motor Diff
  getMotorDiff: false,

  // Motor Diff Price
  getMotorDiffPrice: false,
  updateMotorDiffPrice: false,

  // Grease Price
  getGreasePrice: false,
  updateGreasePrice: false,

  // Pipe Price
  getPipePrice: false,
  updatePipePrice: false,

  // Thermal Pad Price
  getThermalPadPrice: false,
  updateThermalPad: false,

};


const ThermalCleanSheetResource = {

  /* Thermal Parameters ------------------------------------------------------------------------------------------------------------------------------*/
  getThermalParameters: () => {
    if (debugStatus.getThermalParameters) {
      console.log('::::: API getThermalParameters :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeParameters());
    }
    return ApiService.get('/database/thermal/thermalParameter');
  },

  /* Fan Baseline Price ------------------------------------------------------------------------------------------------------------------------------*/
  getFanBaselinePrice: () => {
    if (debugStatus.getFanBaselinePrice) {
      console.log('::::: API getFanBaselinePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS');
    }
    return ApiService.get('/database/thermal/fanBaselinePrice');
  },

  updateFanBaselinePrice: (data) => {
    if (debugStatus.updateFanBaselinePrice) {
      console.log('::::: API updateFanBaselinePrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/thermal/modify/fanBaselinePrice', { data });
  },

  /* Fan Bearing -------------------------------------------------------------------------------------------------------------------------------------*/
  getFanBearing: () => {
    if (debugStatus.getFanBearing) {
      console.log('::::: API getFanBearing :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeFanBearing());
    }
    return ApiService.get('/database/thermal/fanBearing');
  },

  /* Fan Bearing Price -------------------------------------------------------------------------------------------------------------------------------*/
  getFanBearingPrice: () => {
    if (debugStatus.getFanBearingPrice) {
      console.log('::::: API getFanBearingPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeFanBearingPrice());
    }
    return ApiService.get('/database/thermal/fanBearingPrice');
  },

  updateFanBearingPrice: (data) => {
    if (debugStatus.updateFanBearingPrice) {
      console.log('::::: API updateFanBearingPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/thermal/modify/fanBearingPrice', { data });
  },

  /* Fan Material ------------------------------------------------------------------------------------------------------------------------------------*/
  getFanMaterial: () => {
    if (debugStatus.getFanMaterial) {
      console.log('::::: API getFanMaterial :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeFanMaterial());
    }
    return ApiService.get('/database/thermal/fanMaterial');
  },

  /* Fan Material Price ------------------------------------------------------------------------------------------------------------------------------*/
  getFanMaterialPrice: () => {
    if (debugStatus.getFanMaterialPrice) {
      console.log('::::: API getFanMaterialPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeFanMaterialPrice());
    }
    return ApiService.get('/database/thermal/fanMaterialPrice');
  },

  updateFanMaterialPrice: (data) => {
    if (debugStatus.updateFanMaterialPrice) {
      console.log('::::: API updateFanMaterialPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/thermal/modify/fanMaterialPrice', { data });
  },

  /* Magnet Material ---------------------------------------------------------------------------------------------------------------------------------*/
  getMagnetMaterial: () => {
    if (debugStatus.getMagnetMaterial) {
      console.log('::::: API getMagnetMaterial :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeMagnetMaterialList());
    }
    return ApiService.get('/database/thermal/magnetMaterial');
  },
  updateMagnetMaterial: () => {
    if (debugStatus.updateMagnetMaterial) {
      console.log('::::: API updateMagnetMaterial :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.put('/database/thermal/magnetMaterialPrice');
  },
  /* Magnet Material Price ---------------------------------------------------------------------------------------------------------------------------*/
  getMagnetMaterialPrice: () => {
    if (debugStatus.getMagnetMaterialPrice) {
      console.log('::::: API getMagnetMaterialPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeMagnetMaterialPriceList());
    }
    return ApiService.get('/database/thermal/magnetMaterialPrice');
  },
  updateMagnetMaterialPrice: (data) => {
    if (debugStatus.updateMagnetMaterialPrice) {
      console.log('::::: API putMagnetMaterialPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.put('/database/thermal/modify/magnetMaterialPrice', { data });
  },
  /* Motor Diff --------------------------------------------------------------------------------------------------------------------------------------*/
  getMotorDiff: () => {
    if (debugStatus.getMotorDiff) {
      console.log('::::: API getMotorDiff :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeMotorDiff());
    }
    return ApiService.get('/database/thermal/motorDiff');
  },

  /* Motor Diff Price --------------------------------------------------------------------------------------------------------------------------------*/
  getMotorDiffPrice: () => {
    if (debugStatus.getMotorDiffPrice) {
      console.log('::::: API getMotorDiffPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeFanMaterialPrice());
    }
    return ApiService.get('/database/thermal/motorDiffPrice');
  },

  updateMotorDiffPrice: (data) => {
    if (debugStatus.updateMotorDiffPrice) {
      console.log('::::: API updateMotorDiffPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/thermal/modify/motorDiffPrice', { data });
  },

  /* Grease Price ------------------------------------------------------------------------------------------------------------------------------------*/
  getGreasePrice: () => {
    if (debugStatus.getGreasePrice) {
      console.log('::::: API getGreasePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakeGreasePrice());
    }
    return ApiService.get('/database/thermal/grease');
  },

  updateGreasePrice: (data) => {
    if (debugStatus.updateGreasePrice) {
      console.log('::::: API updateGreasePrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/thermal/modify/grease', { data });
  },

  /* Pipe Price --------------------------------------------------------------------------------------------------------------------------------------*/
  getPipePrice: () => {
    if (debugStatus.getPipePrice) {
      console.log('::::: API getPipePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakePipePrice());
    }
    return ApiService.get('/database/thermal/pipe');
  },

  updatePipePrice: (data) => {
    if (debugStatus.updatePipePrice) {
      console.log('::::: API updatePipePrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/thermal/modify/pipe', { data });
  },

  /* Thermal Pad Price -------------------------------------------------------------------------------------------------------------------------------*/
  getThermalPadPrice: () => {
    if (debugStatus.getThermalPadPrice) {
      console.log('::::: API getThermalPadPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCleanSheetData.fakePipePrice());
    }
    return ApiService.get('/database/thermal/thermalPad');
  },

  updateThermalPad: (data) => {
    if (debugStatus.updateThermalPad) {
      console.log('::::: API updateThermalPad :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/thermal/modify/thermalPad', { data });
  },

};


export default ThermalCleanSheetResource;
