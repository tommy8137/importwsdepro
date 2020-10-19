import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import {
  actionTypes,
  // Thermal Parameters
  getThermalParameters,
  getThermalParametersSuccess,

  // Fan Baseline Price
  getFanBaselinePrice,
  getFanBaselinePriceSuccess,

  // Fan Bearing
  getFanBearingSuccess,

  // Fan Bearing Price
  getFanBearingPrice,
  getFanBearingPriceSuccess,

  // Fan Material
  getFanMaterialSuccess,

  // Fan Material Price
  getFanMaterialPrice,
  getFanMaterialPriceSuccess,
  // Magnet Material
  getMagnetMaterial,
  getMagnetMaterialSuccess,
  // Magnet Material Price
  getMagnetMaterialPriceSuccess,
  getMagnetMaterialPrice,
  // Motor Diff
  getMotorDiffSuccess,

  // Motor Diff Price
  getMotorDiffPrice,
  getMotorDiffPriceSuccess,

  // Grease Price
  getGreasePrice,
  getGreasePriceSuccess,

  // Pipe Price
  getPipePrice,
  getPipePriceSuccess,

  // Thermal Pad Price
  getThermalPadPrice,
  getThermalPadPriceSuccess,

} from './ThermalCleanSheetActions';

/* Thermal Parameters ------------------------------------------------------------------------------------------------------------------------------*/
export const getThermalParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PARAMETERS),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getThermalParameters())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getThermalParametersSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateThermalParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PARAMETERS),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getThermalParameters()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Fan Baseline Price ------------------------------------------------------------------------------------------------------------------------------*/
export const getFanBaselinePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BASELINE_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getFanBaselinePrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanBaselinePriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateFanBaselinePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_FAN_BASELINE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateFanBaselinePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanBaselinePrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Fan Bearing -------------------------------------------------------------------------------------------------------------------------------------*/
export const getFanBearingEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getFanBearing())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanBearingSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Fan Bearing Price -------------------------------------------------------------------------------------------------------------------------------*/
export const getFanBearingPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_BEARING_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getFanBearingPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanBearingPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateFanBearingPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_FAN_BEARING_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateFanBearingPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanBearingPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Fan Material ------------------------------------------------------------------------------------------------------------------------------------*/
export const getFanMaterialEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getFanMaterial())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanMaterialSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Fan Material Price ------------------------------------------------------------------------------------------------------------------------------*/
export const getFanMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_FAN_MATERIAL_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getFanMaterialPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanMaterialPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateFanMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_FAN_MATERIAL_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateFanMaterialPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFanMaterialPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Magnet Material ---------------------------------------------------------------------------------------------------------------------------------*/
export const getMagnetMaterialEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getMagnetMaterial())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMagnetMaterialSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateMagnetMaterialEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateMagnetMaterial(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMagnetMaterial()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};
/* Magnet Material Price ---------------------------------------------------------------------------------------------------------------------------*/
export const getMagnetMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_MAGNET_MATERIAL_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getMagnetMaterialPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMagnetMaterialPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateMagnetMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_MAGNET_MATERIAL_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateMagnetMaterialPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMagnetMaterialPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};
/* Motor Diff --------------------------------------------------------------------------------------------------------------------------------------*/
export const getMotorDiffEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getMotorDiff())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMotorDiffSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Motor Diff Price --------------------------------------------------------------------------------------------------------------------------------*/
export const getMotorDiffPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_MOTOR_DIFF_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getMotorDiffPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMotorDiffPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateMotorDiffPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_MOTOR_DIFF_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateMotorDiffPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMotorDiffPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Grease Price ------------------------------------------------------------------------------------------------------------------------------------*/
export const getGreasePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_GREASE_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getGreasePrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGreasePriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateGreasePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_GREASE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateGreasePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGreasePrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Pipe Price --------------------------------------------------------------------------------------------------------------------------------------*/
export const getPipePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_PIPE_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getPipePrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPipePriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updatePipePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_PIPE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updatePipePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPipePrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Thermal Pad Price -------------------------------------------------------------------------------------------------------------------------------*/
export const getThermalPadPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___GET_THERMAL_PAD_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.getThermalPadPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getThermalPadPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateThermalPadEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_CLEAN_SHEET___UPDATE_THERMAL_PAD_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalCleanSheetResource.updateThermalPad(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getThermalPadPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export default [
  // Thermal Parameters
  getThermalParametersEpic,
  updateThermalParametersEpic,

  // Fan Baseline Price
  getFanBaselinePriceEpic,
  updateFanBaselinePriceEpic,

  // Fan Bearing
  getFanBearingEpic,

  // Fan Bearing Price
  getFanBearingPriceEpic,
  updateFanBearingPriceEpic,

  // Fan Material
  getFanMaterialEpic,

  // Fan Material Price
  getFanMaterialPriceEpic,
  updateFanMaterialPriceEpic,

  // Magnet Material
  getMagnetMaterialEpic,
  updateMagnetMaterialEpic,
  // Magnet Material Price
  getMagnetMaterialPriceEpic,
  updateMagnetMaterialPriceEpic,
  // Motor Diff
  getMotorDiffEpic,

  // Motor Diff Price
  getMotorDiffPriceEpic,
  updateMotorDiffPriceEpic,

  // Grease Price
  getGreasePriceEpic,
  updateGreasePriceEpic,

  // Pipe Price
  getPipePriceEpic,
  updatePipePriceEpic,

  // Thermal Pad Price
  getThermalPadPriceEpic,
  updateThermalPadEpic,

];
