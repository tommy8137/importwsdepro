import uuidv4 from 'uuid/v4';
import _random from 'lodash/random';

const numberOfProject = 40;

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
const fakeProjectList = (params) => {
  const projects = [...Array(numberOfProject).keys()].map((item, id) => {
    return {
      customer: 'Rosa',
      id,
      product: `product${id}`,
      project_name: `${id}: Bucky N5 15 WHL`,
      project_code: '434.03N09.0001',
      sku_desc: '詳細產品規格內容描述，詳細產品規格，詳細產品規格內容描述，詳細產品規格詳細產品規格內容描述，詳細產品規格詳細產品規格內容描述，詳細產品規格。',
      stage: 'SA/RFQ',
      version: '1.0/2.0',
      version_remark: '詳細產品規格內容描述，詳細產品規格，詳細產品規格內容描述，詳細產品規格詳細產品規格內容描述，詳細產品規格詳細產品規格內容描述，詳細產品規格。',
    };
  });
  return {
    projectInfo: {
      numberOfProject,
      projectList: paging(projects, params),
    }
  };
};

const fakeFilterType = (role) => {
  return { label: '', value: '' };
};

const fakeFilterValue = (params) => {
  return '';
};

const fakeFilterTypeList = () => {
  return [
    {
      key: 'customer',
      value: 'Customer',
      label: 'Customer',
    },
    {
      key: 'product_type',
      value: 'Product',
      label: 'Product',
    },
    {
      key: 'stage_id',
      value: 'Stage',
      label: 'Stage',
    },
    {
      key: 'project_leader',
      value: 'ProjectLeader',
      label: 'ProjectLeader',
    }
  ];
};

const fakeFilterValueList = () => {
  return [
    'customer1',
    'customer2',
    'customer3',
  ];
};

export default {
  fakeProjectList,
  fakeFilterType,
  fakeFilterValue,
  fakeFilterTypeList,
  fakeFilterValueList,
};

