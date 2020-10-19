import React, { Fragment } from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';
import { comma, round } from '~~utils/Math';
import Icon, { IconName } from '~~elements/Icon';

const InlineIconText = styled.div`
  p {
    margin:0;
    margin-right: 0.5rem;
  }
  p,
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
`;
const columns = props => {
  const {
    date,
    isEditMode,
    handleOnEditItem,
    dropdownColumns,
    openPaintFormulaPriceModal = () => { }
  } = props;


  return [
    {
      dataIndex: 'name',
      title: 'Name',
      width: 200,
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: 'colorName',
      title: 'Color',
      width: 200,
      sorter: !isEditMode,
    },

    ...dropdownColumns.map(column => {
      return {
        ...column,
        children: [
          {
            dataIndex: `${column.path}.last`,
            title: date.last || '－',
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.lastId,
            render: (val) => comma(val, 8, '－')
          },
          {
            dataIndex: `${column.path}.current`,
            title: date.current || '－',
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.currentId,
            render(val, record) {
              const { id: paintId = '' } = record;
              const vendorId = _get(record, [column.path, 'vendorId'], '');
              const { currentId: dateId } = date;
              const data = {
                paintId,
                vendorId,
                dateId,
              };
              const columnValue = comma(val, 8, '－');
              const showIcon = columnValue !== '－';
              return (
                <InlineIconText>
                  <p>{columnValue}</p>
                  {showIcon &&
                    <Icon
                      icon={IconName.IcoSearchBlack}
                      size="1.5rem"
                      onClick={() => openPaintFormulaPriceModal(data, true)}
                      disabled={!dateId}
                    />}
                </InlineIconText>
              );
            }
          },
          {
            dataIndex: `${column.path}.next`,
            title: date.next || '－',
            width: 120,
            align: 'center',
            sorter: !isEditMode && date.nextId,
            render(val, record) {
              const { id: paintId = '' } = record;
              const vendorId = _get(record, [column.path, 'vendorId'], '');
              const { nextId: dateId } = date;
              const data = {
                paintId,
                vendorId,
                dateId,
              };
              return (
                <InlineIconText>
                  <p>{comma(val, 8, '－')}</p>
                  <Icon
                    icon={IconName.BtnEditGroup}
                    size="1.5rem"
                    onClick={() => openPaintFormulaPriceModal(data)}
                    disabled={!date.nextId}
                  />
                </InlineIconText>
              );
            }
          },
        ]
      };
    })
  ];
};

export default columns;
