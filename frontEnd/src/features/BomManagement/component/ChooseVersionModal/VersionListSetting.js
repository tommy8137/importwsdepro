import React from 'react';
import moment from 'moment';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';

const columns = props => [
  {
    dataIndex: 'emdm_version',
    key: 'emdm_version',
    title: 'eMDM Version',
    width: '10%',
  },
  {
    dataIndex: 'cost_version',
    key: 'cost_version',
    title: 'Cost\nVersion',
    width: '10%',
  },
  {
    dataIndex: 'approve_time',
    key: 'approve_time',
    title: 'Complete\nDate',
    width: '20%',
    render: (val) => {
      return val ? moment.utc(val).local().format('YYYY-MM-DD HH:mm') : val;
    }
  },
  {
    dataIndex: 'ce_user_name',
    key: 'ce_user_name',
    title: 'CE Modify by ',
    width: '10%',
  },
  {
    dataIndex: 'ce_edit_time',
    key: 'ce_edit_time',
    title: 'Edit Time',
    width: '10%',
  },
  {
    dataIndex: 'sourcer_user_name',
    key: 'sourcer_user_name',
    title: 'Sourcer Modify by',
    width: '10%',
  },
  {
    dataIndex: 'sourcer_edit_time',
    key: 'sourcer_edit_time',
    title: 'Edit Time',
    width: '10%',
  },
  {
    dataIndex: 'edit_history',
    key: 'edit_history',
    title: 'Edit History',
    width: '5%',
    render: (val, record) => {
      if (Array.isArray(val) && val.length <= 0) return null;
      return (
        <Icon
          icon={IconName.BtnDiration}
          size="1.25rem"
          onClick={e => {
            e.stopPropagation();
            props.onOpenHistoryModal(val, record);
          }}
        />
      );
    }
  },
  {
    dataIndex: 'is_next_version',
    key: 'is_next_version',
    title: 'Action',
    // width: '20%',
    align: 'center',
    render: (isNextVersion, record) => {
      const { onClickNextVersion } = props;
      return isNextVersion && (
        <Button
          mini
          round
          onClick={e => {
            e.stopPropagation();
            onClickNextVersion(record);
          }}
        >
          Next Version
        </Button>
      );
    }
  },
];

export default columns;
