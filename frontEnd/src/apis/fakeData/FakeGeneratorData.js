const fakeMeProjectList = () => {
  const numberOfProjects = 10;
  const projectList = [...Array(numberOfProjects).keys()].map((item) => {
    return {
      projectName: `Bucky N5 ${item}`,
      projectCode: `4PD0F701100001---${item}`,
      Stage: 'C0/RFI',
      BG: 'CPBG',
      costInfo: 'USD 950.0/950',
      product: 'NB',
      productSpec: '14',
      confirmedBy: 'Andy Lin',
      submitBy: 'Andy Lin',
      submitDate: '20180922 11:11:11',
      currency: 'USD',
      systemCost: 950.0,
      sourcerCost: 950.0,
      stageCode: 'C2',
      stageName: 'RFI'
    };
  });
  return {
    numberOfProjects,
    projectList
  };
};


const fakeMeOneProject = (projectCode) => ({
  projectCode,
  projectName: 'SOFHD_42_MT01_PA',
  product: 'TV',
  bg: 'CPBG',
  stage: 'C0',
  stageName: 'RFI',
  productSpec: '14',
  stageList: [
    {
      stage: 'C0',
      stageNmae: 'RFI',
      currentVersion: ' V0.2',
      updateBy: 'Travis Wu',
      lastUpdateTime: '2018/08/09 13:50:30',
      // 有缺的部分
      projectStartDate: '2018/08/09 13:50:30',
    },
    {
      stage: 'C1',
      stageNmae: 'RFQ',
      currentVersion: 'V0.3',
      updateBy: 'Travis Wu',
      lastUpdateTime: '2018/08/09 13:50:30',
      isActive: true,
      // FIXME 確認後端的key
      projectStartDate: '2018/08/09 13:50:30',
      // FIXME 確認後端的key
      excelList: [
        {
          name: 'PreBOM',
          lastUpdateTime: '2018/08/09 13:50:30',
          updateBy: 'Travis Wu',
          version: 'V0.02'
        },
        {
          name: 'Tooling',
          lastUpdateTime: '2018/08/09 13:50:30',
          updateBy: 'Travis Wu',
          version: 'V0.03'
        },
        {
          name: 'Thermal',
          lastUpdateTime: '2018/08/09 13:50:30',
          updateBy: 'Travis Wu',
          version: 'V0.01'
        },
        {
          name: 'Speaker',
          lastUpdateTime: '2018/08/09 13:50:30',
          updateBy: 'Travis Wu',
          version: 'V0.05'
        },
      ]
    },
    {
      stage: 'C2',
      stageNmae: 'LAB',
      currentVersion: ' V0.2',
      updateBy: 'Travis Wu',
      lastUpdateTime: '2018/08/09 13:50:30',
      // 有缺的部分
      projectStartDate: '2018/08/09 13:50:30',
    },
    {
      stage: 'C3',
      stageNmae: 'DB',
      currentVersion: ' V0.2',
      updateBy: 'Travis Wu',
      lastUpdateTime: '2018/08/09 13:50:30',
      // 有缺的部分
      projectStartDate: '2018/08/09 13:50:30',

    },
    {
      stage: 'C4',
      stageNmae: 'ENG',
      currentVersion: ' V0.2',
      updateBy: 'Travis Wu',
      lastUpdateTime: '2018/08/09 13:50:30',
      // 有缺的部分
      projectStartDate: '2018/08/09 13:50:30',
    },
    {
      stage: 'C5',
      stageNmae: 'PD',
      currentVersion: ' V0.2',
      updateBy: 'Travis Wu',
      lastUpdateTime: '2018/08/09 13:50:30',
      // 有缺的部分
      projectStartDate: '2018/08/09 13:50:30',
    },
    {
      stage: 'C6',
      stageNmae: 'MP',
      currentVersion: ' V0.2',
      updateBy: 'Travis Wu',
      lastUpdateTime: '2018/08/09 13:50:30',
      // 有缺的部分
      projectStartDate: '2018/08/09 13:50:30',
    },
  ]
});


const fakeMePlmProjects = () => {
  return {
    projectList: [
      {
        projectCode: '1PD00P41A099',
        projectName: 'WPBD001',
        product: 'TV',
        stage: 'C6',
        stagename: 'RRR',
        // 要補
        bg: 'CPBG',
      },
      {
        projectCode: '1PD00P41A092',
        projectName: 'WPBD0012',
        product: 'TV',
        stage: 'C6',
        stagename: null,
        // 要補
        bg: 'CPBG',
      },
      {
        projectCode: '1PD00P41A050',
        projectName: 'SITTestPJ50',
        product: 'PDA_Smart.Phone',
        stage: 'C6',
        stagename: null,
        // 要補
        bg: 'CPBG',
      },
      {
        projectCode: '1PD00P41A0504',
        projectName: 'SITTestPJ503',
        product: 'PDA_Smart.Phone',
        stage: 'C6',
        stagename: null,
        // 要補
        bg: 'SBG',
      }
    ]
  };
};

const fakeGetThermalDefaultFields = () => {
  return {
    message: 'good'
  };
};


export default {
  fakeMeProjectList,
  fakeMeOneProject,
  fakeMePlmProjects,
  fakeGetThermalDefaultFields
};
