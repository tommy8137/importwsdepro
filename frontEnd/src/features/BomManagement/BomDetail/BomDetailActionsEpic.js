import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin, empty, EMPTY } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import { push } from 'connected-react-router';
import * as R from 'ramda';
import _get from 'lodash/get';
import _find from 'lodash/find';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import TableGridUtils from '~~utils/TableGridUtils';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';
import { store, history } from '~~store';

import {
  actionTypes,
  getProductTypeListSuccess,
  getBomDetail,
  //
  getBomAssignlistSuccess,
  getBomAssignlistFailed,

  getDropdownValue,
  getDropdownValueSuccess,
  getDropdownValueFailed,

  getParentlevelSuccess,
  getParentlevelFailed,
  //
  getBomItemList,
  getBomItemListSuccess,
  getBomItemListFailed,

  // 版本
  getBomVersionListSuccess,
  updateCurrentVersion,

  //
  updateStep,
  toggleImportModal,
  resetModal,
  //
  uploadFileSuccess,
  uploadFileFailed,
  //
  deleteTempSuccess,
  deleteTempFailed,
  //
  getMappingInfoSuccess,
  getMappingInfoFailed,
  //
  confirmBomItemSuccess,
  confirmBomItemFailed,

  //
  downloadBomTemplateSuccess,
  downloadBomTemplateFailed,
  //
  getEmdmBomImageSucccess,

} from './BomDetailActions';

/**
 * 取得要返回的URL
 */
function getBackUrl() {
  const pathname = _get(history, ['location', 'pathname'], '');
  if (pathname.indexOf('/Bomdetail/') > -1) {
    return '/s/bomManagement/me';
  }
  return '/s/bomManagement/emdm';
}

export const leaveEditModeEpic = (action$, state$) => {
  return action$.pipe(
    ofType(
      // 離開BOM Detail,以及在BOM Detail切換tab的時候，都要回到檢視模式
      actionTypes.BOM___RESET_MODAL, actionTypes.BOM___SET_BOM_ASSIGN
    ),
    mergeMap((action) => {
      return of({
        type: actionTypes.BOM___LEAVE_EDIT_MODE
      });
    }),
    catchError(error => {
      return of(NotificationSystemActions.pushNotification({
        message: '系統錯誤，請稍後再試',
        level: 'error'
      }));
    })
  );
};

export const saveMEBomTableEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___SAVE_MEBOM_TABLE),
    mergeMap((action) => {
      // 比較tableData和originalTableData，如果沒有修改的資料就不要送出
      const { originalMEBomTableList, tmpMEBomTableList, bomID, assignItem: { assign } } = state$.value.bomDetail;
      const modifiedItems = TableGridUtils.getModifiedFields(tmpMEBomTableList, originalMEBomTableList);
      const { editPolicy } = action;
      console.log('你改了這些: ', modifiedItems);
      // 如果沒有修改資料，就不用call api
      if (modifiedItems.length === 0) {
        return of({
          type: actionTypes.BOM___SAVE_MEBOM_TABLE_SUCCESS,
        });
      }

      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.updateMEBomTableItems({ bomItems: modifiedItems }, bomID, editPolicy))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of({
                  type: actionTypes.BOM___SAVE_MEBOM_TABLE_SUCCESS,
                }),
                // 更新完重新要一次table更新originalTableData
                of(getBomItemList({ bomID, assign })),
                of(NotificationSystemActions.pushNotification({
                  message: '修改成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '修改失敗，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.log('[savePersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};


// GET: AssignList 列表資料
export const getBomAssignListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___GET_BOM_ASSIGNLIST),
    mergeMap((action) => {
      const { params } = action;
      const { bomDetail: { assignItem } } = state$.value;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.getBomAssignList(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getBomAssignlistSuccess(response, assignItem)),
              );
            }),
            catchError(error => {
              return concat(
                of(getBomAssignlistFailed(error.response)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.log('[getBomAssignListEpic] EPIC ERROR >>>', error.message))
  );
};


// GET:取得 AssignList => 看看自己有沒有在裡面 => 切到自己的 BomItem-List => 取得BomItem-List
// 使用時機: 從BOM project進入Input BOM頁面
export const getBomDetailEpic = (action$, state$) => {
  const onError = (error) => {
    console.log('getBomDetailEpic error >>>', error);
    const permissionDeny = error.response && error.response.status === 401 && error.response.data === 'permission deny';
    if (permissionDeny) {
      return concat(
        of(LoadingActions.toggleLoadingStatus(false)),
        of(NotificationSystemActions.pushNotification({
          message: '權限不足',
          level: 'error'
        })),
        of(push('/s/bomManagement'))
      );
    }
    return concat(
      of(LoadingActions.toggleLoadingStatus(false)),
      of(NotificationSystemActions.pushNotification({
        message: '取得資料有誤，請稍後再試',
        level: 'error'
      }))
    );
  };
  return action$.pipe(
    ofType(actionTypes.BOM___GET_BOMDETAIL),
    mergeMap((action) => {
      // console.log('這裡一直在重拿BOM___GET_BOMDETAIL');
      const { params, params: { bomID }, disableChangeTab } = action;
      // 如果有 disableChangeTab 這個參數 就不切tab
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.BomDetailResource.getBomAssignList(params),
        )
          .pipe(
            mergeMap(response => {
              const { assignList } = response.data;
              const {
                bomDetail: {
                  selectedSkuNum: skuNum = 'sku1',
                  assignItem: {
                    bomDesigneeID
                  },
                  currentVersion: {
                    value: versionid,
                  } },
              } = state$.value;
              // 如果關掉changeTab的功能 就切到目前redux存的的 bomDesigneeID 的tab

              const assignOwner = disableChangeTab && bomDesigneeID ?
                R.find(R.propEq('bomDesigneeID', bomDesigneeID))(assignList) :
                R.find(R.propEq('tabOwner', true))(assignList);

              const bomDetailParams = {
                bomID,
                assign: assignOwner ? assignOwner.bomDesigneeID : 'all'
              };
              const bomDetailData = {
                versionid,
                skuNum
              };
              // console.log('-----------3--------------');
              return concat(
                of(getBomAssignlistSuccess(response, assignOwner)),
                forkJoin(
                  Resource.BomDetailResource.getBomDetail(bomDetailParams, bomDetailData),
                  Resource.BomDetailResource.getBomVersionList(bomID),
                )
                  .pipe(
                    mergeMap(res => {
                      const versionOptions = _get(res[1], 'data', []).map(({ key: value, value: label }) => ({ value, label }));
                      const currentOpt = _find(versionOptions, obj => obj.value === 'CURRENT');
                      const currentVersion = versionid ? _find(versionOptions, obj => obj.value === versionid, currentOpt) : currentOpt;
                      const productType = _get(res[0], ['data', 'productType'], 'NB');

                      return concat(
                        of(LoadingActions.toggleLoadingStatus(false)),
                        of(getDropdownValue(productType)),
                        of(getBomItemListSuccess(res[0])),
                        of(getBomVersionListSuccess(versionOptions)),
                        of(updateCurrentVersion(currentVersion))
                      );
                    })
                  )
              );
            }),
            catchError(onError)
          ));
    }),
    catchError(onError)
  );
};


// GET:取得InputBom-List資料
// 使用時機: add new item、編輯bom item、切換designee、input bom搜尋
export const getBomItemListEpic = (action$, state$) => {
  function onError(error) {
    console.log('getBomItemListEpic error', error);
    return concat(
      of(LoadingActions.toggleLoadingStatus(false)),
      of(NotificationSystemActions.pushNotification({
        message: '取得資料有誤，請稍後再試',
        level: 'error'
      }))
    );
  }
  return action$.pipe(
    ofType(actionTypes.BOM___GET_BOMITEMLIST),
    mergeMap((action) => {
      const { params: { bomID = '', assign: paramsAssign } } = action;
      const projectKeyword = _get(state$.value, ['bomDetail', 'searchValue', 'inputbom'], '');
      const partlistKeyword = _get(state$.value, ['bomDetail', 'searchValue', 'partlist'], '');
      const skuNum = _get(state$.value, ['bomDetail', 'selectedSkuNum'], 'sku1');
      const assign = paramsAssign || _get(state$.value, ['bomDetail', 'assignItem', 'bomDesigneeID'], 'all') || 'all';
      const versionid = _get(state$.value, ['bomDetail', 'currentVersion', 'value'], 'CURRENT') || 'CURRENT';

      const data = {
        project: projectKeyword,
        partlist: partlistKeyword,
        versionid,
        skuNum,
      };

      const params = {
        bomID,
        assign,
      };

      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.getBomDetail(params, data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getBomItemListSuccess(response)),
              );
            }),
            catchError(onError)
          ));
    }),
    catchError(onError)
  );
};


// GET: AssignList 列表資料
export const getDropdownvalueEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___GET_DROPDOWN_VALUE),
    mergeMap((action) => {
      const { productType } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.getDropdownvalue(productType))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getDropdownValueSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(getDropdownValueFailed(error.response)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Assign List有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.log('[AssignList] EPIC ERROR >>>', error.message))
  );
};


// GET: parentLevel 列表資料
export const getParentlevelEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___GET_BOM_PARENTLEVEL),
    mergeMap((action) => {
      const { params } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.getParentlevel(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(getParentlevelSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(getParentlevelFailed(error.response)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Parent Level有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.log('[getParentlevel] EPIC ERROR >>>', error.message))
  );
};


// POST: Approve
export const approveBomEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___APPROVE_BOM),
    mergeMap((action) => {
      const { bomID } = state$.value.bomDetail;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.approveBom({ bomID }))
          .pipe(
            mergeMap(response => {
              const backUrl = getBackUrl();
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: 'APPROVE成功',
                  level: 'info'
                })),
                of(push(backUrl)),
              );
            }),
            // map(() => {
            //   return push('/s/bomManagement');
            // }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: 'APPROVE有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


// POST: VERSION COMPLETE
export const completeVersionBomEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___VERSION_COMPLETE),
    mergeMap((action) => {
      const { bomID } = state$.value.bomDetail;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.completeBomVersion({ bomID }))
          .pipe(
            mergeMap(response => {
              const backUrl = getBackUrl();
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: 'VERSION COMPLETE成功',
                  level: 'info'
                })),
                of(push(backUrl)),
              );
            }),
            // map(() => {
            //   return push('/s/bomManagement');
            // }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: 'VERSION COMPLETE有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

// import file
// POST: Import Excel
export const uploadFileEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___UPLOAD_FILE),
    mergeMap((action) => {
      const { file } = action;
      const { bomID } = state$.value.bomDetail;
      const data = new FormData();
      data.append('file', file);
      return from(Resource.BomDetailResource.uploadFile(data, bomID))
        .pipe(
          mergeMap(response => {
            return concat(
              of(uploadFileSuccess(response)),
              of(updateStep(1))
            );
          }),
          catchError(error => {
            const message = getMessageByErrorCode(error.response.data.code, '上傳失敗，請稍後再試');
            return concat(
              of(uploadFileFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message,
                level: 'error'
              })));
          })
        );
    }),
  );
};

// DELETE: Delete Temp BomItem
export const deleteTempEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___DELETE_TEMP_DATA),
    mergeMap((action) => {
      const { uploadTempID } = state$.value.bomDetail.uploadInfo;
      // 上傳失敗(或有欄位不正確)時，按Back不呼叫刪除Temp的API
      if (!uploadTempID) {
        return concat(
          of(resetModal()),
          of(deleteTempSuccess()),
        );
      }

      // 有上傳成功(所有欄位皆正確)的時候，按Back要呼叫刪除Temp的API
      return from(Resource.BomDetailResource.deleteTemp(uploadTempID))
        .pipe(
          mergeMap(response => {
            return concat(
              of(deleteTempSuccess()),
              of(resetModal()),
            );
          })
        );
    }),
    catchError(error => {
      return concat(
        of(deleteTempFailed(error.response)),
        of(NotificationSystemActions.pushNotification({
          message: '返回失敗，請稍後再試',
          level: 'error'
        }))
      );
    })
  );
};

// GET: uploadItemOwner & bomDesignee
export const getMappingInfoEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___GET_MAPPING_INFO),
    mergeMap((action) => {
      const { uploadInfo, bomID } = state$.value.bomDetail;
      return from(Resource.BomDetailResource.getMappingInfo(bomID, uploadInfo.uploadTempID))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getMappingInfoSuccess(response)),
              of(updateStep(1))
            );
          }),
          catchError(error => {
            return concat(
              of(getMappingInfoFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
  );
};

export const confirmBomItemEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___CONFIRM_UPLOAD_ITEM),
    mergeMap((action) => {
      console.log('-----------2--------------');
      const {
        uploadInfo,
        bomID,
        currentVersion: { value: versionid },
        selectedSkuNum: skuNum = 'sku1',
      } = state$.value.bomDetail;

      const { transferOwner } = action;
      return from(Resource.BomDetailResource.confirmBomItem(bomID, uploadInfo.uploadTempID, transferOwner))
        .pipe(
          mergeMap(response => {
            return concat(
              of(confirmBomItemSuccess(response)),
              of(toggleImportModal(false)),
              of(deleteTempSuccess()),
              of(getBomDetail({ bomID }, { versionid, skuNum })),
              of(NotificationSystemActions.pushNotification({
                message: 'Import成功',
                level: 'success'
              }))
            );
          }),
          catchError(error => {
            return concat(
              of(confirmBomItemFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '上傳資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
  );
};

export const downloadBomTemplateEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___DOWNLOAD_BOM_TEMPLATE),
    mergeMap((action) => {
      return from(Resource.BomDetailResource.downloadBomTemplate())
        .pipe(
          map(response => downloadBomTemplateSuccess(response)),
          catchError(error => {
            return concat(
              of(downloadBomTemplateFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '下載資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
  );
};

export const refreshBomVersionListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___REFRESH_VERSION_LIST),
    mergeMap((action) => {
      const { bomID } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.getBomVersionList(bomID))
          .pipe(
            mergeMap(res => {
              const versionOptions = _get(res, 'data', []).map(({ key: value, value: label }) => ({ value, label }));
              const currentVersion = versionOptions.filter(({ value }) => value === 'CURRENT')[0];
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getBomVersionListSuccess(versionOptions)),
                of(updateCurrentVersion(currentVersion))
              );
            }),
            catchError(error => {
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '取得版本清單有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};

/*
統一處理loading mask
*/
export const handelOnLoadingEpic = (action$, state$) => {
  const uploadFileAction = CommonUtils.getTemplateActionTypes('BOM___', 'UPLOAD_FILE');
  const deleteTempAction = CommonUtils.getTemplateActionTypes('BOM___', 'DELETE_TEMP_DATA');
  const getMappingInfoAction = CommonUtils.getTemplateActionTypes('BOM___', 'GET_MAPPING_INFO');
  const needLoadingList = [
    uploadFileAction.base,
    deleteTempAction.base,
    getMappingInfoAction.base,
  ];
  return action$.pipe(
    ofType(
      uploadFileAction.base, uploadFileAction.success, uploadFileAction.failed,
      deleteTempAction.base, deleteTempAction.success, deleteTempAction.failed,
      getMappingInfoAction.base, getMappingInfoAction.success, getMappingInfoAction.failed,
    ),
    mergeMap((action) => {
      if (needLoadingList.includes(action.type)) {
        return of(LoadingActions.toggleLoadingStatus(true));
      }
      return of(LoadingActions.toggleLoadingStatus(false));
    }),
    catchError(error => {
      console.log('[handelOnLoading] Epic Error', error);
    })
  );
};


// HOTFIX: RD 在n.7的版本不能編BOM表和partlist(為了不讓n.7變回n.5)
export const handlePermissionEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___GET_BOMITEMLIST_SUCCESS),
    mergeMap((action) => {
      const { bomData: { version } } = action;
      // console.log('[handlePermissionEpic]bomData', version);
      let versionRegex = /^V\d+\.7$/g;
      let validVersion = versionRegex.test(version);
      const userID = sessionStorage.getItem('userid');
      return concat(
        from(Resource.AllAccountResource.getUserInfoNop(userID))
          .pipe(
            mergeMap(response => {
              const { data: { userInfo } } = response;
              let isRDME = (userInfo.role_group === 'RD' && userInfo.role_name === 'ME') || false;
              let isRDMETMFM = (userInfo.role_group === 'RD' && userInfo.role_name === 'ME_TM_FM') || false;

              let canEditWhenNPointSeven = true;
              if (validVersion && isRDME) {
                canEditWhenNPointSeven = false;
              }
              if (validVersion && isRDMETMFM) {
                canEditWhenNPointSeven = false;
              }
              return of({
                type: actionTypes.BOM___CHECK_CAN_EDIT_WHEN_N_POINT_SEVEN_SUCCESS,
                canEditWhenNPointSeven,
                userInfo
              });
            }),
            catchError(error => {
              return of({
                type: actionTypes.BOM___CHECK_CAN_EDIT_WHEN_N_POINT_SEVEN_ERROR
              });
            })
          ));
    }),
    catchError(error => console.log('[handlePermissionEpic] EPIC ERROR >>>', error.message))
  );
};


export const informSourcerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___INFORM_SOURCER),
    mergeMap((action) => {
      const { bomId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.informSourcer(bomId))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '發送成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '系統錯誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          )
      );
    }), catchError(error => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(false)),
        of(NotificationSystemActions.pushNotification({
          message: '系統錯誤，請稍後再試',
          level: 'error'
        }))
      );
    }));
};


export const informCEEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___INFORM_CE),
    mergeMap((action) => {
      const { bomId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomDetailResource.informCE(bomId))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '發送成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '系統錯誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          )
      );
    }), catchError(error => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(false)),
        of(NotificationSystemActions.pushNotification({
          message: '上傳資料有誤，請稍後再試',
          level: 'error'
        }))
      );
    }));
};

export const getEmdmImageEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOM___GET_EMDM_IMAGES),
    mergeMap((action) => {
      const { bomId, sourceItemId, dataType } = action;
      const resourceExec = {
        part: Resource.BomManagementResource.getEmdmPartImage,
        item: Resource.BomManagementResource.getEmdmBomImage,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(resourceExec[dataType](bomId, sourceItemId))
          .pipe(
            mergeMap(({ data }) => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmdmBomImageSucccess(data))
              );
            }),
            catchError(error => {
              console.log('error', error);
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '系統錯誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          )
      );
    }), catchError(error => {
      console.log('error', error);
      return concat(
        of(LoadingActions.toggleLoadingStatus(false)),
        of(NotificationSystemActions.pushNotification({
          message: '系統錯誤，請稍後再試',
          level: 'error'
        }))
      );
    }));
};

export default [
  handelOnLoadingEpic,
  getBomDetailEpic,
  getBomItemListEpic,
  getBomAssignListEpic,
  getDropdownvalueEpic,
  getParentlevelEpic,
  approveBomEpic,
  completeVersionBomEpic,
  uploadFileEpic,
  deleteTempEpic,
  getMappingInfoEpic,
  confirmBomItemEpic,
  saveMEBomTableEpic,
  leaveEditModeEpic,
  downloadBomTemplateEpic,
  // handlePermissionEpic,
  refreshBomVersionListEpic,
  informCEEpic,
  informSourcerEpic,
  getEmdmImageEpic,
];

