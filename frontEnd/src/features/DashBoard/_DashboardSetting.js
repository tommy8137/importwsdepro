/**
 * TODO:
 * 準備要重構的東西
 * 1. 將所有的ME/EE/Other各種規則都放進來
 */


import {
  eeColumns,
  meColumns,
  pcbColumns,  } from './component/ModuleDataGrid/ColumnSetting';

// List分類
const SummarizeList = {
  EE: {
    bu: {
      listColumns: ['BU View', 'Last', 'Suggestion'],
      detailColumns: {
        pcb: pcbColumns,
        default: eeColumns,
      },
    },
    module: {
      listColumns: ['Module', 'Last', 'Suggestion'],
      detailColumns: {
        default: eeColumns,
      },
    },
  },
  ME: {
    listColumns: ['Type I', 'Last', 'Suggestion'],
    detailColumns: {
      default: eeColumns,
    },
  },
  Others: {
    listColumns: ['Module', 'Last', 'Suggestion'],
    detailColumns: {
      default: meColumns,
    },
  },
};

