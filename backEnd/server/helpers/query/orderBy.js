
const orderByString = (orderBy) =>{
  let str = orderBy.split(',')
  let queryStr  = ''
  for(let i = 0 ;i < str.length; i++){
    let sort
    str[i].includes('-') ? sort = ' DESC,' : sort = ' ASC,'
    str[i] = str[i].replace('-', '')
    queryStr = queryStr.concat(str[i], sort)
  }
  queryStr = queryStr.substring(0, queryStr.length - 1)
  return queryStr
}

const squelOrderBy = (orderBy) =>{
  let order = orderBy.includes('-') ? false : true
  return order
}

module.exports = {
  orderByString,
  squelOrderBy,
}
