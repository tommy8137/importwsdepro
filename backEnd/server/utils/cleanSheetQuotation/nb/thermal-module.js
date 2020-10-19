module.exports = [
  {
    'xlsxKey': 'CI1RI0',
    'rowIndex': 0,
    'cellIndex': 0,
    'label': 'A.零件費用',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.ORing',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
        },
        {
          'byKey': 'component_price',
          'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
        }
      ],
      'wrapper': 'IFERROR(FORMULA, "")',
    },
    'style': {
      'color': '0000FF',
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': []
  },
  {
    'xlsxKey': 'CI0RI1',
    'rowIndex': 1,
    'cellIndex': 0,
    'label': 'Fan',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI1',
        'rowIndex': 1,
        'cellIndex': 1,
        'label': '組裝次數',
        'type': 'formula',
        'description': '=CI1RI15*CI1RI2',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'byKey': 'assemble_time',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI2',
        'rowIndex': 2,
        'cellIndex': 1,
        'label': '檢驗+組裝次數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fanAssemblyTimeNumber.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI3',
        'rowIndex': 3,
        'cellIndex': 1,
        'label': '風扇型式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fanType',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI4',
        'rowIndex': 4,
        'cellIndex': 1,
        'label': 'X(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'fanSizePanel.fanSizeX',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI5',
        'rowIndex': 5,
        'cellIndex': 1,
        'label': 'Y(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'fanSizePanel.fanSizeY',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI6',
        'rowIndex': 6,
        'cellIndex': 1,
        'label': 'Fan size (H=馬達高度)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'fanSizePanel.fanSize',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI7',
        'rowIndex': 7,
        'cellIndex': 1,
        'label': '風扇cost增加',
        'type': 'formula',
        'description': '=IFERROR(IF(OR(CI1RI4>=100, CI1RI5>=100, CI1RI4*CI1RI5>=7225), 0.1, 0), 0)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI8',
        'rowIndex': 8,
        'cellIndex': 1,
        'label': '打凸',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'poundOut',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
        'mapper': {
          'true': 'Yes',
          '_default': 'No',
        }
      },
      {
        'xlsxKey': 'CI1RI9',
        'rowIndex': 9,
        'cellIndex': 1,
        'label': 'Baseline',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'fanSizePrice.value',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI10',
        'rowIndex': 10,
        'cellIndex': 1,
        'label': '馬達架構',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'motorArchitecture',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI11',
        'rowIndex': 11,
        'cellIndex': 1,
        'label': '軸承和套筒',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'bearingAndSleeve',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI12',
        'rowIndex': 12,
        'cellIndex': 1,
        'label': '扇葉材料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fanBladeMaterial',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI13',
        'rowIndex': 13,
        'cellIndex': 1,
        'label': '磁石材料及尺寸',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'magnetMaterialAndSize',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI14',
        'rowIndex': 14,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'unit_price.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI15',
        'rowIndex': 15,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fanAmount',
        'contents': [],
        'parentKey': 'Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI16',
        'rowIndex': 16,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'fanLossRate.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      },
      {
        'xlsxKey': 'CI1RI17',
        'rowIndex': 17,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI18',
        'rowIndex': 18,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI14*CI1RI15*(1+CI1RI16)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000000',
        },
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI19',
    'rowIndex': 19,
    'cellIndex': 0,
    'label': 'Pipe',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI19',
        'rowIndex': 19,
        'cellIndex': 1,
        'label': 'Pipe型式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'pipeType',
        'contents': [],
        'parentKey': 'Pipe',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      },
      {
        'xlsxKey': 'CI1RI20',
        'rowIndex': 20,
        'cellIndex': 1,
        'label': '外徑',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'outerDiameter',
        'contents': [],
        'parentKey': 'Pipe',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      },
      {
        'xlsxKey': 'CI1RI21',
        'rowIndex': 21,
        'cellIndex': 1,
        'label': '長度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'pipeLength',
        'contents': [],
        'parentKey': 'Pipe',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      },
      {
        'xlsxKey': 'CI1RI22',
        'rowIndex': 22,
        'cellIndex': 1,
        'label': '打扁厚度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'pipeFlatteningThickness',
        'contents': [],
        'parentKey': 'Pipe',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      },
      {
        'xlsxKey': 'CI1RI23',
        'rowIndex': 23,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'pipiLenThickODiaToCost.value',
        'contents': [],
        'parentKey': 'Pipe',
        'parent': 'partlistprice.forDebug.debugInfo.Pipe',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      },
      {
        'xlsxKey': 'CI1RI24',
        'rowIndex': 24,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'pipeAmount',
        'contents': [],
        'parentKey': 'Pipe',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      },
      {
        'xlsxKey': 'CI1RI25',
        'rowIndex': 25,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'pipe_loss_rate.value',
        'contents': [],
        'parentKey': 'Pipe',
        'parent': 'partlistprice.forDebug.debugInfo.Pipe',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      },
      {
        'xlsxKey': 'CI1RI26',
        'rowIndex': 26,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI27',
        'rowIndex': 27,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI23*CI1RI24*(1+CI1RI25)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Pipe',
        'parent': 'partlistprice.forDebug.debugInfo.Pipe',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI28',
    'rowIndex': 28,
    'cellIndex': 0,
    'label': 'Fin',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI28',
        'rowIndex': 28,
        'cellIndex': 1,
        'label': '成品尺寸長度(L)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'finProductionSize.finProductionLength',
        'contents': [],
        'parentKey': 'Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI29',
        'rowIndex': 29,
        'cellIndex': 1,
        'label': '成品尺寸寬度(W)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'finProductionSize.finProductionWidth',
        'contents': [],
        'parentKey': 'Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI30',
        'rowIndex': 30,
        'cellIndex': 1,
        'label': '成品尺寸高度(H)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'finProductionSize.finProductionHigh',
        'contents': [],
        'parentKey': 'Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI31',
        'rowIndex': 31,
        'cellIndex': 1,
        'label': '材料厚度(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'finMaterialThickness.value',
        'contents': [],
        'parentKey': 'Fin',
        'parent': 'partlistprice.forDebug.debugInfo.Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI32',
        'rowIndex': 32,
        'cellIndex': 1,
        'label': 'Pitch',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'finPitch',
        'contents': [],
        'parentKey': 'Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI33',
        'rowIndex': 33,
        'cellIndex': 1,
        'label': '片數',
        'type': 'formula',
        'description': '=ROUNDUP(CI1RI28/CI1RI32,0)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI34',
        'rowIndex': 34,
        'cellIndex': 1,
        'label': '材料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'finMaterial',
        'contents': [],
        'parentKey': 'Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI35',
        'rowIndex': 35,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'unit_price.value',
        'contents': [],
        'parentKey': 'Fin',
        'parent': 'partlistprice.forDebug.debugInfo.Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI36',
        'rowIndex': 36,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'finAmount',
        'contents': [],
        'parentKey': 'Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI37',
        'rowIndex': 37,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'fin_loss_rate.value',
        'contents': [],
        'parentKey': 'Fin',
        'parent': 'partlistprice.forDebug.debugInfo.Fin',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      },
      {
        'xlsxKey': 'CI1RI38',
        'rowIndex': 38,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI39',
        'rowIndex': 39,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI35*CI1RI36*(1+CI1RI37)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Fin',
        'parent': 'partlistprice.forDebug.debugInfo.Fin',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI40',
    'rowIndex': 40,
    'cellIndex': 0,
    'label': 'Plate',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI40',
        'rowIndex': 40,
        'cellIndex': 1,
        'label': '成品尺寸寬度(W)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thPlProductionWidth',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistvalue.Price.thermalModule.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      },
      {
        'xlsxKey': 'CI1RI41',
        'rowIndex': 41,
        'cellIndex': 1,
        'label': '成品尺寸高度(H)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thPlProductionHigh',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistvalue.Price.thermalModule.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      },
      {
        'xlsxKey': 'CI1RI42',
        'rowIndex': 42,
        'cellIndex': 1,
        'label': '材料厚度(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thPlMaterialThickness.value',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      },
      {
        'xlsxKey': 'CI1RI43',
        'rowIndex': 43,
        'cellIndex': 1,
        'label': '鍍鎳',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0',
        },
        'byKey': 'thPlNickelPlating.value',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI44',
        'rowIndex': 44,
        'cellIndex': 1,
        'label': '鉚接',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0',
        },
        'byKey': 'thPlRiveting.value',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI45',
        'rowIndex': 45,
        'cellIndex': 1,
        'label': '材料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thPlMaterial',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistvalue.Price.thermalModule.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      },
      {
        'xlsxKey': 'CI1RI46',
        'rowIndex': 46,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'unit_price.value',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      },
      {
        'xlsxKey': 'CI1RI47',
        'rowIndex': 47,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thPlAmount.value',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      },
      {
        'xlsxKey': 'CI1RI48',
        'rowIndex': 48,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'thermal_plate_loss_rate.value',
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalPlate',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      },
      {
        'xlsxKey': 'CI1RI49',
        'rowIndex': 49,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI50',
        'rowIndex': 50,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI46*CI1RI47*(1+CI1RI48)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'ThermalPlate',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalPlate',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI51',
    'rowIndex': 51,
    'cellIndex': 0,
    'label': 'block',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI51',
        'rowIndex': 51,
        'cellIndex': 1,
        'label': '成品尺寸長度(L)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thBlProductionLength',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistvalue.Price.thermalModule.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      },
      {
        'xlsxKey': 'CI1RI52',
        'rowIndex': 52,
        'cellIndex': 1,
        'label': '成品尺寸寬度(W)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thBlProductionWidth',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistvalue.Price.thermalModule.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      },
      {
        'xlsxKey': 'CI1RI53',
        'rowIndex': 53,
        'cellIndex': 1,
        'label': '材料厚度(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thBlMaterialThickness.value',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      },
      {
        'xlsxKey': 'CI1RI54',
        'rowIndex': 54,
        'cellIndex': 1,
        'label': '鍍鎳',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0',
        },
        'byKey': 'thBlNickelPlating.value',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI55',
        'rowIndex': 55,
        'cellIndex': 1,
        'label': '材料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thBlMaterial',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistvalue.Price.thermalModule.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      },
      {
        'xlsxKey': 'CI1RI56',
        'rowIndex': 56,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'unit_price.value',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      },
      {
        'xlsxKey': 'CI1RI57',
        'rowIndex': 57,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'thBlAmount.value',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      },
      {
        'xlsxKey': 'CI1RI58',
        'rowIndex': 58,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'thermal_block_loss_rate.value',
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalBlock',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      },
      {
        'xlsxKey': 'CI1RI59',
        'rowIndex': 59,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI60',
        'rowIndex': 60,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI56*CI1RI57*(1+CI1RI58)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'ThermalBlock',
        'parent': 'partlistprice.forDebug.debugInfo.ThermalBlock',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI61',
    'rowIndex': 61,
    'cellIndex': 0,
    'label': 'screw',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI61',
        'rowIndex': 61,
        'cellIndex': 1,
        'label': '頭徑(ø)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwHeadDiameter',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistvalue.Price.thermalModule.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI62',
        'rowIndex': 62,
        'cellIndex': 1,
        'label': '頭厚(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwHeadThickness',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistvalue.Price.thermalModule.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI63',
        'rowIndex': 63,
        'cellIndex': 1,
        'label': '長度(L)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwLength',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistvalue.Price.thermalModule.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI64',
        'rowIndex': 64,
        'cellIndex': 1,
        'label': '光桿',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwPolishedRod',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistvalue.Price.thermalModule.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI65',
        'rowIndex': 65,
        'cellIndex': 1,
        'label': '頸徑',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwNeckDiameter',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistvalue.Price.thermalModule.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI66',
        'rowIndex': 66,
        'cellIndex': 1,
        'label': '頸高',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwNeckLength',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistvalue.Price.thermalModule.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI67',
        'rowIndex': 67,
        'cellIndex': 1,
        'label': '耐落',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwResistantFall',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistvalue.Price.thermalModule.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI68',
        'rowIndex': 68,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'screw_unit_price.value',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistprice.forDebug.debugInfo.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI69',
        'rowIndex': 69,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'screwAmount.value',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistprice.forDebug.debugInfo.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI70',
        'rowIndex': 70,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'screw_loss_rate.value',
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistprice.forDebug.debugInfo.Screw',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      },
      {
        'xlsxKey': 'CI1RI71',
        'rowIndex': 71,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI72',
        'rowIndex': 72,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI68*CI1RI69*(1+CI1RI70)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Screw',
        'parent': 'partlistprice.forDebug.debugInfo.Screw',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI73',
    'rowIndex': 73,
    'cellIndex': 0,
    'label': 'Grease',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI73',
        'rowIndex': 73,
        'cellIndex': 1,
        'label': '寬度(W)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'greaseWidth',
        'contents': [],
        'parentKey': 'Grease',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
      },
      {
        'xlsxKey': 'CI1RI74',
        'rowIndex': 74,
        'cellIndex': 1,
        'label': '厚度(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'greaseThickness',
        'contents': [],
        'parentKey': 'Grease',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
      },
      {
        'xlsxKey': 'CI1RI75',
        'rowIndex': 75,
        'cellIndex': 1,
        'label': '材質',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'greaseMaterial',
        'contents': [],
        'parentKey': 'Grease',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
      },
      {
        'xlsxKey': 'CI1RI76',
        'rowIndex': 76,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'unit_price.value',
        'contents': [],
        'parentKey': 'Grease',
        'parent': 'partlistprice.forDebug.debugInfo.Grease',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
      },
      {
        'xlsxKey': 'CI1RI77',
        'rowIndex': 77,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'greaseAmount',
        'contents': [],
        'parentKey': 'Grease',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
      },
      {
        'xlsxKey': 'CI1RI78',
        'rowIndex': 78,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'grease_loss_rate.value',
        'contents': [],
        'parentKey': 'Grease',
        'parent': 'partlistprice.forDebug.debugInfo.Grease',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
      },
      {
        'xlsxKey': 'CI1RI79',
        'rowIndex': 79,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI80',
        'rowIndex': 80,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI76*CI1RI77*(1+CI1RI78)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Grease',
        'parent': 'partlistprice.forDebug.debugInfo.Grease',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI81',
    'rowIndex': 81,
    'cellIndex': 0,
    'label': 'Spring',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI81',
        'rowIndex': 81,
        'cellIndex': 1,
        'label': '線圈中心徑',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'springCoilCenterDiameter',
        'contents': [],
        'parentKey': 'Spring',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
      },
      {
        'xlsxKey': 'CI1RI82',
        'rowIndex': 82,
        'cellIndex': 1,
        'label': '自由長 (L)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'springFreeLong',
        'contents': [],
        'parentKey': 'Spring',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
      },
      {
        'xlsxKey': 'CI1RI83',
        'rowIndex': 83,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'spring_unit_price.value',
        'contents': [],
        'parentKey': 'Spring',
        'parent': 'partlistprice.forDebug.debugInfo.Spring',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
      },
      {
        'xlsxKey': 'CI1RI84',
        'rowIndex': 84,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'springAmount.value',
        'contents': [],
        'parentKey': 'Spring',
        'parent': 'partlistprice.forDebug.debugInfo.Spring',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
      },
      {
        'xlsxKey': 'CI1RI85',
        'rowIndex': 85,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'spring_loss_rate.value',
        'contents': [],
        'parentKey': 'Spring',
        'parent': 'partlistprice.forDebug.debugInfo.Spring',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
      },
      {
        'xlsxKey': 'CI1RI86',
        'rowIndex': 86,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI87',
        'rowIndex': 87,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI83*CI1RI84*(1+CI1RI85)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Spring',
        'parent': 'partlistprice.forDebug.debugInfo.Spring',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI88',
    'rowIndex': 88,
    'cellIndex': 0,
    'label': 'O-Ring',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI88',
        'rowIndex': 88,
        'cellIndex': 1,
        'label': '內徑(ø)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'oRInnerDiameter',
        'contents': [],
        'parentKey': 'ORing',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ORing',
      },
      {
        'xlsxKey': 'CI1RI89',
        'rowIndex': 89,
        'cellIndex': 1,
        'label': '厚度(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'oRThickness',
        'contents': [],
        'parentKey': 'ORing',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ORing',
      },
      {
        'xlsxKey': 'CI1RI90',
        'rowIndex': 90,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'oRing_unit_price.value',
        'contents': [],
        'parentKey': 'ORing',
        'parent': 'partlistprice.forDebug.debugInfo.ORing',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ORing',
      },
      {
        'xlsxKey': 'CI1RI91',
        'rowIndex': 91,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'oRAmount.value',
        'contents': [],
        'parentKey': 'ORing',
        'parent': 'partlistprice.forDebug.debugInfo.ORing',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ORing',
      },
      {
        'xlsxKey': 'CI1RI92',
        'rowIndex': 92,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'oRing_loss_rate.value',
        'contents': [],
        'parentKey': 'ORing',
        'parent': 'partlistprice.forDebug.debugInfo.ORing',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ORing',
      },
      {
        'xlsxKey': 'CI1RI93',
        'rowIndex': 93,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI94',
        'rowIndex': 94,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI90*CI1RI91*(1+CI1RI92)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'ORing',
        'parent': 'partlistprice.forDebug.debugInfo.ORing',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.ORing',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI95',
    'rowIndex': 95,
    'cellIndex': 0,
    'label': 'Mylar',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI95',
        'rowIndex': 95,
        'cellIndex': 1,
        'label': '材料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarMaterial',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI96',
        'rowIndex': 96,
        'cellIndex': 1,
        'label': '材料 Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarMaterialRemark',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI97',
        'rowIndex': 97,
        'cellIndex': 1,
        'label': '長度(L)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarLength',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI98',
        'rowIndex': 98,
        'cellIndex': 1,
        'label': '寬度(W)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'mylarWidth',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI99',
        'rowIndex': 99,
        'cellIndex': 1,
        'label': '背膠-厚度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarAdhesiveThickness',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI100',
        'rowIndex': 100,
        'cellIndex': 1,
        'label': '背膠-厚度 Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarAdhesiveThicknessRemark',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI101',
        'rowIndex': 101,
        'cellIndex': 1,
        'label': '背膠材料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarAdhesiveMaterial',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI102',
        'rowIndex': 102,
        'cellIndex': 1,
        'label': '背膠材料 Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarAdhesiveMaterialRemark',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI103',
        'rowIndex': 103,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'unit_price.value',
        'contents': [],
        'parentKey': 'Mylar',
        'parent': 'partlistprice.forDebug.debugInfo.Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI104',
        'rowIndex': 104,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'mylarAmount',
        'contents': [],
        'parentKey': 'Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI105',
        'rowIndex': 105,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'mylar_loss_rate.value',
        'contents': [],
        'parentKey': 'Mylar',
        'parent': 'partlistprice.forDebug.debugInfo.Mylar',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      },
      {
        'xlsxKey': 'CI1RI106',
        'rowIndex': 106,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI107',
        'rowIndex': 107,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI103*CI1RI104*(1+CI1RI105)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Mylar',
        'parent': 'partlistprice.forDebug.debugInfo.Mylar',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI108',
    'rowIndex': 108,
    'cellIndex': 0,
    'label': 'Label',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI108',
        'rowIndex': 108,
        'cellIndex': 1,
        'label': '寬度(W)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'labelWidth',
        'contents': [],
        'parentKey': 'Label',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
      },
      {
        'xlsxKey': 'CI1RI109',
        'rowIndex': 109,
        'cellIndex': 1,
        'label': '厚度(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'labelThickness',
        'contents': [],
        'parentKey': 'Label',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
      },
      {
        'xlsxKey': 'CI1RI110',
        'rowIndex': 110,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'label_unit_price.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.Label',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
      },
      {
        'xlsxKey': 'CI1RI111',
        'rowIndex': 111,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'labelAmount',
        'contents': [],
        'parentKey': 'Label',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
      },
      {
        'xlsxKey': 'CI1RI112',
        'rowIndex': 112,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'label_loss_rate.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.Label',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
      },
      {
        'xlsxKey': 'CI1RI113',
        'rowIndex': 113,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI114',
        'rowIndex': 114,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI110*CI1RI111*(1+CI1RI112)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.Label',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI115',
    'rowIndex': 115,
    'cellIndex': 0,
    'label': 'Sponge',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI115',
        'rowIndex': 115,
        'cellIndex': 1,
        'label': '寬度(W)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'spongeWidth',
        'contents': [],
        'parentKey': 'Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI116',
        'rowIndex': 116,
        'cellIndex': 1,
        'label': '厚度(t)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'spongeMaterialThickness',
        'contents': [],
        'parentKey': 'Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI117',
        'rowIndex': 117,
        'cellIndex': 1,
        'label': '厚度(t) Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'spongeMaterialThicknessRemark',
        'contents': [],
        'parentKey': 'Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI118',
        'rowIndex': 118,
        'cellIndex': 1,
        'label': '材料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'spongeMaterial',
        'contents': [],
        'parentKey': 'Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI119',
        'rowIndex': 119,
        'cellIndex': 1,
        'label': '材料 Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'spongeMaterialRemark',
        'contents': [],
        'parentKey': 'Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI120',
        'rowIndex': 120,
        'cellIndex': 1,
        'label': '單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'unit_price.value',
        'contents': [],
        'parentKey': 'Sponge',
        'parent': 'partlistprice.forDebug.debugInfo.Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI121',
        'rowIndex': 121,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'spongeAmount',
        'contents': [],
        'parentKey': 'Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI122',
        'rowIndex': 122,
        'cellIndex': 1,
        'label': 'LOSS(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'sponge_loss_rate.value',
        'contents': [],
        'parentKey': 'Sponge',
        'parent': 'partlistprice.forDebug.debugInfo.Sponge',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      },
      {
        'xlsxKey': 'CI1RI123',
        'rowIndex': 123,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價*用量*(1+LOSS(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI124',
        'rowIndex': 124,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI120*CI1RI121*(1+CI1RI122)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Sponge',
        'parent': 'partlistprice.forDebug.debugInfo.Sponge',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI125',
    'rowIndex': 125,
    'cellIndex': 0,
    'label': 'B.加工費',
    'type': 'formula',
    'description': '=CI1RI131+CI1RI135+CI1RI142+CI1RI146',
    'style': {
      'color': '0000FF',
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': []
  },
  {
    'xlsxKey': 'CI0RI126',
    'rowIndex': 126,
    'cellIndex': 0,
    'label': 'Assembly組裝',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI126',
        'rowIndex': 126,
        'cellIndex': 1,
        'label': '工時費(Min)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.worktimeCost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI127',
        'rowIndex': 127,
        'cellIndex': 1,
        'label': '單件組裝工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.summary.thermalModule.worktimeSec',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI128',
        'rowIndex': 128,
        'cellIndex': 1,
        'label': '總組裝次數',
        'type': 'formula',
        'description': {
          'type': 'sum',
          'set': [
            {
              'byKey': 'assemble_time',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Fan',
            },
            {
              'byKey': 'pipeAmount',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Pipe',
            },
            {
              'byKey': 'finAmount',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Fin',
            },
            {
              'byKey': 'thPlAmount.value',
              'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalPlate',
            },
            {
              'byKey': 'thBlAmount.value',
              'groupIdPath': 'partlistvalue.formData.thermal-module.ThermalBlock',
            },
            {
              'byKey': 'screwAmount.value',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Screw',
            },
            {
              'byKey': 'greaseAmount',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Grease',
            },
            {
              'byKey': 'springAmount.value',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Spring',
            },
            {
              'byKey': 'mylarAmount',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Mylar',
            },
            {
              'byKey': 'labelAmount',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Label',
            },
            {
              'byKey': 'spongeAmount',
              'groupIdPath': 'partlistvalue.formData.thermal-module.Sponge',
            }
          ],
          'wrapper': 'IFERROR(FORMULA-1 , "")',
        },
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI129',
        'rowIndex': 129,
        'cellIndex': 1,
        'label': '總組裝工時',
        'type': 'formula',
        'description': '=CI1RI128*CI1RI127',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI130',
        'rowIndex': 130,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(SEC/60)*工時費(Min)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI131',
        'rowIndex': 131,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=(CI1RI129/60)*CI1RI126',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': []
      }
    ],
    'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.assembly_cost.value',
  },
  {
    'xlsxKey': 'CI0RI132',
    'rowIndex': 132,
    'cellIndex': 0,
    'label': '遮噴',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI132',
        'rowIndex': 132,
        'cellIndex': 1,
        'label': '工時費(次)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.maskSpray_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI133',
        'rowIndex': 133,
        'cellIndex': 1,
        'label': '數量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.maskSpray.value',
        'contents': [],
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI134',
        'rowIndex': 134,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '工時費(次)*數量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI135',
        'rowIndex': 135,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI132*CI1RI133',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000',
        },
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI136',
    'rowIndex': 136,
    'cellIndex': 0,
    'label': '雷雕',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI136',
        'rowIndex': 136,
        'cellIndex': 1,
        'label': '機台費(次)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.laserMarking_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI137',
        'rowIndex': 137,
        'cellIndex': 1,
        'label': '雷雕總面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.laserMarkingArea.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI138',
        'rowIndex': 138,
        'cellIndex': 1,
        'label': '雷雕單位面積',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.laserMarking_area.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI139',
        'rowIndex': 139,
        'cellIndex': 1,
        'label': '雷雕單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.laserMarking_area_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI140',
        'rowIndex': 140,
        'cellIndex': 1,
        'label': '雷雕加工費',
        'type': 'formula',
        'description': '=IFERROR(CI1RI137/CI1RI138*CI1RI139, 0)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI141',
        'rowIndex': 141,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '機台費(次)+雷雕加工費',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI142',
        'rowIndex': 142,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=IF(CI1RI137 > 0, CI1RI136+CI1RI140, 0)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000',
        },
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI143',
    'rowIndex': 143,
    'cellIndex': 0,
    'label': '噴漆',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI143',
        'rowIndex': 143,
        'cellIndex': 1,
        'label': '工時費(Min)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.painting_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI144',
        'rowIndex': 144,
        'cellIndex': 1,
        'label': '數量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.appearanceProcess.value',
        'contents': [],
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI145',
        'rowIndex': 145,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '工時費(Min)*數量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI146',
        'rowIndex': 146,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI143*CI1RI144',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000',
        },
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI147',
    'rowIndex': 147,
    'cellIndex': 0,
    'label': 'A.零件費',
    'type': 'formula',
    'description': '=CI1RI0',
    'style': {
      'color': '0000FF',
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.00',
    },
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI148',
    'rowIndex': 148,
    'cellIndex': 0,
    'label': 'B.加工費',
    'type': 'formula',
    'description': '=CI1RI125',
    'style': {
      'color': '0000FF',
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI149',
    'rowIndex': 149,
    'cellIndex': 0,
    'label': '管銷利潤比重',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '0.0%',
    },
    'byKey': 'partlistprice.forDebug.debugInfo.thermalModule.profit_percent.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI150',
    'rowIndex': 150,
    'cellIndex': 0,
    'label': 'C.管銷&利潤',
    'type': 'formula',
    'description': '=CI1RI148*CI1RI149',
    'style': {
      'color': '0000FF',
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI151',
    'rowIndex': 151,
    'cellIndex': 0,
    'label': 'D.成品總價',
    'type': 'formula',
    'description': '=CI1RI147+CI1RI148+CI1RI150',
    'style': {
      'color': '0000FF',
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.00000',
    },
    'contents': []
  }
]
