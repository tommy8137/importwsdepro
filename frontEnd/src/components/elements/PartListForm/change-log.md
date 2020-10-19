## Component log

### v1.0
- 完成元件初版

### v2.0
- 將 initialValues 重新命名為 formData
- formData 格式改版, 改成巢狀物件, add another 改用 array 處理
    ```JSON
        {"cwTab":{"CWItems":{"partname":null,"partnumber":null},"CWGroup":[{"uuid":"0726fd5f-0429-475b-86d6-036ac03a577e","CWGroupName":null,"CWWire":null,"cableMaterialType":null,"cableMaterialLength":null,"cableMaterialPin":null,"cableMaterialGuage":null,"CWConnector":null,"cableConnectorName":null,"cableConnectorType":null,"cableConnectorVendorPn":null,"cableConnectorMotherPN":null,"cableMaterialUnitPrice":null,"cableConnectorWorkingTime":null,"cableConnectorUnitPrice":null,"CWSubMertial":[{"uuid":"984b8424-358a-491c-811b-d79bf5bae470","CWSubMertialLabel":null,"cableSupportMaterial":null,"cableSupportMaterialQty":null,"cableSupportMaterialLength":null,"cableSupportMaterialWidth":null}]}]}}
    ```
 - 刪除不再使用的元件 FieldGroups, NormalHeader
 - PreviewImage 變成共用元件
 - 移除 PartlistUtils 不使用的函數
 - 移動 swicthable key 擺在 formData 的位置， key 改名為 key+Switch 
    - 原本位置
        ```JSON
            {
                "CWSubMaterial": [
                    { CWSubMaterial: true }
                ] 
            }
        ```
    - 新的位置
        ```JSON
            {   
                "CWSubMaterialSwitch": true,
                "CWSubMaterial": [] 
            }
        ```


## payload log

### bom/bomItems/partlist 取回來的 partItemValues

#### 最早版本 (有上 PRD)

- partlist
    - thermal-module
    - housing-metal
    - housing-plastic

- 有 partlist_value 裡面有 Price, Amount, Images, 其他 part item 值, 此時回來的值都會會去 PRCIE 裡面找, 只有一層物件


```JSON
{
    "partlist_value":{
        "Fan":{"fanLabel":"67456745674567","fanAmount":44444,"fanType":"Axial(軸流扇)","fanSize":"60*60*3.5","fanSizePrice":3.5,"motorArchitecture":"1_phase_H<=7.5","motorArchitecturePrice":null,"bearingAndSleeve":"Sleeve+塑膠_H<=7.5","bearingAndSleevePrice":null,"fanBladeMaterial":"PBT_H<=7.5","fanBladeMaterialPrice":null,"magnetMaterialAndSize":"橡膠_H<=7.5","magnetMaterialAndSizePrice":null,"hasHalogen":true,"fanAppearanceProcess1":"塗黑","fanAppearanceProcess2":"塗黑"},
        "Pipe":{"pipeLabel":"Pipe","pipeAmount":4,"pipeType":"Groove(溝槽管)","outerDiameter":"PD6_","pipeLength":1,"pipiLenThickODiaToCost":null,"pipiLenODiaToCost":null,"pipeFlatteningThickness":333,"pipiFlThickODiaToCost":null,"pipeAppearanceProcess1":"塗黑","pipeAppearanceProcess2":"塗黑"},
        "Fin":{"finLabel":"Fin","finAmount":5,"finMaterial":"AL1050","finPitch":1,"finProductionLength":1,"finProductionWidth":1,"finProductionHigh":1,"finProductionExpandLength":1,"finProductionExpandWidth":1,"finMaterialCostPerKilogram":2.9,"finDensity":null,"finMaterialThickness":0.15,"finNickelPlating":true,"finAppearanceProcess1":"塗黑","finAppearanceProcess2":"塗黑"},
        "ThermalPlate":{"thPlLabel":"Thermal Plate","thPlAmount":7,"thPlMaterial":"CU1100","thPlMaterialCostPerKilogram":4.5,"thPlMaterialThickness":0.5,"thPlProductionLength":1,"thPlProductionWidth":1,"thPlProductionHigh":1,"thPlProductionExpandLength":1,"thPlProductionExpandWidth":1,"thPlNickelPlating":true,"thPlAppearanceProcess1":"塗黑","thPlAppearanceProcess2":"塗黑","thPlDensity":null},
        "ThermalBlock":{"thBlLabel":"CPU","thBlAmount":8,"thBlMaterial":"CU1100","thBlMaterialCostPerKilogram":8.6,"thBlMaterialThickness":0.1,"thBlProductionLength":1,"thBlProductionWidth":1,"thBlNickelPlating":true,"thBlDensity":null},
        "Screw":{"screwLabel":"Screw","screwAmount":9,"screwToothpath":1,"screwHeadDiameter":1,"screwHeadThickness":1,"screwLength":1,"screwPolishedRod":true,"screwNeckDiameter":1,"screwNeckLength":1,"screwResistantFall":true},
        "Spring":{"springLabel":"Spring","springAmount":1,"springWireDiameter":1,"springCoilCenterDiameter":1,"springFreeLong":1},
        "ORing":{"oRLabel":"O-Ring","oRAmount":2,"oROuterDiameter":1,"oRInnerDiameter":1,"oRThickness":1},
        "Clip":{"clipLabel":"Clip","clipAmount":3,"clipMaterial":"CU1100","clipMaterialCostPerKilogram":4.5,"clipWireDiameter":1,"clipProductionLength":1,"clipProductionWidth":null},
        "PushPin":{"pupiLabel":"Push Pin","pupiAmount":4,"pupiLength":1,"pupiHeadDiameter":1},
        "Label":{"labelLabel":"Label","labelAmount":5,"labelLength":1,"labelWidth":1,"labelThickness":1},
        "Sponge":{"spongeLabel":"Label","spongeAmount":6,"spongeMaterial":"CR1015","spongeLength":1,"spongeWidth":1,"spongeMaterialThickness":0.5,"spongeMaterialCostPerMM":0.98},"Grease":{"greaseLabel":"Label","greaseAmount":7,"greaseMaterial":7783,"greaseMaterialCost":490,"greaseLength":1,"greaseWidth":1,"greaseThickness":1},
        "ThermalPad":{"thermalPadLabel":"Label","thermalPadAmount":8,"thermalPadHeatTransferCoefficient":6,"thermalPadShore":45,"thermalPadThickness":1,"thermalPadLength":1,"thermalPadWidth":1,"thermalPadPrice":257},"ThermalPadMultiImage":{"multiUploadImage":["5caed2a2-7e1b-11e9-afc6-0242ac110002","10c44962-7e1b-11e9-868f-0242ac110002","1a57b77a-7e16-11e9-afc6-0242ac110002","e38c27fe-7dc4-11e9-bbbe-0242ac110002"]},
        "Fan-1415d173-fcdf-489b-9e0a-2bffe855049f":{"fanLabel":"Fan465745674567","fanAmount":2,"fanType":"Axial(軸流扇)","fanSize":"60*60*4","fanSizePrice":5.5,"motorArchitecture":"1_phase_H<=7.5","motorArchitecturePrice":null,"bearingAndSleeve":"Sleeve+塑膠_H<=7.5","bearingAndSleevePrice":null,"fanBladeMaterial":"PBT_H<=7.5","fanBladeMaterialPrice":null,"magnetMaterialAndSize":"橡膠_H<=7.5","magnetMaterialAndSizePrice":null,"hasHalogen":true,"fanAppearanceProcess1":"塗黑","fanAppearanceProcess2":"塗黑"},
        "Fan-3ffad4c1-a876-4f09-a4b8-e4a3e7a36629":{"fanLabel":"Fan","fanAmount":3,"fanType":"Axial(軸流扇)","fanSize":"60*60*4","fanSizePrice":5.5,"motorArchitecture":"3_phase_H<=4.5","motorArchitecturePrice":null,"bearingAndSleeve":"Sleeve+金屬_H<=7.5","bearingAndSleevePrice":null,"fanBladeMaterial":"PBT_H<=7.5","fanBladeMaterialPrice":null,"magnetMaterialAndSize":"橡膠_H<=7.5","magnetMaterialAndSizePrice":null,"hasHalogen":true,"fanAppearanceProcess1":"塗黑","fanAppearanceProcess2":"塗黑"},
        "Fin-69fca935-e005-4a07-b15e-7c8f8cac9b56":{"finLabel":"Fin","finAmount":6,"finMaterial":"AL1050","finPitch":1,"finProductionLength":1,"finProductionWidth":1,"finProductionHigh":1,"finProductionExpandLength":1,"finProductionExpandWidth":1,"finMaterialCostPerKilogram":2.9,"finDensity":null,"finMaterialThickness":0.15,"finNickelPlating":true,"finAppearanceProcess1":"塗黑","finAppearanceProcess2":"塗黑"},
        
        "Images":["5caed2a2-7e1b-11e9-afc6-0242ac110002","10c44962-7e1b-11e9-868f-0242ac110002","1a57b77a-7e16-11e9-afc6-0242ac110002","e38c27fe-7dc4-11e9-bbbe-0242ac110002"],
        "Amount":{"Fan":44444,"Fan-1415d173-fcdf-489b-9e0a-2bffe855049f":2,"Fan-3ffad4c1-a876-4f09-a4b8-e4a3e7a36629":3,"Pipe":4,"Fin":5,"Fin-69fca935-e005-4a07-b15e-7c8f8cac9b56":6,"ThermalPlate":7,"ThermalBlock":8,"Screw":9,"Spring":1,"ORing":2,"Clip":3,"PushPin":4,"Label":5,"Sponge":6,"Grease":7,"ThermalPad":8},
        
        "Price":{
            "Fan":{"fanLabel":"67456745674567","fanAmount":44444,"fanType":"Axial(軸流扇)","fanSize":"60*60*3.5","fanSizePrice":3.5,"motorArchitecture":"1_phase_H<=7.5","motorArchitecturePrice":null,"bearingAndSleeve":"Sleeve+塑膠_H<=7.5","bearingAndSleevePrice":null,"fanBladeMaterial":"PBT_H<=7.5","fanBladeMaterialPrice":null,"magnetMaterialAndSize":"橡膠_H<=7.5","magnetMaterialAndSizePrice":null,"hasHalogen":true,"fanAppearanceProcess1":"塗黑","fanAppearanceProcess2":"塗黑"},
            "Pipe":{"pipeLabel":"Pipe","pipeAmount":4,"pipeType":"Groove(溝槽管)","outerDiameter":"PD6_","pipeLength":1,"pipiLenThickODiaToCost":null,"pipiLenODiaToCost":null,"pipeFlatteningThickness":333,"pipiFlThickODiaToCost":null,"pipeAppearanceProcess1":"塗黑","pipeAppearanceProcess2":"塗黑"},
            "Fin":{"finLabel":"Fin","finAmount":5,"finMaterial":"AL1050","finPitch":1,"finProductionLength":1,"finProductionWidth":1,"finProductionHigh":1,"finProductionExpandLength":1,"finProductionExpandWidth":1,"finMaterialCostPerKilogram":2.9,"finDensity":null,"finMaterialThickness":0.15,"finNickelPlating":true,"finAppearanceProcess1":"塗黑","finAppearanceProcess2":"塗黑"},
            "ThermalPlate":{"thPlLabel":"Thermal Plate","thPlAmount":7,"thPlMaterial":"CU1100","thPlMaterialCostPerKilogram":4.5,"thPlMaterialThickness":0.5,"thPlProductionLength":1,"thPlProductionWidth":1,"thPlProductionHigh":1,"thPlProductionExpandLength":1,"thPlProductionExpandWidth":1,"thPlNickelPlating":true,"thPlAppearanceProcess1":"塗黑","thPlAppearanceProcess2":"塗黑","thPlDensity":null},
            "ThermalBlock":{"thBlLabel":"CPU","thBlAmount":8,"thBlMaterial":"CU1100","thBlMaterialCostPerKilogram":8.6,"thBlMaterialThickness":0.1,"thBlProductionLength":1,"thBlProductionWidth":1,"thBlNickelPlating":true,"thBlDensity":null},
            "Screw":{"screwLabel":"Screw","screwAmount":9,"screwToothpath":1,"screwHeadDiameter":1,"screwHeadThickness":1,"screwLength":1,"screwPolishedRod":true,"screwNeckDiameter":1,"screwNeckLength":1,"screwResistantFall":true},
            "Spring":{"springLabel":"Spring","springAmount":1,"springWireDiameter":1,"springCoilCenterDiameter":1,"springFreeLong":1},
            "ORing":{"oRLabel":"O-Ring","oRAmount":2,"oROuterDiameter":1,"oRInnerDiameter":1,"oRThickness":1},
            "Clip":{"clipLabel":"Clip","clipAmount":3,"clipMaterial":"CU1100","clipMaterialCostPerKilogram":4.5,"clipWireDiameter":1,"clipProductionLength":1,"clipProductionWidth":null},
            "PushPin":{"pupiLabel":"Push Pin","pupiAmount":4,"pupiLength":1,"pupiHeadDiameter":1},"Label":{"labelLabel":"Label","labelAmount":5,"labelLength":1,"labelWidth":1,"labelThickness":1},
            "Sponge":{"spongeLabel":"Label","spongeAmount":6,"spongeMaterial":"CR1015","spongeLength":1,"spongeWidth":1,"spongeMaterialThickness":0.5,"spongeMaterialCostPerMM":0.98},
            "Grease":{"greaseLabel":"Label","greaseAmount":7,"greaseMaterial":7783,"greaseMaterialCost":490,"greaseLength":1,"greaseWidth":1,"greaseThickness":1},
            "ThermalPad":{"thermalPadLabel":"Label","thermalPadAmount":8,"thermalPadHeatTransferCoefficient":6,"thermalPadShore":45,"thermalPadThickness":1,"thermalPadLength":1,"thermalPadWidth":1,"thermalPadPrice":257},"ThermalPadMultiImage":{"multiUploadImage":["5caed2a2-7e1b-11e9-afc6-0242ac110002","10c44962-7e1b-11e9-868f-0242ac110002","1a57b77a-7e16-11e9-afc6-0242ac110002","e38c27fe-7dc4-11e9-bbbe-0242ac110002"]},
            "Fan-1415d173-fcdf-489b-9e0a-2bffe855049f":{"fanLabel":"Fan465745674567","fanAmount":2,"fanType":"Axial(軸流扇)","fanSize":"60*60*4","fanSizePrice":5.5,"motorArchitecture":"1_phase_H<=7.5","motorArchitecturePrice":null,"bearingAndSleeve":"Sleeve+塑膠_H<=7.5","bearingAndSleevePrice":null,"fanBladeMaterial":"PBT_H<=7.5","fanBladeMaterialPrice":null,"magnetMaterialAndSize":"橡膠_H<=7.5","magnetMaterialAndSizePrice":null,"hasHalogen":true,"fanAppearanceProcess1":"塗黑","fanAppearanceProcess2":"塗黑"},
            "Fan-3ffad4c1-a876-4f09-a4b8-e4a3e7a36629":{"fanLabel":"Fan","fanAmount":3,"fanType":"Axial(軸流扇)","fanSize":"60*60*4","fanSizePrice":5.5,"motorArchitecture":"3_phase_H<=4.5","motorArchitecturePrice":null,"bearingAndSleeve":"Sleeve+金屬_H<=7.5","bearingAndSleevePrice":null,"fanBladeMaterial":"PBT_H<=7.5","fanBladeMaterialPrice":null,"magnetMaterialAndSize":"橡膠_H<=7.5","magnetMaterialAndSizePrice":null,"hasHalogen":true,"fanAppearanceProcess1":"塗黑","fanAppearanceProcess2":"塗黑"},
            "Fin-69fca935-e005-4a07-b15e-7c8f8cac9b56":{"finLabel":"Fin","finAmount":6,"finMaterial":"AL1050","finPitch":1,"finProductionLength":1,"finProductionWidth":1,"finProductionHigh":1,"finProductionExpandLength":1,"finProductionExpandWidth":1,"finMaterialCostPerKilogram":2.9,"finDensity":null,"finMaterialThickness":0.15,"finNickelPlating":true,"finAppearanceProcess1":"塗黑","finAppearanceProcess2":"塗黑"},
            "Images":["5caed2a2-7e1b-11e9-afc6-0242ac110002","10c44962-7e1b-11e9-868f-0242ac110002","1a57b77a-7e16-11e9-afc6-0242ac110002","e38c27fe-7dc4-11e9-bbbe-0242ac110002"],
            "Amount":{"Fan":44444,"Fan-1415d173-fcdf-489b-9e0a-2bffe855049f":2,"Fan-3ffad4c1-a876-4f09-a4b8-e4a3e7a36629":3,"Pipe":4,"Fin":5,"Fin-69fca935-e005-4a07-b15e-7c8f8cac9b56":6,"ThermalPlate":7,"ThermalBlock":8,"Screw":9,"Spring":1,"ORing":2,"Clip":3,"PushPin":4,"Label":5,"Sponge":6,"Grease":7,"ThermalPad":8}
        }
    }
}
```



#### 第二版 (有上PRD)

- 如何處理前版資料: 手動填回原本的表單裡面，約80筆左右
- partlist
    - thermal-module
    - housing-metal
    - housing-plastic
    - die-cut
    - cable-wire
    - cable-FFC

- 有 partlist_value 出現 initialValue, 並加上前綴字

##### die-cut
```JSON
{
    "partlist_value":{
        "initialValue":{
            "DieCutPartItemInfo":true,"partname":"DieCut 2 Adhesive_of_Mylar_Sponge_Poron ","partnumber":null,"MainMaterial":true,"type2":"Adhesive_of_Mylar_Sponge_Poron","materialspec":"T0.05Adhesive","material":"DS_5","materialPerCost":0,"mainMaterialSize":true,"partssizelength":"2","partssizewidth":"2","partssizehigh":"2","stampingTypeName":"沖切","stampingType":1,"dieCutRemark":null,"usingSubMaterial_usingSubMaterial":true,"usingSubMaterial_subMaterialLabel":null,"usingSubMaterial_subType2":"Adhesive","usingSubMaterial_subMaterialspec":"T0.05Adhesive","usingSubMaterial_subMaterial":"DS_5","usingSubMaterial_subMaterialPerCost":1.029411765,"usingSubMaterial_subMaterialSize":true,"usingSubMaterial_subMaterialLength":2,"usingSubMaterial_subMaterialWidth":2,"usingSubMaterial_subMaterialHeight":0,"usingSubMaterial_assyCount":2
        },
        "Price":{
            "dieCut":{"DieCutPartItemInfo":true,"partname":"DieCut 2 Adhesive_of_Mylar_Sponge_Poron ","partnumber":null,"materialCost":{"MainMaterial":true,"type2":"Adhesive_of_Mylar_Sponge_Poron","materialspec":"T0.05Adhesive","material":"DS_5","materialPerCost":0,"mainMaterialSize":true,"partssizelength":"2","partssizewidth":"2","partssizehigh":"2","stampingTypeName":"沖切","stampingType":1,"dieCutRemark":null},"subMaterialCost":{"usingSubMaterial":true,"subMaterialLabel":null,"subType2":"Adhesive","subMaterialspec":"T0.05Adhesive","subMaterial":"DS_5","subMaterialPerCost":1.029411765,"subMaterialSize":true,"subMaterialLength":2,"subMaterialWidth":2,"subMaterialHeight":0,"assyCount":2}}
        },
        "Images":[]
    }
}
```


##### thermal-module
```JSON
{
    "partlist_value":{
        "initialValue":{
            "thermal-module_Fan":true,"thermal-module_Fan_fanLabel":"Fan","thermal-module_Fan_fanAmount":0,"thermal-module_Fan_fanType":null,"thermal-module_Fan_fanSize":null,"thermal-module_Fan_fanSizePrice":0,"thermal-module_Fan_motorArchitecture":null,"thermal-module_Fan_motorArchitecturePrice":0,"thermal-module_Fan_bearingAndSleeve":null,"thermal-module_Fan_bearingAndSleevePrice":0,"thermal-module_Fan_fanBladeMaterial":null,"thermal-module_Fan_fanBladeMaterialPrice":0,"thermal-module_Fan_magnetMaterialAndSize":null,"thermal-module_Fan_magnetMaterialAndSizePrice":0,"thermal-module_Fan_hasHalogen":false,"thermal-module_Fan_fanAppearanceProcess1":null,"thermal-module_Fan_fanAppearanceProcess2":null,"thermal-module_Pipe":true,"thermal-module_Pipe_pipeLabel":"Pipe","thermal-module_Pipe_pipeAmount":0,"thermal-module_Pipe_pipeType":null,"thermal-module_Pipe_outerDiameter":null,"thermal-module_Pipe_pipeLength":0,"thermal-module_Pipe_pipiLenThickODiaToCost":0,"thermal-module_Pipe_pipiLenODiaToCost":0,"thermal-module_Pipe_pipeFlatteningThickness":0,"thermal-module_Pipe_pipiFlThickODiaToCost":0,"thermal-module_Pipe_pipeAppearanceProcess1":null,"thermal-module_Pipe_pipeAppearanceProcess2":null,"thermal-module_Fin":true,"thermal-module_Fin_finLabel":"Fin","thermal-module_Fin_finAmount":0,"thermal-module_Fin_finMaterial":null,"thermal-module_Fin_finPitch":0,"thermal-module_Fin_finProductionSize":true,"thermal-module_Fin_finProductionSize_finProductionLength":0,"thermal-module_Fin_finProductionSize_finProductionWidth":0,"thermal-module_Fin_finProductionSize_finProductionHigh":0,"thermal-module_Fin_finProductionExpandSize":true,"thermal-module_Fin_finProductionExpandSize_finProductionExpandLength":0,"thermal-module_Fin_finProductionExpandSize_finProductionExpandWidth":0,"thermal-module_Fin_finMaterialCostPerKilogram":0,"thermal-module_Fin_finDensity":0,"thermal-module_Fin_finMaterialThickness":0,"thermal-module_Fin_finNickelPlating":false,"thermal-module_Fin_finAppearanceProcess1":null,"thermal-module_Fin_finAppearanceProcess2":null,"thermal-module_ThermalPlate":true,"thermal-module_ThermalPlate_thPlLabel":"Thermal Plate","thermal-module_ThermalPlate_thPlAmount":0,"thermal-module_ThermalPlate_thPlMaterial":null,"thermal-module_ThermalPlate_thPlMaterialCostPerKilogram":0,"thermal-module_ThermalPlate_thPlMaterialThickness":0,"thermal-module_ThermalPlate_thPlProductionSize":true,"thermal-module_ThermalPlate_thPlProductionSize_thPlProductionLength":0,"thermal-module_ThermalPlate_thPlProductionSize_thPlProductionWidth":0,"thermal-module_ThermalPlate_thPlProductionSize_thPlProductionHigh":0,"thermal-module_ThermalPlate_thPlProductionExpandSize":true,"thermal-module_ThermalPlate_thPlProductionExpandSize_thPlProductionExpandLength":0,"thermal-module_ThermalPlate_thPlProductionExpandSize_thPlProductionExpandWidth":0,"thermal-module_ThermalPlate_thPlNickelPlating":false,"thermal-module_ThermalPlate_thPlAppearanceProcess1":null,"thermal-module_ThermalPlate_thPlAppearanceProcess2":null,"thermal-module_ThermalPlate_thPlDensity":0,"thermal-module_ThermalBlock":true,"thermal-module_ThermalBlock_thBlLabel":"Thermal Block","thermal-module_ThermalBlock_thBlAmount":0,"thermal-module_ThermalBlock_thBlMaterial":null,"thermal-module_ThermalBlock_thBlMaterialCostPerKilogram":0,"thermal-module_ThermalBlock_thBlMaterialThickness":0,"thermal-module_ThermalBlock_thBlProductionSize":true,"thermal-module_ThermalBlock_thBlProductionSize_thBlProductionLength":0,"thermal-module_ThermalBlock_thBlProductionSize_thBlProductionWidth":0,"thermal-module_ThermalBlock_thBlNickelPlating":false,"thermal-module_ThermalBlock_thBlDensity":0,"thermal-module_Screw":true,"thermal-module_Screw_screwLabel":"Screw","thermal-module_Screw_screwAmount":0,"thermal-module_Screw_screwToothpath":0,"thermal-module_Screw_screwHeadDiameter":0,"thermal-module_Screw_screwHeadThickness":0,"thermal-module_Screw_screwLength":0,"thermal-module_Screw_screwPolishedRod":false,"thermal-module_Screw_screwNeckDiameter":0,"thermal-module_Screw_screwNeckLength":0,"thermal-module_Screw_screwResistantFall":false,"thermal-module_Spring":true,"thermal-module_Spring_springLabel":"Spring","thermal-module_Spring_springAmount":0,"thermal-module_Spring_springWireDiameter":0,"thermal-module_Spring_springCoilCenterDiameter":0,"thermal-module_Spring_springFreeLong":0,"thermal-module_ORing":true,"thermal-module_ORing_oRLabel":"O-Ring","thermal-module_ORing_oRAmount":0,"thermal-module_ORing_oROuterDiameter":0,"thermal-module_ORing_oRInnerDiameter":0,"thermal-module_ORing_oRThickness":0,"thermal-module_Clip":true,"thermal-module_Clip_clipLabel":"Clip","thermal-module_Clip_clipAmount":0,"thermal-module_Clip_clipMaterial":null,"thermal-module_Clip_clipMaterialCostPerKilogram":0,"thermal-module_Clip_clipWireDiameter":0,"thermal-module_Clip_clipProductionLength":0,"thermal-module_Clip_clipProductionWidth":0,"thermal-module_PushPin":true,"thermal-module_PushPin_pupiLabel":"Push Pin","thermal-module_PushPin_pupiAmount":0,"thermal-module_PushPin_pupiLength":0,"thermal-module_PushPin_pupiHeadDiameter":0,"thermal-module_Label":true,"thermal-module_Label_labelLabel":"Label","thermal-module_Label_labelAmount":0,"thermal-module_Label_labelLength":0,"thermal-module_Label_labelWidth":0,"thermal-module_Label_labelThickness":0,"thermal-module_Sponge":true,"thermal-module_Sponge_spongeLabel":"Sponge","thermal-module_Sponge_spongeAmount":0,"thermal-module_Sponge_spongeMaterial":null,"thermal-module_Sponge_spongeLength":0,"thermal-module_Sponge_spongeWidth":0,"thermal-module_Sponge_spongeMaterialThickness":null,"thermal-module_Sponge_spongeMaterialCostPerMM":0,"thermal-module_Grease":true,"thermal-module_Grease_greaseLabel":"Grease","thermal-module_Grease_greaseAmount":0,"thermal-module_Grease_greaseMaterial":null,"thermal-module_Grease_greaseMaterialCost":0,"thermal-module_Grease_greaseLength":0,"thermal-module_Grease_greaseWidth":0,"thermal-module_Grease_greaseThickness":0,"thermal-module_ThermalPad":true,"thermal-module_ThermalPad_thermalPadLabel":"Thermal Plad","thermal-module_ThermalPad_thermalPadAmount":0,"thermal-module_ThermalPad_thermalPadHeatTransferCoefficient":null,"thermal-module_ThermalPad_thermalPadShore":0,"thermal-module_ThermalPad_thermalPadThickness":0,"thermal-module_ThermalPad_thermalPadLength":0,"thermal-module_ThermalPad_thermalPadWidth":0,"thermal-module_ThermalPad_thermalPadPrice":0
        },
        "Price":{
            "thermalModule":{"Fan":{"Fan":true,"fanLabel":"Fan","fanAmount":0,"fanType":null,"fanSize":null,"fanSizePrice":0,"motorArchitecture":null,"motorArchitecturePrice":0,"bearingAndSleeve":null,"bearingAndSleevePrice":0,"fanBladeMaterial":null,"fanBladeMaterialPrice":0,"magnetMaterialAndSize":null,"magnetMaterialAndSizePrice":0,"hasHalogen":false,"fanAppearanceProcess1":null,"fanAppearanceProcess2":null},"Pipe":{"Pipe":true,"pipeLabel":"Pipe","pipeAmount":0,"pipeType":null,"outerDiameter":null,"pipeLength":0,"pipiLenThickODiaToCost":0,"pipiLenODiaToCost":0,"pipeFlatteningThickness":0,"pipiFlThickODiaToCost":0,"pipeAppearanceProcess1":null,"pipeAppearanceProcess2":null},"Fin":{"Fin":true,"finLabel":"Fin","finAmount":0,"finMaterial":null,"finPitch":0,"finProductionSize":true,"finProductionLength":0,"finProductionWidth":0,"finProductionHigh":0,"finProductionExpandSize":true,"finProductionExpandLength":0,"finProductionExpandWidth":0,"finMaterialCostPerKilogram":0,"finDensity":0,"finMaterialThickness":0,"finNickelPlating":false,"finAppearanceProcess1":null,"finAppearanceProcess2":null},"ThermalPlate":{"ThermalPlate":true,"thPlLabel":"Thermal Plate","thPlAmount":0,"thPlMaterial":null,"thPlMaterialCostPerKilogram":0,"thPlMaterialThickness":0,"thPlProductionSize":true,"thPlProductionLength":0,"thPlProductionWidth":0,"thPlProductionHigh":0,"thPlProductionExpandSize":true,"thPlProductionExpandLength":0,"thPlProductionExpandWidth":0,"thPlNickelPlating":false,"thPlAppearanceProcess1":null,"thPlAppearanceProcess2":null,"thPlDensity":0},"ThermalBlock":{"ThermalBlock":true,"thBlLabel":"Thermal Block","thBlAmount":0,"thBlMaterial":null,"thBlMaterialCostPerKilogram":0,"thBlMaterialThickness":0,"thBlProductionSize":true,"thBlProductionLength":0,"thBlProductionWidth":0,"thBlNickelPlating":false,"thBlDensity":0},"Screw":{"Screw":true,"screwLabel":"Screw","screwAmount":0,"screwToothpath":0,"screwHeadDiameter":0,"screwHeadThickness":0,"screwLength":0,"screwPolishedRod":false,"screwNeckDiameter":0,"screwNeckLength":0,"screwResistantFall":false},"Spring":{"Spring":true,"springLabel":"Spring","springAmount":0,"springWireDiameter":0,"springCoilCenterDiameter":0,"springFreeLong":0},"ORing":{"ORing":true,"oRLabel":"O-Ring","oRAmount":0,"oROuterDiameter":0,"oRInnerDiameter":0,"oRThickness":0},"Clip":{"Clip":true,"clipLabel":"Clip","clipAmount":0,"clipMaterial":null,"clipMaterialCostPerKilogram":0,"clipWireDiameter":0,"clipProductionLength":0,"clipProductionWidth":0},"PushPin":{"PushPin":true,"pupiLabel":"Push Pin","pupiAmount":0,"pupiLength":0,"pupiHeadDiameter":0},"Label":{"Label":true,"labelLabel":"Label","labelAmount":0,"labelLength":0,"labelWidth":0,"labelThickness":0},"Sponge":{"Sponge":true,"spongeLabel":"Sponge","spongeAmount":0,"spongeMaterial":null,"spongeLength":0,"spongeWidth":0,"spongeMaterialThickness":null,"spongeMaterialCostPerMM":0},"Grease":{"Grease":true,"greaseLabel":"Grease","greaseAmount":0,"greaseMaterial":null,"greaseMaterialCost":0,"greaseLength":0,"greaseWidth":0,"greaseThickness":0},"ThermalPad":{"ThermalPad":true,"thermalPadLabel":"Thermal Plad","thermalPadAmount":0,"thermalPadHeatTransferCoefficient":null,"thermalPadShore":0,"thermalPadThickness":0,"thermalPadLength":0,"thermalPadWidth":0,"thermalPadPrice":0},"ThermalPadMultiImage":{}}
            },
        "Images":[]
    }
}
```