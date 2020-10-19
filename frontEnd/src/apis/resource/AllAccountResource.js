import CommonUtils from '~~utils/CommonUtils';
import FakeSettingData from '../fakeData/FakeSettingData';
import ApiService from '../ApiService';

const debugStatus = {
  getUserList: false,
  getType1Menus: false,
  getProductTypeMenus: false,
};

const AllAccountResource = {
  getUserList: (params) => {
    if (debugStatus.getUserList) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeAccountList(params.column));
    }
    return ApiService.get(
      '/admin/users', { params }
    );
  },
  // Permission
  getUserInfo: (emplid) => {
    return ApiService.get(`/admin/user/${emplid}`);
  },
  getUserInfoNop: (emplid) => {
    return ApiService.get(`/admin/nop/user/${emplid}`);
  },
  updateUserInfo: (info) => {
    return ApiService.put(`/admin/user/${info.emplid}`, { data: info.data });
  },
  removeUser: (emplid) => {
    return ApiService.delete(`/admin/user/${emplid}`);
  },
  createUser: (userToAdd) => {
    return ApiService.post('/admin/user', { data: userToAdd });
  },
  // All
  getUsers: (params) => {
    // if (debugStatus.getUsers) {
    //   return CommonUtils.fakeApiHelper(2000, 'inOrder', FakePermissionData.fakeUsersList());
    // }
    return ApiService.get(
      '/admin/users',
      {
        params
      }
    );
  },
  // Create user form
  getfilteredData: (filterInfo) => {
    return ApiService.post('/admin/search/user', { data: filterInfo });
  },
  // Contact Window
  getGroup: () => {
    // return CommonUtils.fakeApiHelper(2000, 'success', FakeContactWindow.fakeGroup());
    return ApiService.get('/admin/contactwindowlist');
  },
  // GET TYPE1 MENU LIST
  getType1Menus: params => {
    if (debugStatus.getType1Menus) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeType1Menus());
    }
    return ApiService.get('/permission/type1/scope',
      {
        params
      }
    );
  },
  // GET PRODUCT TYPE MENUS LIST
  getProductTypeMenus: params => {
    if (debugStatus.getProductTypeMenus) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeProductTypeMenus());
    }
    return ApiService.get('/permission/product/scope',
      {
        params
      }
    );
  },

  // add TYPE1
  addType1: data => {
    return ApiService.post('/permission/user/type1', { data });
  },
  // remove TYPE1
  removeType1: data => {
    return ApiService.put('/permission/user/type1', { data });
  }
};

export default AllAccountResource;
