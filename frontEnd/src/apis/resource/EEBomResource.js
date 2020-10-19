import CommonUtils from '~~utils/CommonUtils';
import ApiService from '../ApiService';

const TIMEOUT = 1000 * 30;


const EEBomResource = {
  // type1 + type2 的列表
  getTypesList: () => {
    return ApiService.get('/eeBom/detail/project/types');
  },
  // eebom version 進版
  getNextEdmVersionId: (edmVersionId) => {
    return ApiService.get(
      `/eeBom/upgrade/edmVersion/${edmVersionId}`,
    );
  },
  // 取得EEbom edm version list
  getEdmVersionIdList: (params) => {
    const { eeBomProjectID, edmVersion } = params;
    return ApiService.get(
      `/eeBom/edm/statusversion/${eeBomProjectID}/${edmVersion}`,
    );
  },
  // 取得EE Bom Detail Tab
  getEEBomDetailTab: (params) => {
    const { eeBomProjectID, edmVersionID } = params;
    return ApiService.get(
      `/eeBom/detail/project/tab/projectID/${eeBomProjectID}/edmID/${edmVersionID}`,
    );
  },
  // 取得EE Bom Detail Tab
  getEEBomDetailTable: ({ tabType, edmVersionId, orderBy }) => {
    return ApiService.get(
      `/eeBom/detail/project/type/${tabType}/edm_version/${edmVersionId}`,
      { params: { orderBy } }
    );
  },
  // 更新is_personal_check
  updatePersonalCheck: (idList) => {
    const data = {
      info: idList.map(id => ({
        id,
        is_personal_checked: true
      }))
    };
    return ApiService.put('/eeBom/detail/project/personal/check', {
      data,
      timeout: TIMEOUT
    });
  },
  /*
  format info: {
    "id": "084fb402-86f1-4d4c-b1fb-4c6d2c27f707-",
    "currrent_price_adj_percentage": 22,
    "ce_cost": null,
    "remark": null,
    "is_personal_checked": true,
    "is_personal_submitted": true,
    "is_reject": false,
    "leader_checked_status": "approve",
    "leader_submitted_status": "approve"
  }
  */
  updateEEBomTableItems: (info) => {
    return ApiService.post('/eeBom/detail/project/modify',
      {
        data: { info },
        timeout: TIMEOUT
      });
  },
  /*
  format {
    is_approver: true,
    info: {
    "id": "084fb402-86f1-4d4c-b1fb-4c6d2c27f707-",
    "currrent_price_adj_percentage": 22,
    "ce_cost": null,
    "remark": null,
    "is_personal_checked": true,
    "is_personal_submitted": true,
    "is_reject": false,
    "leader_checked_status": "approve",
    "leader_submitted_status": "approve"
    }
  }
  */
  updateEEBomApproverTableItems: (info) => {
    return ApiService.post('/eeBom/detail/project/modify', {
      data: {
        info,
        is_approver: true,
      },
      timeout: TIMEOUT
    });
  },
  updatePersonalSubmit: (info) => {
    return ApiService.put('/eeBom/detail/project/personal/submitted', {
      data: { info },
      timeout: TIMEOUT
    });
  },
  updateLeaderChecked: (idList) => {
    const data = {
      info: idList.map(id => ({
        id,
        is_leader_checked: true
      }))
    };
    return ApiService.put('/eeBom/detail/project/leader/check', {
      data,
      timeout: TIMEOUT
    });
  },
  leaderApproveBom: (bomType, edmVersionId, versionRemark) => {
    return ApiService.post(`/eeBom/detail/project/approve/type/${bomType}/edm_version/${edmVersionId}`, {
      data: versionRemark ? { versionRemark } : null,
      timeout: TIMEOUT
    });
  },
  getViewAllData: params => {
    const { columnType = 'pn', edmVersionID, orderBy, isOdmParts = true } = params;
    if (columnType === 'pn') {
      return ApiService.get(`/eeBom/detail/project/all/type/${columnType}/edm_version/${edmVersionID}`, {
        params: { orderBy, isOdmParts }
      });
    }
    return ApiService.get(`/eeBom/detail/project/all/type/${columnType}/edm_version/${edmVersionID}`, {
      params: { isOdmParts }
    });
  },
  // PCB
  updateEEbomPCB: (data) => {
    return ApiService.put('eeBom/pcb', { data });
  },
  createEEbomPCB: (data) => {
    return ApiService.post('eeBom/pcb', { data });
  },
  getEEbomPCBList: (id) => {
    return ApiService.get(`eeBom/pcb/personal/getPcbInfo?edm_version_id=${id}`);
  },
  deleteEEbomPCB: (idList) => {
    return ApiService.post('eeBom/pcb/personal/delete', { data: { ids: idList } });
  },
  getEEbomPCBType2: (id) => {
    return ApiService.get('eeBom/pcb/type2');
  },
  updateEEbomPCBPersonalCheck: (data) => {
    return ApiService.put('eeBom/pcb/personal/check/', { data });
  },
  updateEEbomPCBPersonalSubmit: (data) => {
    return ApiService.put('eeBom/pcb/personal/submitted/', { data });
  },
  updateEEbomPCBLeaderCheck: (data) => {
    return ApiService.put('/eeBom/pcb/leader/check/', { data });
  },
  updateEEbomPCBLeaderSubmit: (data) => {
    return ApiService.put('/eeBom/pcb/leader/submitted/', { data });
  },
  updateEEbomLeaderSubmit: (data) => {
    return ApiService.put('/eeBom/detail/project/leader/submitted/', {
      data,
      timeout: TIMEOUT
    });
  },
  getPcbLayout: (layoutName) => {
    return ApiService.get(`/bom/partlistlayout/${layoutName}`);
  },
  getPCBSpecByPN: (wistronpn, edmVersionID, plant) => {
    return ApiService.get(`/eeBom/pcb/wistronpn/${wistronpn}/edmVersion/${edmVersionID}/plant/${plant}`);
  },
  exportEEBomExcel: (edmVersionId) => {
    return ApiService.get(`/eeBom/export/me/${edmVersionId}`, {
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: 5 * 60 * 1000
    });
  },
  exportEEAlternativeExcel: (edmVersionId) => {
    return ApiService.get(`/eeBom/export/alternative/${edmVersionId}`, {
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: 5 * 60 * 1000
    });
  },
  getCostByCopy: (data) => {
    const { type, edmVersionId, weeks } = data;
    return ApiService.get(`/eeBom/copycost/type/${type}/edm_version/${edmVersionId}`, { params: { weeks } });
  },
  triggerRefreshPrice: (version) => {
    return ApiService.post('/eeBom/detail/refreshBom/ ',
      {
        data: { edm_version_id: version },
        timeout: 5 * 60 * 1000,
      });
  },
};


const DebugEEBomResource = {
  getEEBomDetailTab: () => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeGetEEBomDetailTab());
    });
  },
  getEEBomDetailTable: (tabType) => {
    // if (tabType === 'personal') {
    //   return import('../fakeData/FakeEEBomData').then(module => {
    //     return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeEEBomPersonalPageData());
    //   });
    // }
    // if (tabType === 'approver') {
    //   return import('../fakeData/FakeEEBomData').then(module => {
    //     return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeEEBomApproverData());
    //   });
    // }
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeEEBomPersonalPageData());
    });
  },
  // 更新is_personal_check
  updatePersonalCheck: (idList) => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeUpdatePersonalCheck(idList));
    });
  },
  updateEEBomTableItems: () => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.updateEEBomTableItems());
    });
  },
  updateEEBomApproverTableItems: () => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.updateEEBomApproverTableItems());
    });
  },
  updatePersonalSubmit: (data) => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeUpdatePersonalSubmit(data));
    });
  },
  updateLeaderChecked: (idList) => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.updateLeaderChecked(idList));
    });
  },
  leaderApproveBom: () => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.leaderApproveBom());
    });
  },
  getViewAllData: (columnType) => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeViewAllData(columnType));
    });
  },
  updateEEbomPCB: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  createEEbomPCB: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  getEEbomPCBList: () => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeGetEEbomPCBList());
    });
  },
  deleteEEbomPCB: () => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeGetEEbomPCBList());
    });
  },
  getEEbomPCBType2: () => {
    return import('../fakeData/FakeEEBomData').then(module => {
      return CommonUtils.fakeApiHelper(200, 'success', module.default.fakeGetEEbomPCBType2());
    });
  },
  updateEEbomPCBPersonalCheck: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  updateEEbomPCBPersonalSubmit: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  updateEEbomPCBLeaderCheck: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  getPcbLayout: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  getPCBSpecByPN: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  updateEEbomLeaderSubmit: () => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  exportEEBomExcel: (edmVersionId) => {
    return CommonUtils.fakeApiHelper(2000, 'success', true);
  },
  triggerRefreshPrice: (edmVersionId) => {
    return import('../fakeData/FakeEEBomData').then(data => {
      return CommonUtils.fakeApiHelper(5 * 60 * 1000, 'fail', 'success', 'Bom already start editing');
    });
  },
};


/* ======= Setting ==================================================== */

let debugStatus = {
  ...Object.keys(EEBomResource).reduce((prev, curr) => ({ ...prev, [curr]: false }), {}),
  // getEEBomDetailTable: true
  // triggerRefreshPrice: true,
};

if (process.env.NODE_ENV !== 'development') {
  debugStatus = null;
}


const FinalResource = CommonUtils.mergeResourceProxy(EEBomResource, DebugEEBomResource, debugStatus);
export default FinalResource;
