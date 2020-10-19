module.exports = {
  cleansheet: [
    {
      label: 'A.零件費用:',
      byKey: 'partlistprice.forDebug.debugInfo.ThermalPad.component_cost.value',
      style: {
        color: '0000FF',
        bold: true,
        border: {
          topBorderStyle: 'thick',
          bottomBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    {
      label: 'Pad',
      parent: 'partlistprice.forDebug.debugInfo.Pad',
      groupIdPath: 'partlistvalue.formData.thermal-pad.Pad',
      byKey: 'total.value',
      style: {
        color: null,
        bold: true,
        border: {},
      },
      contents: [],
    },
  ],
  partlist: [
    {
      label: 'PAD',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'ThermalPad',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-pad.Pad',
          byKey: 'thermalPadLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-pad.Pad',
          byKey: 'thermalPadWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-pad.Pad',
          byKey: 'thermalPadThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '硬度(Shore)',
          groupIdPath: 'partlistvalue.formData.thermal-pad.Pad',
          byKey: 'thermalPadShore',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '熱傳係數(K值)',
          groupIdPath: 'partlistvalue.formData.thermal-pad.Pad',
          byKey: 'thermalPadHeatTransferCoefficient',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
  ],
}

