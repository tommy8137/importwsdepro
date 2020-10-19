import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
// import FakeThermalCleanSheetData from '~~apis/fakeData/FakeThermalCleanSheetData';
import FakeDieCutCleanSheetData from '~~apis/fakeData/FakeDieCutCleanSheetData';

const debugStatus = {
  // Parameters
  getDieCutParameters: false,

  // MaterialSizeAdderPrice

  // ReleasePaperPrice
  getReleasePaperPrice: false,
  updateReleasePaperPrice: false,
  // TypePrice
  getTypePrice: false,
  updateTypePrice: false,

  // AreaTimesPrice
  getAreaTimesPrice: false,
  updateAreaTimesPrice: false,

};


const DieCutCleanSheetResource = {

  /* MaterialSizeAdderPrice ------------------------------------------------------------------------------------------------------------------*/
  getMaterialSizeAdderPrice: () => {
    if (debugStatus.getMaterialSizeAdderPrice) {
      console.log('::::: API getMaterialSizeAdderPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDieCutCleanSheetData.fakeGetMaterialSizeAdderPrice());
    }
    return ApiService.get('/database/diecut/materialSizeAdderPrice');
  },

  updateMaterialSizeAdderPrice: (data) => {
    if (debugStatus.updateMaterialSizeAdderPrice) {
      console.log('::::: API updateMaterialSizeAdderPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/diecut/modify/materialSizeAdderPrice', { data });
  },

  /* Parameters ------------------------------------------------------------------------------------------------------------------*/
  getDieCutParameters: () => {
    if (debugStatus.getDieCutParameters) {
      console.log('::::: API getDieCutParameters :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.get('/database/diecut/diecutParameter');
  },

  /* TypePrice -------------------------------------------------------------------------------------------------------------------------------*/
  getTypePrice: () => {
    if (debugStatus.getTypePrice) {
      console.log('::::: API getTypePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.get('/database/diecut/typePrice');
  },

  updateTypePrice: (data) => {
    if (debugStatus.updateTypePrice) {
      console.log('::::: API updateTypePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.put('/database/diecut/modify/typePrice', { data });
  },

  /* AreaTimesPrice --------------------------------------------------------------------------------------------------------------------------*/
  getAreaTimesPrice: () => {
    if (debugStatus.getAreaTimesPrice) {
      console.log('::::: API getAreaTimesPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.get('/database/diecut/areaTimesPrice');
  },
  /* MaterialSizeAdderPrice ------------------------------------------------------------------------------------------------------------------*/

  /* ReleasePaperPrice -----------------------------------------------------------------------------------------------------------------------*/
  getReleasePaperPrice: () => {
    if (debugStatus.getReleasePaperPrice) {
      console.log('::::: API getReleasePaperPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDieCutCleanSheetData.fakeReleasePaperPrice());
    }
    return ApiService.get('/database/diecut/releasePaperPrice');
  },

  updateReleasePaperPrice: (data) => {
    if (debugStatus.updateReleasePaperPrice) {
      console.log('::::: API updateReleasePaperPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/diecut/modify/releasePaperPrice', { data });
  },
  /* TypePrice -------------------------------------------------------------------------------------------------------------------------------*/

  /* AreaTimesPrice --------------------------------------------------------------------------------------------------------------------------*/

  updateAreaTimesPrice: (data) => {
    if (debugStatus.updateAreaTimesPrice) {
      console.log('::::: API updateAreaTimesPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.put('/database/diecut/modify/areaTimesPrice', { data });
  },

};


export default DieCutCleanSheetResource;
