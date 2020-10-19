import React from 'react';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';

const SideTable = props => {
  const { csdb, date, onSave, columns, showEdit, placeholder } = props;

  const {
    // For table
    isEditMode,
    setEditMode,
    mainTableList,
    editModeList,
    handleTableChange,
    handleSetEditMode,
    differenceList,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For selected row
    setSelectedRowId,
  } = csdb;

  /**
   * 點擊table row時，取得該material spec裡面的material list
   */
  function handleRowClick(event, record) {
    if (!isEditMode) {
      setSelectedRowId(record.id);
    }
  }

  /**
   * 更新table的api
   */
  function handleSave() {
    setEditMode(false);
    onSave(differenceList);
  }

  return (
    <InnerContainer isSubContainer>
      <div className="inner-content">
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="22rem"
              placeholder={placeholder}
              value={keyword}
              onInputChange={setKeyword}
              onSearch={() => {
                handleSearch();
                setSelectedRowId('');
              }}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
          </InlineBtns>
          {isEditMode ? (
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button round color="black" onClick={() => handleSetEditMode(false)}>
                Cancel
              </Button>
              <Button round color="green" onClick={handleSave}>
                Save
              </Button>
            </InlineBtns>
          ) : (
            /* 非編輯狀態的Btns */
            <InlineBtns>
              {/* 修改 */}
              {showEdit && <Icon icon={IconName.BtnEditGroup} size="2rem" onClick={() => handleSetEditMode(true)} disabled={mainTableList.length === 0 || !date.nextId} />}
            </InlineBtns>
          )}
        </div>
        <Table
          rowKey="id"
          headerColor="blue"
          hoverColor="blue"
          columns={columns}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
          onRow={record => {
            return {
              onClick: event => handleRowClick(event, record),
            };
          }}
        />
      </div>
    </InnerContainer>
  );
};

SideTable.defaultProps = {
  date: {},
  onSave: () => {},
  showEdit: false,
};

export default SideTable;
