
// eebom filter的level1選項列表
export const EEBOM_NEXTSTAGE_CATEGORY_OPTIONS_LIST = [
  {
    label: 'Category',
    value: 'category'
  },
  {
    label: 'Status',
    value: 'status'
  }
];
//  eebom filter的level1 approver的選項列表
export const EEBOM_NEXTSTAGE_CATEGORY_APPROVER_OPTIONS_LIST = [
  {
    label: 'Category',
    value: 'category'
  },
  {
    label: 'PIC',
    value: 'pic'
  }, {
    label: 'Status',
    value: 'status'
  }
];

// eebom filter選擇status後的level2 列表 member
export const EEBOM_NEXTSTAGE_STATUS_OPTIONS_LIST = [
  {
    label: 'Checked',
    value: 'checked'
  },
  {
    label: 'Unchecked',
    value: 'unchecked'
  },
  {
    label: 'Submitted',
    value: 'submitted'
  },
  {
    label: 'Rejected',
    value: 'rejected'
  },
];


// eebom filter選擇status後的level2 列表 approver
export const EEBOM_NEXTSTAGE_STATUS_APPROVER_OPTIONS_LIST = [
  {
    label: 'MBR submitted',
    value: 'mbr_submitted'
  },
  {
    label: 'MBR not submit',
    value: 'mbr_not_submit'
  },
  {
    label: 'Approved',
    value: 'approved'
  },
  {
    label: 'Rejected',
    value: 'rejected'
  },
];

// eebom filter的顯示狀態設定
export const EEBOM_NEXTSTAGE_FILTER_DISPLAY_CONFIG = {
  default: {
    level1Multi: false,
    level2Multi: false,
    level3Multi: false,
    level1Display: true,
    level2Display: true,
    level3Display: false,
    level1Placeholder: 'All Items',
    level2Placeholder: 'by Items',
    level3Placeholder: 'by Items'
  },
  category: {
    level1Multi: false,
    level2Multi: false,
    level3Multi: false,
    level1Display: true,
    level2Display: true,
    level3Display: true,
    level1Placeholder: 'All Items',
    level2Placeholder: 'Type I',
    level3Placeholder: 'Type II'
  },
  pic: {
    level1Multi: false,
    level2Multi: false,
    level3Multi: false,
    level1Display: true,
    level2Display: true,
    level3Display: false,
    level1Placeholder: 'All Items',
    level2Placeholder: 'by Items',
    level3Placeholder: 'by Items',

  },
  status: {
    level1Display: true,
    level2Display: true,
    level3Display: false,
    level1Placeholder: 'by Items',
    level2Placeholder: 'by Items',
    level3Placeholder: 'by Items',
  }
};


// eebom filter 的預設值
export const EEBOM_NEXTSTAGE_INITIAL_FILTERINFO = {
  ...EEBOM_NEXTSTAGE_FILTER_DISPLAY_CONFIG.default,
  level1OptionsList: EEBOM_NEXTSTAGE_CATEGORY_OPTIONS_LIST,
  level2OptionsList: [],
  level3OptionsList: [],
  level1SelectedOption: null,
  level2SelectedOption: null,
  level3SelectedOption: null,
};

// eebom filter approver 的預設值
export const EEBOM_NEXTSTAGE_INITIAL_APPROVER_FILTERINFO = {
  ...EEBOM_NEXTSTAGE_FILTER_DISPLAY_CONFIG.default,
  level1OptionsList: EEBOM_NEXTSTAGE_CATEGORY_APPROVER_OPTIONS_LIST,
  level2OptionsList: [],
  level3OptionsList: [],
  level1SelectedOption: null,
  level2SelectedOption: null,
  level3SelectedOption: null,
};

