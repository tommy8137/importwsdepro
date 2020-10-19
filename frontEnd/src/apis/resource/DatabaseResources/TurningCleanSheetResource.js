import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeTurningCleanSheetData from '~~apis/fakeData/FakeTurningCleanSheetData';

const debugStatus = {
  // Parameters
  // getTurningParameter: true,
  // Tooth Path
  // getToothPath: true,
  // putToothPath: true,
  // Heat Treatment Unit Price
  // getHeatTreatmentUnitPrice: true,
  // Electroplating Unit Price
  // getElectroplatingUnitPrice: true,
  // Nylok Unit Price
  // getNylokUnitPrice: true,
};


const TurningCleanSheetResource = {
  /* Parameters -------------------------------------------------------------------------------------------------------------------------------------------------------*/
  getTurningParameter: () => {
    if (debugStatus.getTurningParameter) {
      console.log('::::: API getTurningParameter :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeTurningCleanSheetData.fakeGetTurningParameter());
    }
    return ApiService.get('/database/turning/turningParameter');
  },
  /* Tooth Path -----------------------------------------------------------------------------------------------------------------------------------------------------*/
  getToothPath: () => {
    if (debugStatus.getToothPath) {
      console.log('::::: API getToothPath :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeTurningCleanSheetData.fakeGetToothPath());
    }
    return ApiService.get('/database/turning/diameter');
  },
  putToothPath: data => {
    if (debugStatus.putToothPath) {
      console.log('::::: API putToothPath :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/turning/modify/diameter', { data });
  },
  /* Heat Treatment Unit Price --------------------------------------------------------------------------------------------------------------------------------------*/
  getHeatTreatmentUnitPrice: () => {
    if (debugStatus.getHeatTreatmentUnitPrice) {
      console.log('::::: API getHeatTreatmentUnitPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeTurningCleanSheetData.fakeGetHeatTreatmentUnitPrice());
    }
    return ApiService.get('/database/turning/heatTreatmentPrice');
  },
  /* Electroplating Unit Price --------------------------------------------------------------------------------------------------------------------------------------*/
  getElectroplatingUnitPrice: () => {
    if (debugStatus.getElectroplatingUnitPrice) {
      console.log('::::: API getElectroplatingUnitPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeTurningCleanSheetData.fakeGetElectroplatingUnitPrice());
    }
    return ApiService.get('/database/turning/platingPrice');
  },
  /* Nylok Unit Price -----------------------------------------------------------------------------------------------------------------------------------------------*/
  getNylokUnitPrice: () => {
    if (debugStatus.getNylokUnitPrice) {
      console.log('::::: API getNylokUnitPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeTurningCleanSheetData.fakeGetNylokUnitPrice());
    }
    return ApiService.get('/database/turning/nylokPrice');
  },
};


export default TurningCleanSheetResource;
