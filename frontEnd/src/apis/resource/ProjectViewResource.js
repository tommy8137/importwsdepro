import CommonUtils from '~~utils/CommonUtils';
import FakeProjectData from '../fakeData/FakeProjectData';

const ProjectViewResource = {
  getProjectList: (params) => {
    console.log('API get project list', params);
    // return CommonUtils.fakeApiHelper(1000, 'success', FakeProjectList.fakeProjectList(params));
    return FakeProjectData.fakeProjectList(params);
  },

  getFilterType: (role) => {
    return FakeProjectData.fakeFilterType(role);
  },

  getFilterValue: (params) => {
    return FakeProjectData.fakeFilterValue(params);
  },

  getFilterTypeList: () => {
    return FakeProjectData.fakeFilterTypeList();
  },

  getFilterValueList: () => {
    return FakeProjectData.fakeFilterValueList();
  },
};

export default ProjectViewResource;
