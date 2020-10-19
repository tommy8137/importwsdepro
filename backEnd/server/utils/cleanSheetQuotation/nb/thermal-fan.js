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
          'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
          'byKey': 'component_price',
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI2',
        'rowIndex': 2,
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI3',
        'rowIndex': 3,
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI4',
        'rowIndex': 4,
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI5',
        'rowIndex': 5,
        'cellIndex': 1,
        'label': '風扇cost增加',
        'type': 'formula',
        'description': '=IFERROR(IF(OR(CI1RI2>=100, CI1RI3>=100, CI1RI2*CI1RI3>=7225), 0.1, 0), 0)',
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI6',
        'rowIndex': 6,
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
        'mapper': {
          'true': 'Yes',
          '_default': 'No',
        },
      },
      {
        'xlsxKey': 'CI1RI7',
        'rowIndex': 7,
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
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI8',
        'rowIndex': 8,
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI9',
        'rowIndex': 9,
        'cellIndex': 1,
        'label': '馬達差異',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'motorArchitecturePrice.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI10',
        'rowIndex': 10,
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI11',
        'rowIndex': 11,
        'cellIndex': 1,
        'label': '軸承差異',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'bearingAndSleevePrice.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI13',
        'rowIndex': 13,
        'cellIndex': 1,
        'label': '扇葉材料差異',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fanBladeMaterialPrice.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI14',
        'rowIndex': 14,
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
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI15',
        'rowIndex': 15,
        'cellIndex': 1,
        'label': '磁石材料差異',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'magnetMaterialAndSizePrice.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI16',
        'rowIndex': 16,
        'cellIndex': 1,
        'label': '電壓',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fanVoltage.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI17',
        'rowIndex': 17,
        'cellIndex': 1,
        'label': '電壓單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fanVoltagePrice.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI18',
        'rowIndex': 18,
        'cellIndex': 1,
        'label': '單價',
        'type': 'formula',
        'description': '=CI1RI7+CI1RI9+CI1RI11+CI1RI13+CI1RI15+CI1RI17+CI1RI5',
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
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI19',
        'rowIndex': 19,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'fanAmount.value',
        'contents': [],
        'parentKey': 'Fan',
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      },
      {
        'xlsxKey': 'CI1RI20',
        'rowIndex': 20,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單價 * 用量',
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
        'xlsxKey': 'CI1RI21',
        'rowIndex': 21,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI18*CI1RI19',
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
        'parent': 'partlistprice.forDebug.debugInfo.Fan',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI22',
    'rowIndex': 22,
    'cellIndex': 0,
    'label': 'B.加工費',
    'type': 'formula',
    'description': '=CI1RI26+CI1RI33+CI1RI37',
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
    'xlsxKey': 'CI0RI23',
    'rowIndex': 23,
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
        'xlsxKey': 'CI1RI23',
        'rowIndex': 23,
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
        'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.maskSpray_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI24',
        'rowIndex': 24,
        'cellIndex': 1,
        'label': '數量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.Price.thermalFan.maskSpray',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI25',
        'rowIndex': 25,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '工時費(次) * 數量',
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
        'xlsxKey': 'CI1RI26',
        'rowIndex': 26,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI23*CI1RI24',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.thermalFan.maskSpray',
      }
    ],
    'existKey': 'partlistvalue.Price.thermalFan.maskSpray',
  },
  {
    'xlsxKey': 'CI0RI27',
    'rowIndex': 27,
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
        'xlsxKey': 'CI1RI27',
        'rowIndex': 27,
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
        'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.laserMarking_unit_price.value',
        'contents': [],
        'existKey': 'partlistprice.forDebug.debugInfo.thermalFan.laserMarking.value',
      },
      {
        'xlsxKey': 'CI1RI28',
        'rowIndex': 28,
        'cellIndex': 1,
        'label': '雷雕總面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.laserMarkingArea.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI29',
        'rowIndex': 29,
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
        'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.laserMarking_area.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI30',
        'rowIndex': 30,
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
        'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.laserMarking_area_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI31',
        'rowIndex': 31,
        'cellIndex': 1,
        'label': '雷雕加工費',
        'type': 'formula',
        'description': '=CI1RI28/CI1RI29*CI1RI30',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI32',
        'rowIndex': 32,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '機台費(次) + 雷雕加工費',
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
        'xlsxKey': 'CI1RI33',
        'rowIndex': 33,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI27+CI1RI31',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.thermalFan.laserMarking',
      }
    ],
    'existKey': 'partlistvalue.Price.thermalFan.laserMarking',
  },
  {
    'xlsxKey': 'CI0RI34',
    'rowIndex': 34,
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
        'xlsxKey': 'CI1RI34',
        'rowIndex': 34,
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
        'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.painting_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI35',
        'rowIndex': 35,
        'cellIndex': 1,
        'label': '數量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.appearanceProcess.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI36',
        'rowIndex': 36,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '工時費(次) * 數量',
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
        'xlsxKey': 'CI1RI37',
        'rowIndex': 37,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI34*CI1RI35',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000',
        },
        'contents': [],
        'existKey': 'partlistprice.forDebug.debugInfo.thermalFan.appearanceProcess.value',
      }
    ],
    'existKey': 'partlistprice.forDebug.debugInfo.thermalFan.appearanceProcess.value',
  },
  {
    'xlsxKey': 'CI1RI38',
    'rowIndex': 38,
    'cellIndex': 0,
    'label': 'A.零件費用',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.thermal-fan.Fan',
          'byKey': 'component_price',
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
    'xlsxKey': 'CI1RI39',
    'rowIndex': 39,
    'cellIndex': 0,
    'label': 'B.加工費',
    'type': 'formula',
    'description': '=CI1RI22',
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
    'xlsxKey': 'CI1RI40',
    'rowIndex': 40,
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
    'byKey': 'partlistprice.forDebug.debugInfo.thermalFan.profit_percent.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI41',
    'rowIndex': 41,
    'cellIndex': 0,
    'label': 'C.管銷&利潤(15%)',
    'type': 'formula',
    'description': '=CI1RI39*CI1RI40',
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
    'xlsxKey': 'CI1RI42',
    'rowIndex': 42,
    'cellIndex': 0,
    'label': 'D.成品總價(USD)',
    'type': 'formula',
    'description': '=CI1RI0+CI1RI22+CI1RI41',
    'style': {
      'color': '0000FF',
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.0000',
    },
    'contents': []
  }
]
