module.exports = [
  {
    'xlsxKey': 'CI1RI0',
    'rowIndex': 0,
    'cellIndex': 0,
    'label': 'A.材料費',
    'type': 'formula',
    'description': '=(CI1RI14*CI1RI15*CI1RI4*CI1RI5)*CI1RI3/1000000*(1+CI1RI17)',
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
      'numberFormat': '#,##0.00000',
    },
    'contents': [
      {
        'xlsxKey': 'CI1RI1',
        'rowIndex': 1,
        'cellIndex': 1,
        'label': 'Material',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmmaterial',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI2',
        'rowIndex': 2,
        'cellIndex': 1,
        'label': 'Material Remark',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmMaterialRemark',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI3',
        'rowIndex': 3,
        'cellIndex': 1,
        'label': 'Material Price',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.hmmaterialprice.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI4',
        'rowIndex': 4,
        'cellIndex': 1,
        'label': 'Thickness (mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmthickness',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI5',
        'rowIndex': 5,
        'cellIndex': 1,
        'label': '密度 D',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.hmmaterialdensity.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI6',
        'rowIndex': 6,
        'cellIndex': 1,
        'label': 'L (mm) 成品長度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmpartssizespec.hmpartssizelength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI7',
        'rowIndex': 7,
        'cellIndex': 1,
        'label': 'W (mm) 成品寬度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmpartssizespec.hmpartssizewidth',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI8',
        'rowIndex': 8,
        'cellIndex': 1,
        'label': 'H (mm) 成品高度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmpartssizespec.hmpartssizehigh',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI9',
        'rowIndex': 9,
        'cellIndex': 1,
        'label': 'L2 (mm) 成品展開尺寸',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmpartsexpandsize.hmpartsexpandlength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI10',
        'rowIndex': 10,
        'cellIndex': 1,
        'label': 'W2 (mm) 成品展開尺寸',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmUser.hmpartsexpandsize.hmpartsexpandwidth',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI11',
        'rowIndex': 11,
        'cellIndex': 1,
        'label': '穴數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.Price.housingMetal.hmToolingHoleCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI12',
        'rowIndex': 12,
        'cellIndex': 1,
        'label': '邊料尺寸 L (mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'partlistvalue.Price.housingMetal.hmToolingMaterialLength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI13',
        'rowIndex': 13,
        'cellIndex': 1,
        'label': '邊料尺寸 W (mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'partlistvalue.Price.housingMetal.hmToolingMaterialWidth',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI14',
        'rowIndex': 14,
        'cellIndex': 1,
        'label': 'L (mm) 素材展開尺寸',
        'type': 'formula',
        'description': '=CI1RI12+CI1RI9',
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
        'xlsxKey': 'CI1RI15',
        'rowIndex': 15,
        'cellIndex': 1,
        'label': 'W (mm) 素材展開尺寸',
        'type': 'formula',
        'description': '=CI1RI13+CI1RI10',
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
        'xlsxKey': 'CI1RI16',
        'rowIndex': 16,
        'cellIndex': 1,
        'label': 'Weight (g)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingMaterialWeight',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI17',
        'rowIndex': 17,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.hmMaterialLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI18',
        'rowIndex': 18,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(素材展開尺寸(W) * 素材展開尺寸(L) * Thickmess(mm) * 密度 D) * Material Price / 1000000 * (1 + Loss Rate)',
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
    'xlsxKey': 'CI1RI19',
    'rowIndex': 19,
    'cellIndex': 0,
    'label': 'B.沖壓費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
          'byKey': 'stamping_price',
        }
      ],
      'wrapper': 'IFERROR(FORMULA, 0)',
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
    'xlsxKey': 'CI0RI20',
    'rowIndex': 20,
    'cellIndex': 0,
    'label': '沖壓',
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
        'xlsxKey': 'CI1RI20',
        'rowIndex': 20,
        'cellIndex': 1,
        'label': '模具型式',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'hmStampingMouldType.value',
        'contents': [],
        'parentKey': '沖壓',
        'parent': 'partlistprice.forDebug.debugInfo.stamping',
        'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
      },
      {
        'xlsxKey': 'CI1RI21',
        'rowIndex': 21,
        'cellIndex': 1,
        'label': '工程數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'hmStampingCount.value',
        'contents': [],
        'parentKey': '沖壓',
        'parent': 'partlistprice.forDebug.debugInfo.stamping',
        'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
      },
      {
        'xlsxKey': 'CI1RI22',
        'rowIndex': 22,
        'cellIndex': 1,
        'label': '沖壓機台(T)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'hmStampingMachineTonnage',
        'contents': [],
        'parentKey': '沖壓',
        'parent': 'partlistvalue.Price.housingMetal.stamping',
        'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
      },
      {
        'xlsxKey': 'CI1RI23',
        'rowIndex': 23,
        'cellIndex': 1,
        'label': '機台費',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'hmToolingModuleRate.value',
        'contents': [],
        'parentKey': '沖壓',
        'parent': 'partlistprice.forDebug.debugInfo.stamping',
        'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
      },
      {
        'xlsxKey': 'CI1RI24',
        'rowIndex': 24,
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
        'byKey': 'hmToolingStampingSingleLossRate.value',
        'contents': [],
        'parentKey': '沖壓',
        'parent': 'partlistprice.forDebug.debugInfo.stamping',
        'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
      },
      {
        'xlsxKey': 'CI1RI25',
        'rowIndex': 25,
        'cellIndex': 1,
        'label': 'FCST寬放值(%)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '0.0%',
        },
        'byKey': 'hmToolingStampingSingleAllowance.value',
        'contents': [],
        'parentKey': '沖壓',
        'parent': 'partlistprice.forDebug.debugInfo.stamping',
        'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
      },
      {
        'xlsxKey': 'CI1RI26',
        'rowIndex': 26,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '工程數*機台費/穴數*(1+LossRate)*(1+FCST寬放值)',
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
        'description': '=CI1RI21*CI1RI23/$C$21*(1+CI1RI24)*(1+CI1RI25)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'parentKey': '沖壓',
        'parent': 'partlistprice.forDebug.debugInfo.stamping',
        'byKey': 'stamping_price',
        'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
      }
    ]
  },
  {
    'xlsxKey': 'CI1RI28',
    'rowIndex': 28,
    'cellIndex': 0,
    'label': 'C.二次加工費',
    'type': 'formula',
    'description': '=CI1RI31+CI1RI37+CI1RI44+CI1RI53+CI1RI58+CI1RI68+CI1RI78+CI1RI83+CI1RI88+CI1RI93+CI1RI98+CI1RI104+CI1RI109+CI1RI114+CI1RI119+CI1RI128+CI1RI136+CI1RI141+CI1RI146+CI1RI150+CI1RI154+CI1RI159+CI1RI165+CI1RI170+CI1RI178+CI1RI186+CI1RI192+CI1RI197',
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
    'xlsxKey': 'CI0RI29',
    'rowIndex': 29,
    'cellIndex': 0,
    'label': '超音波清洗',
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
        'xlsxKey': 'CI1RI29',
        'rowIndex': 29,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.ultrasonicCleanUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI30',
        'rowIndex': 30,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'U/P',
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
        'xlsxKey': 'CI1RI31',
        'rowIndex': 31,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI29',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListultrasonicCleanExist',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListultrasonicCleanExist',
  },
  {
    'xlsxKey': 'CI0RI32',
    'rowIndex': 32,
    'cellIndex': 0,
    'label': '陽極(一陽)',
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
        'xlsxKey': 'CI1RI32',
        'rowIndex': 32,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.productExpendSize.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI33',
        'rowIndex': 33,
        'cellIndex': 1,
        'label': 'Color',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.Price.housingMetal.cmfProcessListFirstAnodeColor',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI34',
        'rowIndex': 34,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListFirstAnodePrice.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI35',
        'rowIndex': 35,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListFirstAnodeLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI36',
        'rowIndex': 36,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(加工面積(mm²) / 1000000) * U/P * (1 + Loss Rate)',
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
        'description': '=(CI1RI32/1000000)*CI1RI34*(1+CI1RI35)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListFirstAnodeCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListFirstAnodeCheckBox',
  },
  {
    'xlsxKey': 'CI0RI38',
    'rowIndex': 38,
    'cellIndex': 0,
    'label': '陽極(二陽/預陽)',
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
        'xlsxKey': 'CI1RI38',
        'rowIndex': 38,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.productExpendSize.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI39',
        'rowIndex': 39,
        'cellIndex': 1,
        'label': 'Color',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.Price.housingMetal.cmfProcessListSecondAnodeColor',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI40',
        'rowIndex': 40,
        'cellIndex': 1,
        'label': '製程次數(二陽=1;預陽=0.5)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSecondAnodeQty.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI41',
        'rowIndex': 41,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSecondAnodePrice.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI42',
        'rowIndex': 42,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSecondAnodeLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI43',
        'rowIndex': 43,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(加工面積(mm²) / 1000000) *製程次數 * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI44',
        'rowIndex': 44,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=(CI1RI38/1000000)*CI1RI41*CI1RI40*(1+CI1RI42)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSecondAnodeCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSecondAnodeCheckBox',
  },
  {
    'xlsxKey': 'CI0RI45',
    'rowIndex': 45,
    'cellIndex': 0,
    'label': '噴砂',
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
        'xlsxKey': 'CI1RI45',
        'rowIndex': 45,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.sandBlastUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI46',
        'rowIndex': 46,
        'cellIndex': 1,
        'label': '製程次數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSandBlastCheckBox',
        'contents': [],
        'mapper': {
          'true': 1,
          '_default': 0
        }
      },
      {
        'xlsxKey': 'CI1RI47',
        'rowIndex': 47,
        'cellIndex': 1,
        'label': '流水線方向工件間距',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.hmWorkpieceSpacingInAssemblyLineDirection.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI48',
        'rowIndex': 48,
        'cellIndex': 1,
        'label': '噴砂流水線速度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.sandblasting_line_speed.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI49',
        'rowIndex': 49,
        'cellIndex': 1,
        'label': '趟數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.hmNumberOfRuns.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI50',
        'rowIndex': 50,
        'cellIndex': 1,
        'label': 'Cycle time(sec)',
        'type': 'formula',
        'description': '=(CI1RI6+CI1RI47)/CI1RI48',
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
        'xlsxKey': 'CI1RI51',
        'rowIndex': 51,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.sandBlastLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI52',
        'rowIndex': 52,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Cycle time(sec) * U/P(USD) * (1 + Loss Rate) * 趟數',
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
        'xlsxKey': 'CI1RI53',
        'rowIndex': 53,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI50*CI1RI45*(1 + CI1RI51) * CI1RI49',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSandBlastCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSandBlastCheckBox',
  },
  {
    'xlsxKey': 'CI0RI54',
    'rowIndex': 54,
    'cellIndex': 0,
    'label': '髮絲',
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
        'xlsxKey': 'CI1RI54',
        'rowIndex': 54,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListHairLine.cmfProcessListHairLineArea',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI55',
        'rowIndex': 55,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.hairLineUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI56',
        'rowIndex': 56,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.hairLineLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI57',
        'rowIndex': 57,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(加工面積(mm²) / 1000000) * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI58',
        'rowIndex': 58,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=(CI1RI54/1000000)*CI1RI55*(1+CI1RI56)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListHairLineCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListHairLineCheckBox',
  },
  {
    'xlsxKey': 'CI0RI59',
    'rowIndex': 59,
    'cellIndex': 0,
    'label': 'Painting_噴漆',
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
        'xlsxKey': 'CI1RI59',
        'rowIndex': 59,
        'cellIndex': 1,
        'label': 'Type and Color',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListPainting.cmfProcessListPaintingTypeAndColor',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI60',
        'rowIndex': 60,
        'cellIndex': 1,
        'label': 'Color',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListPainting.cmfProcessListPaintingColor',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI61',
        'rowIndex': 61,
        'cellIndex': 1,
        'label': 'Manpower(USD/mm2)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.paintingConst1.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI62',
        'rowIndex': 62,
        'cellIndex': 1,
        'label': '噴塗面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.patintingArea.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI63',
        'rowIndex': 63,
        'cellIndex': 1,
        'label': '噴塗次數',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListPainting.cmfProcessListPaintingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI64',
        'rowIndex': 64,
        'cellIndex': 1,
        'label': '膜厚(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListPainting.cmfProcessListPaintingFilmThickness',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI65',
        'rowIndex': 65,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CmfProcessListPaintingPriceUSD.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI66',
        'rowIndex': 66,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.paintingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI67',
        'rowIndex': 67,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Manpower(USD/mm2) * 噴塗面積(mm²) * 噴塗次數 + (噴塗面積(mm²) * 膜厚(mm) *1.5 / 1000000) * 噴塗次數 * U/P * (1 + Loss Rate)',
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
        'description': '=CI1RI61*CI1RI62*CI1RI63+(CI1RI62*CI1RI64*1.5/1000000)*CI1RI63*CI1RI65*(1+CI1RI66)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPaintingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPaintingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI69',
    'rowIndex': 69,
    'cellIndex': 0,
    'label': 'Thermal Bonding_熱壓',
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
        'xlsxKey': 'CI1RI69',
        'rowIndex': 69,
        'cellIndex': 1,
        'label': '膠水型號',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListThermalBonding.cmfProcessListThermalBondingGlueType',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI70',
        'rowIndex': 70,
        'cellIndex': 1,
        'label': '路徑總長(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListThermalBonding.cmfProcessListThermalBondingPathLength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI71',
        'rowIndex': 71,
        'cellIndex': 1,
        'label': '針筒內徑',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListThermalBonding.cmfProcessListThermalBondingGlueSyringeDiameter',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI72',
        'rowIndex': 72,
        'cellIndex': 1,
        'label': '膠水重量(g)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListThermalBondingGlueWeight.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI73',
        'rowIndex': 73,
        'cellIndex': 1,
        'label': '膠水U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListThermalBondingGluePrice.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI74',
        'rowIndex': 74,
        'cellIndex': 1,
        'label': 'Cycle Time(sec)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListThermalBondingCycleTimeValue.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI75',
        'rowIndex': 75,
        'cellIndex': 1,
        'label': 'Cycle Time U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.thermalBondingUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI76',
        'rowIndex': 76,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.thermalBondingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI77',
        'rowIndex': 77,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(膠水重量(g) * 膠水U/P + Cycle Time(sec) * Cycle Time U/P) * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI78',
        'rowIndex': 78,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=(CI1RI72*CI1RI73+CI1RI74*CI1RI75)*(1+CI1RI76)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListThermalBondingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListThermalBondingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI79',
    'rowIndex': 79,
    'cellIndex': 0,
    'label': '單點攻牙',
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
        'xlsxKey': 'CI1RI79',
        'rowIndex': 79,
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
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListSingleTapping.cmfProcessListSingleTappingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI80',
        'rowIndex': 80,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.singleTappingUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI81',
        'rowIndex': 81,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.singleTappingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI82',
        'rowIndex': 82,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '數量 * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI83',
        'rowIndex': 83,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI79*CI1RI80*(1+CI1RI81)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSingleTappingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSingleTappingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI84',
    'rowIndex': 84,
    'cellIndex': 0,
    'label': '多點攻牙',
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
        'xlsxKey': 'CI1RI84',
        'rowIndex': 84,
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
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListMultiTapping.cmfProcessListMultiTappingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI85',
        'rowIndex': 85,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.multiTappingUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI86',
        'rowIndex': 86,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.multiTappingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI87',
        'rowIndex': 87,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '數量 *U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI88',
        'rowIndex': 88,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI84*CI1RI85*(1+CI1RI86)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListMultiTappingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListMultiTappingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI89',
    'rowIndex': 89,
    'cellIndex': 0,
    'label': '單點點焊',
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
        'xlsxKey': 'CI1RI89',
        'rowIndex': 89,
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
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListSingleSpotWelding.cmfProcessListSingleSpotWeldingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI90',
        'rowIndex': 90,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.singleSpotWeldingUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI91',
        'rowIndex': 91,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.singleSpotWeldingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI92',
        'rowIndex': 92,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '數量 * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI93',
        'rowIndex': 93,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI89*CI1RI90*(1+CI1RI91)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSingleSpotWeldingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSingleSpotWeldingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI94',
    'rowIndex': 94,
    'cellIndex': 0,
    'label': '多點點焊',
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
        'xlsxKey': 'CI1RI94',
        'rowIndex': 94,
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
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListMultiSpotWelding.cmfProcessListMultiSpotWeldingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI95',
        'rowIndex': 95,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.multiSpotWeldingUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI96',
        'rowIndex': 96,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.multiSpotWeldingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI97',
        'rowIndex': 97,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '數量 * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI98',
        'rowIndex': 98,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI94*CI1RI95*(1+CI1RI96)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListMultiSpotWeldingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListMultiSpotWeldingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI99',
    'rowIndex': 99,
    'cellIndex': 0,
    'label': '手工塗黑',
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
        'xlsxKey': 'CI1RI99',
        'rowIndex': 99,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListHandMakeDraw.cmfProcessListHandMakeDrawCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI100',
        'rowIndex': 100,
        'cellIndex': 1,
        'label': 'Cycle Time(sec)',
        'type': 'formula',
        'description': '=CI1RI99*40/2500',
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
        'xlsxKey': 'CI1RI101',
        'rowIndex': 101,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.handMakeDrawUP.value',
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.handMakeDrawLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI103',
        'rowIndex': 103,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(Cycle Time(sec) / 60) * U/P * (1 + Loss Rate)',
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
        'description': '=(CI1RI100/60)*CI1RI101*(1+CI1RI102)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListHandMakeDrawCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListHandMakeDrawCheckBox',
  },
  {
    'xlsxKey': 'CI0RI105',
    'rowIndex': 105,
    'cellIndex': 0,
    'label': 'Printing網印',
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
        'label': '次',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListScreenPrinting.cmfProcessListScreenPrintingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI106',
        'rowIndex': 106,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.screenPrintingUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI107',
        'rowIndex': 107,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.screenPrintingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI108',
        'rowIndex': 108,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '次 * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI109',
        'rowIndex': 109,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI105*CI1RI106*(1+CI1RI107)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListScreenPrintingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListScreenPrintingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI110',
    'rowIndex': 110,
    'cellIndex': 0,
    'label': 'Printing移印',
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
        'xlsxKey': 'CI1RI110',
        'rowIndex': 110,
        'cellIndex': 1,
        'label': '次',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListPadPrinting.cmfProcessListPadPrintingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI111',
        'rowIndex': 111,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.padPrintingUP.value',
        'contents': []
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.padPrintingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI113',
        'rowIndex': 113,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '次 * U/P * (1 + Loss Rate)',
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
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPadPrintingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPadPrintingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI115',
    'rowIndex': 115,
    'cellIndex': 0,
    'label': 'Silk Print',
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
        'label': '次',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListSilkPrint.cmfProcessListSilkPrintCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI116',
        'rowIndex': 116,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.silkPrintUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI117',
        'rowIndex': 117,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.silkPrintLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI118',
        'rowIndex': 118,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '次 * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI119',
        'rowIndex': 119,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI115*CI1RI116*(1+CI1RI117)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSilkPrintCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListSilkPrintCheckBox',
  },
  {
    'xlsxKey': 'CI0RI120',
    'rowIndex': 120,
    'cellIndex': 0,
    'label': 'CNC(公模面)',
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
        'xlsxKey': 'CI1RI120',
        'rowIndex': 120,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListCNC.cmfProcessListCNCArea',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI121',
        'rowIndex': 121,
        'cellIndex': 1,
        'label': '調整加工速率之比例',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCProcessingSizeFormula1.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI122',
        'rowIndex': 122,
        'cellIndex': 1,
        'label': '加工速率mm/sec',
        'type': 'formula',
        'description': '=20*CI1RI121',
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
        'xlsxKey': 'CI1RI123',
        'rowIndex': 123,
        'cellIndex': 1,
        'label': '基本取放時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCPickAndPlaceSec.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI124',
        'rowIndex': 124,
        'cellIndex': 1,
        'label': 'Cycle Time(sec)\r\n(含取放時間)',
        'type': 'formula',
        'description': '=CI1RI120/CI1RI122+CI1RI123',
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
        'xlsxKey': 'CI1RI125',
        'rowIndex': 125,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI126',
        'rowIndex': 126,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI127',
        'rowIndex': 127,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Cycle Time(sec)(含取放時間) * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI128',
        'rowIndex': 128,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI124*CI1RI125*(1+CI1RI126)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListCNCCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListCNCCheckBox',
  },
  {
    'xlsxKey': 'CI0RI129',
    'rowIndex': 129,
    'cellIndex': 0,
    'label': 'CNC(PL處)',
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
        'xlsxKey': 'CI1RI129',
        'rowIndex': 129,
        'cellIndex': 1,
        'label': '加工長度(mm)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListCNCPL.cmfProcessListCNCPLLength',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI130',
        'rowIndex': 130,
        'cellIndex': 1,
        'label': '加工速率mm/sec',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCPLConst1.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI131',
        'rowIndex': 131,
        'cellIndex': 1,
        'label': '基本取放時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCPLPickAndPlaceSec.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI132',
        'rowIndex': 132,
        'cellIndex': 1,
        'label': 'Cycle Time(sec)\r\n(含取放時間)',
        'type': 'formula',
        'description': '=CI1RI129/CI1RI130+CI1RI131',
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
        'xlsxKey': 'CI1RI133',
        'rowIndex': 133,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCPLUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI134',
        'rowIndex': 134,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.CNCPLLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI135',
        'rowIndex': 135,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Cycle Time(sec)(含取放時間) * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI136',
        'rowIndex': 136,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI132*CI1RI133*(1+CI1RI134)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListCNCPLCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListCNCPLCheckBox',
  },
  {
    'xlsxKey': 'CI0RI137',
    'rowIndex': 137,
    'cellIndex': 0,
    'label': '鑽切(高光) Power button鑽切',
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
        'xlsxKey': 'CI1RI137',
        'rowIndex': 137,
        'cellIndex': 1,
        'label': '吋別',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutPowerButtonType',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI138',
        'rowIndex': 138,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutPowerButtonCost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI139',
        'rowIndex': 139,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutPowerButtonLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI140',
        'rowIndex': 140,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'U/P * (1 + Loss Rate)',
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
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI138*(1+CI1RI139)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutPowerButtonExist',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutPowerButtonExist',
  },
  {
    'xlsxKey': 'CI0RI142',
    'rowIndex': 142,
    'cellIndex': 0,
    'label': '鑽切(高光) TP鑽切',
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
        'xlsxKey': 'CI1RI142',
        'rowIndex': 142,
        'cellIndex': 1,
        'label': '吋別',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutTPType',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI143',
        'rowIndex': 143,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutTPCost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI144',
        'rowIndex': 144,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutTPLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI145',
        'rowIndex': 145,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'U/P * (1 + Loss Rate)',
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
        'description': '=CI1RI143*(1+CI1RI144)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutTPExist',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutTPExist',
  },
  {
    'xlsxKey': 'CI0RI147',
    'rowIndex': 147,
    'cellIndex': 0,
    'label': '鑽切(高光) 指紋孔鑽切',
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
        'xlsxKey': 'CI1RI147',
        'rowIndex': 147,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutFingerprintHoleCost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI148',
        'rowIndex': 148,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutFingerprintHoleLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI149',
        'rowIndex': 149,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI150',
        'rowIndex': 150,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI147*(1+CI1RI148)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutFingerprintHoleExist',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutFingerprintHoleExist',
  },
  {
    'xlsxKey': 'CI0RI151',
    'rowIndex': 151,
    'cellIndex': 0,
    'label': '鑽切(高光) 電源孔鑽切',
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
        'xlsxKey': 'CI1RI151',
        'rowIndex': 151,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutPowerHoleCost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI152',
        'rowIndex': 152,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutPowerHoleLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI153',
        'rowIndex': 153,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI154',
        'rowIndex': 154,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI151*(1+CI1RI152)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutPowerHoleExist',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutPowerHoleExist',
  },
  {
    'xlsxKey': 'CI0RI155',
    'rowIndex': 155,
    'cellIndex': 0,
    'label': '鑽切(高光) 全週4週邊鑽切',
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
        'xlsxKey': 'CI1RI155',
        'rowIndex': 155,
        'cellIndex': 1,
        'label': '吋別',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutFourSidesType',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI156',
        'rowIndex': 156,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutFourSidesCost.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI157',
        'rowIndex': 157,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListFourSidesLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI158',
        'rowIndex': 158,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI159',
        'rowIndex': 159,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI156*(1+CI1RI157)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutFourSidesExist',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillCutFourSidesExist',
  },
  {
    'xlsxKey': 'CI0RI160',
    'rowIndex': 160,
    'cellIndex': 0,
    'label': '鐳雕(公模面)',
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
        'xlsxKey': 'CI1RI160',
        'rowIndex': 160,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListLaserPrint.cmfProcessListLaserPrintArea',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI161',
        'rowIndex': 161,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.laserPrintUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI162',
        'rowIndex': 162,
        'cellIndex': 1,
        'label': '取放與換刀時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.pick_and_place_and_tool_change_time.value',
        'contents': []
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.laserPrintLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI164',
        'rowIndex': 164,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(加工面積(mm²) / 1000000) * U/P * (1 + Loss Rate) + 取放與換刀時間 / 60 * 0.06',
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
        'description': '=(CI1RI160/1000000)*CI1RI161*(1 + CI1RI163) + CI1RI162 / 60 * 0.06',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListLaserPrintCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListLaserPrintCheckBox',
  },
  {
    'xlsxKey': 'CI0RI166',
    'rowIndex': 166,
    'cellIndex': 0,
    'label': '鐳雕(icon)',
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
        'xlsxKey': 'CI1RI166',
        'rowIndex': 166,
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
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListLaserPrintIcon.cmfProcessListLaserPrintIconCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI167',
        'rowIndex': 167,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.laserPrintIconUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI168',
        'rowIndex': 168,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.laserPrintIconLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI169',
        'rowIndex': 169,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '數量 * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI170',
        'rowIndex': 170,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI166*CI1RI167*(1+CI1RI168)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListLaserPrintIconCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListLaserPrintIconCheckBox',
  },
  {
    'xlsxKey': 'CI0RI171',
    'rowIndex': 171,
    'cellIndex': 0,
    'label': '打磨自動',
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
        'xlsxKey': 'CI1RI171',
        'rowIndex': 171,
        'cellIndex': 1,
        'label': '基本取放時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingAutoPickAndPlaceSec.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI172',
        'rowIndex': 172,
        'cellIndex': 1,
        'label': '自動加工速度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingAutoProcessingSpeed.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI173',
        'rowIndex': 173,
        'cellIndex': 1,
        'label': 'Cycle Time(sec)\r\n(含取放時間)',
        'type': 'formula',
        'description': '=CI1RI174/CI1RI172+CI1RI171',
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
        'xlsxKey': 'CI1RI174',
        'rowIndex': 174,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'type': 'formula',
        'description': '=2*(CI1RI7*CI1RI8+CI1RI6*CI1RI8)+CI1RI7*CI1RI6',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListPolishingAutoArea.value',
      },
      {
        'xlsxKey': 'CI1RI175',
        'rowIndex': 175,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingAutoUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI176',
        'rowIndex': 176,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingAutoLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI177',
        'rowIndex': 177,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Cycle Time(sec) (含取放時間)* U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI178',
        'rowIndex': 178,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI173*CI1RI175*(1+CI1RI176)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPolishingAutoCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPolishingAutoCheckBox',
  },
  {
    'xlsxKey': 'CI0RI179',
    'rowIndex': 179,
    'cellIndex': 0,
    'label': '打磨人工',
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
        'xlsxKey': 'CI1RI179',
        'rowIndex': 179,
        'cellIndex': 1,
        'label': '基本取放時間',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingArtificialPickAndPlaceSec.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI180',
        'rowIndex': 180,
        'cellIndex': 1,
        'label': '手動加工速度',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingArtificialProcessingSpeed.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI181',
        'rowIndex': 181,
        'cellIndex': 1,
        'label': 'Cycle Time(sec)\r\n(含取放時間)',
        'type': 'formula',
        'description': '=CI1RI182/CI1RI180+CI1RI179',
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
        'xlsxKey': 'CI1RI182',
        'rowIndex': 182,
        'cellIndex': 1,
        'label': '加工面積(mm²)',
        'type': 'formula',
        'description': '=2*(CI1RI7*CI1RI8+CI1RI6*CI1RI8)+2*5*(CI1RI7+CI1RI6)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0',
        },
        'contents': [],
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListPolishingArtificialArea.value',
      },
      {
        'xlsxKey': 'CI1RI183',
        'rowIndex': 183,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingArtificialUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI184',
        'rowIndex': 184,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.polishingArtificialLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI185',
        'rowIndex': 185,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': 'Cycle Time(sec) (含取放時間) * U/P * (1 + Loss Rate)',
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
        'xlsxKey': 'CI1RI186',
        'rowIndex': 186,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=CI1RI181*CI1RI183*(1+CI1RI184)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPolishingArtificialCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListPolishingArtificialCheckBox',
  },
  {
    'xlsxKey': 'CI0RI187',
    'rowIndex': 187,
    'cellIndex': 0,
    'label': '鑽孔',
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
        'xlsxKey': 'CI1RI187',
        'rowIndex': 187,
        'cellIndex': 1,
        'label': '基本消費額',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.00000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.drillingConst1.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI188',
        'rowIndex': 188,
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
        'byKey': 'partlistvalue.formData.CMFProcessList.cmfProcessListDrilling.cmfProcessListDrillingCount',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI189',
        'rowIndex': 189,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.000000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.drillingUP.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI190',
        'rowIndex': 190,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.drillingLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI191',
        'rowIndex': 191,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '(基本消費額 + 數量 * U/P * (1 + Loss Rate))',
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
        'xlsxKey': 'CI1RI192',
        'rowIndex': 192,
        'cellIndex': 1,
        'label': 'Price',
        'type': 'formula',
        'description': '=(CI1RI187+CI1RI188*CI1RI189*(1+CI1RI190))',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillingCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListDrillingCheckBox',
  },
  {
    'xlsxKey': 'CI0RI193',
    'rowIndex': 193,
    'cellIndex': 0,
    'label': '陽極掛點切除',
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
        'xlsxKey': 'CI1RI193',
        'rowIndex': 193,
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListAnodizingRemovalCount.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI194',
        'rowIndex': 194,
        'cellIndex': 1,
        'label': 'U/P(USD)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.anodizingRemovalUP.value',
        'contents': []
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
        'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.anodizingRemovalLossRate.value',
        'contents': []
      },
      {
        'xlsxKey': 'CI1RI196',
        'rowIndex': 196,
        'cellIndex': 1,
        'label': '公式',
        'type': 'value',
        'description': '數量 * U/P * (1 + Loss Rate)',
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
        'description': '=CI1RI193*CI1RI194*(1+CI1RI195)',
        'style': {
          'color': null,
          'border': {
            'topBorderStyle': 'thin',
            'bottomBorderStyle': 'thin',
          },
          'numberFormat': '#,##0.0000',
        },
        'contents': [],
        'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListAnodizingRemovalCheckBox',
      }
    ],
    'existKey': 'partlistvalue.Price.housingMetal.cmfProcessListAnodizingRemovalCheckBox',
  },
  {
    'xlsxKey': 'CI1RI198',
    'rowIndex': 198,
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
    'xlsxKey': 'CI1RI199',
    'rowIndex': 199,
    'cellIndex': 0,
    'label': 'B.沖壓費',
    'type': 'formula',
    'description': {
      'type': 'sum',
      'set': [
        {
          'groupIdPath': 'partlistvalue.formData.toolingPartList.hmTooling.hmToolingStamping',
          'byKey': 'stamping_price',
        }
      ],
      'wrapper': 'IFERROR(FORMULA, 0)',
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
    'xlsxKey': 'CI1RI200',
    'rowIndex': 200,
    'cellIndex': 0,
    'label': 'C.二次加工費',
    'type': 'formula',
    'description': '=CI1RI28',
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
    'xlsxKey': 'CI1RI201',
    'rowIndex': 201,
    'cellIndex': 0,
    'label': '管銷利潤之二次加工費加權系數',
    'style': {
      'color': null,
      'border': {
        'topBorderStyle': 'thick',
        'bottomBorderStyle': 'thick',
      },
      'numberFormat': '#,##0.00000',
    },
    'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.profit_weighting.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI202',
    'rowIndex': 202,
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
    'byKey': 'partlistprice.forDebug.debugInfo.housingMetal.profit_percent.value',
    'contents': []
  },
  {
    'xlsxKey': 'CI1RI203',
    'rowIndex': 203,
    'cellIndex': 0,
    'label': 'D.管銷&利潤',
    'type': 'formula',
    'description': '=(CI1RI199+CI1RI201*CI1RI200)*CI1RI202',
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
    'xlsxKey': 'CI1RI204',
    'rowIndex': 204,
    'cellIndex': 0,
    'label': 'E. 成品總價',
    'type': 'formula',
    'description': '=CI1RI198+CI1RI199+CI1RI200+CI1RI203',
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
