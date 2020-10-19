import FileSaver from 'file-saver';
import * as moment from 'moment';

export const actionTypes = {
  // get table type list
  COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST: 'COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST',
  COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_SUCCESS: 'COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_SUCCESS',
  COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_FAILED: 'COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_FAILED',
  // get content list
  COSTGENERATOR_DATABASE___GET_CONTENT_TABLES: 'COSTGENERATOR_DATABASE___GET_CONTENT_LIST',
  COSTGENERATOR_DATABASE___GET_CONTENT_TABLES_SUCCESS: 'COSTGENERATOR_DATABASE___GET_CONTENT_LIST_SUCCESS',
  COSTGENERATOR_DATABASE___GET_CONTENT_TABLES_FAILED: 'COSTGENERATOR_DATABASE___GET_CONTENT_LIST_FAILED',
  // update
  COSTGENERATOR_DATABASE___UPDATE_SORT_INFO: 'COSTGENERATOR_DATABASE___UPDATE_SORT_INFO',
  COSTGENERATOR_DATABASE___UPDATE_ACTIVE_TABLE_TYPE: 'COSTGENERATOR_DATABASE___UPDATE_ACTIVE_TABLE_TYPE',
  // download
  COSTGENERATOR_DATABASE___DOWNLOAD: 'COSTGENERATOR_DATABASE___DOWNLOAD',
  COSTGENERATOR_DATABASE___DOWNLOAD_SUCCESS: 'COSTGENERATOR_DATABASE___DOWNLOAD_SUCCESS',
  COSTGENERATOR_DATABASE___DOWNLOAD_FAILED: 'COSTGENERATOR_DATABASE___DOWNLOAD_FAILED',
  // upload
  COSTGENERATOR_DATABASE___UPLOAD: 'COSTGENERATOR_DATABASE___UPLOAD',
  COSTGENERATOR_DATABASE___UPLOAD_SUCCESS: 'COSTGENERATOR_DATABASE___UPLOAD_SUCCESS',
  COSTGENERATOR_DATABASE___UPLOAD_FAILED: 'COSTGENERATOR_DATABASE___UPLOAD_FAILED',
};

export function getTableTypeList() {
  // console.log('ACTION getTableTypeList');
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST,
  };
}

export function getTableTypeListSuccess(response) {
  // console.log('ACTION getTableTypeList success');
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_SUCCESS,
    tableTypeList: response.data.list,
  };
}

export function getTableTypeListFailed(response) {
  console.log('ACTION getTableTypeList failed >>>', response.data);
  const error =  response.data;
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST_FAILED,
    error
  };
}

export function getContentTables(params) {
  // console.log('ACTION getContentTables');
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES,
    params
  };
}

export function getContentTablesSuccess(response) {
  console.log('ACTION getContentTables success');
  const tableList = response.data.list[0].tables.map(item => {
    return {
      ...item,
      updateDate: moment.utc(item.updateDate).local().format('YYYY-MM-DD HH:mm')
    };
  });
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES_SUCCESS,
    contentTables: tableList,
  };
}

export function getContentTablesFailed(response) {
  console.log('ACTION getContentTables failed >>>', response.data);
  const error =  response.data;
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES_FAILED,
    error
  };
}

export function updateSortInfo(sortInfo) {
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___UPDATE_SORT_INFO,
    sortInfo
  };
}

export function updateActiveTableType(tableType) {
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___UPDATE_ACTIVE_TABLE_TYPE,
    tableType
  };
}

export function download(tableType, tableName) {
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___DOWNLOAD,
    tableType,
    tableName,
  };
}

export function downloadSuccess(response) {
  console.log('ACTION download success');
  const { 'content-type': type, 'content-disposition': disposition } = response.headers;
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    regexResult[1]
  );
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___DOWNLOAD_SUCCESS,
  };
}

export function downloadFailed(response) {
  console.log('ACTION download failed >>>', response.data);
  const error =  response.data;
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___DOWNLOAD_FAILED,
    error
  };
}

export function upload(tableType, tableName, file) {
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___UPLOAD,
    tableType,
    tableName,
    file
  };
}

export function uploadSuccess(response) {
  console.log('ACTION upload success');
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___UPLOAD_SUCCESS,
  };
}

export function uploadFailed(response) {
  console.log('ACTION upload failed >>>', response);
  const error = response.data;
  return {
    type: actionTypes.COSTGENERATOR_DATABASE___UPLOAD_FAILED,
    error
  };
}

export default {};
