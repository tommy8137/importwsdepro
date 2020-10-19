
const eeColumns = [
  { key: 'part_number', name: 'Part Number', width: 110, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'type1', name: 'Type I', width: 70, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'type2', name: 'Type II', width: 90, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'description', name: 'Description', width: 180, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'sourcer_cost', name: 'Source Cost (U/P)', width: 80, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'last_price', name: 'Last Price (U/P)', width: 80, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'spa', name: 'SPA (U/P)', width: 60, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'avl_spa', name: 'AVL SPA (U/P)', width: 60, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },

  // 替代料號價格
  { key: 'alt_lowest_price', name: 'ALT. Lowest Cost', width: 130, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'avl_alt', name: 'AVL ALT. Lowest Cost', width: 130, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },

  { key: 'lpp', name: 'LPP (U/P)', width: 60, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'clean_sheet_cost', name: 'Clean Sheet Cost (U/P)', width: 100, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'currrent_price_adj_percentage', name: 'Last Price*%', width: 100, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'ce_cost', name: 'CE Cost', width: 80, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'suggestion_cost', name: 'Suggestion Cost', width: 100, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'qty', name: 'QTY', width: 100, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'subTotalLastPrice', name: 'Sub Total Last Price', width: 120, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'sub_total_suggestion_cost', name: 'Sub Total Suggestion Cost', width: 120, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
  { key: 'remark', name: 'Remark', width: 93, justifyContent: 'flex-start', paddingLeft: 8, paddingRight: 7 },
];

const meColumns = [
  { key: 'part_number', name: 'Part Number', width: 100, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'part_name', name: 'Part Name', width: 220, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'type1', name: 'Type I', width: 80, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'gb_assy_ctgy', name: 'Assy Category', width: 100, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'last_price', name: 'Last Price (U/P)', width: 80, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'clean_sheet_cost', name: 'Clean Sheet Cost (U/P)', width: 80, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'spa_cost', name: 'SPA Cost (U/P)', width: 60, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'sourcer_cost', name: 'Sourcer Cost (U/P)', width: 100, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'suggestion_cost', name: 'Suggestion Cost', width: 100, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'remark', name: 'Remark', width: 180, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
];


const pcbColumns = [
  { key: 'wistronpn', name: 'Part Number', width: 120, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'part_number', name: 'Dummy P/N', width: 220, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'type1', name: 'Type I', width: 90, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'type2', name: 'Type II', width: 120, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'description', name: 'Description', width: 220, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'PcbStageNo', name: 'Part No._Stage', width: 120, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'sourcer_cost', name: 'Sourcer Cost(U/P)', width: 220, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'last_price', name: 'Last Price (U/P)', width: 90, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'clean_sheet_cost', name: 'Clean Sheet Cost (U/P)', width: 100, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'ce_cost', name: 'CE Cost', width: 120, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'suggestion_cost', name: 'Suggestion Cost', width: 120, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
  { key: 'qty', name: 'QTY', width: 220, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'sub_total_last_price', name: 'Sub Total Last Price', width: 220, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'sub_total_suggestion_cost', name: 'Sub Total Suggestion Cost', width: 220, justifyContent: 'flex-start', paddingLeft: 12, paddingRight: 13 },
  { key: 'is_count', name: 'Count', width: 125, justifyContent: 'center', paddingLeft: 5, paddingRight: 5 },
  { key: 'remark', name: 'Remark', width: 125, justifyContent: 'flex-start', paddingLeft: 5, paddingRight: 5 },
];


export {
  eeColumns,
  meColumns,
  pcbColumns,
};

