const plRubberModel = require('../../../../../model/cleansheetDatabase/meOthers_rubber/plRubber')
const { ValueGetterWithMap } = require('../../../plCommon')
const { rubberMachineRate } = require('../mapping/index')

class MachineGetter extends ValueGetterWithMap {
  constructor(keyMap) {
    super(keyMap)
  }
  transferKey(keyFromTo, data) {
    const formatDataList = {}
    data.forEach((content)=>{
      if(!Object.prototype.hasOwnProperty.call(formatDataList, content.ton)){
        formatDataList[content.ton] = {
          ton: content.ton,
        }
      }
      formatDataList[content.ton][content.param_name] = content.value
    })
    return super.transferKey(keyFromTo, Object.values(formatDataList))
  }
}

module.exports = {
  getRubberMachineRate: async (paras) => {
    let getter = new MachineGetter(rubberMachineRate)
    getter.setValFunc = plRubberModel.getRubberMachineRate
    await getter.setValue(paras)
    return getter.get()
  },
}

