const { expect } = require('chai')
const sinon = require('sinon')
const parameterStringReplace = require('../../../../../server/utils/database/parameterStringReplace')
const stringData = 'test label with fake Data1: {{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}}, Data2:{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}}'


describe('parameterStringReplace', () => {
  it('test checkReplacement', async () => {
    let mockData = [
      { 'stringToReplace': '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}}',
        'valuePath': [
          'cable_ffc',
          'cable_ffc_secondary_processing',
          'pitch_specification_1',
        ],
      },
      { 'stringToReplace': '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}}',
        'valuePath': [
          'cable_ffc',
          'cable_ffc_secondary_processing',
          'pitch_specification_2',
        ],
      },
    ]
    let result = parameterStringReplace.checkStringReplacement(stringData)
    
    expect(JSON.stringify(result)).to.equal(JSON.stringify(mockData))
  })

  it ('test find replacement value', async () => {
    let replaceConfig = parameterStringReplace.checkStringReplacement(stringData)
    let result = await parameterStringReplace.getReplaceValue(replaceConfig, 2)
    
    expect(result[0]).to.haveOwnProperty('value')
    expect(result[1]).to.haveOwnProperty('value')
  })

  it('test find replacement value', async () => {
    let mockData = [
      { 'stringToReplace': '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_1}}',
        'valuePath': [
          'cable_ffc',
          'cable_ffc_secondary_processing',
          'pitch_specification_1',
        ],
        'value': '0.5'
      },
      { 'stringToReplace': '{{cable_ffc,cable_ffc_secondary_processing,pitch_specification_2}}',
        'valuePath': [
          'cable_ffc',
          'cable_ffc_secondary_processing',
          'pitch_specification_2',
        ],
        'value': '1.0'
      },
    ]
    let result = parameterStringReplace.applyReplacement(stringData, mockData)
    
    expect(result).to.equal('test label with fake Data1: 0.5, Data2:1.0')
  })
})