const { expect } = require('chai')
const sinon = require('sinon')
const {PartListYml2JsonComposer} = require('../../../../server/service/bom/plYamlParser')
const ut = require('util')
const path = require('path')
/*
describe('bom', () => {
  describe('plYamlParser.js', () => {
    it('plyComposer.applyReplacement', async () => {
      let ymlPath = path.join('housing-metal', 'housing-metal.yaml')
      let composer = new PartListYml2JsonComposer()
      let result = await composer.getJsonByYamlPath(ymlPath)
//      console.log(ut.inspect(result, null, 10))
      console.log(JSON.stringify(result))
    })
  })
})
*/