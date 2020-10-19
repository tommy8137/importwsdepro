import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import Checkbox from '~~elements/Checkbox';
import Icon from '~~elements/Icon';
import _fpDifference from 'lodash/fp/difference';
import _fpUnion from 'lodash/fp/union';
import TypeSearchbar from './TypeSearchbar';

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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
  .message {
    color: red;
    font-size: 0.8rem;
    margin: 0.8rem;
    .icon {
      width: 0.8rem;
    }
  }
`;

const TypeMenu = (props) => {
  const [keyword, setKeyword] = useState('');
  const [options, setOptions] = useState([]);
  const { options: values, selected = [], filterText } = props;

  useEffect(() => {
    // console.log(selected);
    const opts = values
      .map(opt => {
        return {
          ...opt,
          value: selected.indexOf(opt.id) > -1,
        };
      });
    setOptions(opts);
  }, [values, selected]);

  // filter keyword 過後的options
  const filteredOptions = options.filter(opt => {
    if (opt.type1) {
      return opt.type1.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    }
    return true;
  });
  // 原本的options
  const selectedOptions = options.filter(opt => opt.value);
  const filteredSelectedOptions = filteredOptions.filter(opt => opt.value);
  const isSelectAll = filteredOptions.every(opt => opt.value) && filteredOptions.length > 0;
  const isIndeterminate = filteredSelectedOptions.length > 0 && !isSelectAll;

  const onSelectAll = () => {
    const selectedList = filteredOptions.map(opt => opt.id);
    if (isSelectAll) {
      const temp = _fpDifference(selected, selectedList);
      props.onChange(temp);
    } else {
      const temp = _fpUnion(selected, selectedList);
      props.onChange(temp);
    }
  };
  // checkbox 改變時
  const onChange = (e, opt) => {
    let temp;
    const index = selected.indexOf(opt.id);
    if (index > -1) {
      temp = R.remove(index, 1, selected);
    } else {
      temp = [...selected, opt.id];
    }
    props.onChange(temp);
  };

  return (
    <TypeMenuWrap>
      <div className="type-wrap">
        <div className="type-row type-title">
          Type I
        </div>
        <div className="type-row type-selected-result">
          {(isSelectAll) ? `${filterText} All` : selectedOptions.map(opt => opt.type1).toString()}
        </div>
        <div className="type-row type-search-bar">
          <TypeSearchbar
            value={keyword}
            onChange={val => {
              setKeyword(val);
            }}
          />
        </div>
        <div className="type-menu">
          <label
            className="type-option type-option-top"
          >
            <Checkbox
              indeterminate={isIndeterminate}
              checked={isSelectAll || isIndeterminate}
              onChange={onSelectAll}
            />
            <p>Select All</p>
          </label>
          <div className="type-list">
            {keyword && filteredOptions.length === 0 ?
              <div className="message">
                查無此 Type I <Icon icon="IcoAlarmRed" />
              </div>
              :
              (filteredOptions.map((opt, key) => {
                return (
                  <label
                    key={key}
                    className="type-option"
                  >
                    <Checkbox
                      checked={opt.value}
                      onChange={(e) => onChange(e, opt)}
                    />
                    <p>{opt.type1}</p>
                  </label>
                );
              }))
            }
          </div>
        </div>
      </div>
    </TypeMenuWrap>
  );
};

TypeMenu.defaultProps = {
  onChange: () => { },
  value: '',
  options: [],
  selected: [],
  filterText: ''
};

export default TypeMenu;
