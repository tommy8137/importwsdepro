const fixMath = require('../../helpers/math/math.js')
const _ = require('lodash')

class cleanSheetBase{
  constructor(prob){
    this.requestObj = prob
    this.lossRate = 0.1
  }

  getlossRate(){
    return this.lossRate
  }

  setlossRate(value){
    this.lossRate = value
  }

  checkParamter(){
  }

  getVolumn(){
    return this.width * this.height * this.length
  }

  getArea(){
    return this.width * this.height
  }

  cancluteMaterialCost(){
    // each module implement
  }

  cancluteFormingCost(){
    // each module implement
  }

  cancluteSecondaryProcessingCost(){
    // each module implement
  }

  cancluteTotalCost(){
    // each module implement
  }

  /*
   * canclute summarize source = [123.00, 11.00, 12.00]
  */
  cancluteSummarizeCost(source){
    let result = 0
    _.forEach(source, (v, idx) =>{
      result += fixMath.fixedPoint(v, 5)
    })
    return result
  }

  cancluteExchangeRate(source, rate){
    return fixMath.fixedPoint(source * rate, 5)
  }
}

module.exports = cleanSheetBase