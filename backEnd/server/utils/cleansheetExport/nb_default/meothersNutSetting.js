module.exports = {
  cleansheet: [
    {
      label: 'A.材料費:',
      byKey: 'partlistprice.forDebug.debugInfo.nut.materialCost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.nut.tappingCost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.nut.tappingCost.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: 'C.二次加工費:',
      byKey: 'partlistprice.forDebug.debugInfo.nut.processingCost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.nut.platingProcessingCost.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '熱處理',
      byKey: 'partlistprice.forDebug.debugInfo.nut.heatTreamentCost.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: 'D.全檢包裝運輸:',
      byKey: 'partlistprice.forDebug.debugInfo.nut.packageCost.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.nut.managementCost.value',
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
      label: 'Nut',
      contents: [
        {
          label: 'Type',
          byKey: 'partlistvalue.formData.nutPartlistTab.nutPartItemInfo.nutType',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Material',
          byKey: 'partlistprice.forDebug.debugInfo.nut.materialspec.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Material Remark',
          byKey: 'partlistvalue.formData.nutPartlistTab.nutPartItemInfo.materialSpecRemark',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '牙徑',
          byKey: 'partlistvalue.formData.nutPartlistTab.nutPartItemInfo.partssizemName',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'D1外徑(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.nut.d1OutterDiameter.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'D1高(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.nut.d1Height.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'D2直徑(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.nut.d2Diameter.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'D2高(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.nut.d2Height.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'OD內徑(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.nut.innerDiameter.value',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'OD內徑高(mm)',
          byKey: 'partlistprice.forDebug.debugInfo.nut.innerDiameterHeight.value',
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

