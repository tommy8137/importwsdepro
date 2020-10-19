import CommonUtils from '~~utils/CommonUtils';
import FakeBomList from '../fakeData/FakeBomList';
import ApiService from '../ApiService';

const debugStatus = {
  getEeBomPlantCodeList: false,
  getBomParams: false,
  putBomParams: false,
  getFilterData: false,
  getSourcerPermissionList: false,
  setSourcerPermission: false,
  getUserList: false,
};

const BomManagementResource = {
  getUserList: (params) => {
    return ApiService.get(
      '/bom/sourcerList', { params }
    );
  },
  getBomList: (params) => {
    // console.log('API get bom list', params);
    // if (params.role === 'EE') {
    //   return CommonUtils.fakeApiHelper(1000, 'success', FakeBomList.fakeBomProjects(params));
    // }
    return ApiService.get(
      '/bom/bomDatasBySearch',
      { params }
    );
  },

  getFilterType: (role) => {
    // console.log('API get filter type >>>', role);
    return ApiService.get(
      `/bom/bomFilterType?role=${role}`,
    );
  },

  getfilterValue: (params) => {
    // console.log('API get filter value >>>', params);
    return ApiService.get(
      `/bom/bomFilterType/${params.type}?role=${params.role}`,
    );
  },

  /**
   * create bom 的基本資料 (下拉選單)
   */
  getCreateBomBaseData: () => ApiService.get('/bom/bomBaseData/'),

  /**
   * create bom 的 (auto complete)
   */
  getCreateBomUsers: (type, keyword) => ApiService.get(`/bom/bomBaseData/user/${type}?keyword=${keyword}`),
  /**
   * create bom
   */
  createBomProject: (bomProject, bomDesignee) => ApiService.post('/bom/bomDatas', { data: { bomProject, bomDesignee } }),
  /**
   * 取得bom的詳細資料 by id
   */
  getBomDetail: id => ApiService.get(`/bom/bomDatas/${id}`),
  /**
   * update bom
   */
  updateBomProject: (data, id) => ApiService.put(`/bom/bomDatas/${id}`, { data }),

  /* ==================================
   *  以下 for EE BOM
   * ================================== */
  // 取得版本清單
  getVersionList: (id) => {
    // return CommonUtils.fakeApiHelper(1000, 'success', FakeBomList.fakeBomVersions(id));
    return ApiService.get(
      `/eeBom/edm/version/${id}`,
    );
  },

  // 取得EE Bom Project資料 (for view information)
  getEeBomDetail: (id, edmVersionId) => {
    // return CommonUtils.fakeApiHelper(1000, 'success', FakeBomList.fakeEEBomDetail(id));
    if (edmVersionId) {
      // 在eebom detail裡面，用 edmVersionId 取得小版本的資料
      return ApiService.get(`/eeBom/main/project/${id}/version/${edmVersionId}`);
    }
    // 在eebom project list裡面, 取得eebom project的資料
    return ApiService.get(`/eeBom/main/project/${id}/`);
  },

  // 修改EE Bom Project 或 AVL
  updateEeBomProject: (data, id, edmVersionId = null) => {
    // return CommonUtils.fakeApiHelper(1000, 'success', { id });
    if (edmVersionId) {
      return ApiService.put(
        `/eeBom/main/project/${id}/version/${edmVersionId}`,
        { data }
      );
    }
    return ApiService.put(
      `/eeBom/main/project/${id}`,
      { data }
    );
  },

  /**
   * 取得plant code 下拉
   */
  getEeBomPlantCodeList: (id = '') => {
    if (debugStatus.getEeBomPlantCodeList) {
      return CommonUtils.fakeApiHelper(1000, 'success', FakeBomList.fakePlantCodeList());
    }
    return ApiService.get(`/eeBom/main/project/plantcode/${id}`);
  },
  getBomParams: (bomId) => {
    if (debugStatus.getBomParams) {
      return CommonUtils.fakeApiHelper(600, 'success', FakeBomList.fakeBomParams());
    }
    return ApiService.get(`/bom/bomParams/${bomId}`);
  },
  putBomParams: (bomId, data) => {
    if (debugStatus.putBomParams) {
      return CommonUtils.fakeApiHelper(600, 'success', {});
    }
    return ApiService.put(`/bom/bomParams/${bomId}`, { data });
  },

  pinBomProject: (data) => {
    return ApiService.post('/bom/favorite', { data });
  },
  unpinBomProject: (pinId) => {
    return ApiService.delete(`/bom/favorite/${pinId}`);
  },
  archiveBomProject: (data) => {
    return ApiService.post('/bom/archive', { data });
  },
  unarchiveBomProject: (data) => {
    return ApiService.delete(`/bom/archive/${data}`);
  },
  downloadSpaceRate: (product = '', customer = '', stage = '', dateFrom = '', dateTo = '') => {
    return ApiService.post(`/bom/spacerate/export/bysearch?product=${product}&customer=${customer}&stage=${stage}&after=${dateFrom}&before=${dateTo}`,
      {
        responseType: 'blob',
        header: {
          'Access-Control-Expose-Headers': 'Content-Disposition'
        },
        timeout: 600 * 1000,
      });
  },
  getFilterData: (params = {}) => {
    const { product = '', customer = '', stage = '', dateFrom = '', dateTo = '' } = params;
    if (debugStatus.getFilterData) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeBomList.fakeFilterData());
    }
    return ApiService.get(`/bom/spacerate/export/filterType?product=${product}&customer=${customer}&stage=${stage}&after=${dateFrom}&before=${dateTo}`);
  },
  getSourcerPermissionList: (bomId) => {
    if (debugStatus.getSourcerPermissionList) {
      return CommonUtils.fakeApiHelper(600, 'success', {
        sourcer_permission: [{
          emplid: '10411011',
          name_a: 'AMY WJ PENG',
          email_address: 'Amy_WJ_Peng@wistron.com'
        },
        ]
      }
      );
    }
    return ApiService.get(`/bom/sourcerPermission/${bomId}`);
  },
  setSourcerPermission: (data) => {
    if (debugStatus.setSourcerPermission) {
      return CommonUtils.fakeApiHelper(600, 'success', true);
    }
    return ApiService.put('/bom/sourcerPermission', { data });
  },
  downloadEmdmEditHistory: (bomId) => {
    return ApiService.get(`/bom/${bomId}/bomHistory`, {
      responseType: 'blob',
    });
  },
  getEmdmBomImage: (bomID, sourceItemID) => {
    return ApiService.get(`/bom/${bomID}/bomItemImage/${sourceItemID}/item`);
  },
  getEmdmPartImage: (bomID, sourceItemID) => {
    return ApiService.get(`/bom/${bomID}/bomItemImage/${sourceItemID}/partlist`);
  },
};

export default BomManagementResource;

