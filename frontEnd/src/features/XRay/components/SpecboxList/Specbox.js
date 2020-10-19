import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import Icon from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import Button from '~~elements/Button';
import { EnhanceTooltip } from '~~elements/Tooltip';
import { EnhancePopover } from '~~elements/Popover';
import * as R from 'ramda';

import SpecboxMenu from './SpecboxMenu';

const Specbox = styled.div`
  width: 100%;
  position: relative;
  display: block;
  border: 1px solid #919191;
  background-color: #f2f2f2;
  transition: 0.3s ease all;
  cursor: ${({ editable }) => (editable ? 'pointer' : '')};
  padding-bottom: 100%;
  border-radius: 6px;
  .spec-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    padding: 12px;
    /* overflow: hidden; */
  }
  .spec-box-blur {
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    z-index: 1;
    visibility: ${({ isEmpty }) => (isEmpty ? 'hidden' : '')};
  }
  &.active {
    background-color: #7b90a9;
    border: 1px solid transparent;
    .spec-title {
      color: white;
      word-break: break-all;
    }
    .spec-box-top {
      .toggle {
        color: white;
      }
    }
    .spec-box-wrap {
      &:after {
        background-image: linear-gradient(rgba(124,144,169,0) 0%,rgb(123, 144, 169));
      }
      .spec-title {
        color: white;
      }
      .spec-tags {
        .spec-tags-list {
          .tag {
            color: white;
            background-color: #333333;
          }
        }
      }
    }
  }
  .spec-box-top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    visibility: ${({ isEmpty }) => (isEmpty ? 'hidden' : '')};
    .spec-box-top-blur {
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height: 100%;
      z-index: 1;
      visibility: ${({ isEmpty }) => (isEmpty ? 'hidden' : '')};
    }
    .toggle,
    .checkbox {
      position: relative;
      z-index: 2;
    }
  }
  .spec-box-wrap {
    padding-top: 6px;
    /* min-height: 12rem; */
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 30%;
      z-index: 2;
      transition: 0.3s ease all;
      background-image: linear-gradient(rgba(124, 144, 169, 0) 0%, rgb(245, 245, 245));
    }
    .spec-title {
      font-size: 1.2rem;
      margin-bottom: 6px;
      font-weight: normal;
      color: #333333;
      word-break: break-all;
      display: flex;;
      line-height: 1.2;
    }
    .spec-tags {
      display: block;
      border-top: 1px solid rgba(0, 0, 0, 0.13);
      position: relative;
      display: block;
      display: flex;
      /* padding-bottom: 72%; */
      max-height: 100%;
      .spec-tags-list {
        position: relative;
        top:0;
        left:0;
        width: auto;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        padding: 12px 0 0 0;
        .tag {
          padding: 4px 6px;
          line-height: 1;
          border-radius: 4px;
          display: inline-block;
          vertical-align: top;
          font-size: 0.85rem;
          background-color: #dedede;
          color: white;
          opacity: 0.8;
          margin-right: 4px;
          border-radius: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }
      }
    }
  }
`;


const SpecboxComponent = (props) => {
  const [keyword, setKeyword] = useState('');
  const specBoxEl = useRef(null);
  const toggleEl = useRef(null);

  const {
    editable = false,
    onChange = () => { },
    specItemList = [],
    specTitle = '',
    specKey,
    isSingle = false
  } = props;

  const [open, setOpen] = useState(false);
  const tagsEl = useRef(null);

  /**
     * 把某個spec勾起來
     * @param {*} e event
     * @param {*} s spec   {item_name: 'spec01', value: false}
   */

  /**
   * 把所有的spec都勾起來
   * @param {*} e event
   * @param {*} val 全選checkbxo的value
   */
  const onSetAll = (e, val) => {
    if (!editable || isSingle) { return; }
    const temp = specItemList.map(s => R.set(R.lensProp('value'), val, s));
    if (typeof (onChange) === 'function') {
      onChange(specKey, temp);
    }
  };

  // 目前選幾個spec
  const selectCount = specItemList.filter(s => s.value).length;
  // select all 的 checked 狀態
  const checkboxStatus = {
    checked: selectCount > 0,
    indeterminate: selectCount < specItemList.length && selectCount > 0
  };
  // 如果有選任一個spec: 顯示目前所選的spec(藍色底), 如果沒有選任何的spec, 就顯示所有沒選的(灰色底)
  const tags = checkboxStatus.checked ?
    specItemList.filter(s => s.value).map(s => s.item_name) :
    specItemList.map(s => s.item_name);

  function handleOnChange(newSpecItemList) {
    if (!editable) { return; }
    onChange(specKey, newSpecItemList);
  }
  return (
    <Specbox
      editable={editable}
      className={`spec-box ${checkboxStatus.checked ? 'active' : ''}`}
      isEmpty={!specItemList.length}
    >
      <div className="spec-wrapper">
        <div
          className="spec-box-blur"
          onKeyDown={() => { }}
          onClick={(e) => onSetAll(e, !checkboxStatus.checked)}
        />
        {editable &&
          <div className="spec-box-top">
            <div
              className="spec-box-top-blur"
              onKeyDown={() => { }}
              onClick={(e) => onSetAll(e, !checkboxStatus.checked)}
            />
            <div>
              {
                !isSingle &&
                <Checkbox
                  className="select-all"
                  onChange={(e) => onSetAll(e, !checkboxStatus.checked)}
                  {...checkboxStatus}
                />
              }
            </div>
            <Button
              round
              mini
              border={false}
              color="transparent"
              innerRef={toggleEl}
              className="toggle"
            >
              Select items
            </Button>
            {/* spec list menu */}
            <EnhancePopover
              target={toggleEl}
              placement="right-start"
              onClickOutside={() => setKeyword('')}
            >
              <SpecboxMenu
                specItemList={specItemList}
                isSingle={isSingle}
                onChange={handleOnChange}
              />
            </EnhancePopover>
          </div>
        }
        <div
          className="spec-box-wrap"
          onKeyDown={() => { }}
          onClick={(e) => onSetAll(e, !checkboxStatus.checked)}
        >
          <p className="spec-title">{specTitle}</p>
          <div className="spec-tags">
            <div className="spec-tags-list" ref={tagsEl}>
              {tags.slice(0, 25).map((t, i) => <div className="tag" key={i}>{t}</div>)}
            </div>
            {
              tags.length ?
                <EnhanceTooltip
                  placement="bottom"
                  target={tagsEl}
                >
                  {tags.toString()}
                </EnhanceTooltip> : (null)
            }
          </div>
        </div>
      </div>
    </Specbox >
  );
};


SpecboxComponent.defaultProps = {
  onChange: () => { },
  specTitle: [],
  key: '',
  specItemList: [],
  editable: false
};

export default connect(
  (state) => {
    return {};
  },
  {
    goToRouter: push
  }
)(SpecboxComponent);
