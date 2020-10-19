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

function VersionModal(props) {
  const { selected, data = [], onChange = () => { } } = props;

  function handleChangeMeRadio(newSelectedMe) {
    onChange(newSelectedMe);
  }

  return (
    <VersionBox>
      <div className="version-header">
        <p>Cost Version</p>
      </div>
      <div className="version-list">
        {data.length <= 0 && <p className="nodata-text">No Data</p>}
        {
          data.map((record, i) => {
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
    </VersionBox>
  );
}
export default VersionModal;
