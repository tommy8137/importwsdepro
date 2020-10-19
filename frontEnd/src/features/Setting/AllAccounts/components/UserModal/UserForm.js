import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as R from 'ramda';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import Resource from '~~apis/resource';
import Icon from '~~elements/Icon';
import RoundButton from '~~elements/RoundButton';
import Field from '~~elements/Field';
import * as AllAccountsActions from '../../AllAccountsActions';

import { USER_MODAL_STEP, USER_MODAL_MODE, CONTACT_WINDOW, USER_MODAL_GET_TYPE1_PERMISSION, USER_MODAL_GET_PRODUCTTYPE_PERMISSION } from '../../AllAccountConst';


const Div = styled.div`
  .left-div {
    p {
      display: block;
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }
    span {
      font-size: 0.8rem;
      margin: 0;
      line-height: 1.2rem;
      display: block;
    }
  }
  .right-div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-items: flex-end;
      text-align: right;
      justify-content: flex-end;
  }
  .switch-div {
    .swtich,
    .switch-text {
      display: inline-block;
      vertical-align: middle;
      margin: 0;
    }
  }
  .reset-div {
    text-align: right;
    .reset-btn {
      display: inline-block;
      cursor: pointer;
      color: #333;
      opacity: 0.5;
      width: auto;
      border: none;
      &--icon {
        width: 1.7rem;
        color: #333;
        margin-right: 0.5rem;
      }
      &--text {
        color: #333;
        font-size: 0.8rem;
      }
    }
  }

`;

const groupedObj = (userList) => {
  const groupByObjKeys = R.pipe(
    R.chain(R.toPairs),
    R.groupBy(R.head),
    R.map(R.pluck(1)),
    R.map(R.uniq)
  )(userList);
  return groupByObjKeys;
};


const defaultOptionInfo = {
  selectOptions: {},
  nameOptions: [],
  emplidOptions: [],
  phoneOptions: [],
  emailOptions: [],
  filterInfo: {
    name: null,
    emplid: null,
    phone: null,
    email: null,
  }
};

const UserForm = props => {
  const [userList, setUserList] = useState([]);
  const [optionsInfo, setOptionsInfo] = useState(defaultOptionInfo);

  const [roleGroupOptions = [], setRoleGroupOptions] = useState([]);
  const [roleNameOptions = [], setRoleNameOption] = useState([]);
  const [productType = [], productTypeOptions] = useState([]);


  const {
    // state
    userModalMode,
    rbacList,
    userInfo,
    // action
    setModalStep,
    setUserInfoValue,
    resetUserInfo,
    getRbacList,
    getCheckType1Menus,
    getCheckProductTypeMenus,
  } = props;


  // get role group list
  useEffect(() => {
    Resource.SettingResource.getRoleGroup()
      .then(response => {
        const opts = response.data.filter(o => o !== CONTACT_WINDOW);
        setRoleGroupOptions(opts);
      });
  }, []);

  // get role name list when change roleGroup
  useEffect(() => {
    if (userInfo.roleGroup) {
      Resource.SettingResource.getRoleName(userInfo.roleGroup)
        .then(response => {
          const opts = response.data.filter(o => o !== CONTACT_WINDOW);
          setRoleNameOption(opts);
        });
    }
  }, [userInfo.roleGroup]);

  // first enter - get api: RBAC list when  roleGroup && roleName is not null
  useEffect(() => {
    if (userInfo.roleGroup && userInfo.roleName) {
      const params = {
        group: userInfo.roleGroup,
        name: userInfo.roleName
      };
      getRbacList(params);
    }
  }, [userInfo.roleGroup, userInfo.roleName]);


  const getSelectOptions = (tempUserList) => {
    setUserList(tempUserList);
    const selectOptions = groupedObj(tempUserList);
    setOptionsInfo({
      ...optionsInfo,
      selectOptions,
      nameOptions: selectOptions.name,
      emplidOptions: selectOptions.emplid,
      phoneOptions: selectOptions.phone,
      emailOptions: selectOptions.email,
    });
  };

  const updateSelectOptions = (filteredUsertList, filterInfo) => {
    const selectOptions = groupedObj(filteredUsertList);
    Object.keys(selectOptions).forEach(selectKey => {
      // 如果有下拉有值的話, 填入第一個選項
      if (selectOptions[selectKey].length === 1) {
        setUserInfoValue(selectKey, selectOptions[selectKey][0]);
        filterInfo = {
          ...filterInfo,
          [selectKey]: selectOptions[selectKey][0]
        };
      }
    });
    setUserList(filteredUsertList);
    setOptionsInfo({
      ...optionsInfo,
      selectOptions,
      filterInfo,
      nameOptions: selectOptions.name,
      emplidOptions: selectOptions.emplid,
      phoneOptions: selectOptions.phone,
      emailOptions: selectOptions.email,
    });
  };

  const getfilteredData = (searchKeyword) => {
    Resource.AllAccountResource.getfilteredData(searchKeyword)
      .then(response => {
        const { userList: tempUserList } = response.data;
        getSelectOptions(tempUserList);
      });
  };

  const handleOnSelectChange = (fieldName, value) => {
    const filterInfo = {
      ...optionsInfo.filterInfo,
      [fieldName]: value,
    };
    const filteredUsertList = userList.filter(item => item[fieldName] === value);
    updateSelectOptions(filteredUsertList, filterInfo);
  };

  const handleOnChange = (fieldName, value) => {
    setUserInfoValue(fieldName, value);
  };

  const handleOnRoleGroupChange = (fieldName, value) => {
    setUserInfoValue(fieldName, value);
    setUserInfoValue('roleName', null);
  };

  const handleOnRoleNameChange = (fieldName, value) => {
    setUserInfoValue(fieldName, value);
    if (userInfo.roleGroup && value) {
      const params = {
        group: userInfo.roleGroup,
        name: value
      };
      // if rolename change, set default value (select all)
      getCheckType1Menus(params);
      getCheckProductTypeMenus(params);
    }
  };
  const handleInputChange = debounce((fieldName, keyword) => {
    const searchKeyword = {
      ...optionsInfo.filterInfo,
      [fieldName]: keyword
    };
    if (keyword.length > 0) {
      getfilteredData(searchKeyword);
    }
  }, 1000);

  const handleSetModalStep = (step) => {
    setModalStep(step);
  };

  const handleReset = (values, action) => {
    resetUserInfo();
    setOptionsInfo(defaultOptionInfo);
  };

  // const checkValid = Object.values(userInfo).every(val => val !== null);
  const { isEE, isME } = USER_MODAL_GET_TYPE1_PERMISSION(rbacList);
  const { isPTEE, isPTME } = USER_MODAL_GET_PRODUCTTYPE_PERMISSION(rbacList);
  const checkValid = userInfo.roleName && userInfo.roleGroup && userInfo.emplid;
  const checkTypeValid = isEE || isME;
  const checkProductTypeValid = isPTME || isPTEE;
  const settingDisabled = !checkValid || !checkTypeValid;
  const productTypeDisabled = !checkValid || !checkProductTypeValid;
  const { nameOptions = [], phoneOptions = [], emplidOptions = [], emailOptions = [] } = optionsInfo;
  const isAddMode = userModalMode === USER_MODAL_MODE.ADD;


  return (
    <Div>
      <Field.GreyTitle>Personal Information</Field.GreyTitle>
      <Field.Row>
        <Field.Field width="50%">
          <Field.Label
            isRequired
            title="Name"

          />
          {
            isAddMode ?
              <Field.Select
                options={nameOptions.map(opt => ({ label: opt, value: opt }))}
                value={{ label: userInfo.name, value: userInfo.name }}
                onChange={(option) => handleOnSelectChange('name', option.value)}
                onInputChange={keyword => handleInputChange('name', keyword)}
              /> :
              <Field.ReadOnly value={userInfo.name} />
          }
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            isRequired
            title="Extension"
          />
          {
            isAddMode ?
              <Field.Select
                options={phoneOptions.map(opt => ({ label: opt, value: opt }))}
                value={{ label: userInfo.phone, value: userInfo.phone }}
                onChange={(option) => handleOnSelectChange('phone', option.value)}
                onInputChange={keyword => handleInputChange('phone', keyword)}
              /> :
              <Field.ReadOnly value={userInfo.phone} />
          }
        </Field.Field>
      </Field.Row>
      <Field.Row>
        <Field.Field width="50%">
          <Field.Label
            isRequired
            title="Employee Number"
            width="50%"
          />
          {
            isAddMode ?
              <Field.Select
                options={emplidOptions.map(opt => ({ label: opt, value: opt }))}
                value={{ label: userInfo.emplid, value: userInfo.emplid }}
                onChange={(option) => handleOnSelectChange('emplid', option.value)}
                onInputChange={keyword => handleInputChange('emplid', keyword)}
              /> :
              <Field.ReadOnly value={userInfo.emplid} />
          }
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            isRequired
            title="E-mail"
            width="50%"
          />
          {
            isAddMode ?
              <Field.Select
                options={emailOptions.map(opt => ({ label: opt, value: opt }))}
                value={{ label: userInfo.email, value: userInfo.email }}
                onChange={(option) => handleOnSelectChange('email', option.value)}
                onInputChange={keyword => handleInputChange('email', keyword)}
              /> :
              <Field.ReadOnly value={userInfo.email} />
          }
        </Field.Field>
      </Field.Row>
      <Field.Row>
        <Field.Field width="50%">
          <Field.Label
            isRequired
            title="Role Group"
          />
          <Field.Select
            options={roleGroupOptions.map(opt => ({ label: opt, value: opt }))}
            value={{ label: userInfo.roleGroup, value: userInfo.roleGroup }}
            onChange={(option) => handleOnRoleGroupChange('roleGroup', option.value)}
          />
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            isRequired
            title="Role Name"
            width="50%"
          />
          <Field.Select
            options={roleNameOptions.map(opt => ({ label: opt, value: opt }))}
            value={{ label: userInfo.roleName, value: userInfo.roleName }}
            onChange={(option) => handleOnRoleNameChange('roleName', option.value)}
          />
        </Field.Field>
      </Field.Row>
      <Field.Row>
        <Field.Field width="50%">
          <div className="switch-div">
            <Field.Switch
              name="isContactWindow"
              checked={userInfo.isContactWindow}
              onChange={() => handleOnChange('isContactWindow', !userInfo.isContactWindow)}
            />
            <p className="switch-text">Set as Contact Window</p>
          </div>
        </Field.Field>
        <Field.Field width="50%">
          <div className="reset-div">
            {
              isAddMode ?
                <RoundButton.TransparentButton
                  className="reset-btn"
                  onClick={handleReset}
                  onKeyUp={() => { }}
                >
                  <Icon className="reset-btn--icon" icon="BtnReset" />
                  <span className="reset-btn--text">RESET</span>
                </RoundButton.TransparentButton> :
                (null)
            }
          </div>
        </Field.Field>
      </Field.Row>
      <Field.GreyTitle>Advance Setting</Field.GreyTitle>
      <Field.Row>
        <Field.Field width="68%">
          <div className="left-div">
            <p>Set Permission for Product Type in BOM</p>
            <span>Only the role with BOM permission can change setting. (The role with BOM permission need to set Product Type to see related projects)</span>
          </div>
        </Field.Field>
        <Field.Field width="32%">
          <div className="right-div">
            <RoundButton.BlackButton
              color="black"
              onClick={() => handleSetModalStep(USER_MODAL_STEP.PRODUCTTYPE)}
              onKeyDown={() => { }}
              disabled={productTypeDisabled}
            >
              Product Type Setting
            </RoundButton.BlackButton>
          </div>
        </Field.Field>
      </Field.Row>
      <Field.Row>
        <Field.Field width="68%">
          <div className="left-div">
            <p>Set Permission for Type I in Xray</p>
            <span>Only the role with XRay permission can change setting. (The role with XRay permission can see all Type I as a default)</span>
          </div>
        </Field.Field>
        <Field.Field width="32%">
          <div className="right-div">
            <RoundButton.BlackButton
              color="black"
              onClick={() => handleSetModalStep(USER_MODAL_STEP.TYPE1)}
              onKeyDown={() => { }}
              disabled={settingDisabled}
            >
              Type I Setting
            </RoundButton.BlackButton>
          </div>
        </Field.Field>
      </Field.Row>
    </Div>
  );
};


const mapStateToProps = state => {
  return {
    beforeRoleName: state.allAccount.beforeRoleName,
    userModalMode: state.allAccount.userModalMode,
    selected: state.allAccount.selected,
    selectPT: state.allAccount.selectPT,
    beforeSelected: state.allAccount.beforeSelected,
    modalStep: state.allAccount.modalStep,
    userInfo: state.allAccount.userInfo,
    rbacList: state.allAccount.rbacList,
    beforeSelectPT: state.allAccount.beforeSelectPT,
  };
};

const mapDispatchToProps = {
  setSelected: AllAccountsActions.setSelected,
  setSelectProductType: AllAccountsActions.setSelectProductType,
  getRbacList: AllAccountsActions.getRbacList,
  setModalStep: AllAccountsActions.setModalStep,
  setUserInfoValue: AllAccountsActions.setUserInfoValue,
  resetUserInfo: AllAccountsActions.resetUserInfo,
  getCheckType1Menus: AllAccountsActions.getCheckType1Menus,
  getCheckProductTypeMenus: AllAccountsActions.getCheckProductTypeMenus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);

