
const TestBom = require('./mod/testBomManager.js')
const { pgConfig } = require('../../../../config.js')
let testBom = new TestBom()
console.log(`pgConfig :`, pgConfig);

async function createTestFile(configFileParams){
  await testBom.setup(configFileParams)
  process.exit(0)
}
async function removeAllTestFile(){
  await testBom.removeAllTestFile()
  process.exit(0)
}


module.exports = (() =>{
  const actionParams = (process.argv[2]) ? process.argv[2].toLowerCase() : null
  let configFileParams = (process.argv[3]) ? process.argv[3].trim() : null
  console.log('actionParams :', actionParams)
  switch (actionParams) {
    case 'c': // create
      console.log(`create test file...`)
      createTestFile(configFileParams)
      break
    case 'rm': // create
      removeAllTestFile()
      break
    default:
      console.log('no action parameters.')
      console.log('------ action parameters List------')
      console.log('c  : create testfile')
      console.log('c <config_name> : create test file by specific config name')
      console.log('rm : remove testfile')
      console.log('------ action parameters List------')
      process.exit()
  }
})()