import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import { EnhancePopover } from '~~elements/Popover';
import traverse from 'traverse';
import _hasIn from 'lodash/hasIn';
import _get from 'lodash/get';
import _fpSet from 'lodash/fp/set';
import _groupBy from 'lodash/groupBy';
import _flattenDeep from 'lodash/flattenDeep';
import Tree from './Tree';
import { SelectContainer, LeafContainer, } from './SelectTrssStyle';
import { checkedAllStatus } from './utils';


function selectedToTreeValue(selected = []) {
  const treeValue = selected.reduce((prev, selectObj) => {
    const { purchasing_organization: purchasingOrg, plant } = selectObj;
    const newPurchaseObj = {
      purchasing_organization: purchasingOrg,
      plants: [{ plant, value: true }]
    };
    const purchaseOrgIndex = prev.findIndex(obj => obj.purchasing_organization === purchasingOrg);
    const hasPurchaseOrg = purchaseOrgIndex > -1;
    if (hasPurchaseOrg) {
      const oriPlants = _get(prev, [purchaseOrgIndex, 'plants'], []);
      const newPlants = [...oriPlants, { plant, value: true }];
      const newTreeValue = _fpSet([purchaseOrgIndex, 'plants'], newPlants)(prev);
      return newTreeValue;
    }
    return prev.concat(newPurchaseObj);
  }, []);
  return treeValue;
}

function SelectTree(props) {
  const [selected, setSelected] = useState([]);
  const [boxText, setBoxText] = useState('');
  const {
    value: treeValue = [],
    disabled = false,
    placeholder = '',
    data = [],
    onChange = () => { },
    isInvalid: propsInValid = false,
  } = props;

  useEffect(() => {
    const groups = _groupBy(selected, obj => obj.purchasing_organization);
    const newBoxText = Object.keys(groups).reduce((prev, curr) => {
      const plants = _flattenDeep(groups[curr]).map(obj => obj.plant).join(',');
      return `${prev} ${curr}:${plants};`;
    }, '');
    setBoxText(newBoxText);
  }, [JSON.stringify(selected)]);

  useEffect(() => {
    const newSelected = treeValue.reduce((prev, curr) => {
      const { purchasing_organization: purchasingOrg, plants = [] } = curr;
      const selectedPlant = plants.map(obj => ({ purchasing_organization: purchasingOrg, plant: obj.plant }));
      return [...prev, ...selectedPlant];
    }, []);
    setSelected(newSelected);
  }, [JSON.stringify(treeValue)]);

  const selectEl = useRef(null);

  const { checked } = checkedAllStatus(selected, data);
  const isInvalid = propsInValid || checked <= 0;

  function handleChangeSelected(newSelected) {
    const newTreeValue = selectedToTreeValue(newSelected);
    onChange(newTreeValue);
  }

  return (
    <SelectContainer
      disabled={disabled}
      isInvalid={isInvalid}
    >
      <div className="select-box" ref={selectEl}>
        <div className="box-text">
          {boxText || placeholder}
        </div>
        <Icon
          icon={IconName.IconArrowDownBlack}
          size="0.8rem"
        />
      </div>
      {
        !disabled &&
        <EnhancePopover
          target={selectEl}
          placement="bottom-end"
          hideArrow
          useContentStyle={false}
        >
          <Tree
            data={data}
            value={treeValue}
            onChange={onChange}
            selected={selected}
            onChangeSelected={handleChangeSelected}
          />
        </EnhancePopover>
      }
    </SelectContainer>
  );
}

export default SelectTree;
