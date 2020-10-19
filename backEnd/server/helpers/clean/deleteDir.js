const fs = require('fs')

function delDir(path){
  let files = []
  if(fs.existsSync(path)){
    files = fs.readdirSync(path)
    files.forEach((file, index) => {
      let curPath = path + '/' + file
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath) // 遞迴刪除資料夾
      } else {
        fs.unlinkSync(curPath) // 刪除檔案
      }
    })
    fs.rmdirSync(path)
  }
}

module.exports = delDir
