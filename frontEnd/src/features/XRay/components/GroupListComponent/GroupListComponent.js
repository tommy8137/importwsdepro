import React, { Component, useState, useEffect, useRef } from 'react';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Icon from '~~elements/Icon';
import Switch from '~~elements/Switch';
import {
  XRAY_TYPES
} from '~~features/XRay/XrayConst';
import { getCeSpecGroup, getEmptySpecGroup, getSelectAllSpecGroup } from '~~features/XRay/XrayUtils';

import * as XrayActions from '../../XrayActions';

import AddMode from './AddMode';
import EditMode from './EditMode';

const InlineSwitch = styled.label`
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  margin-right: 2rem;
  opacity: ${({ disabled }) => (disabled ? '0.2' : '1')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};
  &:last-child {
    margin: 0;
  }
  label {
    margin: 0;
  }
  p {
    white-space: nowrap;
    margin: 0;
  }
`;
const SpecGroupContainer = styled.div`
  position: relative;
  z-index: 3;
  padding: 0 0 1.2rem 0;

  .spec-group-row {
    padding: 0.5rem 2.5rem;
    display: flex;
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    align-items: center;
    justify-content: space-between;
  }
  .spec-group-col {
    flex: 0 auto;
    display: flex;
  }
  .group-tit {
    display: block;
    white-space: nowrap;
    padding: 1rem 2.5rem;
    .icon, p {
      display: inline-block;
      vertical-align: middle;
    }
    .icon {
      width: 1rem;
      margin-right: 12px;
    }
    p {
      margin: 0;
      font-size: 1.4rem;
      font-weight: bolder;
    }
  }
`;

const GroupListComponent = (props) => {
  const {
    edit,
    searchBy,
    canSelectAll,
    canSelectCE,
    specItem,
    specItem: {
      specGroup
    },
    ceSpecGroup,
    // action
    setSpecItemAction } = props;

  // 是否為空的specGroup
  const isEmpty = Object.keys(specGroup).every(k => specGroup[k].length <= 0);

  // 判斷所有的spec是不是全選的狀態
  const isSeletedAll = !isEmpty && Object.keys(specGroup).every(k =>
    // 是否選擇了所有的spec
    specGroup[k].filter(spec => spec.value).length === specGroup[k].length
  );

  // CE GROUP是不是全部都是false
  const isCeGroupEmpty = ceSpecGroup.every(spec => !spec);

  // 判斷是不是選擇了ce的group組合
  const isSelectCeGroup = !isEmpty && !isCeGroupEmpty && Object.keys(specGroup).every((k, index) => {
    const needSelectAll = ceSpecGroup[index];
    const isSelectAll = specGroup[k].filter(spec => spec.value).length === specGroup[k].length && specGroup[k].length > 0;
    if (specGroup[k].length <= 0) {
      // 如果spec是空的就不判斷
      return true;
    }
    return needSelectAll === isSelectAll && specGroup[k].length > 0;
  });

  // Select all 是否 disabled
  const isSelectAllDisabled = isEmpty;
  // Select CE Group 是否 disabled
  const isSelectCeGroupDisabled = isEmpty || isCeGroupEmpty || ceSpecGroup.length <= 0;

  /**
  * 當全選時所有的spec時
  */
  const handleChangeSelectAll = (e) => {
    const emptySpecGroup = getEmptySpecGroup(specGroup);
    const selectAllSpecGroup = getSelectAllSpecGroup(specGroup);

    const newSpecItem = {
      ...specItem,
      // 如果已經是全選了，就把全部的spec通通勾掉
      specGroup: isSeletedAll ? emptySpecGroup : selectAllSpecGroup,
    };
    setSpecItemAction(newSpecItem);
  };

  /**
    當打開選擇預設CE GROUP的時候, 帶入ceSpecGroup的組合
  */
  const handleChangeSelectCeGroup = () => {
    const emptySpecGroup = getEmptySpecGroup(specGroup);
    const newSpecGroup = getCeSpecGroup(specGroup, ceSpecGroup);
    // 如果已經選擇了ceGroup, 就把所有的清空
    const newSpecItem = {
      ...specItem,
      specGroup: isSelectCeGroup ? emptySpecGroup : newSpecGroup
    };
    setSpecItemAction(newSpecItem);
  };

  return (
    <SpecGroupContainer>
      <div className="group-tit">
        <Icon icon="IcoBookmark" />
        <p>SPEC Group</p>
      </div>
      <div className="spec-group-row">
        <div className="spec-group-col">
          {/* 選擇所有specs 只有在EE才可以全選 */}
          {
            canSelectAll &&
            (
              <InlineSwitch
                disabled={isSelectAllDisabled}
              >
                <p>Select All</p>
                <Switch
                  checked={isSeletedAll}
                  onChange={handleChangeSelectAll}
                />

              </InlineSwitch>
            )
          }
          {/* 選擇所預設的CE GROUP組合 只有在EE才可以全選 */}
          {
            canSelectCE &&
            <InlineSwitch
              disabled={isSelectCeGroupDisabled}
            >
              <p>Select CE SPEC</p>
              <Switch
                checked={isSelectCeGroup}
                onChange={handleChangeSelectCeGroup}
              />
            </InlineSwitch>
          }
        </div>
        {/* specGroup 下拉 */}
        {
          searchBy === XRAY_TYPES.CATEGORY &&
          (
            <div className="spec-group-col">
              {edit ? <EditMode /> : <AddMode />}
            </div>
          )
        }
      </div>
    </SpecGroupContainer>
  );
};

GroupListComponent.defaultProps = {};

export default connect(
  (state) => {
    return {
      ceSpecGroup: state.xray.ceSpecGroup,
      searchBy: state.xray.searchBy,
      edit: state.xray.edit,
      specGroupList: state.xray.specGroupList,
      specItem: state.xray.specItem,
      specTitle: state.xray.specTitle,
    };
  },
  {
    setEditAction: XrayActions.setEdit,
    getGroupItemAction: XrayActions.getGroupItem,
    getMeSpecItemsListAction: XrayActions.getMeSpecItemsList,
    setSpecItemAction: XrayActions.setSpecItem,
    goToRouter: push
  }
)(GroupListComponent);
