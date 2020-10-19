import React from 'react';

const Content = {
  groups: [
    {
      group: 'ME',
      // permission: ['Edit', 'allow', 'cleansheet.me.cal.thermal-module'],
      btns: [
        { title: 'Common Parameters', routerName: '/g/database/CommonParameter' },
        { title: 'Product Type List', routerName: '/g/database/ProductTypeList' },
        { title: 'Site List', routerName: '/g/database/SiteList' },
        { title: 'Material Price', routerName: '/g/database/MaterialPrice' },
      ],
    },
    {
      group: null,
      btns: [
        { title: 'Plastic Clean Sheet',  routerName: '/s/database/me/plastic' },
        { title: 'Metal Clean Sheet', routerName: '/s/database/me/metal' },
        { title: 'Die Cut Clean Sheet', routerName: '/s/database/me/diecut' },
        { title: 'Thermal Module Clean Sheet', routerName: '/s/database/me/thermal' },
        { title: 'Cable Wire Clean Sheet', routerName: '/s/database/me/cablewire' },
        { title: 'Cable FFC Clean Sheet', routerName: '/s/database/me/cableffc' },
        { title: 'Cable FPC Clean Sheet', routerName: '/s/database/me/cablefpc' },
        { title: 'Magnet Clean Sheet', routerName: '/s/database/me/emcmagnet' },
        { title: 'Thermal Graphite Clean Sheet', routerName: '/s/database/me/thermalgraphite' },
        { title: 'Rubber Clean Sheet', routerName: '/s/database/me/rubber' },
        { title: 'Turning Clean Sheet', routerName: '/s/database/me/turning' },
      ]
    },
  ],
};


export default Content;
