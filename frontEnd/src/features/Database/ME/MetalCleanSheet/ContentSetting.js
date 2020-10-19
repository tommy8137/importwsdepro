import ProductTypeSetting, { NB_GROUP } from '~~features/Database/ME/ProductTypeSetting';


const { NB, DT, AIO, SERVER, VOIP } = ProductTypeSetting;

const Content = [
  {
    group: null,
    btns: [
      {
        title: 'Metal Parameters',
        routerName: '/g/database/metal/Parameters',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
    ]
  },
  {
    group: '沖壓',
    btns: [
      {
        title: '機台Module清單',
        routerName: '/g/database/metal/MachineModuleList',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
      {
        title: '機台噸數價目表',
        routerName: '/g/database/metal/MachineTonnagePrice',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
    ]
  },
  {
    group: '二次加工',
    btns: [
      {
        title: '陽極顏色價目表',
        routerName: '/g/database/metal/AnodeColorPrice',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
      {
        title: '噴漆類型價目表',
        routerName: '/g/database/metal/PaintingTypePrice',
        validProductTypeID: [...NB_GROUP]
      },
      {
        title: '熱壓膠水針筒內徑表',
        routerName: '/g/database/metal/GlueSyringeInnerDeameter',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
      {
        title: '膠水型號價目表',
        routerName: '/g/database/metal/GlueModelPrice',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
      {
        title: '鑽切(高光)清單',
        routerName: '/g/database/metal/DrillPrice',
        validProductTypeID: [...NB_GROUP]
      },
    ]
  },
  {
    group: '塗裝噴漆',
    btns: [
      {
        title: '噴塗人工單價及工時表',
        routerName: '/g/database/metal/LaborUnitPriceAndWorkSheet',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '噴漆線人力及總人工費用表',
        routerName: '/g/database/metal/PaintAndTotalLaborCost',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '噴漆機台價目表',
        routerName: '/g/database/metal/PaintMachinePrice',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '塗料廠商清單',
        routerName: '/g/database/metal/PaintVendorList',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '噴漆類型及顏色清單',
        routerName: '/g/database/metal/PaintTypeList',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '噴漆組合清單',
        routerName: '/g/database/metal/PaintGroupList',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '噴漆類型價目表',
        routerName: '/g/database/metal/PaintTypePrice',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
    ]
  },
];

export default Content;
