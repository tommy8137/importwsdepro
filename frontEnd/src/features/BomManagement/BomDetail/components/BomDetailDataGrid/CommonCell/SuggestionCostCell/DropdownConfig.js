const dropdownConfig = [
  { title: 'CBG Price ', key: 'last_price', price: 'tooltip.last_price.total_cost', needChild: false },
  { title: 'Clean Sheet Cost (U/P)', key: 'clean_sheet_cost', price: '', needChild: false },
  { title: 'SPA Cost', key: 'spa_cost', price: 'tooltip.spa_cost.total_cost', needChild: false },
  { title: 'Inquiry Cost (U/P)', key: 'inquiry_cost', price: 'tooltip.inquiry_cost.total_cost', needChild: false },
  { title: 'CE Cost組立價 (U/P)', key: 'ce_cost_assembly', price: '', needChild: true },
  { title: 'Sourcer Cost (U/P)', key: 'sourcer_cost', price: 'tooltip.sourcer_cost.total_cost', needChild: false },
  { title: '自動最低價', key: 'auto_lowest_cost', price: '', needChild: false },
];

export default dropdownConfig;
