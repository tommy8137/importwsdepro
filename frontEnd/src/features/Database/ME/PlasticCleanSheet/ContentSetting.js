import React from 'react';

const Content = [
  {
    group: null,
    btns: [
      { title: 'Plastic Parameters', routerName: '/g/database/plastic/Parameters'  },
    ]
  },
  {
    group: '材料',
    btns: [
      { title: '材料Loss Rate維護表', routerName: '/g/database/plastic/LossRate' },
    ]
  },
  {
    group: '成型',
    btns: [
      { title: '機台 Module 清單', routerName: '/g/database/plastic/MachineModuleList' },
      { title: '機台噸數價目表', routerName: '/g/database/plastic/MachineTonnagePrice' },
    ]
  },
  {
    group: '塗裝噴漆',
    btns: [
      { title: '噴塗人工單價及工時表', routerName: '/g/database/plastic/LaborUnitPriceAndWorkSheet' },
      { title: '噴漆線人力及總人工費用表', routerName: '/g/database/plastic/PaintAndTotalLaborCost' },
      { title: '噴漆機台價目表', routerName: '/g/database/plastic/PaintMachinePrice' },
      { title: '塗料廠商清單', routerName: '/g/database/plastic/PaintVendorList' },
      { title: '噴漆類型及顏色清單', routerName: '/g/database/plastic/PaintTypeList' },
      { title: '噴漆組合清單', routerName: '/g/database/plastic/PaintGroupList' },
      { title: '噴漆類型價目表', routerName: '/g/database/plastic/PaintTypePrice' },
    ]
  },
  {
    group: '二次加工',
    btns: [
      { title: 'Printing製程價目表', routerName: '/g/database/plastic/PrintingProcessPrice' },
      { title: '埋釘製程價目表', routerName: '/g/database/plastic/EmbeddedNailPrice' },
      { title: '產品打磨費用明細', routerName: '/g/database/plastic/ProductPolishDetail' },
      { title: 'EMI Sputtering 清單', routerName: '/g/database/plastic/EmiSputteringList' },
      { title: 'EMI Sputtering Base 本體材質清單', routerName: '/g/database/plastic/EmiSputteringBaseList' },
      { title: 'EMI Sputtering Site Group', routerName: '/g/database/plastic/EmiSputteringSiteGroup' },
      { title: 'EMI Sputtering 價目表', routerName: '/g/database/plastic/EmiSputteringPrice' },
    ]
  },
];

export default Content;
