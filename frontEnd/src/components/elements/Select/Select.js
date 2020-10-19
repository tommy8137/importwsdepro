import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _findIndex from 'lodash/findIndex';
import _omit from 'lodash/omit';
import _remove from 'lodash/remove';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import ReactSelect from 'react-select';
import Popper from '~~elements/Popper';

import SelectStyles from './selectStyles';
import Control from './Control';
import Option from './Option';
import TargetComponent from './TargetComponent';


const SelectContainer = styled.div`
  border-radius: 4px;
  margin-top: 1px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #555;
  margin-top: 4px;
`;


const TargetBox = styled.div`
  display: block;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

// 已選全部
const hasAll = (selectedValues, allValues) => {
  if (!selectedValues ||
    selectedValues.length === 0 ||
    allValues.length === 0) {
    return false;
  }
  const result = allValues.reduce((prev, curr) => {
    return prev && _findIndex(selectedValues, o => o.value === curr.value) >= 0;
  }, true);

  return result;
};

// 已選部份
const hasPart = (selectedValues, allValues) => {
  if (!selectedValues ||
    selectedValues.length === 0 ||
    allValues.length === 0) {
    return false;
  }
  const result = allValues
    .reduce((prev, curr) =>
      (prev || _findIndex(selectedValues, o => o.value === curr.value) >= 0), false);


  return result && !hasAll(selectedValues, allValues);
};

/* *******************************
 * 主程式
 * ****************************** */
export default function SelectComponent(props) {
  const {
    className = 'react-select',
    target = '',
    isMulti,
    label,
    placeholder,
    disabled,
    alignRight,
    border,
    innerRef,
    resetable,
    isInvalid,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(props.value);
  const [options, setOptions] = useState(props.options);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleOpen = () => {
    if (isOpen && value) {
      props.onClose(value);
      setInputValue('');
    }
    setOpen(!isOpen || props.target === 'none');
  };

  function handleClose() {
    setOpen(false);
    setInputValue('');
    if (typeof props.onClose === 'function' && value) {
      props.onClose(value);
    }
  }

  useEffect(() => {
    setOptions(props.options);
    setValue(props.value);
    setIndeterminate(hasPart(props.value, props.options));
    setSelectAll(hasAll(props.value, props.options));
    setInputValue(inputValue); // 不知道為什麼值會不見，必須再set state一次 QQ
    // props.onChange(props.value);
  }, [
    JSON.stringify(props.options),
    JSON.stringify(props.value)
  ]);

  useEffect(() => {
    if (!props.onInputChange && props.options.length > 0) {
      // 前端過濾keyword
      const filterOptions = (option) => {
        const originLabel = _get(option, 'label', '');
        const labelToString = originLabel == null ? '' : String(originLabel).toLowerCase();
        const result = labelToString.indexOf(inputValue.toLowerCase()) > -1;
        return result;
      };
      const filterResult = inputValue
        ? props.options.filter(filterOptions)
        : props.options;
      setOptions(filterResult);
      setIndeterminate(hasPart(value, filterResult));
      setSelectAll(hasAll(value, filterResult));
    }
  }, [inputValue]);


  const onSelectChange = oriSelectedValues => {
    // console.log('onSelectChange', oriSelectedValues);
    // 要濾掉不存在於下拉中的選項
    const filterExtra = selected => _includes(JSON.stringify(props.options), JSON.stringify(selected));
    const selectedValues = isMulti ? oriSelectedValues.filter(filterExtra) : oriSelectedValues;
    setValue(selectedValues);
    setIndeterminate(hasPart(selectedValues, options));
    setSelectAll(hasAll(selectedValues, options));
    setInputValue(inputValue); // 不知道為什麼值會不見，必須再set state一次 QQ
    props.onChange(selectedValues);
    if (!isMulti) {
      toggleOpen();
    }
  };

  const handleInputChange = text => {
    if (props.onInputChange) {
      // 如果要使用input change的話，option也要一併由props控制
      props.onInputChange(text);
    }
    setInputValue(text);
  };

  const handleSelectAll = (isAll) => {
    const result = !value ? [] : [...value];
    if (isAll) {
      options.forEach((opt) => {
        if (_findIndex(result, opt) < 0) {
          result.push(opt);
        }
      });
    } else {
      options.forEach((opt) => {
        _remove(result, o => o.value === opt.value);
      });
    }
    setValue(result);
    setIndeterminate(hasPart(options, options));
    setSelectAll(isAll);
    props.onChange(result);
  };


  /**
   * 清空選擇的值
   */
  const handleTargetReset = (e) => {
    onSelectChange(isMulti ? [] : { value: null, label: null, allValues: [...options] });
    toggleOpen();
  };

  /**
   * 點開下拉選單
   */
  const handleTargetOnClick = (e) => {
    toggleOpen();

    // 如果有設定onOpen才會繼續執行onOpen
    if (typeof props.onOpen !== 'function') return;
    props.onOpen();
  };

  const targetProps = {
    onClick: handleTargetOnClick,
    value,
    isMulti,
    label,
    placeholder,
    disabled,
    border,
    isOpen,
    innerRef,
    onReset: handleTargetReset,
    resetable,
    isInvalid,
    className,
  };
  const extendsProps = { target, ...targetProps, };

  return (
    <Popper
      disabled={disabled}
      onClose={handleClose}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      minPropperWidth={120}
      target={p => {
        const { ref, ...rest } = p;
        return (
          <TargetBox innerRef={ref} {...rest}>
            <TargetComponent {...extendsProps} />
          </TargetBox>
        );
      }}
    >
      <SelectContainer>
        <ReactSelect
          classNamePrefix="react-select"
          isOpen
          autoFocus
          isMulti={isMulti}
          backspaceRemovesValue={false}
          components={{
            Control,
            Option: isMulti ? Option.CheckboxOption : Option.LabelOption,
          }}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          isClearable

          onChange={onSelectChange}
          // menu相關
          menuIsOpen={true}
          options={options}
          placeholder="Search..."
          styles={SelectStyles}
          tabSelectsValue={false}
          value={value}
          onInputChange={handleInputChange}
          controlSetting={{
            selectAll,
            indeterminate,
            onSelectAll: handleSelectAll,
            inputValue,
          }}
        />
      </SelectContainer>
    </Popper>
  );
}

SelectComponent.defaultProps = {
  isOpen: false,
  /* 顯示有checkbox的option、select all */
  isMulti: false,
  /* 已選的 */
  value: null,
  /* 當filter input輸入值的時候callback */
  onInputChange: null,
  /* 下拉選單內容 */
  options: [],
  /* check 或 選擇下拉任一項目時callback */
  onChange: selected => { /*  console.log('onChange', selected);  */ },
  onClose: selected => { /* console.log('onClose', selected) */ },
  onOpen: null,
  /* 'field': 只有底線，可以使用label | 'box': 完整框起來 | 'button': 按鈕，label值帶入按鈕text中 | 'none': 無 */
  target: 'field',
  /* field的title / 按鈕的文字 */
  label: '',
  /* 給target的 不是給搜尋的 */
  placeholder: 'Choose...',
  /* target 的disable */
  disabled: false,
  /* 選單與target的對齊 */
  alignRight: false,
  /* target的border (主要for filter bar) */
  border: true,
  /** 給tooltip用 */
  innerRef: null,
  /* 是否可以Reset選擇項目 */
  resetable: false,
  /* 欄框是否變紅色 */
  isInvalid: false,
};

const TARGET = {
  FIELD: 'field',
  BOX: 'box',
  BUTTON: 'button',
  NONE: 'none',
};

export { TARGET };

// ref: https://codesandbox.io/s/m75wlyx3oy
// ref: https://codesandbox.io/s/p5k5198kpm
// ref: https://codesandbox.io/s/interesting-torvalds-whuz3?fontsize=14
