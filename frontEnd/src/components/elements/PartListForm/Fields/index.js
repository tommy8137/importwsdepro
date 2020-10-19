import React, { useContext, useState, useEffect } from 'react';
import _fpGet from 'lodash/fp/get';
import _get from 'lodash/get';

import { FieldStyle, FieldSpace } from '~~elements/PartListForm/PartlistStyles';
import { PartlistFormContext } from '../index';
import MappedValueField from './MappedValueField';
import NormalField from './NormalField';
import SelectField from './SelectField';
import UploadField from './UploadField';
import SwitchField from './SwitchField';
import TextareaField from './TextareaField';
import DateField from './DateField';
import CompositeField from './CompositeField';
import NormalFieldForApi from './NormalFieldForApi';
import NormalFieldForRealtime from './NormalFieldForRealtime';
import SelectFieldForApi from './SelectFieldForApi';
import MulitSelectField from './MulitSelectField';
import SwitchForRealtime from './SwitchForRealtime';
import TitlePanel from './TitlePanel';
import PartlistComposite from '../PartlistComposite';
import MultiUploadHeader from '../Header/MultiUploadHeader';


import { getAllDepends, errorValidate, getFieldOptions, getFieldDisabled } from '../PartlistUtils';

const DEFAULT_REQUIRED_CONSTRAINS = [{
  function: "(val) => {return (val ==='' || val === null || val === undefined);}",
  message: '此欄位為必填',
  params: [],
}];

const Field = props => {
  const [dependsValuesData, setDependsValuesData] = useState({});
  const [options, setOptions] = useState([]);
  const { contextValues, dispatch } = useContext(PartlistFormContext);
  const { formData, images, errorMessage } = contextValues;


  const {
    fieldConfig,
    fieldConfig: { selectorConfig, require, fieldType, dataType, displayConfig, needExe, default: defaultValue, constrains: fieldConstrains = [], key: fieldKey, needCePolicy, enableDefault },
    formDataPaths,
    isDebugMode = false,
    isViewMode,
    partItemInfo,
    denyViewSystemCost,
    disabled,
  } = props;

  const {
    conditionValues = {},  // 負責disabled
    constrainsValues = {}, // 負責紅字
    selectorValues = {} // 負責下拉
  } = dependsValuesData;


  const [isDisabled, setIsDisabled] = useState(false);
  const fieldErrorMessage = _fpGet(formDataPaths.join('.'))(errorMessage);
  const fieldValue = _fpGet(formDataPaths)(formData);
  const constrains = (require && fieldConstrains.length === 0) ? [...DEFAULT_REQUIRED_CONSTRAINS] : fieldConstrains;


  // 處理要拿到哪一些dependsValue
  useEffect(() => {
    const newDependsValuesData = getAllDepends({ fieldKey, formData, fieldConfig, formDataPaths, partItemInfo });
    setDependsValuesData(newDependsValuesData);
  }, [JSON.stringify(formData)]);

  // 處理下拉選單
  useEffect(() => {
    const newOptions = getFieldOptions({ fieldKey, selectorConfig, dependsValues: selectorValues });
    if (newOptions && Array.isArray(newOptions)) {
      setOptions(newOptions);
    }
  }, [JSON.stringify(selectorValues)]);


  // 統一處理disabled
  useEffect(() => {
    const newIsDisabled = getFieldDisabled({ fieldKey, fieldValue, displayConfig, dependsValues: conditionValues });
    setIsDisabled(newIsDisabled);
  }, [JSON.stringify(conditionValues)]);


  // 統一處理紅字
  useEffect(() => {
    const errMessage = errorValidate({ fieldKey, fieldValue, fieldConfig, options, partItemInfo, dependsValues: constrainsValues, constrains });
    const needShowError = errMessage && !isDisabled; // disabled 的時候不需要顯示紅字

    if (needShowError) {
      dispatch({ type: 'ADD_ERROR_MESSAGE', errorPaths: formDataPaths, errorContent: errMessage });
    } else {
      dispatch({ type: 'REMOVE_ERROR_MESSAGE', errorPaths: formDataPaths });
    }
    if (isDisabled && enableDefault) {
      onFieldChange(defaultValue);
    }
    // 離開時把紅字清空
    return () => {
      dispatch({ type: 'REMOVE_ERROR_MESSAGE', errorPaths: formDataPaths });
    };
  }, [fieldValue, JSON.stringify(constrainsValues), JSON.stringify(options), isDisabled]);


  /**
   * 當field改變時
   * @param {*} value 要onChange的value
   * @param {*} paths field路徑
   */
  function onFieldChange(value, paths = formDataPaths) {
    dispatch({ type: 'SET_FORM_DATA', formDataPaths: paths, value });
  }

  function setImages(imagesArr) {
    dispatch({ type: 'SET_IMAGES', images: imagesArr });
  }

  // 用來debug用的
  function fieldLogger(key, func) {
    if (fieldKey === key && typeof func === 'function') { func(); }
  }

  const extendsProps = {
    ...props,
    onChange: onFieldChange,
    value: fieldValue,
    isShown: isDebugMode ? true : (displayConfig && displayConfig.display),
    disabled: isDisabled || isViewMode || disabled,
    isViewMode,
    errorMessage,
    isDebugMode,
    name: '',
    options,
    dependsValuesData,
    fieldErrorMessage,
    fieldLogger,
  };


  // 先判斷他有沒有ce cost權限
  const notPolicy = needCePolicy && denyViewSystemCost;
  // 判斷他需不需要被顯示
  const notDisplay = !needExe && (displayConfig && !displayConfig.display);
  // 判斷最後需不需要顯示
  const needHidden = notPolicy || notDisplay;

  if (!isDebugMode && needHidden) {
    return null;
  }

  let fieldComponent = null;

  switch (fieldType) {
    case 'tab':
    case 'composite':
      fieldComponent = <PartlistComposite {...extendsProps} />;
      break;
    case 'mappedValue':
      fieldComponent = <MappedValueField {...extendsProps} />;
      break;
    case 'selector':
      fieldComponent = <SelectField {...extendsProps} />;
      break;
    case 'multiSelector':
      fieldComponent = <MulitSelectField {...extendsProps} />;
      break;
    case 'input':
      fieldComponent = <NormalField {...extendsProps} />;
      break;
    case 'checkBox':
      fieldComponent = <SwitchField {...extendsProps} />;
      break;
    case 'textarea':
      fieldComponent = <TextareaField {...extendsProps} />;
      break;
    case 'inputDate':
      fieldComponent = <DateField {...extendsProps} />;
      break;
    case 'label':
      fieldComponent = <TitlePanel {...extendsProps} />;
      break;
    case 'uploadImage':
      fieldComponent = <UploadField {...extendsProps} setImages={setImages} />;
      break;
    case 'fetch':
    case 'fetch-hidden':
      fieldComponent = <NormalFieldForApi {...extendsProps} />;
      break;
    case 'fetch-selector':
      fieldComponent = <SelectFieldForApi {...extendsProps} />;
      break;
    case 'realtimeFormula':
      if (dataType === 'boolean') {
        fieldComponent = <SwitchForRealtime  {...extendsProps} />;
      } else {
        fieldComponent = <NormalFieldForRealtime {...extendsProps} />;
      }
      break;

    case 'realtimeSwitch':
      fieldComponent = <SwitchForRealtime {...extendsProps} />;
      break;

    case 'compositeInline':
      fieldComponent = <CompositeField {...extendsProps} />;
      break;
    case 'compositeMultiUpload': {
      const uploadfieldConfig = extendsProps.fieldConfig.items[0];
      const uploadProps = {
        fieldConfig: uploadfieldConfig,
        parentFieldConfig: extendsProps.fieldConfig,
        formDataPaths: extendsProps.formDataPaths.concat(uploadfieldConfig.key),
        images,
        setImages,
        formData,
        limit: 10,
      };
      fieldComponent = (<MultiUploadHeader {...extendsProps} {...uploadProps} />);
      break;
    }
    default:
      fieldComponent = <NormalField {...extendsProps} disabled />;
      break;
  }

  const displayConfigGrids = _get(displayConfig, ['grids']);
  let grids = displayConfigGrids;
  if (displayConfigGrids === undefined) {
    grids = 3;
  } else if (displayConfigGrids === 0 && isDebugMode) {
    grids = 1;
  }
  const errorText = typeof fieldErrorMessage === 'string' ? fieldErrorMessage : null;
  const spaceAfter = _get(displayConfig, ['spaceConfig', 'after'], null);
  const spaceBefore = _get(displayConfig, ['spaceConfig', 'before'], null);
  const noPadding = fieldType === 'compositeInline';

  return (
    <React.Fragment>
      {spaceBefore ? <FieldSpace className="field-spece" grids={spaceBefore} /> : null}
      <FieldStyle
        isDebugMode
        className="field"
        noPadding={noPadding}
        id={`${grids}---${fieldType}`}
        grids={grids}
        name={props.path}
      >
        {
          isDebugMode &&
          <div className="debug-span">
            {fieldKey}
          </div>
        }
        <div className="field-component">
          {fieldComponent}
          {
            errorText &&
            <span className="error-message">
              {errorText}
            </span>
          }
        </div>
      </FieldStyle>
      {spaceAfter ? <FieldSpace className="field-spece" grids={spaceAfter} /> : null}
    </React.Fragment>
  );
};

Field.defaultProps = {
  parentFieldConfig: {},
  fieldConfig: {},
  formDataPaths: [],
  treePaths: [],
  partItemInfo: {},
  isDebugMode: false,
  isViewMode: false,
  disabled: false,
};

export default Field;

export {
  NormalField,
  SelectField,
  UploadField,
  SwitchField,
  TextareaField,
  DateField,
  CompositeField,
  MulitSelectField,
};
