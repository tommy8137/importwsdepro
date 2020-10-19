module.exports = {
  cleansheet: [
    {
      label: 'A.主要材料費:',
      byKey: 'partlistprice.prices.dieCut.A_mainMaterialCostTotal',
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
      label: '主料1',
      byKey: 'partlistprice.prices.dieCut.A-1_materialCostTotal',
      style: {
      },
      contents: [],
    },
    {
      label: '主料2',
      byKey: 'partlistprice.prices.dieCut.A-2_minorMaterialCostTotal',
      style: {
      },
      contents: [],
    },
    {
      label: '離型紙',
      byKey: 'partlistprice.prices.dieCut.A-3_releasePaperTypeCost',
      style: {
      },
      contents: [],
    },
    {
      label: 'B.配件材料費:',
      byKey: 'partlistprice.prices.dieCut.B_subMaterialCostTotal',
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
      label: '輔料',
      parent: 'partlistprice.forDebug.debugInfo.subMaterialCost',
      groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
      byKey: 'total.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: 'C.沖切加工費:',
      byKey: 'partlistprice.prices.dieCut.C_stampingCostTotal',
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
      label: 'D.印刷費:',
      byKey: 'partlistprice.prices.dieCut.D_printingCost',
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
      label: '單色印刷單價',
      byKey: 'partlistprice.forDebug.debugInfo.dieCut.printingPrice.value',
      style: {
      },
      contents: [],
    },
    {
      label: 'E.二次加工費:',
      byKey: 'partlistprice.prices.dieCut.E_secondaryProcessingCost',
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
      label: '手工貼合/轉貼',
      byKey: 'partlistprice.prices.dieCut.E-1_stickingCost',
      style: {
      },
      contents: [],
    },
    {
      label: '除屑清理/ 排廢料',
      byKey: 'partlistprice.prices.dieCut.E-2_debrisCleaningCost',
      style: {
      },
      contents: [],
    },
    {
      label: 'F. 管銷&利潤:',
      byKey: 'partlistprice.prices.dieCut.F_managementCost',
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
      label: 'G. 成品總價:',
      byKey: 'partlistprice.prices.dieCut.total',
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
      label: '除屑清理/ 排廢料',
      byKey: 'partlistvalue.formData.dieCutTab.DieCutPartItemInfo.debrisCleaning',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '離型紙/膜種類',
      byKey: 'partlistvalue.formData.dieCutTab.DieCutPartItemInfo.releasePaperType',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '印刷次數',
      byKey: 'partlistvalue.formData.dieCutTab.DieCutPartItemInfo.printingCount',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },
    {
      label: '沖切次數',
      byKey: 'partlistprice.forDebug.debugInfo.dieCut.stampingTimes.value',
      style: {
        color: null,
        border: {},
      },
      contents: [],
    },

    {
      label: '',
      contents: [
        {
          label: 'Parts Category II',
          byKey: 'partlistprice.forDebug.debugInfo.materialCost.type2.value',
          style: {
            color: null,
            border: {
            },
            fill: 'cccccc',
          },
          contents: [],
        },
        {
          label: 'Material Spec.',
          byKey: 'partlistprice.forDebug.debugInfo.materialCost.materialspec.value',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Material Spec Remark',
          byKey: 'partlistvalue.Price.dieCut.materialCost.materialspecRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Material',
          byKey: 'partlistprice.forDebug.debugInfo.materialCost.material.value',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'Material Remark',
          byKey: 'partlistvalue.Price.dieCut.materialCost.materialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'L (mm)',
          byKey: 'partlistvalue.formData.dieCutTab.MainMaterial.mainMaterialSize.partssizelength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'W (mm)',
          byKey: 'partlistvalue.formData.dieCutTab.MainMaterial.mainMaterialSize.partssizewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          label: 'H (mm)',
          byKey: 'partlistvalue.formData.dieCutTab.MainMaterial.mainMaterialSize.partssizehigh',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        // {
        //   label: '印刷次數',
        //   byKey: 'partlistvalue.formData.dieCutTab.DieCutPartItemInfo.printingCount',
        //   style: {
        //     color: null,
        //     border: {
        //       bottomBorderStyle: 'thick',
        //     },
        //   },
        //   contents: [],
        // },
      ],
    },

    {
      label: '',
      contents: [
        {
          parentKey: '主料 2',
          label: 'Parts Category II',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'minorType2',
          style: {
            color: null,
            border: {},
            fill: 'cccccc',
          },
          contents: [],
        },
        {
          parentKey: '主料 2',
          label: 'Material Spec.',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'minorMaterialspec',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '主料 2',
          label: 'Material',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'minorMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '主料 2',
          label: 'L (mm)',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'materialSizeCompisite.minorPartssizelength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '主料 2',
          label: 'W (mm)',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'materialSizeCompisite.minorPartssizewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '主料 2',
          label: 'H (mm)',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'materialSizeCompisite.minorPartssizehigh',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '主料 2',
          label: 'Material Spec Remark',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'minorMaterialspecRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '主料 2',
          label: 'Material Remark',
          groupIdPath: 'partlistvalue.formData.dieCutTab.minorMaterialCost',
          byKey: 'minorMaterialRemark',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
      ],
    },
    {
      label: '',
      contents: [
        {
          parentKey: '輔料',
          label: 'Parts Category II',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'subType2',
          style: {
            color: null,
            border: {},
            fill: 'cccccc',
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: 'Material Spec.',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'subMaterialspec',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: 'Material',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'subMaterial',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: 'L (mm)',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'materialSize.subPartssizelength',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: 'W (mm)',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'materialSize.subPartssizewidth',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: 'H (mm)',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'materialSize.subPartssizehigh',
          style: {
            color: null,
            border: {},
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: '數量',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'assyCount',
          style: {
            color: null,
            border: {
              bottomBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: '備註',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'subMaterialRemark',
          style: {
            color: null,
            border: {
              bottomBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: 'Material Spec Remark',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'subMaterialspecRemark',
          style: {
            color: null,
            border: {
              bottomBorderStyle: 'thick',
            },
          },
          contents: [],
        },
        {
          parentKey: '輔料',
          label: 'Material Remark',
          groupIdPath: 'partlistvalue.formData.dieCutTab.usingSubMaterial',
          byKey: 'subMaterialOtherFillMeRemark',
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
}

