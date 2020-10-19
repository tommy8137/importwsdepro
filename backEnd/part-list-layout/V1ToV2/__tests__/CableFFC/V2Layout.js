/* eslint-disable quote-props */
/* eslint-disable quotes */

const data = {
  "version": 2,
  "showMenu": false,
  "layout": [
    {
      "key": "FFCTab",
      "label": "FFCLabel",
      "group": [
        "cableFFC"
      ],
      "items": [
        {
          "key": "FFCItems",
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
            },
            {
              "key": "FFCQty",
              "label": "QTY",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "FFCPin",
              "label": "Pin",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "FFCPitch",
              "label": "Pitch",
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
              "placeholder": "",
              "displayConfig": {
                "display": true,
                "grids": 1
              }
            },
            {
              "key": "FFCCableLength",
              "label": "Cable Length(mm)",
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
            }
          ],
          "fieldType": "composite",
          "needExe": true,
          "switchable": false,
          "maxGroupCount": null,
          "inline": false
        },
        {
          "key": "FFCProcessingContent",
          "label": "加工內容",
          "multiple": false,
          "items": [
            {
              "key": "FFCBendTImes",
              "label": "折彎(次)",
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
              "key": "FFCPrint",
              "label": "印刷(面)",
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
              "key": "FFCFlush",
              "label": "有沖型",
              "require": false,
              "displayConfig": {
                "grids": 1,
                "display": true
              },
              "fieldType": "checkBox",
              "dataType": "boolean",
              "multiple": false,
              "default": false,
              "needExe": true,
              "values": {
                "true": true,
                "false": false
              }
            },
            {
              "key": "FFCGoldPlating",
              "label": "金手指掛鍍(鍍金)",
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
              "key": "FFCStopLine",
              "label": "停止線(條)",
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
          "key": "FFCAccessory",
          "label": "輔料",
          "multiple": false,
          "items": [
            {
              "key": "FFCAlFoil",
              "label": "Al Foil",
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
              "key": "FFCAlFoilLength",
              "label": "L(mm)",
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
              "key": "FFCAlFoilQty",
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
              "key": "FFCReinforcingPlate",
              "label": "補強板",
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
              "key": "FFCReinforcingPlateLength",
              "label": "L(mm)",
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
              "key": "FFCReinforcingPlateQty",
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
              "key": "FFCLabel",
              "label": "Label",
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
              "key": "FFCLabelQty",
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
              "key": "FFCConductiveCloth",
              "label": "導電布",
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
              "key": "FFCConductiveClothLength",
              "label": "L(mm)",
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
              "key": "FFCConductiveClothQty",
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
              "key": "FFCAdhesive1",
              "label": "背膠1",
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
              "key": "FFCAdhesive1Length",
              "label": "L(mm)",
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
              "key": "FFCAdhesive1width",
              "label": "W(mm)",
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
              "key": "FFCAdhesive1Qty",
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
              "key": "FFCAdhesive2",
              "label": "背膠2",
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
              "key": "FFCAdhesive2Length",
              "label": "L(mm)",
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
              "key": "FFCAdhesive2width",
              "label": "W(mm)",
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
              "key": "FFCAdhesive2Qty",
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
          "key": "FFCRemark",
          "label": "備註",
          "multiple": false,
          "items": [
            {
              "key": "FFCRemarks",
              "label": "備註",
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
              "require": false,
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
    }
  ],
  "formulas": {
    "cableFFC": {
      "formula": {
        "total": {
          "type": "MATH",
          "formula": "material_cost + secondary_processing_cost + components_cost + package_cost + secondary_processing_cost * 0.1",
          "label": "計算結果"
        },
        "material_cost": {
          "type": "MATH",
          "formula": "FFCCableLength * (ffc_size_width + edge_material) * (material_unit_price / 1000000) * (1 + material_loss_rate)"
        },
        "ffc_size_width": {
          "type": "MATH",
          "formula": "(FFCPin +1) * FFCPitch",
          "label": "FFC尺寸(W)"
        },
        "edge_material": {
          "type": "MATH",
          "formula": "2 + ffc_flush_amount * (1.25 * 2)",
          "label": "邊料"
        },
        "ffc_flush_amount": {
          "type": "FUNC",
          "formula": "(FFCFlush) => { return FFCFlush==true ? 1:0}",
          "label": "沖型數量",
          "param": [
            "FFCFlush"
          ]
        },
        "secondary_processing_cost": {
          "type": "MATH",
          "formula": "assembly_cost + ffcBend_cost + ffcPrint_cost + ffc_flush_cost + ffcGoldPlating_cost + ffcStopLine_cost",
          "label": "二次加工費"
        },
        "assembly_cost": {
          "type": "MATH",
          "formula": "(FFCAlFoilQty + FFCReinforcingPlateQty + FFCLabelQty + FFCConductiveClothQty + FFCAdhesive1Qty + FFCAdhesive2Qty ) * 12 / 60 * 0.045",
          "label": "組裝(sec)"
        },
        "ffcBend_cost": {
          "type": "MATH",
          "formula": "FFCBendTImes * ffcBend_unit_price",
          "label": "折彎(次) cost"
        },
        "ffcPrint_cost": {
          "type": "MATH",
          "formula": "FFCPrint * ffcPrint_unit_price",
          "label": "印刷 cost"
        },
        "ffc_flush_cost": {
          "type": "MATH",
          "formula": "ffc_flush_amount * ffcFlush_unit_price",
          "label": "沖型 cost"
        },
        "ffcGoldPlating_cost": {
          "type": "MATH",
          "formula": "FFCGoldPlating * (FFCPin * ( FFCPitch * 0.6 ) * 5 * 0.00017 * 2)",
          "label": "金手指掛鍍(鍍金）cost"
        },
        "ffcStopLine_cost": {
          "type": "MATH",
          "formula": "FFCStopLine * ffcStopLine_unit_price",
          "label": "停止線(條) cost"
        },
        "components_cost": {
          "type": "MATH",
          "formula": "ffcAlFoil_cost + ffcReinforcingPlate_cost + ffcLabel_cost + ffcConductiveCloth_cost + ffcAdhesive1_cost + ffcAdhesive2_cost",
          "label": "零件費"
        },
        "ffcAlFoil_cost": {
          "type": "MATH",
          "formula": "FFCAlFoilQty * ffcAlFoil_unit_price * ((FFCAlFoilLength + 6 ) * ( ffc_size_width + 6 ) / 1000000 ) * ( 1 + ffcComponent_loss_rate)",
          "label": "ffcAlFoil費用"
        },
        "ffcReinforcingPlate_cost": {
          "type": "MATH",
          "formula": "FFCReinforcingPlateQty * ffcReinforcingPlate_unit_price *( FFCReinforcingPlateLength * ffc_size_width / 1000000 ) * ( 1 + ffcComponent_loss_rate)",
          "label": "補強板費用"
        },
        "ffcLabel_cost": {
          "type": "MATH",
          "formula": "FFCLabelQty * ffcLabel_unit_price * ( 1 + ffcComponent_loss_rate)",
          "label": "label費用"
        },
        "ffcConductiveCloth_cost": {
          "type": "MATH",
          "formula": "FFCConductiveClothQty * ffcConductiveCloth_unit_price * (FFCConductiveClothLength * ffc_size_width / 1000000 ) * ( 1 + ffcComponent_loss_rate)",
          "label": "導電布費用"
        },
        "ffcAdhesive1_cost": {
          "type": "MATH",
          "formula": "FFCAdhesive1Qty * ffcAdhesive_unit_price * (FFCAdhesive1Length * FFCAdhesive1width / 1000000) * (1 + ffcComponent_loss_rate)",
          "label": "背膠1費用"
        },
        "ffcAdhesive2_cost": {
          "type": "MATH",
          "formula": "FFCAdhesive2Qty * ffcAdhesive_unit_price * (FFCAdhesive2Length * FFCAdhesive2width / 1000000) * (1 + ffcComponent_loss_rate)",
          "label": "背膠2費用"
        }
      },
      "scope": {
        "FFCPin": "FFCPin",
        "FFCPitch": "FFCPitch",
        "FFCCableLength": "FFCCableLength",
        "FFCFlush": "FFCFlush",
        "FFCAlFoilQty": "FFCAlFoilQty",
        "FFCReinforcingPlateQty": "FFCReinforcingPlateQty",
        "FFCLabelQty": "FFCLabelQty",
        "FFCAdhesive1Qty": "FFCAdhesive1Qty",
        "FFCAdhesive2Qty": "FFCAdhesive2Qty",
        "FFCBendTImes": "FFCBendTImes",
        "FFCPrint": "FFCPrint",
        "FFCGoldPlating": "FFCGoldPlating",
        "FFCStopLine": "FFCStopLine",
        "FFCReinforcingPlateLength": "FFCReinforcingPlateLength",
        "FFCConductiveClothQty": "FFCConductiveClothQty",
        "FFCConductiveClothLength": "FFCConductiveClothLength",
        "FFCAdhesive1Length": "FFCAdhesive1Length",
        "FFCAdhesive1width": "FFCAdhesive1width",
        "FFCAdhesive2Length": "FFCAdhesive2Length",
        "FFCAdhesive2width": "FFCAdhesive2width",
        "FFCAlFoilLength": "FFCAlFoilLength"
      },
      "constant": {
        "material_unit_price": {
          "label": "材料單價",
          "value": 26.6
        },
        "material_loss_rate": {
          "label": "材料 loss rate",
          "value": 0.03
        },
        "ffcBend_unit_price": {
          "label": "折彎單價",
          "value": 0.008
        },
        "ffcPrint_unit_price": {
          "label": "印刷單價",
          "value": 0.006
        },
        "ffcFlush_unit_price": {
          "label": "沖型單價",
          "value": 0.016
        },
        "ffcStopLine_unit_price": {
          "label": "停止線單價",
          "value": 0.008
        },
        "ffcAlFoil_unit_price": {
          "label": "Al foil 單價",
          "value": 2.97
        },
        "ffcComponent_loss_rate": {
          "label": "零件費 loss rate",
          "value": 0.015
        },
        "ffcReinforcingPlate_unit_price": {
          "label": "補強板單價",
          "value": 2.609
        },
        "ffcLabel_unit_price": {
          "label": "label單價",
          "value": 0.001
        },
        "ffcConductiveCloth_unit_price": {
          "label": "導電布單價",
          "value": 17
        },
        "ffcAdhesive_unit_price": {
          "label": "背膠單價",
          "value": 1.5
        },
        "package_cost": {
          "label": "運包檢",
          "value": 0.02
        }
      },
      "output": {
        "total": "total"
      }
    }
  }
};

export default data;

