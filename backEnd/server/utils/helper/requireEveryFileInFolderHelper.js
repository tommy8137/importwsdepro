const fs = require('fs')
const path = require('path')

function readAllFile(result, params){
  let { rootPath = __dirname, folderPath = '', targetFileType = 'js', goDeep = false } = params
  const targetFileTypeReg = new RegExp(`${targetFileType}$`)
  const readPath = path.join(rootPath, folderPath)
  
  const folderList = fs.readdirSync(readPath)
  for(let folderName of folderList){
    const stat = fs.statSync(path.join(readPath, folderName))
    if(stat.isDirectory() && goDeep){
      const nextFolderPath = path.join(folderPath, folderName)
      readAllFile(result, { rootPath, nextFolderPath, targetFileType, goDeep })
    }else if(folderName === 'index.js'){
      continue
    }
    let fileNameArr = folderName.split('.')
    if(targetFileTypeReg.test(fileNameArr[fileNameArr.length - 1])){
      let targetConfigFloor = result
      const nowFloor = folderPath.split('/')
      for(let floor of nowFloor){
        if(floor === ''){
          break
        }
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

module.exports = function(rootPath, folderPath, targetFileType, goDeep){
  let exportObject = {}
  readAllFile(exportObject, { rootPath, folderPath, targetFileType, goDeep })
  
  return exportObject
}