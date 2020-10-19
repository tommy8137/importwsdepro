module.exports = {
  cleansheet: [
    {
      label: 'A.材料費:',
      byKey: 'partlistprice.forDebug.debugInfo.standoff.materialCost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.standoff.formingCost.value',
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
      label: '攻牙',
      byKey: 'partlistprice.forDebug.debugInfo.standoff.tapping_cost.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: 'C.二次加工費:',
      byKey: 'partlistprice.forDebug.debugInfo.standoff.secondaryProcessingCost.value',
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
      label: '電鍍',
      byKey: 'partlistprice.forDebug.debugInfo.standoff.electroplating.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '熱處理',
      byKey: 'partlistprice.forDebug.debugInfo.standoff.heat_treatments.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: 'D.全檢包裝運輸:',
      byKey: 'partlistprice.forDebug.debugInfo.standoff.packageCost.value',
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
      label: 'E.管銷&利潤:',
      byKey: 'partlistprice.forDebug.debugInfo.standoff.managementCost.value',
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
  ],
  partlist: [
    {
      label: 'Standoff',
      contents: [
        {
          label: 'Material',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.material',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Material Remark',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.materialSpecRemark',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '牙徑',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.partssizemName',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '凸台外徑(mm)',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.bossOuterDiameter',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '凸台外徑高(mm)',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.bossOuterDiameterHeight',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '外徑(mm)',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.outerDiameter',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '外徑高(mm)',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.outerDiameterHeight',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Pin外徑(mm)',
          byKey: 'partlistvalue.formData.standoffTab.standOffParts.pinOuterDiameter',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Pin外徑高(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.standoff.pinOuterDiameterHeight.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '內徑(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.standoff.innerDiameter.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '內徑高(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.standoff.innerDiameterHeight.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
  ],
}

