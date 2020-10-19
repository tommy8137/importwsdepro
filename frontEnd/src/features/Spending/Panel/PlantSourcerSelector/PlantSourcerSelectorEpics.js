import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, switchMap, debounceTime } from 'rxjs/operators';
import * as R from 'ramda';

import CommonUtils from '~~utils/CommonUtils';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';

import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import * as PlantSourcerSelectorActions from './PlantSourcerSelectorActions';
import * as PanelActions from '../PanelActions';


// 取得新的selectedFilterBadgeNameList
function updateSelectedBadgeNameList(oldSelectedBadgeList, selectedBadgName) {
  let newSelectedBadgeList;
  if (oldSelectedBadgeList.includes(selectedBadgName)) {
    newSelectedBadgeList = oldSelectedBadgeList.filter(item => item !== selectedBadgName);
  } else {
    newSelectedBadgeList = [...oldSelectedBadgeList, selectedBadgName];
  }
  return newSelectedBadgeList;
}

function getFilteredDataList(dataList, selectedBadgeNameList) {
  // 如果selectedBadgeNameList沒有資料，就顯示全部資料。
  const filteredDataList = selectedBadgeNameList.length === 0 ?
    dataList : dataList.filter(item => {
      return selectedBadgeNameList.includes(item.badge);
    });
  return filteredDataList;
}


export const getPlantsEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PlantSourcerSelectorActions.actionPrefix, 'GET_PLANTS');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      return from(Resource.PanelResource.getPlants())
        .pipe(
          map(response => {
            const { plantList } = response.data;

            const badgeName = 'bg';
            const converterList = plantList.map(item => ({
              ...item,
              displayName: `${item.plant}-${item.plantName}`,
              badge: item[badgeName],
              badgeName,
              idCode: item.plant
            }));

            const dataBroupByBageName = R.pipe(
              R.groupBy(R.prop(badgeName)),
            )(converterList);
            return {
              type: SUCCESS_ACTION_TYPE,
              data: converterList,
              dataBroupByBageName,
            };
          }),
          catchError(error => {
            return of({
              type: FAILED_ACTION_TYPE,
            });
          })
        );
    })
  );
};


export const filterAvailablePlantListEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PlantSourcerSelectorActions.actionPrefix, 'FILTER_AVAILABLE_PLANT_LIST');

  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { selectedBadgName } = action;
      const { selectedPlantCodeList: selectedDataIdList, selectedFilteredBgList: oldSelectedBadgeList, plants: dataList } = state$.value.plantSourcerSelector;

      const newSelectedBadgeList = updateSelectedBadgeNameList(oldSelectedBadgeList, selectedBadgName);
      const filteredDataList = getFilteredDataList(dataList, newSelectedBadgeList);
      const oldSelectedDataList = selectedDataIdList;
      const newSelectedDataList = selectedDataIdList.filter((idCode) =>
        filteredDataList.find(item => item.idCode === idCode));

      if (R.equals(oldSelectedDataList, newSelectedDataList)) {
        // 選項沒有改變，不需要call api 取得新的type1, type2
        return of({
          type: SUCCESS_ACTION_TYPE,
          filteredDataList,
          newSelectedBadgeList
        });
      }
      return concat(
        of({
          type: SUCCESS_ACTION_TYPE,
          filteredDataList,
          newSelectedBadgeList
        }),
        of(PlantSourcerSelectorActions.updateSelectedPlantOption(oldSelectedDataList, newSelectedDataList))
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


export const getSourcersEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PlantSourcerSelectorActions.actionPrefix, 'GET_SOURCERS');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      return from(Resource.PanelResource.getSourcers())
        .pipe(
          map(response => {
            const { userList } = response.data;
            const badgeName = 'role';
            const converterList = userList.map(item => ({
              ...item,
              displayName: `${item.scode}-${item.name}(${item.role})`,
              badge: item[badgeName],
              badgeName,
              idCode: item.scode
            }));
            const dataBroupByBageName = R.pipe(
              R.groupBy(R.prop(badgeName)),
            )(converterList);

            return {
              type: SUCCESS_ACTION_TYPE,
              data: converterList,
              dataBroupByBageName,
            };
          }),
          catchError(error => console.log(';;;;;;', error))
        );
    }),
    catchError(error => console.log(';;;;;;', error))
  );
};

export const filterAvailableSourcerListEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PlantSourcerSelectorActions.actionPrefix, 'FILTER_AVAILABLE_SOURCER_LIST');

  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { selectedBadgName } = action;
      const { selectedSourcerCodeList: selectedDataIdList, selectedFilteredRoleList: oldSelectedBadgeList, sourcers: dataList } = state$.value.plantSourcerSelector;
      const newSelectedBadgeList = updateSelectedBadgeNameList(oldSelectedBadgeList, selectedBadgName);
      const filteredDataList = getFilteredDataList(dataList, newSelectedBadgeList);
      const oldSelectedDataList = selectedDataIdList;
      const newSelectedDataList = selectedDataIdList.filter((idCode) =>
        filteredDataList.find(item => item.idCode === idCode));

      if (R.equals(oldSelectedDataList, newSelectedDataList)) {
        // 選項沒有改變，不需要call api 取得新的type1, type2
        return of({
          type: SUCCESS_ACTION_TYPE,
          filteredDataList,
          newSelectedBadgeList
        });
      }

      return concat(
        of({
          type: SUCCESS_ACTION_TYPE,
          filteredDataList,
          newSelectedBadgeList
        }),
        of(PlantSourcerSelectorActions.updateSelectedSourcerOption(oldSelectedDataList, newSelectedDataList))
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


export const updateSelectedPlantOrSourcerOptionEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PlantSourcerSelectorActions.actionPrefix, 'UPDATE_SELECTED_PLANT_OR_SOURCER');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    debounceTime(1000),
    switchMap((action) => {
      const { newSelectedDataIdList, plantOrSourcer } = action;
      let plant = [];
      let scode = [];
      if (plantOrSourcer === 'plant') {
        plant = newSelectedDataIdList;
        scode = state$.value.plantSourcerSelector.selectedSourcerCodeList;
      }
      if (plantOrSourcer === 'sourcer') {
        plant = state$.value.plantSourcerSelector.selectedPlantCodeList;
        scode = newSelectedDataIdList;
      }
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PanelResource.getProcureTypes({ plant, scode }))
          .pipe(
            mergeMap(response => {
              const { typeList } = response.data;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of({
                  type: SUCCESS_ACTION_TYPE,
                  checkoutPoint: { plant, scode }
                }),
                of(PanelActions.getTypes(typeList)),
              );
            }),
            catchError(error => {
              let { checkoutPoint, filteredPlants, filteredSourcers } = state$.value.plantSourcerSelector;
              // 如果有使用filter的功能，那回到checkpoint資料也不會正確，這時應該直接把type1, typ2的資料也清空
              let selectedPlantCodeList = checkoutPoint.plant.filter(item => filteredPlants.find(i => i.plant === item));
              let selectedSourcerCodeList = checkoutPoint.scode.filter(item => filteredSourcers.find(i => i.scode === item));
              if (!R.equals(checkoutPoint.plant, selectedPlantCodeList) || !R.equals(checkoutPoint.scode, selectedSourcerCodeList)) {
                // 有使用filter的功能
                return concat(
                  of({
                    type: FAILED_ACTION_TYPE,
                    selectedPlantCodeList: [],
                    selectedSourcerCodeList: [],
                    checkoutPoint: {
                      plant: [],
                      scode: []
                    }
                  }),
                  of(PanelActions.resetTypeOptions()),
                  of(LoadingActions.toggleLoadingStatus(false)),
                  of(NotificationSystemActions.pushNotification({
                    message: '取得type1, type2失敗，請稍後再試',
                    level: 'error'
                  }))
                );
              }
              return concat(
                of({
                  type: FAILED_ACTION_TYPE,
                  selectedPlantCodeList,
                  selectedSourcerCodeList
                }),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得type1, type2失敗，請稍後再試',
                  level: 'error'
                }))
              );
            }
            )
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


export default [
  getPlantsEpic,
  filterAvailablePlantListEpic,
  getSourcersEpic,
  filterAvailableSourcerListEpic,
  updateSelectedPlantOrSourcerOptionEpic
];

