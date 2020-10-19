import React, { Component, useState, useEffect, useRef } from 'react';
import * as R from 'ramda';
import _ from 'lodash';
import styled from 'styled-components';
import { EnhanceTooltip } from '~~elements/Tooltip';

const SpecGroupDropdown = styled.div`
  text-align: left;
  display: inline-block;
  width: 300px;
  max-width: 100%;
  height: 100%;
  position: relative;
  transition: 0.3s ease all;
  margin-right: 0.5rem;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
  .no-data {
    text-align: center;
    font-size: 1rem;
    margin: 12px 0;
    font-weight: bolder;
  }
  .option-arrow {
    z-index: 2;
    position: absolute;
    top: 50%;
    right: 6%;
    transform: translate(0, -50%);
    &:after {
      content:'';
      display: block;
      border-right: 1px solid black;
      border-top: 1px solid black;
      width: 10px;
      height: 10px;
      transition: 0.3s ease all;
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(135deg)')};
    }
  }
  .option-tit {
    font-size: 0.8rem;
    margin: 0;
    color: #cecece;
  }
  .option-value {
    font-size: 1rem;
    margin: 0;
    color: #333;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .option-wrap {
    cursor: pointer;
    position: relative;
    z-index: 2;
    padding: 6px 12px;
    border: 1px solid #333;
    border-radius: ${({ open }) => (open ? '18px 18px 0 0' : '18px')};
    border-bottom: ${({ open }) => (open ? 'none' : '')};
  }
  .option-list {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    padding: 0;
    display: block;
    background-color: white;
    max-height: 250px;
    overflow: hidden;
    overflow-y: auto;
    transition: 0.16s ease all;
    border-radius: 0 0 18px 18px;
    transform: ${({ open }) => (open ? 'translate(0%, 0%) scaleY(1)' : 'translate(0%, 0%) scaleY(0)')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    transform-origin: center top;
    border: 1px solid #333;
    border-top: none;
    .option {
      cursor: pointer;
      display: block;
      transition: 0.3s ease all;
      background-color: rgb(230, 230, 230);
      color: #333;
      font-size: 0.6rem;
      padding: 10px 16px;
      margin-bottom: 0;
      p {
        display: inline-block;
        margin: 0;
      }
      &:hover {
        opacity: 0.6;
      }
      &.active {
        background-color: #dad7d7;
      }
      &.option-head {
        cursor: initial;
        top: 0;
        position: sticky;
        color: rgb(0, 169, 157);
        background-color: white;
        font-size: 0.8rem;
        padding: 6px 16px;
      }
      &:last-child {
        margin-bottom: 0px;
      }
      &:hover {
        background-color: #f9f9f9;
      }
      .checko {
        flex: 0 auto;
      }
    }
  }

`;

const DropdownOption = ({ optionKey, tags, spec, handleChange, isActive }) => {
  const tagsEl = useRef(null);
  return (
    <label
      ref={tagsEl}
      key={optionKey}
      className={`option ${isActive ? 'active' : ''}`}
      onClick={() => handleChange(spec)}

    >
      <p >{spec.specGroupName}</p>
      {tags.length && tagsEl.current ?
        <EnhanceTooltip
          placement="left"
          target={tagsEl}
        >
          {tags.toString()}
        </EnhanceTooltip> : (null)
      }
    </label>
  );
};
const GroupListDropdown = (props) => {
  const { loading, value: { specGroupName, specGroupID }, disabled } = props;
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownEl = useRef(null);
  const listEl = useRef(null);

  useEffect(() => {
    const $wrap = listEl.current;
    if (!$wrap || !open) return;
    $wrap.focus();
  }, [open]);

  useEffect(() => {
    const onClickOut = (e) => {
      const $wrap = dropdownEl.current;
      if (!$wrap) return;
      const node = e.target;
      const isClickInner = $wrap.contains(node);
      if ($wrap && !isClickInner) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOut);
    return () => {
      document.removeEventListener('mousedown', onClickOut);
    };
  }, [options, open]);

  useEffect(() => {
    const opts = _.groupBy(props.options, o => o.owner);
    setOptions(opts);
  }, [props.options, props.value]);

  const handleChange = (s) => {
    if (typeof (props.onChange) === 'function') {
      setOpen(false);
      props.onChange(s);
    }
  };
  const keys = _.keys(options);

  return (
    <SpecGroupDropdown
      className="option-dropdown"
      disabled={disabled}
      open={open}
      innerRef={dropdownEl}
    >
      <div
        className="option-wrap"
        onKeyDown={() => { }}
        onClick={() => { setOpen(true); }}
      >
        <p className="option-value">
          {specGroupName || '--'}
        </p>
      </div>
      <div className="option-arrow" />
      <div className="option-list" ref={listEl}>
        {
          keys.length ?
            keys.map((k, i) => {
              const specList = R.path([k], options);
              return (
                <React.Fragment key={i}>
                  <label
                    key={i}
                    className="option option-head"
                  >
                    <p>{k}</p>
                  </label>
                  {
                    specList.map((s, j) => {
                      const isActive = specGroupID ? specGroupID === s.specGroupID : false;
                      const { specGroup } = s;
                      const tags = _.concat(..._.keys(specGroup).map(skey => R.path([skey], specGroup)));
                      return (<DropdownOption key={j} optionKey={j} tags={tags} spec={s} handleChange={handleChange} isActive={isActive} />);
                    })
                  }
                </React.Fragment>
              );
            }) :
            <p className="no-data">NO DATA</p>
        }
      </div>
    </SpecGroupDropdown>

  );
};

GroupListDropdown.defaultProps = {
  label: '',
  value: [],
  options: [],
  onChange: () => { },
  disabled: false
};

export default GroupListDropdown;
