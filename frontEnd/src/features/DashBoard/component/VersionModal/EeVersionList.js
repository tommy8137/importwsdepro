import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';
import _groupBy from 'lodash/groupBy';
import _transform from 'lodash/transform';
import _find from 'lodash/find';

import Button from '~~elements/Button';
import Select from '~~elements/Select';
import Radio from '~~elements/Radio';
import { VersionBox } from './VersionModalStyle';


function EeVersionList(props) {
  const { selected, data = [], onChange = () => { } } = props;
  const [filteredPlatform, setFilteredPlatform] = useState('');
  const [pcbnoStageList, setPcbnoStageList] = useState([]);

  useEffect(() => {
    // 用pcbno_stage_sku_version對列表進行分組
    const pcbnoStageGroups = _groupBy(data, (obj) => {
      const { pcbno, stage, sku, version } = obj;
      // pcbno 有可能是null, 跟project list一致
      return `${pcbno || 'NA'}_${stage}_${sku}_${version}`;
    });
    // 給table使用的list
    const newPcbnoStageList =
      _transform(pcbnoStageGroups, (result, value, key) => {
        return result.push({
          // 組成的新的key
          pcbno_stage_sku_version: key,
          detail: value.filter(obj =>
            // 舊的eebom的platform 有可能是 null, 但groupby出來的platformName是字串null
            obj.platform === filteredPlatform || (filteredPlatform === 'null' && obj.platform === null)
          )
        });
      }, []);
    setPcbnoStageList(newPcbnoStageList);
  }, [JSON.stringify(data), filteredPlatform]);


  function handleChangeEeRadio(newSelectedEe) {
    onChange(newSelectedEe);
  }

  function handleEeFilterChange({ label, value }) {
    setFilteredPlatform(value);
  }


  // 如果detail裡面是空的就不顯示
  const filteredPcbnoStageList = pcbnoStageList.filter(obj => obj.detail.length);
  // platform groupby的字串array
  const platformGroupNames = Object.keys(_groupBy(data, 'platform'));
  // 給下拉用的options
  const platformOptions = platformGroupNames.map(platformName => ({ label: platformName, value: platformName }));
  // 給eebom version用的list, 過濾掉下拉的fitler

  return (
    <VersionBox>
      <div className="version-header">
        <p>Cost Version</p>
        <div className="version-select">
          <Select
            options={platformOptions}
            target="box"
            onChange={handleEeFilterChange}
            value={{ label: filteredPlatform, value: filteredPlatform }}
            placeholder="Choose Platform"
          />
        </div>
      </div>
      <div className="version-list">
        {filteredPcbnoStageList.length <= 0 && <p className="nodata-text">Please choose platform</p>}
        {
          filteredPcbnoStageList.map((rowData, index) => {
            const { pcbno_stage_sku_version: version, detail = [] } = rowData;
            return (
              <Fragment >
                <div className="version-title">
                  <p>{version}</p>
                </div>
                <div className="version-detail">
                  {
                    detail.map((record, i) => {
                      const isChecked =
                        _get(selected, 'id', '') === record.id &&
                        _get(selected, 'sku', '') === record.sku;

                      return (
                        <div
                          className="version-item"
                          onClick={() => handleChangeEeRadio(record)}
                          onKeyDown={() => { }}
                          key={i}
                        >
                          <Radio
                            className="radio-version"
                            name={record.version}
                            checked={isChecked}
                          >
                            {record.version_num}
                          </Radio>
                        </div>
                      );
                    })
                  }
                </div>
              </Fragment>
            );
          })
        }
      </div>
    </VersionBox>
  );
}
export default EeVersionList;
