module.exports = {
  cleansheet: {
    material_cost: {
      label: 'A.材料費:',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.material_cost.value',
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
    forming_cost: {
      label: 'B.成型費:',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.forming_cost.value',
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
    painting_cost: {
      label: 'C.塗裝噴漆費:',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.painting_cost.value',
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
    secondary_processing_cost: {
      label: 'D.二次加工費(Total):',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.secondary_processing_cost.value',
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
    cmfPEmbedNail_cost: {
      label: '埋釘製程',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPEmbedNail_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPrinting_cost: {
      label: '印刷製程',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPrinting_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPCNCProcessingArea_cost: {
      label: '成品CNC製程(Area)',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPCNCProcessingArea_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPCNCFeeder_cost: {
      label: 'NC除料頭',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPCNCFeeder_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPProductPolishingPL_cost: {
      label: '成品打磨 (PL線)',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPProductPolishingPL_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPHotMelt_cost: {
      label: '熱熔',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPHotMelt_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPBonding_cost: {
      label: 'BONDING',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPBonding_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPEMISputtering_cost: {
      label: 'EMI Sputtering',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPEMISputtering_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPPolishStressMark_cost: {
      label: 'Polish (應力痕)',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPPolishStressMark_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPChipRemoval_cost: {
      label: '除屑 (IMR)',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPChipRemoval_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPRollingOrDeburring_cost: {
      label: '滾邊or去毛邊(PL面)',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPRollingOrDeburring_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPLaserMarking_cost: {
      label: '雷雕ICON',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPLaserMarking_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    cmfPNCVM_cost: {
      label: 'NCVM製程',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPNCVM_cost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    profit: {
      label: 'E.管銷&利潤:',
      byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.profit.value',
      style: {
        color: '0000FF',
        bold: true,
        border: {
          topBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    totalPrices: {
      label: 'F.成品總價:',
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
  },
  partlist: {
    type2: {
      label: '塑膠成型單/雙射',
      byKey: 'partlistvalue.Price.partItemInfo.type2',
      mapper: {
        Double_Injection: '雙射',
        _default: '單射',
      },
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpProcess: {
      label: 'Process',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpProcess',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpmaterialspec1: {
      label: 'Material Spec 材質 (一射)	',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpmaterialspec1',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    materialspecRemark: {
      label: 'Material Spec 一射 (原料材質) Remark',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpMaterialspec1Remark',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpmaterial: {
      label: 'Material 牌號 (一射)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpmaterial',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    materialRemark: {
      label: 'Material 一射 (牌號) Remark',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpMaterial1Remark',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpmaterialspec2: {
      label: 'Material Spec 材質 (二射)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpmaterialspec2',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpmaterial2: {
      label: 'Material 牌號 (二射)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpmaterial2',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    material2Remark: {
      label: 'Material 二射 (牌號) Remark',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpMaterial2Remark',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpMaterialColor: {
      label: 'Material Color',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpMaterialColor',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hppartssizewidth: {
      label: 'L (mm)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hppartssizespec.hppartssizewidth',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hppartssizelength: {
      label: 'W (mm)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hppartssizespec.hppartssizelength',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hppartssizehigh: {
      label: 'H (mm)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hppartssizespec.hppartssizehigh',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpthickness: {
      label: 'Thickness (mm)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hpthickness',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hppartweightone: {
      label: '一射 *Weight (g)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hppartweightone',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hppartweighttwo: {
      label: '二射 *Weight (g)',
      byKey: 'partlistvalue.formData.toolingPartList.hpUser.hppartweighttwo',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpToolingPartsWeightSpec1: {
      label: '一射 料頭重(g)',
      byKey: 'partlistvalue.formData.toolingPartList.hpTooling.hpToolingPartsWeightSpec1',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpToolingPartsWeightSpec2: {
      label: '二射 料頭重(g)',
      byKey: 'partlistvalue.formData.toolingPartList.hpTooling.hpToolingPartsWeightSpec2',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpToolingMachineTon: {
      label: '機台噸數(Ton)',
      byKey: 'partlistvalue.formData.toolingPartList.hpTooling.hpToolingMachineTon',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpToolingHole: {
      label: '模具穴數',
      byKey: 'partlistvalue.formData.toolingPartList.hpTooling.hpToolingHole',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpToolingCT: {
      label: 'Cycle Time(Sec)',
      byKey: 'partlistvalue.formData.toolingPartList.hpTooling.hpToolingCT',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    hpToolingRemark: {
      label: '備註',
      byKey: 'partlistvalue.formData.toolingPartList.hpTooling.hpToolingRemark',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    empty: {
      label: '',
      byKey: '',
      style: {
        color: null,
        format: null,
        border: {
          topBorderStyle: 'thick',
          bottomBorderStyle: 'thick',
          rightBorderStyle: 'thin',
        },
      },
      contents: [],
    },
    cmfPPainting: {
      label: 'Process Type-噴塗製程 & NCVM',
      style: {
        border: {
          topBorderStyle: 'thin',
          bottomBorderStyle: 'thin',
        },
      },
      contents: [
        {
          label: '噴漆類型 TYPE',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPaintingType',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          contents: [],
        },
        {
          label: '底漆 Coating數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPrimerQTY',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '面漆 Coating數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPTopcoatQTY',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Color 色系',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPaintingColor',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '塗料廠商',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPaintingVendor',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆膜厚上限值(um)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴塗面-長 (L/mm)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴塗面-寬 (W/mm)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴塗面-高 (H/mm)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingHeight',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆面 頂面數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingAreaLW',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆面 長側面',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingAreaLH',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆面 短側面數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingAreaWH',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '機台類型',
          byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPaintingMachineType.value',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    cmfPPaintingDT: {
      label: 'Process Type-噴塗製程 & NCVM',
      style: {
        border: {
          topBorderStyle: 'thin',
          bottomBorderStyle: 'thin',
        },
      },
      contents: [
        {
          label: '噴漆類型 TYPE',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPaintingType',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          contents: [],
        },
        {
          label: '底漆 Coating數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPrimerQTY',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '面漆 Coating數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPTopcoatQTY',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Color 色系',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPaintingColor',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '塗料廠商',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPPaintingVendor',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆膜厚(um)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingThickness',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴塗面-長 (L/mm)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingLength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴塗面-寬 (W/mm)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingWidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴塗面-高 (H/mm)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingHeight',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆面 頂面數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingAreaLW',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆面 長側面',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingAreaLH',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '噴漆面 短側面數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPainting.cmfPaintingAreaWH',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '機台類型',
          byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPaintingMachineType.value',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    cmfPEmbedNail: {
      label: '埋釘製程',
      style: {
        border: {
          topBorderStyle: 'thin',
          bottomBorderStyle: 'thin',
        },
      },
      contents: [
        {
          label: '數量',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPEmbedNail.cmfPEmbedNailCount',
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
    cmfPrinting: {
      label: '印刷製程',
      style: {
        border: {
          topBorderStyle: 'thin',
          bottomBorderStyle: 'thin',
        },
      },
      contents: [
        {
          label: '類型 (Type)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPrinting.cmfPPrintingType',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          contents: [],
        },
        {
          label: '數量(特徵)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPrinting.cmfPPrintingCount',
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
    cmfPCNCArea: {
      label: '成品CNC製程',
      style: {
        border: {
          topBorderStyle: 'thin',
          bottomBorderStyle: 'thin',
        },
      },
      contents: [
        {
          label: '局部加工 (TYPE)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPCNCArea.cmfPCNCProcessingAreaType',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          contents: [],
        },
        {
          label: '數量',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPCNCArea.cmfPCNCProcessingAreaCount',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '次數',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPCNCFeeder.cmfPCNCFeederCount',
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
    secondaryProcessing: {
      label: '二次加工製程',
      style: {
        border: {
          topBorderStyle: 'thin',
        },
      },
      contents: [
        {
          label: '成品打磨 (PL線)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPProductPolishingPL.cmfPProductPolishingPLContent',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
              bottomBorderStyle: 'thin',
            },
          },
          contents: [],
        },
        {
          label: '熱熔 (數量)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPHotMelt.cmfPHotMeltCount',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'BONDING (件數)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPBonding.cmfPBondingCount',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'EMI Sputtering',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPEMISputtering.cmfPEMISputtering',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Polish 應力痕',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPPolishStressMark.cmfPPolishStressMarkExist',
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
          label: '除屑 (IMR)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPChipRemoval.cmfPChipRemovalExist',
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
          label: '滾邊or去毛邊 (PL面)',
          byKey: 'partlistvalue.formData.CMFProcessList.cmfPRollingOrDeburring.cmfPRollingOrDeburringExist',
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
          label: '雷雕ICON (特徵數量)',
          byKey: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPLaserMarkingCount.value',
          style: {
            color: null,
            border: {
              topBorderStyle: 'thin',
            },
          },
          contents: [],
        },
      ],
    },
  },
}

