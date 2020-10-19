module.exports = [
  {
    'xlsxKey': 'CI1RI0',
    'rowIndex': 0,
    'cellIndex': 0,
    'label': 'A.材料費',
    'type': 'formula',
    'description': '=IF( CI1RI1="Other_Fill_ME_Remark", "", IFERROR(CI1RI11*(CI1RI2/CI1RI12)*(1+CI1RI13), 0))',
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
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI1',
        'rowIndex': 1,
        'cellIndex': 1,
        'label': '材料類別',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.FPCConductorType.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI2',
        'rowIndex': 2,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.FPCConductorTypeUnitPrice.value',
        'contents': []
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
        'byKey': 'partlistvalue.formData.FPCTab.FPCItems.FPCPin',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI4',
        'rowIndex': 4,
        'cellIndex': 1,
        'label': 'Pitch(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistvalue.formData.FPCTab.FPCItems.FPCPitch',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI5',
        'rowIndex': 5,
        'cellIndex': 1,
        'label': '成品長邊最大尺寸(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.FPCTab.FPCItems.FPCCableSize.FPCCableLength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI6',
        'rowIndex': 6,
        'cellIndex': 1,
        'label': '成品寬邊最大尺寸(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.FPCTab.FPCItems.FPCCableSize.FPCCableWidth',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI7',
        'rowIndex': 7,
        'cellIndex': 1,
        'label': '長邊邊料與併版所增加尺寸(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.FPCTab.FPCItems.FPCIncreaseSize.FPCCableIncreaseLength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI8',
        'rowIndex': 8,
        'cellIndex': 1,
        'label': '寬邊邊料與併版所增加尺寸(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.FPCTab.FPCItems.FPCIncreaseSize.FPCCableIncreaseWidth',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI9',
        'rowIndex': 9,
        'cellIndex': 1,
        'label': '單位併版面積(mm²)',
        'type': 'formula',
        'description': '=(CI1RI5+CI1RI7)*(CI1RI6+CI1RI8)',
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
        'xlsxKey': 'CI1RI10',
        'rowIndex': 10,
        'cellIndex': 1,
        'label': '單位併版之成品產出數(數量)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.FPCProductNumber.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI11',
        'rowIndex': 11,
        'cellIndex': 1,
        'label': '單件成品攤提面積(mm²)',
        'type': 'formula',
        'description': '=CI1RI9/CI1RI10',
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
        'xlsxKey': 'CI1RI12',
        'rowIndex': 12,
        'cellIndex': 1,
        'label': '面積單位轉換常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.fpcarea_unit_transfer_constant.value',
        'contents': []
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.material_loss_rate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI14',
        'rowIndex': 14,
        'cellIndex': 1,
        'label': 'Type Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.FPCTab.FPCMainMaterial.FPCConductorTypeRemark',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI15',
        'rowIndex': 15,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '單件成品攤提面積 * (材料單價 / 面積單位轉換常數) * (1 + Loss Rate(%))',
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
    'xlsxKey': 'CI1RI16',
    'rowIndex': 16,
    'cellIndex': 0,
    'label': 'B.二次加工費',
    'type': 'formula',
    'description': '=CI1RI21+CI1RI25+CI1RI29+CI1RI33',
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
    'xlsxKey': 'CI0RI17',
    'rowIndex': 17,
    'cellIndex': 0,
    'label': '組裝(sec)',
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
        'xlsxKey': 'CI1RI17',
        'rowIndex': 17,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': {
          'type': 'sum',
          'set': [
            {
              'byKey': 'assy_time',
              'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
            }
          ],
          'wrapper': 'IFERROR(FORMULA, "")',
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
      },
      {
        'xlsxKey': 'CI1RI18',
        'rowIndex': 18,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.fpcassembly_cost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI19',
        'rowIndex': 19,
        'cellIndex': 1,
        'label': 'FPC時間單位換算',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.fpcassembly_spend_time.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI20',
        'rowIndex': 20,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Assy Time * 組裝費 / FPC時間單位換算',
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
        'description': '=IFERROR(CI1RI17*CI1RI18/CI1RI19, 0)',
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
    'xlsxKey': 'CI0RI22',
    'rowIndex': 22,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.FPCBendTimes.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI23',
        'rowIndex': 23,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.fpcBend_unit_price.value',
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
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      }
    ],
    'byKey': 'partlistvalue.formData.FPCTab.FFCProcessingContent.FPCBendTimes',
  },
  {
    'xlsxKey': 'CI0RI26',
    'rowIndex': 26,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.FPCPrint.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI27',
        'rowIndex': 27,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.fpcPrint_unit_price.value',
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
          'numberFormat': '#,##0.00000',
        },
        'contents': []
      }
    ],
    'byKey': 'partlistvalue.formData.FPCTab.FFCProcessingContent.FPCPrint',
  },
  {
    'xlsxKey': 'CI0RI30',
    'rowIndex': 30,
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
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.FPCStopLine.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI31',
        'rowIndex': 31,
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
        'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.fpcStopLine_unit_price.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI32',
        'rowIndex': 32,
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
        'xlsxKey': 'CI1RI33',
        'rowIndex': 33,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI30*CI1RI31',
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
    ],
    'byKey': 'partlistvalue.formData.FPCTab.FFCProcessingContent.FPCStopLine',
  },
  {
    'xlsxKey': 'CI1RI34',
    'rowIndex': 34,
    'cellIndex': 0,
    'label': 'C.零件費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'byKey': 'accessory_cost',
          'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
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
    'xlsxKey': 'CI0RI35',
    'rowIndex': 35,
    'cellIndex': 0,
    'label': 'Shielding',
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
        'xlsxKey': 'CI1RI35',
        'rowIndex': 35,
        'cellIndex': 1,
        'label': 'Type',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'FPCShieldingType.value',
        'contents': [],
        'parentKey': 'Shielding',
        'parent': 'partlistprice.forDebug.debugInfo.fpcShielding',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
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
          'numberFormat': '#,##0',
        },
        'byKey': 'FPCShieldingQty.value',
        'contents': [],
        'parentKey': 'Shielding',
        'parent': 'partlistprice.forDebug.debugInfo.fpcShielding',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI37',
        'rowIndex': 37,
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
        'byKey': 'FPCShieldingTypeUnitPrice.value',
        'contents': [],
        'parentKey': 'Shielding',
        'parent': 'partlistprice.forDebug.debugInfo.fpcShielding',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI38',
        'rowIndex': 38,
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
        'byKey': 'shielding_loss_rate.value',
        'contents': [],
        'parentKey': 'Shielding',
        'parent': 'partlistprice.forDebug.debugInfo.fpcShielding',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI39',
        'rowIndex': 39,
        'cellIndex': 1,
        'label': '面積轉換常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'areatransferunit.value',
        'contents': [],
        'parentKey': 'Shielding',
        'parent': 'partlistprice.forDebug.debugInfo.fpcShielding',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI40',
        'rowIndex': 40,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(成品長邊最大尺寸 * 成品寬邊最大尺寸 /面積轉換常數) * 用量 * U/P * (1 + Loss Rate(%))',
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
        'description': '=IFERROR(($C$15*$C$16/CI1RI39)*CI1RI36*CI1RI37*(1+CI1RI38), 0)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': 'Shielding',
        'parent': 'partlistprice.forDebug.debugInfo.fpcShielding',
        'byKey': 'accessory_cost',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI42',
    'rowIndex': 42,
    'cellIndex': 0,
    'label': '補強板',
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
        'xlsxKey': 'CI1RI42',
        'rowIndex': 42,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI43*CI1RI44',
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
        'byKey': 'assy_time',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI43',
        'rowIndex': 43,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fpcReinforcingPlate_assy_time.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.fpcReinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI44',
        'rowIndex': 44,
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
        'byKey': 'FPCReinforcingPlateQty.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.fpcReinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI45',
        'rowIndex': 45,
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
        'byKey': 'fpcReinforcingPlate_unit_price.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.fpcReinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI46',
        'rowIndex': 46,
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
        'byKey': 'fpcReinforcingPlate_loss_rate.value',
        'contents': [],
        'parentKey': '補強板',
        'parent': 'partlistprice.forDebug.debugInfo.fpcReinforcingPlate',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI47',
        'rowIndex': 47,
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
        'xlsxKey': 'CI1RI48',
        'rowIndex': 48,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI44*CI1RI45*(1+CI1RI46)',
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
        'parent': 'partlistprice.forDebug.debugInfo.fpcReinforcingPlate',
        'byKey': 'accessory_cost',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI49',
    'rowIndex': 49,
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
        'xlsxKey': 'CI1RI49',
        'rowIndex': 49,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI50*CI1RI51',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Label',
        'byKey': 'assy_time',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI50',
        'rowIndex': 50,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fpcLabel_assy_time.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.fpcLabel',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI51',
        'rowIndex': 51,
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
        'byKey': 'FPCLabelQty.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.fpcLabel',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI52',
        'rowIndex': 52,
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
        'byKey': 'fpcLabel_unit_price.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.fpcLabel',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI53',
        'rowIndex': 53,
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
        'byKey': 'fpcLabel_loss_rate.value',
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.fpcLabel',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI54',
        'rowIndex': 54,
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
        'xlsxKey': 'CI1RI55',
        'rowIndex': 55,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI51*CI1RI52*(1+CI1RI53)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': 'Label',
        'parent': 'partlistprice.forDebug.debugInfo.fpcLabel',
        'byKey': 'accessory_cost',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI0RI56',
    'rowIndex': 56,
    'cellIndex': 0,
    'label': '背膠',
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
        'xlsxKey': 'CI1RI56',
        'rowIndex': 56,
        'cellIndex': 1,
        'label': 'Assy Time (Sec)',
        'type': 'formula',
        'description': '=CI1RI59*CI1RI60',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': '背膠',
        'byKey': 'assy_time',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI57',
        'rowIndex': 57,
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
        'byKey': 'FPCAdhesiveLength.value',
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI58',
        'rowIndex': 58,
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
        'byKey': 'FPCAdhesivewidth.value',
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI59',
        'rowIndex': 59,
        'cellIndex': 1,
        'label': '所需組裝時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'fpcAdhesive_assy_time.value',
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI60',
        'rowIndex': 60,
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
        'byKey': 'FPCAdhesiveQty.value',
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI61',
        'rowIndex': 61,
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
        'byKey': 'fpcAdhesive_unit_price.value',
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI62',
        'rowIndex': 62,
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
        'byKey': 'fpcAdhesive_loss_rate.value',
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI63',
        'rowIndex': 63,
        'cellIndex': 1,
        'label': '面積轉換常數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'areatransferunit.value',
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      },
      {
        'xlsxKey': 'CI1RI64',
        'rowIndex': 64,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '用量 * U/P *(L * W / 面積轉換常數) * (1 + Loss Rate(%))',
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
        'xlsxKey': 'CI1RI65',
        'rowIndex': 65,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=IFERROR(CI1RI60*CI1RI61*(CI1RI57*CI1RI58/CI1RI63)*(1+CI1RI62), 0)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'contents': [],
        'parentKey': '背膠',
        'parent': 'partlistprice.forDebug.debugInfo.fpcAdhesive',
        'byKey': 'accessory_cost',
        'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI66',
    'rowIndex': 66,
    'cellIndex': 0,
    'label': '備註',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.00000',
    },
    'byKey': 'partlistvalue.formData.FPCTab.FFCRemark.FPCRemarks',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI67',
    'rowIndex': 67,
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
    'xlsxKey': 'CI1RI68',
    'rowIndex': 68,
    'cellIndex': 0,
    'label': 'B.二次加工費',
    'type': 'formula',
    'description': '=CI1RI16',
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
    'xlsxKey': 'CI1RI69',
    'rowIndex': 69,
    'cellIndex': 0,
    'label': 'C.零件費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'byKey': 'accessory_cost',
          'groupIdPath': 'partlistvalue.formData.FPCTab.FPCAccessory',
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
    'xlsxKey': 'CI1RI70',
    'rowIndex': 70,
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
    'byKey': 'partlistprice.forDebug.debugInfo.cableFPC.fpcmanagement_and_profit.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI71',
    'rowIndex': 71,
    'cellIndex': 0,
    'label': 'D.管銷&利潤',
    'type': 'formula',
    'description': '=CI1RI68*CI1RI70',
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
    'xlsxKey': 'CI1RI72',
    'rowIndex': 72,
    'cellIndex': 0,
    'label': 'E. 成品總價',
    'type': 'formula',
    'description': '=IFERROR(CI1RI67+CI1RI68+CI1RI69+CI1RI71, "")',
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