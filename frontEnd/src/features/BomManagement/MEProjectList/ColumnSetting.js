import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import ParagraphTooltip from '~~elements/ParagraphTooltip';
import MEBomTableActionPopover from './MEBomTableActionPopover';


const ColumnSetting = (props) => [
  // {// TODO: 需要API配合
  //   title: '',
  //   dataIndex: 'star',
  //   key: 'star',
  //   width: '1rem',
  //   align: 'center',
  //   render: (val, record) => {
  //     return (
  //       <StarIcon icon="IcoStar" width="1.5rem"/>
  //     );
  //   }
  // },
  {
    title: 'Number',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: '8%'
  },
  {
    title: 'Project Name',
    dataIndex: 'project_name',
    key: 'project_name',
    sorter: true,
    width: '15%',
    render: (val, record) => {
      return (
        <ParagraphTooltip
          val={val}
          content={
            <Fragment>
              <p className="title">Project Name</p>
              <p>{val}</p>
            </Fragment>
          }
        />
      );
    }
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    sorter: true,
    width: '8%'
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    sorter: true,
    width: '10%'
  },
  {
    title: 'Stage',
    dataIndex: 'stage',
    key: 'stage',
    sorter: true,
    width: '6%'
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
    sorter: true,
    width: '8%'
  },
  {
    title: 'SKU Description',
    dataIndex: 'sku_desc',
    key: 'sku_desc',
    sorter: true,
    width: '20%',
    render: (val, record) => {
      return (
        <ParagraphTooltip
          val={val}
          content={
            <Fragment>
              <p className="title">SKU Description</p>
              <p>{val}</p>
            </Fragment>
          }
        />
      );
    }
  },
  {
    title: 'Create Time',
    dataIndex: 'create_time',
    key: 'create_time',
    sorter: true,
    width: '10%',
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    sorter: false,
    width: '6%',
    align: 'center',
    render: (val, record) => {
      const isOwn = record.own_created;
      // 如果不是own_created, 就不能編輯
      return (
        isOwn && <MEBomTableActionPopover record={record} {...props} />
      );
    }
  },
];

export default ColumnSetting;

