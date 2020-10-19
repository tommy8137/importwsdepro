import { handleActions } from 'redux-actions';
import uuid from 'uuid';
import { actionTypes } from '../PlasticCleanSheet/PlasticCleanSheetActions';


// Plastic parameters
const initialParameters = {
  date: { last: '', current: '', next: '', },
  list: [],

};

// Material LossRate
const initialMaterialLossRate = {
  date: { last: '', current: '', next: '', },
  list: [],
};

//  Machine Module
const initialMachineModule = {
  machineModuleList: [],
  category2List: [],
  isUpdateSuccessed: false,
};

// Machine Tonnage Price
const initialMachineTonnagePrice = {
  date: { last: '', current: '', next: '', },
  list: [],
};

// Labor Unit Price And WorkSheet
const initialLaborUnitPriceAndWorkSheet = {
  date: { last: '', current: '', next: '', },
  laborUnitPriceAndWorkSheetList: [],
};

// Paint Machine Price
const initialPaintMachinePrice = {
  date: { last: '', current: '', next: '', },
  paintMachinePriceList: [],
};

// Paint Man Power Price
const initialPaintManPowerPrice = {
  selectedProductType: { label: '', value: '' },
  date: { last: '', lastId: '', current: '', currentId: '', next: '', nextId: '' },
  list: [],
  hourList: [],
  productTypeList: []
};

// Paint Group List
const initialPrintProcessPrice = {
  date: { last: '', current: '', next: '', },
  list: [],
};

// Paint Type Price
const initialPaintTypePrice = {
  paintTypeOptions: [],
  selectedPaintType: {},
  paintTypePriceList: [],
  date: {},
  paintFormulaPriceModalOpen: false,
  paintFormulaPriceModalReadOnly: false,
  paintFormulaPriceData: {
    paintId: '',
    vendorId: '',
    nextId: '',
    paintFormulaPirce: [],
  },
};

// Print Process Price
const initialPaintGroup = {
  paintGroupList: [],
};

// Embedded Nail Price
const initialEmbeddedNailPrice = {
  date: { last: '', current: '', next: '', },
  embeddedNailPriceList: [],
};

// Grinding Price
const initialGrindingPrice = {
  date: { last: '', lastId: '', current: '', currentId: '', next: '', nextId: '' },
  list: [],
};

// Emi Sputtering List
const initialEmiSputtering = {
  emiSputteringList: [],
};

// Emi Sputtering Base List
const initialEmiSputteringBase = {
  emiSputteringBaseList: [],
};

// Paint Type List
const initialPaintTypeList = {
  list: [],
};

// Paint Vendor List
const initialPaintVendorList = {
  paintVendor: [],
};

// EMI Sputtering Price
const initialEmiSputteringPrice = {
  selectedSite: { label: '', value: '' },
  siteList: [],
  date: { last: '', lastId: '', current: '', currentId: '', next: '', nextId: '' },
  list: [],
};
// Emi Sputtering Site
const initialEmiSputteringSite = {
  list: [],
  dropdown: [],
};


const initialState = {
  parameter: initialParameters,
  materialLossRate: initialMaterialLossRate,
  machineTonnagePrice: initialMachineTonnagePrice,
  machineModule: initialMachineModule,
  laborUnitPriceAndWorkSheet: initialLaborUnitPriceAndWorkSheet,
  paintMachinePrice: initialPaintMachinePrice,
  paintManPowerPrice: initialPaintManPowerPrice,
  paintGroup: initialPaintGroup,
  paintTypePrice: initialPaintTypePrice,
  printProcessPrice: initialPrintProcessPrice,
  embeddedNailPrice: initialEmbeddedNailPrice,
  grindingPrice: initialGrindingPrice,
  emiSputtering: initialEmiSputtering,
  emiSputteringBase: initialEmiSputteringBase,
  paintTypeList: initialPaintTypeList,
  paintVendorList: initialPaintVendorList,
  emiSputteringPrice: initialEmiSputteringPrice,
  emiSputteringSite: initialEmiSputteringSite,
};

export default handleActions({
  /* Plastic Parameters ----------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS_SUCCESS]: (state, payload) => {
    return {
      ...state,
      parameter: {
        ...state.parameter,
        ...payload,
      }
    };
  },

  /* Material LossRate --------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      materialLossRate: {
        ...state.materialLossRate,
        ...payload,
      }
    };
  },

  /* Machine Module ----------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST_SUCCESS]: (state, payload) => {
    const { machineModuleList, category2 } = payload;
    // 要拿category2的下拉選單
    const category2List = category2.map(item => ({ label: item.name, value: item.id }));
    return {
      ...state,
      machineModule: {
        ...state.machineModule,
        machineModuleList,
        category2List,
      }
    };
  },

  [actionTypes.PLASTIC_CLEAN_SHEET___SET_IS_UPDATE_SUCCESSED]: (state, payload) => {
    const { status } = payload;
    return {
      ...state,
      machineModule: {
        ...state.machineModule,
        isUpdateSuccessed: status,
      }
    };
  },

  /* Machine Tonnage Price --------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      machineTonnagePrice: {
        ...state.machineTonnagePrice,
        ...payload,
      }
    };
  },

  /* LaborUnitPriceAndWorkSheet ----------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST_SUCCESS]: (state, payload) => {
    const { date, laborUnitPriceAndWorkSheetList } = payload;
    return {
      ...state,
      laborUnitPriceAndWorkSheet: {
        ...state.laborUnitPriceAndWorkSheet,
        laborUnitPriceAndWorkSheetList,
        date
      }
    };
  },

  /* Paint Machine Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { date, paintMachinePriceList } = payload;
    return {
      ...state,
      paintMachinePrice: {
        ...state.paintMachinePrice,
        paintMachinePriceList,
        date
      }
    };
  },

  // Paint Man Power Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintManPowerPrice: {
        ...state.paintManPowerPrice,
        ...payload,
      }
    };
  },

  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintManPowerPrice: {
        ...state.paintManPowerPrice,
        ...payload,
      }
    };
  },

  [actionTypes.PLASTIC_CLEAN_SHEET___SET_PAINT_MAN_POWER_SELECTED_PRODUCT_TYPE]: (state, payload) => {
    return {
      ...state,
      paintManPowerPrice: {
        ...state.paintManPowerPrice,
        ...payload,
      }
    };
  },

  /* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST_SUCCESS]: (state, payload) => {
    const { paintGroupList } = payload;
    const list = paintGroupList.map(item => ({
      ...item,
      rowId: uuid.v4()
    }));
    return {
      ...state,
      paintGroup: {
        ...state.paintGroup,
        paintGroupList: list,
      },
    };
  },

  /* Paint Type Price ----------------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS_SUCCESS]: (state, payload) => {
    const { paintTypeOptions } = payload;
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintTypeOptions,
        selectedPaintType: paintTypeOptions[0],
      },
    };
  },

  [actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_SELECTED_PAINT_TYPE]: (state, payload) => {
    const { newOption } = payload;
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        selectedPaintType: newOption,
      },
    };
  },
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { paintTypePriceList, date } = payload;
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintTypePriceList,
        date,
      },
    };
  },
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { paintTypePriceList, date } = payload;
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintTypePriceList,
        date,
      },
    };
  },
  [actionTypes.PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL_SUCCESS]: (state, payload) => {
    const { readOnly: paintFormulaPriceModalReadOnly, data: paintFormulaPriceData } = payload;
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintFormulaPriceModalOpen: true,
        paintFormulaPriceModalReadOnly,
        paintFormulaPriceData,
      }
    };
  },
  [actionTypes.PLASTIC_CLEAN_SHEET___TOGGLE_PAINT_FORMULA_PRICE_MODAL_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintFormulaPriceModalOpen: payload.isOpen,
      }
    };
  },
  [actionTypes.PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintFormulaPriceModalOpen: false
      }
    };
  },
  [actionTypes.PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintFormulaPriceModalOpen: false,
        paintFormulaPriceData: initialPaintTypePrice.paintFormulaPriceData
      }
    };
  },
  /* Print Process Price --------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      printProcessPrice: {
        ...state.printProcessPrice,
        ...payload,
      },
    };
  },

  /* Embedded Nail Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { date, embeddedNailPriceList } = payload;
    return {
      ...state,
      embeddedNailPrice: {
        ...state.embeddedNailPrice,
        embeddedNailPriceList,
        date
      }
    };
  },

  /* Grinding Price  ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      grindingPrice: {
        ...state.grindingPrice,
        ...payload,
      }
    };
  },

  /* Emi Sputtering List ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST_SUCCESS]: (state, payload) => {
    const { emiSputteringList } = payload;
    return {
      ...state,
      emiSputtering: {
        ...state.emiSputtering,
        emiSputteringList,
      }
    };
  },

  /* Emi Sputtering Base List ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST_SUCCESS]: (state, payload) => {
    const { emiSputteringBaseList } = payload;
    return {
      ...state,
      emiSputteringBase: {
        ...state.emiSputteringBase,
        emiSputteringBaseList,
      }
    };
  },

  /* Paint Type List ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypeList: {
        ...state.paintTypeList,
        ...payload,
      }
    };
  },

  /* Paint Vendor List -------------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST_SUCCESS]: (state, payload) => {
    const { paintVendor } = payload;
    return {
      ...state,
      paintVendorList: {
        paintVendor,
      }
    };
  },

  /* Embedded Nail Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      emiSputteringSite: {
        ...state.emiSputteringSite,
        ...payload,
      }
    };
  },

  /* Emi Sputtering Price  ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      emiSputteringPrice: {
        ...state.emiSputteringPrice,
        ...payload,
      }
    };
  },

  [actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      emiSputteringPrice: {
        ...state.emiSputteringPrice,
        siteList: payload.siteList
      }
    };
  },

  [actionTypes.PLASTIC_CLEAN_SHEET___SET_EMI_SPUTTERING_PRICE_SELECTED_SITE]: (state, payload) => {
    return {
      ...state,
      emiSputteringPrice: {
        ...state.emiSputteringPrice,
        selectedSite: payload.selectedSite
      }
    };
  },
}, initialState);
