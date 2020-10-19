module.exports = {
  cleansheet: [
    {
      label: 'A.材料費:',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.materialPrice.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.Screw.formingPrice.value',
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
      label: '冷鍛打頭_搓牙',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.threadingPrice.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '同心圓',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.circlePrice.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: 'C.二次加工費:',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.processingPrice.value',
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
      label: '耐落',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.resistantFallPrice.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '電鍍',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.platingTotalPrice.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: '熱處理',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.heatingPrice.value',
      style: {
        color: null,
        border: {
        },
      },
      contents: [],
    },
    {
      label: 'D.全檢包裝運輸:',
      byKey: 'partlistprice.forDebug.debugInfo.Screw.packingDeliverPrice.value',
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
      byKey: 'partlistprice.forDebug.debugInfo.Screw.managementPrice.value',
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
      label: 'Screw',
      contents: [
        {
          label: 'Material',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.materialspec',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '牙徑',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.toothDiameterName',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '頭徑(mm)',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.headDiameter',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '頭厚(mm)',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.headThickness',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '牙長(mm)',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.toothLength',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '光桿',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.mainMaterialSize.isPolishedRod',
          mapper: {
            true: 1,
            _default: 0,
          },
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '頸徑(mm)',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.mainMaterialSize.neckDiameter',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '頸長(mm)',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.mainMaterialSize.neckLength',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '同心圓(mm)',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.isConcentricCircle',
          mapper: {
            true: 1,
            _default: 0,
          },
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '耐落顏色',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.resistantFallColor',
          style: {
            color: null,
            format: null,
            border: {},
          },
          contents: [],
        },
        {
          label: '電鍍顏色',
          byKey: 'partlistvalue.formData.meothers-screw.Screw.plating',
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

