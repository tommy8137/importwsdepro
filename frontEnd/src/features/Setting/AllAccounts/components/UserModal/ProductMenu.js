import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Resource from '~~apis/resource';
import Radio from '~~elements/Radio';
import ProductList from './ProductList';
import * as AllAccountsActions from '../../AllAccountsActions';
import { USER_MODAL_FILTER_TYPE, USER_MODAL_GET_PRODUCTTYPE_PERMISSION, USER_MODAL_GET_PRODUCTTYPE_BY_RBACLIST, USER_MODAL_FILTER_TYPE_TEXT } from '../../AllAccountConst';

const ProductMenuWrap = styled.div`
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

const ProductMenu = (props) => {
  const {
    // state
    filterType,
    rbacList,
    productTypeMenus,
    // action
    getProductTypeMenus,
    // props
    selectPT,
    onChangeProductType,
    setFilterType
  } = props;

  const { isPTEE, isPTME } = USER_MODAL_GET_PRODUCTTYPE_PERMISSION(rbacList);
  const filterText = USER_MODAL_FILTER_TYPE_TEXT[filterType];

  useEffect(() => {
    setFilterType(USER_MODAL_GET_PRODUCTTYPE_BY_RBACLIST(rbacList));
  }, [JSON.stringify(rbacList)]);

  // when change filterType, call api get product type menu
  useEffect(() => {
    if (filterType !== false) {
      const params = { eeme: filterType };
      getProductTypeMenus(params);
    }
  }, [filterType]);


  const onChange = (val) => {
    onChangeProductType(val);
  };

  const onChangeFilterType = val => {
    setFilterType(val);
  };

  return (
    <ProductMenuWrap>
      <div className="type-filter">
        {
          isPTME && isPTEE &&
          <div className="radio-div">
            <Radio
              className="radio"
              checked={filterType === USER_MODAL_FILTER_TYPE.ALL}
              onChange={() => onChangeFilterType(USER_MODAL_FILTER_TYPE.ALL)}
            >
              ALL
            </Radio>
          </div>
        }
        {
          isPTME &&
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
          isPTEE &&
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
      <ProductList
        options={productTypeMenus}
        selectPT={selectPT}
        onChange={onChange}
        filterText={filterText}
      />
    </ProductMenuWrap>
  );
};

ProductMenu.defaultProps = {};

const mapStateToProps = state => {
  return {
    filterType: state.allAccount.filterType,
    rbacList: state.allAccount.rbacList,
    productTypeMenus: state.allAccount.productTypeMenus,
  };
};

const mapDispatchToProps = {
  getProductTypeMenus: AllAccountsActions.getProductTypeMenus,
  setFilterType: AllAccountsActions.setFilterType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductMenu);
