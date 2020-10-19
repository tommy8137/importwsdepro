const path = require('path')
const FileGenerator = require('./abstract/fileGenerator.js')
const FOLDER_PATH = path.join(__dirname, '../../../testBom/')
class TestfileGenerator extends FileGenerator{
  constructor(filename){
    super(`${filename}.test.js`, FOLDER_PATH)
  }
  _initFile(){
    this.addStatement(`const { assert } = require('chai')`)
  }
  addDescribeUpper(message){
    this.addStatement(`describe('${message}', ()=>{`)
    this.nowSpaces += this.defaultSpaceCount
  }
  addItUpper(message){
    this.addStatement(`it('${message}', ()=>{`)
    this.nowSpaces += this.defaultSpaceCount
  }
  addContextEnd(){
    this.nowSpaces -= this.defaultSpaceCount
    this.addStatement('})')
  }
  addStatement(statement){
    const indent = this._generateSpaces()
    this.fileContent.push(`${indent}${statement}`)
  }
  addAssertEqual(actual, expected, message){
    this.addStatement(`assert.equal(${actual}, ${expected}, '${message}')`)
  }
  async save(){
    this.fileContent = this.fileContent.join('\n')
    await this._saveFile()
  }
}
module.exports = TestfileGenerator