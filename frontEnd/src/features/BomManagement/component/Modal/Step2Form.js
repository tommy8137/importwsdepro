import React, { Component, Fragment } from 'react';
import { Formik, Form as FormComponent, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import _remove from 'lodash/remove';
import _uniq from 'lodash/uniq';

import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';

import Resource from '~~apis/resource';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import * as BomManagementActions from '../../BomManagementActions';
import { Select, ErrorMsg } from './Fields';
import * as consts from './CreateBomProjectConstant';

const Form = styled(FormComponent)`
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  /* justify-content: space-between; */
  & > div {
    width: 50%;
    padding: 0 15px;
  }
  .disabled {
    cursor: not-allowed;
  }
`;

const Div = styled.div`
  .block-header {
    height: 36px;
    width: 100%;
    background: #e5e5e5;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #333333;
    padding: 7px 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    button {
      width: 86px;
      height: 24px;
      border-radius: 13px;
      border: solid 1px #333333;
      color: #333333;
      font-size: 12px;
      background: transparent;
      cursor: pointer;
      transition: .3s ease all;
      &:focus {
        outline: none;
      }
      &:hover:not(:disabled) {
        background-color: #555555;
        color: #fff;
        &:active {
          background-color: #1e1e1e;
        }
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

const FIELD_SETTING = { value: 'key', label: 'value' };

@connect(
  (state) => {
    return {
      baseData: state.bomManagement.baseData,
      designee: state.bomManagement.designee,
      bomData: state.bomManagement.bomData,
    };
  },
  {
    updateBomDetail: BomManagementActions.updateBomDetail,
  }
)
export default class Step2Form extends Component {
  constructor(props) {
    super(props);
    this.initialvalues = { melist: '', ftlist: '' };
    const { isEdit, bomData } = this.props;
    // if (isEdit) { // edit
    const dlist = _get(bomData, 'bomDesignee', []);
    const meList = dlist.filter(d => !_get(d, 'isfunctionteam', false)).map(item => ({ uuid: item.id, }));
    const ftList = dlist.filter(d => _get(d, 'isfunctionteam', false)).map(item => ({ uuid: item.id, }));
    this.state = {
      meList,
      ftList,
    };
    dlist.forEach((d) => {
      if (d.isfunctionteam) {
        this.initialvalues = {
          ...this.initialvalues,
          [`ft_${d.id}`]: this.convertOptionOne(d.function_team),
          [d.id]: this.convertOptionOne(d.user),
        };
      } else if (d.seq === 0) {
        this.initialvalues = {
          ...this.initialvalues,
          [`me_${d.id}`]: this.convertOptionOne({
            key: sessionStorage.getItem('userid'),
            value: sessionStorage.getItem('username')
          }),
        };
      } else {
        this.initialvalues = {
          ...this.initialvalues,
          [`me_${d.id}`]: this.convertOptionOne(d.user),
        };
      }
      // 先把整理好的資料傳到redux裡存好
      this.props.updateBomDetail({ bomDesignee: this.initialvalues });
    });
    // } else { // create
    //   // ME 預設有4筆， Function Team 預設有2筆
    //   const meList = [...new Array(consts.DEFAULT_ME_LENGTH)].map((v, idx) => ({ uuid: uuidv4().split('-')[0] }));
    //   const ftList = [...new Array(consts.DEFAULT_FUNCTION_TEAM_LENGTH)].map((v, idx) => ({ uuid: uuidv4().split('-')[0] }));
    //   // 設定第一筆ME為自己
    //   const { userInfo: { userID: value, userName: label } } = this.props;
    //   this.initialvalues = {
    //     [`me_${meList[0].uuid}`]: { value, label },
    //   };
    //   this.state = {
    //     meList,
    //     ftList,
    //   };
    // }
  }

  /**
   * 驗証form裡的所有資料
   * 註1: 因為function list和me list 有連動關係要一起驗証，
   *      所以在initial value增加ftlist和melist，但頁面上不顯示。
   * 註2: 區分me 和function team 的方法為prefix；沒有prefix的視為是function team的member。
   */
  validDesignee = (values) => {
    if (this.props.viewMode) {
      return {};
    }

    let errors = {};

    // ME 至少要放1個人
    const meList = Object.keys(values).filter(k => k.includes('me_')).map(k => values[k]).filter(v => !!v);
    if (meList.length === 0) {
      const { melist = [] } = errors;
      melist.push('ME請至少選取一人');
      errors = {
        ...errors,
        melist,
      };
    }

    /*
    // 一個Function Team 只能指定1個人
    const ftMberKeyList = Object.keys(values).filter(k => !k.includes('_') && values[k] !== '');
    const ftList = ftMberKeyList.map(k => _get(values[`ft_${k}`], 'value', '')); // 取得被選擇的function team有哪些
    if (ftList.length !== _uniq(ftList).length) {
      errors.ftlist = '不允許一個team有多個owner';
    }
    */

    // Function Team的部份 有填Name就必須要選function team
    const ftMberKeyList = Object.keys(values).filter(k => !k.includes('_') && !!values[k]);
    const noFtMbrList = ftMberKeyList.filter(mbrKey => !_get(values, `ft_${mbrKey}`, null));
    if (noFtMbrList.length > 0) {
      const { ftlist = [] } = errors;
      ftlist.push('Function Team與owner的設定不完整');
      errors = {
        ...errors,
        ftlist,
      };
    }

    // 所有Function Team的member和ME的member不能重複
    const allMbr = Object.keys(values)
      .filter(key => !key.includes('ft_'))
      .map(key => values[key])
      .filter(v => !!v)
      .map(obj => obj.value || obj);

    if (_uniq(allMbr).length !== allMbr.length) {
      const { ftlist = [] } = errors;
      ftlist.push('owner不可重複');
      errors = {
        ...errors,
        ftlist,
      };
    }

    return errors;
  }

  /**
   * 靜態的下拉選單
   */
  loadBaseOptions = (inputvalue = '', callback, fieldname) => {
    const { baseData } = this.props;
    const optionlist = _get(baseData, fieldname, []);
    const filterlist = optionlist.filter((d) => d.value.toUpperCase().includes(inputvalue.toUpperCase()));
    callback(this.convertOptions(filterlist, FIELD_SETTING));
  }

  /**
   * user名單 由後端搜尋傳回
   */
  loadSearchOptions = _debounce((inputvalue = '', callback, field) => {
    Resource.BomManagementResource.getCreateBomUsers(field, inputvalue)
      .then(response => {
        const { userList } = response.data;
        callback(this.convertOptions(userList, FIELD_SETTING));
      })
      .catch(error => NotificationSystemActions.pushNotification({
        message: '網路連線有誤，請稍後再試',
        level: 'error'
      }));
  }, 1000);

  /**
   * 將後端給的list轉成可以餵給react-select的option格式 (ex: { value: 1, label: 'first item' })
   * fieldSetting: { value: 'key', label: 'value' }
   */
  convertOptions = (list, fieldSetting = FIELD_SETTING) => {
    return list.map(option => this.convertOptionOne(option, fieldSetting));
  }

  /**
   * 將「一個」後端給的option object轉成可以給react-select的option格式
   */
  convertOptionOne = (option, fieldSetting = FIELD_SETTING) => {
    return option ? ({ value: option[fieldSetting.value], label: option[fieldSetting.label] }) : null;
  }


  // ==== ME List ===============================
  /**
   * 在Me按add another.
   */
  addMeList = (e) => {
    const { meList } = this.state;
    meList.push({
      uuid: uuidv4(),
      value: null,
      label: null,
    });
    this.setState({
      meList,
    });
  }

  handleRemoveME = (uuid) => {
    const { meList } = this.state;
    _remove(meList, d => d.uuid === uuid);
    this.setState({
      meList
    });
  }
  // ==== Function Team List ===============================

  addFtList = (e) => {
    const { ftList } = this.state;
    ftList.push({
      uuid: uuidv4(),
      value: null,
      label: null,
    });
    this.setState({
      ftList,
    });
  }

  handleRemoveFT = (uuid) => {
    const { ftList } = this.state;
    _remove(ftList, d => d.uuid === uuid);
    this.setState({
      ftList
    });
  }


  render() {
    const { meList, ftList } = this.state;
    const { bomData, isEdit, viewMode } = this.props;

    // ME 只能增加最多10個人
    const isDisabledMeAdd = meList.length >= consts.MAX_ME_LENGTH || viewMode;

    // Function Team 也只能增加最多10個人
    const isDisabledFtAdd = ftList.length >= consts.MAX_FUNCTION_TEAM_LENGTH || viewMode;
    // const isDisabledFtAdd = ftList.length >= _get(baseData, 'functionTeamName', []).length || viewMode;

    // ME 新增的要顯示delete的鈕
    const meOriLength = Object.keys(this.initialvalues).filter(k => k.includes('me_')).length;
    const isMeDeletable = optIdx => {
      const limitMeIndex = consts.DEFAULT_ME_LENGTH - 1;
      return (isEdit ? (optIdx > meOriLength - 1 && optIdx > limitMeIndex) : optIdx > limitMeIndex);
    };

    return (
      <Div>
        <Formik
          initialValues={this.initialvalues}
          validate={this.validDesignee}
          onSubmit={(values, action) => {
            // call submit data action
            this.props.onSubmitForm(values);
          }}
          onReset={(values, action) => {
            // call reset action
          }}
        >
          {({
            values,
            errors,
            touched,
            // handleChange and handleBlur work exactly as expected--they use a name or id attribute to figure out which field to update.
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isSubmitting,
            /* and other goodies */
            setFieldValue,
            setFieldTouched,
            submitForm,
          }) => {
            this.props.bindSubmitForm(submitForm);
            return (
              <Fragment>
                <Form>
                  <div className="block-header">
                    ME
                    <button id="e2e-assign_add" type="button" disabled={isDisabledMeAdd} onClick={this.addMeList}>Add another</button>
                  </div>
                  {meList.map((d, i) => (<Field
                    id={`e2e-assian_${i}`}
                    key={d.uuid}
                    uuid={d.uuid}
                    name={`me_${d.uuid}`}
                    label={`NAME ${i + 1}`}
                    isDeletable={isMeDeletable(i)}
                    component={Select}
                    loadOptions={(inputvalue, callback) => this.loadSearchOptions(inputvalue, callback, 'DESIGNEE')}
                    onChange={handleChange}
                    onRemove={this.handleRemoveME}
                    defaultOptions={[]}
                    isSearchable
                    isClearable
                    isDisabled={viewMode || i === 0} // 不能刪掉自己
                  />))}
                  {_get(errors, 'melist', []).map((msg, idx) => <ErrorMsg key={idx}>{msg}</ErrorMsg>)}

                  <div className="block-header">
                    Function Team
                    <button id="e2e-function_add" type="button" disabled={isDisabledFtAdd} onClick={this.addFtList}>Add another</button>
                  </div>
                  {ftList.map((d, i) => (
                    <Fragment key={d.uuid}>
                      <Field
                        id={`e2e-function_team_${i}`}
                        uuid={d.uuid}
                        name={`ft_${d.uuid}`}
                        label="FUNCTION TEAM"
                        isDeletable={i > 1}
                        component={Select}
                        loadOptions={(inputvalue, callback) => this.loadBaseOptions(inputvalue, callback, 'functionTeamName')}
                        onChange={handleChange}
                        onRemove={this.handleRemoveFT}
                        isSearchable
                        isDisabled={viewMode}
                      />
                      <Field
                        id={`e2e-function_team_name_${i}`}
                        uuid={d.uuid}
                        name={d.uuid}
                        label="NAME"
                        component={Select}
                        loadOptions={(inputvalue, callback) => this.loadSearchOptions(inputvalue, callback, 'DESIGNEE')}
                        onChange={handleChange}
                        defaultOptions={[]}
                        isSearchable
                        isClearable
                        isDisabled={viewMode}
                      />
                    </Fragment>))}
                  {_get(errors, 'ftlist', []).map((msg, idx) => <ErrorMsg key={idx}>{msg}</ErrorMsg>)}
                </Form>
              </Fragment>
            );
          }
          }
        </Formik>
      </Div>
    );
  }
}
