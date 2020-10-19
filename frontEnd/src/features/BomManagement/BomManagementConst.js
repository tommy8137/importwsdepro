
export const BOM_MANAGMENT_TABLE_TYPES = {
  ME: 'ME',
  EE: 'EE',
  EMDM: 'EMDM',
};

export const BOM_MANAGMENT_URL_PARAM_TYPES = {
  ME: 'me',
  EE: 'ee',
  EMDM: 'emdm',
};

export const BOM_MANAGMENT_PARAM_TO_TABLE_TYPE = {
  [BOM_MANAGMENT_URL_PARAM_TYPES.ME]: BOM_MANAGMENT_TABLE_TYPES.ME,
  [BOM_MANAGMENT_URL_PARAM_TYPES.EE]: BOM_MANAGMENT_TABLE_TYPES.EE,
  [BOM_MANAGMENT_URL_PARAM_TYPES.EMDM]: BOM_MANAGMENT_TABLE_TYPES.EMDM,
};


export const BOM_MANAGMENT_SORTER = {
  [BOM_MANAGMENT_TABLE_TYPES.ME]: [{
    sortOrder: 'desc',
    dataIndex: 'create_time'
  }],
  [BOM_MANAGMENT_TABLE_TYPES.EE]: [{
    sortOrder: 'desc',
    dataIndex: 'create_time'
  }],
  [BOM_MANAGMENT_TABLE_TYPES.EMDM]: [{
    sortOrder: 'desc',
    dataIndex: 'create_time'
  }],
};

export default {
  BOM_MANAGMENT_URL_PARAM_TYPES
};
