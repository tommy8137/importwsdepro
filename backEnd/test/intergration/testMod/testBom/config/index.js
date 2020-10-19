const fs = require('fs')
const path = require('path')
const jsonReg = /json/
const config = {}


function readConfigFile(rootPath = __dirname, folderPath = ''){
  const readPath = path.join(rootPath, folderPath)
  const folderList = fs.readdirSync(readPath)
  for(let folderName of folderList){
    const stat = fs.statSync(path.join(readPath, folderName))
    if(stat.isDirectory()){
      const nextFolderPath = path.join(folderPath, folderName)
      readConfigFile(rootPath, nextFolderPath)
    }
    let fileNameArr = folderName.split('.')
    if(jsonReg.test(fileNameArr.pop())){
      let targetConfigFloor = config
      const nowFloor = folderPath.split('/')
      for(let floor of nowFloor){
        if(!targetConfigFloor.hasOwnProperty(floor)){
          targetConfigFloor[floor] = {}
        }
        targetConfigFloor = targetConfigFloor[floor]
      }
      const fileNameNoExt = fileNameArr[0]
      targetConfigFloor[fileNameNoExt] = require(path.join(rootPath, folderPath, fileNameNoExt))
    }
  }
}
readConfigFile()
module.exports = config