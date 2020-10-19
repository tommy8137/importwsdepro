import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _ from 'lodash';
import styled from 'styled-components';
import Checkbox from '~~elements/Checkbox';
import { getCheckboxStatus, setNodeChild, setNodeItem } from './PartCategoryUtils';

const NodeContainer = styled.div`
  .checkbox {
    margin-bottom: 0.5rem;
  }
  .child-node {
    padding-left: 1rem;
  }
`;


function PartCategoryNode(props) {
  const {
    data = [],
    onCheck,
  } = props;

  const initData = props.initData || data;

  /**
   * 當點選父結點時，把裡面所有的小孩都 選/不選
   */
  function handleChecledAllChild(item) {
    if (item.items) {
      const { checked } = getCheckboxStatus(item.items);
      const newData = setNodeItem(initData, item, !checked);
      onCheck(newData);
    }
  }

  /**
   * 當checkbox改變時
   * @param {*} item checked的那個item
   * @param {*} path 這個item在data的路徑
   */
  function handleCheckChange(item) {
    const newData = setNodeItem(initData, item, !item.isSelected);
    onCheck(newData);
  }


  /**
   * @param {} item 判斷節點是哪一種： 父節點或是葉子 來給不同的checkbox
   */
  function getCheckbox(item) {
    const { items = [], isSelected = false } = item;

    // 如果是父節點的話就要檢查是不是所有小孩有selected了
    if (items.length) {
      const { checked, indeterminate } = getCheckboxStatus(item.items);
      return (
        <Checkbox
          onChange={() => handleChecledAllChild(item)}
          indeterminate={indeterminate}
          checked={checked}
        >
          {item.name}
        </Checkbox>
      );
    }
    // 如果是葉子的話就只要檢查他是不是isSelected就好
    return (
      <Checkbox
        checked={isSelected}
        onChange={() => handleCheckChange(item)}
      >
        {item.name}
      </Checkbox>
    );
  }

  return (
    <NodeContainer>
      {
        data.map((item, i) => {
          const hasChild = item.items && item.items.length > 0;
          return (
            <div key={item.key}>
              <div>
                {getCheckbox(item)}
              </div>
              {hasChild &&
                <div className="child-node">
                  <PartCategoryNode
                    {...props}
                    data={item.items}
                    initData={initData}
                  />
                </div>
              }
            </div>
          );
        })
      }
    </NodeContainer>
  );
}

PartCategoryNode.defaultProps = {
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = {

};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PartCategoryNode);
