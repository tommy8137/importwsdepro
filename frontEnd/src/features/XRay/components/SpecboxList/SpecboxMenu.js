import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Icon from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import Button from '~~elements/Button';
import _find from 'lodash/find';


const InputWrapper = styled.div`
  padding: 0.2rem;
  position: relative;
  .reset {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0.5rem;
  }
  input {
    display: inline-block;
    width: 100%;
    height: 1.8rem;
    font-size: 1rem;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #cccccc;
    outline: 0;
    padding: 0 2rem 0 0.5rem;
    font-size: 0.8rem;
    &:focus {
      box-shadow: none;
      border: 1px solid #00A99D;
    }
  }
`;
const SpecItemMenu = styled.div`
  width: 14rem;
  .ctrl {
    border-bottom: 1px solid #dedede;
      padding: 0 0 6px 0;
      margin-bottom: 8px;
    .top-ctrl {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .checkbox {
        margin: 0;
        input {
          visibility: hidden;
        }
        label {
          width: 100%;
        }
      }
    }
  }

  .menu {
    height: auto;
    max-height: 14rem;
    overflow: hidden;
    overflow-y: auto;
    >.checkbox {
      display: block;
      margin-bottom: 0.25rem;
      width: 100%;
      word-break: break-all;
      font-size: 1.015rem;
      input[type="checkbox"] {
        visibility: hidden;
      }
      label {
        width: 100%;
        span {
          display: inline-block;
          width: calc(100% - 2rem);
          vertical-align: top;
          &.red {
            color: red;
          }
        }
      }
    }
  }
`;

function compareString(str1 = '', str2 = '') {
  return str1.toUpperCase().includes(str2.toUpperCase());
}

const SpecboxMenuComponent = (props) => {
  const [keyword, setKeyword] = useState('');

  const {
    specItemList = [],
    isSingle = false,
    onCheckboxChange,
    onChange,
  } = props;


  const filteredSpecItemList = specItemList.filter(s => compareString(s.item_name, keyword));
  // 目前選幾個spec
  const selectCount = filteredSpecItemList.filter(s => s.value).length;
  // select all 的 checked 狀態
  const checkboxStatus = {
    isSelectAll: filteredSpecItemList.every(s => s.value === true),
    checked: selectCount > 0,
    indeterminate: selectCount < filteredSpecItemList.length && selectCount > 0
  };
  // 如果有選任一個spec: 顯示目前所選的spec(藍色底), 如果沒有選任何的spec, 就顯示所有沒選的(灰色底)


  function handleCleanAll() {
    let newSpecItemList;
    newSpecItemList = specItemList.map(spec => {
      return {
        ...spec,
        value: false
      };
    });
    onChange(newSpecItemList);
  }

  /**
   * 處理全選/全不選
   * @param {Object} e click event
   */
  function handleSelectAll(e) {
    let newSpecItemList;
    if (checkboxStatus.isSelectAll) {
      newSpecItemList = specItemList.map(spec => {
        const inFilterList = !!_find(filteredSpecItemList, (obj) => obj.item_name === spec.item_name);
        return {
          ...spec,
          value: inFilterList ? false : spec.value
        };
      });
    } else {
      newSpecItemList = specItemList.map(spec => {
        const inFilterList = !!_find(filteredSpecItemList, (obj) => obj.item_name === spec.item_name);
        return {
          ...spec,
          value: inFilterList ? true : spec.value
        };
      });
    }
    onChange(newSpecItemList);
  }

  /**
   * 當checkbox改變時
   * @param {Object} e  click event
   * @param {Object} s spec object
   */
  function handleOnCheckboxChange(e, s) {
    if (isSingle) {
      const newSpecItemList = specItemList.map(spec => {
        return {
          ...spec,
          value: spec.item_name === s.item_name || false
        };
      });
      onChange(newSpecItemList);
    } else {
      const newSpecItemList = specItemList.map(spec => {
        return {
          ...spec,
          value: spec.item_name === s.item_name ? !s.value : spec.value
        };
      });
      onChange(newSpecItemList);
    }
  }

  return (
    <SpecItemMenu>
      <div className="ctrl">
        <InputWrapper>
          <input
            onChange={e => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Search Keyword"
          />
          {keyword.length > 0 &&
            (<Icon
              className="reset"
              icon="BtnReset2"
              onClick={() => setKeyword('')}
              size="1.2rem"
            />)
          }
        </InputWrapper>
        {!isSingle &&
          <div className="top-ctrl">
            <Checkbox
              onChange={(e) => handleSelectAll(e)}
              {...checkboxStatus}
            >
              Select all
            </Checkbox>
            <Button
              round
              mini
              border={false}
              color="transparent"
              onClick={(e) => handleCleanAll()}
            >
              Clean All
            </Button>
          </div>
        }
      </div>
      <div className="menu">
        {
          filteredSpecItemList.map((s, k) => {
            return (
              <Checkbox
                key={k}
                checked={s.value}
                onChange={(e) => handleOnCheckboxChange(e, s)}
              >
                <span className={`${s.isHighlight ? 'red' : ''}`}>
                  {s.item_name}
                </span>
              </Checkbox>
            );
          })
        }
      </div>
    </SpecItemMenu>
  );
};

export default connect(
  (state) => {
    return {};
  },
  {
    goToRouter: push
  }
)(SpecboxMenuComponent);
