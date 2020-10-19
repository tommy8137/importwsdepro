import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import Checkbox from '~~elements/Checkbox';
import Icon from '~~elements/Icon';
import _fpDifference from 'lodash/fp/difference';
import _fpUnion from 'lodash/fp/union';
import ProductSearchbar from './ProductSearchbar';

const ProductMenuWrap = styled.div`
  .product-wrap {
    border: 1px solid #aaa;
    .type-row {
      padding: 0.4rem 0.6rem;
      font-size: 0.85rem;
      border-bottom: 1px solid #aaa;
      &:last-child {
        border-bottom: 0;
      }
    }
    .product-title {
      background-color: #7890ab;
      color: white;
    }
    .product-selected-result {
      color: #333;
      min-height: 2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .product-filter {
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
  .product-option {
      display: flex;
      margin: 0;
      padding: 0.4rem 0.6rem;
      font-size: 0.85rem;

      &.product-option-top {
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
  .product-list {
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

const ProductMenu = (props) => {
  const [keyword, setKeyword] = useState('');
  const [options, setOptions] = useState([]);
  const { options: values, selectPT = [], filterText } = props;
  useEffect(() => {
    const opts = values
      .map(opt => {
        return {
          ...opt,
          value: selectPT.indexOf(opt.id) > -1,
        };
      });
    setOptions(opts);
  }, [values, selectPT]);

  // filter keyword 過後的options
  const filteredOptions = options.filter(opt => {
    if (opt.product_type) {
      return opt.product_type.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
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
      const temp = _fpDifference(selectPT, selectedList);
      props.onChange(temp);
    } else {
      const temp = _fpUnion(selectPT, selectedList);
      props.onChange(temp);
    }
  };
  // checkbox 改變時
  const onChange = (e, opt) => {
    let temp;
    const index = selectPT.indexOf(opt.id);
    if (index > -1) {
      temp = R.remove(index, 1, selectPT);
    } else {
      temp = [...selectPT, opt.id];
    }
    props.onChange(temp);
  };

  return (
    <ProductMenuWrap>
      <div className="product-wrap">
        <div className="type-row product-title">
          Product Type
        </div>
        <div className="type-row product-selected-result">
          {(isSelectAll) ? `${filterText} All` : selectedOptions.map(opt => opt.product_type).toString()}
        </div>
        <div className="type-row product-search-bar">
          <ProductSearchbar
            value={keyword}
            onChange={val => {
              setKeyword(val);
            }}
          />
        </div>
        <div className="product-menu">
          <label
            className="product-option product-option-top"
          >
            <Checkbox
              indeterminate={isIndeterminate}
              checked={isSelectAll || isIndeterminate}
              onChange={onSelectAll}
            />
            <p>Select All</p>
          </label>
          <div className="product-list">
            {keyword && filteredOptions.length === 0 ?
              <div className="message">
                查無此 Product Type <Icon icon="IcoAlarmRed" />
              </div>
              :
              (filteredOptions.map((opt, key) => {
                return (
                  <label
                    key={key}
                    className="product-option"
                  >
                    <Checkbox
                      checked={opt.value}
                      onChange={(e) => onChange(e, opt)}
                    />
                    <p>{opt.product_type}</p>
                  </label>
                );
              }))
            }
          </div>
        </div>
      </div>
    </ProductMenuWrap>
  );
};

ProductMenu.defaultProps = {
  onChange: () => { },
  value: '',
  options: [],
  selectPT: [],
  filterText: ''
};

export default ProductMenu;
