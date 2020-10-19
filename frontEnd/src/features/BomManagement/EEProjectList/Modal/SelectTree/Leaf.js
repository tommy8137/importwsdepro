

/* eslint-disable camelcase */

import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import _hasIn from 'lodash/hasIn';
import _get from 'lodash/get';
import _fpSet from 'lodash/fp/set';
import _fpRemove from 'lodash/fp/remove';
import _isEqual from 'lodash/isEqual';
import _findIndex from 'lodash/findIndex';

import { checkIncludes, checkedStatus, handleSelectPlant } from './utils';
import { SelectContainer, LeafContainer, } from './SelectTrssStyle';


function Leaf(props) {
  const [isOpen, setIsOpen] = useState(true);
  const {
    data = [],
    keyword = '',
    plantData,
    plantData: { purchasing_organization = '', plants = [] },
    selected = [],
    onChangeSelected = () => { }
  } = props;

  const { checked, indeterminate } = checkedStatus(selected, plants, purchasing_organization);

  const filteredPlants = plants.filter(obj => checkIncludes(obj.plant, keyword));

  function handleSelectAll() {
    const value = !checked;
    const newSelected = handleSelectPlant(selected, filteredPlants, purchasing_organization, value);
    onChangeSelected(newSelected);
  }
  function handleSelectedLeaf(plantObj, value) {
    const newSelected = handleSelectPlant(selected, [plantObj], purchasing_organization, value);
    onChangeSelected(newSelected);
  }

  const showLeaf = filteredPlants.length > 0;
  if (!showLeaf) return null;

  return (
    <LeafContainer className="tree-leaf" isOpen={isOpen}>
      <Icon
        className="leaf-arrow"
        icon={IconName.IconArrowDownBlack}
        size="0.8rem"
        onClick={() => setIsOpen(!isOpen)}
      />

      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={handleSelectAll}
      >
        {purchasing_organization}
      </Checkbox>
      {
        isOpen &&
        <div className="tree-child">
          {
            filteredPlants.map((p, i) => {
              const { value = false, plant = '' } = p;
              const selectedObj = { purchasing_organization, plant };
              const isChecked = !!selected.find(obj =>
                obj.purchasing_organization === purchasing_organization &&
                obj.plant === plant);

              return (
                <LeafContainer className="tree-leaf">
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleSelectedLeaf(selectedObj, !isChecked)}
                  >
                    {plant}
                  </Checkbox>
                </LeafContainer>
              );
            })
          }
        </div>
      }
    </LeafContainer>
  );
}

export default Leaf;
