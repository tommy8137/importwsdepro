import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import _ from 'lodash';
import * as R from 'ramda';
import { PartlistFormContext } from '~~elements/PartListForm';
import Select from '~~elements/Select';
import LabelField from './LabelField';


const MulitSelectField = props => {
  const [options, setOptions] = useState([]);
  const [selectedList, setValue] = useState([]);
  const {
    name,
    value,
    fieldConfig,
    fieldConfig: {
      key,
      selectorConfig: { values, depends = [] },
    },
    isShown,
    disabled,
  } = props;

  useEffect(() => {
    // 處理下拉選項的depends
    if (R.is(Array, values) && R.is(Array, depends)) {
      const opts = values
        .map(v => {
          return {
            label: v[key],
            value: v[key],
          };
        });
      let uniqData = _.uniqBy(opts, item => item.value);
      setOptions(uniqData);
    }

    const selected = value.map(val => {
      return {
        label: val,
        value: val,
      };
    });
    setValue(selected);
  }, [props.value]);

  const handleOnClose = option => {
    if (typeof props.onChange !== 'function') return;

    const convertSelectedList = option.map(item => item.value);
    props.onChange(convertSelectedList);
  };


  return isShown ? (
    <div>
      <LabelField name={name} fieldConfig={fieldConfig} disabled={disabled} />
      <Select
        options={options}
        onClose={handleOnClose}
        value={selectedList}
        disabled={disabled}
        isMulti={true}
        onChange={() => {}}
        placeholder=""
        className={`e2e-multi-dropdown---${key}`}
      />
    </div>
  ) : (<div />);
};

MulitSelectField.defaultProps = {
  name: '',
  value: '',
  onChange: () => { },
  fieldConfig: {
    label: '',
    require: false,
    selectorConfig: { values: [], options: [], depends: [] }
  }
};

export default MulitSelectField;
