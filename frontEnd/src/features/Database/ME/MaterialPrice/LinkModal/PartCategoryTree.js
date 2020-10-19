import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _ from 'lodash';
import styled from 'styled-components';
import Checkbox from '~~elements/Checkbox';
import * as DatabaseActions from '~~features/Database/DatabaseActions';

import {
  BlueListBoxRow,
  BlueListBoxWrap,
  BlueListBoxTitle,
  BlueListBoxSearchbar,
  BlueListBoxList
} from '~~elements/BlueListBox';

import { getCheckboxStatus, getFilteredData, setNodesAllChild } from './PartCategoryUtils';

import PartCategoryNode from './PartCategoryNode';


function PartCategoryTree(props) {
  const {
    data = [],
    onCheck,
    keyword
  } = props;

  /**
   * 利用keyword來filter出哪些node符合
   */
  const filtedData = getFilteredData(data, keyword);
  const { indeterminate, checked } = getCheckboxStatus(data);

  /**
   * 全選/全不選所有的node
   */
  function handleSelectAll() {
    const newData = setNodesAllChild(data, !checked);
    onCheck(newData);
  }
  return (
    <React.Fragment>
      <BlueListBoxRow>
        <Checkbox
          indeterminate={indeterminate}
          checked={checked}
          onChange={handleSelectAll}
        >
          Select All
        </Checkbox>
      </BlueListBoxRow>
      <BlueListBoxList>
        <PartCategoryNode
          initData={data}
          data={filtedData}
          onCheck={onCheck}
        />
      </BlueListBoxList>
    </React.Fragment>
  );
}

PartCategoryTree.defaultProps = {
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = {

};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PartCategoryTree);
