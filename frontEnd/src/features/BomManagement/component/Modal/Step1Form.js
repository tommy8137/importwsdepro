import React, { Component, Fragment } from 'react';
import { Formik, Form as FormComponent, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import _throttle from 'lodash/throttle';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import { connect } from 'react-redux';

import Resource from '~~apis/resource';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import { Text, Select, TextArea } from './Fields';

const Form = styled(FormComponent)`
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    width: calc(50% - 15px);
  }
  & > div:last-of-type {
    width: 100%;
  }
  .disabled {
    cursor: not-allowed;
  }
`;


const FIELD_SETTING = { value: 'key', label: 'value' };

@connect(
  (state) => {
    return {
      baseData: state.bomManagement.baseData,
      approveby: state.bomManagement.approveby,
      leader: state.bomManagement.leader,
      designee: state.bomManagement.designee,
      bomData: state.bomManagement.bomData,
    };
  },
  {
    pushNotification: NotificationSystemActions.pushNotification,
  }
)
export default class Step1Form extends Component {
  componentWillMount() {
    const { bomData } = this.props;

    this.initialvalues = {
      stage: this.convertOptionOne(_get(bomData, 'bomProject.stage', null)),
      project_name: _get(bomData, 'bomProject.project_name', ''),
      project_code: _get(bomData, 'bomProject.project_code', ''),
      product_type: this.convertOptionOne(_get(bomData, 'bomProject.product_type', null)),
      customer: this.convertOptionOne(_get(bomData, 'bomProject.customer', null)),
      site: this.convertOptionOne(_get(bomData, 'bomProject.site', null)),
      product_spec: _get(bomData, 'bomProject.product_spec', ''),
      project_leader: this.convertOptionOne(_get(bomData, 'bomProject.project_leader', null)),
      approved_by: this.convertOptionOne(_get(bomData, 'bomProject.approved_by', null)),
      sku_desc: _get(bomData, 'bomProject.sku_desc', ''),
    };

    this.verifySchema = Yup.object().shape({
      stage: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).required('此為必填欄位').nullable(),
      product_type: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).required('此為必填欄位').nullable(),
      customer: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).required('此為必填欄位').nullable(),
      site: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).required('此為必填欄位').nullable(),
      approved_by: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).required('此為必填欄位').nullable(),
      project_leader: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).required('此為必填欄位').nullable(),
      product_spec: Yup.string().required('此為必填欄位').max(20, '此欄位最多20字元'),
      sku_desc: Yup.string().max(2000, '此欄位最多2000字元'),
      project_name: Yup.string().required('此為必填欄位').max(30, '此欄位最多30字元'),
      project_code: Yup.string().required('此為必填欄位').max(15, '此欄位最多15字元'),
    });
  }


  /**
   * 靜態的下拉選單
   */
  loadBaseOptions = (inputvalue = '', callback, fieldname) => {
    const { baseData } = this.props;
    const optionlist = _get(baseData, fieldname, []);
    const filterlist = optionlist.filter((d) => d.value.toUpperCase().includes(inputvalue.toUpperCase()));
    callback(this.convertOptions(filterlist));
  }

  /**
   * user名單 由後端搜尋傳回
   */
  loadSearchOptions = _debounce((inputvalue = '', callback, field) => {
    Resource.BomManagementResource.getCreateBomUsers(field, inputvalue)
      .then(response => {
        const { userList } = response.data;
        callback(this.convertOptions(userList));
      })
      .catch(error => {
        this.props.pushNotification({
          message: '網路連線有誤，請稍後再試',
          level: 'error'
        });
      });
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


  render() {
    const { viewMode } = this.props;
    return (
      <Formik
        initialValues={this.initialvalues}
        validationSchema={this.verifySchema}
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
                <Field
                  id="e2e-stage"
                  name="stage"
                  label="Stage"
                  isRequired
                  component={Select}
                  loadOptions={(inputvalue, callback) => this.loadBaseOptions(inputvalue, callback, 'stage')}
                  onChange={handleChange}
                  isSearchable
                  isDisabled={viewMode}
                />
                <Field
                  id="e2e-project_name"
                  name="project_name"
                  label="Project Name"
                  isRequired
                  component={Text}
                  disabled={viewMode}
                  onChange={handleChange}
                />
                <Field
                  id="e2e-project_code"
                  name="project_code"
                  label="Project Code"
                  isRequired
                  component={Text}
                  disabled={viewMode}
                  onChange={handleChange}
                />
                <Field
                  id="e2e-product_type"
                  name="product_type"
                  label="Product Type"
                  isRequired
                  component={Select}
                  loadOptions={(inputvalue, callback) => this.loadBaseOptions(inputvalue, callback, 'productType')}
                  onChange={handleChange}
                  isSearchable
                  isDisabled={viewMode}
                />
                <Field
                  id="e2e-customer"
                  name="customer"
                  label="Customer"
                  isRequired
                  component={Select}
                  loadOptions={(inputvalue, callback) => this.loadBaseOptions(inputvalue, callback, 'customer')}
                  onChange={handleChange}
                  isSearchable
                  isDisabled={viewMode}
                />
                <Field
                  id="e2e-site"
                  name="site"
                  label="Site"
                  isRequired
                  component={Select}
                  loadOptions={(inputvalue, callback) => this.loadBaseOptions(inputvalue, callback, 'site')}
                  onChange={handleChange}
                  isSearchable
                  isDisabled={viewMode}
                />
                <Field
                  id="e2e-product_spec"
                  name="product_spec"
                  label="Product Spec"
                  isRequired
                  component={Text}
                  onChange={handleChange}
                  disabled={viewMode}
                />
                <Field
                  id="e2e-project_leader"
                  name="project_leader"
                  label="Project Manager"
                  isRequired
                  component={Select}
                  loadOptions={(inputvalue, callback) => this.loadSearchOptions(inputvalue, callback, 'LEADER')}
                  onChange={handleChange}
                  defaultOptions={[]}
                  isSearchable
                  isClearable
                  isDisabled={true}
                />
                <Field
                  id="e2e-approved_by"
                  name="approved_by"
                  label="Approved by"
                  isRequired
                  component={Select}
                  loadOptions={(inputvalue, callback) => this.loadSearchOptions(inputvalue, callback, 'APPROVEBY')}
                  onChange={handleChange}
                  defaultOptions={[]}
                  isSearchable
                  isClearable
                  isDisabled={true}
                />
                <Field
                  id="e2e-sku_desc"
                  name="sku_desc"
                  label={`Project Description (${values.sku_desc.length}/2000)`}
                  component={TextArea}
                  onChange={handleChange}
                  disabled={viewMode}
                />
              </Form>
            </Fragment>
          );
        }
        }
      </Formik>
    );
  }
}
