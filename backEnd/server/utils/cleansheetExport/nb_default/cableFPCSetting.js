const quotationSetting = require('../../cleanSheetQuotation/nb/cable-fpc')

module.exports = {
  cleansheet: [
    {
      label: 'A.材料費:',
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.material_cost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.secondary_processing_cost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.assembly_cost.value',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: '折彎',
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.fpcBend_cost.value',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: '印刷',
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.fpcPrint_cost.value',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: '停止線',
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.fpcStopLine_cost.value',
      style: {
        color: null,
        bold: false,
        border: {},
      },
      contents: [],
    },
    {
      label: 'C.零件費:',
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.sumAccessoryCost.value',
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
      label: 'Shielding',
      parent: 'partlistprice.forDebug.debugInfo.fpcShielding',
      groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
      byKey: 'fpcSielding_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '補強板',
      parent: 'partlistprice.forDebug.debugInfo.fpcReinforcingPlate',
      groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
      byKey: 'fpcReinforcingPlate_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Label',
      parent: 'partlistprice.forDebug.debugInfo.fpcLabel',
      groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
      byKey: 'fpcLabel_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '背膠',
      parent: 'partlistprice.forDebug.debugInfo.fpcAdhesive',
      groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
      byKey: 'fpcAdhesive_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'D.管銷&利潤:',
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.cost_of_selling_and_profit.value',
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
      label: 'E.成品總價:',
      byKey: 'partlistprice.forDebug.debugInfo.cableFPC.total.value',
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
      byKey: 'partlistvalue.formData.FPCTab.FPCItems.FPCPin',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Pitch',
      byKey: 'partlistvalue.formData.FPCTab.FPCItems.FPCPitch',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '成品長邊最大尺寸(mm)',
      byKey: 'partlistvalue.formData.FPCTab.FPCItems.FPCCableSize.FPCCableLength',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '成品寬邊最大尺寸(mm)',
      byKey: 'partlistvalue.formData.FPCTab.FPCItems.FPCCableSize.FPCCableWidth',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '長邊邊料與併版所增加尺寸(mm)',
      byKey: 'partlistvalue.formData.FPCTab.FPCItems.FPCIncreaseSize.FPCCableIncreaseLength',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '寬邊邊料與併版所增加尺寸(mm)',
      byKey: 'partlistvalue.formData.FPCTab.FPCItems.FPCIncreaseSize.FPCCableIncreaseWidth',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '單位併版之成品產出數',
      byKey: 'partlistvalue.formData.FPCTab.FPCItems.FPCProductNumber',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '折彎(次)',
      byKey: 'partlistvalue.formData.FPCTab.FFCProcessingContent.FPCBendTimes',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '印刷(面)',
      byKey: 'partlistvalue.formData.FPCTab.FFCProcessingContent.FPCPrint',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '停止線(條)',
      byKey: 'partlistvalue.formData.FPCTab.FFCProcessingContent.FPCStopLine',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '導體',
      byKey: 'partlistvalue.formData.FPCTab.FPCMainMaterial.FPCConductorType',
      style: {
        color: null,
        format: null,
        border: {
          topBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    {
      label: 'Type Remark',
      byKey: 'partlistvalue.formData.FPCTab.FPCMainMaterial.FPCConductorTypeRemark',
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
      label: 'Shielding',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thick',
        },
      },
      contents: [
        {
          parentKey: 'Shielding',
          label: 'Type',
          groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
          byKey: 'FPCShieldingType',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: 'Shielding',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
          byKey: 'FPCShieldingQty',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: '補強板',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thick',
        },
      },
      contents: [
        {
          parentKey: '補強板',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
          byKey: 'FPCReinforcingPlateQty',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
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
          topBorderStyle: 'thick',
        },
      },
      contents: [
        {
          parentKey: 'Label',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
          byKey: 'FPCLabelQty',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
      ],
    },
    {
      label: '背膠',
      style: {
        color: null,
        border: {
          topBorderStyle: 'thick',
          bottomBorderStyle: 'thick',
        },
      },
      contents: [
        {
          parentKey: '背膠',
          label: 'L',
          groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
          byKey: 'FPCAdhesiveLength',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: '背膠',
          label: 'W',
          groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
          byKey: 'FPCAdhesivewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '背膠',
          label: 'QTY',
          groupIdPath: 'partlistvalue.formData.FPCTab.FPCAccessory',
          byKey: 'FPCAdhesiveQty',
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
      label: '備註',
      style: {
        color: null,
        border: {
          bottomBorderStyle: 'thick',
        },
      },
      byKey: 'partlistvalue.formData.FPCTab.FFCRemark.FPCRemarks',
      contents: [],
    },
  ],
  quotation: quotationSetting,
}

