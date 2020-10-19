module.exports = [
  {
    'xlsxKey': 'CI1RI0',
    'rowIndex': 0,
    'cellIndex': 0,
    'label': 'A.材料費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
          'byKey': 'CWWirePrice',
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
    'label': '鐵氟龍線',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI1',
        'rowIndex': 1,
        'cellIndex': 1,
        'label': 'Gauge',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'teflonGuage',
        'contents': [],
        'parentKey': '鐵氟龍線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI2',
        'rowIndex': 2,
        'cellIndex': 1,
        'label': 'Cable材料單價(Price/m)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'teflonUnitPrice.value',
        'contents': [],
        'parentKey': '鐵氟龍線',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI3',
        'rowIndex': 3,
        'cellIndex': 1,
        'label': 'Pin數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'teflonPin',
        'contents': [],
        'parentKey': '鐵氟龍線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI4',
        'rowIndex': 4,
        'cellIndex': 1,
        'label': 'Cable length(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'teflonLength',
        'contents': [],
        'parentKey': '鐵氟龍線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI5',
        'rowIndex': 5,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'loss_rate.value',
        'contents': [],
        'parentKey': '鐵氟龍線',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI6',
        'rowIndex': 6,
        'cellIndex': 1,
        'label': 'QTY',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'teflonQty',
        'contents': [],
        'parentKey': '鐵氟龍線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI7',
        'rowIndex': 7,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(Cable材料單價 * 0.001) * Cable length * Pin數 * (1 + Loss Rate(%)) * QTY',
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
        'xlsxKey': 'CI1RI8',
        'rowIndex': 8,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=(CI1RI2*0.001)*CI1RI4*CI1RI3*(1+CI1RI5)*CI1RI6',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '鐵氟龍線',
        'byKey': 'CWWirePrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI9',
    'rowIndex': 9,
    'cellIndex': 0,
    'label': '同軸線',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI9',
        'rowIndex': 9,
        'cellIndex': 1,
        'label': 'Gauge',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'coaxialGuage',
        'contents': [],
        'parentKey': '同軸線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI10',
        'rowIndex': 10,
        'cellIndex': 1,
        'label': 'Cable材料單價(Price/m)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'coaxialUnitPrice.value',
        'contents': [],
        'parentKey': '同軸線',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI11',
        'rowIndex': 11,
        'cellIndex': 1,
        'label': 'Pin數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'coaxialPin',
        'contents': [],
        'parentKey': '同軸線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI12',
        'rowIndex': 12,
        'cellIndex': 1,
        'label': 'Cable length(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'coaxialLength',
        'contents': [],
        'parentKey': '同軸線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI13',
        'rowIndex': 13,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'loss_rate.value',
        'contents': [],
        'parentKey': '同軸線',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI14',
        'rowIndex': 14,
        'cellIndex': 1,
        'label': 'QTY',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'coaxialQty',
        'contents': [],
        'parentKey': '同軸線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      },
      {
        'xlsxKey': 'CI1RI15',
        'rowIndex': 15,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(Cable材料單價 * 0.001) * Cable length * Pin數 * (1 + Loss Rate(%)) * QTY',
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
        'xlsxKey': 'CI1RI16',
        'rowIndex': 16,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=(CI1RI10*0.001)*CI1RI12*CI1RI11*(1+CI1RI13)*CI1RI14',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '同軸線',
        'byKey': 'CWWirePrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI17',
    'rowIndex': 17,
    'cellIndex': 0,
    'label': 'FFC',
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
        'xlsxKey': 'CI1RI17',
        'rowIndex': 17,
        'cellIndex': 1,
        'label': '材料單價(Price/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialPrice.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI18',
        'rowIndex': 18,
        'cellIndex': 1,
        'label': 'Pin數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCPin.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI19',
        'rowIndex': 19,
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
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCPitch.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI20',
        'rowIndex': 20,
        'cellIndex': 1,
        'label': 'L',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCLength.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI21',
        'rowIndex': 21,
        'cellIndex': 1,
        'label': 'W',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'ffcWidth.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI22',
        'rowIndex': 22,
        'cellIndex': 1,
        'label': '邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'ffcMaterialSide.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI23',
        'rowIndex': 23,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI24',
        'rowIndex': 24,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'L * ( W +邊料)*(材料單價(Price/m²)/1000000)*(1+Loss Rate(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI25',
        'rowIndex': 25,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI20*(CI1RI21+CI1RI22)*(CI1RI17/1000000)*(1+CI1RI23)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'byKey': 'CWWirePrice',
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI26',
    'rowIndex': 26,
    'cellIndex': 0,
    'label': 'Other_Fill_ME_Remark',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.0000',
    },
    'byKey': 'otherFillMeRemark',
    'contents': [],
    'parentKey': 'Other_Fill_ME_Remark',
    'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
  },
  {
    'xlsxKey': 'CI1RI27',
    'rowIndex': 27,
    'cellIndex': 0,
    'label': 'B.二次加工費',
    'type': 'formula',
    'description': '=CI1RI28+CI1RI35',
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
    'xlsxKey': 'CI1RI28',
    'rowIndex': 28,
    'cellIndex': 0,
    'label': '組工費總計',
    'type': 'formula',
    'description': '=(CI1RI32+CI1RI33)/CI1RI30*CI1RI31',
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
    'xlsxKey': 'CI1RI29',
    'rowIndex': 29,
    'cellIndex': 0,
    'label': '公式',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.00000',
    },
    'type': 'value',
    'description': '(Assembly time + 備料工時) / 時間單位換算常數 * 組裝費',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI30',
    'rowIndex': 30,
    'cellIndex': 0,
    'label': '時間單位換算常數',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0',
    },
    'byKey': 'partlistprice.forDebug.debugInfo.cableWire.timeunittransferconstant.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI31',
    'rowIndex': 31,
    'cellIndex': 0,
    'label': '組裝費(USD/min)',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.0000',
    },
    'byKey': 'partlistprice.forDebug.debugInfo.cableWire.spenginghourup.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI0RI32',
    'rowIndex': 32,
    'cellIndex': 0,
    'label': 'Assembly time(sec)',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI32',
        'rowIndex': 32,
        'cellIndex': 1,
        'label': 'Sec',
        'type': 'formula',
        'description': {
          'type': 'sum',
          'set': [
            {
              'byKey': 'assemblyTime',
            }
          ]
        },
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI33',
    'rowIndex': 33,
    'cellIndex': 0,
    'label': '備料工時(sec)',
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
        'xlsxKey': 'CI1RI33',
        'rowIndex': 33,
        'cellIndex': 1,
        'label': 'Sec',
        'type': 'formula',
        'description': '=CI1RI32*CI1RI34',
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
        'xlsxKey': 'CI1RI34',
        'rowIndex': 34,
        'cellIndex': 1,
        'label': '寬放時間比例',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.materialPreparationSecPercentage.value',
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI35',
    'rowIndex': 35,
    'cellIndex': 0,
    'label': '加工費總計',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
          'byKey': 'ffc_total_second_process',
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
      'numberFormat': '#,##0.00000',
    },
    'contents': []
  },
  {
    'xlsxKey': 'CI0RI36',
    'rowIndex': 36,
    'cellIndex': 0,
    'label': 'FFC',
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
        'xlsxKey': 'CI1RI36',
        'rowIndex': 36,
        'cellIndex': 1,
        'label': '折彎(次)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCBendTImes.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI37',
        'rowIndex': 37,
        'cellIndex': 1,
        'label': 'FFC 折彎單價(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCBendTImesPrice.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI38',
        'rowIndex': 38,
        'cellIndex': 1,
        'label': '折彎公式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'type': 'value',
        'description': '折彎(次) * FFC 折彎單價(USD)',
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI39',
        'rowIndex': 39,
        'cellIndex': 1,
        'label': '折彎Price',
        'type': 'formula',
        'description': '=CI1RI36*CI1RI37',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI40',
        'rowIndex': 40,
        'cellIndex': 1,
        'label': '印刷(面)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCPrint.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI41',
        'rowIndex': 41,
        'cellIndex': 1,
        'label': 'FFC 印刷單價(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCPrintPrice.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI42',
        'rowIndex': 42,
        'cellIndex': 1,
        'label': '印刷公式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'type': 'value',
        'description': '印刷(面) * FFC 印刷單價(USD)',
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI43',
        'rowIndex': 43,
        'cellIndex': 1,
        'label': '印刷Price',
        'type': 'formula',
        'description': '=CI1RI40*CI1RI41',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI44',
        'rowIndex': 44,
        'cellIndex': 1,
        'label': '沖型(次)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCFlushCount.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI45',
        'rowIndex': 45,
        'cellIndex': 1,
        'label': 'FFC 沖型單價(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCFlushCountPrice.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI46',
        'rowIndex': 46,
        'cellIndex': 1,
        'label': '沖型公式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'type': 'value',
        'description': '沖型(次)*FFC 沖型單價(USD)',
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI47',
        'rowIndex': 47,
        'cellIndex': 1,
        'label': '沖型Price',
        'type': 'formula',
        'description': '=CI1RI44*CI1RI45',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI48',
        'rowIndex': 48,
        'cellIndex': 1,
        'label': '金手指掛鍍(鍍金）/次',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCGoldPlating.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI49',
        'rowIndex': 49,
        'cellIndex': 1,
        'label': 'FFC 金手指掛鍍單價(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCGoldPlatingPrice.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI50',
        'rowIndex': 50,
        'cellIndex': 1,
        'label': 'Pin數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCPin.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI51',
        'rowIndex': 51,
        'cellIndex': 1,
        'label': 'Pitch(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCPitch.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI52',
        'rowIndex': 52,
        'cellIndex': 1,
        'label': '金手指掛鍍公式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'type': 'value',
        'description': '金手指掛鍍(鍍金）/次*Pin數*(Pitch*0.6)*5*FFC 金手指掛鍍單價(USD)*2',
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI53',
        'rowIndex': 53,
        'cellIndex': 1,
        'label': '金手指掛鍍Price',
        'type': 'formula',
        'description': '=CI1RI48*CI1RI50*(CI1RI51*0.6)*5*CI1RI49*2',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI54',
        'rowIndex': 54,
        'cellIndex': 1,
        'label': '停止線(條)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCStopLine.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI55',
        'rowIndex': 55,
        'cellIndex': 1,
        'label': 'FFC 停止線單價(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCStopLinePrice.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI56',
        'rowIndex': 56,
        'cellIndex': 1,
        'label': '停止線公式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'type': 'value',
        'description': '停止線(條)*FFC 停止線單價(USD)',
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI57',
        'rowIndex': 57,
        'cellIndex': 1,
        'label': '停止線Price',
        'type': 'formula',
        'description': '=CI1RI54*CI1RI55',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI58',
        'rowIndex': 58,
        'cellIndex': 1,
        'label': 'FFC焊工(工時/pin)(sec/pin)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCWelderSecPerPin.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI59',
        'rowIndex': 59,
        'cellIndex': 1,
        'label': 'FFC 焊工單價(USD/sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCWelderPrice.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI60',
        'rowIndex': 60,
        'cellIndex': 1,
        'label': 'Pin數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCPin.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI61',
        'rowIndex': 61,
        'cellIndex': 1,
        'label': '焊工公式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'type': 'value',
        'description': 'FFC 焊工(工時/pin)*Pin數/60*FFC 焊工單價(USD/sec)',
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI62',
        'rowIndex': 62,
        'cellIndex': 1,
        'label': '焊工Price',
        'type': 'formula',
        'description': '=CI1RI58*CI1RI60/60*CI1RI59',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI63',
        'rowIndex': 63,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '折彎Price+印刷Price+沖型Price+金手指掛鍍Price+停止線Price+焊工Price',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'CWFFCMaterialLossRate.value',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI64',
        'rowIndex': 64,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI39+CI1RI43+CI1RI47+CI1RI53+CI1RI57+CI1RI62',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'parentKey': 'FFC',
        'parent': 'partlistprice.forDebug.debugInfo.cableWireMaterial',
        'byKey': 'ffc_total_second_process',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI65',
    'rowIndex': 65,
    'cellIndex': 0,
    'label': 'C.零件費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'byKey': 'componentPrice',
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
    'xlsxKey': 'CI0RI66',
    'rowIndex': 66,
    'cellIndex': 0,
    'label': 'Connector',
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
        'xlsxKey': 'CI1RI66',
        'rowIndex': 66,
        'cellIndex': 1,
        'label': '品名',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'cableConnectorName',
        'contents': [],
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI67',
        'rowIndex': 67,
        'cellIndex': 1,
        'label': '品名 Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'cableConnectorNameRemark',
        'contents': [],
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI68',
        'rowIndex': 68,
        'cellIndex': 1,
        'label': 'Connector type',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'cableConnectorType',
        'contents': [],
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI69',
        'rowIndex': 69,
        'cellIndex': 1,
        'label': 'Connector type Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'cableConnectorTypeRemark',
        'contents': [],
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI70',
        'rowIndex': 70,
        'cellIndex': 1,
        'label': 'Vendor PN',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'cableConnectorVendorPn',
        'contents': [],
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI71',
        'rowIndex': 71,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'connectorAssembly.value',
        'contents': [],
        'parent': 'partlistprice.forDebug.debugInfo.cableConnector',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI72',
        'rowIndex': 72,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI71*CI1RI73',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI73',
        'rowIndex': 73,
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
        'byKey': 'use_amount.value',
        'contents': [],
        'parent': 'partlistprice.forDebug.debugInfo.cableConnector',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI74',
        'rowIndex': 74,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'cableConnectorUnitPrice.value',
        'contents': [],
        'parent': 'partlistprice.forDebug.debugInfo.cableConnector',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI75',
        'rowIndex': 75,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'loss_rate.value',
        'contents': [],
        'parent': 'partlistprice.forDebug.debugInfo.cableConnector',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      },
      {
        'xlsxKey': 'CI1RI76',
        'rowIndex': 76,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI77',
        'rowIndex': 77,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=IF(OR(CI1RI66="Other_Fill_ME_Remark", CI1RI68="Other_Fill_ME_Remark"), "", CI1RI73*CI1RI74*(1+CI1RI75))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'CWConnector',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWConnector',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI78',
    'rowIndex': 78,
    'cellIndex': 0,
    'label': '地片',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI78',
        'rowIndex': 78,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'groundfilmassytime.value',
        'contents': [],
        'parentKey': '地片',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI79',
        'rowIndex': 79,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI78*CI1RI80',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI80',
        'rowIndex': 80,
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
        'byKey': 'CWGroundFilmQty',
        'contents': [],
        'parentKey': '地片',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI81',
        'rowIndex': 81,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'groundfilmup.value',
        'contents': [],
        'parentKey': '地片',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI82',
        'rowIndex': 82,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'groundfilmuplossrate.value',
        'contents': [],
        'parentKey': '地片',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI83',
        'rowIndex': 83,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI84',
        'rowIndex': 84,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI80*CI1RI81*(1+CI1RI82)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '地片',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI85',
    'rowIndex': 85,
    'cellIndex': 0,
    'label': 'KAPTON',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI85',
        'rowIndex': 85,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'kaptonassytime.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI86',
        'rowIndex': 86,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI85*CI1RI89',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI87',
        'rowIndex': 87,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWKaptonLength',
        'contents': [],
        'parentKey': 'KAPTON',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI88',
        'rowIndex': 88,
        'cellIndex': 1,
        'label': 'W(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWKaptonwidth',
        'contents': [],
        'parentKey': 'KAPTON',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI89',
        'rowIndex': 89,
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
        'byKey': 'CWKaptonQty',
        'contents': [],
        'parentKey': 'KAPTON',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI90',
        'rowIndex': 90,
        'cellIndex': 1,
        'label': '面積單位換算常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'areaunittrnsferconstant.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI91',
        'rowIndex': 91,
        'cellIndex': 1,
        'label': 'U/P (USD/mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'kaptonup.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI92',
        'rowIndex': 92,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'kaptonlossrate.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI93',
        'rowIndex': 93,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W / 面積單位換算常數) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI89*CI1RI91*(CI1RI87*CI1RI88/CI1RI90)*(1+CI1RI92)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'KAPTON',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI95',
    'rowIndex': 95,
    'cellIndex': 0,
    'label': '醋酸布預設線材長度加總(全線段包裹)',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI95',
        'rowIndex': 95,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultAceticAcidClothAssyCoefficient.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI96',
        'rowIndex': 96,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI95',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
      },
      {
        'xlsxKey': 'CI1RI97',
        'rowIndex': 97,
        'cellIndex': 1,
        'label': 'L(mm)',
        'type': 'formula',
        'description': {
          'type': 'sum',
          'set': [
            {
              'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
              'byKey': 'teflonLength',
            },
            {
              'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
              'byKey': 'coaxialLength',
            }
          ]
        },
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI98',
        'rowIndex': 98,
        'cellIndex': 1,
        'label': 'W(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultAceticAcidClothW.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI99',
        'rowIndex': 99,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultAceticAcidClothQty.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI100',
        'rowIndex': 100,
        'cellIndex': 1,
        'label': '面積單位換算常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.areaunittrnsferconstant.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI101',
        'rowIndex': 101,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.aceticacidclothup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI102',
        'rowIndex': 102,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.aceticacidclothlossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI103',
        'rowIndex': 103,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W / 面積單位換算常數) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI104',
        'rowIndex': 104,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI99*CI1RI101*(CI1RI97*CI1RI98/CI1RI100)*(1+CI1RI102)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI105',
    'rowIndex': 105,
    'cellIndex': 0,
    'label': '醋酸布拉帶',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI105',
        'rowIndex': 105,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'aceticacidclothassytime.value',
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI106',
        'rowIndex': 106,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI105*CI1RI109',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI107',
        'rowIndex': 107,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWAceticAcidClothLength.value',
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI108',
        'rowIndex': 108,
        'cellIndex': 1,
        'label': 'W(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWAceticAcidClothwidth.value',
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI109',
        'rowIndex': 109,
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
        'byKey': 'CWAceticAcidClothQty',
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI110',
        'rowIndex': 110,
        'cellIndex': 1,
        'label': '面積單位換算常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'areaunittrnsferconstant.value',
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI111',
        'rowIndex': 111,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'aceticacidclothup.value',
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI112',
        'rowIndex': 112,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'aceticacidclothlossrate.value',
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI113',
        'rowIndex': 113,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W / 面積單位換算常數) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI109*CI1RI111*(CI1RI107*CI1RI108/CI1RI110)*(1+CI1RI112)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '醋酸布拉帶',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI115',
    'rowIndex': 115,
    'cellIndex': 0,
    'label': 'Teflon膠带',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI115',
        'rowIndex': 115,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'teflontapeassytime.value',
        'contents': [],
        'parentKey': 'Teflon膠带',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI116',
        'rowIndex': 116,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI115*CI1RI119',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI117',
        'rowIndex': 117,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWTeflonTapeLength',
        'contents': [],
        'parentKey': 'Teflon膠带',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI118',
        'rowIndex': 118,
        'cellIndex': 1,
        'label': 'W(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWTeflonTapeWidth',
        'contents': [],
        'parentKey': 'Teflon膠带',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI119',
        'rowIndex': 119,
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
        'byKey': 'CWTeflonTapeQty',
        'contents': [],
        'parentKey': 'Teflon膠带',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI120',
        'rowIndex': 120,
        'cellIndex': 1,
        'label': '面積單位換算常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'areaunittrnsferconstant.value',
        'contents': [],
        'parentKey': 'Teflon膠带',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI121',
        'rowIndex': 121,
        'cellIndex': 1,
        'label': 'U/P (USD/mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'teflonTapeup.value',
        'contents': [],
        'parentKey': 'Teflon膠带',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI122',
        'rowIndex': 122,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'teflonTapelossrate.value',
        'contents': [],
        'parentKey': 'Teflon膠带',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI123',
        'rowIndex': 123,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W / 面積單位換算常數) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI119*CI1RI121*(CI1RI117*CI1RI118/CI1RI120)*(1+CI1RI122)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Teflon膠带',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI125',
    'rowIndex': 125,
    'cellIndex': 0,
    'label': '導電布預設線材長度加總(全線段包裹)',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI125',
        'rowIndex': 125,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultConductiveClothAssyCoefficient.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI126',
        'rowIndex': 126,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI125*CI1RI129',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
      },
      {
        'xlsxKey': 'CI1RI127',
        'rowIndex': 127,
        'cellIndex': 1,
        'label': 'L(mm)',
        'type': 'formula',
        'description': {
          'type': 'sum',
          'set': [
            {
              'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
              'byKey': 'teflonLength',
            },
            {
              'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
              'byKey': 'coaxialLength',
            }
          ]
        },
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI128',
        'rowIndex': 128,
        'cellIndex': 1,
        'label': 'W(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultConductiveClothW.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI129',
        'rowIndex': 129,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultConductiveClothQty.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI130',
        'rowIndex': 130,
        'cellIndex': 1,
        'label': '面積單位換算常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.areaunittrnsferconstant.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI131',
        'rowIndex': 131,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.conductiveclothup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI132',
        'rowIndex': 132,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.aceticacidclothlossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI133',
        'rowIndex': 133,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W / 面積單位換算常數) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI134',
        'rowIndex': 134,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI129*CI1RI131*(CI1RI127*CI1RI128/CI1RI130)*(1+CI1RI132)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI135',
    'rowIndex': 135,
    'cellIndex': 0,
    'label': '導電布',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI135',
        'rowIndex': 135,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'conductiveclothassytime.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI136',
        'rowIndex': 136,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI135*CI1RI139',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI137',
        'rowIndex': 137,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'CWConductiveClothLength',
        'contents': [],
        'parentKey': '導電布',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI138',
        'rowIndex': 138,
        'cellIndex': 1,
        'label': 'W(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'CWConductiveClothWidth',
        'contents': [],
        'parentKey': '導電布',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI139',
        'rowIndex': 139,
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
        'byKey': 'CWConductiveClothQty',
        'contents': [],
        'parentKey': '導電布',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI140',
        'rowIndex': 140,
        'cellIndex': 1,
        'label': '面積單位換算常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'areaunittrnsferconstant.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI141',
        'rowIndex': 141,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'conductiveclothup.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI142',
        'rowIndex': 142,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'conductiveclothlossrate.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI143',
        'rowIndex': 143,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P  * (L * W / 面積單位換算常數) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI144',
        'rowIndex': 144,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI139*CI1RI141*(CI1RI137*CI1RI138/CI1RI140)*(1+CI1RI142)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '導電布',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI145',
    'rowIndex': 145,
    'cellIndex': 0,
    'label': '絞線',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI145',
        'rowIndex': 145,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'twistedwireassytime.value',
        'contents': [],
        'parentKey': '絞線',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI146',
        'rowIndex': 146,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI145*CI1RI147',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI147',
        'rowIndex': 147,
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
        'byKey': 'CWTwistedWireQty',
        'contents': [],
        'parentKey': '絞線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI148',
        'rowIndex': 148,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'twistedwireup.value',
        'contents': [],
        'parentKey': '絞線',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI149',
        'rowIndex': 149,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'twistedwirelossrate.value',
        'contents': [],
        'parentKey': '絞線',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI150',
        'rowIndex': 150,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI151',
        'rowIndex': 151,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI147*CI1RI148*(1+CI1RI149)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '絞線',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI152',
    'rowIndex': 152,
    'cellIndex': 0,
    'label': 'UV GLUE',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI152',
        'rowIndex': 152,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'uvglueassytime.value',
        'contents': [],
        'parentKey': 'UV GLUE',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI153',
        'rowIndex': 153,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI152*CI1RI154',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI154',
        'rowIndex': 154,
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
        'byKey': 'CWUvGlueQty',
        'contents': [],
        'parentKey': 'UV GLUE',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI155',
        'rowIndex': 155,
        'cellIndex': 1,
        'label': 'U/P(USD/次)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'uvglueup.value',
        'contents': [],
        'parentKey': 'UV GLUE',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI156',
        'rowIndex': 156,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'uvgluelossrate.value',
        'contents': [],
        'parentKey': 'UV GLUE',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI157',
        'rowIndex': 157,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI158',
        'rowIndex': 158,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI154*CI1RI155*(1+CI1RI156)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'UV GLUE',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI159',
    'rowIndex': 159,
    'cellIndex': 0,
    'label': 'LABEL',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI159',
        'rowIndex': 159,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'labelassytime.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI160',
        'rowIndex': 160,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI159*CI1RI161',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI161',
        'rowIndex': 161,
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
        'byKey': 'CWLabelQty',
        'contents': [],
        'parentKey': 'Label',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI162',
        'rowIndex': 162,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'labelup.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI163',
        'rowIndex': 163,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'labellossrate.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI164',
        'rowIndex': 164,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI165',
        'rowIndex': 165,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI161*CI1RI162*(1+CI1RI163)',
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
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI166',
    'rowIndex': 166,
    'cellIndex': 0,
    'label': '熱縮套管',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI166',
        'rowIndex': 166,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'CWHeatShrinkableTubingsAssyCoefficient.value',
        'contents': [],
        'parentKey': '熱縮套管',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI167',
        'rowIndex': 167,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI166*CI1RI168',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI168',
        'rowIndex': 168,
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
        'byKey': 'CWHeatShrinkableTubingsQty',
        'contents': [],
        'parentKey': '熱縮套管',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI169',
        'rowIndex': 169,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'heatshrinkabletubingsup.value',
        'contents': [],
        'parentKey': '熱縮套管',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI170',
        'rowIndex': 170,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'heatshrinkabletubingslossrate.value',
        'contents': [],
        'parentKey': '熱縮套管',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI171',
        'rowIndex': 171,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI172',
        'rowIndex': 172,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI168*CI1RI169*(1+CI1RI170)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '熱縮套管',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI173',
    'rowIndex': 173,
    'cellIndex': 0,
    'label': '畫線',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI173',
        'rowIndex': 173,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'drawlineassytime.value',
        'contents': [],
        'parentKey': '畫線',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI174',
        'rowIndex': 174,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI173*CI1RI175',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI175',
        'rowIndex': 175,
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
        'byKey': 'CWDrawLineQty',
        'contents': [],
        'parentKey': '畫線',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI176',
        'rowIndex': 176,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'drawLineup.value',
        'contents': [],
        'parentKey': '畫線',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI177',
        'rowIndex': 177,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'drawLinelossrate.value',
        'contents': [],
        'parentKey': '畫線',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI178',
        'rowIndex': 178,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI179',
        'rowIndex': 179,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI175*CI1RI176*(1+CI1RI177)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '畫線',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI180',
    'rowIndex': 180,
    'cellIndex': 0,
    'label': '導電雙面膠',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI180',
        'rowIndex': 180,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'conductivedoublesidetapeassytime.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI181',
        'rowIndex': 181,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI180*CI1RI184',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI182',
        'rowIndex': 182,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWConductiveDoubleSideTapeLength',
        'contents': [],
        'parentKey': '導電雙面膠',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI183',
        'rowIndex': 183,
        'cellIndex': 1,
        'label': 'W(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWConductiveDoubleSideTapewidth',
        'contents': [],
        'parentKey': '導電雙面膠',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI184',
        'rowIndex': 184,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWConductiveDoubleSideTapeQty',
        'contents': [],
        'parentKey': '導電雙面膠',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI185',
        'rowIndex': 185,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'conductivedoublesidetapeup.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI186',
        'rowIndex': 186,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'conductivedoublesidetapelossrate.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI187',
        'rowIndex': 187,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W * 0.000001) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI188',
        'rowIndex': 188,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI184*CI1RI185*(CI1RI182*CI1RI183*0.000001)*(1+CI1RI186)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '導電雙面膠',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI189',
    'rowIndex': 189,
    'cellIndex': 0,
    'label': 'Mylar(CY28_PET) T=0.05',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI189',
        'rowIndex': 189,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'mylarCY28Pet005assytime.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI190',
        'rowIndex': 190,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI189*CI1RI193',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI191',
        'rowIndex': 191,
        'cellIndex': 1,
        'label': 'L',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWMylarCY28Pet005Length',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI192',
        'rowIndex': 192,
        'cellIndex': 1,
        'label': 'W',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWMylarCY28Pet005width',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI193',
        'rowIndex': 193,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWMylarCY28Pet005Qty',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI194',
        'rowIndex': 194,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'mylarCY28Pet005up.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI195',
        'rowIndex': 195,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'mylarCY28Pet005lossrate.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI196',
        'rowIndex': 196,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W * 0.000001) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI197',
        'rowIndex': 197,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI193*CI1RI194*(CI1RI191*CI1RI192*0.000001)*(1+CI1RI195)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI198',
    'rowIndex': 198,
    'cellIndex': 0,
    'label': 'Mylar(PET_6027D) T=0.1',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI198',
        'rowIndex': 198,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'mylarPet6027D01assytime.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI199',
        'rowIndex': 199,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI198*CI1RI202',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI200',
        'rowIndex': 200,
        'cellIndex': 1,
        'label': 'L',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWMylarPet6027D01Length',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI201',
        'rowIndex': 201,
        'cellIndex': 1,
        'label': 'W',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWMylarPet6027D01width',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI202',
        'rowIndex': 202,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWMylarPet6027D01Qty',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI203',
        'rowIndex': 203,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'mylarPet6027D01up.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI204',
        'rowIndex': 204,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'mylarPet6027D01lossrate.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI205',
        'rowIndex': 205,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W * 0.000001) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI206',
        'rowIndex': 206,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI202*CI1RI203*(CI1RI200*CI1RI201*0.000001)*(1+CI1RI204)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI207',
    'rowIndex': 207,
    'cellIndex': 0,
    'label': '雙面膠',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI207',
        'rowIndex': 207,
        'cellIndex': 1,
        'label': '工時(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'doublesidetapeassytime.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI208',
        'rowIndex': 208,
        'cellIndex': 1,
        'label': 'Assembly time(sec)',
        'type': 'formula',
        'description': '=CI1RI207*CI1RI211',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'assemblyTime',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI209',
        'rowIndex': 209,
        'cellIndex': 1,
        'label': 'L',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWDoubleSideTapeLength',
        'contents': [],
        'parentKey': '雙面膠',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI210',
        'rowIndex': 210,
        'cellIndex': 1,
        'label': 'W',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWDoubleSideTapewidth',
        'contents': [],
        'parentKey': '雙面膠',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI211',
        'rowIndex': 211,
        'cellIndex': 1,
        'label': '用量',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'CWDoubleSideTapeQty',
        'contents': [],
        'parentKey': '雙面膠',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI212',
        'rowIndex': 212,
        'cellIndex': 1,
        'label': 'U/P (USD/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'doubleSideTapeup.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI213',
        'rowIndex': 213,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'doubleSideTapelossrate.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.cableSupport',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      },
      {
        'xlsxKey': 'CI1RI214',
        'rowIndex': 214,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (L * W * 0.000001) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI215',
        'rowIndex': 215,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI211*CI1RI212*(CI1RI209*CI1RI210*0.000001)*(1+CI1RI213)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '雙面膠',
        'byKey': 'componentPrice',
        'groupIdPath': 'partlistvalue.formData.cwTab.CWSubMertial',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI216',
    'rowIndex': 216,
    'cellIndex': 0,
    'label': '助焊劑',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI216',
        'rowIndex': 216,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI217',
        'rowIndex': 217,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.fluxup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI218',
        'rowIndex': 218,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.fluxlossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI219',
        'rowIndex': 219,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI220',
        'rowIndex': 220,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI216*CI1RI217*(1+CI1RI218)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI221',
    'rowIndex': 221,
    'cellIndex': 0,
    'label': '酒精',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI221',
        'rowIndex': 221,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI222',
        'rowIndex': 222,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.alcoholup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI223',
        'rowIndex': 223,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.alcohollossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI224',
        'rowIndex': 224,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI225',
        'rowIndex': 225,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI221*CI1RI222*(1+CI1RI223)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI226',
    'rowIndex': 226,
    'cellIndex': 0,
    'label': '雙面膠紙',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI226',
        'rowIndex': 226,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI227',
        'rowIndex': 227,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.doublesidedtapesup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI228',
        'rowIndex': 228,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.doublesidedtapeslossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI229',
        'rowIndex': 229,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI230',
        'rowIndex': 230,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI226*CI1RI227*(1+CI1RI228)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI231',
    'rowIndex': 231,
    'cellIndex': 0,
    'label': '美纹膠纸',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI231',
        'rowIndex': 231,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI232',
        'rowIndex': 232,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.maskingtapesup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI233',
        'rowIndex': 233,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.maskingtapeslossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI234',
        'rowIndex': 234,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI235',
        'rowIndex': 235,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI231*CI1RI232*(1+CI1RI233)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI236',
    'rowIndex': 236,
    'cellIndex': 0,
    'label': '棉紙',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI236',
        'rowIndex': 236,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI237',
        'rowIndex': 237,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.tissuepaperup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI238',
        'rowIndex': 238,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.tissuepaperlossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI239',
        'rowIndex': 239,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI240',
        'rowIndex': 240,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI236*CI1RI237*(1+CI1RI238)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI241',
    'rowIndex': 241,
    'cellIndex': 0,
    'label': '防焊膠紙',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI241',
        'rowIndex': 241,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI242',
        'rowIndex': 242,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.pitapesup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI243',
        'rowIndex': 243,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.pitapeslossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI244',
        'rowIndex': 244,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI245',
        'rowIndex': 245,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI241*CI1RI242*(1+CI1RI243)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI246',
    'rowIndex': 246,
    'cellIndex': 0,
    'label': '美纹纸  耐高温型',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI246',
        'rowIndex': 246,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI247',
        'rowIndex': 247,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.maskingtapeshightempup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI248',
        'rowIndex': 248,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.maskingtapeshightemplossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI249',
        'rowIndex': 249,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI250',
        'rowIndex': 250,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI246*CI1RI247*(1+CI1RI248)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI251',
    'rowIndex': 251,
    'cellIndex': 0,
    'label': 'PE膜',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI251',
        'rowIndex': 251,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI252',
        'rowIndex': 252,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.peup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI253',
        'rowIndex': 253,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.pelossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI254',
        'rowIndex': 254,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI255',
        'rowIndex': 255,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI251*CI1RI252*(1+CI1RI253)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI256',
    'rowIndex': 256,
    'cellIndex': 0,
    'label': '錫絲',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI256',
        'rowIndex': 256,
        'cellIndex': 1,
        'label': '用量',
        'type': 'formula',
        'description': '=IF(AND(CI1RI0<>"",CI1RI0>0),1,0)',
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
        'xlsxKey': 'CI1RI257',
        'rowIndex': 257,
        'cellIndex': 1,
        'label': 'U/P(USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.solderwireup.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI258',
        'rowIndex': 258,
        'cellIndex': 1,
        'label': 'Loss Rate(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableWire.solderwirelossrate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI259',
        'rowIndex': 259,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI260',
        'rowIndex': 260,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI256*CI1RI257*(1+CI1RI258)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'byKey': 'componentPrice',
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI261',
    'rowIndex': 261,
    'cellIndex': 0,
    'label': 'A.材料費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.cwTab.CWWire',
          'byKey': 'CWWirePrice',
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
    'xlsxKey': 'CI1RI262',
    'rowIndex': 262,
    'cellIndex': 0,
    'label': 'B.二次加工費',
    'type': 'formula',
    'description': '=CI1RI27',
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
    'xlsxKey': 'CI1RI263',
    'rowIndex': 263,
    'cellIndex': 0,
    'label': 'C.零件費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'byKey': 'componentPrice',
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
    'xlsxKey': 'CI1RI264',
    'rowIndex': 264,
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
    'byKey': 'partlistprice.forDebug.debugInfo.cableWire.managementAndProfit.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI265',
    'rowIndex': 265,
    'cellIndex': 0,
    'label': 'D.管銷&利潤',
    'type': 'formula',
    'description': '=CI1RI262*CI1RI264',
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
    'xlsxKey': 'CI1RI266',
    'rowIndex': 266,
    'cellIndex': 0,
    'label': 'E. 成品總價',
    'type': 'formula',
    'description': '=IFERROR( CI1RI261+CI1RI262+CI1RI263+CI1RI265, "")',
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
