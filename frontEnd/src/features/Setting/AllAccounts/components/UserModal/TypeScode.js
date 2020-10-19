import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import { connect } from 'react-redux';
import Resource from '~~apis/resource';
import ScodeSearchBar from './ScodeSearchBar';
import TypeList from './TypeList';
import * as AllAccountsActions from '../../AllAccountsActions';

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

const TypeScode = (props) => {
  const [scode, setScode] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const {
    // state
    type1Menus,
    // action
    getType1Menus,
    // props
    selected,
    onChangeSelected
  } = props;

  // on click scode search btn
  const handleSearchScode = () => {
    const params = { scode };
    getType1Menus(params);
    setIsSearch(true);
  };

  const onScodeChange = val => {
    if (!val) {
      setIsSearch(false);
    }
    setScode(val);
  };

  const onTypeListChange = (val) => {
    onChangeSelected(val);
  };

  return (
    <TypeMenuWrap>
      <ScodeSearchBar
        value={scode}
        onChange={onScodeChange}
        handleSearchScode={handleSearchScode}
        isFailed={isSearch && type1Menus.length === 0}
      />
      <TypeList
        options={type1Menus}
        selected={selected}
        onChange={onTypeListChange}
      />
    </TypeMenuWrap>
  );
};


TypeScode.defaultProps = {};

const mapStateToProps = state => {
  return {
    type1Menus: state.allAccount.type1Menus,
  };
};

const mapDispatchToProps = {
  getType1Menus: AllAccountsActions.getType1Menus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeScode);
