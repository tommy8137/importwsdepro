import React from 'react';
import Select, { TARGET } from '~~elements/Select';

// 全部的site
const allSiteList = (list) => list.map(({ id: value, site_name: label }) => ({ value, label }));

// 編輯狀態時選的
const selectedSites = (list) => list.map(({ siteId: value, siteName: label }) => ({ value, label }));


const getColumns = props => {
  const {
    isEditMode,
    checkboxColumn,
    handleOnEditItem,
    allSite,
    idColumn,
  } = props;

  return [
    // checkboxColumn,
    idColumn,
    {
      dataIndex: 'siteList',
      title: 'Site Group',
      width: '80%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
      render: (val, record, index) => {
        const options = allSiteList(allSite);
        const selected = selectedSites(val);
        return (
          isEditMode ?
            <div style={{ width: '20rem' }}>
              <Select
                options={options}
                value={selected}
                target={TARGET.BOX}
                isMulti
                onClose={results => {
                  const data = results.map(({ value: siteId, label: siteName, }) => ({ siteId, siteName }));
                  handleOnEditItem(data, record.id, 'siteList');
                }}
              />
            </div> :
            val.map(({ siteName }) => siteName).join(', ')
        );
      },
    },
  ];
};

export default getColumns;
