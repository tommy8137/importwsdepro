/* eslint-disable camelcase */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _find from 'lodash/find';
import Field from '~~elements/Field';

import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import SelectTree from '../SelectTree';


const initFormData = {
  customer: null,
  product_type: null,
  project_name: '',
  project_code: '',
  stage: null,
  version: '',
  sku: '',
  eedm_version: null,
  plant_code: [],
  caculation_date: null,
  project_leader: '',
  version_remark: '',
};

function ProjectForm(props, ref) {
  const [formData, setFormData] = useState(initFormData);

  const {
    onInValid = () => { },
    onChange = () => { },
    plantCodeList = [],
    eeBomProjectId = '',
    edmVersionID = '',
    eeBomData = {},
    viewMode = false,
  } = props;

  const {
    customer,
    product_type,
    project_name,
    project_code,
    stage,
    version,
    sku,
    eedm_version,
    // plant,
    // purchasing_organization,
    plant_code = [],
    caculation_date,
    project_leader,
    version_remark,
  } = formData;


  useEffect(() => {
    const plantCode = _get(eeBomData, 'plant_code', []);
    const newPlantCode = plantCode.map(p => {
      const { plants = [] } = p;
      const newPlants = plants.map(obj => ({
        plant: obj,
        value: true
      }));
      return {
        ...p,
        plants: newPlants
      };
    });

    const newFormData = {
      customer: _get(eeBomData, 'customer', null),
      product_type: _get(eeBomData, 'product_type', null),
      project_name: _get(eeBomData, 'project_name', ''),
      project_code: _get(eeBomData, 'project_code', ''),
      stage: _get(eeBomData, 'stage', null),
      version: _get(eeBomData, 'version', ''),
      sku: _get(eeBomData, 'sku', ''),
      eedm_version: _get(eeBomData, 'eedm_version', null),
      plant: _get(eeBomData, 'plant', null),
      purchasing_organization: _get(eeBomData, 'purchasing_organization', ''),
      plant_code: newPlantCode,
      caculation_date: _get(eeBomData, 'caculation_date', null),
      project_leader: _get(eeBomData, 'project_leader', ''),
      version_remark: _get(eeBomData, 'version_remark', ''),
    };
    setFormData(newFormData);
  }, [JSON.stringify(eeBomData), JSON.stringify(plantCodeList)]);

  useEffect(() => {
    // 當這邊的formdata改變時，去更新上層的formdata
    onChange(formData);
  }, [JSON.stringify(formData)]);


  function handleOnChange(key, value) {
    const newFormData = {
      ...formData,
      [key]: value,
    };
    setFormData(newFormData);
  }

  function handleOnChangeTreeNode(key, treeValue) {
    const newFormData = {
      ...formData,
      [key]: treeValue,
    };
    setFormData(newFormData);
  }

  return (
    <div>
      <Field.Row>
        <Field.Field width="50%">
          <Field.Label
            title="Customer"
          />
          <Field.Input
            value={customer}
            disabled
          />
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            title="Product Type"
          />
          <Field.Input
            value={product_type}
            disabled
          />
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            title="PROJECT NAME"
          />
          <Field.Input
            value={project_name}
            disabled
          />
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            title="PROJECT CODE"
          />
          <Field.Input
            value={project_code}
            disabled
          />
        </Field.Field>

        <Field.Field width="50%">
          <Field.Label
            title="Stage"
          />
          <Field.Input
            value={stage}
            disabled
          />
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            title="Version"
          />
          <Field.Input
            value={version}
            disabled
          />
        </Field.Field>

        <Field.Field width="50%">
          <Field.Label
            title="SKU"
          />
          <Field.Input
            value={sku}
            disabled
          />
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            title="eEDM Version"
          />
          <Field.Input
            value={eedm_version}
            disabled
          />
        </Field.Field>
        <Field.Field width="100%">
          <Field.Label
            title="Purchase Organization:Plant"
            isRequired
          />
          <SelectTree
            value={plant_code}
            data={plantCodeList}
            onChange={(value) => handleOnChangeTreeNode('plant_code', value)}
            disabled={viewMode}
          />
        </Field.Field>

        <Field.Field width="50%">
          <Field.Label
            title="Calculation Date"
          />
          <Field.Input
            value={caculation_date}
            disabled
          />
        </Field.Field>
        <Field.Field width="50%">
          <Field.Label
            title="Project Leader"
          />
          <Field.Input
            value={project_leader}
            disabled
          />
        </Field.Field>
        <Field.Field width="100%">
          <Field.Label
            title="Version Remark"
          />
          <Field.Textarea
            value={version_remark}
            disabled={viewMode}
            onChange={(e) => handleOnChange('version_remark', e.target.value)}
          />
        </Field.Field>
      </Field.Row>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    plantCodeList: state.bomManagement.plantCodeList,
    eeBomData: state.bomManagement.eeBomData,
  };
};

const mapDispatchToProps = {
  openEditEEBomModal: BomManagementActions.openEditEEBomModal,
  closeEditEEBomModal: BomManagementActions.closeEditEEBomModal,
  pushNotification: NotificationSystemActions.pushNotification,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProjectForm);
