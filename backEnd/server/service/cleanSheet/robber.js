const Base = require('./cleanSheetBase')

class robber extends Base{
  constructor(prob){
    super(prob)
    this.requestObj = prob
  }

  getMaterialBaseData(){

  }

  getForminigBaseData(){

  }

  getecondaryProcessingBaseData(){

  }

  cancluteMaterialCost(){
    // 材料費 = 材料單價 * 材料厚度 * (1 + loss 率)
    return this.requestObj.price * this.requestObj.thickness * (1 + super.getlossRate())
  }

  cancluteFormingCost(){
    //成型費 = 單價 * 秒數 / 最大穴數 * ( 1 + Loss 率) 
    return this.requestObj.price * this.requestObj.second / this.cancluteMaxCavity() * (1 + super.getlossRate())
  }

  cancluteSecondaryProcessingCost(){
    return 2
  }

  cancluteTotalCost(){
    //Total = 材料費 +  成型費 + 二次加工費 + 運包檢 + 管銷&利潤 (10%)
  }

  cancluteMaterialWeight(){
    // 成品重量 = (成品尺寸L * 成品尺寸W * 成品厚度) * 密度/1000000
    return (this.requestObj.length * this.requestObj.width * this.requestObj.thickness) * (this.requestObj.density * 0.000001)
  }

  cancluteMaxCavity(){
    // 最大穴數 = 機台面積/((成品尺寸(L)+邊料*2)*(成品尺寸(W)+邊料*2))
    return this.requestObj.area / ((this.requestObj.length + this.requestObj.sideLayer * 2) * (this.requestObj.width + this.requestObj.sideLayer * 2))
  }
}

module.exports = robber