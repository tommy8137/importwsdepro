import React, { Fragment } from 'react';
import ParagraphTooltip from '~~elements/ParagraphTooltip';
import EMDMBomTableActionPopover from './EMDMBomTableActionPopover';
import EmdmPinStar from '../component/EmdmPinStar';

const ColumnSetting = props => [
  {
    title: 'Pinned',
    dataIndex: 'fav_id',
    key: 'fav_id',
    sorter: true,
    width: '5%',
    render: (val, record) => <EmdmPinStar data={record} pinId={val} />
  },
  {
    title: 'No',
    dataIndex: 'id',
    key: 'id',
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
    title: 'Project Code',
    dataIndex: 'project_code',
    key: 'project_code',
    sorter: true,
    width: '15%',
    render: (val, record) => {
      return val;
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
    title: 'Stage',
    dataIndex: 'stage',
    key: 'stage',
    sorter: true,
    width: '6%'
  },
  {
    title: 'Site',
    dataIndex: 'site',
    key: 'site',
    sorter: true,
    width: '6%'
  },
  {
    title: 'Cost\nVersion',
    dataIndex: 'cost_version',
    key: 'cost_version',
    // sorter: true,
    width: '8%'
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
      // 如果不是own_created, 就不能編輯
      return (
        <EMDMBomTableActionPopover record={record} />
      );
    }
  },
];

export default ColumnSetting;

