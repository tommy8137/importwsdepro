import ApiService from '../ApiService';

const debugStatus = {
  loginBackDoor: false,
};

const BackDoorResource = {
  loginBackDoor: (emplid) => {
    if (debugStatus.loginBackDoor) {
      console.log('emplid', emplid);
    }
    return ApiService.post(
      '/admin/backLogin',
      {
        data: { username: emplid }
      }
    );
  },
  getFormauls: () => {
    return ApiService.get(
      '/utils/formulas',
      {
      }
    );
  },
  saveFormula: (name, formula) => {
    return ApiService.post(
      '/utils/formula/save',
      {
        data: { name, formula }
      }
    );
  },
  getCleansheetExportSettings: (name, formula) => {
    return ApiService.get(
      '/costgen/export/settings',
      {
        data: { name, formula }
      }
    );
  },

  getMetalList: () => {
    return ApiService.get('/test/partlist/metal/nb');
  },

  updateMetalList: (params) => {
    return ApiService.put(
      '/test/partlist/metal/202005',
      { params }
    );
  },

  findProjects: (params) => {
    return ApiService.get('/test/partlist/searchproject', { params });
  },
};

export default BackDoorResource;

