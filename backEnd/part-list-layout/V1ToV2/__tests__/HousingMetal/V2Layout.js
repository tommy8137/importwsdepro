/* eslint-disable quote-props */
/* eslint-disable quotes */
const data = {
  "version": 2,
  "layout": [
    {
      "key": "toolingPartList",
      "label": "Tooling Part List",
      "group": [
        "housingMetal"
      ],
      "items": [
        {
          "key": "hmUser",
          "label": "Fill by ME RD",
          "multiple": false,
          "items": [
            {
              "key": "hmInputBomLevel",
              "displayConfig": {
                "display": false,
                "grids": 1,
                "depends": {
                  "action": "lock",
                  "condition": {}
                }
              },
              "variableName": "level",
              "needExe": false,
              "fieldType": "variable",
              "dataType": "string",
              "require": false,
              "default": null
            },
            {
              "key": "hmItem",
              "label": "item",
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": null,
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmpartname",
              "label": "partName",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "displayConfig": {
                "grids": 2,
                "display": true
              },
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "hmpartnumber",
              "label": "partNumber",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmuploadimage",
              "label": "圖示",
              "uploadUrl": "bom/partlist/uploadImage",
              "getUrl": "bom/partlist/getImage/:{imageid}",
              "displayConfig": {
                "grids": 2,
                "display": true
              },
              "fieldType": "uploadImage",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true
            },
            {
              "key": "hmmaterial",
              "label": "Material",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmmaterialdensity",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "hmmaterial"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "hmmaterial": "AL1050",
                    "hmmaterialdensity": 2.75
                  },
                  {
                    "hmmaterial": "AL5052",
                    "hmmaterialdensity": 2.75
                  },
                  {
                    "hmmaterial": "SUS301",
                    "hmmaterialdensity": 7.93
                  },
                  {
                    "hmmaterial": "SUS304",
                    "hmmaterialdensity": 7.93
                  },
                  {
                    "hmmaterial": "SUS403",
                    "hmmaterialdensity": 7.93
                  },
                  {
                    "hmmaterial": "SUS430",
                    "hmmaterialdensity": 7.93
                  },
                  {
                    "hmmaterial": "SECC",
                    "hmmaterialdensity": 7.85
                  },
                  {
                    "hmmaterial": "SGCC",
                    "hmmaterialdensity": 7.85
                  },
                  {
                    "hmmaterial": "SPCC",
                    "hmmaterialdensity": 7.85
                  },
                  {
                    "hmmaterial": "SGLD",
                    "hmmaterialdensity": 7.85
                  },
                  {
                    "hmmaterial": "SPTE",
                    "hmmaterialdensity": 7.85
                  },
                  {
                    "hmmaterial": "Cu3604",
                    "hmmaterialdensity": 8.9
                  },
                  {
                    "hmmaterial": "低碳鋼1018",
                    "hmmaterialdensity": 7.85
                  },
                  {
                    "hmmaterial": "SUS410",
                    "hmmaterialdensity": 7.93
                  },
                  {
                    "hmmaterial": "磷青銅",
                    "hmmaterialdensity": 8.9
                  },
                  {
                    "hmmaterial": "PH-CU",
                    "hmmaterialdensity": 8.9
                  },
                  {
                    "hmmaterial": "CU1100",
                    "hmmaterialdensity": 8.9
                  },
                  {
                    "hmmaterial": "CU01",
                    "hmmaterialdensity": 8.9
                  },
                  {
                    "hmmaterial": "C18400",
                    "hmmaterialdensity": 8.8
                  },
                  {
                    "hmmaterial": "AL6061",
                    "hmmaterialdensity": 2.71
                  },
                  {
                    "hmmaterial": "AL6063",
                    "hmmaterialdensity": 2.71
                  },
                  {
                    "hmmaterial": "KU400",
                    "hmmaterialdensity": 7.85
                  },
                  {
                    "hmmaterial": "皮銅",
                    "hmmaterialdensity": 8.8
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "hmmaterialprice",
              "label": "material price",
              "url": "bom/partlist/gethmMaterialPrice/:{hmmaterial}/:{hmthickness}",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "fieldType": "fetch-hidden",
              "multiple": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessPrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessMaterial",
                "cmfProcessThickness"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 0.15,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 0.2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 0.3,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 0.4,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 0.6,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 0.8,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 3.7
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 1.2,
                    "cmfProcessPrice": 3.7
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 1.5,
                    "cmfProcessPrice": 3.6
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 1.6,
                    "cmfProcessPrice": 3.6
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 2,
                    "cmfProcessPrice": 3.5
                  },
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessThickness": 3,
                    "cmfProcessPrice": 3.5
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 0.3,
                    "cmfProcessPrice": 4.3
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 0.4,
                    "cmfProcessPrice": 4.3
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 4.2
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 0.6,
                    "cmfProcessPrice": 4.2
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 0.8,
                    "cmfProcessPrice": 4.2
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 1.2,
                    "cmfProcessPrice": 4.1
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 1.5,
                    "cmfProcessPrice": 4
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 1.6,
                    "cmfProcessPrice": 4
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 2,
                    "cmfProcessPrice": 3.9
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessThickness": 3,
                    "cmfProcessPrice": 3.9
                  },
                  {
                    "cmfProcessMaterial": "AL6063",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 1.39
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessThickness": 0.6,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessThickness": 0.8,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessThickness": 1.2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessThickness": 1.6,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessThickness": 2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 1.39
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessThickness": 0.6,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessThickness": 0.8,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessThickness": 1.2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessThickness": 1.6,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessThickness": 2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SPCC",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 0.95
                  },
                  {
                    "cmfProcessMaterial": "SPCC",
                    "cmfProcessThickness": 0.6,
                    "cmfProcessPrice": 0.9
                  },
                  {
                    "cmfProcessMaterial": "SPCC",
                    "cmfProcessThickness": 0.8,
                    "cmfProcessPrice": 0.8
                  },
                  {
                    "cmfProcessMaterial": "SPCC",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0.8
                  },
                  {
                    "cmfProcessMaterial": "SPCC",
                    "cmfProcessThickness": 1.2,
                    "cmfProcessPrice": 0.8
                  },
                  {
                    "cmfProcessMaterial": "SPCC",
                    "cmfProcessThickness": 1.6,
                    "cmfProcessPrice": 0.8
                  },
                  {
                    "cmfProcessMaterial": "SPTE",
                    "cmfProcessThickness": 0.15,
                    "cmfProcessPrice": 2.4
                  },
                  {
                    "cmfProcessMaterial": "SPTE",
                    "cmfProcessThickness": 0.2,
                    "cmfProcessPrice": 2.3
                  },
                  {
                    "cmfProcessMaterial": "SPTE",
                    "cmfProcessThickness": 0.3,
                    "cmfProcessPrice": 2.1
                  },
                  {
                    "cmfProcessMaterial": "SPTE",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 2
                  },
                  {
                    "cmfProcessMaterial": "PH-CU",
                    "cmfProcessThickness": 0.1,
                    "cmfProcessPrice": 12
                  },
                  {
                    "cmfProcessMaterial": "PH-CU",
                    "cmfProcessThickness": 0.15,
                    "cmfProcessPrice": 10
                  },
                  {
                    "cmfProcessMaterial": "PH-CU",
                    "cmfProcessThickness": 0.2,
                    "cmfProcessPrice": 9
                  },
                  {
                    "cmfProcessMaterial": "PH-CU",
                    "cmfProcessThickness": 0.3,
                    "cmfProcessPrice": 7
                  },
                  {
                    "cmfProcessMaterial": "CU01",
                    "cmfProcessThickness": 0.3
                  },
                  {
                    "cmfProcessMaterial": "C1840",
                    "cmfProcessThickness": 0.3
                  },
                  {
                    "cmfProcessMaterial": "CU1100",
                    "cmfProcessThickness": 0.1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "CU1100",
                    "cmfProcessThickness": 0.2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "CU1100",
                    "cmfProcessThickness": 0.3,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "CU1100",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "CU1100",
                    "cmfProcessThickness": 0.6,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "CU1100",
                    "cmfProcessThickness": 0.8,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "TMS02",
                    "cmfProcessThickness": 0.3
                  },
                  {
                    "cmfProcessMaterial": "KU400",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "KU400",
                    "cmfProcessThickness": 0.8,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "KU400",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "KU400",
                    "cmfProcessThickness": 1.2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "KU400",
                    "cmfProcessThickness": 1.5,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "KU400",
                    "cmfProcessThickness": 2,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS410",
                    "cmfProcessPrice": 1
                  },
                  {
                    "cmfProcessMaterial": "SUS301",
                    "cmfProcessThickness": 0.15,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS301",
                    "cmfProcessThickness": 0.3,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS301",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS301",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS304",
                    "cmfProcessThickness": 0.15,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS304",
                    "cmfProcessThickness": 0.3,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS304",
                    "cmfProcessThickness": 0.5,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "SUS304",
                    "cmfProcessThickness": 1,
                    "cmfProcessPrice": 0
                  },
                  {
                    "cmfProcessMaterial": "低碳鋼1018",
                    "cmfProcessPrice": 0.5
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "cmfProcessDensity",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessMaterial"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessMaterial": "AL1050",
                    "cmfProcessDensity": 2.75
                  },
                  {
                    "cmfProcessMaterial": "AL5052",
                    "cmfProcessDensity": 2.75
                  },
                  {
                    "cmfProcessMaterial": "SUS301",
                    "cmfProcessDensity": 7.93
                  },
                  {
                    "cmfProcessMaterial": "SUS304",
                    "cmfProcessDensity": 7.93
                  },
                  {
                    "cmfProcessMaterial": "SUS403",
                    "cmfProcessDensity": 7.93
                  },
                  {
                    "cmfProcessMaterial": "SUS430",
                    "cmfProcessDensity": 7.93
                  },
                  {
                    "cmfProcessMaterial": "SECC",
                    "cmfProcessDensity": 7.85
                  },
                  {
                    "cmfProcessMaterial": "SGCC",
                    "cmfProcessDensity": 7.85
                  },
                  {
                    "cmfProcessMaterial": "SPCC",
                    "cmfProcessDensity": 7.85
                  },
                  {
                    "cmfProcessMaterial": "SGLD",
                    "cmfProcessDensity": 7.85
                  },
                  {
                    "cmfProcessMaterial": "SPTE",
                    "cmfProcessDensity": 7.85
                  },
                  {
                    "cmfProcessMaterial": "Cu3604",
                    "cmfProcessDensity": 8.9
                  },
                  {
                    "cmfProcessMaterial": "低碳鋼1018",
                    "cmfProcessDensity": 7.85
                  },
                  {
                    "cmfProcessMaterial": "SUS410",
                    "cmfProcessDensity": 7.93
                  },
                  {
                    "cmfProcessMaterial": "磷青銅",
                    "cmfProcessDensity": 8.9
                  },
                  {
                    "cmfProcessMaterial": "PH-CU",
                    "cmfProcessDensity": 8.9
                  },
                  {
                    "cmfProcessMaterial": "CU1100",
                    "cmfProcessDensity": 8.9
                  },
                  {
                    "cmfProcessMaterial": "CU01",
                    "cmfProcessDensity": 8.9
                  },
                  {
                    "cmfProcessMaterial": "C18400",
                    "cmfProcessDensity": 8.8
                  },
                  {
                    "cmfProcessMaterial": "AL6061",
                    "cmfProcessDensity": 2.71
                  },
                  {
                    "cmfProcessMaterial": "AL6063",
                    "cmfProcessDensity": 2.71
                  },
                  {
                    "cmfProcessMaterial": "KU400",
                    "cmfProcessDensity": 7.85
                  },
                  {
                    "cmfProcessMaterial": "皮銅",
                    "cmfProcessDensity": 8.8
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "hmthickness",
              "label": "Thickness",
              "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmpartssizespec",
              "label": "Part Size/Spec. (W*L*H mm)-(成品尺寸)",
              "displayConfig": {
                "grids": 1.5,
                "display": true
              },
              "items": [
                {
                  "key": "hmpartssizewidth",
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "label": "寬度(W)",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                },
                {
                  "key": "hmpartssizelength",
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "label": "長度(L)",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                },
                {
                  "key": "hmpartssizehigh",
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "label": "高度(H)",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
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
              "key": "hmpartsexpandsize",
              "label": "Part Size/Spec. (W*L*H mm)-(成品展開尺寸)",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "items": [
                {
                  "key": "hmpartsexpandwidth",
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "label": "寬度(W)",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                },
                {
                  "key": "hmpartsexpandlength",
                  "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "label": "長度(L)",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
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
              "key": "hmSecondProcess",
              "label": "二次加工",
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "items": [
                {
                  "key": "hmStandOff",
                  "label": "Standoff數量/規格",
                  "fieldType": "input",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": null,
                  "needExe": true,
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmRivetCount",
                  "label": "令件鉚合數量/規格",
                  "fieldType": "input",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": null,
                  "needExe": true,
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmTappingCount",
                  "label": "攻牙數量/規格",
                  "fieldType": "input",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": null,
                  "needExe": true,
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmSelfriveCount",
                  "label": "自鉚數量/規格",
                  "fieldType": "input",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": null,
                  "needExe": true,
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmHoleCount",
                  "label": "網孔/風孔數量",
                  "fieldType": "input",
                  "dataType": "int",
                  "multiple": false,
                  "require": false,
                  "constrains": [],
                  "disabledConfig": {
                    "func": "() => {}",
                    "params": []
                  },
                  "default": 0,
                  "needExe": true,
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                }
              ],
              "fieldType": "compositeInline",
              "multiple": false,
              "needExe": true,
              "switchable": false,
              "visiable": true,
              "maxGroupCount": null,
              "inline": true
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
          "key": "hmTooling",
          "label": "Fill by tooling Team",
          "multiple": false,
          "items": [
            {
              "key": "hmToolingMaterialSize",
              "label": "邊料尺寸",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "items": [
                {
                  "key": "hmToolingMaterialWidth",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "label": "W",
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
                  "key": "hmToolingMaterialLength",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "label": "L",
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
              "key": "hmToolingMaterialExpandSize",
              "label": "素材展開尺寸(mm)",
              "displayConfig": {
                "grids": 2,
                "display": true
              },
              "items": [
                {
                  "key": "hmToolingMaterialExpandWidth",
                  "label": "W",
                  "url": "bom/partlist/getMaterialExpandSize/:{hmpartsexpandwidth}/:{hmpartsexpandlength}/:{hmToolingMaterialWidth}/:{hmToolingMaterialLength}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                },
                {
                  "key": "hmToolingMaterialExpandLength",
                  "label": "L",
                  "url": "bom/partlist/getMaterialExpandSize/:{hmpartsexpandwidth}/:{hmpartsexpandlength}/:{hmToolingMaterialWidth}/:{hmToolingMaterialLength}",
                  "displayConfig": {
                    "grids": 0.5,
                    "display": true
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
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
              "key": "hmToolingIntervalPrice",
              "label": "區間費用",
              "url": "bom/partlist/getIntervalPrice/:{bom_id}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "fieldType": "fetch-hidden",
              "multiple": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "hmToolingWeight",
              "label": "淨重(成品重量)(g)",
              "url": "bom/partlist/netWeight/:{hmthickness}/:{hmpartsexpandwidth}/:{hmpartsexpandlength}/:{hmmaterial}",
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingMaterialWeight",
              "label": "毛重(素材重量)(g)",
              "url": "bom/partlist/grossWeight/:{hmthickness}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}/:{hmmaterial}",
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingHoleCount",
              "label": "穴數",
              "default": 1,
              "fieldType": "input",
              "dataType": "int",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingStageDie",
              "label": "工程模",
              "require": false,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "items": [
                {
                  "key": "hmToolingStageDieCount",
                  "label": "工程數",
                  "require": false,
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
                },
                {
                  "key": "hmToolingStageDiePress",
                  "label": "沖壓機台(T)",
                  "url": "bom/partlist/stageDiePress/:{hmToolingStageDieCount}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}",
                  "displayConfig": {
                    "grids": 1,
                    "display": true
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true
                },
                {
                  "key": "hmToolingStageDieModuleCost",
                  "label": "Stage Die Module Cost",
                  "url": "bom/partlist/stageDiePress/:{hmToolingStageDieCount}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}",
                  "displayConfig": {
                    "display": false,
                    "grids": 1
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
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
              "key": "hmToolingProgressiveDie",
              "label": "連續模",
              "require": false,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "items": [
                {
                  "key": "hmToolingProgressiveDieCount",
                  "label": "工程數",
                  "require": false,
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
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmToolingProgressiveDieStation",
                  "label": "連續模工站",
                  "require": false,
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
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmToolingProgressiveDiePress",
                  "label": "沖壓機台(T)",
                  "url": "bom/partlist/progressiveDiePress/:{hmToolingProgressiveDieCount}/:{hmToolingProgressiveDieStation}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true,
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmToolingProgressiveDieModuleCost",
                  "label": "Progressive Die Module Cost",
                  "url": "bom/partlist/progressiveDiePress/:{hmToolingProgressiveDieCount}/:{hmToolingProgressiveDieStation}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true,
                  "displayConfigFalse": {
                    "display": false,
                    "grids": 1,
                    "depends": {
                      "action": "lock",
                      "condition": {}
                    }
                  }
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
              "key": "hmToolingRivetingDie",
              "label": "鉚合模",
              "require": false,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "items": [
                {
                  "key": "hmToolingRivetingDieCount",
                  "label": "工程數",
                  "require": false,
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
                  "placeholder": "",
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmToolingRivetingDiePress",
                  "label": "沖壓機台(T)",
                  "url": "bom/partlist/rivetingDiePress/:{hmToolingRivetingDieCount}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}/:{hmToolingProgressiveDieStation}",
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
                  "edit": false,
                  "constrains": [],
                  "default": null,
                  "needExe": true,
                  "displayConfig": {
                    "display": true,
                    "grids": 1
                  }
                },
                {
                  "key": "hmToolingRivetingDieModuleCost",
                  "label": "Riveting Die Module Cost",
                  "url": "bom/partlist/rivetingDiePress/:{hmToolingRivetingDieCount}/:{hmToolingMaterialExpandWidth}/:{hmToolingMaterialExpandLength}/:{hmToolingProgressiveDieStation}",
                  "displayConfig": {
                    "display": false,
                    "grids": 1
                  },
                  "fieldType": "fetch",
                  "dataType": "string",
                  "multiple": false,
                  "require": false,
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
              "key": "hmToolingTotalCount",
              "label": "總工程數",
              "url": "bom/partlist/getDieInfo/:{hmToolingStageDieCount}/:{hmToolingProgressiveDieCount}/:{hmToolingRivetingDieCount}",
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingModuleMode",
              "label": "模具型式",
              "url": "bom/partlist/getDieInfo/:{hmToolingStageDieCount}/:{hmToolingProgressiveDieCount}/:{hmToolingRivetingDieCount}",
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingModuleFeature",
              "label": "模具特徵",
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": null,
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingModuleFactory",
              "label": "模具廠",
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": null,
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingMoldingManufacturer",
              "label": "成型廠商",
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": null,
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingSource",
              "label": "生產地",
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": null,
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingPayout",
              "label": "掛帳廠別",
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": null,
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingBonded",
              "label": "保稅or非保稅",
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "default": null,
              "needExe": true,
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "hmToolingTSDate",
              "label": "TS Date",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "fieldType": "inputDate",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "hmToolingT1Date",
              "label": "T1 Date",
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "fieldType": "inputDate",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "hmToolingRemark",
              "label": "備註",
              "displayConfig": {
                "grids": 1.5,
                "display": true
              },
              "fieldType": "textarea",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
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
        }
      ],
      "fieldType": "tab",
      "visiable": false,
      "needExe": true
    },
    {
      "key": "CMFProcessList",
      "label": "CMF and Process List",
      "visiable": true,
      "group": [
        "housingMetal"
      ],
      "items": [
        {
          "key": "cmfProcessListUltrasonicClean",
          "label": "超音波清洗",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListultrasonicCleanExist",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
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
          "key": "cmfProcessListAnode",
          "label": "陽極",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListFirstAnodeCheckBox",
              "label": "一陽(Exist)",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListFirstAnodeColor",
              "label": "一陽(color)",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListFirstAnodeColor": "鋁本色",
                    "cmfProcessListFirstAnodeTime": 30,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "紅色",
                    "cmfProcessListFirstAnodeTime": 45,
                    "cmfProcessListFirstAnodeRatio": 1.5,
                    "cmfProcessListFirstAnodePrice": 24
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "黑色",
                    "cmfProcessListFirstAnodeTime": 50,
                    "cmfProcessListFirstAnodeRatio": 1.67,
                    "cmfProcessListFirstAnodePrice": 26.67
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "銀色",
                    "cmfProcessListFirstAnodeTime": 30,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "灰色",
                    "cmfProcessListFirstAnodeTime": 30,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "香檳金",
                    "cmfProcessListFirstAnodeTime": 45,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListFirstAnodeCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessListFirstAnodePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListFirstAnodeColor"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListFirstAnodeColor": "鋁本色",
                    "cmfProcessListFirstAnodeTime": 30,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "紅色",
                    "cmfProcessListFirstAnodeTime": 45,
                    "cmfProcessListFirstAnodeRatio": 1.5,
                    "cmfProcessListFirstAnodePrice": 24
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "黑色",
                    "cmfProcessListFirstAnodeTime": 50,
                    "cmfProcessListFirstAnodeRatio": 1.67,
                    "cmfProcessListFirstAnodePrice": 26.67
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "銀色",
                    "cmfProcessListFirstAnodeTime": 30,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "灰色",
                    "cmfProcessListFirstAnodeTime": 30,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  },
                  {
                    "cmfProcessListFirstAnodeColor": "香檳金",
                    "cmfProcessListFirstAnodeTime": 45,
                    "cmfProcessListFirstAnodeRatio": 1,
                    "cmfProcessListFirstAnodePrice": 16
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "cmfProcessListSecondAnodeCheckBox",
              "label": "二陽(Exist)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListFirstAnodeColor": true
                  }
                },
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListSecondAnodeColor",
              "label": "二陽(color)",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListSecondAnodeColor": "鋁本色",
                    "cmfProcessListSecondAnodeTime": 30,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "紅色",
                    "cmfProcessListSecondAnodeTime": 45,
                    "cmfProcessListSecondAnodeRatio": 1.5,
                    "cmfProcessListSecondAnodePrice": 45
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "黑色",
                    "cmfProcessListSecondAnodeTime": 50,
                    "cmfProcessListSecondAnodeRatio": 1.67,
                    "cmfProcessListSecondAnodePrice": 26.67
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "銀色",
                    "cmfProcessListSecondAnodeTime": 30,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "灰色",
                    "cmfProcessListSecondAnodeTime": 30,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "香檳金",
                    "cmfProcessListSecondAnodeTime": 45,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListSecondAnodeCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessListSecondAnodePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListSecondAnodeColor"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListSecondAnodeColor": "鋁本色",
                    "cmfProcessListSecondAnodeTime": 30,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "紅色",
                    "cmfProcessListSecondAnodeTime": 45,
                    "cmfProcessListSecondAnodeRatio": 1.5,
                    "cmfProcessListSecondAnodePrice": 45
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "黑色",
                    "cmfProcessListSecondAnodeTime": 50,
                    "cmfProcessListSecondAnodeRatio": 1.67,
                    "cmfProcessListSecondAnodePrice": 26.67
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "銀色",
                    "cmfProcessListSecondAnodeTime": 30,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "灰色",
                    "cmfProcessListSecondAnodeTime": 30,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  },
                  {
                    "cmfProcessListSecondAnodeColor": "香檳金",
                    "cmfProcessListSecondAnodeTime": 45,
                    "cmfProcessListSecondAnodeRatio": 1,
                    "cmfProcessListSecondAnodePrice": 16
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
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
          "key": "cmfProcessListSandBlast",
          "label": "噴砂",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListSandBlastCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListSandBlastSide",
              "label": "單雙面",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListSandBlastSide": "單面",
                    "cmfProcessListSandBlastSideCount": 1
                  },
                  {
                    "cmfProcessListSandBlastSide": "雙面",
                    "cmfProcessListSandBlastSideCount": 2
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListSandBlastCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessListSandBlastSideCount",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListSandBlastSide"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListSandBlastSide": "單面",
                    "cmfProcessListSandBlastSideCount": 1
                  },
                  {
                    "cmfProcessListSandBlastSide": "雙面",
                    "cmfProcessListSandBlastSideCount": 2
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "int",
              "default": 0,
              "needExe": false
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
          "key": "cmfProcessListHairLine",
          "label": "髮絲",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListHairLineCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListHairLineArea",
              "label": "加工面積(mm^2)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListHairLineCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListPainting",
          "label": "Painting噴漆",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListPaintingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListPaintingTypeAndColor",
              "label": "Type and color",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListPaintingTypeAndColor": "粉體漆：(一般素色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 5.7554,
                    "CmfProcessListPaintingPriceRMB": 40
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "粉體漆：(特殊顏色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 15.8273,
                    "CmfProcessListPaintingPriceRMB": 110
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(一般顏色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 11.5108,
                    "CmfProcessListPaintingPriceRMB": 80
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Pike Silver 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 14.3,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Shadow Black  1 coat PU with transparency and Black primer)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 25.84,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Shadow Black 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 13.48,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Mineral Silver 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 11.51,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Turbo Silver-Ano 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 17.38,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Q-Coat Dragonfly Blue)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 17.5,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Q-Coat Cardinal Red)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 28.44,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(UV soft touch)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 21.5827,
                    "CmfProcessListPaintingPriceRMB": 150
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPaintingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "CmfProcessListPaintingPriceUSD",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListPaintingTypeAndColor"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListPaintingTypeAndColor": "粉體漆：(一般素色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 5.7554,
                    "CmfProcessListPaintingPriceRMB": 40
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "粉體漆：(特殊顏色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 15.8273,
                    "CmfProcessListPaintingPriceRMB": 110
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(一般顏色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 11.5108,
                    "CmfProcessListPaintingPriceRMB": 80
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Pike Silver 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 14.3,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Shadow Black  1 coat PU with transparency and Black primer)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 25.84,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Shadow Black 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 13.48,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Mineral Silver 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 11.51,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Turbo Silver-Ano 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 17.38,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Q-Coat Dragonfly Blue)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 17.5,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Q-Coat Cardinal Red)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 28.44,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(UV soft touch)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 21.5827,
                    "CmfProcessListPaintingPriceRMB": 150
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "CmfProcessListPaintingPriceRMB",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListPaintingTypeAndColor"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListPaintingTypeAndColor": "粉體漆：(一般素色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 5.7554,
                    "CmfProcessListPaintingPriceRMB": 40
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "粉體漆：(特殊顏色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 15.8273,
                    "CmfProcessListPaintingPriceRMB": 110
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(一般顏色)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 11.5108,
                    "CmfProcessListPaintingPriceRMB": 80
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Pike Silver 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 14.3,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Shadow Black  1 coat PU with transparency and Black primer)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 25.84,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Shadow Black 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 13.48,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Mineral Silver 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 11.51,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Turbo Silver-Ano 1 coat PU)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 17.38,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Q-Coat Dragonfly Blue)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 17.5,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(Q-Coat Cardinal Red)",
                    "Customer": "HP/DT",
                    "CmfProcessListPaintingPriceUSD": 28.44,
                    "CmfProcessListPaintingPriceRMB": null
                  },
                  {
                    "cmfProcessListPaintingTypeAndColor": "液體漆：(UV soft touch)",
                    "Customer": null,
                    "CmfProcessListPaintingPriceUSD": 21.5827,
                    "CmfProcessListPaintingPriceRMB": 150
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "cmfProcessListPaintingArea",
              "label": "噴塗面積",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPaintingCheckBox": true
                  }
                },
                "grids": 1,
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
              "key": "cmfProcessListPaintingFilmThickness",
              "label": "膜厚(mm)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPaintingCheckBox": true
                  }
                },
                "grids": 1,
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
              "key": "cmfProcessListPaintingCount",
              "label": "噴塗次數",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPaintingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
              "key": "cmfProcessListPaintingColor",
              "label": "Color",
              "require": false,
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPaintingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "string",
              "multiple": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
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
          "key": "cmfProcessListThermalBonding",
          "label": "Thermal Bonding熱壓",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListThermalBondingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListThermalBondingGlueType",
              "label": "膠水型號",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListThermalBondingGlueType": "DEVCON DV14167",
                    "cmfProcessListThermalBondingGluePrice": 0.3428,
                    "cmfProcessListThermalBondingGlueDensity": 0.97
                  },
                  {
                    "cmfProcessListThermalBondingGlueType": "3M 8160",
                    "cmfProcessListThermalBondingGluePrice": null,
                    "cmfProcessListThermalBondingGlueDensity": null
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListThermalBondingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessListThermalBondingGluePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListThermalBondingGlueType"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListThermalBondingGlueType": "DEVCON DV14167",
                    "cmfProcessListThermalBondingGluePrice": 0.3428,
                    "cmfProcessListThermalBondingGlueDensity": 0.97
                  },
                  {
                    "cmfProcessListThermalBondingGlueType": "3M 8160",
                    "cmfProcessListThermalBondingGluePrice": null,
                    "cmfProcessListThermalBondingGlueDensity": null
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "cmfProcessListThermalBondingGlueDensity",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListThermalBondingGlueType"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListThermalBondingGlueType": "DEVCON DV14167",
                    "cmfProcessListThermalBondingGluePrice": 0.3428,
                    "cmfProcessListThermalBondingGlueDensity": 0.97
                  },
                  {
                    "cmfProcessListThermalBondingGlueType": "3M 8160",
                    "cmfProcessListThermalBondingGluePrice": null,
                    "cmfProcessListThermalBondingGlueDensity": null
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "cmfProcessListThermalBondingPathLength",
              "label": "路徑總長",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListThermalBondingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "default": 0,
              "fieldType": "input",
              "dataType": "int",
              "multiple": false,
              "require": false,
              "constrains": [],
              "disabledConfig": {
                "func": "() => {}",
                "params": []
              },
              "needExe": true,
              "placeholder": ""
            },
            {
              "key": "cmfProcessListThermalBondingGlueSyringeDiameter",
              "label": "膠水針筒內徑",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListThermalBondingGlueSyringeDiameter": 0.2
                  },
                  {
                    "cmfProcessListThermalBondingGlueSyringeDiameter": 0.4
                  },
                  {
                    "cmfProcessListThermalBondingGlueSyringeDiameter": 0.6
                  },
                  {
                    "cmfProcessListThermalBondingGlueSyringeDiameter": 0.8
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListThermalBondingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessListThermalBondingGlueWeight",
              "label": "膠水重量",
              "url": "bom/partlist/getGlueWeight/:{productType}/:{cmfProcessListThermalBondingPathLength}/:{cmfProcessListThermalBondingGlueSyringeDiameter}",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListThermalBondingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "fetch",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "edit": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessListThermalBondingCycleTime",
              "label": "Cycle Time(sec)",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListThermalBondingCycleTime": "90sec",
                    "cmfProcessListThermalBondingCycleTimeValue": 90,
                    "cmfProcessListThermalBondingCycleTimePrice": 0.00303
                  },
                  {
                    "cmfProcessListThermalBondingCycleTime": "70sec",
                    "cmfProcessListThermalBondingCycleTimeValue": 70,
                    "cmfProcessListThermalBondingCycleTimePrice": 0.00303
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListThermalBondingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
            },
            {
              "key": "cmfProcessListThermalBondingCycleTimePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListThermalBondingCycleTime"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListThermalBondingCycleTime": "90sec",
                    "cmfProcessListThermalBondingCycleTimeValue": 90,
                    "cmfProcessListThermalBondingCycleTimePrice": 0.00303
                  },
                  {
                    "cmfProcessListThermalBondingCycleTime": "70sec",
                    "cmfProcessListThermalBondingCycleTimeValue": 70,
                    "cmfProcessListThermalBondingCycleTimePrice": 0.00303
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "string",
              "default": null,
              "needExe": false
            },
            {
              "key": "cmfProcessListThermalBondingCycleTimeValue",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListThermalBondingCycleTime"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "cmfProcessListThermalBondingCycleTime": "90sec",
                    "cmfProcessListThermalBondingCycleTimeValue": 90,
                    "cmfProcessListThermalBondingCycleTimePrice": 0.00303
                  },
                  {
                    "cmfProcessListThermalBondingCycleTime": "70sec",
                    "cmfProcessListThermalBondingCycleTimeValue": 70,
                    "cmfProcessListThermalBondingCycleTimePrice": 0.00303
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "string",
              "default": null,
              "needExe": false
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
          "key": "cmfProcessListSingleTapping",
          "label": "單點攻牙",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListSingleTappingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListSingleTappingCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListSingleTappingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListMultiTapping",
          "label": "多點攻牙",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListMultiTappingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListMultiTappingCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListMultiTappingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListSingleSpotWelding",
          "label": "單點點焊",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListSingleSpotWeldingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListSingleSpotWeldingCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListSingleSpotWeldingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListMultiSpotWelding",
          "label": "多點點焊",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListMultiSpotWeldingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListMultiSpotWeldingCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListMultiSpotWeldingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListPopRivet",
          "label": "放拉釘",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListPopRivetCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListPopRivetCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPopRivetCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListRivet",
          "label": "拉鉚釘",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListRicetCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListRicetCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListRicetCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListHandMakeDraw",
          "label": "手工塗黑",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListHandMakeDrawCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListHandMakeDrawCount",
              "label": "加工面積(mm^2)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListHandMakeDrawCheckBox": true
                  }
                },
                "grids": 1,
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListScreenPrinting",
          "label": "Printing網印",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListScreenPrintingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListScreenPrintingCount",
              "label": "次數",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListScreenPrintingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListPadPrinting",
          "label": "Printing移印",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListPadPrintingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListPadPrintingCount",
              "label": "次數",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPadPrintingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListSilkPrint",
          "label": "Silk Print",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListSilkPrintCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListSilkPrintCount",
              "label": "次數",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListSilkPrintCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListCNC",
          "label": "CNC(公模面)",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListCNCCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListCNCArea",
              "label": "加工面積(mm^2)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListCNCCheckBox": true
                  }
                },
                "grids": 1,
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListCNCPL",
          "label": "CNC(PL處)",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListCNCPLCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListCNCPLLength",
              "label": "加工長度(mm)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListCNCPLCheckBox": true
                  }
                },
                "grids": 1,
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListDrillCut",
          "label": "鑽切(高光)",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListDrillCutCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListDrillCutArea",
              "label": "加工面積(mm^2)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListDrillCutCheckBox": true
                  }
                },
                "grids": 1,
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListLaserPrint",
          "label": "鐳雕(公模面)",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListLaserPrintCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListLaserPrintArea",
              "label": "加工面積(mm^2)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListLaserPrintCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListLaserPrintIcon",
          "label": "鐳雕(icon)",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListLaserPrintIconCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListLaserPrintIconCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListLaserPrintIconCheckBox": true
                  }
                },
                "grids": 1,
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "cmfProcessListPolishing",
          "label": "打磨",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListPolishingAutoCheckBox",
              "label": "自動/Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListPolishingAutoArea",
              "label": "自動/加工面積(mm^2)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPolishingAutoCheckBox": true
                  }
                },
                "grids": 1,
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
              "key": "cmfProcessListPolishingArtificialCheckBox",
              "label": "人工/Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListPolishingArtificialArea",
              "label": "人工/加工面積(mm^2)",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListPolishingArtificialCheckBox": true
                  }
                },
                "grids": 1,
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
              "key": "cmfProcessListPolishingSpeed",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListPolishingType"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "cmfProcessListPolishingType": "Auto",
                    "cmfProcessListPolishingSpeed": 1738,
                    "cmfProcessListPolishingPrice": 0.0022
                  },
                  {
                    "cmfProcessListPolishingType": "Artificial",
                    "cmfProcessListPolishingSpeed": 57,
                    "cmfProcessListPolishingPrice": 0.005
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "cmfProcessListPolishingPrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "cmfProcessListPolishingType"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "cmfProcessListPolishingType": "Auto",
                    "cmfProcessListPolishingSpeed": 1738,
                    "cmfProcessListPolishingPrice": 0.0022
                  },
                  {
                    "cmfProcessListPolishingType": "Artificial",
                    "cmfProcessListPolishingSpeed": 57,
                    "cmfProcessListPolishingPrice": 0.005
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
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
          "key": "cmfProcessListDrilling",
          "label": "鑽孔",
          "multiple": false,
          "items": [
            {
              "key": "cmfProcessListDrillingCheckBox",
              "label": "Exist",
              "displayConfig": {
                "grids": 0.5,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "require": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "cmfProcessListDrillingCount",
              "label": "數量",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "cmfProcessListDrillingCheckBox": true
                  }
                },
                "grids": 1,
                "display": true
              },
              "fieldType": "input",
              "dataType": "int",
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
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        }
      ],
      "fieldType": "tab",
      "needExe": true
    }
  ],
  "formulas": {
    "housingMetal": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "material_cost + stamping_cost + secondary_processing_cost + packageCost + (secondary_processing_cost + stamping_cost) * 0.1",
          "label": "計算結果"
        },
        "material_cost": {
          "type": "MATH",
          "formula": "hmToolingMaterialExpandWidth * hmToolingMaterialExpandLength * hmthickness * hmmaterialdensity * hmmaterialprice / 1000000 * (1 + material_loss)",
          "label": "材料費"
        },
        "material_loss": {
          "type": "FUNC",
          "formula": "(hmmaterial) => { return hmmaterial.split(0,2) == 'AL' ? 0.25:0.03 }",
          "label": "loss of materials",
          "param": [
            "hmmaterial"
          ]
        },
        "stamping_cost": {
          "type": "MATH",
          "formula": "hmToolingStageDieCost + hmToolingProgressiveDieCost + hmToolingRivetingDieCost",
          "label": "沖壓費"
        },
        "hmToolingStageDieCost": {
          "type": "MATH",
          "formula": "hmToolingStageDieModuleCost * hmToolingStageDieCount / hmToolingHoleCount",
          "label": "工程模"
        },
        "hmToolingProgressiveDieCost": {
          "type": "MATH",
          "formula": "hmToolingProgressiveDieModuleCost * hmToolingProgressiveDieCount / hmToolingHoleCount",
          "label": "連續模"
        },
        "hmToolingRivetingDieCost": {
          "type": "MATH",
          "formula": "hmToolingRivetingDieModuleCost * hmToolingRivetingDieCount / hmToolingHoleCount",
          "label": "鉚合模"
        },
        "packageCost": {
          "type": "MATH",
          "formula": "hmToolingIntervalPrice",
          "label": "運包檢"
        },
        "secondary_processing_cost": {
          "type": "MATH",
          "formula": "cmfProcessListUltrasonicClean + cmfProcessListAnode + cmfProcessListSandBlast + cmfProcessListHairLine + cmfProcessLisPatinting + ThermalBonding + cmfProcessListSingleTapping + cmfProcessListMultiTapping + cmfProcessListSingleSpotWelding + cmfProcessListMultiSpotWelding + cmfProcessListPopRivet + cmfProcessListRicet + cmfProcessListHandMakeDraw + cmfProcessListScreenPrinting + cmfProcessListPadPrinting + cmfProcessListSilkPrint + cmfProcessListCNC+ cmfProcessListCNCPL + cmfProcessListDrillCut + cmfProcessListLaserPrint + cmfProcessListLaserPrintIcon+ cmfProcessListPolishing + cmfProcessListDrilling",
          "label": "二次加工費"
        },
        "cmfProcessListUltrasonicClean": {
          "type": "MATH",
          "formula": "cmfProcessListultrasonicCleanExist ?(hmpartsexpandwidth * hmpartsexpandlength / 1000000) * const20 :0",
          "label": "超音波清洗"
        },
        "cmfProcessListAnode": {
          "type": "MATH",
          "formula": "cmfProcessListFirstAnode + cmfProcessListSecondAnode",
          "label": "陽極"
        },
        "cmfProcessListFirstAnode": {
          "type": "MATH",
          "formula": "cmfProcessListFirstAnodeCheckBox ? (hmpartsexpandwidth * hmpartsexpandlength/1000000) * cmfProcessListFirstAnodePrice  * (1 + const22) :0",
          "label": "陽極(一陽)"
        },
        "cmfProcessListSecondAnode": {
          "type": "MATH",
          "formula": "cmfProcessListSecondAnodeCheckBox ? ( hmpartsexpandwidth * hmpartsexpandlength /1000000) * cmfProcessListSecondAnodePrice  * (1 +const31) :0",
          "label": "陽極(二陽)"
        },
        "cmfProcessListSandBlast": {
          "type": "MATH",
          "formula": "cmfProcessListSandBlastCheckBox ? ( hmpartsexpandwidth * hmpartsexpandlength / 1000000 * cmfProcessListSandBlastSideCount * const23 * (1 + const21)) :0",
          "label": "噴砂"
        },
        "cmfProcessListHairLine": {
          "type": "MATH",
          "formula": "cmfProcessListHairLineCheckBox ? (cmfProcessListHairLineArea / 1000000) * const24 * (1 + const21) :0",
          "label": "髮絲"
        },
        "cmfProcessLisPatinting": {
          "type": "MATH",
          "formula": "cmfProcessListPaintingCheckBox ? 0.00000084 * patintingArea * cmfProcessListPaintingCount + ( patintingArea * cmfProcessListPaintingFilmThickness *1.5/1000000) * cmfProcessListPaintingCount * CmfProcessListPaintingPriceUSD *(1 + 0.15) :0",
          "label": "噴漆"
        },
        "patintingArea": {
          "type": "MATH",
          "formula": "cmfProcessListPaintingArea + 35 * (hmpartsexpandwidth * 2 + hmpartsexpandlength * 2)",
          "label": "噴塗面積"
        },
        "ThermalBonding": {
          "type": "MATH",
          "formula": "cmfProcessListThermalBondingCheckBox ? ( glueWeight * cmfProcessListThermalBondingGluePrice + cmfProcessListThermalBondingCycleTimeValue * 0.0030 ) * (1+ const21) :0",
          "label": "Thermal Bonding 熱壓"
        },
        "glueWeight": {
          "type": "MATH",
          "formula": "cmfProcessListThermalBondingCheckBox ?3.1416 * (cmfProcessListThermalBondingGlueSyringeDiameter / 2) * (cmfProcessListThermalBondingGlueSyringeDiameter / 2) * cmfProcessListThermalBondingPathLength * cmfProcessListThermalBondingGlueDensity / 1000 :0",
          "label": "膠水重量"
        },
        "cmfProcessListSingleTapping": {
          "type": "MATH",
          "formula": "cmfProcessListSingleTappingCheckBox ? cmfProcessListSingleTappingCount * const25 * (1+ const21) :0",
          "label": "單點攻牙"
        },
        "cmfProcessListMultiTapping": {
          "type": "MATH",
          "formula": "cmfProcessListMultiTappingCheckBox ? cmfProcessListMultiTappingCount * const26 * (1+ const21) :0",
          "label": "多點攻牙"
        },
        "cmfProcessListSingleSpotWelding": {
          "type": "MATH",
          "formula": "cmfProcessListSingleSpotWeldingCheckBox ? cmfProcessListSingleSpotWeldingCount * const27 * (1+ const21) :0",
          "label": "單點點焊"
        },
        "cmfProcessListMultiSpotWelding": {
          "type": "MATH",
          "formula": "cmfProcessListMultiSpotWeldingCheckBox ? cmfProcessListMultiSpotWeldingCount * const28 * (1+ const21) :0",
          "label": "多點點焊"
        },
        "cmfProcessListPopRivet": {
          "type": "MATH",
          "formula": "cmfProcessListPopRivetCheckBox ? cmfProcessListPopRivetCount * const29 * (1+ const21) :0",
          "label": "放拉釘"
        },
        "cmfProcessListRicet": {
          "type": "MATH",
          "formula": "cmfProcessListRicetCheckBox ?cmfProcessListRicetCount * const30 * (1+ const21) :0",
          "label": "拉鉚釘"
        },
        "cmfProcessListHandMakeDraw": {
          "type": "MATH",
          "formula": "cmfProcessListHandMakeDrawCheckBox ?cmfProcessListHandMakeDrawCycleTime / 60 * const32 * (1+ const21) :0",
          "label": "手工塗黑"
        },
        "cmfProcessListHandMakeDrawCycleTime": {
          "type": "MATH",
          "formula": "cmfProcessListHandMakeDrawCount *(40/2500)"
        },
        "cmfProcessListScreenPrinting": {
          "type": "MATH",
          "formula": "cmfProcessListScreenPrintingCheckBox ?cmfProcessListScreenPrintingCount * const33 * (1+ const21) :0",
          "label": "Printing網印"
        },
        "cmfProcessListPadPrinting": {
          "type": "MATH",
          "formula": "cmfProcessListPadPrintingCheckBox ?cmfProcessListPadPrintingCount * const34 * (1+ const21) :0",
          "label": "Printing移印"
        },
        "cmfProcessListSilkPrint": {
          "type": "MATH",
          "formula": "cmfProcessListSilkPrintCheckBox ?cmfProcessListSilkPrintCount * const35 * (1+ const21) :0",
          "label": "Silk Print"
        },
        "cmfProcessListCNC": {
          "type": "MATH",
          "formula": "cmfProcessListCNCCheckBox ?cmfProcessListCNCCycleTime * const36 * (1+ const21) :0",
          "label": "CNC(公模面)"
        },
        "cmfProcessListCNCCycleTime": {
          "type": "MATH",
          "formula": "cmfProcessListCNCArea / 20"
        },
        "cmfProcessListCNCPL": {
          "type": "MATH",
          "formula": "cmfProcessListCNCPLCheckBox ?cmfProcessListCNCPLLengthCycleTime * const37 * (1+ const21) :0",
          "label": "CNC(PL處)"
        },
        "cmfProcessListCNCPLLengthCycleTime": {
          "type": "MATH",
          "formula": "cmfProcessListCNCPLLength / 6"
        },
        "cmfProcessListDrillCut": {
          "type": "MATH",
          "formula": "cmfProcessListDrillCutCheckBox ?cmfProcessListDrillCutCycleTime * const38 * (1+ const21) :0",
          "label": "CNC(PL處)"
        },
        "cmfProcessListDrillCutCycleTime": {
          "type": "MATH",
          "formula": "cmfProcessListDrillCutArea / 1.19"
        },
        "cmfProcessListLaserPrint": {
          "type": "MATH",
          "formula": "cmfProcessListLaserPrintCheckBox ? (cmfProcessListLaserPrintArea/1000000) * const39 * (1+ const21) :0",
          "label": "鐳雕(公模面)"
        },
        "cmfProcessListLaserPrintIcon": {
          "type": "MATH",
          "formula": "cmfProcessListLaserPrintIconCheckBox ?cmfProcessListLaserPrintIconCount * const40 * (1+ const21) :0",
          "label": "鐳雕(icon)"
        },
        "cmfProcessListPolishing": {
          "type": "MATH",
          "formula": "cmfProcessListPolishingAuto + cmfProcessListPolishingArtificial",
          "label": "打磨"
        },
        "cmfProcessListPolishingAuto": {
          "type": "FUNC",
          "formula": "(cmfProcessListPolishingAutoCheckBox, cmfProcessListPolishingAutoArea,const41, const42, const21) => { return cmfProcessListPolishingAutoCheckBox ? cmfProcessListPolishingAutoArea / const41 * const42 * (1 + const21):0 }",
          "label": "打磨(自動)",
          "param": [
            "cmfProcessListPolishingAutoCheckBox",
            "cmfProcessListPolishingAutoArea",
            "const41",
            "const42",
            "const21"
          ]
        },
        "cmfProcessListPolishingArtificial": {
          "type": "FUNC",
          "formula": "(cmfProcessListPolishingArtificialCheckBox, cmfProcessListPolishingArtificialArea, const43, const44, const21) => { return cmfProcessListPolishingArtificialCheckBox ? cmfProcessListPolishingArtificialArea / const43 * const44 * (1 + const21):0 }",
          "label": "打磨(人工)",
          "param": [
            "cmfProcessListPolishingArtificialCheckBox",
            "cmfProcessListPolishingArtificialArea",
            "const43",
            "const44",
            "const21"
          ]
        },
        "cmfProcessListDrilling": {
          "type": "MATH",
          "formula": "cmfProcessListDrillingCheckBox ?cmfProcessListDrillingCount * const45 * (1+ const21) :0",
          "label": "鑽孔"
        }
      },
      "scope": {
        "hmToolingMaterialExpandWidth": "hmToolingMaterialExpandWidth",
        "hmToolingMaterialExpandLength": "hmToolingMaterialExpandLength",
        "hmthickness": "hmthickness",
        "hmmaterialdensity": "hmmaterialdensity",
        "hmmaterialprice": "hmmaterialprice",
        "hmmaterial": "hmmaterial",
        "hmToolingHoleCount": "hmToolingHoleCount",
        "hmToolingStageDieModuleCost": "hmToolingStageDieModuleCost",
        "hmToolingStageDieCount": "hmToolingStageDieCount",
        "hmToolingProgressiveDieModuleCost": "hmToolingProgressiveDieModuleCost",
        "hmToolingProgressiveDieCount": "hmToolingProgressiveDieCount",
        "hmToolingRivetingDieModuleCost": "hmToolingRivetingDieModuleCost",
        "hmToolingRivetingDieCount": "hmToolingRivetingDieCount",
        "hmToolingIntervalPrice": "hmToolingIntervalPrice",
        "hmpartsexpandwidth": "hmpartsexpandwidth",
        "hmpartsexpandlength": "hmpartsexpandlength",
        "cmfProcessListFirstAnodePrice": "cmfProcessListFirstAnodePrice",
        "cmfProcessListSecondAnodePrice": "cmfProcessListSecondAnodePrice",
        "cmfProcessListHairLineArea": "cmfProcessListHairLineArea",
        "cmfProcessListPaintingCount": "cmfProcessListPaintingCount",
        "cmfProcessListPaintingFilmThickness": "cmfProcessListPaintingFilmThickness",
        "CmfProcessListPaintingPriceUSD": "CmfProcessListPaintingPriceUSD",
        "cmfProcessListThermalBondingCycleTimeValue": "cmfProcessListThermalBondingCycleTimeValue",
        "cmfProcessListThermalBondingGlueSyringeDiameter": "cmfProcessListThermalBondingGlueSyringeDiameter",
        "cmfProcessListThermalBondingPathLength": "cmfProcessListThermalBondingPathLength",
        "cmfProcessListThermalBondingGlueDensity": "cmfProcessListThermalBondingGlueDensity",
        "cmfProcessListThermalBondingGluePrice": "cmfProcessListThermalBondingGluePrice",
        "cmfProcessListSingleTappingCount": "cmfProcessListSingleTappingCount",
        "cmfProcessListMultiTappingCount": "cmfProcessListMultiTappingCount",
        "cmfProcessListSingleSpotWeldingCount": "cmfProcessListSingleSpotWeldingCount",
        "cmfProcessListMultiSpotWeldingCount": "cmfProcessListMultiSpotWeldingCount",
        "cmfProcessListPopRivetCount": "cmfProcessListPopRivetCount",
        "cmfProcessListRicetCount": "cmfProcessListRicetCount",
        "cmfProcessListPaintingArea": "cmfProcessListPaintingArea",
        "cmfProcessListHandMakeDrawCount": "cmfProcessListHandMakeDrawCount",
        "cmfProcessListScreenPrintingCount": "cmfProcessListScreenPrintingCount",
        "cmfProcessListPadPrintingCount": "cmfProcessListPadPrintingCount",
        "cmfProcessListSilkPrintCount": "cmfProcessListSilkPrintCount",
        "cmfProcessListCNCArea": "cmfProcessListCNCArea",
        "cmfProcessListCNCPLLength": "cmfProcessListCNCPLLength",
        "cmfProcessListDrillCutArea": "cmfProcessListDrillCutArea",
        "cmfProcessListLaserPrintArea": "cmfProcessListLaserPrintArea",
        "cmfProcessListLaserPrintIconCount": "cmfProcessListLaserPrintIconCount",
        "cmfProcessListPolishingAutoArea": "cmfProcessListPolishingAutoArea",
        "cmfProcessListPolishingAutoCheckBox": "cmfProcessListPolishingAutoCheckBox",
        "cmfProcessListPolishingArtificialCheckBox": "cmfProcessListPolishingArtificialCheckBox",
        "cmfProcessListPolishingArtificialArea": "cmfProcessListPolishingArtificialArea",
        "cmfProcessListDrillingCount": "cmfProcessListDrillingCount",
        "cmfProcessListSandBlastSideCount": "cmfProcessListSandBlastSideCount",
        "cmfProcessListultrasonicCleanExist": "cmfProcessListultrasonicCleanExist",
        "cmfProcessListFirstAnodeCheckBox": "cmfProcessListFirstAnodeCheckBox",
        "cmfProcessListSecondAnodeCheckBox": "cmfProcessListSecondAnodeCheckBox",
        "cmfProcessListSandBlastCheckBox": "cmfProcessListSandBlastCheckBox",
        "cmfProcessListHairLineCheckBox": "cmfProcessListHairLineCheckBox",
        "cmfProcessListPaintingCheckBox": "cmfProcessListPaintingCheckBox",
        "cmfProcessListThermalBondingCheckBox": "cmfProcessListThermalBondingCheckBox",
        "cmfProcessListSingleTappingCheckBox": "cmfProcessListSingleTappingCheckBox",
        "cmfProcessListMultiTappingCheckBox": "cmfProcessListMultiTappingCheckBox",
        "cmfProcessListSingleSpotWeldingCheckBox": "cmfProcessListSingleSpotWeldingCheckBox",
        "cmfProcessListMultiSpotWeldingCheckBox": "cmfProcessListMultiSpotWeldingCheckBox",
        "cmfProcessListPopRivetCheckBox": "cmfProcessListPopRivetCheckBox",
        "cmfProcessListRicetCheckBox": "cmfProcessListRicetCheckBox",
        "cmfProcessListHandMakeDrawCheckBox": "cmfProcessListHandMakeDrawCheckBox",
        "cmfProcessListScreenPrintingCheckBox": "cmfProcessListScreenPrintingCheckBox",
        "cmfProcessListPadPrintingCheckBox": "cmfProcessListPadPrintingCheckBox",
        "cmfProcessListSilkPrintCheckBox": "cmfProcessListSilkPrintCheckBox",
        "cmfProcessListCNCCheckBox": "cmfProcessListCNCCheckBox",
        "cmfProcessListCNCPLCheckBox": "cmfProcessListCNCPLCheckBox",
        "cmfProcessListDrillCutCheckBox": "cmfProcessListDrillCutCheckBox",
        "cmfProcessListLaserPrintCheckBox": "cmfProcessListLaserPrintCheckBox",
        "cmfProcessListLaserPrintIconCheckBox": "cmfProcessListLaserPrintIconCheckBox",
        "cmfProcessListDrillingCheckBox": "cmfProcessListDrillingCheckBox"
      },
      "constant": {
        "const1": {
          "label": "運包檢",
          "value": 0.2
        },
        "const2": {
          "label": "熱熔單價",
          "value": 0.01
        },
        "const3": {
          "label": "CMF Printing網印單價",
          "value": 0.04
        },
        "const4": {
          "label": "CMF Printing移印單價",
          "value": 0.04
        },
        "const5": {
          "label": "CMF CNC料頭單價",
          "value": 0.01
        },
        "const6": {
          "label": "埋釘人工",
          "value": "人工"
        },
        "const20": {
          "label": "超音波單價",
          "value": 0.3529
        },
        "const21": {
          "label": "loss rate",
          "value": 0.05
        },
        "const22": {
          "label": "一陽極color loss rate",
          "value": 0.15
        },
        "const23": {
          "label": "噴砂單價",
          "value": 3.5
        },
        "const24": {
          "label": "髮絲單價",
          "value": 10
        },
        "const25": {
          "label": "單點攻牙單價",
          "value": 0.0078
        },
        "const26": {
          "label": "多點攻牙單價",
          "value": 0.0039
        },
        "const27": {
          "label": "單點點焊單價",
          "value": 0.0078
        },
        "const28": {
          "label": "多點點焊單價",
          "value": 0.0039
        },
        "const29": {
          "label": "放拉釘單價",
          "value": 0.0014
        },
        "const30": {
          "label": "拉鉚釘單價",
          "value": 0.0078
        },
        "const31": {
          "label": "二陽極color loss rate",
          "value": 0.1
        },
        "const32": {
          "label": "手工塗黑價錢",
          "value": 0.045
        },
        "const33": {
          "label": "printing網印單價",
          "value": 0.04
        },
        "const34": {
          "label": "printing移印單價",
          "value": 0.04
        },
        "const35": {
          "label": "Silk Print單價",
          "value": 0.0388
        },
        "const36": {
          "label": "CNC(公模面)單價",
          "value": 0.0042
        },
        "const37": {
          "label": "CNC(PL處)單價",
          "value": 0.0042
        },
        "const38": {
          "label": "鑽切(高光)單價",
          "value": 0.005
        },
        "const39": {
          "label": "鐳雕(公模面)單價",
          "value": 10
        },
        "const40": {
          "label": "鐳雕(icon)單價",
          "value": 0.017
        },
        "const41": {
          "label": "打磨(自動加工速度)",
          "value": 1738
        },
        "const42": {
          "label": "打磨(自動加工單價)",
          "value": 0.0022
        },
        "const43": {
          "label": "打磨(人工加工速度)",
          "value": 57
        },
        "const44": {
          "label": "打磨(人工加工單價)",
          "value": 0.005
        },
        "const45": {
          "label": "鑽孔單價",
          "value": 0.000071
        }
      },
      "output": {
        "total": "total"
      }
    }
  }
};

export default data;
