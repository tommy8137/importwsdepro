import React, { Fragment } from 'react';
import moment from 'moment';
import RoundButton from '~~elements/RoundButton';

const columns = props => [
  {
    dataIndex: 'version',
    key: 'version',
    title: 'Version',
    width: '30%',
  },
  {
    dataIndex: 'status_version',
    key: 'status_version',
    title: <Fragment>Ver.<br />Status</Fragment>,
    width: '20%',
  },
  {
    dataIndex: 'approve_time',
    key: 'approve_time',
    title: 'Approve Date',
    width: '20%',
    render: (val, record) => {
      return val ? moment(val).format('YYYYMMDD') : '';
    }
  },
  {
    dataIndex: 'is_next_version',
    key: 'is_next_version',
    title: 'Action',
    width: '30%',
    align: 'center',
    render: (val, record) => {
      const { id: edmVersionID } = record;

      /**
       * 進版的api
       * @param {*} e click event
       */
      function handleClickNextVersion(e) {
        e.stopPropagation();
        props.onClickNextVersion(edmVersionID);
      }
      // 如果為false就不能進版
      return val && (<RoundButton.BlackButton onClick={handleClickNextVersion}>Next Version</RoundButton.BlackButton>);
    }
  },
];

export default columns;
