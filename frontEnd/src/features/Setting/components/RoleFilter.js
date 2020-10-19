import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from '~~elements/Icon';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import Field from '~~elements/Field';
import * as SettingActions from '../SettingActions';


const RoleFilter = (props) => {
  const {
    filterBarInfo: { roleGroup, roleGroupOptions, roleName, roleNameOptions },
    resetFilterBarInfo,
    updateRoleGroup,
    updateRoleName,
    getRoleGroupOptions,
    getRoleNameOptions,
    onFilter,
    width,
    showRoleDropdown,
    showSearch,

    keyword,
    updateKeyword,
    handleResetFilterBar
  } = props;

  useEffect(() => {
    getRoleGroupOptions();

    // reset filter bar info
    return () => resetFilterBarInfo();
  }, []);

  // 當選擇role group時
  function onMenu1Change(value) {
    const newRoleGroup = value.map(item => item.value);
    updateRoleGroup(newRoleGroup);
    // call api 拿role name下拉清單
    if (newRoleGroup.length === 1) {
      getRoleNameOptions(newRoleGroup);
    }
  }

  // 當選擇role name時
  function onMenu2Change(value) {
    const { value: newRoleName } = value;
    updateRoleName(newRoleName);
  }

  // 按下Function Btn時
  function handleSearch() {
    const filterInfo = {
      role_group: roleGroup.join(','),
      role_name: roleName
    };
    onFilter(filterInfo);
  }

  function handleReset() {
    resetFilterBarInfo();
    const filterInfo = {
      role_group: '',
      role_name: ''
    };
    onFilter(filterInfo);
    handleResetFilterBar({
      role_group: '',
      role_name: '',
      keyword: ''
    });
  }

  /**
   * 當輸入關鍵字時
   */
  function handleInputChange(e) {
    const { target: { value } } = e;
    updateKeyword(value);
  }

  /**
   * 檢查search是否要disabled
   */
  function checkDisableSearch() {
    if (!(roleGroup.length > 0 || keyword)) return true;
    return false;
  }

  function handleKeyPress(e) {
    if (e.key.toUpperCase() === 'ENTER') {
      handleSearch();
    }
  }
  return (
    <FilterBarPanel
      width={width}
      onReset={handleReset}
      filterDisabled={checkDisableSearch()}
      onFilter={handleSearch}
    >
      <FilterBarGroup icon={<Icon icon="IcoFilterBarFilter" />}>
        <FilterBarBox>
          <Select
            placeholder="Role Group"
            value={roleGroup.map(val => ({ label: val, value: val }))}
            options={roleGroupOptions}
            onChange={onMenu1Change}
            isMulti={true}
            target="box"
            border={false}
          />
        </FilterBarBox>
        {
        showRoleDropdown && (
          <FilterBarBox>
            <Select
              placeholder="Role Name"
              value={{ label: roleName, value: roleName }}
              options={roleNameOptions}
              onChange={onMenu2Change}
              disabled={!(roleGroup.length === 1)}
              target="box"
              border={false}
            />
          </FilterBarBox>
        )
      }
      </FilterBarGroup>
      {showSearch &&
      <FilterBarGroup width="65%" icon={<Icon icon="IcoFilterBarSearch" />}>
        <Field.Input
          styledType="filterBar"
          placeholder="請輸入人名、工號或分機"
          value={keyword}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </FilterBarGroup>
    }
    </FilterBarPanel>
  );
};

RoleFilter.defaultProps = {
  width: '100%',
  onFilter: () => {},
  showRoleDropdown: true,
  showSearch: true,
  updateKeyword: () => {},
  handleResetFilterBar: () => {},
};

export default connect(
  (state) => {
    return {
      filterBarInfo: state.setting.filterBarInfo,
    };
  },
  {
    resetFilterBarInfo: SettingActions.resetFilterBarInfo,
    getRoleGroupOptions: SettingActions.getRoleGroupOptions,
    getRoleNameOptions: SettingActions.getRoleNameOptions,
    updateRoleGroup: SettingActions.updateRoleGroup,
    updateRoleName: SettingActions.updateRoleName,
  }
)(RoleFilter);
