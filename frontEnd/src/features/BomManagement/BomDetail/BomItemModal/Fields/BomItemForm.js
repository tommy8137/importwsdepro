import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as yup from 'yup';
import _ from 'lodash';
import _sortBy from 'lodash/sortBy';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import Resource from '~~apis/resource';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import Wrapper from './BomItemFormStyles';
import InputField from './InputField';
import SelectField from './SelectField';
import SwitchField from './SwitchField';
import ImageField from './ImageField';
import TextArea from './TextArea';
import { getBomFields, checkNeedValidRules } from '../Fields/BomItemConfig';


function Form(props) {
  const {
    formData,
    setFormData,
    dropdownData,
    bomFields,
    setBomFields,
    formValidateErrorObj,
    setFormValidateErrorObj,
    historyMode,
    bomData,
    validRule,
    noDependencyCombinations,
    parentLevelList,
    assignData,
  } = props;


  const [ownerOptions, setOwnerOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [responsefromLeveragePN, setResponsefromLeveragePN] = useState({});

  const parentLevelOptions = parentLevelList.map(item => {
    return {
      info: item,
      label: item.part_name,
      value: item.id,
    };
  });

  const level = _get(formData, ['level']);
  const parentLevel = _get(formData, ['parent_level']);
  const assignList = _get(assignData, ['assignList'], []);

  const getSpecByLeveragePN = useRef(_debounce(async (val) => {
    if (!val) return;
    try {
      const response = await Resource.BomDetailResource.getPartCategoryByReferencePartNumber(val);
      setFormData(prevState => ({ ...prevState, ...response.data }));
      setResponsefromLeveragePN(response.data);
      const errorCode = _get(response.data, 'error_code', null);
      if (errorCode) {
        props.pushNotification({ message: `[ Leverage CMP/Reference P/N: ${val} ]\n${getMessageByErrorCode(response.data.error_code)}`, level: 'warning' });
      }
    } catch (err) {
      console.log('ERROR getPartCategoryByReferencePartNumber ::::::::', err);
      setResponsefromLeveragePN({});
      props.pushNotification({ message: `[ Leverage CMP/Reference P/N: ${val} ]\n取得Parts Category有誤，請自行填寫或稍後再試`, level: 'error' });
    }
  }, 1000));

  // 如果有Leverage CMP/Reference P/N就要去呼叫api拿part1 & part2 & part name
  useEffect(() => {
    if (formData['ref_part_num'] && bomData.projectSource !== 'EMDM') {
      getSpecByLeveragePN.current(formData['ref_part_num']);
    }
  }, [formData['ref_part_num']]);


  useEffect(() => {
    const formVal = _get(formData, ['owner']);
    const newOwnerOptions = assignList.map(item => {
      const { employeeName: label, bomDesigneeID: value } = item;
      return { label, value };
    });
    if (historyMode) {
      newOwnerOptions.push({ label: formVal, value: formVal });
    }
    setOwnerOptions(newOwnerOptions);
  }, [JSON.stringify(assignList)]);

  useEffect(() => {
    const { bomItems } = bomData;
    const getMaxlevel = _.max(bomItems.map(b => (b.level === 'DC/65' ? 1 : _.toNumber(b.level)))) + 1 || 2;
    const levelKeys = [...Array(getMaxlevel >= 11 ? 11 : getMaxlevel).keys()].map(i => (i === 0 ? 'DC/65' : _.toString(i + 1)));
    const getlevelOptions = levelKeys.filter(i => i !== 'DC/65').map(k => ({ label: k, value: k }));
    setLevelOptions(getlevelOptions);
  }, [JSON.stringify(bomData)]);


  // 假如level變動, call api呼叫新的parent level列表
  useEffect(() => {
    if (level !== null) {
      props.getParentLevelList(level);
    }
  }, [level]);


  useEffect(() => {
    if (parentLevelList.length) {
      const findedOption = props.parentLevelList.find(obj => obj.id === parentLevel);
      if (!findedOption) {
        const firstOptionValue = _get(parentLevelList, [0, 'id'], null);
        handleSetFormData('parent_level', firstOptionValue);
      }
    } else if (parentLevel && !parentLevelList.length) {
      handleSetFormData('parent_level', null);
    }
  }, [JSON.stringify(parentLevelList)]);


  // 取得Field欄位
  useEffect(() => {
    // 檢查需不需要套用欄位驗證：目前選odm才需要欄位驗證
    const needValidation = checkNeedValidRules(noDependencyCombinations, formData);
    const fieldsConfig = {
      formData,
      dropdownData,
      validRule: needValidation ? validRule : null,
      projectSource: bomData.projectSource,
      levelOptions,
      parentLevelOptions,
      ownerOptions,
    };
    const fields = getBomFields(fieldsConfig);
    setBomFields(fields);
  }, [
    JSON.stringify(noDependencyCombinations),
    JSON.stringify(formData),
    JSON.stringify(parentLevelOptions),
    JSON.stringify(levelOptions),
    JSON.stringify(ownerOptions),
  ]);

  // 統一處理錯誤訊息
  useEffect(() => {
    const errors = bomFields.reduce((prev, field) => {
      const { fieldType, label: fieldLabel = '', key: fieldKey, validator = null, require = false, options = [] } = field;
      const value = _get(formData, [fieldKey]);
      const isEmptyValue = value === null || value === '';

      if (require && isEmptyValue) {
        return { ...prev, [fieldKey]: `[${fieldLabel}] 為必填欄位` };
      }

      if (fieldType === 'selector' && value) {
        const isFindedOption = options.find(obj => obj.value === value);
        if (!isFindedOption) {
          return { ...prev, [fieldKey]: '資料庫無此項目' };
        }
      }
      if (validator) {
        const schema = yup.object().shape({ [fieldKey]: validator });
        try {
          schema.validateSync({ [fieldKey]: value }, { abortEarly: false });
        } catch (e) {
          const errMsg = _get(e, ['errors', [0]]);
          return { ...prev, [fieldKey]: errMsg };
        }
      }
      return prev;
    }, []);
    setFormValidateErrorObj(errors);
  }, [
    JSON.stringify(formData),
    JSON.stringify(bomFields)
  ]);


  function checkIsReadOnly(field) {
    let result = historyMode || bomData.projectSource === 'EMDM';
    if (field.key === 'part_number') {
      result = result || !!formData['ref_part_num'];
    }
    if (['parts_ctgy_1', 'parts_ctgy_2', 'part_name'].includes(field.key)) {
      const hasValuefromLeveragePN = R.has(field.key)(responsefromLeveragePN) && formData[field.key];
      result = result || hasValuefromLeveragePN;
    }
    return result;
  }

  function handleSetFormData(fieldKey, value) {
    const isNull = R.isNil(value) || _.isNaN(value) || value === '';
    setFormData(prevState => ({ ...prevState, [fieldKey]: isNull ? null : value }));
  }

  // console.log('formData ::::::::::::', formData);
  const renderField = (fieldType, field) => {
    switch (fieldType) {
      case 'input': {
        return (
          <InputField
            //   onBlur={(value) => {
            //     if (field.key === 'ref_part_num') {
            //       if (value) {
            //         getSpecByLeveragePN(value);
            //       }
            //     }
            // }}
            field={field}
            value={formData[field.key]}
            errors={R.has(field.key)(formValidateErrorObj) ? formValidateErrorObj[field.key] : ''}
            formData={formData}
            onChange={(fieldKey, value) => {
              handleSetFormData(fieldKey, value);
              if (field.key === 'ref_part_num') {
                if (value) {
                  setFormData(prevState => ({ ...prevState, part_number: value }));
                } else {
                  setResponsefromLeveragePN({});
                  setFormData(prevState => ({ ...prevState, part_number: null }));
                }
              }
            }}
          />
        );
      }
      case 'inputWithLimit': {
        return (
          <InputField
            field={field}
            value={formData[field.key]}
            errors={R.has(field.key)(formValidateErrorObj) ? formValidateErrorObj[field.key] : ''}
            formData={formData}
            onChange={async (fieldKey, value) => {
              const valid = await field.validator.isValid(value);
              if (valid || !value) {
                handleSetFormData(fieldKey, value);
              }
            }}
          />
        );
      }
      case 'selector': {
        let options = _get(field, ['options'], []);

        // owner是拿 tab list
        if (field.key === 'owner') {
          options = [
            { info: null, label: '--', value: null },
            ...props.assignData.assignList.map(item => {
              const { employeeName: label, bomDesigneeID: value } = item;
              return { label, value };
            }),
          ];

          // 因為唯讀模式時，有可能舊資料會有不在下拉選項中的項目，所以為了正常顯示，把自己塞到選項裡
          if (historyMode) {
            options.push({ label: formData[field.key], value: formData[field.key] });
          }
        }

        const sortedOptions = _sortBy(options, (opt) => _get(opt, ['label', '']));

        return (
          <SelectField
            field={field}
            value={formData[field.key]}
            formData={formData}
            // options={options}
            options={sortedOptions}
            formValidateErrorObj={formValidateErrorObj}
            setFormValidateErrorObj={setFormValidateErrorObj}
            errors={R.has(field.key)(formValidateErrorObj) ? formValidateErrorObj[field.key] : ''}
            onChange={(fieldKey, value) => {
              handleSetFormData(fieldKey, value);
            }}
          />
        );
      }
      case 'checkBox': {
        return (
          <SwitchField
            field={field}
            value={formData[field.key]}
            errors={R.has(field.key)(formValidateErrorObj) ? formValidateErrorObj[field.key] : ''}
            formData={formData}
            onChange={handleSetFormData}
          />
        );
      }
      case 'uploadImage': {
        return (
          <ImageField
            field={field}
            value={formData[field.key]}
            errors={R.has(field.key)(formValidateErrorObj) ? formValidateErrorObj[field.key] : ''}
            formData={formData}
            onChange={handleSetFormData}
            imagePath={props.imagePath}
            setImagePath={props.setImagePath}
            withDownload={bomData.projectSource === 'EMDM'}
          />);
      }
      case 'textarea': {
        return (
          <TextArea
            field={field}
            value={formData[field.key]}
            errors={R.has(field.key)(formValidateErrorObj) ? formValidateErrorObj[field.key] : ''}
            formData={formData}
            onChange={handleSetFormData}
          />
        );
      }
      default: {
        return (
          <InputField
            field={field}
            value={formData[field.key]}
            errors={R.has(field.key)(formValidateErrorObj) ? formValidateErrorObj[field.key] : ''}
            formData={formData}
            onChange={handleSetFormData}
          />
        );
      }
    }
  };

  return (
    <Wrapper className="form-root">
      {
        bomFields.map(field => {
          const { key, displayConfig, fieldType } = field;
          // 為了一次性改所有欄位的viewMode
          const fieldWithHistory = {
            readOnly: checkIsReadOnly(field),
            ...field,
          };
          return displayConfig.display && (
            <div
              className={`field-root field-root--${displayConfig.grids}`}
              key={key}
            >
              <div>{renderField(fieldType, fieldWithHistory)}</div>
            </div>
          );
        })
      }
    </Wrapper>
  );
}


export default connect(
  (state) => {
    return {
      bomData: state.bomDetail.bomData,
      dropdownData: state.bomDetail.dropdownData,
      assignData: state.bomDetail.assignData,
      historyMode: state.bomDetail.historyMode,
    };
  },
  {
    pushNotification,
  }
)(Form);
