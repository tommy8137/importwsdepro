import _ from 'lodash';
import _has from 'lodash/has';
import _get from 'lodash/get';
import traverse from 'traverse';


/**
 * 檢查整個list裡面到底選了幾個跟總共幾個
 * @param {*} list 傳進來整個list
 * @param {*} selectedKey 需要用哪個key來判斷
 */
export function getNodeSelectedCount(list, selectedKey = 'isSelected') {
  const result = traverse(list).reduce(function fnc(prev, curr) {
    if (_has(curr, selectedKey)) {
      return {
        total: prev.total + 1,
        selected: _get(curr, selectedKey, false) ? prev.selected + 1 : prev.selected
      };
    }
    return prev;
  }, { total: 0, selected: 0 });
  return result;
}

/**
 * 取得目前
 * @param {*} node 取得目前節點的checked狀態, 會檢查所有小孩
 */
export function getCheckboxStatus(list) {
  const { total = 0, selected = 0 } = getNodeSelectedCount(list);
  const checked = selected > 0;
  const indeterminate = selected > 0 && selected < total;
  return {
    checked,
    indeterminate
  };
}

// 把節點包含小孩的selected都改掉
export function setNodesAllChild(list, checked, selectedKey = 'isSelected') {
  const result = traverse(list).map(function fnc(curr) {
    if (_has(curr, selectedKey)) {
      return {
        ...curr,
        [selectedKey]: checked
      };
    }
    return curr;
  });
  return result;
}
/**
 * 找到某個節點並把它所有的小孩的isSelected改成特定的值
 * @param {*} list 整個list
 * @param {*} node 要全部改值的node
 * @param {*} checked 他的isSelected要改成什麼
 * @returns [Array] 回傳整個list
 */

export function setNodeItem(list, item, checked) {
  let path = [];
  const result = traverse(list).map(function fnc(curr) {
    const isSameId = _has(curr, 'id') && _get(curr, 'id') === _get(item, 'id');
    // 判斷是不是葉子
    const isLeaf = path.length && this.path.length && this.path.length > path.length && path.every((p, i) => p === _get(this.path, i));
    if (isSameId) {
      path = [...this.path];
    }
    if ((isSameId || isLeaf) && _has(curr, 'isSelected')) {
      return {
        ...curr,
        isSelected: checked
      };
    }
    return curr;
  });
  return result;
}

/**
 * 比較兩個字串轉成大寫之後是否有includes
 * @param {} str1 字串1
 * @param {*} str2 字串2
 */
export function compareString(str1 = '', str2 = '') {
  return str1.toUpperCase().includes(str2.toUpperCase());
}

/**
 * 檢查list裡面是否有包含關鍵字
 * @param {} list
 * @param {*} keyword
 */
export function isChildHasKeyword(list, keyword) {
  return list.some(node =>
    (compareString(node.name, keyword) || (node.items ? isChildHasKeyword(node.items, keyword) : false))
  );
}

/**
 * filter出tree裡面 name包涵keyword的節點
 * @param {*} list
 * @param {*} keyword
 */
export function getFilteredData(list = [], keyword = '') {
  return list.reduce((prev, curr) => {
    if (curr.items && isChildHasKeyword(curr.items, keyword)) {
      return [
        ...prev, { ...curr, items: getFilteredData(curr.items, keyword) }
      ];
    }
    if (compareString(curr.name, keyword)) {
      return [...prev, curr];
    }
    return prev;
  }, []);
}
