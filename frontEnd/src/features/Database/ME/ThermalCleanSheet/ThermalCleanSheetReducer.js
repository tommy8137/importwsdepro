import { handleActions } from 'redux-actions';
import { actionTypes } from '../ThermalCleanSheet/ThermalCleanSheetActions';


// Thermal Parameters 預設值
const initialThermalParameters = {
  date: {},
  parameterList: [],
};

// Fan Baseline Price 預設值
const initialFanBaselinePrice = {
  date: {},
  fanBaselinePriceList: []
};

// Fan Bearing 預設值
const initialFanBearing = {
  fanBearingList: [],
};

// Fan Bearing Price 預設值
const initialFanBearingPrice = {
  date: {},
  fanBearingPriceList: [],
};

// Fan Materia 預設值
const initialFanMaterial = {
  fanMaterialList: [],
};

// Fan Material Price 預設值
const initialFanMaterialPrice = {
  date: {},
  fanMaterialPriceList: [],
};

// Magnet Material 預設值
const initialMagnetMaterial = {
  magnetMaterialList: []
};

// Magnet Material Price 預設值
const initialMagnetMaterialPrice = {
  date: {},
  magnetMaterialPriceList: []
};

// Motor Diff 預設值
const initialMotorDiff = {
  motorDiffList: [],
};

// Motor Diff Price 預設值
const initialMotorDiffPrice = {
  motorDiffPriceList: [],
};

// Grease Price 預設值
const initialGreasePrice = {
  date: {},
  greasePriceList: [],
};

// Pipe Price 預設值
const initialPipePrice = {
  date: {},
  pipePriceList: [],
};

// Thermal Pad Price 預設值
const initialThermalPadPrice = {
  date: {},
  thermalPadPriceList: [],
};

const initialState = {
  parameter: initialThermalParameters,
  fanBaselinePrice: initialFanBaselinePrice,
  fanBearing: initialFanBearing,
  fanBearingPrice: initialFanBearingPrice,
  fanMaterial: initialFanMaterial,
  fanMaterialPrice: initialFanMaterialPrice,
  magnetMaterial: initialMagnetMaterial,
  magnetMaterialPrice: initialMagnetMaterialPrice,
  motorDiff: initialMotorDiff,
  motorDiffPrice: initialMotorDiffPrice,
  greasePrice: initialGreasePrice,
  pipePrice: initialPipePrice,
  thermalPadPrice: initialThermalPadPrice,
};

export default handleActions({
  /* Thermal Parameters ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS_SUCCESS]: (state, payload) => {
    const { date, parameterList } = payload;
    return {
      ...state,
      parameter: {
        ...state.parameter,
        date,
        parameterList
      }
    };
  },

  /* Fan Baseline Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE_SUCCESS]: (state, payload) => {
    const { date, fanBaselinePriceList } = payload;
    return {
      ...state,
      fanBaselinePrice: {
        ...state.fanBaselinePrice,
        date,
        fanBaselinePriceList
      }
    };
  },

  /* Fan Bearing -------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING_SUCCESS]: (state, payload) => {
    const { fanBearingList } = payload;
    return {
      ...state,
      fanBearing: {
        ...state.fanBearing,
        fanBearingList
      }
    };
  },

  /* Fan Bearing Price -------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE_SUCCESS]: (state, payload) => {
    const { date, fanBearingPriceList } = payload;
    return {
      ...state,
      fanBearingPrice: {
        ...state.fanBearingPrice,
        date,
        fanBearingPriceList
      }
    };
  },

  /* Fan Material ------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_SUCCESS]: (state, payload) => {
    const { fanMaterialList } = payload;
    return {
      ...state,
      fanMaterial: {
        ...state.fanMaterial,
        fanMaterialList
      }
    };
  },

  /* Fan Material Price ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE_SUCCESS]: (state, payload) => {
    const { date, fanMaterialPriceList } = payload;
    return {
      ...state,
      fanMaterialPrice: {
        ...state.fanMaterialPrice,
        date,
        fanMaterialPriceList
      }
    };
  },

  /* Magnet Material ---------------------------------------------------------------------------------------------------------------------------------*/

  [actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_SUCCESS]: (state, payload) => {
    const { magnetMaterialList } = payload;
    return {
      ...state,
      magnetMaterial: {
        ...state.magnetMaterial,
        magnetMaterialList,
      }
    };
  },
  /* Magnet Material Price ---------------------------------------------------------------------------------------------------------------------------*/

  [actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE_SUCCESS]: (state, payload) => {
    const { magnetMaterialPriceList, date } = payload;
    return {
      ...state,
      magnetMaterialPrice: {
        ...state.magnetMaterialPrice,
        magnetMaterialPriceList,
        date
      }
    };
  },
  /* Motor Diff --------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_SUCCESS]: (state, payload) => {
    const { motorDiffList } = payload;
    return {
      ...state,
      motorDiff: {
        ...state.motorDiff,
        motorDiffList
      }
    };
  },

  /* Motor Diff Price --------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE_SUCCESS]: (state, payload) => {
    const { date, motorDiffPriceList } = payload;
    return {
      ...state,
      motorDiffPrice: {
        ...state.motorDiffPrice,
        date,
        motorDiffPriceList
      }
    };
  },

  /* Grease Price ------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_GREASE_PRICE_SUCCESS]: (state, payload) => {
    const { date, greasePriceList } = payload;
    return {
      ...state,
      greasePrice: {
        ...state.greasePrice,
        date,
        greasePriceList
      }
    };
  },

  /* Pipe Price --------------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_PIPE_PRICE_SUCCESS]: (state, payload) => {
    const { date, pipePriceList } = payload;
    return {
      ...state,
      pipePrice: {
        ...state.pipePrice,
        date,
        pipePriceList
      }
    };
  },

  /* Thermal Pad Price -------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE_SUCCESS]: (state, payload) => {
    const { date, thermalPadPriceList } = payload;
    return {
      ...state,
      thermalPadPrice: {
        ...state.thermalPadPrice,
        date,
        thermalPadPriceList
      }
    };
  },

}, initialState);
