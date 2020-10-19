const quotationSetting = require('../../cleanSheetQuotation/nb/thermal-module')

module.exports = {
  cleansheet: [
    {
      label: 'A.零件費用:',
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.component_cost.value',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
      label: 'Pipe',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Pipe',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: 'Pipe型式',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeType',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: '外徑',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'outerDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: '長度',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: '打扁厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeFlatteningThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Pipe',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'total.value',
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
      label: 'Fin',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Fin',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '材料厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '成品尺寸 長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finProductionSize.finProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '成品尺寸 寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finProductionSize.finProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '成品尺寸 高度(H)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finProductionSize.finProductionHigh',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: 'Pitch',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finPitch',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '片數',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finPiece',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '鍍鎳',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finNickelPlating',
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
          parentKey: 'Fin',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Fin',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'total.value',
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
      label: 'ThermalPlate',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'ThermalPlate',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '材料厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '成品尺寸 長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlProductionSize.thPlProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '成品尺寸 寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlProductionSize.thPlProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '成品尺寸 高度(H)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlProductionSize.thPlProductionHigh',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '鍍鎳',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlNickelPlating',
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
          parentKey: 'ThermalPlate',
          label: '鉚接',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlRiveting',
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
          parentKey: 'ThermalPlate',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.ThermalPlate',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'total.value',
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
      label: 'ThermalBlock',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'ThermalBlock',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '材料厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '成品尺寸 長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlProductionSize.thBlProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '成品尺寸 寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlProductionSize.thBlProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '鍍鎳',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlNickelPlating',
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
          parentKey: 'ThermalBlock',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.ThermalBlock',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'total.value',
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
      label: 'Screw',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Screw',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '牙徑(M)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwToothpath',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '頭徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwHeadDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '頭厚(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwHeadThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '光桿',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwPolishedRod',
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
          parentKey: 'Screw',
          label: '頸徑',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwNeckDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '頸高',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwNeckLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '耐落',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwResistantFall',
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
          parentKey: 'Screw',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Screw',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'total.value',
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
      label: 'Spring',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Spring',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Spring',
          label: '線徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springWireDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Spring',
          label: '線圈中心徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springCoilCenterDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Spring',
          label: '自由長(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springFreeLong',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Spring',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Spring',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'total.value',
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
      label: 'ORing',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'ORing',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oRAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ORing',
          label: '外徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oROuterDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ORing',
          label: '內徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oRInnerDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ORing',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oRThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ORing',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.ORing',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'total.value',
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
      label: 'Clip',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Clip',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '線徑',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipWireDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Clip',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'total.value',
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
      label: 'PushPin',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'PushPin',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.PushPin',
          byKey: 'pupiAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'PushPin',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.PushPin',
          byKey: 'pupiLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'PushPin',
          label: '頭徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.PushPin',
          byKey: 'pupiHeadDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'PushPin',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.PushPin',
          groupIdPath: 'partlistvalue.formData.thermal-module.PushPin',
          byKey: 'total.value',
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
      label: 'Label',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Label',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Label',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Label',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Label',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Label',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Label',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'total.value',
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
      label: 'Sponge',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Sponge',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '材料 Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '厚度(t) Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterialThicknessRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Sponge',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'total.value',
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
      label: 'Mylar',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Mylar',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '材料 Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '厚度(t) Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterialThicknessRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠材料 Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveMaterialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠厚度(t) Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveThicknessRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Mylar',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'total.value',
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
      label: 'Grease',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'Grease',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '材質',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.Grease',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'total.value',
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
      label: 'ThermalPad',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thin',
          bottomBorderStyle: 'thin',
        },
      },
      contents: [
        {
          parentKey: 'ThermalPad',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '熱傳係數(K值)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadHeatTransferCoefficient',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '硬度',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadShore',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadWidth',
          style: {
            color: null,
            border: {
            },
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: 'Price',
          parent: 'partlistprice.forDebug.debugInfo.ThermalPad',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'total.value',
          style: {
            color: '0000FF',
            bold: true,
            border: {
              bottomBorderStyle: 'thick',
            },
          },
          contents: [],
        },
      ],
    },
    {
      label: 'B.加工費:',
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.processing_cost.value',
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
      label: 'Assembly組裝',
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.assembly_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '噴漆',
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.painting_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '遮噴',
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.maskSpray_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '雷雕',
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.laserMarking_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },

    {
      label: 'C.管銷&利潤',
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.profit_cost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.thermalModule.total.value',
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
      label: '二次加工',
      style: {
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          label: '塗黑',
          byKey: 'partlistvalue.formData.thermal-module.Process.process.appearanceProcess',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          mapper: {
            true: 1,
            _default: 0,
          },
          contents: [],
        },
        {
          label: '遮噴',
          byKey: 'partlistvalue.formData.thermal-module.Process.process.maskSpray',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          mapper: {
            true: 1,
            _default: 0,
          },
          contents: [],
        },
        {
          label: '雷雕',
          byKey: 'partlistvalue.formData.thermal-module.Process.laserMarking',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          mapper: {
            true: 1,
            _default: 0,
          },
          contents: [],
        },
        {
          label: '雷雕總面積(mm²)',
          byKey: 'partlistvalue.formData.thermal-module.Process.laserMarkingArea',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Fan',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Fan',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.Fan',
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
    {
      label: 'Pipe',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Pipe',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: 'Pipe型式',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeType',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: '外徑',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'outerDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: '長度',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Pipe',
          label: '打扁厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.Pipe',
          byKey: 'pipeFlatteningThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Fin',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Fin',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '材料厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '成品尺寸 長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finProductionSize.finProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '成品尺寸 寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finProductionSize.finProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '成品尺寸 高度(H)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finProductionSize.finProductionHigh',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: 'Pitch',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finPitch',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '片數',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finPiece',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Fin',
          label: '鍍鎳',
          groupIdPath: 'partlistvalue.formData.thermal-module.Fin',
          byKey: 'finNickelPlating',
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
    {
      label: 'Thermal Plate and Clip Spring',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'ThermalPlate',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '材料厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '成品尺寸 長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlProductionSize.thPlProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '成品尺寸 寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlProductionSize.thPlProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '成品尺寸 高度(H)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlProductionSize.thPlProductionHigh',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPlate',
          label: '鍍鎳',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlNickelPlating',
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
          parentKey: 'ThermalPlate',
          label: '鉚接',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPlate',
          byKey: 'thPlRiveting',
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
    {
      label: 'ThermalBlock',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'ThermalBlock',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '材料厚度',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '成品尺寸 長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlProductionSize.thBlProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '成品尺寸 寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlProductionSize.thBlProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalBlock',
          label: '鍍鎳',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalBlock',
          byKey: 'thBlNickelPlating',
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
    {
      label: 'Screw',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Screw',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '牙徑(M)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwToothpath',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '頭徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwHeadDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '頭厚(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwHeadThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '光桿',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwPolishedRod',
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
          parentKey: 'Screw',
          label: '頸徑',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwNeckDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '頸高',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwNeckLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Screw',
          label: '耐落',
          groupIdPath: 'partlistvalue.formData.thermal-module.Screw',
          byKey: 'screwResistantFall',
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
    {
      label: 'Spring',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Spring',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Spring',
          label: '線徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springWireDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Spring',
          label: '線圈中心徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springCoilCenterDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Spring',
          label: '自由長(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Spring',
          byKey: 'springFreeLong',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'ORing',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'ORing',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oRAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ORing',
          label: '外徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oROuterDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ORing',
          label: '內徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oRInnerDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ORing',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ORing',
          byKey: 'oRThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Clip for DT',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Clip',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '線徑',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipWireDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipProductionLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Clip',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Clip',
          byKey: 'clipProductionWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Push Pin for DT',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'PushPin',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.PushPin',
          byKey: 'pupiAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'PushPin',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.PushPin',
          byKey: 'pupiLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'PushPin',
          label: '頭徑(ø)',
          groupIdPath: 'partlistvalue.formData.thermal-module.PushPin',
          byKey: 'pupiHeadDiameter',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Label',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Label',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Label',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Label',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Label',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Label',
          byKey: 'labelThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Sponge',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Sponge',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '材料 Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '厚度(t) Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeMaterialThicknessRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Sponge',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Sponge',
          byKey: 'spongeWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Mylar',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Mylar',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '材料 Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterialThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '厚度(t) Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarMaterialThicknessRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠材料',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠材料 Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveMaterialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar',
          label: '背膠厚度(t) Remark',
          groupIdPath: 'partlistvalue.formData.thermal-module.Mylar',
          byKey: 'mylarAdhesiveThicknessRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Grease',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'Grease',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '材質',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '寬度(W)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Grease',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.Grease',
          byKey: 'greaseThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'ThermalPad',
      style: {
        color: null,
        border: {
        },
      },
      contents: [
        {
          parentKey: 'ThermalPad',
          label: '用量',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadAmount',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '熱傳係數(K值)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadHeatTransferCoefficient',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '硬度',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadShore',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '厚度(t)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'ThermalPad',
          label: '長度(L)',
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
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
          groupIdPath: 'partlistvalue.formData.thermal-module.ThermalPad',
          byKey: 'thermalPadWidth',
          style: {
            color: null,
            border: {
              bottomBorderStyle: 'thick',
            },
          },
          contents: [],
        },
      ],
    },
  ],
  quotation: quotationSetting,
}

