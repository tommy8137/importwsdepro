
const fs = require('fs')
const path = require('path')
const FOLDER_PATH = path.join(__dirname, '../../../testBom/')
const util = require('util')
const writefile = util.promisify(fs.writeFile)
const removefile = util.promisify(fs.unlink)
const readdir = util.promisify(fs.readdir)
class FileProcess {
  static async removeAllTestFile(){
    const fileList = await readdir(FOLDER_PATH)
    for(const filename of fileList){
      await removefile(path.join(FOLDER_PATH, filename))
    }
  }
  static async wirteTestFile(filename, data){
    await writefile(path.join(FOLDER_PATH, filename), data)
  }
  static async removeFile(filename){
    await removefile(path.join(FOLDER_PATH, filename))
  }
}
module.exports = FileProcess