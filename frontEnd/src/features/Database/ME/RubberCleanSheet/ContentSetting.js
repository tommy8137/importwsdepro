const Content = [
  {
    group: null,
    btns: [
      { title: 'Rubber Parameters', routerName: '/g/database/rubber/Parameters' },
    ]
  },
  {
    group: '成型費',
    btns: [
      // { title: '機台費用 價目表', routerName: '/g/database/rubber/MachinePrice' },
      { title: 'Machine Rate / 穴數計算維護表', routerName: '/g/database/rubber/MachineRate' },
    ]
  },
  {
    group: '二次加工',
    btns: [
      { title: '成品沖型 價目表', routerName: '/g/database/rubber/StampingPrice' },
      { title: '貼背膠 價目表', routerName: '/g/database/rubber/AdhesivePrice' },
      { title: '外觀印刷 價目表', routerName: '/g/database/rubber/PrintingPrice' },

    ]
  },
];

export default Content;
