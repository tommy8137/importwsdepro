import React, {
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';
import Select from '~~elements/Select';
import CommonUtils from '~~utils/CommonUtils';
import PartlistResource from '~~apis/resource/PartlistResource';
import LabelField from './LabelField';

const SelectFieldForApi = props => {
  const [selectValue, setSelectValue] = useState({ label: '', key: '' });
  const [options, setOptions] = useState([]);
  const {
    name,
    fieldConfig: { label, responseKey },
    isShown,
    fieldConfig,
    disabled,
    dependsValuesData,
  } = props;

  const { url = '', key } = props.fieldConfig;

  const { urlValues = {} } = dependsValuesData;
  const params = CommonUtils.resolveParams(url, { ...urlValues, key });
  const mappedUrl = CommonUtils.resolvePath(url, params);


  useEffect(
    () => {
      if (!mappedUrl || params.filter(p => p !== null && p !== undefined && p !== '').length !== params.length) {
        return;
      }
      PartlistResource.getInputValue(mappedUrl)
        .then(response => {
          if (
            !response.data[responseKey] ||
            !typeof Array.isArray(response.data[responseKey])
          ) {
            setOptions([]);
            return;
          }

          let uniqData = response.data[responseKey].map(item => ({
            label: item,
            value: item
          }));

          uniqData = _.uniqBy(uniqData, item => {
            return item.value;
          });


          setOptions(uniqData);


          if (options.length > 0 && uniqData.length > 0 && uniqData.findIndex(data => data.value === selectValue.value) === -1) {
            setSelectValue({ label: '', key: '' });
          }
        })
        .catch(error => {
          console.error(`[${label}] get value failed >>>>`, error.response);
        });
    },
    [mappedUrl]
  );

  const onChange = option => {
    if (typeof props.onChange === 'function') {
      props.onChange(option.value);
    }
  };
  return (
    isShown ? (
      <React.Fragment>
        <LabelField name={name} fieldConfig={fieldConfig} />
        <Select
          options={options}
          onChange={onChange}
          value={selectValue}
          disabled={disabled}
          placeholder=""
          resetable
          className={`e2e-dropdown---${key}`}
        />
      </React.Fragment>
    ) : null
  );
};

SelectFieldForApi.defaultProps = {
  name: '',
  value: '',
  onChange: () => { },
  fieldConfig: { label: '', require: false, responseKey: 'values' }
};

export default SelectFieldForApi;
