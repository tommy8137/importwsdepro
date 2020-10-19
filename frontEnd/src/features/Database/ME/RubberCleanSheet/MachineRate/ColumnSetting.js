import React from 'react';
import { comma } from '~~utils/Math';
import Field from '~~elements/Field';

const columns = props => {
  const {
    isEditMode,
    date,
    handleOnEditItem,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'item',
      title: '項目',
      align: 'center',
      width: '9%',
      sorter: !isEditMode,
      defaultSortOrder: 'ascend',
    },
    {
      dataIndex: date.last,
      title: date.last || '－',
      width: '27%',
      align: 'center',
      children: [
        {
          dataIndex: 'last.l',
          title: 'L',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'last.w',
          title: 'W',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'last.cost',
          title: '(USD$/Min)',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
      ]
    },
    {
      dataIndex: date.current,
      title: date.current || '－',
      width: '27%',
      align: 'center',
      children: [
        {
          dataIndex: 'current.l',
          title: 'L',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'current.w',
          title: 'W',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
        {
          dataIndex: 'current.cost',
          title: '(USD$/Min)',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.lastId,
          render: (val) => comma(val, 8, '－')
        },
      ]
    },
    {
      dataIndex: date.next,
      title: date.next || '－',
      align: 'center',
      width: '27%',
      children: [
        {
          dataIndex: 'next.l',
          title: 'L',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <Field.ConvertInput
                dataType="float"
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.l')}
              /> :
              comma(val, 8, '－')),
        },
        {
          dataIndex: 'next.w',
          title: 'W',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <Field.ConvertInput
                dataType="float"
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.w')}
              /> :
              comma(val, 8, '－')),
        },
        {
          dataIndex: 'next.cost',
          title: '(USD$/Min)',
          width: '9%',
          align: 'center',
          sorter: !isEditMode && date.nextId,
          render: (val, record) => (
            isEditMode ?
              <Field.ConvertInput
                dataType="float"
                value={val}
                onChange={(value) => handleOnEditItem(value, record.id, 'next.cost')}
              /> :
              comma(val, 8, '－')),
        },
      ]
    },
  ];
};

export default columns;
