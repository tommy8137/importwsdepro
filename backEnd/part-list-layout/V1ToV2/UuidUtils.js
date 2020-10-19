// 把uuid給去掉，拿到原本定義的key
function splitUuid(text) {
  let result = text.split(/-[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i);
  if (Array.isArray(result)) {
    return result[0];
  }
  return null;
}

// 找出原本有沒有uuid
function findUuid(text) {
  const v4 = new RegExp(/.*-([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})_?.*/i);
  let result = text.match(v4);
  if (Array.isArray(result) && result.length > 0) {
    return result[1];
  }
  return null;
}


module.exports = {
  splitUuid,
  findUuid,
}
