/* eslint-disable quote-props */
/* eslint-disable quotes */

const data = {
  "version": 2,
  "showMenu": false,
  "layout": [
      {
          "key": "cwTab",
          "label": "cwLabel",
          "group": [
              "cableWire"
          ],
          "items": [
              {
                  "key": "CWItems",
                  "label": "不用顯示的",
                  "visiable": false,
                  "multiple": false,
                  "items": [
                      {
                          "key": "partname",
                          "label": "Part Name",
                          "require": false,
                          "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                          "displayConfig": {
                              "grids": 2,
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
                          "key": "partnumber",
                          "label": "Part Number",
                          "require": false,
                          "url": "bom/partlist/getInfo/:{bom_id}/:{type1}/:{type2}/:{key}",
                          "fieldType": "fetch",
                          "dataType": "string",
                          "multiple": false,
                          "edit": false,
                          "constrains": [],
                          "default": null,
                          "needExe": true,
                          "displayConfig": {
                              "display": true,
                              "grids": 1
                          }
                      }
                  ],
                  "fieldType": "composite",
                  "needExe": true,
                  "switchable": false,
                  "maxGroupCount": null,
                  "inline": false
              },
              {
                  "key": "CWGroup",
                  "label": "線材群組",
                  "multiple": "新增線材群組",
                  "level": 0,
                  "group": [
                      "cableConsumable"
                  ],
                  "displayConfig": {
                      "grids": 3,
                      "display": true
                  },
                  "items": [
                      {
                          "key": "CWGroupName",
                          "label": "線材群組",
                          "editable": true,
                          "level": 1,
                          "group": [
                              "cableMaterial"
                          ],
                          "displayConfig": {
                              "grids": 3,
                              "display": true
                          },
                          "fieldType": "label",
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
                          "key": "CWWire",
                          "label": "線材",
                          "group": [
                              "cableMaterial"
                          ],
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
                          "level": 2,
                          "switchable": false,
                          "maxGroupCount": null
                      },
                      {
                          "key": "cableMaterialType",
                          "label": "線材種類",
                          "group": [
                              "cableMaterial"
                          ],
                          "selectorConfig": {
                              "depends": [],
                              "values": [
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  }
                              ]
                          },
                          "require": true,
                          "fieldType": "selector",
                          "dataType": "string",
                          "multiple": false,
                          "constrains": [],
                          "default": null,
                          "needExe": true,
                          "displayConfig": {
                              "display": true,
                              "grids": 1
                          }
                      },
                      {
                          "key": "cableMaterialLength",
                          "label": "Cable Length(mm)",
                          "group": [
                              "cableMaterial"
                          ],
                          "require": true,
                          "fieldType": "input",
                          "dataType": "float",
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
                          "key": "cableMaterialPin",
                          "label": "Pin",
                          "group": [
                              "cableMaterial"
                          ],
                          "displayConfig": {
                              "grids": 0.5,
                              "display": true
                          },
                          "require": true,
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
                          "key": "cableMaterialGuage",
                          "label": "Guage",
                          "group": [
                              "cableMaterial"
                          ],
                          "selectorConfig": {
                              "depends": [
                                  "cableMaterialType"
                              ],
                              "values": [
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  }
                              ]
                          },
                          "displayConfig": {
                              "depends": {
                                  "action": "lock",
                                  "condition": {
                                      "cableMaterialType": true
                                  }
                              },
                              "grids": 0.5,
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
                          "key": "CWConnector",
                          "label": "Connector",
                          "group": [
                              "cableConnector"
                          ],
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
                          "level": 2,
                          "switchable": false,
                          "maxGroupCount": null
                      },
                      {
                          "key": "cableConnectorName",
                          "label": "Function Name",
                          "group": [
                              "cableConnector"
                          ],
                          "selectorConfig": {
                              "depends": [],
                              "values": [
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(4 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-4-G",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 44,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(5 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-5-G",
                                      "cableConnectorUnitPrice": 0.044,
                                      "cableConnectorWorkingTime": 46,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(6 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.046,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(8 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-8-G",
                                      "cableConnectorUnitPrice": 0.052,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(14 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.068,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(with pull bar/30 pin)",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(without pull bar/40 pin)",
                                      "cableConnectorVendorPn": "YDY：051A-101-40P-802",
                                      "cableConnectorUnitPrice": 0.075,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(50pin)",
                                      "cableConnectorVendorPn": "LWC：LV03150-21201",
                                      "cableConnectorUnitPrice": 0.32,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(40pin)",
                                      "cableConnectorVendorPn": "LWC：LV03140-21201",
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector 30 pin",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(50pin)",
                                      "cableConnectorVendorPn": "LV06150-23102",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": "ACES 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(40pin)",
                                      "cableConnectorVendorPn": "LV06140-23102",
                                      "cableConnectorUnitPrice": 0.16,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "ACES 50398-04071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "FPC 30PIN",
                                      "cableConnectorVendorPn": "NA",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "MB conn 40 pin",
                                      "cableConnectorVendorPn": null,
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "LWC：LV03140-21201"
                                  },
                                  {
                                      "cableConnectorName": "Touch connector",
                                      "cableConnectorType": "Touch connector(10 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 20,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 10PIN",
                                      "cableConnectorUnitPrice": 0.04,
                                      "cableConnectorWorkingTime": 140,
                                      "cableConnectorMotherPN": "I-PEX  MFX5-BFNII-LK03"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 12PIN",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 146,
                                      "cableConnectorMotherPN": "ACES 51553-01201-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 16PIN",
                                      "cableConnectorUnitPrice": 0.053,
                                      "cableConnectorWorkingTime": 164,
                                      "cableConnectorMotherPN": "ACES 51581-01641-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 30PIN",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 40PIN",
                                      "cableConnectorUnitPrice": 0.1,
                                      "cableConnectorWorkingTime": 188,
                                      "cableConnectorMotherPN": "ACES 51530-04001-W01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50233-008H0H0-001",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 42,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(50 pin/鐵殼穿黑色拉帶)",
                                      "cableConnectorVendorPn": "STACONN： 111H50-100000=G2-R1",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 320,
                                      "cableConnectorMotherPN": "ACES： 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50459-010H0M0-001",
                                      "cableConnectorUnitPrice": 0.065,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "ACES： 50458-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HN0-10-B2",
                                      "cableConnectorUnitPrice": 0.089,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-105F-500"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 51329-00811-002",
                                      "cableConnectorUnitPrice": 0.162,
                                      "cableConnectorWorkingTime": 162,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(60 pin/with pull bar)",
                                      "cableConnectorVendorPn": "LWS： LV19160-23000",
                                      "cableConnectorUnitPrice": 0.49,
                                      "cableConnectorWorkingTime": 435,
                                      "cableConnectorMotherPN": "ACES： 51328-00801-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HNO-10P-B2",
                                      "cableConnectorUnitPrice": 0.035,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-10S-*-*"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 1010-H-8P-HF",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 51,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02…"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES 50376-00601-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.085,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES 50376-01401-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-6P-G34",
                                      "cableConnectorUnitPrice": 0.028,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-8P-G34",
                                      "cableConnectorUnitPrice": 0.033,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES:50208-00801-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-10P-G34",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 56,
                                      "cableConnectorMotherPN": "ACES:50208-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-14P-G34",
                                      "cableConnectorUnitPrice": 0.063,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES:50208-01401-V01"
                                  }
                              ]
                          },
                          "require": true,
                          "fieldType": "selector",
                          "dataType": "string",
                          "multiple": false,
                          "constrains": [],
                          "default": null,
                          "needExe": true,
                          "displayConfig": {
                              "display": true,
                              "grids": 1
                          }
                      },
                      {
                          "key": "cableConnectorType",
                          "label": "Connector Type",
                          "group": [
                              "cableConnector"
                          ],
                          "selectorConfig": {
                              "depends": [
                                  "cableConnectorName"
                              ],
                              "values": [
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(4 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-4-G",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 44,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(5 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-5-G",
                                      "cableConnectorUnitPrice": 0.044,
                                      "cableConnectorWorkingTime": 46,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(6 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.046,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(8 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-8-G",
                                      "cableConnectorUnitPrice": 0.052,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(14 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.068,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(with pull bar/30 pin)",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(without pull bar/40 pin)",
                                      "cableConnectorVendorPn": "YDY：051A-101-40P-802",
                                      "cableConnectorUnitPrice": 0.075,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(50pin)",
                                      "cableConnectorVendorPn": "LWC：LV03150-21201",
                                      "cableConnectorUnitPrice": 0.32,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(40pin)",
                                      "cableConnectorVendorPn": "LWC：LV03140-21201",
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector 30 pin",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(50pin)",
                                      "cableConnectorVendorPn": "LV06150-23102",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": "ACES 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(40pin)",
                                      "cableConnectorVendorPn": "LV06140-23102",
                                      "cableConnectorUnitPrice": 0.16,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "ACES 50398-04071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "FPC 30PIN",
                                      "cableConnectorVendorPn": "NA",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "MB conn 40 pin",
                                      "cableConnectorVendorPn": null,
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "LWC：LV03140-21201"
                                  },
                                  {
                                      "cableConnectorName": "Touch connector",
                                      "cableConnectorType": "Touch connector(10 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 20,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 10PIN",
                                      "cableConnectorUnitPrice": 0.04,
                                      "cableConnectorWorkingTime": 140,
                                      "cableConnectorMotherPN": "I-PEX  MFX5-BFNII-LK03"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 12PIN",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 146,
                                      "cableConnectorMotherPN": "ACES 51553-01201-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 16PIN",
                                      "cableConnectorUnitPrice": 0.053,
                                      "cableConnectorWorkingTime": 164,
                                      "cableConnectorMotherPN": "ACES 51581-01641-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 30PIN",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 40PIN",
                                      "cableConnectorUnitPrice": 0.1,
                                      "cableConnectorWorkingTime": 188,
                                      "cableConnectorMotherPN": "ACES 51530-04001-W01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50233-008H0H0-001",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 42,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(50 pin/鐵殼穿黑色拉帶)",
                                      "cableConnectorVendorPn": "STACONN： 111H50-100000=G2-R1",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 320,
                                      "cableConnectorMotherPN": "ACES： 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50459-010H0M0-001",
                                      "cableConnectorUnitPrice": 0.065,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "ACES： 50458-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HN0-10-B2",
                                      "cableConnectorUnitPrice": 0.089,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-105F-500"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 51329-00811-002",
                                      "cableConnectorUnitPrice": 0.162,
                                      "cableConnectorWorkingTime": 162,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(60 pin/with pull bar)",
                                      "cableConnectorVendorPn": "LWS： LV19160-23000",
                                      "cableConnectorUnitPrice": 0.49,
                                      "cableConnectorWorkingTime": 435,
                                      "cableConnectorMotherPN": "ACES： 51328-00801-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HNO-10P-B2",
                                      "cableConnectorUnitPrice": 0.035,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-10S-*-*"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 1010-H-8P-HF",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 51,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02…"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES 50376-00601-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.085,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES 50376-01401-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-6P-G34",
                                      "cableConnectorUnitPrice": 0.028,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-8P-G34",
                                      "cableConnectorUnitPrice": 0.033,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES:50208-00801-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-10P-G34",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 56,
                                      "cableConnectorMotherPN": "ACES:50208-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-14P-G34",
                                      "cableConnectorUnitPrice": 0.063,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES:50208-01401-V01"
                                  }
                              ]
                          },
                          "displayConfig": {
                              "depends": {
                                  "action": "lock",
                                  "condition": {
                                      "cableConnectorName": true
                                  }
                              },
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
                          "key": "cableConnectorVendorPn",
                          "label": "Vendor PN",
                          "group": [
                              "cableConnector"
                          ],
                          "selectorConfig": {
                              "depends": [
                                  "cableConnectorName"
                              ],
                              "values": [
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(4 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-4-G",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 44,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(5 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-5-G",
                                      "cableConnectorUnitPrice": 0.044,
                                      "cableConnectorWorkingTime": 46,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(6 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.046,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(8 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-8-G",
                                      "cableConnectorUnitPrice": 0.052,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(14 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.068,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(with pull bar/30 pin)",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(without pull bar/40 pin)",
                                      "cableConnectorVendorPn": "YDY：051A-101-40P-802",
                                      "cableConnectorUnitPrice": 0.075,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(50pin)",
                                      "cableConnectorVendorPn": "LWC：LV03150-21201",
                                      "cableConnectorUnitPrice": 0.32,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(40pin)",
                                      "cableConnectorVendorPn": "LWC：LV03140-21201",
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector 30 pin",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(50pin)",
                                      "cableConnectorVendorPn": "LV06150-23102",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": "ACES 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(40pin)",
                                      "cableConnectorVendorPn": "LV06140-23102",
                                      "cableConnectorUnitPrice": 0.16,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "ACES 50398-04071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "FPC 30PIN",
                                      "cableConnectorVendorPn": "NA",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "MB conn 40 pin",
                                      "cableConnectorVendorPn": null,
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "LWC：LV03140-21201"
                                  },
                                  {
                                      "cableConnectorName": "Touch connector",
                                      "cableConnectorType": "Touch connector(10 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 20,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 10PIN",
                                      "cableConnectorUnitPrice": 0.04,
                                      "cableConnectorWorkingTime": 140,
                                      "cableConnectorMotherPN": "I-PEX  MFX5-BFNII-LK03"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 12PIN",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 146,
                                      "cableConnectorMotherPN": "ACES 51553-01201-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 16PIN",
                                      "cableConnectorUnitPrice": 0.053,
                                      "cableConnectorWorkingTime": 164,
                                      "cableConnectorMotherPN": "ACES 51581-01641-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 30PIN",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 40PIN",
                                      "cableConnectorUnitPrice": 0.1,
                                      "cableConnectorWorkingTime": 188,
                                      "cableConnectorMotherPN": "ACES 51530-04001-W01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50233-008H0H0-001",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 42,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(50 pin/鐵殼穿黑色拉帶)",
                                      "cableConnectorVendorPn": "STACONN： 111H50-100000=G2-R1",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 320,
                                      "cableConnectorMotherPN": "ACES： 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50459-010H0M0-001",
                                      "cableConnectorUnitPrice": 0.065,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "ACES： 50458-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HN0-10-B2",
                                      "cableConnectorUnitPrice": 0.089,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-105F-500"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 51329-00811-002",
                                      "cableConnectorUnitPrice": 0.162,
                                      "cableConnectorWorkingTime": 162,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(60 pin/with pull bar)",
                                      "cableConnectorVendorPn": "LWS： LV19160-23000",
                                      "cableConnectorUnitPrice": 0.49,
                                      "cableConnectorWorkingTime": 435,
                                      "cableConnectorMotherPN": "ACES： 51328-00801-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HNO-10P-B2",
                                      "cableConnectorUnitPrice": 0.035,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-10S-*-*"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 1010-H-8P-HF",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 51,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02…"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES 50376-00601-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.085,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES 50376-01401-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-6P-G34",
                                      "cableConnectorUnitPrice": 0.028,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-8P-G34",
                                      "cableConnectorUnitPrice": 0.033,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES:50208-00801-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-10P-G34",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 56,
                                      "cableConnectorMotherPN": "ACES:50208-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-14P-G34",
                                      "cableConnectorUnitPrice": 0.063,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES:50208-01401-V01"
                                  }
                              ]
                          },
                          "displayConfig": {
                              "depends": {
                                  "action": "lock",
                                  "condition": {
                                      "cableConnectorName": true
                                  }
                              },
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
                          "key": "cableConnectorMotherPN",
                          "label": "母端 Connector Vendor PN",
                          "group": [
                              "cableConnector"
                          ],
                          "selectorConfig": {
                              "depends": [
                                  "cableConnectorName"
                              ],
                              "values": [
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(4 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-4-G",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 44,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(5 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-5-G",
                                      "cableConnectorUnitPrice": 0.044,
                                      "cableConnectorWorkingTime": 46,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(6 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.046,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(8 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-8-G",
                                      "cableConnectorUnitPrice": 0.052,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(14 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.068,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(with pull bar/30 pin)",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(without pull bar/40 pin)",
                                      "cableConnectorVendorPn": "YDY：051A-101-40P-802",
                                      "cableConnectorUnitPrice": 0.075,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(50pin)",
                                      "cableConnectorVendorPn": "LWC：LV03150-21201",
                                      "cableConnectorUnitPrice": 0.32,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(40pin)",
                                      "cableConnectorVendorPn": "LWC：LV03140-21201",
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector 30 pin",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(50pin)",
                                      "cableConnectorVendorPn": "LV06150-23102",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": "ACES 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(40pin)",
                                      "cableConnectorVendorPn": "LV06140-23102",
                                      "cableConnectorUnitPrice": 0.16,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "ACES 50398-04071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "FPC 30PIN",
                                      "cableConnectorVendorPn": "NA",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "MB conn 40 pin",
                                      "cableConnectorVendorPn": null,
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "LWC：LV03140-21201"
                                  },
                                  {
                                      "cableConnectorName": "Touch connector",
                                      "cableConnectorType": "Touch connector(10 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 20,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 10PIN",
                                      "cableConnectorUnitPrice": 0.04,
                                      "cableConnectorWorkingTime": 140,
                                      "cableConnectorMotherPN": "I-PEX  MFX5-BFNII-LK03"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 12PIN",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 146,
                                      "cableConnectorMotherPN": "ACES 51553-01201-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 16PIN",
                                      "cableConnectorUnitPrice": 0.053,
                                      "cableConnectorWorkingTime": 164,
                                      "cableConnectorMotherPN": "ACES 51581-01641-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 30PIN",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 40PIN",
                                      "cableConnectorUnitPrice": 0.1,
                                      "cableConnectorWorkingTime": 188,
                                      "cableConnectorMotherPN": "ACES 51530-04001-W01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50233-008H0H0-001",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 42,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(50 pin/鐵殼穿黑色拉帶)",
                                      "cableConnectorVendorPn": "STACONN： 111H50-100000=G2-R1",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 320,
                                      "cableConnectorMotherPN": "ACES： 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50459-010H0M0-001",
                                      "cableConnectorUnitPrice": 0.065,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "ACES： 50458-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HN0-10-B2",
                                      "cableConnectorUnitPrice": 0.089,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-105F-500"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 51329-00811-002",
                                      "cableConnectorUnitPrice": 0.162,
                                      "cableConnectorWorkingTime": 162,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(60 pin/with pull bar)",
                                      "cableConnectorVendorPn": "LWS： LV19160-23000",
                                      "cableConnectorUnitPrice": 0.49,
                                      "cableConnectorWorkingTime": 435,
                                      "cableConnectorMotherPN": "ACES： 51328-00801-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HNO-10P-B2",
                                      "cableConnectorUnitPrice": 0.035,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-10S-*-*"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 1010-H-8P-HF",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 51,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02…"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES 50376-00601-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.085,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES 50376-01401-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-6P-G34",
                                      "cableConnectorUnitPrice": 0.028,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-8P-G34",
                                      "cableConnectorUnitPrice": 0.033,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES:50208-00801-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-10P-G34",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 56,
                                      "cableConnectorMotherPN": "ACES:50208-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-14P-G34",
                                      "cableConnectorUnitPrice": 0.063,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES:50208-01401-V01"
                                  }
                              ]
                          },
                          "displayConfig": {
                              "depends": {
                                  "action": "lock",
                                  "condition": {
                                      "cableConnectorName": true
                                  }
                              },
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
                          "key": "cableMaterialUnitPrice",
                          "displayConfig": {
                              "display": false,
                              "grids": 1
                          },
                          "mapFrom": [
                              "cableMaterialType",
                              "cableMaterialGuage"
                          ],
                          "group": [
                              "cableMaterial"
                          ],
                          "selectorConfig": {
                              "values": [
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線1",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線2",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線3",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線4",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線5",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 24,
                                      "cableMaterialUnitPrice": 0.098
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 26,
                                      "cableMaterialUnitPrice": 0.072
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 28,
                                      "cableMaterialUnitPrice": 0.071
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 30,
                                      "cableMaterialUnitPrice": 0.052
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.033
                                  },
                                  {
                                      "cableMaterialType": "鐵氟龍線6",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.032
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線1",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線2",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線3",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線4",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 34,
                                      "cableMaterialUnitPrice": 0.1
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 36,
                                      "cableMaterialUnitPrice": 0.12
                                  },
                                  {
                                      "cableMaterialType": "同軸線5",
                                      "cableMaterialGuage": 40,
                                      "cableMaterialUnitPrice": 0.12
                                  }
                              ]
                          },
                          "fieldType": "mappedValue",
                          "dataType": "float",
                          "default": 0,
                          "needExe": false
                      },
                      {
                          "key": "cableConnectorWorkingTime",
                          "displayConfig": {
                              "display": false,
                              "grids": 1
                          },
                          "group": [
                              "cableConnector"
                          ],
                          "mapFrom": [
                              "cableConnectorName",
                              "cableConnectorType",
                              "cableConnectorVendorPn"
                          ],
                          "selectorConfig": {
                              "values": [
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(4 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-4-G",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 44,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(5 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-5-G",
                                      "cableConnectorUnitPrice": 0.044,
                                      "cableConnectorWorkingTime": 46,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(6 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.046,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(8 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-8-G",
                                      "cableConnectorUnitPrice": 0.052,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(14 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.068,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(with pull bar/30 pin)",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(without pull bar/40 pin)",
                                      "cableConnectorVendorPn": "YDY：051A-101-40P-802",
                                      "cableConnectorUnitPrice": 0.075,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(50pin)",
                                      "cableConnectorVendorPn": "LWC：LV03150-21201",
                                      "cableConnectorUnitPrice": 0.32,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(40pin)",
                                      "cableConnectorVendorPn": "LWC：LV03140-21201",
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector 30 pin",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(50pin)",
                                      "cableConnectorVendorPn": "LV06150-23102",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": "ACES 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(40pin)",
                                      "cableConnectorVendorPn": "LV06140-23102",
                                      "cableConnectorUnitPrice": 0.16,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "ACES 50398-04071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "FPC 30PIN",
                                      "cableConnectorVendorPn": "NA",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "MB conn 40 pin",
                                      "cableConnectorVendorPn": null,
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "LWC：LV03140-21201"
                                  },
                                  {
                                      "cableConnectorName": "Touch connector",
                                      "cableConnectorType": "Touch connector(10 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 20,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 10PIN",
                                      "cableConnectorUnitPrice": 0.04,
                                      "cableConnectorWorkingTime": 140,
                                      "cableConnectorMotherPN": "I-PEX  MFX5-BFNII-LK03"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 12PIN",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 146,
                                      "cableConnectorMotherPN": "ACES 51553-01201-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 16PIN",
                                      "cableConnectorUnitPrice": 0.053,
                                      "cableConnectorWorkingTime": 164,
                                      "cableConnectorMotherPN": "ACES 51581-01641-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 30PIN",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 40PIN",
                                      "cableConnectorUnitPrice": 0.1,
                                      "cableConnectorWorkingTime": 188,
                                      "cableConnectorMotherPN": "ACES 51530-04001-W01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50233-008H0H0-001",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 42,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(50 pin/鐵殼穿黑色拉帶)",
                                      "cableConnectorVendorPn": "STACONN： 111H50-100000=G2-R1",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 320,
                                      "cableConnectorMotherPN": "ACES： 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50459-010H0M0-001",
                                      "cableConnectorUnitPrice": 0.065,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "ACES： 50458-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HN0-10-B2",
                                      "cableConnectorUnitPrice": 0.089,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-105F-500"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 51329-00811-002",
                                      "cableConnectorUnitPrice": 0.162,
                                      "cableConnectorWorkingTime": 162,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(60 pin/with pull bar)",
                                      "cableConnectorVendorPn": "LWS： LV19160-23000",
                                      "cableConnectorUnitPrice": 0.49,
                                      "cableConnectorWorkingTime": 435,
                                      "cableConnectorMotherPN": "ACES： 51328-00801-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HNO-10P-B2",
                                      "cableConnectorUnitPrice": 0.035,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-10S-*-*"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 1010-H-8P-HF",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 51,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02…"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES 50376-00601-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.085,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES 50376-01401-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-6P-G34",
                                      "cableConnectorUnitPrice": 0.028,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-8P-G34",
                                      "cableConnectorUnitPrice": 0.033,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES:50208-00801-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-10P-G34",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 56,
                                      "cableConnectorMotherPN": "ACES:50208-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-14P-G34",
                                      "cableConnectorUnitPrice": 0.063,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES:50208-01401-V01"
                                  }
                              ]
                          },
                          "needExe": false,
                          "fieldType": "mappedValue",
                          "dataType": "float",
                          "default": 0
                      },
                      {
                          "key": "cableConnectorUnitPrice",
                          "group": [
                              "cableConnector"
                          ],
                          "displayConfig": {
                              "display": false,
                              "grids": 1
                          },
                          "mapFrom": [
                              "cableConnectorName",
                              "cableConnectorType",
                              "cableConnectorVendorPn"
                          ],
                          "selectorConfig": {
                              "values": [
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(4 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-4-G",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 44,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(5 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-5-G",
                                      "cableConnectorUnitPrice": 0.044,
                                      "cableConnectorWorkingTime": 46,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(6 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.046,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(8 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-8-G",
                                      "cableConnectorUnitPrice": 0.052,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "CCD connector",
                                      "cableConnectorType": "CCD connector(14 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.068,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(with pull bar/30 pin)",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector(without pull bar/40 pin)",
                                      "cableConnectorVendorPn": "YDY：051A-101-40P-802",
                                      "cableConnectorUnitPrice": 0.075,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(50pin)",
                                      "cableConnectorVendorPn": "LWC：LV03150-21201",
                                      "cableConnectorUnitPrice": 0.32,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "WTB焊接式LCD conn(40pin)",
                                      "cableConnectorVendorPn": "LWC：LV03140-21201",
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "Panel connector",
                                      "cableConnectorType": "Panel connector 30 pin",
                                      "cableConnectorVendorPn": "LWC：LV03130-21201",
                                      "cableConnectorUnitPrice": 0.11,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": null
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(50pin)",
                                      "cableConnectorVendorPn": "LV06150-23102",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 275,
                                      "cableConnectorMotherPN": "ACES 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "WTB焊接式MB conn(40pin)",
                                      "cableConnectorVendorPn": "LV06140-23102",
                                      "cableConnectorUnitPrice": 0.16,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "ACES 50398-04071-0012"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "FPC 30PIN",
                                      "cableConnectorVendorPn": "NA",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "MB connector",
                                      "cableConnectorType": "MB conn 40 pin",
                                      "cableConnectorVendorPn": null,
                                      "cableConnectorUnitPrice": 0.12,
                                      "cableConnectorWorkingTime": 260,
                                      "cableConnectorMotherPN": "LWC：LV03140-21201"
                                  },
                                  {
                                      "cableConnectorName": "Touch connector",
                                      "cableConnectorType": "Touch connector(10 pin)",
                                      "cableConnectorVendorPn": "WL:0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 20,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 10PIN",
                                      "cableConnectorUnitPrice": 0.04,
                                      "cableConnectorWorkingTime": 140,
                                      "cableConnectorMotherPN": "I-PEX  MFX5-BFNII-LK03"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 12PIN",
                                      "cableConnectorUnitPrice": 0.042,
                                      "cableConnectorWorkingTime": 146,
                                      "cableConnectorMotherPN": "ACES 51553-01201-001"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 16PIN",
                                      "cableConnectorUnitPrice": 0.053,
                                      "cableConnectorWorkingTime": 164,
                                      "cableConnectorMotherPN": "ACES 51581-01641-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 30PIN",
                                      "cableConnectorUnitPrice": 0.105,
                                      "cableConnectorWorkingTime": 210,
                                      "cableConnectorMotherPN": "ACES 51530-01201-W01"
                                  },
                                  {
                                      "cableConnectorName": "FPC金手指",
                                      "cableConnectorType": null,
                                      "cableConnectorVendorPn": "FPC 40PIN",
                                      "cableConnectorUnitPrice": 0.1,
                                      "cableConnectorWorkingTime": 188,
                                      "cableConnectorMotherPN": "ACES 51530-04001-W01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50233-008H0H0-001",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 42,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(50 pin/鐵殼穿黑色拉帶)",
                                      "cableConnectorVendorPn": "STACONN： 111H50-100000=G2-R1",
                                      "cableConnectorUnitPrice": 0.26,
                                      "cableConnectorWorkingTime": 320,
                                      "cableConnectorMotherPN": "ACES： 50398-05071-0012"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "ACESS： 50459-010H0M0-001",
                                      "cableConnectorUnitPrice": 0.065,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "ACES： 50458-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HN0-10-B2",
                                      "cableConnectorUnitPrice": 0.089,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-105F-500"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "ACESS： 51329-00811-002",
                                      "cableConnectorUnitPrice": 0.162,
                                      "cableConnectorWorkingTime": 162,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(60 pin/with pull bar)",
                                      "cableConnectorVendorPn": "LWS： LV19160-23000",
                                      "cableConnectorUnitPrice": 0.49,
                                      "cableConnectorWorkingTime": 435,
                                      "cableConnectorMotherPN": "ACES： 51328-00801-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "TYU： TU2013HNO-10P-B2",
                                      "cableConnectorUnitPrice": 0.035,
                                      "cableConnectorWorkingTime": 60,
                                      "cableConnectorMotherPN": "TYU： TU2013WNR-10S-*-*"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 1010-H-8P-HF",
                                      "cableConnectorUnitPrice": 0.0078,
                                      "cableConnectorWorkingTime": 51,
                                      "cableConnectorMotherPN": "ACES： 50224-0080N-W02…"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-6-G",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES 50376-00601-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-10-G",
                                      "cableConnectorUnitPrice": 0.085,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES 50376-01001-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0601-H-14-G",
                                      "cableConnectorUnitPrice": 0.15,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES 50376-01401-001"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(6 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-6P-G34",
                                      "cableConnectorUnitPrice": 0.028,
                                      "cableConnectorWorkingTime": 48,
                                      "cableConnectorMotherPN": "ACES:50208-00601-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(8 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-8P-G34",
                                      "cableConnectorUnitPrice": 0.033,
                                      "cableConnectorWorkingTime": 52,
                                      "cableConnectorMotherPN": "ACES:50208-00801-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(10 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-10P-G34",
                                      "cableConnectorUnitPrice": 0.038,
                                      "cableConnectorWorkingTime": 56,
                                      "cableConnectorMotherPN": "ACES:50208-01001-V01"
                                  },
                                  {
                                      "cableConnectorName": "Wire to board connector",
                                      "cableConnectorType": "WTB(14 pin)",
                                      "cableConnectorVendorPn": "WL： 0800-H-14P-G34",
                                      "cableConnectorUnitPrice": 0.063,
                                      "cableConnectorWorkingTime": 64,
                                      "cableConnectorMotherPN": "ACES:50208-01401-V01"
                                  }
                              ]
                          },
                          "needExe": false,
                          "fieldType": "mappedValue",
                          "dataType": "float",
                          "default": 0
                      },
                      {
                          "key": "CWSubMertial",
                          "label": "輔料群組",
                          "group": [
                              "cableSupport"
                          ],
                          "switchable": "有使用輔料",
                          "multiple": "新增輔料",
                          "displayConfig": {
                              "grids": 3,
                              "display": true
                          },
                          "items": [
                              {
                                  "key": "CWSubMertialLabel",
                                  "label": "輔料",
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
                                  "level": 2,
                                  "switchable": false,
                                  "maxGroupCount": null
                              },
                              {
                                  "key": "cableSupportMaterial",
                                  "label": "輔料",
                                  "require": false,
                                  "selectorConfig": {
                                      "depends": [],
                                      "values": [
                                          {
                                              "cableSupportMaterial": "地片1"
                                          },
                                          {
                                              "cableSupportMaterial": "地片2"
                                          },
                                          {
                                              "cableSupportMaterial": "KAPTON1"
                                          },
                                          {
                                              "cableSupportMaterial": "KAPTON2"
                                          },
                                          {
                                              "cableSupportMaterial": "醋酸布"
                                          },
                                          {
                                              "cableSupportMaterial": "Teflon膠带"
                                          },
                                          {
                                              "cableSupportMaterial": "導電布1"
                                          },
                                          {
                                              "cableSupportMaterial": "導電布2"
                                          },
                                          {
                                              "cableSupportMaterial": "UV GLUE"
                                          },
                                          {
                                              "cableSupportMaterial": "LABEL"
                                          }
                                      ]
                                  },
                                  "fieldType": "selector",
                                  "dataType": "string",
                                  "multiple": false,
                                  "constrains": [],
                                  "default": null,
                                  "needExe": true,
                                  "displayConfig": {
                                      "display": true,
                                      "grids": 1
                                  }
                              },
                              {
                                  "key": "cableSupportMaterialQty",
                                  "label": "QTY",
                                  "require": false,
                                  "fieldType": "input",
                                  "dataType": "float",
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
                                  "key": "cableSupportMaterialLength",
                                  "label": "長度 (mm)",
                                  "require": false,
                                  "displayConfig": {
                                      "grids": 0.5,
                                      "display": true
                                  },
                                  "fieldType": "input",
                                  "dataType": "float",
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
                                  "key": "cableSupportMaterialWidth",
                                  "label": "寬度 (mm)",
                                  "require": false,
                                  "displayConfig": {
                                      "grids": 0.5,
                                      "display": true
                                  },
                                  "fieldType": "input",
                                  "dataType": "float",
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
                          "maxGroupCount": null,
                          "inline": false
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
      }
  ],
  "formulas": {
      "cableWire": {
          "formula": {
              "total": {
                  "type": "MATH",
                  "label": "總費用",
                  "formula": "a_sumCableMaterialPrice + (b_secondary_processing_cost + secondary_processing_cost_for_aceticAcidCloth) + (c_component_cost + consumable_cost) + package_cost + ((b_secondary_processing_cost + secondary_processing_cost_for_aceticAcidCloth) * 0.1)"
              },
              "a_sumCableMaterialPrice": {
                  "type": "GROUPSUM",
                  "label": "材料費",
                  "bykey": "a_sumCableMaterialPrice",
                  "groups": [
                      "cableConsumable"
                  ]
              },
              "b_secondary_processing_cost": {
                  "type": "GROUPSUM",
                  "label": "二次加工費",
                  "bykey": "b_secondary_processing_cost",
                  "groups": [
                      "cableConsumable"
                  ]
              },
              "c_component_cost": {
                  "type": "GROUPSUM",
                  "label": "零件費",
                  "bykey": "c_component_cost",
                  "groups": [
                      "cableConsumable"
                  ]
              },
              "secondary_processing_cost_for_aceticAcidCloth": {
                  "type": "MATH",
                  "formula": "(6 + (6 * 0.08)) / 60 * 0.067",
                  "label": "醋酸布加工費"
              },
              "package_cost": {
                  "type": "MATH",
                  "formula": "(a_sumCableMaterialPrice + (b_secondary_processing_cost + secondary_processing_cost_for_aceticAcidCloth) + (c_component_cost + consumable_cost)) > 0.8 ? 0.08:0.04",
                  "label": "D. 運包檢"
              },
              "consumable_cost": {
                  "type": "MATH",
                  "formula": "func1 + func2 + func3 + func4 + func5 + func6 + func7 + func8 + func9",
                  "label": "耗材費用"
              },
              "func1": {
                  "type": "MATH",
                  "formula": "1 * 0.0001 * ( 1+ loss_rate)",
                  "label": "助焊劑"
              },
              "func2": {
                  "type": "MATH",
                  "formula": "1 * 0.0001 * ( 1+ loss_rate)",
                  "label": "酒精"
              },
              "func3": {
                  "type": "MATH",
                  "formula": "1 * 0.0003 * ( 1+ loss_rate)",
                  "label": "雙面膠紙"
              },
              "func4": {
                  "type": "MATH",
                  "formula": "1 * 0 * ( 1+ loss_rate)",
                  "label": "美紋膠紙"
              },
              "func5": {
                  "type": "MATH",
                  "formula": "1 * 0.0001 * ( 1+ loss_rate)",
                  "label": "棉紙"
              },
              "func6": {
                  "type": "MATH",
                  "formula": "1 * 0.0007 * ( 1+ loss_rate)",
                  "label": "防焊膠紙"
              },
              "func7": {
                  "type": "MATH",
                  "formula": "1 * 0.0108 * ( 1+ loss_rate)",
                  "label": "美紋紙 耐高溫型"
              },
              "func8": {
                  "type": "MATH",
                  "formula": "1 * 0.0047 * ( 1+ loss_rate)",
                  "label": "PE膜"
              },
              "func9": {
                  "type": "MATH",
                  "formula": "1 * 0.0068 * ( 1+ loss_rate)",
                  "label": "錫絲"
              }
          },
          "constant": {
              "loss_rate": {
                  "label": "loss_rate",
                  "value": 0.015
              }
          },
          "output": {
              "total": "total",
              "a_sumCableMaterialPrice": "a_sumCableMaterialPrice",
              "b_secondary_processing_cost": "b_secondary_processing_cost",
              "c_component_cost": "c_component_cost",
              "consumable_cost": "consumable_cost",
              "d_package_cost": "package_cost",
              "secondary_processing_cost_for_aceticAcidCloth": "secondary_processing_cost_for_aceticAcidCloth"
          }
      },
      "cableSupport": {
          "formula": {
              "aceticAcidClothQty": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial, cableSupportMaterialQty) => { return cableSupportMaterial=='醋酸布'? cableSupportMaterialQty:0  }",
                  "label": "醋酸布qty",
                  "param": [
                      "cableSupportMaterial",
                      "cableSupportMaterialQty"
                  ]
              },
              "supportCostCondition": {
                  "type": "MATH",
                  "formula": "CWSubMertial?supportCost:0",
                  "label": "輔料費(判斷是否使用輔料)"
              },
              "assemblyCondition": {
                  "type": "MATH",
                  "formula": "CWSubMertial?assembly:0",
                  "label": "輔料組裝時間(判斷是否使用輔料)"
              },
              "supportCost": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial,special,general, aceticAcidClothPrice)=>{ switch(cableSupportMaterial) { case 'KAPTON1': return special; case 'KAPTON2': return special; case 'Teflon膠带': return special; case '導電布1': return special; case '導電布2': return special; case '地片1': return general; case '地片2': return general; case 'UV GLUE': return general; case 'LABEL': return general; case '醋酸布': return aceticAcidClothPrice; }}",
                  "label": "輔料費",
                  "param": [
                      "cableSupportMaterial",
                      "special",
                      "general",
                      "aceticAcidClothPrice"
                  ]
              },
              "general": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial, cableSupportMaterialQty, const1, loss_rate, general_sub1) => { return cableSupportMaterial.includes('地片')  ? cableSupportMaterialQty * const1 * (1+ loss_rate):general_sub1 }",
                  "label": "地片輔料費 或 general_sub1輔料費",
                  "param": [
                      "cableSupportMaterial",
                      "cableSupportMaterialQty",
                      "const1",
                      "loss_rate",
                      "general_sub1"
                  ]
              },
              "general_sub1": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial, cableSupportMaterialQty, const2, loss_rate, const3) => { return cableSupportMaterial.includes('LABEL')  ? cableSupportMaterialQty * const2 * (1+ loss_rate):cableSupportMaterialQty * const3 * (1+ loss_rate) }",
                  "label": "LABEL輔料費 OR UV GLUE輔料費",
                  "param": [
                      "cableSupportMaterial",
                      "cableSupportMaterialQty",
                      "const2",
                      "loss_rate",
                      "const3"
                  ]
              },
              "special": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial, cableSupportMaterialQty ,special_sub1 ,special_sub2) => { return cableSupportMaterial.includes('KAPTON') || cableSupportMaterial.includes('Teflon膠带')  ? special_sub1:special_sub2 }",
                  "label": "(KAPTON and Teflon膠带) OR (導電布)",
                  "param": [
                      "cableSupportMaterial",
                      "cableSupportMaterialQty",
                      "special_sub1",
                      "special_sub2"
                  ]
              },
              "special_sub1": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial, cableSupportMaterialQty, const4, cableSupportMaterialLength, cableSupportMaterialWidth, loss_rate, const5) => { return cableSupportMaterial.includes('KAPTON')  ? cableSupportMaterialQty * const4 *(cableSupportMaterialLength * cableSupportMaterialWidth/1000000) *(1+ loss_rate):cableSupportMaterialQty * const5 *(cableSupportMaterialLength * cableSupportMaterialWidth/1000000) *(1+ loss_rate) }",
                  "label": "KAPTON OR Teflon膠带",
                  "param": [
                      "cableSupportMaterial",
                      "cableSupportMaterialQty",
                      "const4",
                      "cableSupportMaterialLength",
                      "cableSupportMaterialWidth",
                      "loss_rate",
                      "const5"
                  ]
              },
              "special_sub2": {
                  "type": "MATH",
                  "formula": "cableSupportMaterialQty * conductive_cloth_unit_price * ( 1 + loss_rate)",
                  "label": "導電布"
              },
              "conductive_cloth_unit_price": {
                  "type": "MATH",
                  "formula": "cableSupportMaterialLength * cableSupportMaterialWidth * 0.000001 * 32.5",
                  "label": "導電布單價"
              },
              "assembly": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial, aceticAcidClothAssembly, assembly_sub1) => { return cableSupportMaterial == '醋酸布' ?aceticAcidClothAssembly :assembly_sub1 }",
                  "label": "cable support assembly time",
                  "param": [
                      "cableSupportMaterial",
                      "aceticAcidClothAssembly",
                      "assembly_sub1"
                  ]
              },
              "assembly_sub1": {
                  "type": "FUNC",
                  "formula": "(cableSupportMaterial, cableSupportMaterialQty) => { return cableSupportMaterial=='UV GLUE' ? 0:cableSupportMaterialQty * 12 }",
                  "label": "assembly",
                  "param": [
                      "cableSupportMaterial",
                      "cableSupportMaterialQty"
                  ]
              },
              "aceticAcidClothPrice": {
                  "type": "MATH",
                  "formula": "cableSupportMaterialQty>0 ? cableSupportMaterialQty * acetic_acid_cloth_unit_price * (sumCableMaterialLength * 2) *(sumCableMaterialPin * 0.5/ 1000000) * ( 1 + acetic_acid_cloth_loss_rate):0",
                  "label": "醋酸布費用"
              },
              "aceticAcidClothAssembly": {
                  "type": "MATH",
                  "formula": "cableSupportMaterialQty * (sumCableMaterialLength / 30)",
                  "label": "醋酸布 assembly time (原本公式會加上 常數 6, 因為只能計算一次 ，所以把 6 移到 CableConsumable.yaml 的 total_assembly 才加)"
              }
          },
          "scope": {
              "cableSupportMaterial": "cableSupportMaterial",
              "cableSupportMaterialQty": "cableSupportMaterialQty",
              "cableSupportMaterialLength": "cableSupportMaterialLength",
              "cableSupportMaterialWidth": "cableSupportMaterialWidth",
              "CWSubMertial": "CWSubMertial"
          },
          "constant": {
              "const1": {
                  "label": "地片單價",
                  "value": 0.0049
              },
              "const2": {
                  "label": "label單價",
                  "value": 0.001
              },
              "const3": {
                  "label": "UV GLUE單價",
                  "value": 0.0001
              },
              "const4": {
                  "label": "KAPTON單價",
                  "value": 1.1527
              },
              "const5": {
                  "label": "Teflon膠带單價",
                  "value": 3.0259
              },
              "loss_rate": {
                  "label": "loss rate",
                  "value": 0.015
              },
              "acetic_acid_cloth_unit_price": {
                  "label": "醋酸布單價",
                  "value": 0.8
              },
              "acetic_acid_cloth_loss_rate": {
                  "label": "醋酸布 loss rate",
                  "value": 0.015
              }
          },
          "output": {
              "supportCost": "supportCostCondition",
              "supportAssembly": "assemblyCondition",
              "aceticAcidClothQty": "aceticAcidClothQty"
          },
          "global": {
              "sumCableMaterialLength": {
                  "type": "GROUPSUM",
                  "label": "材料長度總和",
                  "bykey": "cableMaterialLength",
                  "groups": [
                      "cableMaterial"
                  ]
              },
              "sumCableMaterialPin": {
                  "type": "GROUPSUM",
                  "label": "材料PIN數總和",
                  "bykey": "cableMaterialPin",
                  "groups": [
                      "cableMaterial"
                  ]
              }
          }
      },
      "cableConnector": {
          "formula": {
              "total": {
                  "type": "MATH",
                  "formula": "1 * cableConnectorUnitPrice * (1 + loss_rate)",
                  "label": "connector費用"
              },
              "assembly": {
                  "type": "MATH",
                  "formula": "1 * cableConnectorWorkingTime",
                  "label": "assembly time"
              }
          },
          "scope": {
              "cableConnectorUnitPrice": "cableConnectorUnitPrice",
              "cableConnectorWorkingTime": "cableConnectorWorkingTime"
          },
          "constant": {
              "loss_rate": {
                  "label": "loss_rate",
                  "value": 0.03
              }
          },
          "output": {
              "connectorPrice": "total",
              "connectorAssembly": "assembly"
          }
      },
      "cableConsumable": {
          "formula": {
              "total": {
                  "type": "MATH",
                  "formula": "sumCableMaterialPrice + secondary_processing_cost + component_cost +  (secondary_processing_cost * 0.1)",
                  "label": "Cable Wire 總費用"
              },
              "sumCableMaterialPrice": {
                  "type": "GROUPSUM",
                  "label": "A. 材料費",
                  "bykey": "cableMaterialPrice",
                  "groups": [
                      "cableMaterial"
                  ]
              },
              "secondary_processing_cost": {
                  "type": "MATH",
                  "formula": "(total_assembly + (total_assembly * 0.08)) / 60 * 0.067",
                  "label": "B. 二次加工費"
              },
              "component_cost": {
                  "type": "MATH",
                  "formula": "sumConnectorTotalPrice + sumSupportPrice",
                  "label": "C. 零件費 (耗材只要加一次, 移到 CableWire 一次做加總)"
              },
              "sumConnectorTotalPrice": {
                  "type": "GROUPSUM",
                  "label": "connector費用",
                  "bykey": "connectorPrice",
                  "groups": [
                      "cableConnector"
                  ]
              },
              "sumSupportPrice": {
                  "type": "GROUPSUM",
                  "label": "輔料費總和",
                  "bykey": "supportCost",
                  "groups": [
                      "cableSupport"
                  ]
              },
              "sumAceticAcidClothQty": {
                  "type": "GROUPSUM",
                  "label": "醋酸布數量",
                  "bykey": "aceticAcidClothQty",
                  "groups": [
                      "cableSupport"
                  ]
              },
              "total_assembly": {
                  "type": "MATH",
                  "formula": "sumConnectorAssembly + sumSupportAssembly",
                  "label": "assembly time 總和(輔料組裝時間 + connector 組裝時間)"
              },
              "sumConnectorAssembly": {
                  "type": "GROUPSUM",
                  "label": "connector組裝時間總和",
                  "bykey": "connectorAssembly",
                  "groups": [
                      "cableConnector"
                  ]
              },
              "sumSupportAssembly": {
                  "type": "GROUPSUM",
                  "label": "輔料組裝時間總和",
                  "bykey": "supportAssembly",
                  "groups": [
                      "cableSupport"
                  ]
              }
          },
          "output": {
              "total": "total",
              "a_sumCableMaterialPrice": "sumCableMaterialPrice",
              "b_secondary_processing_cost": "secondary_processing_cost",
              "c_component_cost": "component_cost",
              "sumAceticAcidClothQty": "sumAceticAcidClothQty"
          }
      },
      "cableMaterial": {
          "formula": {
              "total": {
                  "type": "MATH",
                  "formula": "(cableMaterialUnitPrice * 0.001) * cableMaterialLength *cableMaterialPin *(1+loss_rate)",
                  "label": "計算結果"
              }
          },
          "scope": {
              "cableMaterialUnitPrice": "cableMaterialUnitPrice",
              "cableMaterialLength": "cableMaterialLength",
              "cableMaterialPin": "cableMaterialPin"
          },
          "constant": {
              "loss_rate": {
                  "label": "loss_rate",
                  "value": 0.03
              }
          },
          "output": {
              "cableMaterialPrice": "total",
              "pin": "cableMaterialPin",
              "cableLength": "cableMaterialLength"
          }
      }
  }
};

export default data;

