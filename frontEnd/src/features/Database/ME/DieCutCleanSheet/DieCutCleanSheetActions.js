export const actionTypes = {
  /* Parameters ------------------------------------------------------------------------------------------------------------------------------*/
  DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS: 'DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS',
  DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS_SUCCESS: 'DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS_SUCCESS',
  DIECUT_CLEAN_SHEET___UPDATE_DIE_CUT_PARAMETERS: 'DIECUT_CLEAN_SHEET___UPDATE_DIE_CUT_PARAMETERS',

  /* MaterialSizeAdderPrice ------------------------------------------------------------------------------------------------------------------*/
  DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE: 'DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE',
  DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE_SUCCESS: 'DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE_SUCCESS',
  DIECUT_CLEAN_SHEET___UPDATE_MATERIAL_SIZE_ADDER_PRICE: 'DIECUT_CLEAN_SHEET___UPDATE_MATERIAL_SIZE_ADDER_PRICE',
  /* ReleasePaperPrice -----------------------------------------------------------------------------------------------------------------------*/
  DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE: 'DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE',
  DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE_SUCCESS: 'DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE_SUCCESS',
  DIECUT_CLEAN_SHEET___UPDATE_RELEASE_PAPER_PRICE: 'DIECUT_CLEAN_SHEET___UPDATE_RELEASE_PAPER_PRICE',

  /* TypePrice -------------------------------------------------------------------------------------------------------------------------------*/
  DIECUT_CLEAN_SHEET___GET_TYPE_PRICE: 'DIECUT_CLEAN_SHEET___GET_TYPE_PRICE',
  DIECUT_CLEAN_SHEET___GET_TYPE_PRICE_SUCCESS: 'DIECUT_CLEAN_SHEET___GET_TYPE_PRICE_SUCCESS',
  DIECUT_CLEAN_SHEET___UPDATE_TYPE_PRICE: 'DIECUT_CLEAN_SHEET___UPDATE_TYPE_PRICE',

  /* AreaTimesPrice --------------------------------------------------------------------------------------------------------------------------*/
  DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE: 'DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE',
  DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE_SUCCESS: 'DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE_SUCCESS',
  DIECUT_CLEAN_SHEET___UPDATE_AREA_TIMES_PRICE: 'DIECUT_CLEAN_SHEET___UPDATE_AREA_TIMES_PRICE',

};

/* Parameters ------------------------------------------------------------------------------------------------------------------------------*/
export function getDieCutParameters() {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS,
  };
}

export function getDieCutParametersSuccess(response) {
  const { date, diecutParameter } = response.data;
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS_SUCCESS,
    date,
    parameterList: diecutParameter
  };
}

export function updateDieCutParameters(data) {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___UPDATE_DIE_CUT_PARAMETERS,
    data,
  };
}

/* MaterialSizeAdderPrice ------------------------------------------------------------------------------------------------------------------*/
export const getMaterialSizeAdderPrice = () => {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE,
  };
};

export const getMaterialSizeAdderPriceSuccess = (response) => {
  const { date, materialSizeAdderPrice } = response.data;
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE_SUCCESS,
    date,
    materialSizeAdderPrice,
  };
};

export const updateMaterialSizeAdderPrice = (data) => {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___UPDATE_MATERIAL_SIZE_ADDER_PRICE,
    data,
  };
};


/* ReleasePaperPrice -----------------------------------------------------------------------------------------------------------------------*/

export function getReleasePaperPrice() {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE,
  };
}

export function getReleasePaperPriceSuccess(response) {
  const { date, releasePaperPrice } = response.data;
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE_SUCCESS,
    date,
    releasePaperPriceList: releasePaperPrice
  };
}

export function updateReleasePaperPrice(data) {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___UPDATE_RELEASE_PAPER_PRICE,
    data,
  };
}
/* TypePrice -------------------------------------------------------------------------------------------------------------------------------*/
export function getTypePrice() {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_TYPE_PRICE,
  };
}

export function getTypePriceSuccess(response) {
  const { date, typePrice } = response.data;
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_TYPE_PRICE_SUCCESS,
    date,
    typePriceList: typePrice
  };
}

export function updateTypePrice(data) {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___UPDATE_TYPE_PRICE,
    data
  };
}

/* AreaTimesPrice --------------------------------------------------------------------------------------------------------------------------*/
export function getAreaTimesPrice() {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE,
  };
}

export function getAreaTimesPriceSuccess(response) {
  const { date, areaTimesPrice } = response.data;
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE_SUCCESS,
    date,
    areaTimesPriceList: areaTimesPrice
  };
}

export function updateAreaTimesPrice(data) {
  return {
    type: actionTypes.DIECUT_CLEAN_SHEET___UPDATE_AREA_TIMES_PRICE,
    data,
  };
}
