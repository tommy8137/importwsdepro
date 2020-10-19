import ApiService from '../ApiService';

// 假資料：'../fakeData/FakeGeneratorData'，'../fakeData/FakeThermalCalcData'

// const debugStatus = {
//   getMeProjectList: false,
//   getMeOneProject: true,
//   getMePlmProjects: false,
//   downloadMeBomFile: false,
//   uploadMeBomFile: false,
//   createProject: false,
//   getThermalTables: false,
//   exportThermalCalculatorReport: false,
//   getThermalDefaultFields: true,
// };


const CostGeneratorResource = {
  exportThermalCalculatorReport: (data) => {
    // if (debugStatus.exportThermalCalculatorReport) {
    //   return CommonUtils.fakeApiHelper(1000, 'fail', FakeThermalCalcData.fakeExportThermalCalculatorReport());
    // }
    return ApiService.post('/costgen/result', {
      data,
      responseType: 'blob',
    });
  },
  getThermalTables: () => {
    // if (debugStatus.getThermalTables) {
    //   return CommonUtils.fakeApiHelper(1000, 'success', FakeThermalCalcData.fakeGetThermalTables());
    // }
    return ApiService.get('/costgen/database');
  },
  getThermalDefaultFields: (params) => {
    // if (debugStatus.getThermalDefaultFields) {
    //   return CommonUtils.fakeApiHelper(1000, 'success', FakeGeneratorData.fakeGetThermalDefaultFields());
    // }
    return ApiService.get('costgen/tables', {
      params
    });
  },
  // ME
  getMeProjectList: (params) => {
    // console.log('paramsparamsparams', params);
    // if (debugStatus.getMeProjectList) {
    //   return CommonUtils.fakeApiHelper(2000, 'success', FakeGeneratorData.fakeMeProjectList());
    // }
    return ApiService.get('cleansheet/projects/me', {
      params
    });
  },
  getMeOneProject: (projectCode) => {
    // if (debugStatus.getMeOneProject) {
    //   return CommonUtils.fakeApiHelper(1000, 'success', FakeGeneratorData.fakeMeOneProject(projectCode));
    // }
    return ApiService.get(`cleansheet/project/${projectCode}`);
  },
  getMePlmProjects: () => {
    // if (debugStatus.getMePlmProjects) {
    //   return CommonUtils.fakeApiHelper(1000, 'success', FakeGeneratorData.fakeMePlmProjects());
    // }
    return ApiService.get('/cleansheet/projects/plm');
  },

  downloadMeBomFile: (projectCode, excelInfo) => {
    // if (debugStatus.downloadMeBomFile) {
    //   // return CommonUtils.fakeApiHelper(1000, 'success', FakeGeneratorData.fakeMePlmProjects());
    // }
    return ApiService.post(`/cleansheet/project/${projectCode}/mebom`, {
      data: excelInfo,
      responseType: 'blob',
    });
  },
  uploadMeBomFile: (projectCode) => {
    // if (debugStatus.uploadMeBomFile) {
    //   // return CommonUtils.fakeApiHelper(1000, 'success', FakeGeneratorData.fakeMePlmProjects());
    // }
    return ApiService.put(`/cleansheet/project/${projectCode}/mebom`);
  },
  createProject: (projectInfo) => {
    // if (debugStatus.createProject) {
    //   // return CommonUtils.fakeApiHelper(1000, 'success', FakeGeneratorData.fakeMePlmProjects());
    // }
    return ApiService.post('cleansheet/project/me', {
      data: projectInfo
    });
  },
  // Database
  getTableTypeList: () => {
    return ApiService.get('/costgen/types');
  },

  getContentTables: (params) => {
    // console.log('API getTables', params);
    return ApiService.get('/costgen/tables', { params });
  },

  download: (type, name) => {
    return ApiService.get(`/costgen/table/${type}/${name}`,
      {
        responseType: 'blob',
      });
  },

  upload: (type, name, file) => {
    return ApiService.put(`/costgen/table/${type}/${name}`, {
      data: file,
    });
  },
};

export default CostGeneratorResource;
