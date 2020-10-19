import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeThermalGraphiteCleanSheetData from '~~apis/fakeData/FakeThermalGraphiteCleanSheetData';

const debugStatus = {
  // GraphitePrice
  getGraphitePrice: false,

  // Glue Price
  getGluePrice: false,

  // Pet Price
  getPetPrice: false,

  // Processing Price
  getProcessingPrice: false,

};


const ThermalGraphiteCleanSheetResource = {

/* Graphite Price -----------------------------------------------------------------------------------------------------------------------------------*/
  getGraphitePrice: () => {
    if (debugStatus.getGraphitePrice) {
      console.log('::::: API getGraphitePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalGraphiteCleanSheetData.fakeGraphitePrice());
    }
    return ApiService.get('/database/thermalGraphite/thicknessPrice');
  },

  /* Glue Price -------------------------------------------------------------------------------------------------------------------------------------*/
  getGluePrice: () => {
    if (debugStatus.getGluePrice) {
      console.log('::::: API getGluePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalGraphiteCleanSheetData.fakeGluePrice());
    }
    return ApiService.get('/database/thermalGraphite/gluePrice');
  },

  /* Pet Price --------------------------------------------------------------------------------------------------------------------------------------*/
  getPetPrice: () => {
    if (debugStatus.getPetPrice) {
      console.log('::::: API getPetPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalGraphiteCleanSheetData.fakePetPrice());
    }
    return ApiService.get('/database/thermalGraphite/petPrice');
  },

  /* Processing Price -------------------------------------------------------------------------------------------------------------------------------*/
  getProcessingPrice: () => {
    if (debugStatus.getProcessingPrice) {
      console.log('::::: API getProcessingPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalGraphiteCleanSheetData.fakeProcessingPrice());
    }
    return ApiService.get('/database/thermalGraphite/processPrice');
  },

};


export default ThermalGraphiteCleanSheetResource;
