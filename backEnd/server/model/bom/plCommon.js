let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const moment = require('moment')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('model.bom.plCommon')
const {exampleData} = require('./example')
module.exports = {

  getExampleValue: async ({date, paras}) => {
    
    let mockValue = [ { subType2: 'Mylar',
                         subMaterialspec: 'T0.05Mylar',
                         subMaterial: '透明',
                         subMaterialPerCost: 0.638235294 },
                       { subType2: 'Mylar',
                         subMaterialspec: 'T0.05Mylar',
                         subMaterial: 'CY28_PET',
                         subMaterialPerCost: 0.511764706 },
                       { subType2: 'Mylar',
                         subMaterialspec: 'T0.05Mylar',
                         subMaterial: '黑色',
                         subMaterialPerCost: 0.794117647 } ]
    
    return exampleData
  },

}
