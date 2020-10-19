import { handleActions } from 'redux-actions';
import _groupBy from 'lodash/groupBy';
import _get from 'lodash/get';
import { actionTypes } from '../DieCutCleanSheet/DieCutCleanSheetActions';

// Parameters 預設值
const initialParameters = {
  date: {},
  parameterList: [],
};

// MaterialSizeAdderPrice 預設值
const initialMaterialSizeAdderPrice = {
  date: {},
  materialSizeAdderPrice: [],
};

// ReleasePaperPrice 預設值
const initialReleasePaperPrice = {
  date: {},
  releasePaperPriceList: []
};

// TypePrice 預設值
const initialTypePrice = {
  date: {},
  typePriceList: [],
};

// AreaTimesPrice 預設值
const initialAreaTimesPrice = {
  date: {},
  areaTimesPriceList: [],
};

const initialState = {
  parameter: initialParameters,
  materialSizeAdderPrice: initialMaterialSizeAdderPrice,
  releasePaperPrice: initialReleasePaperPrice,
  typePrice: initialTypePrice,
  areaTimesPrice: initialAreaTimesPrice
};

export default handleActions({
  /* Parameters ------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS_SUCCESS]: (state, payload) => {
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

  /* MaterialSizeAdderPrice ------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE_SUCCESS]: (state, payload) => {
    const { date, materialSizeAdderPrice } = payload;
    return {
      ...state,
      materialSizeAdderPrice: {
        ...state.materialSizeAdderPrice,
        date,
        materialSizeAdderPrice
      }
    };
  },

  /* TypePrice -------------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.DIECUT_CLEAN_SHEET___GET_TYPE_PRICE_SUCCESS]: (state, payload) => {
    const { date, typePriceList } = payload;
    return {
      ...state,
      typePrice: {
        ...state.typePrice,
        date,
        typePriceList
      }
    };
  },
  /* ReleasePaperPrice -----------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE_SUCCESS]: (state, payload) => {
    const { releasePaperPriceList, date } = payload;
    return {
      ...state,
      releasePaperPrice: {
        ...state.releasePaperPrice,
        releasePaperPriceList,
        date
      }
    };
  },
  /* AreaTimesPrice --------------------------------------------------------------------------------------------------------------------------*/
  [actionTypes.DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE_SUCCESS]: (state, payload) => {
    const { date, areaTimesPriceList } = payload;
    return {
      ...state,
      areaTimesPrice: {
        ...state.areaTimesPrice,
        date,
        areaTimesPriceList
      }
    };
  },

}, initialState);
