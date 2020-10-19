import CommonUtils from '~~utils/CommonUtils';
import FakeDatabaseData from '~~apis/fakeData/FakeDatabaseData';
import ApiService from '~~apis/ApiService';


const debugStatus = {
  // AnodeColorPrice
  getAnodeColorPriceList: false,
  putAnodeColorPriceList: false,

  // PaintingTypePrice
  getPaintingTypePriceList: false,
  updatePaintingTypePriceList: false,

  // GlueSyringeInnerDeameter
  getGlueSyringeInnerDeameterList: false,
  updateGlueSyringeInnerDeameterList: false,

  // MetalParameters
  getMetalParameters: false,
  putMetalParameters: false,

  // MachineTonnagePrice
  getMachineTonnagePrice: false,
  putMachineTonnagePrice: false,

  // GlueModelPrice
  getGlueModelPriceList: false,
  updateGlueModelPriceList: false,

  // MachineModuleList
  getMachineModuleList: false,
  updateMachineModuleList: false,

  // Labor Unit Price And WorkSheet
  getLaborUnitPriceAndWorkSheetList: false,
  updateLaborUnitPriceAndWorkSheetList: false,

  // Paint Man Power Price
  getPaintManPowerPriceList: false,
  putPaintManPowerPriceList: false,

  // Paint Machine Price
  getPaintMachinePriceList: false,
  updatePaintMachinePrice: false,

  // Paint Vendor List
  getPaintVendorList: false,
  updatePaintVendorList: false,

  // Paint Type List
  getPaintTypeColorList: false,

  // Paint Group List
  getPaintGroupList: false,

  // Paint Type Price
  getPaintTypeOptions: false,
  getPaintTypePriceList: false,
  updatePaintTypePrice: false,
  getPaintFormulaPirce: false,
  putPaintFormulaPirce: false,
};


const MetalCleanSheetResource = {

  /* AnodeColorPriceList ----------------------------------------------------------------------------------------------*/
  getAnodeColorPriceList: (params) => {
    if (debugStatus.getAnodeColorPriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeAnodeColorPriceList());
    }
    return ApiService.get('/database/metal/anodeColorPriceList', { params });
  },

  putAnodeColorPriceList: (data) => {
    if (debugStatus.putAnodeColorPriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.put('/database/metal/modify/anodeColorPrice', { data });
  },

  /* PaintingTypePrice ----------------------------------------------------------------------------------------------*/
  getPaintingTypePriceList: () => {
    if (debugStatus.getPaintingTypePriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakePaintingTypePriceList());
    }
    return ApiService.get('/database/metal/sprayPaintPriceList');
  },

  updatePaintingTypePriceList: (data) => {
    if (debugStatus.updatePaintingTypePriceList) {
      console.log('Api updatePaintingTypePriceList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/sprayPaintPrice', { data });
  },

  /* GlueSyringeInnerDeameter ----------------------------------------------------------------------------------------------*/
  getGlueSyringeInnerDeameterList: (params) => {
    if (debugStatus.getGlueSyringeInnerDeameterList) {
      console.log('API getGlueSyringeInnerDeameterList :::', params);
    }
    return ApiService.get('/database/metal/syringeList', { params });
  },

  updateGlueSyringeInnerDeameterList: (data) => {
    if (debugStatus.updateGlueSyringeInnerDeameterList) {
      console.log('Api updatePaintingTypePriceList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/syringePrice', { data });
  },

  /* Metal Parameters  ----------------------------------------------------------------------------------------------------*/
  getMetalParameters: (params) => {
    if (debugStatus.getMetalParameters) {
      console.log('API getMetalParameters :', params);
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeMetalParameters);
    }
    return ApiService.get('/database/metal/metalParameter', { params });
  },

  putMetalParameters: (data) => {
    if (debugStatus.putMetalParameters) {
      console.log('Api putMetalParameters >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/metalParameter', { data });
  },

  /* MachineTonnagePrice  ----------------------------------------------------------------------------------------------*/
  getMachineTonnagePrice: () => {
    if (debugStatus.getMachineTonnagePrice) {
      console.log('API getMachineTonnagePrice :');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeMachineTonnagePrice);
    }
    return ApiService.get('/database/metal/MachineTonnes');
  },

  putMachineTonnagePrice: (data) => {
    if (debugStatus.putMachineTonnagePrice) {
      console.log('Api putMachineTonnagePrice >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/machineTonnes', { data });
  },

  /* GlueModelPrice -------------------------------------------------------------------------------------------------------*/
  getGlueModelPriceList: (params) => {
    if (debugStatus.getGlueModelPriceList) {
      console.log('API getGlueSyringeInnerDeameterList :::', params);
    }
    return ApiService.get('/database/metal/glueModelPriceList', { params });
  },

  updateGlueModelPriceList: (data) => {
    if (debugStatus.updateGlueModelPriceList) {
      console.log('Api updateGlueModelPriceList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/glueModelPrice', { data });
  },

  /* MachineModuleList ------------------------------------------------------------------------------------------------------*/
  getMachineModuleList: () => {
    if (debugStatus.getMachineModuleList) {
      console.log('API getMachineModuleList >>>');
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakeMachineModuleList());
    }
    return ApiService.get('/database/metal/machineModule');
  },
  updateMachineModuleList: (data) => {
    if (debugStatus.updateMachineModuleList) {
      console.log('API update Machine Module List >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/machineModule', { data });
  },
  /* DrillPrice ----------------------------------------------------------------------------------------------*/
  getDrillPriceList: () => {
    return ApiService.get('/database/metal/drillPrice');
  },

  updateDrillPriceList: (data) => {
    return ApiService.put('/database/common/modify/price', { data });
  },

  /* Labor Unit Price And WorkSheet --------------------------------------------------------------------------------------------------------------------*/
  getLaborUnitPriceAndWorkSheetList: () => {
    if (debugStatus.getLaborUnitPriceAndWorkSheetList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/metal/paintManPowerHour');
  },

  updateLaborUnitPriceAndWorkSheetList: (data) => {
    if (debugStatus.updateLaborUnitPriceAndWorkSheetList) {
      console.log('Api updateLaborUnitPriceAndWorkSheetList >>>', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/paintManPowerHour', { data });
  },

  /* Paint Man Power Price List --------------------------------------------------------------------------------*/
  getPaintManPowerPriceList: (productTypeId) => {
    if (debugStatus.getPaintManPowerPriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakePaintManPowerPriceList());
    }
    const params = {
      productTypeId
    };
    return ApiService.get('/database/metal/paintManPowerPrice', { params });
  },

  putPaintManPowerPriceList: (data) => {
    if (debugStatus.putPaintManPowerPriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', {});
    }
    return ApiService.put('/database/metal/modify/paintManPowerPrice', { data });
  },

  /* Paint Machine Price --------------------------------------------------------------------------------------------------------------------*/
  getPaintMachinePriceList: () => {
    if (debugStatus.getPaintMachinePriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/metal/sprayPaintMachinePrice');
  },

  updatePaintMachinePrice: (data) => {
    if (debugStatus.updatePaintMachinePrice) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/sprayPaintMachinePrice', { data });
  },
  /* Paint Vendor List -------------------------------------------------------------------------------------------------------------------------------------------*/
  getPaintVendorList: () => {
    if (debugStatus.getPaintVendorList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/metal/paintVendor');
  },

  updatePaintVendorList: (data) => {
    if (debugStatus.updatePaintVendorList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/paintVendor', { data });
  },

  /* Paint Type List --------------------------------------------------------------------------------------------------------------------*/
  getPaintTypeColorList: () => {
    if (debugStatus.getPaintTypeColorList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/metal/paintTypeColor');
  },
  /* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
  getPaintGroupList: () => {
    if (debugStatus.getPaintGroupList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/metal/sprayPaintCombinationList');
  },
  /* Paint Type Price  ----------------------------------------------------------------------------------------------------------------------------------------------*/
  getPaintTypeOptions: () => {
    if (debugStatus.getPaintTypeOptions) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'Get list Success!');
    }
    return ApiService.get('/database/metal/paintBottomTop');
  },

  getPaintTypePriceList: (paintBottomTopId) => {
    if (debugStatus.getPaintTypePriceList) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS !!');
    }
    return ApiService.get('/database/metal/paintTypePrice', { params: { paintBottomTopId } });
  },
  // 202005 不用了
  updatePaintTypePrice: (data) => {
    if (debugStatus.updatePaintTypePrice) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/paintTypePrice', { data });
  },

  // GET 噴漆類型價目表 六個維護參數
  getPaintFormulaPirce: (data) => {
    if (debugStatus.getPaintFormulaPirce) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeDatabaseData.fakePaintFormulaPirce());
    }
    return ApiService.get('/database/metal/paintFormulaPirce', { params: data });
  },
  // PUT 噴漆類型價目表 六個維護參數
  putPaintFormulaPirce: (data) => {
    if (debugStatus.putPaintFormulaPirce) {
      return CommonUtils.fakeApiHelper(1000, 'success', 'SUCCESS!!!!');
    }
    return ApiService.put('/database/metal/modify/paintFormulaPirce', { data });
  },
};


export default MetalCleanSheetResource;
