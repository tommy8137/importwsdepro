const fileProcess = require('../fileProcess')
const SPACE = ' '

class FileGenerator {
  constructor(filename, filepath){
    if(new.target === FileGenerator){
      throw TypeError('abstract class must be inherited')
    }
    this.filename = filename
    this.filepath = filepath
    this.fileContent = []
    this.defaultSpaceCount = 2
    this.nowSpaces = 0
    this._initFile()
  }
  _generateSpaces(){
    let indent = ''
    for(let i = 0; i < this.nowSpaces; i++){
      indent += SPACE
    }
    return indent
  }
  _initFile(){
    throw TypeError('abstract function must be dispatching')
  }
  async _saveFile(){
    await fileProcess.wirteTestFile(this.filename.replace(/\//, '-'), this.fileContent)
    this._clearFile()
  }
  _clearFile(){
    this.fileContent = []
    this.filename = ''
    this.nowSpaces = 0
  }
  save(){
    throw TypeError('abstract function must be dispatching')
  }
}
module.exports = FileGenerator