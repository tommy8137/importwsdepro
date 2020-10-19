export const actionTypes = {
  /* Thermal Parameters ------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS: 'THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS',
  THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PARAMETERS: 'THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PARAMETERS',

  /* Fan Baseline Price ------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE: 'THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE',
  THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_FAN_BASELINE_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_FAN_BASELINE_PRICE',

  /* Fan Bearing -------------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_FAN_BEARING: 'THERMAL_CLEAN_SHEET___GET_FAN_BEARING',
  THERMAL_CLEAN_SHEET___GET_FAN_BEARING_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_FAN_BEARING_SUCCESS',

  /* Fan Bearing Price -------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE: 'THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE',
  THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_FAN_BEARING_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_FAN_BEARING_PRICE',

  /* Fan Material ------------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL: 'THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL',
  THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_SUCCESS',

  /* Fan Material Price ------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE: 'THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE',
  THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_FAN_MATERIAL_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_FAN_MATERIAL_PRICE',

  /* Magnet Material ---------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL: 'THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL',
  THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL: 'THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL',
  /* Magnet Material Price ---------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE: 'THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE',
  THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL_PRICE',
  /* Motor Diff --------------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF: 'THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF',
  THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_SUCCESS',

  /* Motor Diff Price --------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE: 'THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE',
  THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_MOTOR_DIFF_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_MOTOR_DIFF_PRICE',

  /* Grease Price ------------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_GREASE_PRICE: 'THERMAL_CLEAN_SHEET___GET_GREASE_PRICE',
  THERMAL_CLEAN_SHEET___GET_GREASE_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_GREASE_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_GREASE_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_GREASE_PRICE',

  /* Pipe Price --------------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_PIPE_PRICE: 'THERMAL_CLEAN_SHEET___GET_PIPE_PRICE',
  THERMAL_CLEAN_SHEET___GET_PIPE_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_PIPE_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_PIPE_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_PIPE_PRICE',

  /* Thermal Pad Price -------------------------------------------------------------------------------------------------------------------------------*/
  THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE: 'THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE',
  THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE_SUCCESS: 'THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE_SUCCESS',
  THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PAD_PRICE: 'THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PAD_PRICE',
};

/* Thermal Parameters ------------------------------------------------------------------------------------------------------------------------------*/
export function getThermalParameters() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS,
  };
}

export function getThermalParametersSuccess(response) {
  const { date, thermalParameter } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS_SUCCESS,
    date,
    parameterList: thermalParameter
  };
}

export function updateThermalParameters(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PARAMETERS,
    data
  };
}

/* Fan Baseline Price ------------------------------------------------------------------------------------------------------------------------------*/
export function getFanBaselinePrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE,
  };
}

export function getFanBaselinePriceSuccess(response) {
  const { date, fanBaselinePrice: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE_SUCCESS,
    date,
    fanBaselinePriceList: list
  };
}

export function updateFanBaselinePrice(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_FAN_BASELINE_PRICE,
    data
  };
}

/* Fan Bearing -------------------------------------------------------------------------------------------------------------------------------------*/
export function getFanBearing() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING,
  };
}

export function getFanBearingSuccess(response) {
  const { fanBearingList } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING_SUCCESS,
    fanBearingList: response.data,
  };
}

/* Fan Bearing Price -------------------------------------------------------------------------------------------------------------------------------*/
export function getFanBearingPrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE,
  };
}

export function getFanBearingPriceSuccess(response) {
  const { date, fanBearingList: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE_SUCCESS,
    date,
    fanBearingPriceList: list
  };
}

export function updateFanBearingPrice(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_FAN_BEARING_PRICE,
    data
  };
}

/* Fan Material ------------------------------------------------------------------------------------------------------------------------------------*/
export function getFanMaterial() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL,
  };
}

export function getFanMaterialSuccess(response) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_SUCCESS,
    fanMaterialList: response.data,
  };
}

/* Fan Material Price ------------------------------------------------------------------------------------------------------------------------------*/
export function getFanMaterialPrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE,
  };
}

export function getFanMaterialPriceSuccess(response) {
  const { date, fanMaterialList: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE_SUCCESS,
    date,
    fanMaterialPriceList: list
  };
}

export function updateFanMaterialPrice(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_FAN_MATERIAL_PRICE,
    data
  };
}

/* Magnet Material ---------------------------------------------------------------------------------------------------------------------------------*/
export function getMagnetMaterial() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL,
  };
}

export function getMagnetMaterialSuccess(response) {
  const { date, magnetMaterialList: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_SUCCESS,
    date,
    magnetMaterialList: list
  };
}

export function updateMagnetMaterial(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL,
    data
  };
}
/* Magnet Material Price ---------------------------------------------------------------------------------------------------------------------------*/

export function getMagnetMaterialPrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE,
  };
}

export function getMagnetMaterialPriceSuccess(response) {
  const { date, magnetMaterialPriceList: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE_SUCCESS,
    date,
    magnetMaterialPriceList: list
  };
}

export function updateMagnetMaterialPrice(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL_PRICE,
    data
  };
}

/* Motor Diff --------------------------------------------------------------------------------------------------------------------------------------*/
export function getMotorDiff() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF,
  };
}

export function getMotorDiffSuccess(response) {
  const { motorDiffList } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_SUCCESS,
    motorDiffList,
  };
}

/* Motor Diff Price --------------------------------------------------------------------------------------------------------------------------------*/
export function getMotorDiffPrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE,
  };
}

export function getMotorDiffPriceSuccess(response) {
  const { date, motorDiffPriceList } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE_SUCCESS,
    date,
    motorDiffPriceList
  };
}


export function updateMotorDiffPrice(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_MOTOR_DIFF_PRICE,
    data,
  };
}

/* Grease Price ------------------------------------------------------------------------------------------------------------------------------------*/
export function getGreasePrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_GREASE_PRICE,
  };
}

export function getGreasePriceSuccess(response) {
  const { date, greaseList: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_GREASE_PRICE_SUCCESS,
    date,
    greasePriceList: list
  };
}

export function updateGreasePrice(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_GREASE_PRICE,
    data
  };
}

/* Pipe Price --------------------------------------------------------------------------------------------------------------------------------------*/
export function getPipePrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_PIPE_PRICE,
  };
}

export function getPipePriceSuccess(response) {
  const { date, pipeList: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_PIPE_PRICE_SUCCESS,
    date,
    pipePriceList: list
  };
}

export function updatePipePrice(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_PIPE_PRICE,
    data
  };
}

/* Thermal Pad Price -------------------------------------------------------------------------------------------------------------------------------*/
export function getThermalPadPrice() {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE,
  };
}

export function getThermalPadPriceSuccess(response) {
  const { date, thermalPadList: list } = response.data;
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE_SUCCESS,
    date,
    thermalPadPriceList: list
  };
}

export function updateThermalPad(data) {
  return {
    type: actionTypes.THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PAD_PRICE,
    data
  };
}
