import _ from 'lodash';

export const XRAY_ROLES = {
  ME: 'ME',
  EE: 'EE',
};


export const XRAY_TYPES = {
  CATEGORY: 'CATEGORY',
  REFPN: 'REFPN',
  SORCERCOST: 'SORCERCOST',
  CMP: 'CMP',
};

export const XRAY_SEARCHBY_TYPES_CONFIG = {
  [XRAY_TYPES.CATEGORY]: {
    key: XRAY_TYPES.CATEGORY,
    title: 'Category',
    showSearchbar: true,
    searchType: ''
  },
  [XRAY_TYPES.REFPN]: {
    key: XRAY_TYPES.REFPN,
    title: 'Reference P/N',
    showSearchbar: true,
  },
  [XRAY_TYPES.SORCERCOST]: {
    key: XRAY_TYPES.SORCERCOST,
    title: 'Sourcer Cost Analysis',
    showSearchbar: false,
  },
  [XRAY_TYPES.CMP]: {
    key: XRAY_TYPES.CMP,
    title: 'CMP/BOM Analysis',
    showSearchbar: false,
  },
};

export const XRAY_SEARCHBY_CONFIG = {
  [XRAY_ROLES.ME]: [
    XRAY_SEARCHBY_TYPES_CONFIG.CATEGORY,
    XRAY_SEARCHBY_TYPES_CONFIG.REFPN,
  ],
  [XRAY_ROLES.EE]: [
    XRAY_SEARCHBY_TYPES_CONFIG.CATEGORY,
    XRAY_SEARCHBY_TYPES_CONFIG.REFPN,
    XRAY_SEARCHBY_TYPES_CONFIG.SORCERCOST,
    XRAY_SEARCHBY_TYPES_CONFIG.CMP,
  ],
};

export const XRAY_EMPTY_SPECGROUP = {
  ..._.merge(...[...[...Array(30).keys()].map((t, i) => (`spec${((i + 1 < 10) ? `0${i + 1}` : i + 1)}`))].map(spec => ({ [spec]: [] })))
};

export const XRAY_EMPTY_SPECITEM = {
  specGroupName: '',
  specGroupID: '',
  owner: '',
  productType: [],
  sourcer: [],
  type1: '',
  type2: '',
  specGroup: XRAY_EMPTY_SPECGROUP
};

export const XRAY_PLANT_OPTIONS = [
  { label: 'PWIH', value: 'PWIH' },
  { label: 'PWZS', value: 'PWZS' },
  { label: 'PWKS', value: 'PWKS' },
  { label: 'PWMX', value: 'PWMX' },
];

export const XRAY_ANALYSIS_TYPE = {
  CMP: 'CMP',
  BOM: 'BOM'
};

export default {};
