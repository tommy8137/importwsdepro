import uuidv4 from 'uuid/v4';
import _random from 'lodash/random';
import _sample from 'lodash/sample';


// dashboard
const fakeData = () => {
  const modulesA = [...Array(9).keys()].map(item => {
    return {
      module: `Plastic${item}`,
      suggestion: 2,
      total_last: 3,
    };
  });
  const modulesB = [...Array(7).keys()].map(item => {
    return {
      module: `CPU${item}`,
      suggestion: 2,
      total_last: 3,
    };
  });
  const modulesC = [...Array(6).keys()].map(item => {
    return {
      module: `Camera${item}`,
      suggestion: 2,
      total_last: 1,
    };
  });
  const bu = [...Array(_random(1, 10)).keys()].map(item => ({
    module: (item === 0 ? 'PCB' : `BU ${item}`),
    suggestion: 7.00001,
    total_last: 1.00005,
  }));

  return {
    project_name: 'Bucky N15',
    project_code: '4PD0F8010001',
    total_suggestion: 44,
    total_last: 54,
    sku: { me: 'sku0', ee: '19717_SA_UMA_20190605114814' },
    lists: [
      { id: 'EE', total_suggestion: 33.00005, total_last: 35.00005, module: modulesB, bu },
      { id: 'ME', total_suggestion: 46.00007, total_last: 49.00007, module: modulesA },
      { id: 'Others', total_suggestion: 35.00005, total_last: 31.00005, module: modulesC },
    ]
  };
};

// module詳細資料 (modal的)
const fakeModuleData = (moduleId) => {
  const response = [...Array(25).keys()].map((item) => {
    return {
      part_number: `6${item}.19605.6DL`,
      type1: `RES${item}`,
      type2: `RES-SMD${item}`,
      last_price: `$0.0004${item}`,
      clean_sheet_cost: `$0.0007${item}`,
      suggestion_cost: `$0.0004${item}`,
      spa_cost: `$0.0055${item}`,
      sourcer_cost: `$0.0066${item}`,
      spa: `$0.0011${item}`,
      lpp: `$0.0012${item}`,
      currrent_price_adj_percentage: `$0.0012${item}`,
      ce_cost: `$0.0012${item}`,
      remark: `remarkremark${item}`,
    };
  });
  return {
    response,
  };
};

// project view
const fakeProjectList = () => {
  const detail = (count) => [...Array(count).keys()].map(item => ({
    id: uuidv4(),
    ee: {
      id: `ee_${item}`,
      sku: `SKU_${item}`,
      version: `EEVers_${item}`,
    },
    me: {
      id: `me_${item}`,
      sku: `SKU_${item}`,
      version: `MEVers_${item}`,
    },
    create_time: '2018-01-01 20:01:01',
  }));
  const projectList = [...Array(10).keys()].map((item) => {
    return {
      me_id: null,
      ee_id: uuidv4(),
      project_code: uuidv4().substr(0, 6),
      customer: uuidv4().substr(0, 5),
      product_type: 'Notebook.Computer',
      project_name: uuidv4().substr(0, 8),
      stage: {
        ee: `S${item}`,
        me: `RF${item}`,
      },
      version: {
        ee: `EEVersion_V1.${item}`,
        me: `MEVersion_V1.${item}`,
      },
      sku: uuidv4(),
      version_remark: uuidv4(),
      project_leader: 'ANGUS TUNG',
      plant: 'F715',
      purchasing_organization: 'PWCQ',
      create_time: '2019-05-24T09:24:13.033Z',
      caculation_date: '2019-05-24T09:24:13.033Z',
      update_time: '2019-06-03T18:54:34.316Z',
      approve_time: null,
      is_next_stage: false,
      edm_version_id: 'cded3da3-6ec9-4f35-b33d-4681d83f535e',
      eedm_version: '17946_-1_UMA_20180927154332',
      detail: detail(_random(0, 12)),
    };
  });
  return {
    numberOfProject: _random(1, 200),
    projectList,
  };
};

// 版本列表
const fakeVersionList = (params) => {
  const meVersions = [...Array(_random(20, 30)).keys()].map((item) => {
    const id = uuidv4();
    return {
      id,
      version: `MEBOM_${id}`,
      sku: `sku_${id}`,
      version_num: id
    };
  });
  const platformType = ['AMD AM4 PICASSO-65W-1', 'AMD AM4 PICASSO-65W-2', 'AMD AM4 PICASSO-65W-3'];
  const eeVersions = [...Array(_random(20, 30)).keys()].map((item) => {
    const id = uuidv4();
    const platform = _sample(platformType);
    return {
      id,
      version: `EEBOM_${id}`,
      sku: `sku_${id}`,
      version_num: id,
      platform,
      stage: 'SB',
      pcbno: id
    };
  });
  const emdmVersionType = ['73_202012101100-1', '73_202012101100-2', '73_202012101100-3'];
  const emdmVersions = [...Array(_random(20, 30)).keys()].map((itemm, i) => {
    const id = uuidv4();
    const emdmVersion = _sample(emdmVersionType);
    return {
      id: emdmVersion + i,
      emdm_version: emdmVersion,
      version: `EEBOM_${id}`,
      sku: `sku_${id}`,
      version_num: id
    };
  });
  return { meVersions, eeVersions, emdmVersions };
};

// 版本列表
const fakeFilterList = (item = '') => {
  if (!item) {
    return [...Array(_random(1, 10)).keys()].map(i => `item_${i}`);
  }
  return [...Array(_random(1, 10)).keys()].map(i => `${item}_${i}`);
};

export default {
  fakeData,
  fakeProjectList,
  fakeVersionList,
  fakeModuleData,
  fakeFilterList,
};

