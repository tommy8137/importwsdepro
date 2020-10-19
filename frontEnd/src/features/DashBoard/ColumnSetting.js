import React, { Fragment } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import _get from 'lodash/get';
import ParagraphTooltip from '~~elements/ParagraphTooltip';
import DashBoardTableActionPopover from './component/DashBoardTableActionPopover';


const CountContainer = styled.div`
  p {
    margin: 0 0.5rem 0 0;
  }
  p, .icon {
    display: inline-block;
    vertical-align: middle;
  }
`;

// EE
export const columns = props => [
  {
    dataIndex: 'customer',
    key: 'customer',
    title: 'Customer',
    width: '10%'
  },
  {
    dataIndex: 'project_name',
    key: 'project_name',
    title: 'Project Name',
    width: '15%',
    render: (val, record) => {
      return (
        <ParagraphTooltip
          val={record.project_name}
          content={
            <Fragment >
              <p className="title">Project Name</p>
              <p>{record.project_name}</p>
            </Fragment >
          }
        />);
    }
  },
  {
    dataIndex: 'project_code',
    key: 'project_code',
    title: 'Project Code',
    width: '10%'
  },
  // {
  //   dataIndex: 'stage',
  //   key: 'stage',
  //   title: 'Stage (EE/ME)',
  //   align: 'center',
  //   width: '15%',
  //   render: (val, record) => {
  //     const { stage: { ee: eeStage, me: meStage } } = record;
  //     return `${eeStage || '-'}/${meStage || '-'}`;
  //   }
  // },
  {
    dataIndex: 'version',
    key: 'version',
    title: 'Version (EE/ME)',
    align: 'center',
    width: '10%',
    render: (val, record) => {
      const { version: { ee: eeVersion, me: meVersion } } = record;
      return `${eeVersion || '-'}/${meVersion || '-'}`;
    }
  },
  // {
  //   dataIndex: 'version_remark',
  //   key: 'version_remark',
  //   title: 'Version Remark (EE)',
  //   width: '20%',
  //   render: (val, record) => {
  //     return (
  //       <ParagraphTooltip
  //         val={record.version_remark}
  //         content={
  //           <Fragment >
  //             <p className="title">Version Remark (EE)</p>
  //             <p>{record.version_remark}</p>
  //           </Fragment >
  //         }
  //       />);
  //   }
  // },
  {
    dataIndex: 'sku_description',
    key: 'sku_description',
    title: 'SKU Description (ME)',
    width: '20%',
    render: (val, record) => {
      return (
        <ParagraphTooltip
          val={record.sku_description}
          content={
            <Fragment >
              <p className="title">SKU Description (ME)</p>
              <p>{record.sku_description}</p>
            </Fragment >
          }
        />);
    }
  },
  {
    dataIndex: 'action',
    key: 'action',
    title: 'Action',
    width: '6%',
    align: 'center',
    render: (val, record, rowIndex) => {
      const disabled = !_get(record, 'project_code', null);
      return <DashBoardTableActionPopover {...props} record={record} disabled={disabled} />;
    }
  },
  {
    dataIndex: 'count',
    key: 'count',
    title: '',
    width: '6%',
    align: 'center',
    render: (val, record, rowIndex) => {
      const { expandedRows } = props;
      const count = record.detail.length;
      const isExpanded = expandedRows.includes(rowIndex);
      return count ?
        (
          <CountContainer>
            <p>{count ? `(${count})` : null}</p>
            <Icon icon={isExpanded ? IconName.IconArrowUpBlack : IconName.IconArrowDownBlack} size="0.8rem" />
          </CountContainer>
        ) : null;
    }
  },
];


// 展開的子項目
export const expandingColumns = props => [
  {
    dataIndex: 'platform',
    key: 'platform',
    title: 'Platform',
    render: (val, record) => {
      const { ee: { platform, panel_size: panelSize } } = record;
      return platform ?
        (<ParagraphTooltip
          val={platform}
          content={
            <Fragment >
              <p className="title">Platform</p>
              <p>{platform}</p>
              <p className="title">Key Factor(Panel size; L)</p>
              <p>{panelSize}</p>
            </Fragment >
          }
        />) : '-';
    }
  },
  // panel_size 刪除
  // {
  //   dataIndex: 'panel_size',
  //   key: 'panel_size',
  //   title: 'Panel Size',
  //   render: (val, record) => {
  //     return (
  //       <ParagraphTooltip
  //         val={record.ee.panel_size}
  //         content={
  //           <Fragment >
  //             <p className="title">Panel Size</p>
  //             <p>{record.ee.panel_size}</p>
  //           </Fragment >
  //         }
  //       />);
  //   }
  // },
  {
    dataIndex: 'eeSku',
    key: 'eeSku',
    title: 'EE SKU',
    render: (val, record) => {
      return record.ee.sku || '-';
    }
  },
  // eebom 的 pcb_nostage
  {
    dataIndex: 'stage',
    key: 'stage',
    title: 'PCB No._Stage',
    render: (val, record) => {
      return record.ee.stage || '-';
    }
  },
  {
    dataIndex: 'eeVersion',
    key: 'eeVersion',
    title: 'EE Version',
    render: (val, record) => {
      return record.ee.version || '-';
    }
  },
  {
    dataIndex: 'eeVerStatus',
    key: 'eeVerStatus',
    title: 'EE Ver Status',
    render: (val, record) => {
      return record.ee.status_version || '-';
    }
  },
  {
    dataIndex: 'meSku',
    key: 'meSku',
    title: 'ME SKU',
    render: (val, record) => {
      return record.me.sku || '-';
    }
  },
  {
    dataIndex: 'meVerStatus',
    key: 'meVerStatus',
    title: 'ME Ver Status',
    render: (val, record) => {
      return record.me.version || '-';
    }
  },
];

