/* eslint-disable quote-props */
/* eslint-disable quotes */

const data = {
  "version": 2,
  "showMenu": false,
  "layout": [
    {
      "key": "dieCutTab",
      "label": "dieCutTab",
      "group": [
        "dieCut"
      ],
      "items": [
        {
          "key": "DieCutPartItemInfo",
          "label": "我不應該被顯示出來",
          "visiable": false,
          "multiple": false,
          "items": [
            {
              "key": "partname",
              "label": "Part Name",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "displayConfig": {
                "grids": 2,
                "display": true
              },
              "require": false,
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "partnumber",
              "label": "Part Number",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "require": false,
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true
            }
          ],
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "MainMaterial",
          "label": "主要材料",
          "group": [
            "materialCost"
          ],
          "multiple": false,
          "items": [
            {
              "key": "type2",
              "label": "Part Category II",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "require": false,
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "materialspec",
              "label": "Material Spec.",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "require": false,
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "material",
              "label": "Material",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "require": false,
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "materialPerCost",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "material",
                "materialspec"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.05Mylar",
                    "material": "透明",
                    "materialPerCost": 0.638235294
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.05Mylar",
                    "material": "CY28_PET",
                    "materialPerCost": 0.511764706
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.05Mylar",
                    "material": "黑色",
                    "materialPerCost": 0.794117647
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.05Mylar",
                    "material": "PC1860",
                    "materialPerCost": 1.161764706
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.05Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.075Mylar",
                    "material": "PC1860",
                    "materialPerCost": 1.25
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.075Mylar",
                    "material": "DFR117",
                    "materialPerCost": 2.5
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.075Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "PET6027D",
                    "materialPerCost": 0.576470588
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "PET6023D",
                    "materialPerCost": 0.716176471
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "透明",
                    "materialPerCost": 0.992647059
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "CY28_PET",
                    "materialPerCost": 0.970588235
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "黑色",
                    "materialPerCost": 0.992647059
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "PC1860",
                    "materialPerCost": 1.617647059
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "DFR117",
                    "materialPerCost": 1.811764706
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.1Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.125Mylar",
                    "material": "DFR_BK_PP",
                    "materialPerCost": 1.145588235
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.125Mylar",
                    "material": "DFR117",
                    "materialPerCost": 1.976470588
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.125Mylar",
                    "material": "PC1860",
                    "materialPerCost": 1.498529412
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.125Mylar",
                    "material": "DFR116ECOB",
                    "materialPerCost": 1.941176471
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.125Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.175Mylar",
                    "material": "DFR_BK_PP",
                    "materialPerCost": 1.492647059
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.175Mylar",
                    "material": "DFR117",
                    "materialPerCost": 2.172058824
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.175Mylar",
                    "material": "DFR116ECOB",
                    "materialPerCost": 2.426470588
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.175Mylar",
                    "material": "透明PC",
                    "materialPerCost": 2.220588235
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.175Mylar",
                    "material": "PC1860",
                    "materialPerCost": 2.1
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.175Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.188Mylar",
                    "material": "PET6027D",
                    "materialPerCost": 1.083823529
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.188Mylar",
                    "material": "PET6023D",
                    "materialPerCost": 1.397058824
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.188Mylar",
                    "material": "CY28_PET",
                    "materialPerCost": 1.852941176
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.188Mylar",
                    "material": "黑色",
                    "materialPerCost": 1.911764706
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.188Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "DFR_BK_PP",
                    "materialPerCost": 1.745588235
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "CY28_PET",
                    "materialPerCost": 2.191176471
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "DFR117",
                    "materialPerCost": 2.205882353
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "PC1860",
                    "materialPerCost": 2.933823529
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "DFR116ECOB",
                    "materialPerCost": 3.882352941
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "黑色",
                    "materialPerCost": 3.191176471
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "PC8010",
                    "materialPerCost": 4.411764706
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "透明PC",
                    "materialPerCost": 2.886764706
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.25Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.38Mylar",
                    "material": "DFR117",
                    "materialPerCost": 2.647058824
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.38Mylar",
                    "material": "DF8D35T",
                    "materialPerCost": 3.176470588
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.38Mylar",
                    "material": "PC1860",
                    "materialPerCost": 3.316176471
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.38Mylar",
                    "material": "透明PC",
                    "materialPerCost": 4.330882353
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.38Mylar",
                    "material": "PC8010",
                    "materialPerCost": 5.588235294
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.38Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.43Mylar",
                    "material": "DFR_BK_PP",
                    "materialPerCost": 2.873529412
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.43Mylar",
                    "material": "PC1860",
                    "materialPerCost": 4.117647059
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.43Mylar",
                    "material": "DFR117",
                    "materialPerCost": 4.138235294
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.43Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.5Mylar",
                    "material": "PC8010",
                    "materialPerCost": 5.882352941
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.5Mylar",
                    "material": "透明PC",
                    "materialPerCost": 5.626470588
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.5Mylar",
                    "material": "PC1860",
                    "materialPerCost": 6.617647059
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.5Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.76Mylar",
                    "material": "DFR_BK_PP",
                    "materialPerCost": 5.373529412
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.76Mylar",
                    "material": "PC1860",
                    "materialPerCost": 9.079411765
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.76Mylar",
                    "material": "DFR117",
                    "materialPerCost": 8.152941176
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.76Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.8Mylar",
                    "material": "PC8010",
                    "materialPerCost": 7.352941176
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.8Mylar",
                    "material": "透明PC",
                    "materialPerCost": 9.222058824
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T0.8Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": 0
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T1.0Mylar",
                    "material": "PC8010",
                    "materialPerCost": 8.235294118
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T1.0Mylar",
                    "material": "透明PC",
                    "materialPerCost": 11.68088235
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T1.0Mylar",
                    "material": "PC1860",
                    "materialPerCost": 12.94117647
                  },
                  {
                    "type2": "Mylar",
                    "materialspec": "T1.0Mylar",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.2Sponge",
                    "material": "KVH200",
                    "materialPerCost": 8.970588235
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.2Sponge",
                    "material": "PORON_SRS32P",
                    "materialPerCost": 27.35294118
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.2Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.3Sponge",
                    "material": "KVH200",
                    "materialPerCost": 7.352941176
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.3Sponge",
                    "material": "PORON_SRS48P",
                    "materialPerCost": 11.76470588
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.3Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.4Sponge",
                    "material": "KVH200",
                    "materialPerCost": 6.764705882
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.4Sponge",
                    "material": "PORON_SRS40P",
                    "materialPerCost": 13.23529412
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.4Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "CR1015",
                    "materialPerCost": 0.882352941
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "EVA",
                    "materialPerCost": 1.029411765
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "E4308",
                    "materialPerCost": 2.058823529
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "YU55",
                    "materialPerCost": 4.044117647
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "YU356",
                    "materialPerCost": 0.772058824
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "E4382",
                    "materialPerCost": 4.411764706
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "SM55",
                    "materialPerCost": 3.088235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "KVH200",
                    "materialPerCost": 6.029411765
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "LV100",
                    "materialPerCost": 7.794117647
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "PORON_SRS40P",
                    "materialPerCost": 13.23529412
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "PORON_SRS32P",
                    "materialPerCost": 15.88235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 10.95294118
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.5Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.6Sponge",
                    "material": "PORON_SRS32P",
                    "materialPerCost": 16.17647059
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.6Sponge",
                    "material": "PORON_SRS40P",
                    "materialPerCost": 18.60294118
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.6Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.7Sponge",
                    "material": "YU356",
                    "materialPerCost": 3.823529412
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.7Sponge",
                    "material": "KVH200",
                    "materialPerCost": 5.147058824
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.7Sponge",
                    "material": "LV100",
                    "materialPerCost": 7.058823529
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.7Sponge",
                    "material": "PORON_SRS40P",
                    "materialPerCost": 15.04411765
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.7Sponge",
                    "material": "PORON_SRS24P",
                    "materialPerCost": 16.02941176
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.7Sponge",
                    "material": "PORON_SRS32P",
                    "materialPerCost": 16.98529412
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.7Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.8Sponge",
                    "material": "CR1015",
                    "materialPerCost": 1.029411765
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.8Sponge",
                    "material": "KVH200",
                    "materialPerCost": 4.852941176
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.8Sponge",
                    "material": "SM55",
                    "materialPerCost": 3.088235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.8Sponge",
                    "material": "PORON_SRS24P",
                    "materialPerCost": 18.45588235
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.8Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.9Sponge",
                    "material": "PORON_SRS24P",
                    "materialPerCost": 19.63235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T0.9Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "EVA",
                    "materialPerCost": 0.772058824
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "CR1015",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "E4308",
                    "materialPerCost": 2.058823529
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "YU55",
                    "materialPerCost": 4.044117647
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "KVH200",
                    "materialPerCost": 4.411764706
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "YU356",
                    "materialPerCost": 0.772058824
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "E4382",
                    "materialPerCost": 4.411764706
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "SM55",
                    "materialPerCost": 2.254411765
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "PMP1800",
                    "materialPerCost": 5.294117647
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "LV100",
                    "materialPerCost": 6.323529412
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "CR2030",
                    "materialPerCost": 6.825
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "PORON_SRS40P",
                    "materialPerCost": 14.70588235
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 10.33529412
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "PORON_SRS24P",
                    "materialPerCost": 19.41176471
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "PORON_SRS32P",
                    "materialPerCost": 20.38235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.0Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "CR1015",
                    "materialPerCost": 2.205882353
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "E4308",
                    "materialPerCost": 3.088235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "YU356",
                    "materialPerCost": 1.158823529
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "KVH200",
                    "materialPerCost": 5
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "PMP1800",
                    "materialPerCost": 5.882352941
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "SM55",
                    "materialPerCost": 3.088235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "E4382",
                    "materialPerCost": 6.617647059
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 13.60294118
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "PORON_SRS32P",
                    "materialPerCost": 16.17647059
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "PORON_SRS24P",
                    "materialPerCost": 19.26470588
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T1.5Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "CR1015",
                    "materialPerCost": 2.352941176
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "YU356",
                    "materialPerCost": 1.544117647
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "SM55",
                    "materialPerCost": 3.088235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "KVH200",
                    "materialPerCost": 5.441176471
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "PMP1800",
                    "materialPerCost": 5.882352941
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 13.97058824
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "PORON_SRS32P",
                    "materialPerCost": 19.11764706
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "PORON_SRS24P",
                    "materialPerCost": 25.55588235
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.0Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "CR1015",
                    "materialPerCost": 3.529411765
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "E4308",
                    "materialPerCost": 5.147058824
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "SM55",
                    "materialPerCost": 3.705882353
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "PMP1800",
                    "materialPerCost": 7.058823529
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "KVH200",
                    "materialPerCost": 7.794117647
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "E4382",
                    "materialPerCost": 11.02941176
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 16.17647059
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T2.5Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "CR1015",
                    "materialPerCost": 3.529411765
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "SM55",
                    "materialPerCost": 4.264705882
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "YU356",
                    "materialPerCost": 2.316176471
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "PMP1800",
                    "materialPerCost": 7.352941176
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "KVH200",
                    "materialPerCost": 9.705882353
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 14.70588235
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "PORON_SRS24P",
                    "materialPerCost": 22.05882353
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.0Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.5Sponge",
                    "material": "E4308",
                    "materialPerCost": 7.205882353
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.5Sponge",
                    "material": "SM55",
                    "materialPerCost": 5.352941176
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.5Sponge",
                    "material": "E4382",
                    "materialPerCost": 15.44117647
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T3.5Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.0Sponge",
                    "material": "CR1015",
                    "materialPerCost": 4.705882353
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.0Sponge",
                    "material": "SM55",
                    "materialPerCost": 5.147058824
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.0Sponge",
                    "material": "KVH200",
                    "materialPerCost": 11.91176471
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.0Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 22.5
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.0Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.5Sponge",
                    "material": "EVA",
                    "materialPerCost": 3.475
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.5Sponge",
                    "material": "SM55",
                    "materialPerCost": 5.588235294
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.5Sponge",
                    "material": "E4308",
                    "materialPerCost": 9.264705882
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.5Sponge",
                    "material": "YU55",
                    "materialPerCost": 11.61764706
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.5Sponge",
                    "material": "E4382",
                    "materialPerCost": 19.85294118
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T4.5Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T5.0Sponge",
                    "material": "CR1015",
                    "materialPerCost": 5.882352941
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T5.0Sponge",
                    "material": "SM55",
                    "materialPerCost": 6.617647059
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T5.0Sponge",
                    "material": "KVH200",
                    "materialPerCost": 16.17647059
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T5.0Sponge",
                    "material": "PORON_ML32",
                    "materialPerCost": 22.23529412
                  },
                  {
                    "type2": "Sponge",
                    "materialspec": "T5.0Sponge",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "FZ_015E保護膜_8515B",
                    "materialPerCost": 0.389117647
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "PE_T_58保護膜",
                    "materialPerCost": 0.389117647
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "SJ_450P保護膜",
                    "materialPerCost": 0.389117647
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "PE_W150保護膜",
                    "materialPerCost": 0.389117647
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "TR-5001-LP",
                    "materialPerCost": 1.058823529
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "TR-5001-MP",
                    "materialPerCost": 1.094117647
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "TR-5001-HP",
                    "materialPerCost": 1.235294118
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.05Protection",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.06Protection",
                    "material": "RH7027",
                    "materialPerCost": 0.648529412
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.06Protection",
                    "material": "PET_E_006",
                    "materialPerCost": 0.782352941
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.06Protection",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.075Protection",
                    "material": "QLD-G1208P-60A",
                    "materialPerCost": 2.470588235
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.075Protection",
                    "material": "TR-7501-H2P",
                    "materialPerCost": 1.5
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.075Protection",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "TR_1001_H_20_30G",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "TR_1001_L_6_12G",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "TR_1001_LL_3_6G",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "TR_1001_LLL_1_3G",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "TR_1001_LP_6_12G",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "TR_1001_M 12_20G",
                    "materialPerCost": 1.323529412
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "TR_1001_MP",
                    "materialPerCost": 1.323529412
                  },
                  {
                    "type2": "Protection Film",
                    "materialspec": "T0.1Protection",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "DST_5",
                    "materialPerCost": 1.5
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "DS_5",
                    "materialPerCost": 1.029411765
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "皇冠7972G",
                    "materialPerCost": 1.544117647
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "PW_05",
                    "materialPerCost": 2.085294118
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "JA305",
                    "materialPerCost": 2.102941176
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "JP005B",
                    "materialPerCost": 2.007352941
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "NITTO_GA835_上海產",
                    "materialPerCost": 3.211764706
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "NITTO_GA835_日本產",
                    "materialPerCost": 4.264705882
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "3M_467MP",
                    "materialPerCost": 4.694117647
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "3M_55256",
                    "materialPerCost": 4.2
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "TESA_68842",
                    "materialPerCost": 4.852941176
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "TESA_68742",
                    "materialPerCost": 4.852941176
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "SONY_NP203",
                    "materialPerCost": 5.147058824
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "TESA_4972",
                    "materialPerCost": 5.441176471
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "TESA_51972",
                    "materialPerCost": 6.691176471
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "NITTO_56605B",
                    "materialPerCost": 6.764705882
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "3M_9460PC",
                    "materialPerCost": 7.058823529
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "3M_9671LE",
                    "materialPerCost": 7.794117647
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "3M_8228B",
                    "materialPerCost": 8.529411765
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "3M_9626",
                    "materialPerCost": 11.76470588
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "TT219導電背膠",
                    "materialPerCost": 3.676470588
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "JC205導電背膠",
                    "materialPerCost": 2.75
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.05Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.07Adhesive",
                    "material": "DSTT_7N",
                    "materialPerCost": 3.382352941
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.07Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.1Adhesive",
                    "material": "DS_10B",
                    "materialPerCost": 1.911764706
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.1Adhesive",
                    "material": "DST_10",
                    "materialPerCost": 1.875
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.1Adhesive",
                    "material": "PW_10",
                    "materialPerCost": 2.779411765
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.1Adhesive",
                    "material": "3M_468MP",
                    "materialPerCost": 6.392647059
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.1Adhesive",
                    "material": "TESA_4982",
                    "materialPerCost": 9.542647059
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.1Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.13Adhesive",
                    "material": "DSTT_13N",
                    "materialPerCost": 3.705882353
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.13Adhesive",
                    "material": "3M_468C",
                    "materialPerCost": 7.983823529
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.13Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "DS_15",
                    "materialPerCost": 1.852941176
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "DS_15B",
                    "materialPerCost": 2.647058824
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "SONY_G4000",
                    "materialPerCost": 4.117647059
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "3M_9888T",
                    "materialPerCost": 4.941176471
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "SONY_G9000",
                    "materialPerCost": 4.411764706
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "3M_9080HL",
                    "materialPerCost": 4.558823529
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "NITTO_5000NS",
                    "materialPerCost": 5.294117647
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "3M_9448AB",
                    "materialPerCost": 5.25
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "SONY_G9900",
                    "materialPerCost": 5.588235294
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "G9500R",
                    "materialPerCost": 6.439705882
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "NITTO_5000NSLV",
                    "materialPerCost": 6.617647059
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "NITTO_5000NCB",
                    "materialPerCost": 7.926470588
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "NT5000NSLV",
                    "materialPerCost": 7.861764706
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "3M_4914VHB",
                    "materialPerCost": 63.23529412
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.15Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.2Adhesive",
                    "material": "DS_20",
                    "materialPerCost": 3.676470588
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.2Adhesive",
                    "material": "TESA_68644",
                    "materialPerCost": 5.105882353
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.2Adhesive",
                    "material": "TESA_61365",
                    "materialPerCost": 12.5
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.2Adhesive",
                    "material": "TESA_61395",
                    "materialPerCost": 17.93235294
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.2Adhesive",
                    "material": "TESA_62624",
                    "materialPerCost": 26.06323529
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.2Adhesive",
                    "material": "3M_WT_20",
                    "materialPerCost": 43.97058824
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.2Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.25Adhesive",
                    "material": "SLR1125",
                    "materialPerCost": 33.82352941
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.25Adhesive",
                    "material": "TESA_62645",
                    "materialPerCost": 26.72058824
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.25Adhesive",
                    "material": "3M_4914VHB",
                    "materialPerCost": 38.67647059
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.25Adhesive",
                    "material": "3M_SR5625",
                    "materialPerCost": 50.95588235
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.25Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.3Adhesive",
                    "material": "NITTO_GA6330",
                    "materialPerCost": 14.82352941
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.3Adhesive",
                    "material": "SONY_UT1430",
                    "materialPerCost": 19.48529412
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.3Adhesive",
                    "material": "TESA_61315",
                    "materialPerCost": 19.63235294
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.3Adhesive",
                    "material": "TESA_62626",
                    "materialPerCost": 20.86764706
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.3Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.4Adhesive",
                    "material": "NITTO_DY_040N",
                    "materialPerCost": 23.89705882
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.4Adhesive",
                    "material": "3M_BD041VHB",
                    "materialPerCost": 26.32352941
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.4Adhesive",
                    "material": "3M_4920VHB",
                    "materialPerCost": 31.32352941
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.4Adhesive",
                    "material": "DIC_8404B",
                    "materialPerCost": 36.39705882
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.4Adhesive",
                    "material": "3M_5915VHB",
                    "materialPerCost": 39.41176471
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.4Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.64Adhesive",
                    "material": "3M_5925VHB替代料_科捷龍_KJ6064B",
                    "materialPerCost": 14.70588235
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.64Adhesive",
                    "material": "NITTO_DY064N",
                    "materialPerCost": 26.72941176
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.64Adhesive",
                    "material": "3M_5925VHB",
                    "materialPerCost": 26.76470588
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.64Adhesive",
                    "material": "3M_BD065VHB",
                    "materialPerCost": 30
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.64Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.7Adhesive",
                    "material": "SDTT_7N",
                    "materialPerCost": 3.382352941
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.7Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.8Adhesive",
                    "material": "NITTO_DY_080N",
                    "materialPerCost": 28.41176471
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.8Adhesive",
                    "material": "3M_5930VHB",
                    "materialPerCost": 40.73529412
                  },
                  {
                    "type2": "Adhesive",
                    "materialspec": "T0.8Adhesive",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "醋酸膠布",
                    "materialspec": "T0.12非阻燃醋酸",
                    "material": "非阻燃醋酸膠布",
                    "materialPerCost": 2.720588235
                  },
                  {
                    "type2": "醋酸膠布",
                    "materialspec": "T0.25非阻燃醋酸",
                    "material": "非阻燃醋酸膠布",
                    "materialPerCost": 2.941176471
                  },
                  {
                    "type2": "醋酸膠布",
                    "materialspec": "T0.25阻燃醋酸",
                    "material": "阻燃醋酸膠布",
                    "materialPerCost": 4.044117647
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.1Absorber",
                    "material": 4010,
                    "materialPerCost": 71.17647059
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.1Absorber",
                    "material": "YJC75005",
                    "materialPerCost": 72.79411765
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.1Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.15Absorber",
                    "material": "G566_10",
                    "materialPerCost": 72.79411765
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.15Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.2Absorber",
                    "material": "G566_20",
                    "materialPerCost": 115.5882353
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.2Absorber",
                    "material": "YJC75015",
                    "materialPerCost": 65.44117647
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.2Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.25Absorber",
                    "material": "G566_25",
                    "materialPerCost": 84.11764706
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.25Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.3Absorber",
                    "material": "3M_AB5030",
                    "materialPerCost": 308.8235294
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.3Absorber",
                    "material": "YJC75025",
                    "materialPerCost": 79.41176471
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.3Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.35Absorber",
                    "material": "G566_30",
                    "materialPerCost": 88.23529412
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.35Absorber",
                    "material": 4030,
                    "materialPerCost": 88.23529412
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.35Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.55Absorber",
                    "material": "G566_50",
                    "materialPerCost": 123.5294118
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T0.55Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T1.0Absorber",
                    "material": "YJC75100",
                    "materialPerCost": 145.5882353
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T1.0Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T2.5Absorber",
                    "material": "YJC75200",
                    "materialPerCost": 250.7352941
                  },
                  {
                    "type2": "Absorber（含膠）",
                    "materialspec": "T2.5Absorber",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "ConductiveTape",
                    "material": "Non_UL導電布灰",
                    "materialspec": "T0.085",
                    "materialPerCost": 26
                  },
                  {
                    "type2": "ConductiveTape",
                    "material": "UL導電布灰",
                    "materialspec": "T0.13",
                    "materialPerCost": 17
                  },
                  {
                    "type2": "ConductiveTape",
                    "material": "Non_UL導電布灰",
                    "materialspec": "T0.13",
                    "materialPerCost": 6.744117647
                  },
                  {
                    "type2": "ConductiveTape",
                    "material": "UL導電布黑",
                    "materialspec": "T0.13",
                    "materialPerCost": 19.5
                  },
                  {
                    "type2": "ConductiveTape",
                    "material": "Non_UL導電布黑",
                    "materialspec": "T0.13",
                    "materialPerCost": 8.817647059
                  },
                  {
                    "type2": "ConductiveTape",
                    "material": null,
                    "materialspec": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Gasket",
                    "materialspec": "ULGasket灰",
                    "material": 0,
                    "materialPerCost": 22
                  },
                  {
                    "type2": "Gasket",
                    "material": "Non_ULGasket灰",
                    "materialspec": 0,
                    "materialPerCost": 18
                  },
                  {
                    "type2": "Gasket",
                    "material": "ULGasket黑",
                    "materialspec": 0,
                    "materialPerCost": 25
                  },
                  {
                    "type2": "Gasket",
                    "material": "Non_ULGasket黑",
                    "materialspec": 0,
                    "materialPerCost": 21
                  },
                  {
                    "type2": "Gasket",
                    "material": "UL_Eco_Form",
                    "materialspec": "T1.0",
                    "materialPerCost": 120
                  },
                  {
                    "type2": "Gasket",
                    "material": "Non_UL_Eco_Form",
                    "materialspec": "T1.0",
                    "materialPerCost": 100
                  },
                  {
                    "type2": "Gasket",
                    "material": "UL_Eco_Form",
                    "materialspec": "T1.5",
                    "materialPerCost": 140
                  },
                  {
                    "type2": "Gasket",
                    "material": "Non_UL_Eco_Form",
                    "materialspec": "T1.5",
                    "materialPerCost": 120
                  },
                  {
                    "type2": "Gasket",
                    "material": "UL_Eco_Form",
                    "materialspec": "T2.0",
                    "materialPerCost": 160
                  },
                  {
                    "type2": "Gasket",
                    "material": "Non_UL_Eco_Form",
                    "materialspec": "T2.0",
                    "materialPerCost": 140
                  },
                  {
                    "type2": "Gasket",
                    "material": null,
                    "materialspec": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.125Mesh",
                    "material": "DFR117網孔0.8_P1.2",
                    "materialPerCost": 5.147058824
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.125Mesh",
                    "material": "DFR117網孔0.5_P0.9",
                    "materialPerCost": 5.147058824
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.125Mesh",
                    "material": "DFR117網孔0.5_P0.7",
                    "materialPerCost": 5.147058824
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.125Mesh",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.175Mesh",
                    "material": "DFR117網孔0.8_P1.2",
                    "materialPerCost": 5.882352941
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.175Mesh",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.178Mesh",
                    "material": "DFR117網孔0.5_P0.9",
                    "materialPerCost": 5.882352941
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.178Mesh",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.25Mesh",
                    "material": "DFR117網孔0.8_P1.2",
                    "materialPerCost": 5.945588235
                  },
                  {
                    "type2": "Mesh",
                    "materialspec": "T0.25Mesh",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.05_AlCu",
                    "material": "AL_Mylar_不含背膠",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.05_AlCu",
                    "material": "軟鋁S_不含背膠",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.06_AlCu",
                    "material": "雙導鋁(含導電膠)",
                    "materialPerCost": 3.242647059
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.075_AlCu",
                    "material": "AL_Mylar_不含背膠",
                    "materialPerCost": 1.176470588
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.1_AlCu",
                    "material": "AL_Mylar_不含背膠",
                    "materialPerCost": 1.470588235
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.1_AlCu",
                    "material": "雙導鋁(含導電膠)",
                    "materialPerCost": 2.647058824
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.1_AlCu",
                    "material": "軟鋁S_不含背膠",
                    "materialPerCost": 1.470588235
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.1_AlCu",
                    "material": "軟銅_不含背膠",
                    "materialPerCost": 14.70588235
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.1_AlCu",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.15_AlCu",
                    "material": "雙導鋁(含導電膠)",
                    "materialPerCost": 2.941176471
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.15_AlCu",
                    "material": "軟銅_不含背膠",
                    "materialPerCost": 22.05882353
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.15_AlCu",
                    "material": "AL_Mylar_不含背膠",
                    "materialPerCost": 4.338235294
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.20_AlCu",
                    "material": "雙導鋁(含導電膠)",
                    "materialPerCost": 6.691176471
                  },
                  {
                    "type2": "Al_Cu_Foil",
                    "materialspec": "T0.25_AlCu",
                    "material": "雙導銅(含導電膠)",
                    "materialPerCost": 28.16176471
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.3PMMA",
                    "material": "雙面硬化 0.3 PMMA",
                    "materialPerCost": 64.41176471
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.3PMMA",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.4PMMA",
                    "material": "雙面硬化 0.4 PMMA",
                    "materialPerCost": 40.58823529
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.4PMMA",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.5PMMA",
                    "material": "雙面硬化 0.5 PMMA",
                    "materialPerCost": 30.88235294
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.5PMMA",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.8PMMA",
                    "material": "雙面硬化 0.8 PMMA",
                    "materialPerCost": 32.64705882
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T0.8PMMA",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T1.0PMMA",
                    "material": "雙面硬化 1.0 PMMA",
                    "materialPerCost": 31.76470588
                  },
                  {
                    "type2": "PMMA",
                    "materialspec": "T1.0PMMA",
                    "material": "Other_Fill_ME_Remark",
                    "materialPerCost": null
                  },
                  {
                    "type2": "Acetate",
                    "materialspec": "T0.12非阻燃醋酸",
                    "material": "非阻燃醋酸膠布",
                    "materialPerCost": 2.720588235
                  },
                  {
                    "type2": "Acetate",
                    "materialspec": "非阻燃醋酸膠布",
                    "material": "非阻燃醋酸膠布",
                    "materialPerCost": 3.382352941
                  },
                  {
                    "type2": "Acetate",
                    "materialspec": "阻燃醋酸膠布",
                    "material": "阻燃醋酸膠布",
                    "materialPerCost": 4.044117647
                  },
                  {
                    "type2": "Non_Woven",
                    "materialspec": "非阻燃黑色不織布",
                    "material": "非阻燃黑色不織布",
                    "materialPerCost": 1.029411765
                  },
                  {
                    "type2": "Non_Woven",
                    "materialspec": "阻燃黑色不織布",
                    "material": "阻燃黑色不織布",
                    "materialPerCost": 2.647058824
                  },
                  {
                    "type2": "Non_Woven",
                    "materialspec": "T0.35Non_Woven",
                    "material": "Non_Woven",
                    "materialPerCost": 2.205882353
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "mainMaterialSize",
              "label": "主材料尺寸",
              "displayConfig": {
                "grids": 1.5,
                "display": true
              },
              "items": [
                {
                  "key": "partssizelength",
                  "label": "L(mm)",
                  "require": false,
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                },
                {
                  "key": "partssizewidth",
                  "label": "W(mm)",
                  "require": false,
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                },
                {
                  "key": "partssizehigh",
                  "label": "H(mm)",
                  "require": false,
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                }
              ],
              "fieldType": "compositeInline",
              "multiple": false,
              "needExe": true,
              "switchable": false,
              "visiable": true,
              "maxGroupCount": null,
              "inline": true
            },
            {
              "key": "stampingTypeName",
              "label": "類型",
              "description": "(1.方形請選模切 2.其他請選沖切)",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "stampingTypeName": "沖切",
                    "stampingType": 1
                  },
                  {
                    "stampingTypeName": "裁切",
                    "stampingType": 0
                  }
                ]
              },
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "require": true,
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "stampingType",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "stampingTypeName"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "stampingTypeName": "沖切",
                    "stampingType": 1
                  },
                  {
                    "stampingTypeName": "裁切",
                    "stampingType": 0
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "int",
              "default": 0,
              "needExe": false
            },
            {
              "key": "dieCutRemark",
              "label": "備註",
              "require": false,
              "displayConfig": {
                "grids": 1.5,
                "display": true
              },
              "constrains": [
                {
                  "function": "(val) => val.length > 50",
                  "message": "長度不得超過 50 字"
                }
              ],
              "fieldType": "textarea",
              "dataType": "string",
              "multiple": false,
              "default": null,
              "needExe": true,
              "placeholder": ""
            }
          ],
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "usingSubMaterial",
          "label": "輔料",
          "group": [
            "subMaterialCost"
          ],
          "multiple": "新增輔料",
          "switchable": "有使用輔料",
          "maxGroupCount": 10,
          "items": [
            {
              "key": "subMaterialLabel",
              "label": "輔料",
              "level": 2,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "fieldType": "label",
              "editable": false,
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "subType2",
              "label": "Part Category II",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.638235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.511764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.794117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.161764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.25
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.5
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 0.576470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 0.716176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.970588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.811764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.145588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.976470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.498529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 1.941176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.492647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.172058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 2.426470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.220588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.1
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 1.083823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 1.397058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.745588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 2.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.933823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 3.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 3.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.886764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DF8D35T",
                    "subMaterialPerCost": 3.176470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 3.316176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 4.330882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 2.873529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 4.138235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 5.626470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 5.373529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 9.079411765
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 8.152941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 9.222058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": 0
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 8.235294118
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 11.68088235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 12.94117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 8.970588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 27.35294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "PORON_SRS48P",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 0.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 15.88235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.95294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 18.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 3.823529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 15.04411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 16.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.98529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 18.45588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 2.254411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 6.323529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR2030",
                    "subMaterialPerCost": 6.825
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.33529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.41176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 20.38235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.158823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.26470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.97058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 19.11764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 25.55588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 11.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 2.316176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 9.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 7.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 15.44117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 4.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 11.91176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 3.475
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 9.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 11.61764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 19.85294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "FZ_015E保護膜_8515B",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_T_58保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "SJ_450P保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_W150保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-LP",
                    "subMaterialPerCost": 1.058823529
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-MP",
                    "subMaterialPerCost": 1.094117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-HP",
                    "subMaterialPerCost": 1.235294118
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "RH7027",
                    "subMaterialPerCost": 0.648529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "PET_E_006",
                    "subMaterialPerCost": 0.782352941
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "QLD-G1208P-60A",
                    "subMaterialPerCost": 2.470588235
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "TR-7501-H2P",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_H_20_30G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_L_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LL_3_6G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LLL_1_3G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LP_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_M 12_20G",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_MP",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DST_5",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DS_5",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "皇冠7972G",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "PW_05",
                    "subMaterialPerCost": 2.085294118
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JA305",
                    "subMaterialPerCost": 2.102941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JP005B",
                    "subMaterialPerCost": 2.007352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_上海產",
                    "subMaterialPerCost": 3.211764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_日本產",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_467MP",
                    "subMaterialPerCost": 4.694117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_55256",
                    "subMaterialPerCost": 4.2
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68842",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68742",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "SONY_NP203",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_4972",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_51972",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_56605B",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9460PC",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9671LE",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_8228B",
                    "subMaterialPerCost": 8.529411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9626",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TT219導電背膠",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JC205導電背膠",
                    "subMaterialPerCost": 2.75
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "DSTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DS_10B",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DST_10",
                    "subMaterialPerCost": 1.875
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "PW_10",
                    "subMaterialPerCost": 2.779411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "3M_468MP",
                    "subMaterialPerCost": 6.392647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "TESA_4982",
                    "subMaterialPerCost": 9.542647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "DSTT_13N",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "3M_468C",
                    "subMaterialPerCost": 7.983823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15B",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G4000",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9888T",
                    "subMaterialPerCost": 4.941176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9000",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9080HL",
                    "subMaterialPerCost": 4.558823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NS",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9448AB",
                    "subMaterialPerCost": 5.25
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9900",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "G9500R",
                    "subMaterialPerCost": 6.439705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NSLV",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NCB",
                    "subMaterialPerCost": 7.926470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NT5000NSLV",
                    "subMaterialPerCost": 7.861764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 63.23529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "DS_20",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_68644",
                    "subMaterialPerCost": 5.105882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61365",
                    "subMaterialPerCost": 12.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61395",
                    "subMaterialPerCost": 17.93235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_62624",
                    "subMaterialPerCost": 26.06323529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "3M_WT_20",
                    "subMaterialPerCost": 43.97058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "SLR1125",
                    "subMaterialPerCost": 33.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "TESA_62645",
                    "subMaterialPerCost": 26.72058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 38.67647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_SR5625",
                    "subMaterialPerCost": 50.95588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "NITTO_GA6330",
                    "subMaterialPerCost": 14.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "SONY_UT1430",
                    "subMaterialPerCost": 19.48529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_61315",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_62626",
                    "subMaterialPerCost": 20.86764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "NITTO_DY_040N",
                    "subMaterialPerCost": 23.89705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_BD041VHB",
                    "subMaterialPerCost": 26.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_4920VHB",
                    "subMaterialPerCost": 31.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "DIC_8404B",
                    "subMaterialPerCost": 36.39705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_5915VHB",
                    "subMaterialPerCost": 39.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB替代料_科捷龍_KJ6064B",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "NITTO_DY064N",
                    "subMaterialPerCost": 26.72941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB",
                    "subMaterialPerCost": 26.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_BD065VHB",
                    "subMaterialPerCost": 30
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "SDTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "NITTO_DY_080N",
                    "subMaterialPerCost": 28.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "3M_5930VHB",
                    "subMaterialPerCost": 40.73529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25阻燃醋酸",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": 4010,
                    "subMaterialPerCost": 71.17647059
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "YJC75005",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "G566_10",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "G566_20",
                    "subMaterialPerCost": 115.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "YJC75015",
                    "subMaterialPerCost": 65.44117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "G566_25",
                    "subMaterialPerCost": 84.11764706
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "3M_AB5030",
                    "subMaterialPerCost": 308.8235294
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "YJC75025",
                    "subMaterialPerCost": 79.41176471
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "G566_30",
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": 4030,
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "G566_50",
                    "subMaterialPerCost": 123.5294118
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "YJC75100",
                    "subMaterialPerCost": 145.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "YJC75200",
                    "subMaterialPerCost": 250.7352941
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.085",
                    "subMaterialPerCost": 26
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 17
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 6.744117647
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 19.5
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 8.817647059
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 22
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 18
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 25
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 21
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 100
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 160
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.7",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.945588235
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.06_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 3.242647059
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.075_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 4.338235294
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.20_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.25_AlCu",
                    "subMaterial": "雙導銅(含導電膠)",
                    "subMaterialPerCost": 28.16176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "雙面硬化 0.3 PMMA",
                    "subMaterialPerCost": 64.41176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "雙面硬化 0.4 PMMA",
                    "subMaterialPerCost": 40.58823529
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "雙面硬化 0.5 PMMA",
                    "subMaterialPerCost": 30.88235294
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "雙面硬化 0.8 PMMA",
                    "subMaterialPerCost": 32.64705882
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "雙面硬化 1.0 PMMA",
                    "subMaterialPerCost": 31.76470588
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "非阻燃醋酸膠布",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "阻燃醋酸膠布",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "非阻燃黑色不織布",
                    "subMaterial": "非阻燃黑色不織布",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "阻燃黑色不織布",
                    "subMaterial": "阻燃黑色不織布",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "T0.35Non_Woven",
                    "subMaterial": "Non_Woven",
                    "subMaterialPerCost": 2.205882353
                  }
                ]
              },
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "require": false,
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "subMaterialspec",
              "label": "Material Spec.",
              "selectorConfig": {
                "depends": [
                  "subType2"
                ],
                "values": [
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.638235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.511764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.794117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.161764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.25
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.5
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 0.576470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 0.716176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.970588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.811764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.145588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.976470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.498529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 1.941176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.492647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.172058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 2.426470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.220588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.1
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 1.083823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 1.397058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.745588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 2.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.933823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 3.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 3.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.886764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DF8D35T",
                    "subMaterialPerCost": 3.176470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 3.316176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 4.330882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 2.873529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 4.138235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 5.626470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 5.373529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 9.079411765
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 8.152941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 9.222058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": 0
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 8.235294118
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 11.68088235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 12.94117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 8.970588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 27.35294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "PORON_SRS48P",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 0.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 15.88235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.95294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 18.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 3.823529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 15.04411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 16.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.98529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 18.45588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 2.254411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 6.323529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR2030",
                    "subMaterialPerCost": 6.825
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.33529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.41176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 20.38235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.158823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.26470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.97058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 19.11764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 25.55588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 11.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 2.316176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 9.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 7.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 15.44117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 4.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 11.91176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 3.475
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 9.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 11.61764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 19.85294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "FZ_015E保護膜_8515B",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_T_58保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "SJ_450P保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_W150保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-LP",
                    "subMaterialPerCost": 1.058823529
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-MP",
                    "subMaterialPerCost": 1.094117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-HP",
                    "subMaterialPerCost": 1.235294118
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "RH7027",
                    "subMaterialPerCost": 0.648529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "PET_E_006",
                    "subMaterialPerCost": 0.782352941
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "QLD-G1208P-60A",
                    "subMaterialPerCost": 2.470588235
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "TR-7501-H2P",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_H_20_30G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_L_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LL_3_6G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LLL_1_3G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LP_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_M 12_20G",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_MP",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DST_5",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DS_5",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "皇冠7972G",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "PW_05",
                    "subMaterialPerCost": 2.085294118
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JA305",
                    "subMaterialPerCost": 2.102941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JP005B",
                    "subMaterialPerCost": 2.007352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_上海產",
                    "subMaterialPerCost": 3.211764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_日本產",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_467MP",
                    "subMaterialPerCost": 4.694117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_55256",
                    "subMaterialPerCost": 4.2
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68842",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68742",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "SONY_NP203",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_4972",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_51972",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_56605B",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9460PC",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9671LE",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_8228B",
                    "subMaterialPerCost": 8.529411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9626",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TT219導電背膠",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JC205導電背膠",
                    "subMaterialPerCost": 2.75
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "DSTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DS_10B",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DST_10",
                    "subMaterialPerCost": 1.875
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "PW_10",
                    "subMaterialPerCost": 2.779411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "3M_468MP",
                    "subMaterialPerCost": 6.392647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "TESA_4982",
                    "subMaterialPerCost": 9.542647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "DSTT_13N",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "3M_468C",
                    "subMaterialPerCost": 7.983823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15B",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G4000",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9888T",
                    "subMaterialPerCost": 4.941176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9000",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9080HL",
                    "subMaterialPerCost": 4.558823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NS",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9448AB",
                    "subMaterialPerCost": 5.25
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9900",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "G9500R",
                    "subMaterialPerCost": 6.439705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NSLV",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NCB",
                    "subMaterialPerCost": 7.926470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NT5000NSLV",
                    "subMaterialPerCost": 7.861764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 63.23529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "DS_20",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_68644",
                    "subMaterialPerCost": 5.105882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61365",
                    "subMaterialPerCost": 12.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61395",
                    "subMaterialPerCost": 17.93235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_62624",
                    "subMaterialPerCost": 26.06323529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "3M_WT_20",
                    "subMaterialPerCost": 43.97058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "SLR1125",
                    "subMaterialPerCost": 33.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "TESA_62645",
                    "subMaterialPerCost": 26.72058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 38.67647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_SR5625",
                    "subMaterialPerCost": 50.95588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "NITTO_GA6330",
                    "subMaterialPerCost": 14.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "SONY_UT1430",
                    "subMaterialPerCost": 19.48529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_61315",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_62626",
                    "subMaterialPerCost": 20.86764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "NITTO_DY_040N",
                    "subMaterialPerCost": 23.89705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_BD041VHB",
                    "subMaterialPerCost": 26.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_4920VHB",
                    "subMaterialPerCost": 31.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "DIC_8404B",
                    "subMaterialPerCost": 36.39705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_5915VHB",
                    "subMaterialPerCost": 39.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB替代料_科捷龍_KJ6064B",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "NITTO_DY064N",
                    "subMaterialPerCost": 26.72941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB",
                    "subMaterialPerCost": 26.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_BD065VHB",
                    "subMaterialPerCost": 30
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "SDTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "NITTO_DY_080N",
                    "subMaterialPerCost": 28.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "3M_5930VHB",
                    "subMaterialPerCost": 40.73529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25阻燃醋酸",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": 4010,
                    "subMaterialPerCost": 71.17647059
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "YJC75005",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "G566_10",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "G566_20",
                    "subMaterialPerCost": 115.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "YJC75015",
                    "subMaterialPerCost": 65.44117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "G566_25",
                    "subMaterialPerCost": 84.11764706
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "3M_AB5030",
                    "subMaterialPerCost": 308.8235294
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "YJC75025",
                    "subMaterialPerCost": 79.41176471
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "G566_30",
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": 4030,
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "G566_50",
                    "subMaterialPerCost": 123.5294118
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "YJC75100",
                    "subMaterialPerCost": 145.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "YJC75200",
                    "subMaterialPerCost": 250.7352941
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.085",
                    "subMaterialPerCost": 26
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 17
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 6.744117647
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 19.5
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 8.817647059
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 22
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 18
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 25
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 21
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 100
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 160
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.7",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.945588235
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.06_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 3.242647059
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.075_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 4.338235294
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.20_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.25_AlCu",
                    "subMaterial": "雙導銅(含導電膠)",
                    "subMaterialPerCost": 28.16176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "雙面硬化 0.3 PMMA",
                    "subMaterialPerCost": 64.41176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "雙面硬化 0.4 PMMA",
                    "subMaterialPerCost": 40.58823529
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "雙面硬化 0.5 PMMA",
                    "subMaterialPerCost": 30.88235294
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "雙面硬化 0.8 PMMA",
                    "subMaterialPerCost": 32.64705882
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "雙面硬化 1.0 PMMA",
                    "subMaterialPerCost": 31.76470588
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "非阻燃醋酸膠布",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "阻燃醋酸膠布",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "非阻燃黑色不織布",
                    "subMaterial": "非阻燃黑色不織布",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "阻燃黑色不織布",
                    "subMaterial": "阻燃黑色不織布",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "T0.35Non_Woven",
                    "subMaterial": "Non_Woven",
                    "subMaterialPerCost": 2.205882353
                  }
                ]
              },
              "displayConfig": {
                "grids": 1,
                "depends": {
                  "action": "lock",
                  "condition": {
                    "subType2": true
                  }
                },
                "display": true
              },
              "require": false,
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "subMaterial",
              "label": "Material",
              "selectorConfig": {
                "depends": [
                  "subType2",
                  "subMaterialspec"
                ],
                "values": [
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.638235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.511764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.794117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.161764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.25
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.5
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 0.576470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 0.716176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.970588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.811764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.145588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.976470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.498529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 1.941176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.492647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.172058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 2.426470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.220588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.1
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 1.083823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 1.397058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.745588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 2.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.933823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 3.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 3.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.886764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DF8D35T",
                    "subMaterialPerCost": 3.176470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 3.316176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 4.330882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 2.873529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 4.138235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 5.626470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 5.373529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 9.079411765
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 8.152941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 9.222058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": 0
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 8.235294118
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 11.68088235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 12.94117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 8.970588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 27.35294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "PORON_SRS48P",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 0.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 15.88235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.95294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 18.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 3.823529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 15.04411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 16.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.98529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 18.45588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 2.254411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 6.323529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR2030",
                    "subMaterialPerCost": 6.825
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.33529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.41176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 20.38235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.158823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.26470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.97058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 19.11764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 25.55588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 11.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 2.316176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 9.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 7.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 15.44117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 4.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 11.91176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 3.475
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 9.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 11.61764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 19.85294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "FZ_015E保護膜_8515B",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_T_58保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "SJ_450P保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_W150保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-LP",
                    "subMaterialPerCost": 1.058823529
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-MP",
                    "subMaterialPerCost": 1.094117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-HP",
                    "subMaterialPerCost": 1.235294118
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "RH7027",
                    "subMaterialPerCost": 0.648529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "PET_E_006",
                    "subMaterialPerCost": 0.782352941
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "QLD-G1208P-60A",
                    "subMaterialPerCost": 2.470588235
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "TR-7501-H2P",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_H_20_30G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_L_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LL_3_6G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LLL_1_3G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LP_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_M 12_20G",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_MP",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DST_5",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DS_5",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "皇冠7972G",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "PW_05",
                    "subMaterialPerCost": 2.085294118
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JA305",
                    "subMaterialPerCost": 2.102941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JP005B",
                    "subMaterialPerCost": 2.007352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_上海產",
                    "subMaterialPerCost": 3.211764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_日本產",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_467MP",
                    "subMaterialPerCost": 4.694117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_55256",
                    "subMaterialPerCost": 4.2
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68842",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68742",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "SONY_NP203",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_4972",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_51972",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_56605B",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9460PC",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9671LE",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_8228B",
                    "subMaterialPerCost": 8.529411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9626",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TT219導電背膠",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JC205導電背膠",
                    "subMaterialPerCost": 2.75
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "DSTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DS_10B",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DST_10",
                    "subMaterialPerCost": 1.875
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "PW_10",
                    "subMaterialPerCost": 2.779411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "3M_468MP",
                    "subMaterialPerCost": 6.392647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "TESA_4982",
                    "subMaterialPerCost": 9.542647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "DSTT_13N",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "3M_468C",
                    "subMaterialPerCost": 7.983823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15B",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G4000",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9888T",
                    "subMaterialPerCost": 4.941176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9000",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9080HL",
                    "subMaterialPerCost": 4.558823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NS",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9448AB",
                    "subMaterialPerCost": 5.25
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9900",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "G9500R",
                    "subMaterialPerCost": 6.439705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NSLV",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NCB",
                    "subMaterialPerCost": 7.926470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NT5000NSLV",
                    "subMaterialPerCost": 7.861764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 63.23529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "DS_20",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_68644",
                    "subMaterialPerCost": 5.105882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61365",
                    "subMaterialPerCost": 12.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61395",
                    "subMaterialPerCost": 17.93235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_62624",
                    "subMaterialPerCost": 26.06323529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "3M_WT_20",
                    "subMaterialPerCost": 43.97058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "SLR1125",
                    "subMaterialPerCost": 33.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "TESA_62645",
                    "subMaterialPerCost": 26.72058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 38.67647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_SR5625",
                    "subMaterialPerCost": 50.95588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "NITTO_GA6330",
                    "subMaterialPerCost": 14.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "SONY_UT1430",
                    "subMaterialPerCost": 19.48529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_61315",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_62626",
                    "subMaterialPerCost": 20.86764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "NITTO_DY_040N",
                    "subMaterialPerCost": 23.89705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_BD041VHB",
                    "subMaterialPerCost": 26.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_4920VHB",
                    "subMaterialPerCost": 31.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "DIC_8404B",
                    "subMaterialPerCost": 36.39705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_5915VHB",
                    "subMaterialPerCost": 39.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB替代料_科捷龍_KJ6064B",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "NITTO_DY064N",
                    "subMaterialPerCost": 26.72941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB",
                    "subMaterialPerCost": 26.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_BD065VHB",
                    "subMaterialPerCost": 30
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "SDTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "NITTO_DY_080N",
                    "subMaterialPerCost": 28.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "3M_5930VHB",
                    "subMaterialPerCost": 40.73529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25阻燃醋酸",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": 4010,
                    "subMaterialPerCost": 71.17647059
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "YJC75005",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "G566_10",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "G566_20",
                    "subMaterialPerCost": 115.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "YJC75015",
                    "subMaterialPerCost": 65.44117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "G566_25",
                    "subMaterialPerCost": 84.11764706
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "3M_AB5030",
                    "subMaterialPerCost": 308.8235294
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "YJC75025",
                    "subMaterialPerCost": 79.41176471
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "G566_30",
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": 4030,
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "G566_50",
                    "subMaterialPerCost": 123.5294118
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "YJC75100",
                    "subMaterialPerCost": 145.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "YJC75200",
                    "subMaterialPerCost": 250.7352941
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.085",
                    "subMaterialPerCost": 26
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 17
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 6.744117647
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 19.5
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 8.817647059
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 22
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 18
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 25
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 21
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 100
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 160
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.7",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.945588235
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.06_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 3.242647059
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.075_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 4.338235294
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.20_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.25_AlCu",
                    "subMaterial": "雙導銅(含導電膠)",
                    "subMaterialPerCost": 28.16176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "雙面硬化 0.3 PMMA",
                    "subMaterialPerCost": 64.41176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "雙面硬化 0.4 PMMA",
                    "subMaterialPerCost": 40.58823529
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "雙面硬化 0.5 PMMA",
                    "subMaterialPerCost": 30.88235294
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "雙面硬化 0.8 PMMA",
                    "subMaterialPerCost": 32.64705882
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "雙面硬化 1.0 PMMA",
                    "subMaterialPerCost": 31.76470588
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "非阻燃醋酸膠布",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "阻燃醋酸膠布",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "非阻燃黑色不織布",
                    "subMaterial": "非阻燃黑色不織布",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "阻燃黑色不織布",
                    "subMaterial": "阻燃黑色不織布",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "T0.35Non_Woven",
                    "subMaterial": "Non_Woven",
                    "subMaterialPerCost": 2.205882353
                  }
                ]
              },
              "displayConfig": {
                "grids": 1,
                "depends": {
                  "action": "lock",
                  "condition": {
                    "subType2": true,
                    "subMaterialspec": true
                  }
                },
                "display": true
              },
              "require": false,
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "subMaterialPerCost",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "subMaterial",
                "subMaterialspec"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.638235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.511764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.794117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.161764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.05Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.25
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.5
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.075Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 0.576470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 0.716176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "透明",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 0.970588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 0.992647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.811764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.1Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.145588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 1.976470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 1.498529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 1.941176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.125Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.492647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.172058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 2.426470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.220588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.1
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.175Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6027D",
                    "subMaterialPerCost": 1.083823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "PET6023D",
                    "subMaterialPerCost": 1.397058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.188Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 1.745588235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "CY28_PET",
                    "subMaterialPerCost": 2.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 2.933823529
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "DFR116ECOB",
                    "subMaterialPerCost": 3.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "黑色",
                    "subMaterialPerCost": 3.191176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 2.886764706
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.25Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "DF8D35T",
                    "subMaterialPerCost": 3.176470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 3.316176471
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 4.330882353
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.38Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 2.873529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 4.138235294
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.43Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 5.626470588
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.5Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR_BK_PP",
                    "subMaterialPerCost": 5.373529412
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 9.079411765
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "DFR117",
                    "subMaterialPerCost": 8.152941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.76Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 9.222058824
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T0.8Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": 0
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC8010",
                    "subMaterialPerCost": 8.235294118
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "透明PC",
                    "subMaterialPerCost": 11.68088235
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "PC1860",
                    "subMaterialPerCost": 12.94117647
                  },
                  {
                    "subType2": "Mylar",
                    "subMaterialspec": "T1.0Mylar",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 8.970588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 27.35294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.2Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "PORON_SRS48P",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.3Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.4Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 0.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 6.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 13.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 15.88235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.95294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 18.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.6Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 3.823529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 15.04411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 16.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.98529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.7Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 18.45588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.8Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T0.9Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 2.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 0.772058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 2.254411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "LV100",
                    "subMaterialPerCost": 6.323529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "CR2030",
                    "subMaterialPerCost": 6.825
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS40P",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 10.33529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.41176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 20.38235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.158823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.60294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 19.26470588
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T1.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 2.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.088235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 13.97058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS32P",
                    "subMaterialPerCost": 19.11764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 25.55588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 11.02941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T2.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 3.529411765
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "YU356",
                    "subMaterialPerCost": 2.316176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PMP1800",
                    "subMaterialPerCost": 7.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 9.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "PORON_SRS24P",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 7.205882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.352941176
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 15.44117647
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T3.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 4.705882353
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 11.91176471
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.5
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "EVA",
                    "subMaterialPerCost": 3.475
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4308",
                    "subMaterialPerCost": 9.264705882
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "YU55",
                    "subMaterialPerCost": 11.61764706
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "E4382",
                    "subMaterialPerCost": 19.85294118
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T4.5Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "CR1015",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "SM55",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "KVH200",
                    "subMaterialPerCost": 16.17647059
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "PORON_ML32",
                    "subMaterialPerCost": 22.23529412
                  },
                  {
                    "subType2": "Sponge",
                    "subMaterialspec": "T5.0Sponge",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "FZ_015E保護膜_8515B",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_T_58保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "SJ_450P保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "PE_W150保護膜",
                    "subMaterialPerCost": 0.389117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-LP",
                    "subMaterialPerCost": 1.058823529
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-MP",
                    "subMaterialPerCost": 1.094117647
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "TR-5001-HP",
                    "subMaterialPerCost": 1.235294118
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.05Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "RH7027",
                    "subMaterialPerCost": 0.648529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "PET_E_006",
                    "subMaterialPerCost": 0.782352941
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.06Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "QLD-G1208P-60A",
                    "subMaterialPerCost": 2.470588235
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "TR-7501-H2P",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.075Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_H_20_30G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_L_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LL_3_6G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LLL_1_3G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_LP_6_12G",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_M 12_20G",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "TR_1001_MP",
                    "subMaterialPerCost": 1.323529412
                  },
                  {
                    "subType2": "Protection Film",
                    "subMaterialspec": "T0.1Protection",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DST_5",
                    "subMaterialPerCost": 1.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "DS_5",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "皇冠7972G",
                    "subMaterialPerCost": 1.544117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "PW_05",
                    "subMaterialPerCost": 2.085294118
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JA305",
                    "subMaterialPerCost": 2.102941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JP005B",
                    "subMaterialPerCost": 2.007352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_上海產",
                    "subMaterialPerCost": 3.211764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_GA835_日本產",
                    "subMaterialPerCost": 4.264705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_467MP",
                    "subMaterialPerCost": 4.694117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_55256",
                    "subMaterialPerCost": 4.2
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68842",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_68742",
                    "subMaterialPerCost": 4.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "SONY_NP203",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_4972",
                    "subMaterialPerCost": 5.441176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TESA_51972",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "NITTO_56605B",
                    "subMaterialPerCost": 6.764705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9460PC",
                    "subMaterialPerCost": 7.058823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9671LE",
                    "subMaterialPerCost": 7.794117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_8228B",
                    "subMaterialPerCost": 8.529411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "3M_9626",
                    "subMaterialPerCost": 11.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "TT219導電背膠",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "JC205導電背膠",
                    "subMaterialPerCost": 2.75
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.05Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "DSTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.07Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DS_10B",
                    "subMaterialPerCost": 1.911764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "DST_10",
                    "subMaterialPerCost": 1.875
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "PW_10",
                    "subMaterialPerCost": 2.779411765
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "3M_468MP",
                    "subMaterialPerCost": 6.392647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "TESA_4982",
                    "subMaterialPerCost": 9.542647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.1Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "DSTT_13N",
                    "subMaterialPerCost": 3.705882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "3M_468C",
                    "subMaterialPerCost": 7.983823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.13Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15",
                    "subMaterialPerCost": 1.852941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "DS_15B",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G4000",
                    "subMaterialPerCost": 4.117647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9888T",
                    "subMaterialPerCost": 4.941176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9000",
                    "subMaterialPerCost": 4.411764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9080HL",
                    "subMaterialPerCost": 4.558823529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NS",
                    "subMaterialPerCost": 5.294117647
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_9448AB",
                    "subMaterialPerCost": 5.25
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "SONY_G9900",
                    "subMaterialPerCost": 5.588235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "G9500R",
                    "subMaterialPerCost": 6.439705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NSLV",
                    "subMaterialPerCost": 6.617647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NITTO_5000NCB",
                    "subMaterialPerCost": 7.926470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "NT5000NSLV",
                    "subMaterialPerCost": 7.861764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 63.23529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.15Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "DS_20",
                    "subMaterialPerCost": 3.676470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_68644",
                    "subMaterialPerCost": 5.105882353
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61365",
                    "subMaterialPerCost": 12.5
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_61395",
                    "subMaterialPerCost": 17.93235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "TESA_62624",
                    "subMaterialPerCost": 26.06323529
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "3M_WT_20",
                    "subMaterialPerCost": 43.97058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.2Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "SLR1125",
                    "subMaterialPerCost": 33.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "TESA_62645",
                    "subMaterialPerCost": 26.72058824
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_4914VHB",
                    "subMaterialPerCost": 38.67647059
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "3M_SR5625",
                    "subMaterialPerCost": 50.95588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.25Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "NITTO_GA6330",
                    "subMaterialPerCost": 14.82352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "SONY_UT1430",
                    "subMaterialPerCost": 19.48529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_61315",
                    "subMaterialPerCost": 19.63235294
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "TESA_62626",
                    "subMaterialPerCost": 20.86764706
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.3Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "NITTO_DY_040N",
                    "subMaterialPerCost": 23.89705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_BD041VHB",
                    "subMaterialPerCost": 26.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_4920VHB",
                    "subMaterialPerCost": 31.32352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "DIC_8404B",
                    "subMaterialPerCost": 36.39705882
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "3M_5915VHB",
                    "subMaterialPerCost": 39.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.4Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB替代料_科捷龍_KJ6064B",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "NITTO_DY064N",
                    "subMaterialPerCost": 26.72941176
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_5925VHB",
                    "subMaterialPerCost": 26.76470588
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "3M_BD065VHB",
                    "subMaterialPerCost": 30
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.64Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "SDTT_7N",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.7Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "NITTO_DY_080N",
                    "subMaterialPerCost": 28.41176471
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "3M_5930VHB",
                    "subMaterialPerCost": 40.73529412
                  },
                  {
                    "subType2": "Adhesive",
                    "subMaterialspec": "T0.8Adhesive",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "醋酸膠布",
                    "subMaterialspec": "T0.25阻燃醋酸",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": 4010,
                    "subMaterialPerCost": 71.17647059
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "YJC75005",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.1Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "G566_10",
                    "subMaterialPerCost": 72.79411765
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.15Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "G566_20",
                    "subMaterialPerCost": 115.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "YJC75015",
                    "subMaterialPerCost": 65.44117647
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.2Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "G566_25",
                    "subMaterialPerCost": 84.11764706
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.25Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "3M_AB5030",
                    "subMaterialPerCost": 308.8235294
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "YJC75025",
                    "subMaterialPerCost": 79.41176471
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.3Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "G566_30",
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": 4030,
                    "subMaterialPerCost": 88.23529412
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.35Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "G566_50",
                    "subMaterialPerCost": 123.5294118
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T0.55Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "YJC75100",
                    "subMaterialPerCost": 145.5882353
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T1.0Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "YJC75200",
                    "subMaterialPerCost": 250.7352941
                  },
                  {
                    "subType2": "Absorber（含膠）",
                    "subMaterialspec": "T2.5Absorber",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.085",
                    "subMaterialPerCost": 26
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 17
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布灰",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 6.744117647
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 19.5
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": "Non_UL導電布黑",
                    "subMaterialspec": "T0.13",
                    "subMaterialPerCost": 8.817647059
                  },
                  {
                    "subType2": "ConductiveTape",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 22
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket灰",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 18
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 25
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_ULGasket黑",
                    "subMaterialspec": 0,
                    "subMaterialPerCost": 21
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.0",
                    "subMaterialPerCost": 100
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T1.5",
                    "subMaterialPerCost": 120
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 160
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": "Non_UL_Eco_Form",
                    "subMaterialspec": "T2.0",
                    "subMaterialPerCost": 140
                  },
                  {
                    "subType2": "Gasket",
                    "subMaterial": null,
                    "subMaterialspec": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.7",
                    "subMaterialPerCost": 5.147058824
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.125Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.175Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "DFR117網孔0.5_P0.9",
                    "subMaterialPerCost": 5.882352941
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.178Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "DFR117網孔0.8_P1.2",
                    "subMaterialPerCost": 5.945588235
                  },
                  {
                    "subType2": "Mesh",
                    "subMaterialspec": "T0.25Mesh",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.05_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.06_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 3.242647059
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.075_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.176470588
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟鋁S_不含背膠",
                    "subMaterialPerCost": 1.470588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 14.70588235
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.1_AlCu",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 2.941176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "軟銅_不含背膠",
                    "subMaterialPerCost": 22.05882353
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.15_AlCu",
                    "subMaterial": "AL_Mylar_不含背膠",
                    "subMaterialPerCost": 4.338235294
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.20_AlCu",
                    "subMaterial": "雙導鋁(含導電膠)",
                    "subMaterialPerCost": 6.691176471
                  },
                  {
                    "subType2": "Al_Cu_Foil",
                    "subMaterialspec": "T0.25_AlCu",
                    "subMaterial": "雙導銅(含導電膠)",
                    "subMaterialPerCost": 28.16176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "雙面硬化 0.3 PMMA",
                    "subMaterialPerCost": 64.41176471
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.3PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "雙面硬化 0.4 PMMA",
                    "subMaterialPerCost": 40.58823529
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.4PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "雙面硬化 0.5 PMMA",
                    "subMaterialPerCost": 30.88235294
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.5PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "雙面硬化 0.8 PMMA",
                    "subMaterialPerCost": 32.64705882
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T0.8PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "雙面硬化 1.0 PMMA",
                    "subMaterialPerCost": 31.76470588
                  },
                  {
                    "subType2": "PMMA",
                    "subMaterialspec": "T1.0PMMA",
                    "subMaterial": "Other_Fill_ME_Remark",
                    "subMaterialPerCost": null
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "T0.12非阻燃醋酸",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 2.720588235
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "非阻燃醋酸膠布",
                    "subMaterial": "非阻燃醋酸膠布",
                    "subMaterialPerCost": 3.382352941
                  },
                  {
                    "subType2": "Acetate",
                    "subMaterialspec": "阻燃醋酸膠布",
                    "subMaterial": "阻燃醋酸膠布",
                    "subMaterialPerCost": 4.044117647
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "非阻燃黑色不織布",
                    "subMaterial": "非阻燃黑色不織布",
                    "subMaterialPerCost": 1.029411765
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "阻燃黑色不織布",
                    "subMaterial": "阻燃黑色不織布",
                    "subMaterialPerCost": 2.647058824
                  },
                  {
                    "subType2": "Non_Woven",
                    "subMaterialspec": "T0.35Non_Woven",
                    "subMaterial": "Non_Woven",
                    "subMaterialPerCost": 2.205882353
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "subMaterialSize",
              "label": "輔料尺寸",
              "displayConfig": {
                "grids": 1.5,
                "display": true
              },
              "items": [
                {
                  "key": "subMaterialLength",
                  "label": "L(mm)",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "input",
                  "dataType": "float",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": 0,
                  "needExe": true,
                  "placeholder": ""
                },
                {
                  "key": "subMaterialWidth",
                  "label": "W(mm)",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "input",
                  "dataType": "float",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": 0,
                  "needExe": true,
                  "placeholder": ""
                },
                {
                  "key": "subMaterialHeight",
                  "label": "H(mm)",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "input",
                  "dataType": "float",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": 0,
                  "needExe": true,
                  "placeholder": ""
                }
              ],
              "fieldType": "compositeInline",
              "multiple": false,
              "needExe": true,
              "switchable": false,
              "visiable": true,
              "maxGroupCount": null,
              "inline": true
            },
            {
              "key": "assyCount",
              "label": "數量",
              "require": true,
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
              "multiple": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": 0,
              "needExe": true,
              "placeholder": ""
            }
          ],
          "fieldType": "composite",
          "needExe": true,
          "visiable": true,
          "inline": false
        }
      ],
      "fieldType": "tab",
      "visiable": false,
      "needExe": true
    }
  ],
  "formulas": {
    "dieCut": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "materialCostTotal + componentCostTotal + assembleCostTotal",
          "label": "Die Cut total"
        },
        "materialCostTotal": {
          "type": "GROUPSUM",
          "label": "A.材料&管銷&利潤費",
          "bykey": "total",
          "groups": [
            "materialCost"
          ]
        },
        "componentCostTotal": {
          "type": "GROUPSUM",
          "label": "B.輔料費",
          "bykey": "componentCost",
          "groups": [
            "subMaterialCost"
          ]
        },
        "assembleCostTotal": {
          "type": "GROUPSUM",
          "label": "C.組裝費",
          "bykey": "assembleCost",
          "groups": [
            "subMaterialCost"
          ]
        }
      },
      "output": {
        "total": "total",
        "materialCostTotal": "materialCostTotal",
        "componentCostTotal": "componentCostTotal",
        "assembleCostTotal": "assembleCostTotal"
      }
    },
    "materialCost": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "partArea * materialPerCost * ( 1+ lossRate) + punchingProcessingCost",
          "label": "材料費"
        },
        "punchingProcessingCost": {
          "type": "MATH",
          "label": "沖切加工費",
          "formula": "stampingType?0.005:0"
        },
        "partArea": {
          "type": "FUNC",
          "label": "Part Area",
          "formula": "(type2, materialspec, partAreaGasket, partAreaCommon) => { return type2 == 'Gasket' && ['ULGasket灰', 'Non_ULGasket灰', 'ULGasket黑', 'Non_ULGasket黑'].find(materialspec) ?partAreaGasket :partAreaCommon }",
          "param": [
            "type2",
            "materialspec",
            "partAreaGasket",
            "partAreaCommon"
          ]
        },
        "partAreaCommon": {
          "type": "MATH",
          "label": "Part area 通用",
          "formula": "((partssizelength + punchingEdgeMaterialLength) * (partssizewidth + punchingEdgeMaterialWidth)) / 1000000"
        },
        "partAreaGasket": {
          "type": "MATH",
          "label": "Part area type2 =  Gasket 且 MaterialSpec = 'ULGasket灰', 'Non_ULGasket灰', 'ULGasket黑', 'Non_ULGasket黑'",
          "formula": "(2 * ( partssizewidth + partssizehigh )) * partssizelength"
        },
        "punchingEdgeMaterialLength": {
          "type": "MATH",
          "label": "沖型邊料 L",
          "formula": "stampingType?6:0"
        },
        "punchingEdgeMaterialWidth": {
          "type": "MATH",
          "label": "沖型邊料 W",
          "formula": "stampingType?6:0"
        },
        "lossRate": {
          "type": "MATH",
          "label": "Loss rate",
          "formula": "stampingType?0:0"
        }
      },
      "output": {
        "total": "total"
      },
      "scope": {
        "partssizelength": "partssizelength",
        "partssizewidth": "partssizewidth",
        "partssizehigh": "partssizehigh",
        "type2": "type2",
        "material": "material",
        "materialspec": "materialspec",
        "materialPerCost": "materialPerCost",
        "stampingType": "stampingType"
      }
    },
    "subMaterialCost": {
      "formula": {
        "total": {
          "type": "MATH",
          "label": "零件費",
          "formula": "usingSubMaterial ?componentCost+assembleCost :0"
        },
        "componentCost": {
          "type": "MATH",
          "label": "零件費",
          "formula": "usingSubMaterial ?partArea * subMaterialPerCost * ( 1+ lossRate) * assyCount :0"
        },
        "assembleCost": {
          "type": "MATH",
          "label": "組裝費",
          "formula": "usingSubMaterial ?AssyPerCost * AssyTime * assyCount :0"
        },
        "punchingProcessingCost": {
          "type": "MATH",
          "label": "沖切加工費",
          "formula": "_stampingType?0.005:0"
        },
        "partArea": {
          "type": "FUNC",
          "label": "Part Area",
          "formula": "(subType2, subMaterialspec, partAreaGasket, partAreaCommon) => subType2 == 'Gasket' && ['ULGasket灰', 'Non_ULGasket灰', 'ULGasket黑', 'Non_ULGasket黑'].find(subMaterialspec)?partAreaGasket:partAreaCommon",
          "param": [
            "subType2",
            "subMaterialspec",
            "partAreaGasket",
            "partAreaCommon"
          ]
        },
        "partAreaCommon": {
          "type": "MATH",
          "label": "Part area 通用",
          "formula": "((subMaterialLength + punchingEdgeMaterialLength) * (subMaterialWidth + punchingEdgeMaterialWidth)) / 1000000"
        },
        "partAreaGasket": {
          "type": "MATH",
          "label": "Part area subType2 =  Gasket 且 MaterialSpec = UL_Glay  | Non_UL_Glay | UL_Black | Non_UL_Black",
          "formula": "(2 * ( subMaterialWidth + subMaterialHeight )) * subMaterialLength"
        },
        "punchingEdgeMaterialLength": {
          "type": "MATH",
          "label": "沖型邊料 L",
          "formula": "_stampingType?6:0"
        },
        "punchingEdgeMaterialWidth": {
          "type": "MATH",
          "label": "沖型邊料 W",
          "formula": "_stampingType?6:0"
        },
        "lossRate": {
          "type": "MATH",
          "label": "Loss rate",
          "formula": "_stampingType?0:0"
        }
      },
      "output": {
        "total": "total",
        "componentCost": "componentCost",
        "assembleCost": "assembleCost",
        "partArea": "partArea"
      },
      "scope": {
        "subType2": "subType2",
        "subMaterial": "subMaterial",
        "subMaterialspec": "subMaterialspec",
        "subMaterialPerCost": "subMaterialPerCost",
        "subMaterialLength": "subMaterialLength",
        "subMaterialWidth": "subMaterialWidth",
        "subMaterialHeight": "subMaterialHeight",
        "assyCount": "assyCount",
        "usingSubMaterial": "usingSubMaterial"
      },
      "constant": {
        "AssyTime": {
          "label": "輔料組裝Assy Time",
          "value": 7
        },
        "AssyPerCost": {
          "label": "輔料組裝單價",
          "value": 0.000714285714
        }
      },
      "global": {
        "_stampingType": {
          "type": "VARIABLE",
          "label": "1:衝切/0:裁切",
          "bykey": "stampingType",
          "groups": [
            "materialCost"
          ]
        }
      }
    }
  }
};

export default data;
