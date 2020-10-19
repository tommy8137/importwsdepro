import CommonUtils from '~~utils/CommonUtils';
import FakeSettingData from '../fakeData/FakeSettingData';
import ApiService from '../ApiService';

const debugStatus = {
  doCreateRole: true,
  getRoles: false,
  getPolicy: false,
};


const SettingResource = {
  // GET RbacList by RoleGroup, RoleName
  getRbacList: (params) => {
    // return CommonUtils.fakeApiHelper(1000, 'success', FakeSettingData.fakeEEbomList());
    return ApiService.get('/admin/rbac/permission', { params });
  },
  // EEbomAssignment
  getEEbomList: () => {
    // return CommonUtils.fakeApiHelper(1000, 'success', FakeSettingData.fakeEEbomList());
    return ApiService.get('/setting/list');
  },
  searchUsers: (searchKeyword) => {
    return ApiService.get(`/setting/search/user?keyword=${searchKeyword}`);
  },

  updateUsers: (data) => {
    return ApiService.put('/setting/assign', { data });
  },

  // XraySpecTitle
  getSpecTitleList: (data) => {
    const { spec1, type1, type2 } = data;
    // return CommonUtils.fakeApiHelper(1000, 'success', FakeSettingData.fakeXraySpecList());
    return ApiService.get(`/setting/meSpec/list?type1=${type1}&type2=${type2}&spec1=${spec1}`);
  },

  getTypeIOptions: () => {
    return ApiService.get('/setting/type1/me?spec1');
  },

  getTypeIIOptions: (data) => {
    const { type1 } = data;
    return ApiService.get(`/setting/type2/me?type1=${type1}`);
  },

  getProductTypeOptions: (data) => {
    const { type1, type2 } = data;
    return ApiService.get(`/setting/getSpec01?type1=${type1}&type2=${type2}`);
  },

  updateSpecTitle: (data) => {
    return ApiService.put('/setting/meSpec/update', { data });
  },

  // Role management
  doCreateRole: (data) => {
    // if (debugStatus.doCreateRole) {
    //   return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeCreateRole(data));
    // }
    return ApiService.post(
      '/admin/rbac/role',
      { data }
    );
  },

  updateRole: (roleInfo) => {
    // if (debugStatus.doCreateRole) {
    //   return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeCreateRole(roleInfo));
    // }

    return ApiService.put(
      '/admin/rbac/role',
      { data: roleInfo }
    );
  },

  updatePolicyRole: (policyRoleInfo) => {
    // if (debugStatus.doCreateRole) {
    //   return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeCreateRole(policyRoleInfo));
    // }

    return ApiService.put(
      '/admin/rbac/policy/role',
      { data: policyRoleInfo }
    );
  },

  deleteRoles: (roleIds) => {
    // if (debugStatus.doCreateRole) {
    //   return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeCreateRole(roleId));
    // }

    // TODO: 串接API
    return ApiService.delete(
      `/admin/rbac/role/${roleIds.join(',')}`,
    );
  },

  // Role management & All Accounts
  getRoleGroup: () => {
    return ApiService.get('/admin/roleFilterType/group');
  },

  getRoleName: roleGroup => {
    return ApiService.get(`admin/roleFilterType/name/${roleGroup}`);
  },

  getRoles: (orderBy, roleGroups) => {
    const payload = { };

    if (orderBy) {
      payload.orderBy = orderBy;
    }
    if (roleGroups) {
      payload.roleGroup = roleGroups;
    }

    return ApiService.get(
      '/admin/rbac/role/list',
      { params: payload }
    );
  },

  getPolicy: (rsId) => {
    if (debugStatus.getPolicy) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeGetPolicy());
    }

    // TODO: 串接API
    return ApiService.get(
      `admin/rbac/policies?rs_id=${rsId}`
    );
  },

  getResources: (isRoot = true) => {
    // if (debugStatus.getPolicy) {
    //   return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeGetPolicy());
    // }

    // TODO: 串接API
    return ApiService.get(
      `/admin/rbac/resources?is_root=${isRoot}`
    );
  },

  getPolicyRole: (rsId) => {
    // if (debugStatus.getPolicy) {
    //   return CommonUtils.fakeApiHelper(200, 'success', FakeSettingData.fakeGetPolicy());
    // }

    // TODO: 串接API
    return ApiService.get(
      `/admin/rbac/policy/roles?rs_id=${rsId}`
    );
  }
};


export default SettingResource;
