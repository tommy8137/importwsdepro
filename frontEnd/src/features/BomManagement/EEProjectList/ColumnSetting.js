import React, { Fragment } from 'react';
import moment from 'moment';
import Icon from '~~elements/Icon';
import * as R from 'ramda';
import ParagraphTooltip from '~~elements/ParagraphTooltip';
import EEBomTableActionPopover from './EEBomTableActionPopover';

const columns = props => [
  // TODO: 需要API配合
  // {
  //   dataIndex: 'star',
  //   title: '',
  //   width: '3%',
  //   render: (val, record) => <div />
  //   // render: (val, record) => <Icon icon="IcoStar" width="1.5rem" />
  // },
  {
    dataIndex: 'customer',
    key: 'customer',
    title: 'Customer',
    width: '8%',
    sorter: true,
  },
  {
    dataIndex: 'product_type',
    key: 'product_type',
    title: 'Product\nType',
    width: '7%',
    sorter: true,
    render: (val, record) => {
      return (
        <ParagraphTooltip
          val={val}
          content={
            <Fragment>
              <p className="title">Product Type</p>
              <p>{val}</p>
            </Fragment>
          }
        />
      );
    }
  },
  {
    dataIndex: 'project_code',
    key: 'project_code',
    title: 'Project Code',
    width: '10%',
    sorter: true,
  },
  {
    dataIndex: 'project_name',
    key: 'project_name',
    title: 'Project Name',
    width: '10%',
    sorter: true,
    config: { isHint: true },
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
  // 新的eebom欄位
  {
    dataIndex: 'platform',
    key: 'platform',
    title: 'Platform',
    width: '7%',
    sorter: true,
    render: (val, record) => {
      // TODO: 需要api多傳欄位
      const platform = R.path(['platform'], val);
      const panelSize = R.path(['panel_size'], val);
      return (
        <ParagraphTooltip
          val={platform}
          content={
            <Fragment>
              <p className="title">Platform</p>
              <p>{platform}</p>
              <p className="title">Key Factor(Panel size; L)</p>
              <p>{panelSize}</p>
            </Fragment>
          }
        />
      );
    }
  },
  {
    dataIndex: 'sku',
    key: 'sku',
    title: 'SKU',
    width: '5%',
    sorter: true,
  },
  // 新的eebom欄位
  // TODO: PCB No. + "_" + Stage 欄位合併
  {
    dataIndex: 'pcbno_stage',
    key: 'pcbno_stage',
    title: 'PCB\nNo._Stage',
    width: '8%',
    sorter: true,
  },
  // 原本叫version 改成 Ver. status
  {
    dataIndex: 'version',
    key: 'version',
    title: 'Ver.\nStatus',
    width: '6%',
    sorter: true,
  },
  {
    dataIndex: 'create_time',
    key: 'create_time',
    title: 'Create Date',
    width: '9%',
    sorter: true,
    render: (text, record, index) => (
      record.create_time ?
        moment(record.create_time).format('YYYYMMDD') :
        ''),
  },
  {
    dataIndex: 'approve_time',
    key: 'approve_time',
    title: 'Approve Date',
    width: '9%',
    sorter: true,
    render: (text, record, index) => (
      record.approve_time ?
        moment(record.approve_time).format('YYYYMMDD') :
        ''),
  },
  {
    dataIndex: '',
    key: '',
    title: 'Action',
    width: '4%',
    render: (text, record, index) => {
      return <EEBomTableActionPopover record={record} />;
    },
  }
];
export default columns;
