const fs = require('fs');
const path = require('path');

const nowPath = path.resolve('./');
const regexp = /.svg$/;
const filenameReg = /(.*).svg$/;

const svgFiles = fs.readdirSync(nowPath)
  .filter(fileName => regexp.test(fileName))
  .map(fileName => ({
    name: fileName
      .match(filenameReg)[1]
      .replace(/_(\w)/g, (searchStr, replaceStr) => replaceStr.toUpperCase())
      .replace(/-(\w)/g, (searchStr, replaceStr) => replaceStr)
      .replace(/@(\w)/g, (searchStr, replaceStr) => replaceStr),
    path: fileName,
  }));

function write(err) {
  if (err) console.log(err);
  else console.log('Write operation complete.');
}

const importStatement = svgFiles.map(fileName => `  ${fileName.name.charAt(0).toUpperCase() + fileName.name.slice(1)}: '${fileName.name}'`).join(',\n');

fs.writeFile(
  'index.js',
  `export default {\n${importStatement},\n};\n`,
  write
);
