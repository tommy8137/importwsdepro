import ApiService from '~~apis/ApiService';

const CommonPoolResources = {
  upload: (data) => ApiService.post('/database/eebom/connector/commonpool', { data }),
  download: (commonId) => ApiService.get(`/database/eebom/export/commonpool/${commonId}`, {
    responseType: 'blob',
    header: {
      'Access-Control-Expose-Headers': 'Content-Disposition',
    } }),
  getList: () => ApiService.get('/database/eebom/commonpool'),
};

export default CommonPoolResources;
