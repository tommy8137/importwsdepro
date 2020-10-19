import uuidv4 from 'uuid/v4';
import _random from 'lodash/random';

const numberOfBom = 40;

const paging = (array, params) => {
  const { pages: page, items: offset, } = params;

  const begin = (page - 1) * offset;
  const end = begin + offset;
  const resultList = array.slice(begin, end);

  return resultList;
};

/**
 * ME BOM project list
 * @param {*} params
 */
const fakeBomList = (params) => {
  const boms = [...Array(numberOfBom).keys()].map((item, id) => {
    return {
      approved_by: '10507309',
      create_by: '10503314',
      create_time: '2019-03-25T12:40:00.419Z',
      customer: `AOpen${id}`,
      id,
      own_created: true,
      product: `product${id}`,
      project_leader: '10405308',
      project_name: `mamamoo 4season4color${id}`,
      sku_desc: 'test first record',
      stage: 'RFQ',
      stage_id: '2',
      system_model_pn: `system_model_pn${id}`,
      version: 'V0.0',
      version_id: '0e2be928-670e-4b71-8aba-32b091386657',
    };
  });
  return {
    bomInfo: {
      numberOfBom,
      bomList: paging(boms, params),
    }
  };
};


/**
 * EE BOM project list
 * @param {*} params
 */
const fakeEeBomList = (params) => {
  const bomList = [...Array(numberOfBom)].map((item, id) => ({
    id: `${id}_${uuidv4()}`,
    project_code: uuidv4(),
    customer: 'j1234',
    product_type: '111',
    project_name: '222',
    stage: '333',
    version: '444',
    sku: '666',
    version_remark: uuidv4(),
    project_leader: null,
    eedm_version: null,
    is_eedm_version_edit: false,
    plant: null,
    purchasing_organization: null,
    create_time: '2019-04-11T03:10:57.004Z',
    caculation_date: null,
    update_time: '2019-04-11T03:10:57.004Z',
    // approve_time: null,
    approve_time: `2019-0${_random(1, 9)}-${_random(10, 28)}T${_random(10, 23)}:${_random(10, 59)}:${_random(10, 59)}.004Z`,
    is_approved: false,
    approved_by: null,
    own_created: false,
    is_next_stage: true,
  }));
  /*   const bomList = [...Array(numberOfBom)].map((item, id) => ({
    id,
    customer: `Rosa${id}`,
    product_type: 'Notebook',
    project_name: '4PD0F8010001',
    stage: 'SA',
    version: 'V0.0',
    sku: 'UMA',
    version_remark: uuidv4(), // pop不用再丟，table裡直接css斷行
    project_leader: 'Kit Chen',
    approve_date: '2019/3/21',
    is_owner: true, // 是否可以編輯bom information
    is_leader_approve: true, // leader approve之後才可以按Next Stage
  }));
 */
  return {
    bomInfo: {
      numberOfBom,
      bomList: paging(bomList, params),
    }
  };
};
const fakeBomProjects = (params) => {
  const { role } = params;
  if (role === 'ME') {
    return fakeBomList(params);
  }
  return fakeEeBomList(params);
};

const fakeBomVersions = (projectCode) => {
  const edmVersions = [...Array(_random(3, 9)).keys()].map((item, id) => ({
    create_time: '2019-03-25T12:40:00.419Z',
    product: uuidv4(),
    version: `${projectCode}_${id}`,
    id: `${id}`,
  }));

  return ({ edmVersions });
};

const fakeEEBomDetail = (id) => {
  return ({
    bomInfo: {
      id,
      project_code: '1234',
      customer: 'joe',
      product_type: '111',
      project_name: '222',
      stage: '333',
      version: '444',
      sku: '666',
      version_remark: '777',
      project_leader: 'REXX',
      eedm_version: null,
      is_eedm_version_edit: false,
      plant: null,
      purchasing_organization: null,
      create_time: '2019-04-11T03:10:57.004Z',
      caculation_date: null,
      update_time: '2019-04-11T03:10:57.004Z',
      approve_time: '2019-04-11T03:10:57.004Z',
      is_approved: false,
      approved_by: null
    }
  });
};

const fakeFilterType = (role) => {
  return [
    {
      key: 'customer',
      value: 'Customer'
    }, {
      key: 'productType',
      value: 'Product'
    }, {
      key: 'Stage',
      value: 'stage'
    }, {
      key: 'project_leader',
      value: 'ProjectLeader'
    }];
};

const fakeFilterValue = (params) => {
  return { res: ['aa', 'bb'] };
};

const fakePlantCodeList = () => [{
  purchasing_organization: 'PWCD',
  plants: [{
    plant: 'F130',
    value: false
  }, {
    plant: 'F131',
    value: true
  },
  {
    plant: 'F132',
    value: true
  }, {
    plant: 'F133',
    value: true
  }]
}, {
  purchasing_organization: 'PWHI',
  plants: [{
    plant: 'F120',
    value: true
  }],
}];


const fakeBomParams = () => ({
  bomParams: [
    {
      id: '123',
      lable_name: '成型費FCST寬放值',
      group_name: 'plastic',
      value: 0,
      value_type: 'number',
      unit: 'k'
    }
  ]
});

const fakeFilterData = () => {
  return {
    product: ['NB', 'DT'],
    customer: ['ACA', 'DMD'],
    stage: ['WCQ', 'WIH'],
  };
};

export default {
  fakeBomList,
  fakeEeBomList,
  fakeBomProjects,
  fakeBomVersions,
  fakeEEBomDetail,
  fakeFilterType,
  fakeFilterValue,
  fakePlantCodeList,
  fakeBomParams,
  fakeFilterData,
};

