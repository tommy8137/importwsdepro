import React, { Fragment } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import Field from '~~elements/Field';
import _get from 'lodash/get';
import StringInput from '~~features/Database/components/StringInput';

const columns = props => {
  const { editMode, handleOnEditItem } = props;
  return [
    {
      dataIndex: 'type_name',
      title: 'Item',
      sorter: !editMode,
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      sorter: !editMode,
      render: (val, record, index) => {
        return editMode ?
          <StringInput
            maxLength={400}
            onChange={(value) => handleOnEditItem(value, record, 'remark')}
            value={val}
          /> : val;
      }
    },
  ];
};

export default columns;
