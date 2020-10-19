import ApiService from '~~apis/ApiService';

const TemporaryFilesResource = {
  upload: (data) => ApiService.post('/database/eebom/temporary', { data }),
  download: (temporaryId) => ApiService.get(`/database/eebom/temporary/${temporaryId}`, {
    responseType: 'blob',
    header: {
      'Access-Control-Expose-Headers': 'Content-Disposition',
    } }),
  getList: () => ApiService.get('/database/eebom/temporary'),
  delete: (temporaryId) => ApiService.delete(`/database/eebom/temporary/${temporaryId}`),

};

export default TemporaryFilesResource;
