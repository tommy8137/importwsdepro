import { handleActions } from 'redux-actions';
import _groupBy from 'lodash/groupBy';
import _get from 'lodash/get';
import uuid from 'uuid';
import { actionTypes } from '../MetalCleanSheet/MetalCleanSheetActions';


// AnodeColorPrice的預設值
const initialAnodeColorPrice = {
  anodeColorPriceList: [],
  anodeColorPriceDate: {},
};

// PaintingTypePrice的預設值
const initialPaintingTypePrice = {
  paintingTypePriceList: [],
  paintingTypePriceDate: {},
};

// GlueSyringeInnerDeameter的預設值
const initialGlueSyringeInnerDeameter = {
  glueSyringeInnerDeameterList: [],
  glueSyringeInnerDeameterDate: {},
};

// Metal parameters
const initialParameters = {
  date: { last: '', current: '', next: '', },
  list: [],
};

// Machine Tonnage Price
const initialMachineTonnagePrice = {
  date: { last: '', current: '', next: '', },
  datalist: [],
};

// GlueModelPrice的預設值
const initialGlueModelPrice = {
  glueModelPriceList: [],
  glueModelPriceDate: {},
};

// MachineModuleList
const initialMachineModuleList = {
  machineModuleList: [],
  metalTypeOptions: [],
};


// DrillPrice的預設值
const initialDrillPrice = {
  drillPrice: [],
  date: {},
};

// Labor Unit Price And WorkSheet
const initialLaborUnitPriceAndWorkSheet = {
  date: { last: '', current: '', next: '', },
  laborUnitPriceAndWorkSheetList: [],
};

// Paint Man Power Price
const initialPaintManPowerPrice = {
  selectedProductType: { label: '', value: '' },
  date: { last: '', lastId: '', current: '', currentId: '', next: '', nextId: '' },
  list: [],
  hourList: [],
  productTypeList: []
};

// Paint Machine Price
const initialPaintMachinePrice = {
  date: { last: '', current: '', next: '', },
  paintMachinePriceList: [],
};

// Paint Vendor List
const initialPaintVendorList = {
  paintVendor: [],
};

// Paint Type List
const initialPaintTypeList = {
  list: [],
};


// Paint Group List
const initialPrintProcessPrice = {
  date: { last: '', current: '', next: '', },
  list: [],
};

// Print Process Price
const initialPaintGroup = {
  paintGroupList: [],
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

const initialState = {
  paintingTypePrice: initialPaintingTypePrice,
  glueSyringeInnerDeameter: initialGlueSyringeInnerDeameter,
  parameter: initialParameters,
  machineTonnagePrice: initialMachineTonnagePrice,
  glueModelPrice: initialGlueModelPrice,
  machineModuleList: initialMachineModuleList,
  anodeColorPrice: initialAnodeColorPrice,
  drillPrice: initialDrillPrice,
  laborUnitPriceAndWorkSheet: initialLaborUnitPriceAndWorkSheet,
  paintManPowerPrice: initialPaintManPowerPrice,
  paintMachinePrice: initialPaintMachinePrice,
  paintVendorList: initialPaintVendorList,
  paintTypeList: initialPaintTypeList,
  printProcessPrice: initialPrintProcessPrice,
  paintGroup: initialPaintGroup,
  paintTypePrice: initialPaintTypePrice,
};

export default handleActions({
  /* anodeColorPrice --------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET__ANODE_COLOR_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { anodeColorPriceList, anodeColorPriceDate, } = payload;
    return {
      ...state,
      anodeColorPrice: {
        ...state.paintingTypePriceList,
        anodeColorPriceList,
        anodeColorPriceDate,
      }
    };
  },
  /* PaintingTypePrice ---------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINTING_TYPE_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { paintingTypePriceList, paintingTypePriceDate, } = payload;
    return {
      ...state,
      paintingTypePrice: {
        ...state.paintingTypePriceList,
        paintingTypePriceList,
        paintingTypePriceDate,
      }
    };
  },

  /* GlueSyringeInnerDeameter --------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_GLUE_SYRINGE_INNER_DEAMETER_LIST_SUCCESS]: (state, payload) => {
    const { glueSyringeInnerDeameterList, glueSyringeInnerDeameterDate, } = payload;
    return {
      ...state,
      glueSyringeInnerDeameter: {
        ...state.glueSyringeInnerDeameter,
        glueSyringeInnerDeameterList,
        glueSyringeInnerDeameterDate,
      }
    };
  },

  /* Metal Parameters ----------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_METAL_PARAMETERS_SUCCESS]: (state, payload) => {
    return {
      ...state,
      parameter: {
        ...state.parameter,
        ...payload,
      }
    };
  },

  /* Machine Tonnage Price --------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      machineTonnagePrice: {
        ...state.machineTonnagePrice,
        ...payload,
      }
    };
  },

  /* GlueModelPrice -----------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_GLUE_MODEL_PRICE_LIST_SUCCESS]: (state, payload) => {
    const { glueModelPriceList, glueModelPriceDate, } = payload;
    return {
      ...state,
      glueModelPrice: {
        ...state.glueModelPrice,
        glueModelPriceList,
        glueModelPriceDate,
      }
    };
  },

  /* MachineModuleList ----------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_MACHINE_MODULE_LIST_SUCCESS]: (state, payload) => {
    const { machineModuleList = [], metalType = [] } = payload;
    const options = metalType.map(item => ({ label: item.name, value: item.id }));
    return {
      ...state,
      machineModuleList: {
        ...state.machineModuleList,
        machineModuleList,
        metalTypeOptions: options,
      }
    };
  },
  /* DrillPrice ---------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_DRILL_PRICE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      drillPrice: {
        ...state.drillPrice,
        ...payload,
      }
    };
  },

  /* LaborUnitPriceAndWorkSheet ----------------------------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST_SUCCESS]: (state, payload) => {
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

  // Paint Man Power Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintManPowerPrice: {
        ...state.paintManPowerPrice,
        ...payload,
      }
    };
  },

  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintManPowerPrice: {
        ...state.paintManPowerPrice,
        ...payload,
      }
    };
  },

  [actionTypes.METAL_CLEAN_SHEET___SET_PAINT_MAN_POWER_SELECTED_PRODUCT_TYPE]: (state, payload) => {
    return {
      ...state,
      paintManPowerPrice: {
        ...state.paintManPowerPrice,
        ...payload,
      }
    };
  },
  /* Paint Machine Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST_SUCCESS]: (state, payload) => {
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
  /* Paint Vendor List -------------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_VENDOR_LIST_SUCCESS]: (state, payload) => {
    const { paintVendor } = payload;
    return {
      ...state,
      paintVendorList: {
        paintVendor,
      }
    };
  },
  /* Paint Type List ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_TYPE_LIST_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypeList: {
        ...state.paintTypeList,
        ...payload,
      }
    };
  },

  /* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_GROUP_LIST_SUCCESS]: (state, payload) => {
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
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS_SUCCESS]: (state, payload) => {
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

  [actionTypes.METAL_CLEAN_SHEET___UPDATE_SELECTED_PAINT_TYPE]: (state, payload) => {
    const { newOption } = payload;
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        selectedPaintType: newOption,
      },
    };
  },
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST_SUCCESS]: (state, payload) => {
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
  [actionTypes.METAL_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST_SUCCESS]: (state, payload) => {
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
  [actionTypes.METAL_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL_SUCCESS]: (state, payload) => {
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
  [actionTypes.METAL_CLEAN_SHEET___TOGGLE_PAINT_FORMULA_PRICE_MODAL_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintFormulaPriceModalOpen: payload.isOpen,
      }
    };
  },
  [actionTypes.METAL_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintFormulaPriceModalOpen: false
      }
    };
  },
  [actionTypes.METAL_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      paintTypePrice: {
        ...state.paintTypePrice,
        paintFormulaPriceModalOpen: false,
        paintFormulaPriceData: initialPaintTypePrice.paintFormulaPriceData
      }
    };
  },
}, initialState);
