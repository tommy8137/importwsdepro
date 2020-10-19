module.exports = [
  {
    'xlsxKey': 'CI1RI0',
    'rowIndex': 0,
    'cellIndex': 0,
    'label': 'A.材料費',
    'type': 'formula',
    'description': '=IFERROR(CI1RI4*(CI1RI5+CI1RI6)*(CI1RI1/CI1RI10)*(1+CI1RI11), 0)',
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
    'label': '材料',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thin',
        'bottomBorderStyle': 'thin',
      },
      'numberFormat': '#,##0.0',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI1',
        'rowIndex': 1,
        'cellIndex': 1,
        'label': '材料單價(Price/m²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.material_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI2',
        'rowIndex': 2,
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
        'byKey': 'partlistvalue.formData.FFCTab.FFCItems.FFCPin',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI3',
        'rowIndex': 3,
        'cellIndex': 1,
        'label': 'Pitch(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.FFCTab.FFCItems.FFCPitch',
        'contents': []
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
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistvalue.formData.FFCTab.FFCItems.FFCCableLength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI5',
        'rowIndex': 5,
        'cellIndex': 1,
        'label': 'Cable width(mm)',
        'type': 'formula',
        'description': '=(CI1RI2+1)*CI1RI3',
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
        'xlsxKey': 'CI1RI6',
        'rowIndex': 6,
        'cellIndex': 1,
        'label': '邊料尺寸(mm)',
        'type': 'formula',
        'description': '=CI1RI7+CI1RI26*(CI1RI8*CI1RI9)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI7',
        'rowIndex': 7,
        'cellIndex': 1,
        'label': '基本邊料尺寸',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcedge_materia_size_constant.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI8',
        'rowIndex': 8,
        'cellIndex': 1,
        'label': '沖型單邊所增加之邊料尺寸',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcedge_materia_add_size_constant.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI9',
        'rowIndex': 9,
        'cellIndex': 1,
        'label': '邊料兩邊常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcedge_materia_two_side_constant.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI10',
        'rowIndex': 10,
        'cellIndex': 1,
        'label': 'FFC面積單位換算',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcedge_materia_area_trans_constant.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI11',
        'rowIndex': 11,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.material_loss_rate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI12',
        'rowIndex': 12,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Cable length * (Cable width + 邊料尺寸) * (材料單價 / FFC面積單位換算) * (1 + Loss Rate(%))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI13',
    'rowIndex': 13,
    'cellIndex': 0,
    'label': 'B.二次加工費',
    'type': 'formula',
    'description': '=CI1RI17+CI1RI21+CI1RI25+CI1RI29+CI1RI37+CI1RI41',
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
    'xlsxKey': 'CI0RI14',
    'rowIndex': 14,
    'cellIndex': 0,
    'label': '組裝(sec)',
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
        'xlsxKey': 'CI1RI14',
        'rowIndex': 14,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': {
          'type': 'sum',
          'set': [
            {
              'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
              'byKey': 'group_assy_time',
            },
            {
              'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
              'byKey': 'group_assy_time',
            }
          ]
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
        'xlsxKey': 'CI1RI15',
        'rowIndex': 15,
        'cellIndex': 1,
        'label': '組裝費(USD/min)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcassembly_cost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI16',
        'rowIndex': 16,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Assy Time (Sec) * 組裝費 / 60',
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
        'xlsxKey': 'CI1RI17',
        'rowIndex': 17,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI14*CI1RI15/60',
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
    ]
  },
  {
    'xlsxKey': 'CI0RI18',
    'rowIndex': 18,
    'cellIndex': 0,
    'label': '折彎(次)',
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
        'xlsxKey': 'CI1RI18',
        'rowIndex': 18,
        'cellIndex': 1,
        'label': 'Q`ty',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.FFCBendTImes.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI19',
        'rowIndex': 19,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcBend_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI20',
        'rowIndex': 20,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Q`ty * U/P',
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
        'contents': []
      }
    ],
    'byKey': 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCBendTImes',
  },
  {
    'xlsxKey': 'CI0RI22',
    'rowIndex': 22,
    'cellIndex': 0,
    'label': '印刷(面)',
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
        'xlsxKey': 'CI1RI22',
        'rowIndex': 22,
        'cellIndex': 1,
        'label': 'Q`ty',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.FFCPrint.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI23',
        'rowIndex': 23,
        'cellIndex': 1,
        'label': 'U/P(USD/面)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcPrint_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI24',
        'rowIndex': 24,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Q`ty * U/P',
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
        'xlsxKey': 'CI1RI25',
        'rowIndex': 25,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI22*CI1RI23',
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
    'byKey': 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCPrint',
  },
  {
    'xlsxKey': 'CI0RI26',
    'rowIndex': 26,
    'cellIndex': 0,
    'label': '沖型(次)',
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
        'xlsxKey': 'CI1RI26',
        'rowIndex': 26,
        'cellIndex': 1,
        'label': 'Q`ty',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffc_flush_amount.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI27',
        'rowIndex': 27,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcFlush_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI28',
        'rowIndex': 28,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Q`ty * U/P',
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
        'xlsxKey': 'CI1RI29',
        'rowIndex': 29,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI26*CI1RI27',
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
    'byKey': 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCFlush',
  },
  {
    'xlsxKey': 'CI0RI30',
    'rowIndex': 30,
    'cellIndex': 0,
    'label': '金手指掛鍍(鍍金）/次',
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
        'xlsxKey': 'CI1RI30',
        'rowIndex': 30,
        'cellIndex': 1,
        'label': 'Q`ty',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.FFCGoldPlating.value',
        'contents': [],
        'mapper': {
          'true': 'Yes',
          'false': 'No',
          '1': 'Yes',
          '0': 'No',
        }
      },
      {
        'xlsxKey': 'CI1RI31',
        'rowIndex': 31,
        'cellIndex': 1,
        'label': '金手指寬度比例',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcgolden_finger_width_ratio.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI32',
        'rowIndex': 32,
        'cellIndex': 1,
        'label': '金手指長度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcgolden_finger_length.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI33',
        'rowIndex': 33,
        'cellIndex': 1,
        'label': '金手指掛鍍單價',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcgolden_finger_rack_plating_cost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI34',
        'rowIndex': 34,
        'cellIndex': 1,
        'label': '金手指兩邊常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcgolden_finger_two_side_constant.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI35',
        'rowIndex': 35,
        'cellIndex': 1,
        'label': 'U/P(USD/次)',
        'type': 'formula',
        'description': '=CI1RI2*(CI1RI3*CI1RI31)*CI1RI32*CI1RI33*CI1RI34',
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
        'xlsxKey': 'CI1RI36',
        'rowIndex': 36,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Q`ty * U/P',
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
        'description': '=IF(CI1RI30="Yes",1*CI1RI35,0)',
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
    ]
  },
  {
    'xlsxKey': 'CI0RI38',
    'rowIndex': 38,
    'cellIndex': 0,
    'label': '停止線(條)',
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
        'xlsxKey': 'CI1RI38',
        'rowIndex': 38,
        'cellIndex': 1,
        'label': 'Q`ty',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.FFCStopLine.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI39',
        'rowIndex': 39,
        'cellIndex': 1,
        'label': 'U/P(USD/條)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcStopLine_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI40',
        'rowIndex': 40,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Q`ty * U/P',
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
        'xlsxKey': 'CI1RI41',
        'rowIndex': 41,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI38*CI1RI39',
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
    'byKey': 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCStopLine',
  },
  {
    'xlsxKey': 'CI1RI42',
    'rowIndex': 42,
    'cellIndex': 0,
    'label': 'C.零件費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
          'byKey': 'component_price',
        },
        {
          'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
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
    'xlsxKey': 'CI0RI43',
    'rowIndex': 43,
    'cellIndex': 0,
    'label': 'Al Foil',
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
        'xlsxKey': 'CI1RI43',
        'rowIndex': 43,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI44*CI1RI48',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': 'Al Foil',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI44',
        'rowIndex': 44,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcal_foil_assy_time.value',
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI45',
        'rowIndex': 45,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCAlFoilLength.value',
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI46',
        'rowIndex': 46,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcal_foil_l_side_constant.value',
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI47',
        'rowIndex': 47,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcal_foil_w_side_constant.value',
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI48',
        'rowIndex': 48,
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
        'byKey': 'FFCAlFoilQty.value',
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI49',
        'rowIndex': 49,
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
        'byKey': 'ffcAlFoil_unit_price.value',
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI50',
        'rowIndex': 50,
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
        'byKey': 'ffcal_foil_loss_rate.value',
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI51',
        'rowIndex': 51,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI52',
        'rowIndex': 52,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI48*CI1RI49*((CI1RI45+CI1RI46)*($C$15+CI1RI47)/$C$20)*(1+CI1RI50)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Al Foil',
        'parent': 'partlistprice.forDebug.debugInfo.alfoil',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI53',
    'rowIndex': 53,
    'cellIndex': 0,
    'label': '補強板',
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
        'xlsxKey': 'CI1RI53',
        'rowIndex': 53,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI54*CI1RI58',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI54',
        'rowIndex': 54,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcstiffener_assy_time.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI55',
        'rowIndex': 55,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCReinforcingPlateLength.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI56',
        'rowIndex': 56,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcstiffener_l_side_constant.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI57',
        'rowIndex': 57,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcstiffener_w_side_constant.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI58',
        'rowIndex': 58,
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
        'byKey': 'FFCReinforcingPlateQty.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI59',
        'rowIndex': 59,
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
        'byKey': 'ffcReinforcingPlate_unit_price.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI60',
        'rowIndex': 60,
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
        'byKey': 'ffcstiffener_loss_rate.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI61',
        'rowIndex': 61,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI62',
        'rowIndex': 62,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI58*CI1RI59*((CI1RI55+CI1RI56)*($C$15+CI1RI57)/$C$20)*(1+CI1RI60)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.reinforcingPlate',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI63',
    'rowIndex': 63,
    'cellIndex': 0,
    'label': 'Label 料號標籤',
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
        'xlsxKey': 'CI1RI63',
        'rowIndex': 63,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI64*CI1RI65',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': 'Label 料號標籤',
        'parent': 'partlistprice.forDebug.debugInfo.label1',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI64',
        'rowIndex': 64,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcLabel1_assy_time.value',
        'contents': [],
        'parentKey': 'Label 料號標籤',
        'parent': 'partlistprice.forDebug.debugInfo.label1',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI65',
        'rowIndex': 65,
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
        'byKey': 'FFCLabel1Qty.value',
        'contents': [],
        'parentKey': 'Label 料號標籤',
        'parent': 'partlistprice.forDebug.debugInfo.label1',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI66',
        'rowIndex': 66,
        'cellIndex': 1,
        'label': 'U/P (USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'ffcLabel1_unit_price.value',
        'contents': [],
        'parentKey': 'Label 料號標籤',
        'parent': 'partlistprice.forDebug.debugInfo.label1',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI67',
        'rowIndex': 67,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P',
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
        'xlsxKey': 'CI1RI68',
        'rowIndex': 68,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI65*CI1RI66',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Label 料號標籤',
        'parent': 'partlistprice.forDebug.debugInfo.label1',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI69',
    'rowIndex': 69,
    'cellIndex': 0,
    'label': 'Label2 白底黑字',
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
        'xlsxKey': 'CI1RI69',
        'rowIndex': 69,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI70*CI1RI71',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': 'Label 白底黑字',
        'parent': 'partlistprice.forDebug.debugInfo.label2',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI70',
        'rowIndex': 70,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcLabel2_assy_time.value',
        'contents': [],
        'parentKey': 'Label 白底黑字',
        'parent': 'partlistprice.forDebug.debugInfo.label2',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI71',
        'rowIndex': 71,
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
        'byKey': 'FFCLabel2Qty.value',
        'contents': [],
        'parentKey': 'Label 白底黑字',
        'parent': 'partlistprice.forDebug.debugInfo.label2',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI72',
        'rowIndex': 72,
        'cellIndex': 1,
        'label': 'U/P (USD/pcs)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'ffcLabel2_unit_price.value',
        'contents': [],
        'parentKey': 'Label 白底黑字',
        'parent': 'partlistprice.forDebug.debugInfo.label2',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI73',
        'rowIndex': 73,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P',
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
        'xlsxKey': 'CI1RI74',
        'rowIndex': 74,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI71*CI1RI72',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Label 白底黑字',
        'parent': 'partlistprice.forDebug.debugInfo.label2',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI75',
    'rowIndex': 75,
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
        'xlsxKey': 'CI1RI75',
        'rowIndex': 75,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI76*CI1RI80',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI76',
        'rowIndex': 76,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'conductive_assy_time.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI77',
        'rowIndex': 77,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'FFCConductiveClothLength.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI78',
        'rowIndex': 78,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcconductive_fabric_l_side_constant.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI79',
        'rowIndex': 79,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcconductive_fabric_w_side_constant.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'FFCConductiveClothQty.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI81',
        'rowIndex': 81,
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
        'byKey': 'ffcConductiveCloth_unit_price.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcConductiveCloth_loss_rate.value',
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI83',
        'rowIndex': 83,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI80*CI1RI81*((CI1RI77+CI1RI78)*($C$15+CI1RI79)/$C$20)*(1+CI1RI82)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': '導電布',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveCloth',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI85',
    'rowIndex': 85,
    'cellIndex': 0,
    'label': '醋酸布',
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
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI86*CI1RI90',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI86',
        'rowIndex': 86,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcacetate_assy_time.value',
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCAceticAcidClothLength.value',
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI88',
        'rowIndex': 88,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcacetate_cloth_l_side_constant.value',
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI89',
        'rowIndex': 89,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcacetate_cloth_w_side_constant.value',
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI90',
        'rowIndex': 90,
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
        'byKey': 'FFCAceticAcidClothQty.value',
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI91',
        'rowIndex': 91,
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
        'byKey': 'ffcAceticAcidCloth_unit_price.value',
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcAceticAcidCloth_loss_rate.value',
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI93',
        'rowIndex': 93,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI90*CI1RI91*((CI1RI87+CI1RI88)*($C$15+CI1RI89)/$C$20)*(1+CI1RI92)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': '醋酸布',
        'parent': 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI95',
    'rowIndex': 95,
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
        'xlsxKey': 'CI1RI95',
        'rowIndex': 95,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI96*CI1RI100',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI96',
        'rowIndex': 96,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffckapton_assy_time.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI97',
        'rowIndex': 97,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCKaptonLength.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI98',
        'rowIndex': 98,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffckapton_l_side_constant.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI99',
        'rowIndex': 99,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffckapton_w_side_constant.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI100',
        'rowIndex': 100,
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
        'byKey': 'FFCKaptonQty.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcKapton_unit_price.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcKapton_loss_rate.value',
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI103',
        'rowIndex': 103,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI100*CI1RI101*((CI1RI97+CI1RI98)*($C$15+CI1RI99)/$C$20)*(1+CI1RI102)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'KAPTON',
        'parent': 'partlistprice.forDebug.debugInfo.kapton',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI105',
    'rowIndex': 105,
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
        'xlsxKey': 'CI1RI105',
        'rowIndex': 105,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI106*CI1RI110',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI106',
        'rowIndex': 106,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcdouble_sided_tape_assy_time.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCDoubleSideTapeLength.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI108',
        'rowIndex': 108,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcdouble_sided_tape_l_side_constant.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI109',
        'rowIndex': 109,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcdouble_sided_tape_w_side_constant.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI110',
        'rowIndex': 110,
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
        'byKey': 'FFCDoubleSideTapeQty.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcDoubleSideTape_unit_price.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcDoubleSideTape_loss_rate.value',
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI113',
        'rowIndex': 113,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI110*CI1RI111*((CI1RI107+CI1RI108)*($C$15+CI1RI109)/$C$20)*(1+CI1RI112)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': '雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.doubleSideTape',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI115',
    'rowIndex': 115,
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
        'xlsxKey': 'CI1RI115',
        'rowIndex': 115,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI116*CI1RI120',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI116',
        'rowIndex': 116,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcmylar_cy28_pet_t_005_assy_time.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCMylarCY28Pet005Length.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI118',
        'rowIndex': 118,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcmylar_cy28_pet_t_005_l_side_constant.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI119',
        'rowIndex': 119,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcmylar_cy28_pet_t_005_w_side_constant.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI120',
        'rowIndex': 120,
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
        'byKey': 'FFCMylarCY28Pet005Qty.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI121',
        'rowIndex': 121,
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
        'byKey': 'ffcmylar_cy28_pet_t_005_unit_price.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcmylar_cy28_pet_t_005_loss_rate.value',
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI123',
        'rowIndex': 123,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI120*CI1RI121*((CI1RI117+CI1RI118)*($C$15+CI1RI119)/$C$20)*(1+CI1RI122)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Mylar(CY28_PET) T=0.05',
        'parent': 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI125',
    'rowIndex': 125,
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
        'xlsxKey': 'CI1RI125',
        'rowIndex': 125,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI126*CI1RI130',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI126',
        'rowIndex': 126,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcmylar_pet_6027d_t_01_assy_time.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI127',
        'rowIndex': 127,
        'cellIndex': 1,
        'label': 'L(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCMylarPet6027D01Length.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI128',
        'rowIndex': 128,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcmylar_pet_6027d_t_01_l_side_constant.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI129',
        'rowIndex': 129,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcmylar_pet_6027d_t_01_w_side_constant.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI130',
        'rowIndex': 130,
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
        'byKey': 'FFCMylarPet6027D01Qty.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcmylar_pet_6027d_t_01_unit_price.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcmylar_pet_6027d_t_01_loss_rate.value',
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI133',
        'rowIndex': 133,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI130*CI1RI131*((CI1RI127+CI1RI128)*($C$15+CI1RI129)/$C$20)*(1+CI1RI132)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Mylar(PET_6027D) T=0.1',
        'parent': 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI135',
    'rowIndex': 135,
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
        'xlsxKey': 'CI1RI135',
        'rowIndex': 135,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI136*CI1RI140',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI136',
        'rowIndex': 136,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'ffcconductive_double_sided_tape_assy_time.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
          'numberFormat': '#,##0',
        },
        'byKey': 'FFCConductiveDoubleSideTapeLength.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI138',
        'rowIndex': 138,
        'cellIndex': 1,
        'label': 'L邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcconductive_double_sided_tape_l_side_constant.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI139',
        'rowIndex': 139,
        'cellIndex': 1,
        'label': 'W邊料',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'ffcconductive_double_sided_tape_w_side_constant.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI140',
        'rowIndex': 140,
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
        'byKey': 'FFCConductiveDoubleSideTapeQty.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcConductiveDoubleSideTape_unit_price.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
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
        'byKey': 'ffcConductiveDoubleSideTape_loss_rate.value',
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      },
      {
        'xlsxKey': 'CI1RI143',
        'rowIndex': 143,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *((L + L邊料) * (Cable width + W邊料) / 面積單位換算) * (1 + Loss Rate(%))',
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
        'description': '=CI1RI140*CI1RI141*((CI1RI137+CI1RI138)*($C$15+CI1RI139)/$C$20)*(1+CI1RI142)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': '導電雙面膠',
        'parent': 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI145',
    'rowIndex': 145,
    'cellIndex': 0,
    'label': 'Connector',
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
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=IF(OR(CI1RI147="Other_Fill_ME_Remark", CI1RI148="Other_Fill_ME_Remark"), 0, CI1RI146*CI1RI150)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'byKey': 'group_assy_time',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI146',
        'rowIndex': 146,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'processtime.value',
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI147',
        'rowIndex': 147,
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
        'byKey': 'FFCConnectorFunctionName.value',
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI148',
        'rowIndex': 148,
        'cellIndex': 1,
        'label': 'Connector Type',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'FFCConnectorType.value',
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI149',
        'rowIndex': 149,
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
        'byKey': 'FFCConnectorVendorPn.value',
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI150',
        'rowIndex': 150,
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
        'byKey': 'FFCConnectorQty.value',
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI151',
        'rowIndex': 151,
        'cellIndex': 1,
        'label': 'Function Name Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
        },
        'parentKey': 'Connector',
        'parent': 'partlistvalue.Price.cableFFC.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
        'byKey': 'FFCConnectorNameRemark',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI152',
        'rowIndex': 152,
        'cellIndex': 1,
        'label': 'Function Type Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
        },
        'parentKey': 'Connector',
        'parent': 'partlistvalue.Price.cableFFC.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
        'byKey': 'FFCConnectorTypeRemark',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI153',
        'rowIndex': 153,
        'cellIndex': 1,
        'label': 'U/P',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'FFCConnectorUnitPrice.value',
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI154',
        'rowIndex': 154,
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
        'byKey': 'cableWireFfcConnectorLossRate.value',
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      },
      {
        'xlsxKey': 'CI1RI155',
        'rowIndex': 155,
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
        'xlsxKey': 'CI1RI156',
        'rowIndex': 156,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=IF(OR(CI1RI147="Other_Fill_ME_Remark", CI1RI148="Other_Fill_ME_Remark"), "", CI1RI150*CI1RI153*(1+CI1RI154))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000000',
        },
        'contents': [],
        'parentKey': 'Connector',
        'parent': 'partlistprice.forDebug.debugInfo.cableFfcConnector',
        'byKey': 'component_price',
        'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI157',
    'rowIndex': 157,
    'cellIndex': 0,
    'label': 'A.材料費',
    'type': 'formula',
    'description': '=CI1RI0',
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
    'xlsxKey': 'CI1RI158',
    'rowIndex': 158,
    'cellIndex': 0,
    'label': 'B.二次加工費',
    'type': 'formula',
    'description': '=CI1RI13',
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
    'xlsxKey': 'CI1RI159',
    'rowIndex': 159,
    'cellIndex': 0,
    'label': 'C.零件費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.FFCTab.FFCAccessory',
          'byKey': 'component_price',
        },
        {
          'groupIdPath': 'partlistvalue.formData.FFCTab.FFCConnector',
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
    'xlsxKey': 'CI1RI160',
    'rowIndex': 160,
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
    'byKey': 'partlistprice.forDebug.debugInfo.cableFFC.ffcManagement_and_profit.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI161',
    'rowIndex': 161,
    'cellIndex': 0,
    'label': 'D.管銷&利潤',
    'type': 'formula',
    'description': '=CI1RI158*CI1RI160',
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
    'xlsxKey': 'CI1RI162',
    'rowIndex': 162,
    'cellIndex': 0,
    'label': 'E. 成品總價',
    'type': 'formula',
    'description': '=IFERROR(CI1RI157+CI1RI158+CI1RI159+CI1RI161, "")',
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