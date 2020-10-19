import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _head from 'lodash/head';
import _get from 'lodash/get';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Select from '~~elements/Select';
import Resource from '~~apis/resource';
import Icon from '~~elements/Icon';

const StyledDiv = styled.div`
  .text {
      margin-left: 0rem;
  }
`;

const INITIAL_FORMDATA = {
  product: '',
  customer: '',
  stage: '',
  dateFrom: '',
  dateTo: '',
  count: 0
};


function ExportSpaceModal(props) {
  const {
    isOpen = false,
    onClickExport = () => { },
    onCancelExport = () => { },
    dateFormat = 'YYYY-MM-DD',
    timeFormat = false,
    defaultValue = null,
    name = '',
  } = props;


  const [productOptions, setProductOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [stageOptions, setStageOptions] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORMDATA);

  const { product = '', customer = '', stage = '', dateFrom, dateTo, count } = formData;

  const productOption = productOptions.find(opt => opt.value === product) || { label: '', value: '' };
  const customerOption = customerOptions.find(opt => opt.value === customer) || { label: '', value: '' };
  const stageOption = stageOptions.find(opt => opt.value === stage) || { label: '', value: '' };
  useEffect(() => {
    getOptions();
  }, [JSON.stringify(formData)]);

  useEffect(() => {
    const newFormData = {
      ...formData,
      product: productOptions.find(opt => opt.value === product) ? product : '',
      customer: customerOptions.find(opt => opt.value === customer) ? customer : '',
      stage: stageOptions.find(opt => opt.value === stage) ? stage : ''
    };
    setFormData(newFormData);
  }, [
    JSON.stringify(productOptions),
    JSON.stringify(customerOptions),
    JSON.stringify(stageOptions)
  ]);

  async function getOptions() {
    try {
      const params = { product, customer, stage, dateFrom, dateTo };
      const { data = {} } = await Resource.BomManagementResource.getFilterData(params);
      const {
        product: productList = [],
        customer: customerList = [],
        stage: stageList = [],
        count: projectCounts = 0
      } = data;
      const newProductOptions = productList.map(val => ({ value: val, label: val }));
      const newCustomerOptions = customerList.map(val => ({ value: val, label: val }));
      const newStageOptions = stageList.map(val => ({ value: val, label: val }));

      setProductOptions(newProductOptions);
      setCustomerOptions(newCustomerOptions);
      setStageOptions(newStageOptions);
      setProjectCount(projectCounts);
    } catch (e) {
      console.log(e);
    }
  }

  function handleClickCancel() {
    onCancelExport();
  }

  function handleExport() {
    onClickExport(product, customer, stage, dateFrom, dateTo);
  }

  function handleExportAll() {
    onClickExport();
  }

  function validDateFrom(current) {
    if (dateTo !== '') {
      return current.isBefore(dateTo) || current.isSame(dateTo);
    }
    return true;
  }

  function validDateTo(current) {
    if (dateFrom !== '') {
      return current.isAfter(dateFrom) || current.isSame(dateFrom);
    }
    return true;
  }

  function handleChange(key, val = '') {
    setFormData({ ...formData, [key]: val || '' });
  }
  const exportDisabled = projectCount <= 0;

  return (
    <Modal.Modal isOpen={isOpen}>
      <Modal.ModalHeader>
        空格率統計表
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label>
              {'FROM '}
              {<Icon icon="IcoCalendarFrom" size="1rem" />}
            </Field.Label>
            <Field.DatePicker
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              // onChange={opt => setDateFrom(opt)}
              onChange={date => handleChange('dateFrom', date)}
              closeOnSelect={true}
              defaultValue={defaultValue}
              inputProps={{ name, readOnly: true }}
              isValidDate={validDateFrom}
              value={dateFrom || null}
            />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label>
              {'TO '}
              {<Icon icon="IcoCalendarTo" size="1rem" />}
            </Field.Label>
            <Field.DatePicker
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              onChange={date => handleChange('dateTo', date)}
              closeOnSelect={true}
              defaultValue={defaultValue}
              inputProps={{ name, readOnly: true }}
              isValidDate={validDateTo}
              value={dateTo || null}
            />
          </Field.Field>
        </Field.Row>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label title="Product" />
            <Select
              options={productOptions}
              value={productOption}
              // onOpen={() => handleChange('product', '')}
              onChange={opt => handleChange('product', opt.value)}
              resetable={true}
            />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="Customer" />
            <Select
              options={customerOptions}
              value={customerOption}
              // onOpen={() => handleChange('customer', '')}
              onChange={opt => handleChange('customer', opt.value)}
              resetable
            />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="Stage" />
            <Select
              options={stageOptions}
              value={stageOption}
              // onOpen={() => handleChange('stage', '')}
              onChange={opt => handleChange('stage', opt.value)}
              resetable
            />
          </Field.Field>
        </Field.Row>
        <StyledDiv>
          <p className="text">找到 project 數量 : {projectCount}</p>
        </StyledDiv>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button
          color="white"
          onClick={handleClickCancel}
        >
          Cancel
        </Button>
        <Button
          color="black"
          onClick={handleExport}
          disabled={exportDisabled}
        >Export
        </Button>
        <Button
          color="black"
          onClick={handleExportAll}
        >Export All Project
        </Button>
      </Modal.ModalFooter>
    </Modal.Modal>
  );
}


export default ExportSpaceModal;
