
class EmdmComparsionTableTemplate {
  /**
   *
   * @param {Number} productTypeId
   */
  static getEmdmComparsionTableTemplate(productTypeId){
    const comparsionTabletemplate = this._getCommonComparsionTableTemplate()
    this.addTemplateInfoByProductTypeId(productTypeId, comparsionTabletemplate)
    return comparsionTabletemplate
  }
  static _getCommonComparsionTableTemplate(){
    return {
      plasticCost: {
        material_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.material_cost.value', // 塑膠成型單/雙射 / (材料費)
        hpPrice: 'partlistprice.forDebug.debugInfo.housingPlastic.hpPrice.value', // * Material / (原材單價 => 一射單價)
        hpPrice2: 'partlistprice.forDebug.debugInfo.housingPlastic.hpPrice2.value', // * Material / (原材單價 => 二射單價)
        forming_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.forming_cost.value', // 機台噸數 (成型費)
        cmfPEmbedNail_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPEmbedNail_cost.value', // 人工 Insert Nut 數量 / 自動 Insert Nut 數量
        cmfPCNCProcessingArea_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPCNCProcessingArea_cost.value', // 局部加工 (加工面積(mm²))
        cmfPCNCFeeder_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPCNCFeeder_cost.value', // 除料頭 (加工面積(mm²))
        cmfPProductPolishingPL_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPProductPolishingPL_cost.value', // 成品打磨 PL線
        cmfPPolishStressMark_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPPolishStressMark_cost.value', // Polish 應力痕
        cmfPHotMelt_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPHotMelt_cost.value', // 熱熔 (數量)
        cmfPBonding_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPBonding_cost.value', // Bonding (處)
        cmfPChipRemoval_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPChipRemoval_cost.value', // 除屑 (IMR)
        cmfPRollingOrDeburring_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPRollingOrDeburring_cost.value', // 滾邊or去毛邊 (PL面)
        cmfPLaserMarking_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPLaserMarking_cost.value', // icon雷雕 (處)
        cmfPEMISputtering_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPEMISputtering_cost.value', // EMI Sputtering(吋別)
        profit: 'partlistprice.forDebug.debugInfo.housingPlastic.profit.value', // 管銷&利潤
      },
      paintingCost: {
        painting_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.painting_cost.value', // Process Type-噴塗製程 & NCVM -> 噴塗製程
        cmfPNCVM_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPNCVM_cost.value', // Process Type-噴塗製程 & NCVM -> NCVM
        cmfPrinting_cost: 'partlistprice.forDebug.debugInfo.housingPlastic.cmfPrinting_cost.value', // Printing製程 類型 (Type) (移印/網印)
      },
      metalCost: {
        materialCost: 'partlistprice.forDebug.debugInfo.housingMetal.material_cost.value', // 內構鐵件成型 材料費
        hmmaterialprice: 'partlistprice.forDebug.debugInfo.housingMetal.hmmaterialprice.value', // *Materia Spec / (原材單價)
        hmStampingList:'partlistprice.forDebug.debugInfo.housingMetal.hmStampingList.value',
        // hmToolingStageDieCost: 'partlistprice.forDebug.debugInfo.housingMetal.hmToolingStageDieCost.value', // 沖壓機台(T) -> 工程模
        // hmToolingProgressiveDieCost: 'partlistprice.forDebug.debugInfo.housingMetal.hmToolingProgressiveDieCost.value', // 沖壓機台(T) -> 連續模
        // hmToolingRivetingDieCost: 'partlistprice.forDebug.debugInfo.housingMetal.hmToolingRivetingDieCost.value', // 沖壓機台(T) -> 鉚合模
        stamping_cost: 'partlistprice.forDebug.debugInfo.housingMetal.stamping_cost.value', // 沖壓工程數 / (成型費)
        standoff: '', // Stand off 數量
        profit: 'partlistprice.forDebug.debugInfo.housingMetal.profit.value', // 管銷&利潤
      },
      metalPaintingCost:{ // Metal DT AIO噴漆專用，這裡宣告空的是因為外面template要用，不能沒有此屬性
        'painting_cost': '',
        'cmfPNCVM_cost':'',
      },
      aluminumCost: {
        materialCost: 'partlistprice.forDebug.debugInfo.housingMetal.material_cost.value', // 材料費
        hmmaterialprice: 'partlistprice.forDebug.debugInfo.housingMetal.hmmaterialprice.value', // Material / (原材單價)
        stamping_cost: 'partlistprice.forDebug.debugInfo.housingMetal.stamping_cost.value', // 機台費
        hmStampingList:'partlistprice.forDebug.debugInfo.housingMetal.hmStampingList.value',
        // hmToolingProgressiveDieCost: 'partlistprice.forDebug.debugInfo.housingMetal.hmToolingProgressiveDieCost.value', // 連續模 沖壓機台(T) 2020/06/04移除
        // hmToolingStageDieCost: 'partlistprice.forDebug.debugInfo.housingMetal.hmToolingStageDieCost.value', // 工程模 沖壓機台(T) 2020/06/04移除
        // hmToolingRivetingDieCost: 'partlistprice.forDebug.debugInfo.housingMetal.hmToolingRivetingDieCost.value', // 鉚合模 沖壓機台(T) 2020/06/04移除
        secondary_processing_cost: 'partlistprice.forDebug.debugInfo.housingMetal.secondary_processing_cost.value', // 二次加工費
        cmfProcessListFirstAnode: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListFirstAnode.value', // 陽極 一陽 (Color)
        cmfProcessListSecondAnode: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSecondAnode.value', // 陽極 二陽/預陽 (Color)
        cmfProcessListSandBlast: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSandBlast.value', // 噴砂 單雙面
        cmfProcessListHairLine: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListHairLine.value', // 髮絲 加工面積(mm²)
        cmfProcessListThermalBonding: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListThermalBonding.value', // Thermal Bonding(熱壓) 膠水型號
        cmfProcessListSingleTapping: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSingleTapping.value', // 單點攻牙
        cmfProcessListSingleSpotWelding: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSingleSpotWelding.value', // 單點點焊
        cmfProcessListSingleRivet: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSingleRivet.value', // 單點鉚釘
        cmfProcessListRivet: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListRivet.value', // 拉鉚釘
        cmfProcessListScreenPrinting: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListScreenPrinting.value', // Printing 網印(次)
        cmfProcessListPadPrinting: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListPadPrinting.value', // Printing 移印 (次)
        cmfProcessListSilkPrint: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListSilkPrint.value', // Printing Silk Print (次)
        cmfProcessListCNC: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListCNC.value', // CNC(公模面)	加工面積(mm²)
        cmfProcessListLaserPrint: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListLaserPrint.value', // 鐳雕(公模面)	加工面積(mm²)
        cmfProcessListPolishing: 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListPolishing.value', // 打磨(NB時代表自動+人工打磨，其他Product type則是純打磨費)
        profit: 'partlistprice.forDebug.debugInfo.housingMetal.profit.value', // 管銷&利潤
      },
      metalParameters: {
        glueWeight: 'partlistprice.forDebug.debugInfo.housingMetal.glueWeight.value', // 膠水重量
      },
      thermalFanCost:{
        processing_cost: 'partlistprice.forDebug.debugInfo.thermalFan.processing_cost.value',
        Fan: 'partlistprice.forDebug.summary',
      },
      thermalModuleCost:{
        processing_cost: 'partlistprice.forDebug.debugInfo.thermalModule.processing_cost.value',
        Pipe: 'partlistprice.forDebug.summary',
        Fin:'partlistprice.forDebug.summary',
        Fan:'partlistprice.forDebug.summary',
        ThermalPlate:'partlistprice.forDebug.summary',
        ThermalBlock:'partlistprice.forDebug.summary',
        Screw:'partlistprice.forDebug.summary',
        Spring:'partlistprice.forDebug.summary',
        ORing:'partlistprice.forDebug.summary',
        Label:'partlistprice.forDebug.summary',
        Sponge:'partlistprice.forDebug.summary',
        Mylar:'partlistprice.forDebug.summary',
        Grease:'partlistprice.forDebug.summary'
      },
      thermalGraphiteSheetCost:{
        totalCost: 'partlistprice.forDebug.summary.thermalgraphite.total',
      },
      thermalPadCost:{
        processing_cost:'partlistprice.forDebug.debugInfo.ThermalPad.processing_cost.value',
        Pad: 'partlistprice.forDebug.summary',
      },
      dieCutCost:{
        totalCost: 'partlistprice.forDebug.summary.dieCut.total',
      },
    }
  }
  static addTemplateInfoByProductTypeId(productTypeId, comparsionTabletemplate){
    switch (parseInt(productTypeId, 10)) {
      case 1: // NB
        this._addNBTemplateInfo(comparsionTabletemplate)
        break
      case 2: // DT
      case 3: // AIO
        this._addDTTemplateInfo(comparsionTabletemplate)
        break
      default:
        break
    }
  }
  /**
   * 在template物件上追加Prodyctype為NB時所需要的資訊
   * @param {Object} comparsionTabletemplate
   */
  static _addNBTemplateInfo(comparsionTabletemplate){
    comparsionTabletemplate.aluminumCost.cmfProcessListDrillCutPowerButtonCost = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutPowerButtonCost.value' // 鑽切(高光)Power button鑽切
    comparsionTabletemplate.aluminumCost.cmfProcessListDrillCutTPCost = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutTPCost.value' // 鑽切(高光)TP鑽切
    comparsionTabletemplate.aluminumCost.cmfProcessListDrillCutFingerprintHoleCost = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutFingerprintHoleCost.value' // 鑽切(高光)指紋孔鑽切
    comparsionTabletemplate.aluminumCost.cmfProcessListDrillCutPowerHoleCost = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutPowerHoleCost.value' // 鑽切(高光)電源孔鑽切
    comparsionTabletemplate.aluminumCost.cmfProcessListDrillCutFourSidesCost = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCutFourSidesCost.value' // 鑽切(高光)全週4週邊鑽切
    comparsionTabletemplate.aluminumCost.cmfProcessListUltrasonicClean = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListUltrasonicClean.value' // 超音波清洗 (Exist or not (0 or 1))
    comparsionTabletemplate.aluminumCost.cmfProcessListMultiTapping = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListMultiTapping.value' // 多點攻牙
    comparsionTabletemplate.aluminumCost.cmfProcessListMultiSpotWelding = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListMultiSpotWelding.value' // 多點點焊
    comparsionTabletemplate.aluminumCost.cmfProcessListHandMakeDraw = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListHandMakeDraw.value' // 手工塗黑 加工面積(mm²)
    comparsionTabletemplate.aluminumCost.cmfProcessListCNCPL = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListCNCPL.value' // CNC(PL處)	加工長度(mm)
    comparsionTabletemplate.aluminumCost.cmfProcessListPolishingAuto = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListPolishingAuto.value' // 打磨 自動打磨
    comparsionTabletemplate.aluminumCost.cmfProcessListPolishingArtificial = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListPolishingArtificial.value' // 打磨 人工打磨
    comparsionTabletemplate.aluminumCost.cmfProcessListMultiRivet = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListMultiRivet.value' // 多點鉚釘
    comparsionTabletemplate.aluminumCost.cmfProcessListLaserPrintIcon = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListLaserPrintIcon.value' // 鐳雕(icon)
    comparsionTabletemplate.aluminumCost.cmfProcessListDrilling = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrilling.value' // 鑽孔
    comparsionTabletemplate.aluminumCost.cmfProcessListAnodizingRemoval = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListAnodizingRemoval.value' // 陽極掛點切除
  }
  /**
   * 在template物件上追加Prodyctype為DT所需要的資訊
   * @param {Object} comparsionTabletemplate
   */
  static _addDTTemplateInfo(comparsionTabletemplate){
    // comparsionTabletemplate.aluminumCost.hmToolingConvexHullCost = 'partlistprice.forDebug.debugInfo.housingMetal.hmToolingConvexHullCost.value' // 工程模(凸包) 2020/06/04移除
    // comparsionTabletemplate.aluminumCost.cmfProcessListMultiRivet = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListMultiRivet.value' // 多點鉚釘 2020/06/04移除
    // comparsionTabletemplate.aluminumCost.cmfProcessListDrillCut = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListDrillCut.value' // 鑽切(高光) 2020/06/04移除
    comparsionTabletemplate.aluminumCost.cmfProcessListLaserWelding = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListLaserWelding.value' // 雷焊費用
    comparsionTabletemplate.aluminumCost.cmfProcessListNormalClean = 'partlistprice.forDebug.debugInfo.housingMetal.cmfProcessListNormalClean.value' // 一般清洗
    comparsionTabletemplate.metalPaintingCost.painting_cost = 'partlistprice.forDebug.debugInfo.housingMetal.painting_cost.value' // Process Type-噴塗製程 & NCVM -> 噴塗製程
    comparsionTabletemplate.metalPaintingCost.cmfPNCVM_cost = 'partlistprice.forDebug.debugInfo.housingMetal.cmfPNCVM_cost.value' // Process Type-噴塗製程 & NCVM -> NCVM
  }
}
module.exports = EmdmComparsionTableTemplate