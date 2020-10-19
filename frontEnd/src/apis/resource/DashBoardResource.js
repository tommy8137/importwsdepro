import uuidv4 from 'uuid/v4';
import CommonUtils from '~~utils/CommonUtils';
import ApiService from '../ApiService';
import FakeDashBoardData from '../fakeData/FakeDashBoardData';

const debugStatus = {
  getProjectList: false,
  getFilterList: false,
  getListDetail: false,
  getModuleLists: false,
  getVersionLists: false,
  combinedVersion: false,
  downloadExcel: false,
};

const TIMEOUT = 30 * 60 * 1000;

const DashBoardResource = {
  /**
   * project view列表
   */
  getProjectList: (params) => {
    if (debugStatus.getProjectList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeDashBoardData.fakeProjectList());
    }
    return ApiService.get(
      '/spending/dashboard/eeBoms',
      { params },
    );
  },

  /**
   * filter下拉選單內容
   */
  getFilter: (item = '') => {
    if (debugStatus.getFilterList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeDashBoardData.fakeFilterList(item));
    }
    return ApiService.get(
      `/spending/dashBoardFilterType/${item}`,
    );
  },


  /**
   * dashboard頁面
   */
  getListDetail: (params) => {
    if (debugStatus.getListDetail) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeDashBoardData.fakeData());
    }
    return ApiService.get(
      '/spending/dashboardCost',
      { params }
    );
  },

  /**
   * dashboard頁面點開的modal資料
   * ME: `/spending/:bom_id/meModule/detail/:sku/:module_id`
   * EE: `/spending/eeCostV2/detail/:edm_version_id/:module_id`
   */
  getModuleLists: ({ meVersion: projectID, sku, edmVersion, moduleId: moduleID, columnType, listType: category, supplyType, manufacturer }) => {
    if (debugStatus.getModuleLists) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeDashBoardData.fakeModuleData(moduleID));
    }
    let url = '';
    let params = {};
    switch (columnType) {
      case 'ME':
        url = '/spending/meModule/detail';
        params = { projectID, moduleID, sku, manufacturer };
        break;
      case 'EE':
        url = '/spending/eeCostV2';
        params = { projectID: edmVersion, moduleID, category, supply_type: supplyType };
        break;
      case 'PCB':
        url = '/eeBom/pcb/personal/getPcbInfo';
        params = { edm_version_id: edmVersion, supply_type: supplyType };
        break;
      default:
        url = '/spending/meModule/detail';
        params = { projectID, moduleID, sku, manufacturer };
        break;
    }
    return ApiService.get(url, { params });
  },

  /**
   * 版本列表 (ME+EE)
   */
  getVersionLists: (params) => {
    if (debugStatus.getVersionLists) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeDashBoardData.fakeVersionList(params));
    }
    return ApiService.get(
      '/spending/version',
      { params }
    );
  },


  /**
   * 送出Version modal選擇的兩個要combined的版本 (要拿id才能去dashboard頁面)
   */
  combineVersions: (data) => {
    if (debugStatus.combinedVersions) {
      return CommonUtils.fakeApiHelper(200, 'inOrder', { id: uuidv4() }, 'record already exist');
    }
    return ApiService.post(
      '/spending/combine/version',
      { data }
    );

    // 這是有成功建立一個新的combine
    // return CommonUtils.fakeApiHelper(200, 'inOrder', { id: uuidv4() }, 'record already exist');
  },

  /**
   * 取得dashboard匯出
   */
  downloadDashboardExcel: ({ id }, params) => {
    if (debugStatus.downloadExcel) {
      return CommonUtils.fakeApiHelper(200, 'inOrder', { id: uuidv4() }, 'no data');
    }
    return ApiService.get(`/spending/dashboard/export/${id}`, {
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT,
      params,
    });
  },

  /**
   * 取得module detail匯出
   */
  downloadModuleDetailExcel: (params) => {
    if (debugStatus.downloadExcel) {
      return CommonUtils.fakeApiHelper(200, 'inOrder', { id: uuidv4() }, 'no data');
    }

    return ApiService.get('spending/dashboardItem/export', {
      params,
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT
    });
  },

  getSummarizeFilterList: () => {
    return ApiService.get(
      '/spending/dashboard/filter',
    );
  }
};


export default DashBoardResource;
