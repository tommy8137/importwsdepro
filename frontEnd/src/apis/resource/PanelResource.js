import CommonUtils from '~~utils/CommonUtils';
import ApiService from '../ApiService';
import FakePanelData from '../fakeData/FakePanelData';
import fakeMonthData from '../fakeData/fakeMonthAnalysisResult.json';
import fakeWaterfallData from '../fakeData/fakeWaterfallAnalysisResult.json';
import fakeReportRequest from '../fakeData/fakeSpendingRequest.json';

const debugStatus = {
  getPlants: false,
  getSourcers: false,
  getProcureTypes: false,
  getSupplyTypes: false,
  getWaterfallAnalysis: false,
  getMonthAnalysis: false,
  getRawXlsx: false,
  getReportXlsx: false,
};

const TIMEOUT = 30 * 60 * 1000;
const TIMEOUT2 = 30 * 1000;

const PanelResource = {
  getPlants: () => {
    if (debugStatus.getPlants) {
      return CommonUtils.fakeApiHelper(200, 'success', FakePanelData.fakePlantList());
    }
    return ApiService.get('/spending/plants', {
      timeout: TIMEOUT2
    });
  },
  getSourcers: () => {
    if (debugStatus.getSourcers) {
      return CommonUtils.fakeApiHelper(200, 'success', FakePanelData.fakeSourcerList());
    }
    return ApiService.get('/spending/users', {
      timeout: TIMEOUT2
    });
  },
  getProcureTypes: (data) => {
    if (debugStatus.getProcureTypes) {
      return CommonUtils.fakeApiHelper(1000, 'inOrder', FakePanelData.fakeProcureTypes());
    }
    // TODO api
    // console.log('[getProcureTypes]送出去的事data', data);
    return ApiService.post('/spending/types', {
      data,
      timeout: TIMEOUT2
    });
  },
  getSupplyTypes: () => {
    if (debugStatus.getSourcers) {
      return CommonUtils.fakeApiHelper(200, 'success', FakePanelData.fakeGetSupplyTypes());
    }
    return ApiService.get('/spending/supplys');
  },
  getWaterfallAnalysis: (data) => {
    console.log('data', data);
    if (debugStatus.getWaterfallAnalysis) {
      // return CommonUtils.fakeApiHelper(200, 'success', FakePanelData.fakeGetWaterfallAnalysis());
      return CommonUtils.fakeApiHelper(200, 'success', fakeWaterfallData);
    }
    return ApiService.post('/spending/analysis/waterful', {
      data,
      timeout: TIMEOUT
    });
  },
  getMonthAnalysis: (data) => {
    if (debugStatus.getMonthAnalysis) {
      // return CommonUtils.fakeApiHelper(200, 'success', FakePanelData.fakeGetMonthAnalysis());
      return CommonUtils.fakeApiHelper(200, 'success', fakeMonthData);
    }
    return ApiService.post('/spending/analysis/month', {
      data,
      timeout: TIMEOUT
    });
  },

  downloadRawData: (data) => {
    // console.log('resource 收到', data);
    return ApiService.post('/spending/analysis/rawData', {
      data: debugStatus.getRawXlsx ? fakeReportRequest : data,
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT
    });
  },

  downloadSummaryReport: (data) => {
    // console.log('resource 收到', data);
    return ApiService.post('/spending/analysis/report', {
      data: debugStatus.getReportXlsx ? fakeReportRequest : data,
      responseType: 'blob',
      header: {
        'Access-Control-Expose-Headers': 'Content-Disposition'
      },
      timeout: TIMEOUT
    });
  },
};

export default PanelResource;
