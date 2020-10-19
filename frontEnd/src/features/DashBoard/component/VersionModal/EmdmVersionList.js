import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';
import _groupBy from 'lodash/groupBy';
import _transform from 'lodash/transform';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';
import * as R from 'ramda';
import Button from '~~elements/Button';
import Select from '~~elements/Select';
import Radio from '~~elements/Radio';
import { VersionBox } from './VersionModalStyle';

function sortFn(a = '', b = '') {
  const aOrder = _get(a.split('_'), ['0'], 0);
  const bOrder = _get(b.split('_'), ['0'], 0);
  return bOrder - aOrder;
}

function VersionModal(props) {
  const [filteredEmdm, setFilteredEmdm] = useState('');
  const [emdmOptions, setEmdmOptions] = useState([]);
  const { selected, data = [], onChange = () => { } } = props;
  const filteredData = data.filter(obj => obj.emdm_version === filteredEmdm);

  useEffect(() => {
    // 當emdm version list更新時，製作新的filter下拉
    const emdmVersionGroup = _groupBy(data, obj => _get(obj, 'emdm_version', ''));
    const emdmVersionGroupKeys = Object.keys(emdmVersionGroup);
    const sortedEmdmVersionKeys = R.sort(sortFn, emdmVersionGroupKeys);
    const newEmdmOptions = sortedEmdmVersionKeys.reduce((prev, groupKey) => {
      if (groupKey) {
        const opt = { label: groupKey, value: groupKey };
        return prev.concat(opt);
      }
      return prev;
    }, []);
    setEmdmOptions(newEmdmOptions);
    if (newEmdmOptions.length > 0) {
      setFilteredEmdm(newEmdmOptions[0].value);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    // 當切換不同版本下拉的時候，目前選擇的me selector的值
    onChange('');
  }, [filteredEmdm]);


  function handleChangeMeRadio(newSelectedMe) {
    onChange(newSelectedMe);
  }

  function handleEmdmFilterChange(opt) {
    setFilteredEmdm(opt.value);
  }
  return (
    <VersionBox>
      <div className="version-header">
        <p>Cost Version</p>
        <div className="version-select">
          <div className="version-select">
            <Select
              options={emdmOptions}
              target="box"
              onChange={handleEmdmFilterChange}
              value={{ label: filteredEmdm, value: filteredEmdm }}
              placeholder="Choose Eedm Version"
            />
          </div>
        </div>
      </div>
      <div className="version-list">
        {data.length <= 0 && <p className="nodata-text">No data</p>}
        {
          filteredData.map((record, i) => {
            const isChecked = _get(selected, 'id', '') === record.id && _get(selected, 'sku', '') === record.sku;
            return (
              <div
                className="version-title"
                onClick={() => handleChangeMeRadio(record)}
                onKeyDown={() => { }}
                key={i}
              >
                <Radio
                  className="radio-version"
                  name={record.version}
                  checked={isChecked}
                >
                  {record.version}
                </Radio>
              </div>
            );
          })
        }
      </div>
    </VersionBox >
  );
}
export default VersionModal;
