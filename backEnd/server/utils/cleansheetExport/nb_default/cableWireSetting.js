const quotationSetting = require('../../cleanSheetQuotation/nb/cable-wire')

module.exports = {
  cleansheet: [
    {
      label: 'A.材料費:',
      byKey: 'partlistprice.prices.cableWire.a_sumCableMaterialPrice',
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
      label: 'Other_Fill_ME_Remark',
      parent: 'partlistprice.forDebug.debugInfo.cableWireMaterial',
      groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
      byKey: 'otherFillMeRemark.value',
      mapper: {
        true: '',
      },
      style: {
        color: null,
        format: null,
        border: {},
      },

      contents: [],
    },
    {
      label: '鐵氟龍線',
      parent: 'partlistprice.forDebug.debugInfo.cableWireMaterial',
      groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
      byKey: 'wirePrice.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '同軸線',
      parent: 'partlistprice.forDebug.debugInfo.cableWireMaterial',
      groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
      byKey: 'wirePrice.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'FFC',
      parent: 'partlistprice.forDebug.debugInfo.cableWireMaterial',
      groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
      byKey: 'wirePrice.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'B.二次加工費:',
      byKey: 'partlistprice.prices.cableWire.b_secondary_processing_cost',
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
      label: 'C.零件費:',
      byKey: 'partlistprice.prices.cableWire.c_component_cost',
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
      label: 'Connector 小計',
      byKey: 'partlistprice.forDebug.debugInfo.cableWire.sumConnectorCost.value',
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
      label: 'Connector',
      parent: 'partlistprice.forDebug.debugInfo.cableConnector',
      groupIdPath: 'partlistvalue.formData.cwTab.CWConnector',
      byKey: 'connectorPrice.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '輔料 小計',
      byKey: 'partlistprice.forDebug.debugInfo.cableWire.supportCost.value',
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
      label: '醋酸布1預設線材長度加總(全線段包裹)',
      byKey: 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultAceticAcidClothCost.value',
      style: {
        bold: true,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '導電布1預設線材長度加總(全線段包裹)',
      byKey: 'partlistprice.forDebug.debugInfo.cableWire.CWDefaultConductiveClothCost.value',
      style: {
        bold: true,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '地片',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'KAPTON',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '醋酸布',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Teflon膠带',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '導電布',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '絞線',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'UV GLUE',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Label',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '熱縮套管',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '畫線',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '導電雙面膠',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Mylar(CY28_PET) T=0.05',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Mylar(PET_6027D) T=0.1',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '雙面膠',
      parent: 'partlistprice.forDebug.debugInfo.cableSupport',
      groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
      byKey: 'supportCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '耗材 小計',
      byKey: 'partlistprice.forDebug.debugInfo.cableWire.consumable_cost.value',
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
      label: 'D. 管銷&利潤',
      byKey: 'partlistprice.prices.cableWire.d_profit',
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
      label: 'E. 成品總價',
      byKey: 'partlistprice.prices.cableWire.total',
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
      label: '線材 (Other_fill_me_remark)',
      contents: [
        {
          parentKey: 'Other_Fill_ME_Remark',
          label: 'Remark',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'otherFillMeRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: '同軸線',
      contents: [
        {
          parentKey: '同軸線',
          label: 'Pin數',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'coaxialPin',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '同軸線',
          label: 'Cable length',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'coaxialLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '同軸線',
          label: 'Gauge數',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'coaxialGuage',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '同軸線',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'coaxialQty',
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
    {
      label: 'FFC',
      contents: [
        {
          parentKey: 'FFC',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCQty',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: 'Cable Length(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: 'Pin',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCPin',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: 'Pitch',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCPitch',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: '折彎(次)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCBendTImes',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: '印刷(面)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCPrint',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: '沖型(次)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCFlushCount',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: '金手指掛鍍(鍍金)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCGoldPlating',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'FFC',
          label: '停止線(條)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'CWFFCStopLine',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: '鐵氟龍線',
      contents: [
        {
          parentKey: '鐵氟龍線',
          label: 'Pin數',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'teflonPin',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '鐵氟龍線',
          label: 'Cable length',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'teflonLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '鐵氟龍線',
          label: 'Gauge數',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'teflonGuage',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '鐵氟龍線',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWWire',
          byKey: 'teflonQty',
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
    {
      label: 'Connector',
      contents: [
        {
          parentKey: 'Connector',
          label: '品名',
          groupIdPath: 'partlistvalue.formData.cwTab.CWConnector',
          byKey: 'cableConnectorName',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: '品名 Remark',
          groupIdPath: 'partlistvalue.formData.cwTab.CWConnector',
          byKey: 'cableConnectorNameRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: 'Connector type',
          groupIdPath: 'partlistvalue.formData.cwTab.CWConnector',
          byKey: 'cableConnectorType',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: 'Connector type Remark',
          groupIdPath: 'partlistvalue.formData.cwTab.CWConnector',
          byKey: 'cableConnectorTypeRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: 'Vendor PN',
          groupIdPath: 'partlistvalue.formData.cwTab.CWConnector',
          byKey: 'cableConnectorVendorPn',
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
    {
      label: '地片',
      contents: [
        {
          parentKey: '地片',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWGroundFilmQty',
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
    {
      label: 'KAPTON',
      contents: [
        {
          parentKey: 'KAPTON',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWKaptonLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'KAPTON',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWKaptonwidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'KAPTON',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWKaptonQty',
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
    {
      label: '醋酸布拉帶',
      contents: [
        {
          parentKey: '醋酸布拉帶',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWAceticAcidClothLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '醋酸布拉帶',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWAceticAcidClothwidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '醋酸布拉帶',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWAceticAcidClothQty',
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
    {
      label: 'Teflon膠带',
      contents: [
        {
          parentKey: 'Teflon膠带',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWTeflonTapeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Teflon膠带',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWTeflonTapeWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Teflon膠带',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWTeflonTapeQty',
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
    {
      label: '導電布',
      contents: [
        {
          parentKey: '導電布',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWConductiveClothLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '導電布',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWConductiveClothWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '導電布',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWConductiveClothQty',
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
    {
      label: '絞線',
      contents: [
        {
          parentKey: '絞線',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWTwistedWireQty',
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
    {
      label: 'UV GLUE',
      contents: [
        {
          parentKey: 'UV GLUE',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWUvGlueQty',
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
    {
      label: 'Label',
      contents: [
        {
          parentKey: 'Label',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWLabelQty',
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
    {
      label: '熱縮套管',
      contents: [
        {
          parentKey: '熱縮套管',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWHeatShrinkableTubingsQty',
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
    {
      label: '畫線',
      contents: [
        {
          parentKey: '畫線',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWDrawLineQty',
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
    {
      label: '導電雙面膠',
      contents: [
        {
          parentKey: '導電雙面膠',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWConductiveDoubleSideTapeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '導電雙面膠',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWConductiveDoubleSideTapewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '導電雙面膠',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWConductiveDoubleSideTapeQty',
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
    {
      label: 'Mylar(CY28_PET) T=0.05',
      contents: [
        {
          parentKey: 'Mylar(CY28_PET) T=0.05',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWMylarCY28Pet005Length',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(CY28_PET) T=0.05',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWMylarCY28Pet005width',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(CY28_PET) T=0.05',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWMylarCY28Pet005Qty',
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
    {
      label: 'Mylar(PET_6027D) T=0.1',
      contents: [
        {
          parentKey: 'Mylar(PET_6027D) T=0.1',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWMylarPet6027D01Length',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(PET_6027D) T=0.1',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWMylarPet6027D01width',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(PET_6027D) T=0.1',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWMylarPet6027D01Qty',
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
    {
      label: '雙面膠',
      contents: [
        {
          parentKey: '雙面膠',
          label: 'L(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWDoubleSideTapeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '雙面膠',
          label: 'W(mm)',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWDoubleSideTapewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '雙面膠',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.cwTab.CWSubMertial',
          byKey: 'CWDoubleSideTapeQty',
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

