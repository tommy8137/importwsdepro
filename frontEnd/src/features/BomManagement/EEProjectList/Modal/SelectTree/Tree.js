import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import traverse from 'traverse';
import _hasIn from 'lodash/hasIn';
import _get from 'lodash/get';
import _fpSet from 'lodash/fp/set';
import _merge from 'lodash/merge';
import _findIndex from 'lodash/findIndex';
import * as R from 'ramda';

import Checkbox from '~~elements/Checkbox';

import Leaf from './Leaf';
import { TreeContainer, LeafContainer } from './SelectTrssStyle';

import {
  checkedAllStatus
} from './utils';

function Tree(props) {
  const { data: initData, onChange, selected = [], onChangeSelected } = props;
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(initData);
  }, [JSON.stringify(initData)]);

  const { checked, indeterminate } = checkedAllStatus(selected, data);
  const isSelectAll = checked;

  function handleSelectedAll(value) {
    const allPlants = data.reduce((prev, curr) => {
      const { purchasing_organization: purchasingOrg, plants = [] } = curr;
      const selectObjs = plants.map(p => ({ purchasing_organization: purchasingOrg, plant: p.plant }));
      return [...prev, ...selectObjs];
    }, []);

    if (value) {
      const newSelected = allPlants.reduce((prev, curr) => {
        const findIndex = _findIndex(prev, obj =>
          obj.purchasing_organization === curr.purchasing_organization &&
          obj.plant === curr.plant);

        if (findIndex <= -1) {
          return prev.concat(curr);
        }
        return prev;
      }, selected);
      onChangeSelected(newSelected);
    } else {
      onChangeSelected([]);
    }
  }

  return (
    <TreeContainer>
      <div className="keyword-bar">
        <input placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={() => handleSelectedAll(!isSelectAll)}
        >
          Select All
        </Checkbox>
      </div>
      <div className="tree-container">
        {
          data.map((plantData, i) => {
            const leafProps = {
              data,
              keyword,
              plantData,
              selected,
              onChangeSelected,
            };
            return (<Leaf {...leafProps} />);
          })
        }
      </div>
    </TreeContainer >
  );
}

export default Tree;
