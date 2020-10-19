import ApiService from '~~apis/ApiService';

const AvlListResource = {
  upload: (data) => ApiService.post('/database/eebom/avl', { data }),
  download: (avlId) => ApiService.get(`/database/eebom/avl/${avlId}`, {
    responseType: 'blob',
    header: {
      'Access-Control-Expose-Headers': 'Content-Disposition',
    } }),
  getList: () => ApiService.get('/database/eebom/avl'),

};

export default AvlListResource;
