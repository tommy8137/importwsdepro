const path = require('path')
const FileGenerator = require('./abstract/fileGenerator.js')
const FOLDER_PATH = path.join(__dirname, '../comparsionData/')
class ReportGenerator extends FileGenerator{
  constructor(filename){
    super(`${filename}.json`, FOLDER_PATH)
  }
  _initFile(){
  }
  addContent(message){
    this.fileContent.push(message)
  }
  async save(){
    this.fileContent = this.fileContent.map((str)=> JSON.stringify(str, null, 1)).join('\n')
    await this._saveFile()
  }
}
module.exports = ReportGenerator