const Content = [
  {
    group: null,
    btns: [
      { title: 'Magnet Parameters', routerName: '/g/database/emcmagnet/Parameters'  },
    ]
  },
  {
    group: '材料',
    btns: [
      { title: 'Material Price', routerName: '/g/database/emcmagnet/MaterialPrice' },
    ]
  },
  {
    group: '二次加工',
    btns: [
      { title: '裁切邊料耗損率', routerName: '/g/database/emcmagnet/CuttingMaterialLossRate' },
      { title: '(充磁費+人工費) 價目表', routerName: '/g/database/emcmagnet/MagnetizingAndLaborPrice' },
    ]
  },
];

export default Content;
