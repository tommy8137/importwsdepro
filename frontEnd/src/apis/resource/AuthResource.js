import ApiService from '../ApiService';

const AuthResource = {
  login: (data) => {
    // console.log('Resource data >>>', data);
    return ApiService.post('/admin/login', { data, });
  },
  checkUserRole: (data) => ApiService.get(`/admin/permission/${data}`),
  logout: () => ApiService.post('/admin/logout'),
  checkRbac: () => ApiService.get('/admin/rbacpermission'),
};

export default AuthResource;

