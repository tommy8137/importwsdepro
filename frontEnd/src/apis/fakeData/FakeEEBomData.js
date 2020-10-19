/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable no-unneeded-ternary */
import * as R from 'ramda';


const fakeGetEEBomDetailTab = () => {
  return [
    { "type": "personal", "emplid": "10404301", "user_name": "WINSOME YANG", "eebom_project_id": "1234_k1", "project_code": "1234", "project_name": "222", "edm_version_id": "243c93f6-600b-11e9-9e86-0242ac110002", "version_remark": "224" },
    { "type": "proxy", "emplid": "10404301", "user_name": "WINSOME YANG", "eebom_project_id": "1234_k1", "project_code": "1234", "project_name": "222", "edm_version_id": "243c93f6-600b-11e9-9e86-0242ac110002", "version_remark": "224" },
    { "type": "approver", "emplid": "10404301", "user_name": "WINSOME YANG", "eebom_project_id": "1234_k1", "project_code": "1234", "project_name": "222", "edm_version_id": "243c93f6-600b-11e9-9e86-0242ac110002", "version_remark": "224" }
  ];
};

const fakeGetEEBomDetailInfo = () => {
  return {
    info: ['personal', 'approver'],
    // [TODO] 後端isPersonalSubmit應該只要拿一次 不用每個row裡面都有
    isPersonalSubmit: false
  };
};


const fakeEEBomPersonalPageData = () => {
  const edmVersion = "243c6ce6";
  // type1: Adhesive
  const baseInfos1 = [...Array(2).keys()].map(item => {
    return {
      "id": `adhesive--${item}`,
      "edm_version_id": edmVersion,
      "type1": "Adhesive",
      "type2": 'f1',
      // eslint-disable-next-line no-unneeded-ternary
      // "is_personal_checked": item % 2 === 0 ? false : true,
      // TODO
      is_personal_checked: false,
      is_personal_submitted: false,
      leader_checked_status: null,
      leader_submitted_status: null,
      is_reject: false,
      "currrent_price_adj_percentage": item,
      "remark": `adhesive__${item}`,
      "spa": 'spaaaaa',
      "other_manufacture_info": {
        "spa_manufacturer": "[\"STARCONN\"]",
        "spa_partnumber": "020.K0182.0008"
      }
    };
  });

  return {
    "itemType": 3,
    "checked": 2,
    "picCount": 39,
    "isPCB": true,
    "pcbInfo": {
      "pcbTotalPrice": 64.64,
      "is_pcb_personal_checked": true,
      "is_pcb_personal_submitted": false,
      "leader_checked_status": 'reject',
      "leader_submitted_status": null,
      "is_reject": true,
      "is_bom_approved": false,
      "is_pcb_approved": false,
    },
    "infos": [
      // ...baseInfos3,
      ...baseInfos1,
      // ...baseInfos2
    ]
  };
};

const fakeEEBomApproverData = () => {
  const edmVersion = "243c6ce6";
  // type1: Adhesive
  const baseInfos1 = [...Array(2).keys()].map(item => {
    return {
      "id": `CPU--${item}`,
      "edm_version_id": edmVersion,
      "type1": "AP_CPU",
      "type2": 'f1',
      // eslint-disable-next-line no-unneeded-ternary
      // "is_personal_checked": item % 2 === 0 ? false : true,
      "is_personal_checked": true,
      "is_leader_checked": false,
      "is_personal_submitted": false,
      "description": "descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
      "currrent_price_adj_percentage": item,
      "remark": `adhesive__${item} remarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremarkremark`,
      "spa": 'spaaaaa',
      "other_manufacture_info": {
        "spa_manufacturer": "[\"STARCONN\"]",
        "spa_partnumber": "020.K0182.0008"
      }
    };
  });

  // type1: ASIC
  const baseInfos2 = [...Array(4).keys()].map(item => {
    return {
      "id": `AP_MM--${item}`,
      "edm_version_id": edmVersion,
      "type1": "AP_MM",
      "type2": 'gg',
      "is_personal_checked": true,
      // "is_leader_checked": true,
      "is_leader_checked": item % 2 === 0 ? false : true,
      "is_personal_submitted": true,
      "currrent_price_adj_percentage": null,
      "remark": `asic--${item}`
    };
  });
  const baseInfos3 = [...Array(2).keys()].map(item => {
    return {
      "id": `AP_CC--${item}`,
      "edm_version_id": edmVersion,
      "type1": "CC",
      "type2": 'gg',
      "is_personal_checked": false,
      "is_leader_checked": false,
      "is_personal_submitted": false,
      "currrent_price_adj_percentage": null,
      "remark": `asic--${item}`
    };
  });

  return {
    "itemType": 3,
    "checked": 2,
    "picCount": 39,
    "isPCB": true,
    "pcbInfo": {
      "pcbTotalPrice": 64.64,
      "is_pcb_persional_submitted": false,
      "is_pcb_personal_checked": false,
      "is_pcb_leader_checked": false
    },
    "infos": [
      ...baseInfos1,
      // ...baseInfos2,
      // ...baseInfos3
    ]
  };
};

const fakeUpdatePersonalCheck = (checkedList) => {
  const data = fakeEEBomPersonalPageData();
  return {
    ...data,
    infos: data.infos.map(item => {
      if (R.contains(item.uuid, checkedList)) {
        return {
          ...item,
          is_personal_checked: true
        };
      }
      return item;
      // return {
      //   ...item,
      //   is_personal_checked: true
      // };
    })
  };
};

const fakeUpdateEBomSubmit = () => {
  const data = fakeGetEEBomDetailInfo();
  return {
    ...data,
    isPersonalSubmit: true
  };
};


const fakePCBTemplate = () => {
  return {
    "version": "1.0",
    "components": [
      {
        "key": "PcbContent",
        "label": "選擇或調整Spec內容",
        "single": true,
        "items": [
          {
            "key": "PcbMainBoard",
            "label": "主板/板卡",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbMainBoardMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbMainBoard"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbLayer",
            "label": "Layer",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbLayerMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbLayer"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbHdiStructure",
            "label": "HDI Structure",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbHdiStructureMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbHdiStructure"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbLength",
            "label": "長度",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbWidth",
            "label": "寬度",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbArray",
            "label": "Array",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbArrayMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbArray"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbThickness",
            "label": "厚度",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbASurfaceTreatment",
            "label": "Surface Treatment",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbASurfaceTreatmentMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbASurfaceTreatment"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbhasHalogen",
            "label": "有鹵",
            "fieldType": "checkBox",
            "dataType": "boolean",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbGFPin",
            "label": "G/F PIN",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbGFSpec",
            "label": "G/F Spec.",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbGFSpecMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbGFSpec"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbMaterialType",
            "label": "Material Type",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbMaterialTypeMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbMaterialType"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbLineSpaceWidthMil",
            "label": "Line space/width (mil)",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "MiniViaMil",
            "label": "Mini. VIA (mil)",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbSolderMaskColor",
            "label": "Solder Mask Color",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbSolderMaskColorMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbSolderMaskColor"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbCoreThickness",
            "label": "Core Thickness",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbCopperThicknessAbove",
            "label": "Copper Thickness (上)",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbCopperThicknessAboveMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbCopperThicknessAbove"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbCopperThicknessbelow",
            "label": "Copper Thickness (下)",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbCopperThicknessbelowMap",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbCopperThicknessbelow"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbPPType1",
            "label": "PP Type 1",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbPPType1Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbPPType1"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbPPType2",
            "label": "PP Type 2",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbPPType2Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbPPType2"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbPPType3",
            "label": "PP Type 3",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbPPType3Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbPPType3"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbOthers1",
            "label": "Others 1",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbOthers1Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbOthers1"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbOthers2",
            "label": "Others 2",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbOthers2Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbOthers2"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbOthers3",
            "label": "Others 3",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbOthers3Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbOthers3"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbOthers4",
            "label": "Others 4",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbOthers4Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbOthers4"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          },
          {
            "key": "PcbOthers5",
            "displayConfig": {
              "grids": 2,
              "display": true,
              "depends": []
            },
            "label": "Others 5",
            "selectorConfig": {
              "depends": [],
              "values": []
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true
          },
          {
            "key": "PcbOthers5Map",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "PcbOthers5"
            ],
            "selectorConfig": {
              "values": []
            },
            "fieldType": "mappedValue",
            "dataType": "float"
          }
        ],
        "fieldType": "composite"
      },
      {
        "key": "PcbRemarks",
        "label": "備註",
        "single": true,
        "items": [
          {
            "key": "PcbFillInPrice",
            "label": "自填價錢",
            "fieldType": "input",
            "dataType": "int",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "PcbDescription",
            "displayConfig": {
              "grids": 2,
              "display": true,
              "depends": []
            },
            "label": "Description",
            "fieldType": "textarea",
            "dataType": "string",
            "single": true,
            "require": false
          }
        ],
        "fieldType": "composite"
      }
    ],
    "fomulas": []
  };
};


const fakeThermalModuleTemplate = () => {
  return {
    "version": "1.0",
    "components": {
      "Fan": {
        "single": false,
        "items": [
          {
            "key": "fanLabel",
            "displayConfig": {
              "grids": 3,
              "display": true,
              "depends": []
            },
            "fieldType": "input",
            "dataType": "string",
            "single": true,
            "require": true
          },
          {
            "key": "fanAmount",
            "label": "用量",
            "fieldType": "input",
            "dataType": "int",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
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
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
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
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "fanSizePrice",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
            },
            "mapFrom": [
              "fanSize"
            ],
            "fieldType": "mappedValue",
            "dataType": "float"
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
                  "motorArchitecturePrice": 2.5
                }
              ]
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "motorArchitecturePrice",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
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
                  "motorArchitecturePrice": 2.5
                }
              ]
            },
            "fieldType": "mappedValue",
            "dataType": "float"
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
                }
              ]
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "bearingAndSleevePrice",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
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
                }
              ]
            },
            "fieldType": "mappedValue",
            "dataType": "float"
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
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "fanBladeMaterialPrice",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
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
            "dataType": "float"
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
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "magnetMaterialAndSizePrice",
            "displayConfig": {
              "display": false,
              "grids": 1,
              "depends": []
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
            "dataType": "float"
          },
          {
            "key": "hasHalogen",
            "label": "有鹵",
            "fieldType": "checkBox",
            "dataType": "boolean",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "fanAppearanceProcess",
            "label": "外觀表面處理",
            "selectorConfig": {
              "depends": [],
              "values": [
                {
                  "fanAppearanceProcess": "塗黑"
                }
              ]
            },
            "single": false,
            "fieldType": "selector",
            "dataType": "string",
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          }
        ]
      },
      "Pipe": {
        "single": false,
        "items": [
          {
            "key": "pipeLabel",
            "displayConfig": {
              "grid": 3,
              "display": true,
              "depends": []
            },
            "fieldType": "input",
            "dataType": "string",
            "single": true,
            "require": true
          },
          {
            "key": "pipeAmount",
            "label": "用量",
            "fieldType": "input",
            "dataType": "int",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
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
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "outerDiameter",
            "label": "外徑",
            "selectorConfig": {
              "depends": [],
              "values": [
                {
                  "outerDiameter": "D8_"
                }
              ]
            },
            "fieldType": "selector",
            "dataType": "string",
            "single": true,
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          },
          {
            "key": "pipeLength",
            "label": "長度(L)",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true
          },
          {
            "key": "pipeFlatteningThickness",
            "label": "打扁厚度",
            "fieldType": "input",
            "dataType": "float",
            "single": true,
            "require": true
          },
          {
            "key": "pipeAppearanceProcess",
            "label": "外觀表面處理",
            "selectorConfig": {
              "depends": [],
              "values": [
                {
                  "pipeAppearanceProcess": "塗黑??"
                }
              ]
            },
            "single": false,
            "fieldType": "selector",
            "dataType": "string",
            "require": true,
            "displayConfig": {
              "display": true,
              "grids": 1,
              "depends": []
            }
          }
        ]
      }
    },
    "fomulas": []
  };
};

const updateEEBomTableItems = () => {
  return { message: 'OK' };
};


const fakeViewAllByModule = () => {
  return {
    "approved": 2,
    "checked": 2,
    "totalType2": 1,
    "totalPartsCount": 3,
    "totalSuggestionCost": null,
    "totalCost": null,
    "isPCB": false,
    "pcbInfo": {
      "pcbTotalPrice": 64.64,
      "is_pcb_persional_submitted": false,
      "is_pcb_personal_checked": false,
      "is_pcb_leader_checked": false
    },
    "infos": {
      "null": {
        "partsCount": 1,
        "partNumberCount": 1,
        "shouldCost": 400,
        "totalCost": null,
        "info": [
          {
            "id": "f1395702-60f8-11e9-a82e-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "Adhesive",
            "type2": null,
            "part_number": null,
            "description": null,
            "manufacturer": null,
            "current_price": null,
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": "400",
            "remark": null,
            "qty": "31",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": null,
            "is_personal_checked": false,
            "is_leader_checked": false,
            "is_personal_submitted": false,
            "create_time": "2019-04-17T10:09:52.052Z",
            "update_time": "2019-04-17T10:09:52.052Z"
          }
        ]
      },
      "pig": {
        "partsCount": 1,
        "partNumberCount": 1,
        "shouldCost": 200.5,
        "totalCost": 66.1,
        "info": [
          {
            "id": "59fbe45e-603a-11e9-b34e-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "Adhesive",
            "type2": null,
            "part_number": 34,
            "description": null,
            "manufacturer": null,
            "current_price": "66.1",
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": "200.5",
            "remark": "4567890fghjkfyuio32rfqop23ifjqpoewijrqwereqwrqew",
            "qty": "4",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": "pig",
            "is_personal_checked": true,
            "is_leader_checked": true,
            "is_personal_submitted": true,
            "create_time": "2019-04-16T11:25:33.977Z",
            "update_time": "2019-04-16T11:25:33.977Z"
          }
        ]
      },
      "chicken": {
        "partsCount": 1,
        "partNumberCount": 1,
        "shouldCost": 200,
        "totalCost": 123.55,
        "info": [
          {
            "id": "406b20ea-60a8-11e9-869d-0242ac110002",
            "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
            "type1": "ASIC",
            "type2": null,
            "part_number": null,
            "description": null,
            "manufacturer": null,
            "current_price": "123.55",
            "spa": null,
            "lpp": null,
            "currrent_price_adj_percentage": null,
            "ce_cost": null,
            "suggestion_cost": "200",
            "remark": "4567890fghjkfyuio32rfqop23ifjqpoewijrqwereqwrqew",
            "qty": "4",
            "sub_total_suggestion_cost": null,
            "vendor": null,
            "vendor_part_no": null,
            "supply_type": null,
            "obs": null,
            "module": "chicken",
            "is_personal_checked": true,
            "is_leader_checked": true,
            "is_personal_submitted": true,
            "create_time": "2019-04-17T00:32:16.262Z",
            "update_time": "2019-04-17T00:32:16.262Z"
          }
        ]
      }
    }
  };
};

const fakeViewAllByPN = () => {
  return {
    "approved": 2,
    "checked": 2,
    "totalType2": 1,
    "totalPartsCount": 3,
    "totalSuggestionCost": null,
    "totalCost": null,
    "isPCB": false,
    "pcbInfo": {
      "pcbTotalPrice": 64.64,
      "is_pcb_persional_submitted": false,
      "is_pcb_personal_checked": false,
      "is_pcb_leader_checked": false
    },
    "infos": [
      {
        "id": "59fbe45e-603a-11e9-b34e-0242ac110002",
        "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
        "type1": "Adhesive",
        "type2": null,
        "part_number": null,
        "description": null,
        "manufacturer": null,
        "current_price": null,
        "spa": null,
        "lpp": null,
        "currrent_price_adj_percentage": null,
        "ce_cost": null,
        "suggestion_cost": "200.5",
        "remark": "4567890fghjkfyuio32rfqop23ifjqpoewijrqwereqwrqew",
        "qty": "4",
        "sub_total_suggestion_cost": null,
        "vendor": null,
        "vendor_part_no": null,
        "supply_type": null,
        "obs": null,
        "module": null,
        "is_personal_checked": true,
        "is_leader_checked": true,
        "is_personal_submitted": true,
        "create_time": "2019-04-16T11:25:33.977Z",
        "update_time": "2019-04-16T11:25:33.977Z"
      },
      {
        "id": "406b20ea-60a8-11e9-869d-0242ac110002",
        "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
        "type1": "ASIC",
        "type2": null,
        "part_number": null,
        "description": null,
        "manufacturer": null,
        "current_price": null,
        "spa": null,
        "lpp": null,
        "currrent_price_adj_percentage": null,
        "ce_cost": null,
        "suggestion_cost": "200",
        "remark": "4567890fghjkfyuio32rfqop23ifjqpoewijrqwereqwrqew",
        "qty": "4",
        "sub_total_suggestion_cost": null,
        "vendor": null,
        "vendor_part_no": null,
        "supply_type": null,
        "obs": null,
        "module": null,
        "is_personal_checked": true,
        "is_leader_checked": true,
        "is_personal_submitted": true,
        "create_time": "2019-04-17T00:32:16.262Z",
        "update_time": "2019-04-17T00:32:16.262Z"
      },
      {
        "id": "f1395702-60f8-11e9-a82e-0242ac110002",
        "edm_version_id": "243c6ce6-600b-11e9-9e86-0242ac110002",
        "type1": "Adhesive",
        "type2": null,
        "part_number": null,
        "description": null,
        "manufacturer": null,
        "current_price": null,
        "spa": null,
        "lpp": null,
        "currrent_price_adj_percentage": null,
        "ce_cost": null,
        "suggestion_cost": "400",
        "remark": "4567890fghjkfyuio32rfqop23ifjqpoewijrqwereqwrqew",
        "qty": "31",
        "sub_total_suggestion_cost": null,
        "vendor": null,
        "vendor_part_no": null,
        "supply_type": null,
        "obs": null,
        "module": null,
        "is_personal_checked": false,
        "is_leader_checked": false,
        "is_personal_submitted": false,
        "create_time": "2019-04-17T10:09:52.052Z",
        "update_time": "2019-04-17T10:09:52.052Z"
      }
    ]
  };
};

const fakeViewAllData = (columnType = 'partName') => {
  switch (columnType) {
    case 'partName':
      return fakeViewAllByPN();
    case 'module':
      return fakeViewAllByModule();
    default:
      return fakeViewAllByPN();
  }
};


const fakeGetEEbomPCBList = () => {
  return {
    list: [
      {
        "id": "21a00a68-c00e-49d2-a805-f0e47ca7175b",
        "edm_version_id": "a80fee02-61c4-11e9-abdc-0242ac110002",
        "description": null,
        "cost": null,
        "is_count": null,
        "type": 0,
        "qty": null,
        "content": "123",
        "update_time": "2019-04-23T02:34:13.097Z",
        "create_time": "2019-04-23T02:34:13.097Z",
        "part_number": "48U.18734.D001"
      },
      {
        "id": "21a00a68-c00e-49d2-a805-f0e47ca7175c",
        "edm_version_id": "a80fee02-61c4-11e9-abdc-0242ac11000c",
        "description": null,
        "cost": null,
        "is_count": null,
        "type": 1,
        "qty": null,
        "content": "123",
        "update_time": "2019-04-23T02:34:13.097Z",
        "create_time": "2019-04-23T02:34:13.097Z",
        "part_number": "48U.18734.D001"
      }
    ]
  };
};

const fakeGetEEbomPCBType2 = () => {
  return {
    type2: [
      "HDI",
      "PCB",
      "PTH"
    ]
  };
};

const fakeRefreshFeedback = (edmVersion) => {
  return {
    edm_version_id: edmVersion,
  };
};

export default {
  fakeEEBomPersonalPageData,
  fakeGetEEBomDetailInfo,
  fakeUpdatePersonalCheck,
  fakeUpdateEBomSubmit,
  fakeViewAllData,
  fakePCBTemplate,
  fakeThermalModuleTemplate,
  updateEEBomTableItems,
  fakeEEBomApproverData,
  fakeGetEEBomDetailTab,
  fakeGetEEbomPCBList,
  fakeGetEEbomPCBType2,
  fakeRefreshFeedback,
};
