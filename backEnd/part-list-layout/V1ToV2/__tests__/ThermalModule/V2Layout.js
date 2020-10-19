/* eslint-disable quote-props */
/* eslint-disable quotes */

const data = {
  "version": 2,
  "layout": [
    {
      "key": "thermal-module",
      "group": [
        "thermalModule"
      ],
      "label": "default",
      "visiable": false,
      "items": [
        {
          "key": "Fan",
          "label": "Fan",
          "group": [
            "Fan"
          ],
          "multiple": true,
          "items": [
            {
              "key": "fanLabel",
              "label": "Fan",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Fan",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "fanAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "fanType",
              "label": "風扇型式",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "fanType": "Axial(軸流扇)"
                  },
                  {
                    "fanType": "Cross Flow Fan(橫流扇)"
                  },
                  {
                    "fanType": "Blower(離心扇)"
                  }
                ]
              },
              "displayConfig": {
                "display": true,
                "grids": 1
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
              "key": "fanSize",
              "label": "Size",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "fanSize": "60*60*3.5",
                    "fanSizePrice": 5.5
                  },
                  {
                    "fanSize": "60*60*4",
                    "fanSizePrice": 3.7
                  },
                  {
                    "fanSize": "60*60*4.5",
                    "fanSizePrice": 3.5
                  },
                  {
                    "fanSize": "60*60*5",
                    "fanSizePrice": 2.5
                  },
                  {
                    "fanSize": "60*60*5.5",
                    "fanSizePrice": 2.1
                  },
                  {
                    "fanSize": "60*60*6",
                    "fanSizePrice": 1.75
                  },
                  {
                    "fanSize": "60*60*6.5",
                    "fanSizePrice": 1.65
                  },
                  {
                    "fanSize": "60*60*7",
                    "fanSizePrice": 1.4
                  },
                  {
                    "fanSize": "60*60*7.5",
                    "fanSizePrice": 1.4
                  },
                  {
                    "fanSize": "80*80*5.5",
                    "fanSizePrice": 2.2
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "fanSizePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "fanSize"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "fanSize": "60*60*3.5",
                    "fanSizePrice": 5.5
                  },
                  {
                    "fanSize": "60*60*4",
                    "fanSizePrice": 3.7
                  },
                  {
                    "fanSize": "60*60*4.5",
                    "fanSizePrice": 3.5
                  },
                  {
                    "fanSize": "60*60*5",
                    "fanSizePrice": 2.5
                  },
                  {
                    "fanSize": "60*60*5.5",
                    "fanSizePrice": 2.1
                  },
                  {
                    "fanSize": "60*60*6",
                    "fanSizePrice": 1.75
                  },
                  {
                    "fanSize": "60*60*6.5",
                    "fanSizePrice": 1.65
                  },
                  {
                    "fanSize": "60*60*7",
                    "fanSizePrice": 1.4
                  },
                  {
                    "fanSize": "60*60*7.5",
                    "fanSizePrice": 1.4
                  },
                  {
                    "fanSize": "80*80*5.5",
                    "fanSizePrice": 2.2
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "motorArchitecture",
              "label": "馬達架構",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "motorArchitecture": "1_phase_H<=7.5",
                    "motorArchitecturePrice": 0
                  },
                  {
                    "motorArchitecture": "3_phase_H<=4.5",
                    "motorArchitecturePrice": 0
                  },
                  {
                    "motorArchitecture": "3_phase_H>=5.0",
                    "motorArchitecturePrice": 0.25
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "motorArchitecturePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "motorArchitecture"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "motorArchitecture": "1_phase_H<=7.5",
                    "motorArchitecturePrice": 0
                  },
                  {
                    "motorArchitecture": "3_phase_H<=4.5",
                    "motorArchitecturePrice": 0
                  },
                  {
                    "motorArchitecture": "3_phase_H>=5.0",
                    "motorArchitecturePrice": 0.25
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "bearingAndSleeve",
              "label": "軸承和套筒",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "bearingAndSleeve": "Sleeve+塑膠_H<=7.5",
                    "bearingAndSleevePrice": 0
                  },
                  {
                    "bearingAndSleeve": "Sleeve+金屬_H<=7.5",
                    "bearingAndSleevePrice": 0
                  },
                  {
                    "bearingAndSleeve": "FDB+金屬_H<=4.5",
                    "bearingAndSleevePrice": 0
                  },
                  {
                    "bearingAndSleeve": "FDB+金屬_H>=5.0",
                    "bearingAndSleevePrice": 0.35
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "bearingAndSleevePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "bearingAndSleeve"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "bearingAndSleeve": "Sleeve+塑膠_H<=7.5",
                    "bearingAndSleevePrice": 0
                  },
                  {
                    "bearingAndSleeve": "Sleeve+金屬_H<=7.5",
                    "bearingAndSleevePrice": 0
                  },
                  {
                    "bearingAndSleeve": "FDB+金屬_H<=4.5",
                    "bearingAndSleevePrice": 0
                  },
                  {
                    "bearingAndSleeve": "FDB+金屬_H>=5.0",
                    "bearingAndSleevePrice": 0.35
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "fanBladeMaterial",
              "label": "扇葉材料",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "fanBladeMaterial": "PBT_H<=7.5",
                    "fanBladeMaterialPrice": 0
                  },
                  {
                    "fanBladeMaterial": "LCP_H<= 5.5",
                    "fanBladeMaterialPrice": 0.1
                  },
                  {
                    "fanBladeMaterial": "LCP_H>=6",
                    "fanBladeMaterialPrice": 0.15
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "fanBladeMaterialPrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "fanBladeMaterial"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "fanBladeMaterial": "PBT_H<=7.5",
                    "fanBladeMaterialPrice": 0
                  },
                  {
                    "fanBladeMaterial": "LCP_H<= 5.5",
                    "fanBladeMaterialPrice": 0.1
                  },
                  {
                    "fanBladeMaterial": "LCP_H>=6",
                    "fanBladeMaterialPrice": 0.15
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "magnetMaterialAndSize",
              "label": "磁石材料及尺寸",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "magnetMaterialAndSize": "橡膠_H<=7.5",
                    "magnetMaterialAndSizePrice": 0
                  },
                  {
                    "magnetMaterialAndSize": "MQ_H<= 5.5",
                    "magnetMaterialAndSizePrice": 0.1
                  },
                  {
                    "magnetMaterialAndSize": "MQ_H>=6",
                    "magnetMaterialAndSizePrice": 0.15
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "magnetMaterialAndSizePrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "magnetMaterialAndSize"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "magnetMaterialAndSize": "橡膠_H<=7.5",
                    "magnetMaterialAndSizePrice": 0
                  },
                  {
                    "magnetMaterialAndSize": "MQ_H<= 5.5",
                    "magnetMaterialAndSizePrice": 0.1
                  },
                  {
                    "magnetMaterialAndSize": "MQ_H>=6",
                    "magnetMaterialAndSizePrice": 0.15
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "hasHalogen",
              "label": "有鹵",
              "displayConfig": {
                "grids": 1,
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
              "key": "fanAppearanceProcess1",
              "label": "外觀表面處理#1",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "fanAppearanceProcess1": "塗黑"
                  }
                ]
              },
              "displayConfig": {
                "display": true,
                "grids": 1
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
              "key": "fanAppearanceProcess2",
              "label": "外觀表面處理#2",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "fanAppearanceProcess2": "塗黑"
                  }
                ]
              },
              "displayConfig": {
                "display": true,
                "grids": 1
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true
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
          "key": "Pipe",
          "label": "Pipe",
          "group": [
            "Pipe"
          ],
          "multiple": true,
          "items": [
            {
              "key": "pipeLabel",
              "label": "Pipe",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Pipe",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "pipeAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "pipeType",
              "label": "Pipe型式",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "pipeType": "Powder(結燒管)"
                  },
                  {
                    "pipeType": "Groove(溝槽管)"
                  },
                  {
                    "pipeType": "Complex(複合管)"
                  },
                  {
                    "pipeType": "VC(均熱管)"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "outerDiameter",
              "label": "外徑",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "outerDiameter": "CD6_"
                  },
                  {
                    "outerDiameter": "CD8_"
                  },
                  {
                    "outerDiameter": "PD6_"
                  },
                  {
                    "outerDiameter": "PD8_"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "pipeLength",
              "label": "長度(L)",
              "displayConfig": {
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
              "key": "pipiLenThickODiaToCost",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "outerDiameter",
                "pipeLength",
                "pipeFlatteningThickness"
              ],
              "func": "(od, len, flth) => { let cost = 0; switch(od) { case 'CD6_': if(len > 300) { if(flth < 1.0){ return 1.05; } if(flth >= 1.0 && flth < 1.2){ return 0.95; } if(flth >= 1.2 && flth < 1.5){ return 0.95; } if(flth >= 1.5 && flth < 2.0){ return 0.70; } if(flth >= 2.0 && flth < 2.5){ return 0.65; } if(flth >= 2.5){ return 0.65; } } if(len > 250 && len <= 300 ) { if(flth < 1.0){ return 0.95; } if(flth >= 1.0 && flth < 1.2){ return 0.95; } if(flth >= 1.2 && flth < 1.5){ return 0.90; } if(flth >= 1.5 && flth < 2.0){ return 0.70; } if(flth >= 2.0 && flth < 2.5){ return 0.63; } if(flth >= 2.5){ return 0.63; } } if(len <= 250 ) { if(flth < 1.0){ return 0.85; } if(flth >= 1.0 && flth < 1.2){ return 0.95; } if(flth >= 1.2 && flth < 1.5){ return 0.80; } if(flth >= 1.5 && flth < 2.0){ return 0.65; } if(flth >= 2.0 && flth < 2.5){ return 0.60; } if(flth >= 2.5){ return 0.60; } } case 'CD8_': if(len > 300) { if(flth < 1.5){ return 1.20; } if(flth >= 1.5 && flth < 2.0){ return 1.00; } if(flth >= 2.0 && flth < 2.5){ return 0.95; } if(flth >= 2.5){ return 0.95; } } if(len > 250 && len <= 300 ) { if(flth < 1.5){ return 1.10; } if(flth >= 1.5 && flth < 2.0){ return 0.90; } if(flth >= 2.0 && flth < 2.5){ return 0.88; } if(flth >= 2.5){ return 0.88; } } if(len <= 250 ) { if(flth < 1.5){ return 1.00; } if(flth >= 1.5 && flth < 2.0){ return 0.80; } if(flth >= 2.0 && flth < 2.5){ return 0.80; } if(flth >= 2.5){ return 0.80; } } case 'PD6_': if(len > 300) { if(flth < 1.0){ return 1.03; } if(flth >= 1.0 && flth < 1.2){ return 0.95; } if(flth >= 1.2 && flth < 1.5){ return 0.90; } if(flth >= 1.5 && flth < 2.0){ return 0.75; } if(flth >= 2.0 && flth < 2.5){ return 0.65; } if(flth >= 2.5){ return 0.65; } } if(len > 250 && len <= 300 ) { if(flth < 1.0){ return 0.93; } if(flth >= 1.0 && flth < 1.2){ return 0.95; } if(flth >= 1.2 && flth < 1.5){ return 0.85; } if(flth >= 1.5 && flth < 2.0){ return 0.65; } if(flth >= 2.0 && flth < 2.5){ return 0.65; } if(flth >= 2.5){ return 0.65; } } if(len <= 250 ) { if(flth < 1.0){ return 0.83; } if(flth >= 1.0 && flth < 1.2){ return 0.95; } if(flth >= 1.2 && flth < 1.5){ return 0.75; } if(flth >= 1.5 && flth < 2.0){ return 0.63; } if(flth >= 2.0 && flth < 2.5){ return 0.60; } if(flth >= 2.5){ return 0.60; } } case 'PD8_': if(len > 300) { if(flth < 1.5){ return 1.10; } if(flth >= 1.5 && flth < 2.0){ return 0.95; } if(flth >= 2.0 && flth < 2.5){ return 0.92; } if(flth >= 2.5){ return 0.92; } } if(len > 250 && len <= 300 ) { if(flth < 1.5){ return 1.00; } if(flth >= 1.5 && flth < 2.0){ return 0.85; } if(flth >= 2.0 && flth < 2.5){ return 0.85; } if(flth >= 2.5){ return 0.85; } } if(len <= 250 ) { if(flth < 1.5){ return 0.90; } if(flth >= 1.5 && flth < 2.0){ return 0.75; } if(flth >= 2.0 && flth < 2.5){ return 0.75; } if(flth >= 2.5){ return 0.75; } } } }",
              "fieldType": "mappedFunc",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "pipiLenODiaToCost",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "outerDiameter",
                "pipeLength"
              ],
              "func": "(od, len) => { let cost = 0; switch(od) { case 'D4_': if(len >=250) { return 0.75; } if(len>=200 && len < 250){ return 0.7; } if(len>=175 && len < 200){ return 0.65; } if(len>0 && len < 175){ return 0.6; } case 'D6_': if(len >=250) { return 0.75; } if(len>=200 && len < 250){ return 0.7; } if(len>=175 && len < 200){ return 0.65; } if(len>0 && len < 175){ return 0.6; } case 'D8_': if(len >=250) { return 0.95; } if(len>=200 && len < 250){ return 0.9; } if(len>=175 && len < 200){ return 0.85; } if(len>0 && len < 175){ return 0.8; } default: console.log('INVALID CASE'); return null; } }",
              "fieldType": "mappedFunc",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "pipeFlatteningThickness",
              "label": "打扁厚度",
              "displayConfig": {
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
              "key": "pipiFlThickODiaToCost",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "outerDiameter",
                "pipeFlatteningThickness"
              ],
              "func": "(od, flth) => { let cost = 0; switch(od) { case 'D4_': if(flth >= 2) { return 0; } if(flth >= 1.8 && flth < 2){ return 0.15; } if(flth >= 1.6 && flth < 1.8){ return 0.2; } if(flth >= 1.4 && flth < 1.6){ return 0.25; } if(flth >= 1.2 && flth < 1.4){ return 0.35; } if(flth >= 1.0 && flth < 1.2){ return 0.45; } if(flth >= 0.8 && flth < 1.0){ return 0.6; } if(flth >= 0.6 && flth < 0.8){ return 0.8; } if(flth >= 0.0 && flth < 0.6){ return 1; } case 'D6_': if(flth >= 2) { return 0; } if(flth >= 1.8 && flth < 2){ return 0.15; } if(flth >= 1.6 && flth < 1.8){ return 0.2; } if(flth >= 1.4 && flth < 1.6){ return 0.25; } if(flth >= 1.2 && flth < 1.4){ return 0.35; } if(flth >= 1.0 && flth < 1.2){ return 0.45; } if(flth >= 0.8 && flth < 1.0){ return 0.6; } if(flth >= 0.0 && flth < 0.8){ return 1; } case 'D8_': if(flth >= 2) { return 0; } if(flth >= 1.8 && flth < 2){ return 0.25; } if(flth >= 1.6 && flth < 1.8){ return 0.3; } if(flth >= 1.4 && flth < 1.6){ return 0.4; } if(flth >= 1.2 && flth < 1.4){ return 0.5; } if(flth >= 1.0 && flth < 1.2){ return 0.6; } if(flth >= 0.0 && flth < 1.0){ return 1; } default: console.log('INVALID CASE'); return null; } }",
              "fieldType": "mappedFunc",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "pipeAppearanceProcess1",
              "label": "外觀表面處理#1",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "pipeAppearanceProcess1": "塗黑"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "pipeAppearanceProcess2",
              "label": "外觀表面處理#2",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "pipeAppearanceProcess2": "塗黑"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
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
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "Fin",
          "label": "Fin",
          "group": [
            "Fin"
          ],
          "multiple": true,
          "items": [
            {
              "key": "finLabel",
              "label": "Fin",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Fin",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "finAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "finMaterial",
              "label": "材料",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 3.6
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.4,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.4,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL6063",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 4
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 2.4
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 2.1
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "CU01",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "C1840",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.1,
                    "finMaterialCostPerKilogram": 8.6
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "TMS02",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400i",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 4.29
                  },
                  {
                    "finMaterial": "SUS410",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": 4.41
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 6.6
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 6
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 6.6
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 6
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "低碳鋼18A",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": 2.14
                  },
                  {
                    "finMaterial": "快削鋼",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": null
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "finPitch",
              "label": "Pitch",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "finProductionSize",
              "label": "成品尺寸",
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "items": [
                {
                  "key": "finProductionLength",
                  "label": "長度(L)",
                  "displayConfig": {
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
                  "key": "finProductionWidth",
                  "label": "寬度(W)",
                  "displayConfig": {
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
                  "key": "finProductionHigh",
                  "label": "高度(H)",
                  "displayConfig": {
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
              "fieldType": "compositeInline",
              "multiple": false,
              "needExe": true,
              "switchable": false,
              "visiable": true,
              "maxGroupCount": null,
              "inline": true
            },
            {
              "key": "finProductionExpandSize",
              "label": "成品展開尺寸",
              "displayConfig": {
                "grids": 2,
                "display": true
              },
              "items": [
                {
                  "key": "finProductionExpandLength",
                  "label": "長度(L)",
                  "displayConfig": {
                    "grids": 1,
                    "display": true
                  },
                  "func": "()=>{ let fpel = finProductionHigh + finPitch*2 +5; return fpel; }",
                  "replaceBy": [
                    "finProductionHigh",
                    "finPitch"
                  ],
                  "fieldType": "realtimeFormula",
                  "dataType": "float",
                  "default": 0,
                  "parameters": [],
                  "needExe": true
                },
                {
                  "key": "finProductionExpandWidth",
                  "label": "寬度(W)",
                  "displayConfig": {
                    "grids": 1,
                    "display": true
                  },
                  "func": "()=>{ let fpew = finProductionWidth + 10; return fpew; }",
                  "replaceBy": [
                    "finProductionWidth"
                  ],
                  "fieldType": "realtimeFormula",
                  "dataType": "float",
                  "default": 0,
                  "parameters": [],
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
              "key": "finMaterialCostPerKilogram",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "finMaterial",
                "finMaterialThickness"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 3.6
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.4,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.4,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL6063",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 4
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 2.4
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 2.1
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "CU01",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "C1840",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.1,
                    "finMaterialCostPerKilogram": 8.6
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "TMS02",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400i",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 4.29
                  },
                  {
                    "finMaterial": "SUS410",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": 4.41
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 6.6
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 6
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 6.6
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 6
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "低碳鋼18A",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": 2.14
                  },
                  {
                    "finMaterial": "快削鋼",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": null
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "finDensity",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "finMaterial"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "finMaterial": "AL1050",
                    "finDensity": 2.75
                  },
                  {
                    "finMaterial": "AL5052",
                    "finDensity": 2.75
                  },
                  {
                    "finMaterial": "SUS301",
                    "finDensity": 7.93
                  },
                  {
                    "finMaterial": "SUS304",
                    "finDensity": 7.93
                  },
                  {
                    "finMaterial": "SUS403",
                    "finDensity": 7.93
                  },
                  {
                    "finMaterial": "SUS430",
                    "finDensity": 7.93
                  },
                  {
                    "finMaterial": "SECC",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "SGCC",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "SPCC",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "SGLD",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "SPTE",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "Cu3604",
                    "finDensity": 8.9
                  },
                  {
                    "finMaterial": "低碳鋼1018",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "快削鋼",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "SUS410",
                    "finDensity": 7.93
                  },
                  {
                    "finMaterial": "磷青銅",
                    "finDensity": 8.9
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finDensity": 8.9
                  },
                  {
                    "finMaterial": "CU1100",
                    "finDensity": 8.9
                  },
                  {
                    "finMaterial": "CU01",
                    "finDensity": 8.9
                  },
                  {
                    "finMaterial": "C18400",
                    "finDensity": 8.8
                  },
                  {
                    "finMaterial": "AL6061",
                    "finDensity": 2.75
                  },
                  {
                    "finMaterial": "AL6063",
                    "finDensity": 2.75
                  },
                  {
                    "finMaterial": "KU400",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "KU400i",
                    "finDensity": 7.85
                  },
                  {
                    "finMaterial": "皮銅",
                    "finDensity": 8.8
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "finMaterialThickness",
              "label": "材料厚度",
              "selectorConfig": {
                "depends": [
                  "finMaterial"
                ],
                "values": [
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 3.6
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.4,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 2.9
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL1050",
                    "finMaterialThickness": 3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.4,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL5052",
                    "finMaterialThickness": 3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "AL6063",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 4
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SGCC",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SECC",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPCC",
                    "finMaterialThickness": 1.6,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 2.4
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 2.1
                  },
                  {
                    "finMaterial": "SPTE",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.1,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "PH-CU",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "CU01",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "C1840",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.1,
                    "finMaterialCostPerKilogram": 8.6
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.2,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.6,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "CU1100",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 8.2
                  },
                  {
                    "finMaterial": "TMS02",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 0
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 0.8,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1.2,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 1.5,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400",
                    "finMaterialThickness": 2,
                    "finMaterialCostPerKilogram": 1.5
                  },
                  {
                    "finMaterial": "KU400i",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 4.29
                  },
                  {
                    "finMaterial": "SUS410",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": 4.41
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 6.6
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 6
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS301",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.15,
                    "finMaterialCostPerKilogram": 6.6
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.3,
                    "finMaterialCostPerKilogram": 6
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 0.5,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "SUS304",
                    "finMaterialThickness": 1,
                    "finMaterialCostPerKilogram": 5.8
                  },
                  {
                    "finMaterial": "低碳鋼18A",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": 2.14
                  },
                  {
                    "finMaterial": "快削鋼",
                    "finMaterialThickness": null,
                    "finMaterialCostPerKilogram": null
                  }
                ]
              },
              "displayConfig": {
                "grids": 1,
                "depends": {
                  "action": "lock",
                  "condition": {
                    "finMaterial": true
                  }
                },
                "display": true
              },
              "fieldType": "selector",
              "dataType": "float",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": 0,
              "needExe": true
            },
            {
              "key": "finNickelPlating",
              "label": "鍍鎳",
              "displayConfig": {
                "grids": 1,
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
              "key": "finAppearanceProcess1",
              "label": "外觀表面處理#1",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "finAppearanceProcess1": "塗黑"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "finAppearanceProcess2",
              "label": "外觀表面處理#2",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "finAppearanceProcess2": "塗黑"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
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
          "visiable": true,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "ThermalPlate",
          "label": "Thermal Plate",
          "group": [
            "ThermalPlate"
          ],
          "multiple": true,
          "items": [
            {
              "key": "thPlLabel",
              "label": "Thermal Plate",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Thermal Plate",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "thPlAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thPlMaterial",
              "label": "材料",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 3.6
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.4,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.4,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL6063",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 4
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 2.4
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 2.1
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "CU01",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "C1840",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.1,
                    "thPlMaterialCostPerKilogram": 8.6
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "TMS02",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400i",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 4.29
                  },
                  {
                    "thPlMaterial": "SUS410",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": 4.41
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 6
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 6
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "低碳鋼18A",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": 2.14
                  },
                  {
                    "thPlMaterial": "快削鋼",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": null
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thPlMaterialCostPerKilogram",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "thPlMaterial",
                "thPlMaterialThickness"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 3.6
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.4,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.4,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL6063",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 4
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 2.4
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 2.1
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "CU01",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "C1840",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.1,
                    "thPlMaterialCostPerKilogram": 8.6
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "TMS02",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400i",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 4.29
                  },
                  {
                    "thPlMaterial": "SUS410",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": 4.41
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 6
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 6
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "低碳鋼18A",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": 2.14
                  },
                  {
                    "thPlMaterial": "快削鋼",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": null
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "thPlMaterialThickness",
              "label": "材料厚度",
              "selectorConfig": {
                "depends": [
                  "thPlMaterial"
                ],
                "values": [
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 3.6
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.4,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL1050",
                    "thPlMaterialThickness": 3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.4,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlMaterialThickness": 3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "AL6063",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 4
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlMaterialThickness": 1.6,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 2.4
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 2.1
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.1,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "CU01",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "C1840",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.1,
                    "thPlMaterialCostPerKilogram": 8.6
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.2,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.6,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thPlMaterial": "TMS02",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 0
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 0.8,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1.2,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 1.5,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlMaterialThickness": 2,
                    "thPlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thPlMaterial": "KU400i",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 4.29
                  },
                  {
                    "thPlMaterial": "SUS410",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": 4.41
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 6
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.15,
                    "thPlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.3,
                    "thPlMaterialCostPerKilogram": 6
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 0.5,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlMaterialThickness": 1,
                    "thPlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thPlMaterial": "低碳鋼18A",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": 2.14
                  },
                  {
                    "thPlMaterial": "快削鋼",
                    "thPlMaterialThickness": null,
                    "thPlMaterialCostPerKilogram": null
                  }
                ]
              },
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "thPlMaterial": true
                  }
                },
                "display": true,
                "grids": 1
              },
              "fieldType": "selector",
              "dataType": "float",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": 0,
              "needExe": true
            },
            {
              "key": "thPlProductionSize",
              "label": "成品尺寸",
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "items": [
                {
                  "key": "thPlProductionLength",
                  "label": "長度(L)",
                  "displayConfig": {
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
                  "key": "thPlProductionWidth",
                  "label": "寬度(W)",
                  "displayConfig": {
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
                  "key": "thPlProductionHigh",
                  "label": "高度(H)",
                  "displayConfig": {
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
              "fieldType": "compositeInline",
              "multiple": false,
              "needExe": true,
              "switchable": false,
              "visiable": true,
              "maxGroupCount": null,
              "inline": true
            },
            {
              "key": "thPlProductionExpandSize",
              "label": "成品展開尺寸",
              "displayConfig": {
                "grids": 2,
                "display": true
              },
              "items": [
                {
                  "key": "thPlProductionExpandLength",
                  "label": "長度(L)",
                  "displayConfig": {
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
                  "key": "thPlProductionExpandWidth",
                  "label": "寬度(W)",
                  "displayConfig": {
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
              "fieldType": "compositeInline",
              "multiple": false,
              "needExe": true,
              "switchable": false,
              "visiable": true,
              "maxGroupCount": null,
              "inline": true
            },
            {
              "key": "thPlNickelPlating",
              "label": "鍍鎳",
              "displayConfig": {
                "grids": 1,
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
              "key": "thPlAppearanceProcess1",
              "label": "外觀表面處理#1",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "thPlAppearanceProcess1": "塗黑"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thPlAppearanceProcess2",
              "label": "外觀表面處理#2",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "thPlAppearanceProcess2": "塗黑"
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thPlDensity",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "thPlMaterial"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "thPlMaterial": "AL1050",
                    "thPlDensity": 2.75
                  },
                  {
                    "thPlMaterial": "AL5052",
                    "thPlDensity": 2.75
                  },
                  {
                    "thPlMaterial": "SUS301",
                    "thPlDensity": 7.93
                  },
                  {
                    "thPlMaterial": "SUS304",
                    "thPlDensity": 7.93
                  },
                  {
                    "thPlMaterial": "SUS403",
                    "thPlDensity": 7.93
                  },
                  {
                    "thPlMaterial": "SUS430",
                    "thPlDensity": 7.93
                  },
                  {
                    "thPlMaterial": "SECC",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "SGCC",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "SPCC",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "SGLD",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "SPTE",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "Cu3604",
                    "thPlDensity": 8.9
                  },
                  {
                    "thPlMaterial": "低碳鋼1018",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "快削鋼",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "SUS410",
                    "thPlDensity": 7.93
                  },
                  {
                    "thPlMaterial": "磷青銅",
                    "thPlDensity": 8.9
                  },
                  {
                    "thPlMaterial": "PH-CU",
                    "thPlDensity": 8.9
                  },
                  {
                    "thPlMaterial": "CU1100",
                    "thPlDensity": 8.9
                  },
                  {
                    "thPlMaterial": "CU01",
                    "thPlDensity": 8.9
                  },
                  {
                    "thPlMaterial": "C18400",
                    "thPlDensity": 8.8
                  },
                  {
                    "thPlMaterial": "AL6061",
                    "thPlDensity": 2.75
                  },
                  {
                    "thPlMaterial": "AL6063",
                    "thPlDensity": 2.75
                  },
                  {
                    "thPlMaterial": "KU400",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "KU400i",
                    "thPlDensity": 7.85
                  },
                  {
                    "thPlMaterial": "皮銅",
                    "thPlDensity": 8.8
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
          "key": "ThermalBlock",
          "label": "Thermal Block",
          "group": [
            "ThermalBlock"
          ],
          "multiple": true,
          "items": [
            {
              "key": "thBlLabel",
              "label": "Thermal Block",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Thermal Block",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "thBlAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thBlMaterial",
              "label": "材料",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 3.6
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.4,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.4,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL6063",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 4
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 2.4
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 2.1
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "CU01",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "C1840",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.1,
                    "thBlMaterialCostPerKilogram": 8.6
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "TMS02",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400i",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 4.29
                  },
                  {
                    "thBlMaterial": "SUS410",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": 4.41
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 6
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 6
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "低碳鋼18A",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": 2.14
                  },
                  {
                    "thBlMaterial": "快削鋼",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": null
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thBlMaterialCostPerKilogram",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "thBlMaterial",
                "thBlMaterialThickness"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 3.6
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.4,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.4,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL6063",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 4
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 2.4
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 2.1
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "CU01",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "C1840",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.1,
                    "thBlMaterialCostPerKilogram": 8.6
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "TMS02",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400i",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 4.29
                  },
                  {
                    "thBlMaterial": "SUS410",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": 4.41
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 6
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 6
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "低碳鋼18A",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": 2.14
                  },
                  {
                    "thBlMaterial": "快削鋼",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": null
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "thBlMaterialThickness",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "thBlMaterial": true
                  }
                },
                "display": true,
                "grids": 1
              },
              "label": "材料厚度",
              "selectorConfig": {
                "depends": [
                  "thBlMaterial"
                ],
                "values": [
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 3.6
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.4,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 2.9
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL1050",
                    "thBlMaterialThickness": 3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.4,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlMaterialThickness": 3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "AL6063",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 4
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlMaterialThickness": 1.6,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 2.4
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 2.1
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.1,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "CU01",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "C1840",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.1,
                    "thBlMaterialCostPerKilogram": 8.6
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.2,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.6,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 8.2
                  },
                  {
                    "thBlMaterial": "TMS02",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 0
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 0.8,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1.2,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 1.5,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlMaterialThickness": 2,
                    "thBlMaterialCostPerKilogram": 1.5
                  },
                  {
                    "thBlMaterial": "KU400i",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 4.29
                  },
                  {
                    "thBlMaterial": "SUS410",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": 4.41
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 6
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.15,
                    "thBlMaterialCostPerKilogram": 6.6
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.3,
                    "thBlMaterialCostPerKilogram": 6
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 0.5,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlMaterialThickness": 1,
                    "thBlMaterialCostPerKilogram": 5.8
                  },
                  {
                    "thBlMaterial": "低碳鋼18A",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": 2.14
                  },
                  {
                    "thBlMaterial": "快削鋼",
                    "thBlMaterialThickness": null,
                    "thBlMaterialCostPerKilogram": null
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "float",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": 0,
              "needExe": true
            },
            {
              "key": "thBlProductionSize",
              "label": "成品尺寸",
              "displayConfig": {
                "grids": 2,
                "display": true
              },
              "items": [
                {
                  "key": "thBlProductionLength",
                  "label": "長度(L)",
                  "displayConfig": {
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
                  "key": "thBlProductionWidth",
                  "label": "寬度(W)",
                  "displayConfig": {
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
              "fieldType": "compositeInline",
              "multiple": false,
              "needExe": true,
              "switchable": false,
              "visiable": true,
              "maxGroupCount": null,
              "inline": true
            },
            {
              "key": "thBlNickelPlating",
              "label": "鍍鎳",
              "displayConfig": {
                "grids": 1,
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
              "key": "thBlDensity",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "thBlMaterial"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "thBlMaterial": "AL1050",
                    "thBlDensity": 2.75
                  },
                  {
                    "thBlMaterial": "AL5052",
                    "thBlDensity": 2.75
                  },
                  {
                    "thBlMaterial": "SUS301",
                    "thBlDensity": 7.93
                  },
                  {
                    "thBlMaterial": "SUS304",
                    "thBlDensity": 7.93
                  },
                  {
                    "thBlMaterial": "SUS403",
                    "thBlDensity": 7.93
                  },
                  {
                    "thBlMaterial": "SUS430",
                    "thBlDensity": 7.93
                  },
                  {
                    "thBlMaterial": "SECC",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "SGCC",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "SPCC",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "SGLD",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "SPTE",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "Cu3604",
                    "thBlDensity": 8.9
                  },
                  {
                    "thBlMaterial": "低碳鋼1018",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "快削鋼",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "SUS410",
                    "thBlDensity": 7.93
                  },
                  {
                    "thBlMaterial": "磷青銅",
                    "thBlDensity": 8.9
                  },
                  {
                    "thBlMaterial": "PH-CU",
                    "thBlDensity": 8.9
                  },
                  {
                    "thBlMaterial": "CU1100",
                    "thBlDensity": 8.9
                  },
                  {
                    "thBlMaterial": "CU01",
                    "thBlDensity": 8.9
                  },
                  {
                    "thBlMaterial": "C18400",
                    "thBlDensity": 8.8
                  },
                  {
                    "thBlMaterial": "AL6061",
                    "thBlDensity": 2.75
                  },
                  {
                    "thBlMaterial": "AL6063",
                    "thBlDensity": 2.75
                  },
                  {
                    "thBlMaterial": "KU400",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "KU400i",
                    "thBlDensity": 7.85
                  },
                  {
                    "thBlMaterial": "皮銅",
                    "thBlDensity": 8.8
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
          "key": "Screw",
          "label": "Screw",
          "group": [
            "Screw"
          ],
          "multiple": true,
          "items": [
            {
              "key": "screwLabel",
              "label": "Screw",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Screw",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "screwAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "screwToothpath",
              "label": "牙徑(M)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "screwHeadDiameter",
              "label": "頭徑(ø)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "screwHeadThickness",
              "label": "頭厚(t)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "screwLength",
              "label": "長度(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "screwPolishedRod",
              "label": "光桿",
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
              "key": "screwNeckDiameter",
              "label": "頸徑",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "screwPolishedRod": true
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
              "key": "screwNeckLength",
              "label": "頸高",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "screwPolishedRod": true
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
              "key": "screwResistantFall",
              "label": "耐落",
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
          "key": "Spring",
          "label": "Spring",
          "group": [
            "Spring"
          ],
          "multiple": true,
          "items": [
            {
              "key": "springLabel",
              "label": "Spring",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Spring",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "springAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "springWireDiameter",
              "label": "線徑(ø)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "springCoilCenterDiameter",
              "label": "線圈中心徑(ø)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "springFreeLong",
              "label": "自由長(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
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
          "key": "ORing",
          "label": "O-Ring",
          "group": [
            "ORing"
          ],
          "multiple": true,
          "items": [
            {
              "key": "oRLabel",
              "label": "O-Ring",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "O-Ring",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "oRAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "oROuterDiameter",
              "label": "外徑(ø)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "oRInnerDiameter",
              "label": "內徑(ø)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "oRThickness",
              "label": "厚度(t)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
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
          "key": "Clip",
          "label": "Clip",
          "group": [
            "Clip"
          ],
          "multiple": true,
          "items": [
            {
              "key": "clipLabel",
              "label": "Clip",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Clip",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "clipAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "clipMaterial",
              "label": "材料",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "clipMaterial": "CU1100",
                    "clipMaterialCostPerKilogram": 4.5
                  },
                  {
                    "clipMaterial": "C18400",
                    "clipMaterialCostPerKilogram": 4.5
                  },
                  {
                    "clipMaterial": "KU400",
                    "clipMaterialCostPerKilogram": 1.5
                  },
                  {
                    "clipMaterial": "KU400i",
                    "clipMaterialCostPerKilogram": 1.5
                  },
                  {
                    "clipMaterial": "SECC",
                    "clipMaterialCostPerKilogram": 1.4
                  },
                  {
                    "clipMaterial": "SGCC",
                    "clipMaterialCostPerKilogram": 1.37
                  },
                  {
                    "clipMaterial": "SPCC",
                    "clipMaterialCostPerKilogram": 1
                  },
                  {
                    "clipMaterial": "AL1050",
                    "clipMaterialCostPerKilogram": 1.35
                  },
                  {
                    "clipMaterial": "AL5052",
                    "clipMaterialCostPerKilogram": 1.36
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "clipMaterialCostPerKilogram",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "clipMaterial"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "clipMaterial": "CU1100",
                    "clipMaterialCostPerKilogram": 4.5
                  },
                  {
                    "clipMaterial": "C18400",
                    "clipMaterialCostPerKilogram": 4.5
                  },
                  {
                    "clipMaterial": "KU400",
                    "clipMaterialCostPerKilogram": 1.5
                  },
                  {
                    "clipMaterial": "KU400i",
                    "clipMaterialCostPerKilogram": 1.5
                  },
                  {
                    "clipMaterial": "SECC",
                    "clipMaterialCostPerKilogram": 1.4
                  },
                  {
                    "clipMaterial": "SGCC",
                    "clipMaterialCostPerKilogram": 1.37
                  },
                  {
                    "clipMaterial": "SPCC",
                    "clipMaterialCostPerKilogram": 1
                  },
                  {
                    "clipMaterial": "AL1050",
                    "clipMaterialCostPerKilogram": 1.35
                  },
                  {
                    "clipMaterial": "AL5052",
                    "clipMaterialCostPerKilogram": 1.36
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "clipWireDiameter",
              "label": "線徑(ø)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "clipProductionLength",
              "label": "長度(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "clipProductionWidth",
              "label": "寬度(W)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
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
          "key": "PushPin",
          "label": "Push Pin",
          "group": [
            "PushPin"
          ],
          "multiple": true,
          "items": [
            {
              "key": "pupiLabel",
              "label": "Push Pin",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Push Pin",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "pupiAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "pupiLength",
              "label": "長度(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "pupiHeadDiameter",
              "label": "頭徑(ø)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
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
          "key": "Label",
          "label": "Label",
          "group": [
            "Label"
          ],
          "multiple": true,
          "items": [
            {
              "key": "labelLabel",
              "label": "Label",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Label",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "labelAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "labelLength",
              "label": "長度(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "labelWidth",
              "label": "寬度(W)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "labelThickness",
              "label": "厚度(t)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
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
          "key": "Sponge",
          "label": "Sponge",
          "group": [
            "Sponge"
          ],
          "multiple": true,
          "items": [
            {
              "key": "spongeLabel",
              "label": "Sponge",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Sponge",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "spongeAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "spongeMaterial",
              "label": "材料",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 0.5,
                    "spongeMaterialCostPerMM": 0.98
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 0.8,
                    "spongeMaterialCostPerMM": 1.15
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 1.31
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 2.62
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 2.62
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 3.93
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 3.93
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 4,
                    "spongeMaterialCostPerMM": 5.25
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 5,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 0.5,
                    "spongeMaterialCostPerMM": 4.92
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 4.92
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 7.38
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 12.3
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 3.5,
                    "spongeMaterialCostPerMM": 17.21
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 4.5,
                    "spongeMaterialCostPerMM": 22.13
                  },
                  {
                    "spongeMaterial": "KVH200",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "HFG",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "SRS40",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 4.43
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 4.59
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 4.75
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 4,
                    "spongeMaterialCostPerMM": 5.74
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 4.5,
                    "spongeMaterialCostPerMM": 6.23
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 5,
                    "spongeMaterialCostPerMM": 7.38
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 5.9
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 7.87
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 5.9
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 8.2
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "spongeLength",
              "label": "長度(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "spongeWidth",
              "label": "寬度(W)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "spongeMaterialThickness",
              "displayConfig": {
                "depends": {
                  "action": "lock",
                  "condition": {
                    "spongeMaterial": true
                  }
                },
                "display": true,
                "grids": 1
              },
              "label": "厚度(t)",
              "selectorConfig": {
                "depends": [
                  "spongeMaterial"
                ],
                "values": [
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 0.5,
                    "spongeMaterialCostPerMM": 0.98
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 0.8,
                    "spongeMaterialCostPerMM": 1.15
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 1.31
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 2.62
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 2.62
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 3.93
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 3.93
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 4,
                    "spongeMaterialCostPerMM": 5.25
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 5,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 0.5,
                    "spongeMaterialCostPerMM": 4.92
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 4.92
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 7.38
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 12.3
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 3.5,
                    "spongeMaterialCostPerMM": 17.21
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 4.5,
                    "spongeMaterialCostPerMM": 22.13
                  },
                  {
                    "spongeMaterial": "KVH200",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "HFG",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "SRS40",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 4.43
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 4.59
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 4.75
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 4,
                    "spongeMaterialCostPerMM": 5.74
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 4.5,
                    "spongeMaterialCostPerMM": 6.23
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 5,
                    "spongeMaterialCostPerMM": 7.38
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 5.9
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 7.87
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 5.9
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 8.2
                  }
                ]
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
              "key": "spongeMaterialCostPerMM",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "spongeMaterial",
                "spongeMaterialThickness"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 0.5,
                    "spongeMaterialCostPerMM": 0.98
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 0.8,
                    "spongeMaterialCostPerMM": 1.15
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 1.31
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 2.62
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 2.62
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 3.93
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 3.93
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 4,
                    "spongeMaterialCostPerMM": 5.25
                  },
                  {
                    "spongeMaterial": "CR1015",
                    "spongeMaterialThickness": 5,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 0.5,
                    "spongeMaterialCostPerMM": 4.92
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 4.92
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 7.38
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 12.3
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 3.5,
                    "spongeMaterialCostPerMM": 17.21
                  },
                  {
                    "spongeMaterial": "E4382",
                    "spongeMaterialThickness": 4.5,
                    "spongeMaterialCostPerMM": 22.13
                  },
                  {
                    "spongeMaterial": "KVH200",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "HFG",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "SRS40",
                    "spongeMaterialThickness": null,
                    "spongeMaterialCostPerMM": null
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 4.43
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 4.59
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 4.75
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 4,
                    "spongeMaterialCostPerMM": 5.74
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 4.5,
                    "spongeMaterialCostPerMM": 6.23
                  },
                  {
                    "spongeMaterial": "SM55",
                    "spongeMaterialThickness": 5,
                    "spongeMaterialCostPerMM": 7.38
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 5.9
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 1.5,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "藍色PMP1800",
                    "spongeMaterialThickness": 2.5,
                    "spongeMaterialCostPerMM": 7.87
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 1,
                    "spongeMaterialCostPerMM": 5.9
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 2,
                    "spongeMaterialCostPerMM": 6.56
                  },
                  {
                    "spongeMaterial": "黑色PMP1800",
                    "spongeMaterialThickness": 3,
                    "spongeMaterialCostPerMM": 8.2
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
          "key": "Grease",
          "label": "Grease",
          "group": [
            "Grease"
          ],
          "multiple": true,
          "items": [
            {
              "key": "greaseLabel",
              "label": "Grease",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Grease",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "greaseAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "greaseMaterial",
              "label": "材質",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "greaseMaterial": 7783,
                    "greaseMaterialCost": 490
                  },
                  {
                    "greaseMaterial": 7762,
                    "greaseMaterialCost": 145
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "greaseMaterialCost",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "greaseMaterial"
              ],
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "greaseMaterial": 7783,
                    "greaseMaterialCost": 490
                  },
                  {
                    "greaseMaterial": 7762,
                    "greaseMaterialCost": 145
                  }
                ]
              },
              "fieldType": "mappedValue",
              "dataType": "float",
              "default": 0,
              "needExe": false
            },
            {
              "key": "greaseLength",
              "label": "長度(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "greaseWidth",
              "label": "寬度(W)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "greaseThickness",
              "label": "厚度(t)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
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
          "key": "ThermalPad",
          "label": "Thermal Pad",
          "group": [
            "ThermalPad"
          ],
          "multiple": true,
          "items": [
            {
              "key": "thermalPadLabel",
              "label": "Thermal Pad",
              "editable": true,
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "default": "Thermal Pad",
              "fieldType": "label",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true,
              "level": 2,
              "switchable": false,
              "maxGroupCount": null
            },
            {
              "key": "thermalPadAmount",
              "label": "用量",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thermalPadHeatTransferCoefficient",
              "label": "熱傳係數(K值)",
              "selectorConfig": {
                "depends": [],
                "values": [
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 257,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.8,
                    "thermalPadPrice": 300,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 320,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 74,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 98,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 136,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 3,
                    "thermalPadPrice": 197,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 95,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 121,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 168,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.25,
                    "thermalPadPrice": 270,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.5,
                    "thermalPadPrice": 315,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.3,
                    "thermalPadPrice": 189,
                    "thermalPadShore": 45
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "string",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": null,
              "needExe": true,
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thermalPadShore",
              "label": "硬度",
              "displayConfig": {
                "display": true,
                "depends": {
                  "action": "lock",
                  "condition": {
                    "thermalPadHeatTransferCoefficient": true
                  }
                },
                "grids": 1
              },
              "selectorConfig": {
                "depends": [
                  "thermalPadHeatTransferCoefficient"
                ],
                "values": [
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 257,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.8,
                    "thermalPadPrice": 300,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 320,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 74,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 98,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 136,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 3,
                    "thermalPadPrice": 197,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 95,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 121,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 168,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.25,
                    "thermalPadPrice": 270,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.5,
                    "thermalPadPrice": 315,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.3,
                    "thermalPadPrice": 189,
                    "thermalPadShore": 45
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "int",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": 0,
              "needExe": true
            },
            {
              "key": "thermalPadThickness",
              "label": "厚度(t)",
              "displayConfig": {
                "display": true,
                "depends": {
                  "action": "lock",
                  "condition": {
                    "thermalPadHeatTransferCoefficient": true,
                    "thermalPadShore": true
                  }
                },
                "grids": 1
              },
              "selectorConfig": {
                "depends": [
                  "thermalPadHeatTransferCoefficient",
                  "thermalPadShore"
                ],
                "values": [
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 257,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.8,
                    "thermalPadPrice": 300,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 320,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 74,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 98,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 136,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 3,
                    "thermalPadPrice": 197,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 95,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 121,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 168,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.25,
                    "thermalPadPrice": 270,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.5,
                    "thermalPadPrice": 315,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.3,
                    "thermalPadPrice": 189,
                    "thermalPadShore": 45
                  }
                ]
              },
              "fieldType": "selector",
              "dataType": "float",
              "multiple": false,
              "require": false,
              "constrains": [],
              "default": 0,
              "needExe": true
            },
            {
              "key": "thermalPadLength",
              "label": "長度(L)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thermalPadWidth",
              "label": "寬度(W)",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "thermalPadPrice",
              "displayConfig": {
                "display": false,
                "grids": 1
              },
              "mapFrom": [
                "thermalPadHeatTransferCoefficient",
                "thermalPadThickness",
                "thermalPadShore"
              ],
              "selectorConfig": {
                "values": [
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 257,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.8,
                    "thermalPadPrice": 300,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 320,
                    "thermalPadShore": 45
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 74,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 98,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 136,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 1.3,
                    "thermalPadThickness": 3,
                    "thermalPadPrice": 197,
                    "thermalPadShore": 24
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 0.5,
                    "thermalPadPrice": 95,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1,
                    "thermalPadPrice": 121,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 1.5,
                    "thermalPadPrice": 168,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.25,
                    "thermalPadPrice": 270,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 3,
                    "thermalPadThickness": 2.5,
                    "thermalPadPrice": 315,
                    "thermalPadShore": 42
                  },
                  {
                    "thermalPadHeatTransferCoefficient": 6,
                    "thermalPadThickness": 0.3,
                    "thermalPadPrice": 189,
                    "thermalPadShore": 45
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
          "key": "ThermalPadMultiImage",
          "label": "Image",
          "group": [
            "ThermalPadMultiImage"
          ],
          "multiple": true,
          "items": [
            {
              "key": "multiUploadImage",
              "displayConfig": {
                "grids": 3,
                "display": true
              },
              "uploadUrl": "bom/partlist/uploadImage",
              "getUrl": "bom/partlist/getImage/:{imageid}",
              "fieldType": "uploadImage",
              "multiple": false,
              "require": false,
              "constrains": [],
              "needExe": true
            }
          ],
          "fieldType": "compositeMultiUpload",
          "needExe": true,
          "maxGroupCount": null
        }
      ],
      "fieldType": "tab",
      "needExe": true
    }
  ],
  "formulas": {
    "Fan": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "fanAmount>0 ? sub1 :0",
          "label": "計算結果"
        },
        "sub1": {
          "type": "MATH",
          "formula": "unit_price * fanAmount * (1+const3)",
          "label": "total"
        },
        "unit_price": {
          "type": "MATH",
          "formula": "(bearingAndSleevePrice+ fanBladeMaterialPrice+ magnetMaterialAndSizePrice+ motorArchitecturePrice + fanSizePrice)",
          "label": "單價"
        }
      },
      "scope": {
        "fanSizePrice": "fanSizePrice",
        "motorArchitecturePrice": "motorArchitecturePrice",
        "bearingAndSleevePrice": "bearingAndSleevePrice",
        "fanBladeMaterialPrice": "fanBladeMaterialPrice",
        "magnetMaterialAndSizePrice": "magnetMaterialAndSizePrice",
        "fanAmount": "fanAmount"
      },
      "constant": {
        "const1": {
          "label": "檢/包/運",
          "value": 0.03
        },
        "const2": {
          "label": "工時費",
          "value": 0.045
        },
        "const3": {
          "label": "loss rate",
          "value": 0.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "unit_price",
        "qty": "fanAmount"
      }
    },
    "Fin": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "sub1 * loss_rate * finAmount",
          "label": "計算結果"
        },
        "sub1": {
          "type": "MATH",
          "formula": "finAmount > 0 ? sub3 + const1 + secondary_processing_cost + sub2 :0",
          "label": "單價"
        },
        "sub2": {
          "type": "MATH",
          "formula": "(const1 + secondary_processing_cost) * 0.1",
          "label": "管消費"
        },
        "sub3": {
          "type": "MATH",
          "formula": "(finProductionExpandLength * finProductionExpandWidth * finMaterialThickness * finDensity * finMaterialCostPerKilogram)/ 1000000 * const4 * sub4 * finAmount",
          "label": "成品材料費"
        },
        "sub4": {
          "type": "MATH",
          "formula": "finProductionLength / finPitch",
          "label": "總片數"
        },
        "secondary_processing_cost": {
          "type": "MATH",
          "formula": "UltrasonicClean + NickelPlating",
          "label": "二次加工費"
        },
        "UltrasonicClean": {
          "type": "MATH",
          "formula": "(finProductionExpandLength * finProductionExpandWidth * finMaterialThickness * finDensity) / 1000 * 0.3529 * (1+0.03) /1000 * finAmount",
          "label": "超音波清洗"
        },
        "NickelPlating": {
          "type": "FUNC",
          "formula": "(finNickelPlating, finProductionExpandLength, finProductionExpandWidth, finMaterialThickness, finDensity, finProductionLength, finAmount1) => { return finNickelPlating ? (finProductionExpandLength * finProductionExpandWidth * finMaterialThickness * finDensity) / 1000 * 5.71 * (1+0.03) * finAmount1 / 1000:0}",
          "label": "鍍鎳",
          "param": [
            "finNickelPlating",
            "finProductionExpandLength",
            "finProductionExpandWidth",
            "finMaterialThickness",
            "finDensity",
            "finProductionLength",
            "finAmount"
          ]
        }
      },
      "scope": {
        "finProductionExpandLength": "finProductionExpandLength",
        "finProductionExpandWidth": "finProductionExpandWidth",
        "finMaterialThickness": "finMaterialThickness",
        "finPitch": "finPitch",
        "finProductionLength": "finProductionLength",
        "finDensity": "finDensity",
        "finMaterialCostPerKilogram": "finMaterialCostPerKilogram",
        "finAmount": "finAmount",
        "finNickelPlating": "finNickelPlating"
      },
      "constant": {
        "const1": {
          "label": "沖壓費",
          "value": 0.018
        },
        "const2": {
          "label": "二次加工費",
          "value": 0.0002
        },
        "const3": {
          "label": "運檢包費",
          "value": 0
        },
        "const4": {
          "label": "Loss Rate",
          "value": 1.03
        },
        "const5": {
          "label": "工時費",
          "value": 0.045
        },
        "loss_rate": {
          "label": "loss rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "sub1",
        "qty": "finAmount"
      }
    },
    "Screw": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "screwAmount > 0 ?const1 * screwAmount * loss_rate :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "screwAmount": "screwAmount"
      },
      "constant": {
        "const1": {
          "label": "單價",
          "value": 0.0025
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "const1",
        "qty": "screwAmount"
      }
    },
    "Clip": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "clipAmount > 0 ? const1 * clipAmount * loss_rate :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "clipAmount": "clipAmount"
      },
      "constant": {
        "const1": {
          "label": "單價",
          "value": 0.15
        },
        "loss_rate": {
          "label": "loss rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_total": "const1",
        "qty": "clipAmount"
      }
    },
    "Grease": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "greaseAmount>0 ? unit_price * greaseAmount * loss_rate :0",
          "label": "計算結果"
        },
        "unit_price": {
          "type": "MATH",
          "formula": "greaseAmount>0 ?( a * b * c / 1000 * d / 1000 )  :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "a": "greaseLength",
        "b": "greaseWidth",
        "c": "greaseThickness",
        "d": "greaseMaterialCost",
        "greaseAmount": "greaseAmount"
      },
      "constant": {
        "const1": {
          "label": "單價",
          "value": 0.15
        },
        "loss_rate": {
          "label": "loss rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "unit_price",
        "qty": "greaseAmount"
      }
    },
    "Label": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "labelAmount >0 ? const1 * labelAmount * loss_rate :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "labelAmount": "labelAmount"
      },
      "constant": {
        "const1": {
          "label": "單價",
          "value": 0.001
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "const1",
        "qty": "labelAmount",
        "test": "management_cost"
      }
    },
    "ORing": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "oRAmount>0 ? const1 * oRAmount * loss_rate :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "oRAmount": "oRAmount"
      },
      "constant": {
        "const1": {
          "label": "單價",
          "value": 0.002
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "const1",
        "qty": "oRAmount"
      }
    },
    "Pipe": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "pipeAmount > 0 ? pipiLenThickODiaToCost * pipeAmount * loss_rate :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "pipiLenThickODiaToCost": "pipiLenThickODiaToCost",
        "pipeAmount": "pipeAmount"
      },
      "constant": {
        "loss_rate": {
          "label": "loss rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "pipiLenThickODiaToCost",
        "qty": "pipeAmount"
      }
    },
    "PushPin": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "pupiAmount >0 ? const1 * pupiAmount * loss_rate :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "pupiAmount": "pupiAmount"
      },
      "constant": {
        "const1": {
          "label": "單價",
          "value": 0.08
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "const1",
        "qty": "pupiAmount"
      }
    },
    "Sponge": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "unit_price * spongeAmount * loss_rate",
          "label": "計算結果"
        },
        "unit_price": {
          "type": "MATH",
          "formula": "spongeAmount >0 ?sub1 + secondary_processing_cost + const2 + sub2 + sub3 :0",
          "label": "單價"
        },
        "sub1": {
          "type": "MATH",
          "formula": "spongeLength * spongeWidth * spongeMaterialCostPerMM / 1000000 * const1",
          "label": "成品材料費"
        },
        "sub2": {
          "type": "MATH",
          "formula": "sub1 / 5",
          "label": "運包檢"
        },
        "secondary_processing_cost": {
          "type": "MATH",
          "formula": "spongeAmount / 60 * 0.045",
          "label": "二次加工費"
        },
        "sub3": {
          "type": "MATH",
          "formula": "(secondary_processing_cost + const2 ) * 0.1",
          "label": "管銷&利潤"
        }
      },
      "scope": {
        "spongeLength": "spongeLength",
        "spongeWidth": "spongeWidth",
        "spongeMaterialCostPerMM": "spongeMaterialCostPerMM",
        "spongeAmount": "spongeAmount"
      },
      "constant": {
        "const1": {
          "label": "Loss Rate",
          "value": 1.05
        },
        "const2": {
          "label": "組裝費",
          "value": 0
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "unit_price",
        "qty": "spongeAmount",
        "test": "sub2"
      }
    },
    "Spring": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "springAmount>0 ?const1 * springAmount * loss_rate :0",
          "label": "計算結果"
        }
      },
      "scope": {
        "springAmount": "springAmount"
      },
      "constant": {
        "const1": {
          "label": "單價",
          "value": 0.009
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "const1",
        "qty": "springAmount"
      }
    },
    "thermalModule": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "sumTotal + processing_cost+ management_cost +const2",
          "label": "total"
        },
        "processing_cost": {
          "type": "MATH",
          "formula": "sumQty * 12 / 60 * const1",
          "label": "加工費"
        },
        "management_cost": {
          "type": "MATH",
          "formula": "0.1 * processing_cost",
          "label": "外層管銷和利潤"
        },
        "sumTotal": {
          "type": "GROUPSUM",
          "label": "sum all total",
          "bykey": "total",
          "groups": [
            "ThermalPad",
            "Grease",
            "Sponge",
            "Label",
            "PushPin",
            "Clip",
            "ORing",
            "Spring",
            "Screw",
            "ThermalBlock",
            "ThermalPlate",
            "Fin",
            "Pipe",
            "Fan"
          ]
        },
        "sumQty": {
          "type": "GROUPSUM",
          "label": "sum all qty",
          "bykey": "qty",
          "groups": [
            "ThermalPad",
            "Grease",
            "Sponge",
            "Label",
            "PushPin",
            "Clip",
            "ORing",
            "Spring",
            "Screw",
            "ThermalBlock",
            "ThermalPlate",
            "Fin",
            "Pipe",
            "Fan"
          ]
        }
      },
      "scope": {
        "othersCost": "othersCost"
      },
      "constant": {
        "const1": {
          "label": "工時費",
          "value": 0.045
        },
        "const2": {
          "label": "運包檢",
          "value": 0.03
        }
      },
      "output": {
        "total": "total",
        "processing_cost": "processing_cost",
        "sumQty": "sumQty",
        "sumTotal": "sumTotal"
      }
    },
    "ThermalBlock": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "thBlAmount > 0 ? unit_price * thBlAmount * loss_rate :0",
          "label": "計算結果"
        },
        "unit_price": {
          "type": "MATH",
          "formula": "thBlAmount > 0 ?(sub1 + const2 + secondary_processing_cost + const4 + sub2) :0",
          "label": "計算結果"
        },
        "sub1": {
          "type": "MATH",
          "formula": "(thBlProductionLength * thBlProductionWidth * thBlMaterialThickness * thBlDensity * thBlMaterialCostPerKilogram)/ 1000000 * const1",
          "label": "成品材料費"
        },
        "sub2": {
          "type": "MATH",
          "formula": "(const2 + secondary_processing_cost) * 0.1",
          "label": "管消費"
        },
        "secondary_processing_cost": {
          "type": "MATH",
          "formula": "UltrasonicClean + NickelPlating",
          "label": "二次加工費"
        },
        "UltrasonicClean": {
          "type": "MATH",
          "formula": "(thBlProductionLength * thBlProductionWidth * thBlMaterialThickness * thBlDensity) / 1000 * 0.3529 * (1+0.03) / 1000",
          "label": "超音波清洗"
        },
        "NickelPlating": {
          "type": "FUNC",
          "formula": "(thBlNickelPlating, thBlProductionLength, thBlProductionWidth, thBlMaterialThickness, thBlDensity) => { return thBlNickelPlating ? (thBlProductionLength * thBlProductionWidth * thBlMaterialThickness * thBlDensity) / 1000 * 5.71 * (1+0.03) /1000:0}",
          "label": "鍍鎳",
          "param": [
            "thBlNickelPlating",
            "thBlProductionLength",
            "thBlProductionWidth",
            "thBlMaterialThickness",
            "thBlDensity"
          ]
        }
      },
      "scope": {
        "thBlProductionLength": "thBlProductionLength",
        "thBlProductionWidth": "thBlProductionWidth",
        "thBlMaterialThickness": "thBlMaterialThickness",
        "thBlDensity": "thBlDensity",
        "thBlMaterialCostPerKilogram": "thBlMaterialCostPerKilogram",
        "thBlAmount": "thBlAmount",
        "thBlNickelPlating": "thBlNickelPlating"
      },
      "constant": {
        "const1": {
          "label": "Loss Rate",
          "value": 1.03
        },
        "const2": {
          "label": "沖壓費",
          "value": 0.018
        },
        "const4": {
          "label": "運檢包費",
          "value": 0
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "unit_price",
        "qty": "thBlAmount"
      }
    },
    "ThermalPad": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "unit_price* thermalPadAmount * loss_rate",
          "label": "計算結果"
        },
        "unit_price": {
          "type": "MATH",
          "formula": "thermalPadAmount >0 ? ( thermalPadLength * thermalPadWidth * thermalPadPrice ) / 1000000  :0",
          "label": "單價"
        },
        "processing_cost": {
          "type": "MATH",
          "formula": "thermalPadAmount * 12 / 60 * const1",
          "label": "加工費"
        },
        "management_cost": {
          "type": "MATH",
          "formula": "0.1 * processing_cost",
          "label": "外層管銷和利潤"
        }
      },
      "scope": {
        "thermalPadLength": "thermalPadLength",
        "thermalPadWidth": "thermalPadWidth",
        "thermalPadPrice": "thermalPadPrice",
        "thermalPadAmount": "thermalPadAmount"
      },
      "constant": {
        "const1": {
          "label": "工時費",
          "value": 0.045
        },
        "loss_rate": {
          "label": "loss_rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "unit_price",
        "qty": "thermalPadAmount"
      }
    },
    "ThermalPlate": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "thPlAmount>0 ? unit_price * thPlAmount * loss_rate :0",
          "label": "計算結果"
        },
        "unit_price": {
          "type": "MATH",
          "formula": "thPlAmount>0 ?(sub1 + const2 + secondary_processing_cost + const4 + sub2) :0",
          "label": "unit_price"
        },
        "sub1": {
          "type": "MATH",
          "formula": "(thPlProductionExpandLength * thPlProductionExpandWidth * thPlMaterialThickness * thPlDensity * thPlMaterialCostPerKilogram)/ 1000000 * const1",
          "label": "成品材料費"
        },
        "sub2": {
          "type": "MATH",
          "formula": "(const2 + secondary_processing_cost) * 0.1",
          "label": "管消費"
        },
        "secondary_processing_cost": {
          "type": "MATH",
          "formula": "UltrasonicClean + NickelPlating",
          "label": "二次加工費"
        },
        "UltrasonicClean": {
          "type": "MATH",
          "formula": "(thPlProductionExpandLength * thPlProductionExpandWidth * thPlMaterialThickness * thPlDensity) / 1000 * 0.3529 * (1 + 0.03) / 1000",
          "label": "超音波清洗"
        },
        "NickelPlating": {
          "type": "FUNC",
          "formula": "(thPlNickelPlating, thPlProductionExpandLength, thPlProductionExpandWidth, thPlMaterialThickness, thPlDensity) => { return thPlNickelPlating ? (thPlProductionExpandLength * thPlProductionExpandWidth * thPlMaterialThickness * thPlDensity) / 1000 * 5.71 * (1+0.03) /1000:0}",
          "label": "鍍鎳",
          "param": [
            "thPlNickelPlating",
            "thPlProductionExpandLength",
            "thPlProductionExpandWidth",
            "thPlMaterialThickness",
            "thPlDensity"
          ]
        },
        "processing_cost": {
          "type": "MATH",
          "formula": "thPlAmount * 12 / 60 * const5",
          "label": "加工費"
        },
        "management_cost": {
          "type": "MATH",
          "formula": "0.1 * processing_cost",
          "label": "外層管銷和利潤"
        }
      },
      "scope": {
        "thPlProductionExpandLength": "thPlProductionExpandLength",
        "thPlProductionExpandWidth": "thPlProductionExpandWidth",
        "thPlMaterialThickness": "thPlMaterialThickness",
        "thPlDensity": "thPlDensity",
        "thPlMaterialCostPerKilogram": "thPlMaterialCostPerKilogram",
        "thPlAmount": "thPlAmount",
        "thPlNickelPlating": "thPlNickelPlating"
      },
      "constant": {
        "const1": {
          "label": "Loss Rate",
          "value": 1.03
        },
        "const2": {
          "label": "沖壓費",
          "value": 0.018
        },
        "const3": {
          "label": "二次加工費",
          "value": 0.0004
        },
        "const4": {
          "label": "運檢包費",
          "value": 0
        },
        "loss_rate": {
          "label": "loss rate",
          "value": 1.015
        }
      },
      "output": {
        "total": "total",
        "unit_price": "unit_price",
        "qty": "thPlAmount"
      }
    }
  }
};

export default data;
