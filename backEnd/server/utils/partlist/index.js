const fp = require('lodash/fp')
const traverse = require('traverse')

/**
 * 找出value在 layout 的路徑
 * @param {*} layout partlist layout
 * @param {*} paths 目前找到的路徑(遞迴使用)
 */
function _getValuePath(layout, paths = []) {
  const parentKeys = paths.reduce((acc, path, index, arrays) => {
    const keys = arrays.slice(0, arrays.length - index)
    const item = fp.get(keys)(layout)
    if (!item || !item.key) return acc
    // 判斷是否為 multiple 的 key, 是就不能放0, 不是的話先放0在放 key
    if (item.multiple && item.minGroupCount > 0 && index !== 0) return acc.concat(0, item.key)
    return acc.concat(item.key)
  }, [])
  return parentKeys.reverse()
}

function getPcbInitFormData(layout, spec){
  return traverse(layout).reduce(function r(acc, item) {
    if (this.isLeaf || !item.key) {
      return acc
    }
    const paths = _getValuePath(layout, this.path)
    const valueInSpec = spec[item.key]
    return fp.set(paths, valueInSpec || item.default)(acc)
  }, {})
}

module.exports = {
  getPcbInitFormData,
}