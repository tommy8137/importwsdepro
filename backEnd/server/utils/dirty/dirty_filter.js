const _ = require('lodash')
const t12 = [
  { type1: 'Cable', type2: 'FFC' },
  { type1: 'Cable', type2: 'FPC' },
  { type1: 'Cable', type2: 'Wire/Harness' },
  { type1: 'Cable', type2: 'DC-IN Cable' },
  { type1: 'Cable', type2: 'Panel Cable' },
  { type1: 'Cable', type2: 'External Cable' },
  { type1: 'Cable', type2: 'SATA' },
  { type1: 'Cable', type2: 'SAS/Mini SAS' },
  { type1: 'Cable', type2: 'Lan cable' },
  { type1: 'Cable', type2: 'Handset cord' },
  { type1: 'Cable', type2: 'FPC-CBG' },
  { type1: 'Housing', type2: 'Plastic' },
  { type1: 'Housing', type2: 'Painting' },
  { type1: 'Housing', type2: 'Metal' },
  { type1: 'Housing', type2: 'Metal+Plastic' },
  { type1: 'Housing', type2: 'Aluminum' },
  { type1: 'Housing', type2: 'Die Casting' },
  { type1: 'Housing', type2: 'Double Injection' },
  { type1: 'Housing', type2: 'RHCM Process' },
  { type1: 'Housing', type2: 'Hinge' },
  { type1: 'Housing', type2: 'IMR' },
  { type1: 'Housing', type2: 'Insert-Molding' },
  { type1: 'Housing', type2: 'Glass' },
  { type1: 'Housing', type2: 'cover lens' },
  { type1: 'Electro-Mechanical', type2: 'Speaker' },
  { type1: 'Electro-Mechanical', type2: 'Docking' },
  { type1: 'Thermal', type2: 'Fan' },
  { type1: 'Thermal', type2: 'Module' },
  { type1: 'Thermal', type2: 'Heatsink' },
  { type1: 'Thermal', type2: 'Cooler' },
  { type1: 'Film', type2: 'ACID-FAST Film' },
  { type1: 'Film', type2: 'ASF' },
  { type1: 'Film', type2: 'Complex' },
  { type1: 'Film', type2: 'DBEF' },
  { type1: 'Film', type2: 'Diffuser DLED' },
  { type1: 'Film', type2: 'Diffuser ELED' },
  { type1: 'Film', type2: 'Diffuser plate' },
  { type1: 'Film', type2: 'FPC' },
  { type1: 'Film', type2: 'LGP' },
  { type1: 'Film', type2: 'Polarizer' },
  { type1: 'Film', type2: 'Prism DLED' },
  { type1: 'Film', type2: 'Prism ELED' },
  { type1: 'Film', type2: 'Protect Film' },
  { type1: 'Film', type2: 'Reflector DLED' },
  { type1: 'Film', type2: 'Reflector ELED' },
]

/**
 *
 * @param {string} type1 type1 name
 * @param {string} type2 type2 name
 * @returns {boolean} true:如果在清單裡; false:不在清單裡;
 */
const type12InFilter = (type1, type2) => {
  let res = _.find(t12, function (o) { return o.type1.toLowerCase() == type1.toLowerCase() && o.type2.toLowerCase() == type2.toLowerCase() })
  return typeof (res) != 'undefined'
}
/**
 *
 * @param {string} type1 type1 name
 * @returns {boolean} true:如果在清單裡; false:不在清單裡;
 */
const type1InFilter = (type1) => {
  let res = _.find(t12, function (o) { return o.type1.toLowerCase() == type1.toLowerCase() })
  return typeof (res) != 'undefined'
}
module.exports = {
  type12InFilter,
  type1InFilter
}
