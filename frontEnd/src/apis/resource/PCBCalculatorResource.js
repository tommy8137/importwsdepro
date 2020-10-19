import CommonUtils from '~~utils/CommonUtils';
import ApiService from '../ApiService';
import FakeCleanSheetData from '../fakeData/FakeCleanSheetData';

const debugStatus = {
  getPcbSpec: false,
  calculatePcb: false,
  exportPcb: false,
};

const PCBCalculatorResource = {

  getPcbSpec: (params) => {
    if (debugStatus.getPcbSpec) {
      return CommonUtils.fakeApiHelper(200, 'success', 'Get spec success');
    }
    return ApiService.get(
      `/eeBom/pcb/wistronpn/${params.wistronpn}`
    );
  },

  calculatePcb: (data) => {
    if (debugStatus.calculatePcb) {
      return CommonUtils.fakeApiHelper(200, 'success', FakeCleanSheetData.fakePCBCalculatorList());
    }
    return ApiService.post(
      '/cleansheet/pcb',
      { data }
    );
  },

  exportPcb: (infoList) => {
    if (debugStatus.exportPcb) {
      console.log('exportPcb data >>>', infoList);
    }
    return ApiService.post(
      '/eeBom/pcb/export',
      {
        data: { info: infoList },
        responseType: 'blob',
        header: {
          'Access-Control-Expose-Headers': 'Content-Disposition'
        },
      }
    );
  },

};

export default PCBCalculatorResource;

