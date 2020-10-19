import ProductTypeSetting, { NB_GROUP } from '~~features/Database/ME/ProductTypeSetting';


const { NB, DT, AIO, SERVER, VOIP } = ProductTypeSetting;

const Content = [
  {
    group: null,
    btns: [
      {
        title: 'FFC Parameters',
        routerName: '/g/database/cableffc/Parameters',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
    ]
  },
  {
    group: '材料',
    btns: [
      {
        title: '材料價目表',
        routerName: '/g/database/cableffc/MaterialPrice',
        validProductTypeID: [...NB_GROUP, DT, AIO, SERVER, VOIP]
      },
    ]
  },
  {
    group: '零件',
    btns: [
      // NB ===============================================================
      {
        title: 'Connector 清單',
        routerName: '/g/database/cableffc/Connector',
        validProductTypeID: [...NB_GROUP]
      },
      {
        title: 'Connector 價目表',
        routerName: '/g/database/cableffc/ConnectorPrice',
        validProductTypeID: [...NB_GROUP]
      },
      // DT/AIO ===============================================================
      {
        title: 'Connector 價目表',
        routerName: '/g/database/cableffc/ConnectorSpecPrice',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '補強板價目表',
        routerName: '/g/database/cableffc/ReinforcementBoardPrice',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
      {
        title: '輔料價目表',
        routerName: '/g/database/cableffc/AccessoriesPrice',
        validProductTypeID: [DT, AIO, SERVER, VOIP]
      },
    ]
  },
];

export default Content;
