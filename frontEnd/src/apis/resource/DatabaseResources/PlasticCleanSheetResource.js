import CommonUtils from '~~utils/CommonUtils';
import FakeDatabaseData from '~~apis/fakeData/FakeDatabaseData';
import ApiService from '~~apis/ApiService';


const debugStatus = {

  // PlasticParameters
  getPlasticParameters: false,

  // Machine Module
  getMachineModuleList: false,
  updateMachineModuleList: false,

  // MachineTonnagePrice
  getMachineTonnagePrice: false,
  putMachineTonnagePrice: false,

  // Labor Unit Price And WorkSheet
  getLaborUnitPriceAndWorkSheetList: false,
  updateLaborUnitPriceAndWorkSheetList: false,

  // Paint Machine Price
  getPaintMachinePriceList: false,
  updatePaintMachinePrice: false,

  // Material Loss Rate
  getMaterialLossRate: false,
  putMaterialLossRate: false,

  // Paint Man Power Price
  getPaintManPowerPriceList: false,
  putPaintManPowerPriceList: false,

  // Paint Group List
  getPaintGroupList: false,

  // Paint Type Price
  getPaintTypeOptions: false,
  getPaintTypePriceList: false,
  updatePaintTypePrice: false,
  getPaintFormulaPirce: false,
  putPaintFormulaPirce: false,

  // Print Process Price
  getPrintProcessPrice: false,
  updatePrintProcessPrice: false,

  // Paint Type List
  getPaintTypeColorList: false,

  // Embedded Nail Price
  getEmbeddedNailPriceList: false,
  updateEmbeddedNailPrice: false,

  // Grinding Price
  getGrindingPriceList: false,
  putGrindingPriceList: false,

  // Emi Sputtering List
  getEmiSputteringList: false,
  updateEmiSputtering: false,

  // Paint Vendor List
  getPaintVendorList: false,
  updatePaintVendorList: false,

  // Emi Sputtering Base List
  getEmiSputteringBaseList: false,

  // Emi Sputtering Price
  getEmiSputteringPriceList: false,
  putEmiSputteringPriceList: false,
  getEmiSiteGroupList: false,

  // Emi Sputtering Site
  getEmiSputteringSite: false,
  updateEmiSputteringSite: false,


};


const PlasticCleanSheetResource = {
  /* Plastic Parameters  ----------------------------------------------------------------------------------------------------*/
  getPlasticParameters: (params) => {
    if (debugStatus.getPlasticParameters) {
      console.log('API getPlasticParameters :', params);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeMetalParameters);
    }
    return ApiService.get('/database/plastic/plasticParameter', { params });
  },

  /* MaterialLossRate  ----------------------------------------------------------------------------------------------------*/
  getMaterialLossRate: () => {
    if (debugStatus.getMaterialLossRate) {
      // console.log('API getMaterialLossRate :');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeMaterialLossRate());
    }
    return ApiService.get('/database/plastic/materialLossRate');
  },

  putMaterialLossRate: (data) => {
    if (debugStatus.putMaterialLossRate) {
      console.log('API putMaterialLossRate :');
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.put('/database/plastic/modify/materialLossRate', { data });
  },

  /* Machine Module ------------------------------------------------------------------------------------------------------------------------------------*/
  getMachineModuleList: () => {
    if (debugStatus.getMachineModuleList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeMachineModuleList());
    }
    return ApiService.get('/database/plastic/machineModule');
  },

  updateMachineModuleList: (data) => {
    if (debugStatus.updateMachineModuleList) {
      console.log('Api updateMachineModuleList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/machineModule', { data });
  },

  /* MachineTonnagePrice  ----------------------------------------------------------------------------------------------*/
  getMachineTonnagePrice: () => {
    if (debugStatus.getMachineTonnagePrice) {
      console.log('API getMachineTonnagePrice :');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeMachineTonnagePrice);
    }
    return ApiService.get('/database/plastic/machineTonnes');
  },

  putMachineTonnagePrice: (data) => {
    if (debugStatus.putMachineTonnagePrice) {
      console.log('Api putMachineTonnagePrice >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/machineTonnes', { data });
  },

  /* Labor Unit Price And WorkSheet --------------------------------------------------------------------------------------------------------------------*/
  getLaborUnitPriceAndWorkSheetList: () => {
    if (debugStatus.getLaborUnitPriceAndWorkSheetList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/paintManPowerHour');
  },

  updateLaborUnitPriceAndWorkSheetList: (data) => {
    if (debugStatus.updateLaborUnitPriceAndWorkSheetList) {
      console.log('Api updateLaborUnitPriceAndWorkSheetList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    console.log('>>>>>>', data);
    return ApiService.put('/database/plastic/modify/paintManPowerHour', { data });
  },

  /* Paint Machine Price --------------------------------------------------------------------------------------------------------------------*/
  getPaintMachinePriceList: () => {
    if (debugStatus.getPaintMachinePriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/sprayPaintMachinePrice');
  },

  updatePaintMachinePrice: (data) => {
    if (debugStatus.updatePaintMachinePrice) {
      console.log('Api updatePaintMachinePrice >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/sprayPaintMachinePrice', { data });
  },

  /* Paint Man Power Price List --------------------------------------------------------------------------------*/
  getPaintManPowerPriceList: (productTypeId) => {
    if (debugStatus.getPaintManPowerPriceList) {
      // console.log('API getPaintManPowerPriceList :');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakePaintManPowerPriceList());
    }
    const params = {
      productTypeId
    };
    return ApiService.get('/database/plastic/paintManPowerPrice', { params });
  },

  putPaintManPowerPriceList: (data) => {
    if (debugStatus.putPaintManPowerPriceList) {
      // console.log('API putPaintManPowerPriceList :');
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.put('/database/plastic/modify/paintManPowerPrice', { data });
  },

  /* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
  getPaintGroupList: () => {
    if (debugStatus.getPaintGroupList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/sprayPaintCombinationList');
  },

  /* Paint Type Price  ----------------------------------------------------------------------------------------------------------------------------------------------*/
  getPaintTypeOptions: () => {
    if (debugStatus.getPaintTypeOptions) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/paintBottomTop');
  },

  getPaintTypePriceList: (paintBottomTopId) => {
    if (debugStatus.getPaintTypePriceList) {
      console.log('API getPaintTypePriceList >>>', paintBottomTopId);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.get('/database/plastic/paintTypePrice', { params: { paintBottomTopId } });
  },

  updatePaintTypePrice: (data) => {
    if (debugStatus.updatePaintTypePrice) {
      console.log('Api updatePaintTypePrice >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/paintTypePrice', { data });
  },

  // GET 噴漆類型價目表 六個維護參數
  getPaintFormulaPirce: (data) => {
    if (debugStatus.getPaintFormulaPirce) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakePaintFormulaPirce());
    }
    return ApiService.get('/database/plastic/paintFormulaPirce', { params: data });
  },
  // PUT 噴漆類型價目表 六個維護參數
  putPaintFormulaPirce: (data) => {
    if (debugStatus.putPaintFormulaPirce) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/paintFormulaPirce', { data });
  },
  /* Print Process Price --------------------------------------------------------------------------------------------------------------------*/
  getPrintProcessPrice: (params) => {
    if (debugStatus.getPrintProcessPrice) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/printingProcessPrice', { params });
  },

  updatePrintProcessPrice: (data) => {
    if (debugStatus.updatePrintProcessPrice) {
      console.log('Api updatePrintProcessPrice >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/printingProcessPrice', { data });
  },

  /* Paint Type List --------------------------------------------------------------------------------------------------------------------*/
  getPaintTypeColorList: () => {
    if (debugStatus.getPaintTypeColorList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/paintTypeColor');
  },

  /* Embedded Nail Price --------------------------------------------------------------------------------------------------------------------*/
  getEmbeddedNailPriceList: (params) => {
    if (debugStatus.getEmbeddedNailPriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/EmbeddedPrice', { params });
  },

  updateEmbeddedNailPrice: (data) => {
    if (debugStatus.updateEmbeddedNailPrice) {
      console.log('Api updateEmbeddedNailPrice >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/EmbeddedPrice', { data });
  },

  /* Grinding Price --------------------------------------------------------------------------------*/
  getGrindingPriceList: (params) => {
    if (debugStatus.getGrindingPriceList) {
      console.log('API getPaintManPowerPriceList :', params);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeGrindingPriceList());
    }
    return ApiService.get('/database/plastic/grindingPrice', { params });
  },

  putGrindingPriceList: (data) => {
    if (debugStatus.putGrindingPriceList) {
      // console.log('API putPaintManPowerPriceList :');
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.put('/database/plastic/modify/grindingPrice', { data });
  },

  /* Emi Sputtering List ------------------------------------------------------------------------------------------------------------------------------*/
  getEmiSputteringList: (params) => {
    if (debugStatus.getEmiSputteringList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/emiSputtering', { params });
  },

  updateEmiSputtering: (data) => {
    if (debugStatus.updateEmiSputtering) {
      console.log('Api updateEmiSputtering >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/emiSputteringList', { data });
  },

  /* Emi Sputtering Base Listt ----------------------------------------------------------------------------------------------------------------------------------------------*/
  getEmiSputteringBaseList: (params) => {
    if (debugStatus.getEmiSputteringBaseList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/emiSputteringBase', { params });
  },

  /* EmiSputteringPrice --------------------------------------------------------------------------------*/
  getEmiSputteringPriceList: (params) => {
    if (debugStatus.getEmiSputteringPriceList) {
      console.log('API getEmiSputteringPriceList :', params);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeEmiSputteringPriceList(params));
    }
    return ApiService.get('/database/plastic/emiSputteringPrice', { params });
  },

  putEmiSputteringPriceList: (data) => {
    if (debugStatus.putEmiSputteringPriceList) {
      // console.log('API putPaintManPowerPriceList :');
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    console.log(data);
    return ApiService.put('/database/plastic/modify/emiSputteringPrice', { data });
  },

  getEmiSiteGroupList: (params) => {
    if (debugStatus.getEmiSiteGroupList) {
      console.log('API getEmiSiteGroupList :', params);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeEmiSiteGroupList());
    }
    return ApiService.get('/database/plastic/emiSiteGroup', { params });
  },

  /* Emi Sputtering Site --------------------------------------------------------------------------------------------------------------------*/
  getEmiSputteringSite: (params) => {
    if (debugStatus.getEmiSputteringSite) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/emiSputteringSiteGroup', { params });
  },

  updateEmiSputteringSite: (params) => {
    if (debugStatus.updateEmiSputteringSite) {
      console.log('Api updateEmiSputteringSite >>>', params);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/emiSputteringSiteGroup', { data: params });
  },

  /* Paint Vendor List -------------------------------------------------------------------------------------------------------------------------------------------*/
  getPaintVendorList: () => {
    if (debugStatus.getPaintVendorList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/plastic/paintVendor');
  },

  updatePaintVendorList: (data) => {
    if (debugStatus.updatePaintVendorList) {
      console.log('Api updatePaintVendorList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/plastic/modify/paintVendor', { data });
  },
};


export default PlasticCleanSheetResource;
