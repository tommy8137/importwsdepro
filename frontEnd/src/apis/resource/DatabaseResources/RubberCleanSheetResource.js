import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import FakeRubberCleanSheetData from '~~apis/fakeData/FakeRubberCleanSheetData';

const debugStatus = {
  // Parameters
  // getRubberParameter: true,
  // putRubberParameter: true,

  // Machine Price
  // getRubberMachinePrice: true,
  // putRubberMachinePrice: true,

  // stamping price
  // getStampingPrice: true,
  // putStampingPrice: true,

  // Adhesive Price
  // getAdhesivePrice: true,
  // putAdhesivePrice: true,

  // Printing Price
  // getPrintingPrice: true,
  // putPrintingPrice: true,

};


const RubberCleanSheetResource = {

  /* Parameters ----------------------------------------------------------------------------------------------------------------------------------------------*/
  getRubberParameter: () => {
    if (debugStatus.getRubberParameter) {
      console.log('::::: API getRubberParameter :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeRubberCleanSheetData.fakeGetRubberParameter());
    }
    return ApiService.get('/database/rubber/rubberParameter');
  },

  /* Machine Price ----------------------------------------------------------------------------------------------------------------------------------------*/
  getRubberMachinePrice: () => {
    if (debugStatus.getRubberMachinePrice) {
      console.log('::::: API getRubberMachinePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeRubberCleanSheetData.fakeGetRubberMachinePrice());
    }
    return ApiService.get('/database/rubber/machinePrice');
  },

  putRubberMachinePrice: data => {
    if (debugStatus.putRubberMachinePrice) {
      console.log('::::: API putRubberMachinePrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/rubber/modify/machinePrice', { data });
  },

  /* stamping price --------------------------------------------------------------------------------------------------------------------------------------*/
  getStampingPrice: () => {
    if (debugStatus.getStampingPrice) {
      console.log('::::: API getStampingPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeRubberCleanSheetData.fakeGetStampingPrice());
    }
    return ApiService.get('/database/rubber/stampingPrice');
  },

  putStampingPrice: data => {
    if (debugStatus.putStampingPrice) {
      console.log('::::: API putStampingPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/rubber/modify/stampingPrice', { data });
  },

  /* Adhesive Price ---------------------------------------------------------------------------------------------------------------------------------------*/
  getAdhesivePrice: () => {
    if (debugStatus.getAdhesivePrice) {
      console.log('::::: API getAdhesivePrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeRubberCleanSheetData.fakeGetAdhesivePrice());
    }
    return ApiService.get('/database/rubber/adhesivePrice');
  },

  putAdhesivePrice: data => {
    if (debugStatus.putAdhesivePrice) {
      console.log('::::: API putAdhesivePrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/rubber/modify/adhesivePrice', { data });
  },

  /* Printing Price ----------------------------------------------------------------------------------------------------------------------------*/
  getPrintingPrice: () => {
    if (debugStatus.getPrintingPrice) {
      console.log('::::: API getPrintingPrice :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeRubberCleanSheetData.fakeGetPrintingPrice());
    }
    return ApiService.get('/database/rubber/printingPrice');
  },

  putPrintingPrice: data => {
    if (debugStatus.putPrintingPrice) {
      console.log('::::: API putPrintingPrice :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/rubber/modify/printingPrice', { data });
  },
  // Machine Rate
  getMachineRate: () => {
    if (debugStatus.getMachineRate) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeRubberCleanSheetData.fakeGetMachineRate());
    }
    return ApiService.get('/database/rubber/machineRate');
  },

  putMachineRate: data => {
    if (debugStatus.putMachineRate) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('/database/rubber/modify/machineRate', { data });
  },

};


export default RubberCleanSheetResource;
