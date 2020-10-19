import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Resource from '~~apis/resource';
import Radio from '~~elements/Radio';
import TypeList from './TypeList';
import * as AllAccountsActions from '../../AllAccountsActions';
import { USER_MODAL_FILTER_TYPE, USER_MODAL_GET_TYPE1_PERMISSION, USER_MODAL_GET_FILTERTYPE_BY_RBACLIST, USER_MODAL_FILTER_TYPE_TEXT } from '../../AllAccountConst';

const TypeMenuWrap = styled.div`
  .type-wrap {
    border: 1px solid #aaa;
    .type-row {
      padding: 0.4rem 0.6rem;
      font-size: 0.85rem;
      border-bottom: 1px solid #aaa;
      &:last-child {
        border-bottom: 0;
      }
    }
    .type-title {
      background-color: #7890ab;
      color: white;
    }
    .type-selected-result {
      color: #333;
      min-height: 2rem;
    }
  }
  .type-filter {
    display: block;
    margin-bottom: 0.5rem;
    .radio-div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 1.5rem;
      &:last-child {
        margin-right: 0;
      }
    }
    .radio-div {
    }
  }
  .type-option {
      display: flex;
      margin: 0;
      padding: 0.4rem 0.6rem;
      font-size: 0.85rem;

      &.type-option-top {
        border-bottom: 1px solid #aaa;
      }
      .checkbox {
        flex: 0 2rem;
        max-width: 2rem;
      }
      p {
        flex: 0 100%;
        overflow: hidden;
        text-overflow: hidden;
        margin: 0;
      }
    }
  .type-list {
    height: 15rem;
    overflow: hidden;
    overflow-y: auto;
  }
`;

const TypeMenu = (props) => {
  const {
    // state
    filterType,
    rbacList,
    type1Menus,
    // action
    getType1Menus,
    // props
    selected,
    onChangeSelected,
    setFilterType
  } = props;

  const { isEE, isME } = USER_MODAL_GET_TYPE1_PERMISSION(rbacList);
  const filterText = USER_MODAL_FILTER_TYPE_TEXT[filterType];

  useEffect(() => {
    setFilterType(USER_MODAL_GET_FILTERTYPE_BY_RBACLIST(rbacList));
  }, [JSON.stringify(rbacList)]);

  // when change filterType, call api get type1 menu
  useEffect(() => {
    if (filterType !== false) {
      const params = { eeme: filterType };
      getType1Menus(params);
    }
  }, [filterType]);


  const onChange = (val) => {
    onChangeSelected(val);
  };

  const onChangeFilterType = val => {
    setFilterType(val);
  };

  return (
    <TypeMenuWrap>
      <div className="type-filter">
        {
          isEE && isME &&
          <div className="radio-div">
            <Radio
              className="radio"
              checked={filterType === USER_MODAL_FILTER_TYPE.ALL}
              onChange={() => onChangeFilterType(USER_MODAL_FILTER_TYPE.ALL)}
            >
              All Type I
            </Radio>
          </div>
        }
        {
          isME &&
          <div className="radio-div">
            <Radio
              className="radio"
              checked={filterType === USER_MODAL_FILTER_TYPE.ME}
              onChange={() => onChangeFilterType(USER_MODAL_FILTER_TYPE.ME)}
            >
              ME
            </Radio>
          </div>
        }
        {
          isEE &&
          <div className="radio-div">
            <Radio
              className="radio"
              checked={filterType === USER_MODAL_FILTER_TYPE.EE}
              onChange={() => onChangeFilterType(USER_MODAL_FILTER_TYPE.EE)}
            >
              EE
            </Radio>
          </div>
        }
      </div>
      <TypeList
        options={type1Menus}
        selected={selected}
        onChange={onChange}
        filterText={filterText}
      />
    </TypeMenuWrap>
  );
};

TypeMenu.defaultProps = {};

const mapStateToProps = state => {
  return {
    filterType: state.allAccount.filterType,
    rbacList: state.allAccount.rbacList,
    type1Menus: state.allAccount.type1Menus,
  };
};

const mapDispatchToProps = {
  getType1Menus: AllAccountsActions.getType1Menus,
  setFilterType: AllAccountsActions.setFilterType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeMenu);
