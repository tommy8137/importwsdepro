const quotationSetting = require('../../cleanSheetQuotation/nb/thermal-fan')

module.exports = {
  cleansheet: [
    {
      label: 'A.零件費用:',
      byKey: 'partlistprice.forDebug.debugInfo.thermalFan.component_cost.value',
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
      label: 'Fan',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Fan',
          label: '風扇型式',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'fanType',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'fanSizePrice.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: '風扇cost增加',
          // parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'fanSizePanel.fanCostAdder',
          style: {
            color: '0000FF',
            bold: true,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: '馬達架構',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'motorArchitecture',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'motorArchitecturePrice.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: '軸承和套筒',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'bearingAndSleeve',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'bearingAndSleevePrice.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: '扇葉材料',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'fanBladeMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'fanBladeMaterialPrice.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: '磁石材料及尺寸',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'magnetMaterialAndSize',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'magnetMaterialAndSizePrice.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: '電壓',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'fanVoltage',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'fanVoltagePrice.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fan',
          label: 'Sub total Price',
          parent: 'partlistprice.forDebug.debugInfo.Fan',
          groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
          byKey: 'unit_price.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'B.加工費:',
      byKey: 'partlistprice.forDebug.debugInfo.thermalFan.processing_cost.value',
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
      label: '遮噴',
      byKey: 'partlistprice.forDebug.debugInfo.thermalFan.maskSpray_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '雷雕',
      byKey: 'partlistprice.forDebug.debugInfo.thermalFan.laserMarking_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '噴漆',
      byKey: 'partlistprice.forDebug.debugInfo.thermalFan.painting_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'C.管銷&利潤',
      byKey: 'partlistprice.forDebug.debugInfo.thermalFan.profit_cost.value',
      style: {
        color: '0000FF',
        bold: true,
        border: {
          topBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    {
      label: 'D.成品總價',
      byKey: 'partlistprice.forDebug.debugInfo.thermalFan.total.value',
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
  ],
  partlist: [
    {
      label: 'Fan',
      style: {
        color: null,
        border: {
        },
      },
      contents: [{
        parentKey: 'Fan',
        label: '用量',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'fanAmount',
        style: {
          color: null,
          border: {
            topBorderStyle: 'thick',
          },
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '風扇型式',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'fanType',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: 'X(mm)',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'fanSizePanel.fanSizeX',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: 'Y(mm)',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'fanSizePanel.fanSizeY',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: 'Fan size (H=馬達高度)',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'fanSizePanel.fanSize',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '馬達架構',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'motorArchitecture',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '軸承和套筒',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'bearingAndSleeve',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '扇葉材料',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'fanBladeMaterial',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '磁石材料及尺寸',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'magnetMaterialAndSize',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '電壓',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'fanVoltage',
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '有鹵',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'hasHalogen',
        mapper: {
          true: 1,
          _default: 0,
        },
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      {
        parentKey: 'Fan',
        label: '打凸',
        groupIdPath: 'partlistvalue.formData.thermal-fan.Fan',
        byKey: 'poundOut',
        mapper: {
          true: 1,
          _default: 0,
        },
        style: {
          color: null,
          border: {},
        },
        contents: [],
      },
      ],
    },
  ],
  quotation: quotationSetting,
}

