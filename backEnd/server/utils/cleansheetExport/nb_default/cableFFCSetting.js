const quotationSetting = require('../../cleanSheetQuotation/nb/cable-ffc')

module.exports = {
  cleansheet: [
    {
      label: 'A.材料費:',
      byKey: 'partlistprice.prices.cableFFC.a_material_cost',
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
      label: 'B.二次加工費:',
      byKey: 'partlistprice.prices.cableFFC.b_secondary_processing_cost',
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
      label: '組裝',
      byKey: 'partlistprice.prices.cableFFC.b_sub_assembly_cost',
      style: {
        color: null,
        bold: false,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '折彎',
      byKey: 'partlistprice.prices.cableFFC.b_sub_ffcBend_cost',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: '印刷',
      byKey: 'partlistprice.prices.cableFFC.b_sub_ffcPrint_cost',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: '沖型',
      byKey: 'partlistprice.prices.cableFFC.b_sub_ffc_flush_cost',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: '金手指掛鍍(鍍金)',
      byKey: 'partlistprice.prices.cableFFC.b_sub_ffcGoldPlating_cost',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: '停止線',
      byKey: 'partlistprice.prices.cableFFC.b_sub_ffcStopLine_cost',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: 'C.零件費:',
      byKey: 'partlistprice.prices.cableFFC.d_components_cost',
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
      label: 'Al Foil',
      parent: 'partlistprice.forDebug.debugInfo.alfoil',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '補強板',
      parent: 'partlistprice.forDebug.debugInfo.reinforcingPlate',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Label 料號標籤',
      parent: 'partlistprice.forDebug.debugInfo.label1',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Label 白底黑字',
      parent: 'partlistprice.forDebug.debugInfo.label2',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '導電布',
      parent: 'partlistprice.forDebug.debugInfo.conductiveCloth',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '醋酸布',
      parent: 'partlistprice.forDebug.debugInfo.aceticAcidCloth',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'KAPTON',
      parent: 'partlistprice.forDebug.debugInfo.kapton',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '雙面膠',
      parent: 'partlistprice.forDebug.debugInfo.doubleSideTape',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Mylar(CY28_PET) T=0.05',
      parent: 'partlistprice.forDebug.debugInfo.mylarCY28Pet005',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Mylar(PET_6027D) T=0.1',
      parent: 'partlistprice.forDebug.debugInfo.mylarPet6027D01',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '導電雙面膠',
      parent: 'partlistprice.forDebug.debugInfo.conductiveDoubleSideTape',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
      byKey: 'accessoryCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Connector',
      parent: 'partlistprice.forDebug.debugInfo.cableFfcConnector',
      groupIdPath: 'partlistvalue.formData.FFCTab.FFCConnector',
      byKey: 'connectorCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'D.管銷&利潤:',
      byKey: 'partlistprice.prices.cableFFC.e_profit',
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
      label: 'E.成品總價:',
      byKey: 'partlistprice.totalPrices',
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
      label: 'Pin數',
      byKey: 'partlistvalue.formData.FFCTab.FFCItems.FFCPin',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Pitch',
      byKey: 'partlistvalue.formData.FFCTab.FFCItems.FFCPitch',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Cable length',
      byKey: 'partlistvalue.formData.FFCTab.FFCItems.FFCCableLength',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '折彎(次)',
      byKey: 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCBendTImes',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '印刷(面)',
      byKey: 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCPrint',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '沖型(次)',
      byKey: 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCFlush',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '金手指掛鍍(鍍金)',
      byKey: 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCGoldPlating',
      mapper: {
        true: 'Yes',
        false: 'No',
        '1': 'Yes',
        '0': 'No',
      },
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '停止線(條)',
      byKey: 'partlistvalue.formData.FFCTab.FFCProcessingContent.FFCStopLine',
      style: {
        color: null,
        format: null,
        border: {
          bottomBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    {
      label: 'Al Foil',
      contents: [
        {
          parentKey: 'Al Foil',
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCAlFoilLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Al Foil',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCAlFoilQty',
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
      label: '補強板',
      contents: [
        {
          parentKey: '補強板',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCReinforcingPlateQty',
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
      label: 'Label 料號標籤',
      contents: [
        {
          parentKey: 'Label 料號標籤',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCLabel1Qty',
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
      label: 'Label 白底黑字',
      contents: [
        {
          parentKey: 'Label 白底黑字',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCLabel2Qty',
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
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCConductiveClothLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '導電布',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCConductiveClothQty',
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
      label: '醋酸布',
      contents: [
        {
          parentKey: '醋酸布',
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCAceticAcidClothLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '醋酸布',
          label: 'W',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCAceticAcidClothwidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '醋酸布',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCAceticAcidClothQty',
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
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCKaptonLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'KAPTON',
          label: 'W',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCKaptonwidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'KAPTON',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCKaptonQty',
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
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCDoubleSideTapeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '雙面膠',
          label: 'W',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCDoubleSideTapewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '雙面膠',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCDoubleSideTapeQty',
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
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCMylarCY28Pet005Length',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(CY28_PET) T=0.05',
          label: 'W',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCMylarCY28Pet005width',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(CY28_PET) T=0.05',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCMylarCY28Pet005Qty',
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
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCMylarPet6027D01Length',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(PET_6027D) T=0.1',
          label: 'W',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCMylarPet6027D01width',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Mylar(PET_6027D) T=0.1',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCMylarPet6027D01Qty',
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
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCConductiveDoubleSideTapeLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '導電雙面膠',
          label: 'W',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCConductiveDoubleSideTapewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '導電雙面膠',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCAccessory',
          byKey: 'FFCConductiveDoubleSideTapeQty',
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
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCConnector',
          byKey: 'FFCConnectorFunctionName',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: '品名 Remark',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCConnector',
          byKey: 'FFCConnectorNameRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: 'Connector type',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCConnector',
          byKey: 'FFCConnectorType',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: 'Connector type Remark',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCConnector',
          byKey: 'FFCConnectorTypeRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: 'Connector',
          label: 'Vendor PN',
          groupIdPath: 'partlistvalue.formData.FFCTab.FFCConnector',
          byKey: 'FFCConnectorVendorPn',
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

