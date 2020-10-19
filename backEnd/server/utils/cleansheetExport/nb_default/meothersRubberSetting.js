module.exports = {
  cleansheet: [
    {
      label: 'A.材料費:',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.materialCost.value',
      style: {
        color: '0000FF',
        bold: true,
        border: {
          bottomBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    {
      label: 'B.成型費:',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.formingCost.value',
      style: {
        color: '0000FF',
        bold: true,
        border: {
          bottomBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    {
      label: 'C.二次加工費:',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.secondaryProcessingCost.value',
      style: {
        color: '0000FF',
        bold: true,
        border: {
          bottomBorderStyle: 'thick',
        },
      },
      contents: [],
    },
    {
      label: '成品沖型',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.stampingTypeCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '貼背膠',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.adhesiveCost.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '外觀印刷',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.printingCost.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '刷膠製程',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.brushingCost.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '去毛邊/排廢',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.debrisCleaningCost.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: 'D.管銷&利潤:',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.managementCost.value',
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
      label: 'Material Spec',
      byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.materialspec',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Material Spec Remark',
      byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.materialSpecRemark',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Material',
      byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.material',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Material Remark',
      byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.materialRemark',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'L (mm) 成品長度',
      byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.materialSize.partssizelength',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'W (mm) 成品寬度',
      byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.materialSize.partssizewidth',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'H (mm) 成品高度',
      byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.materialSize.partssizehigh',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '成品沖型',
      byKey: 'partlistvalue.Price.rubber.rubberStampingTypeName',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '貼背膠',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.rubberAdhesiveTypeName.value',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '外觀印刷',
      contents: [
        {
          label: 'TYPE',
          byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.rubberPrintingType.rubberPrintingName',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '(幾道)',
          byKey: 'partlistvalue.formData.rubberPartlistTab.rubberPartItemInfo.rubberPrintingType.rubberPrintingAmount',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: '背膠類型',
      contents: [
        {
          label: '厚度T(mm)',
          byKey: 'partlistvalue.Price.rubber.rubberAdhesiveThickness',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '背膠型號',
          byKey: 'partlistvalue.Price.rubber.rubberAdhesiveMaterial',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: 'Cycle Time (Sec)',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.rubberCycleTime.value',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'Machine/T',
      byKey: 'partlistprice.forDebug.debugInfo.rubber.rubberMachineTon.value',
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
      label: '備註',
      byKey: 'partlistvalue.Price.rubber.rubberRemark',
      style: {
        color: null,
        format: null,
        border: {},
      },
      contents: [],
    },
  ],
}

