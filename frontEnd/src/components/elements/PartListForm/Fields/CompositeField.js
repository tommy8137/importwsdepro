import React from 'react';
import { FieldsGroup } from '~~elements/PartListForm/PartlistStyles';
import Field from '../Fields';

const CompositeFieldComponent = props => {
  const {
    fieldConfig,
    fieldConfig: { items, label },
    treePaths,
    formDataPaths,
    disabled,
    isViewMode,
    groupIndex,
    isDebugMode = false
  } = props;

  return (
    <React.Fragment>
      {fieldConfig.multiple ? (null) : <div className="composite-label">{label}</div>}
      <FieldsGroup>
        {items.map((item) => {
          const newTreePaths = treePaths.concat(item.key);
          const newFormDataPath = formDataPaths.concat(item.key);
          return (
            <Field
              isDebugMode={isDebugMode}
              key={item.key}
              treePaths={newTreePaths}
              formDataPaths={newFormDataPath}
              parentFieldConfig={props.fieldConfig}
              fieldConfig={item}
              partItemInfo={props.partItemInfo}
              partItemPrice={props.partItemPrice}
              disabled={disabled}
              isViewMode={isViewMode}
              groupIndex={groupIndex}
            />
          );
        })}
      </FieldsGroup>
    </React.Fragment>
  );
};

CompositeFieldComponent.defaultProps = {
  name: '',
  values: {},
  items: [],
  fieldConfig: {
    displayConfig: { grids: 1 }
  },
  disabled: false,
  isViewMode: false,
};

export default CompositeFieldComponent;
