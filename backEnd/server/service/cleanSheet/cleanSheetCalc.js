const costgenService = require('./costgen.js')
const { Magnet } = require('./cleanSheet-Magnet.js')

class CleanSheet {
  static async cleanSheetCalc(){
    // const result  = await cleanSheetModel.getProjects()
    let magnet = new Magnet(20, 12, 2)
    magnet.material = 'Nd-Fe-B N48'
    
    let rs = await costgenService.getDatabase()
    console.log(rs.Pipe.outerDiameterLengthTable.header)
    console.log(rs.Pipe.outerDiameterLengthTable.data)
    console.log(magnet.costProcessing)
    console.log('costProcA', magnet.costProcA)
    console.log('costProcB', magnet.costProcB)
    console.log('costProcC', magnet.costProcC)
    console.log('costProcD', magnet.costProcD)
    // console.log(magnet.sizeL)
    // console.log(magnet.sizeW)
    // console.log(magnet.sizeH)
    // console.log(magnet.volume)
    // console.log(magnet.finishWeight)
    // console.log(magnet)
    const result = ''
    return result
  }
}
module.exports = CleanSheet
