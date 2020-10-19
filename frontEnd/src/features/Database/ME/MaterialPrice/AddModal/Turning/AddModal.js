import React, { Fragment, useState, useEffect } from 'react';
import _get from 'lodash/get';
import _union from 'lodash/union';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Select from '~~elements/Select';

const initialFormData = {
  partCategory2Id: [],
  nutTypeId: null, // part category 不是Nut的時候為 null
  material: '',
  density: 0,
  value: 0,
};


const AddModal = (props) => {
  const {
    setAddModal,
    onAdd,
    mainTableList = [],
    materialMappingList = [],
    nutTypeList = [],
    partCate2List = [],
  } = props;

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);

  const nutTypeOptions = nutTypeList.map(obj => ({ label: obj.nutTypeName, value: obj.nutTypeId }));
  const partCate2Options = partCate2List.map(obj => ({ label: obj.partCategory2Name, value: obj.partCategory2Id }));
  const materialOptions = materialMappingList.map(obj => ({ label: obj.materialName, value: obj.materialName }));

  // nutType的下拉只有當type2有選到Nut才會開啟

  const { partCategory2Id, nutTypeId, material, density, value } = formData;

  const isNutType = partCategory2Id.some(type2Id => partCate2Options.find(o => o.value === type2Id && o.label === 'Nut'));

  const hasSameMaterial = mainTableList.find(obj => obj.item === material);

  const mappingMaterialObj = materialMappingList.find((obj) => obj.materialName === material);

  // 如果你選擇material的話, 會連動type2
  useEffect(() => {
    let form = formData;
    if (mappingMaterialObj) {
      const newpartCategory2Id = _get(mappingMaterialObj, ['partCategory2Id'], []);
      form = ({ ...form, partCategory2Id: newpartCategory2Id });
    } else {
      form = ({ ...form, partCategory2Id: [] });
    }
    if (hasSameMaterial) {
      form = ({ ...form, density: '', value: '' });
    }
    setFormData(form);
  }, [material]);


  // 如果不是選nut的話, 就把nutType清掉
  useEffect(() => {
    if (!isNutType) {
      handleChange('nutTypeId', null);
    }
  }, [isNutType]);

  // 統一處理errors
  useEffect(() => {
    const newErrors = Object.keys(formData).reduce((prev, k) => {
      const val = _get(formData, k, null);
      let isError = false;
      switch (k) {
        case 'partCategory2Id':
          isError = val && val.length <= 0;
          break;
        case 'nutTypeId':
          isError = isNutType && !val;
          break;
        case 'density':
        case 'value':
          isError = !hasSameMaterial && !val;
          break;
        default:
          isError = val === undefined || val === null || val === '';
          break;
      }
      if (isError) {
        return { ...prev, [k]: '此欄位為必填' };
      }
      return prev;
    }, {});
    setErrors(newErrors);
  }, [JSON.stringify(formData)]);

  function handleChange(key, val) {
    const newForm = { ...formData, [key]: val };
    setFormData(newForm);
  }

  function handleChangeType2(opts) {
    const optIds = opts.map(obj => obj.value);
    let newpartCategory2Id = optIds;
    if (mappingMaterialObj) {
      const { partCategory2Id: mappingIds = [] } = mappingMaterialObj;
      newpartCategory2Id = _union(mappingIds, optIds);
    }
    handleChange('partCategory2Id', newpartCategory2Id);
  }

  function handleChangeNutType(opt) {
    const { value: val } = opt;
    handleChange('nutTypeId', val);
  }

  function handleChangeMaterial(val) {
    handleChange('material', val);
  }

  const isError = Object.keys(errors).length;


  const partCate2Value = partCate2Options.filter(obj => partCategory2Id.find(id => id === obj.value));

  return (
    <Fragment>
      <Modal.ModalHeader>
        Add Material
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label title="Material Name" isRequired />
            <Field.AutoCompleteInput
              options={materialOptions}
              value={material}
              onChange={handleChangeMaterial}
            />
            <Field.FieldError errorMessage={errors['material']} />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="Part Category II" isRequired />
            <Select
              isMulti
              options={partCate2Options}
              value={partCate2Value}
              onChange={handleChangeType2}
            />
            <Field.FieldError errorMessage={errors['partCategory2Id']} />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="Nut Type" isRequired={isNutType} />
            <Select
              options={nutTypeOptions}
              value={nutTypeOptions.find(obj => obj.value === nutTypeId)}
              onChange={handleChangeNutType}
              disabled={!isNutType}
            />
            <Field.FieldError errorMessage={errors['nutTypeId']} />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="Density" isRequired={!hasSameMaterial} />
            <Field.ConvertInput
              dataType="float"
              value={density}
              onChange={(val) => handleChange('density', val)}
              disabled={hasSameMaterial}
            />
            <Field.FieldError errorMessage={errors['density']} />
          </Field.Field>

          <Field.Field width="50%">
            <Field.Label title="Price" isRequired={!hasSameMaterial} />
            <Field.ConvertInput
              dataType="float"
              value={value}
              onChange={(val) => handleChange('value', val)}
              disabled={hasSameMaterial}
            />
            <Field.FieldError errorMessage={errors['value']} />
          </Field.Field>
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => onAdd(formData)} disabled={isError}>Save</Button>
      </Modal.ModalFooter>
    </Fragment>
  );
};

export default AddModal;
