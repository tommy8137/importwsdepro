import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import _fpGet from 'lodash/fp/get';
import { PartlistFormContext } from './';
import Field from './Fields';
import TitlePanel from './Fields/TitlePanel';
import { FieldsGroup } from './PartlistStyles';
// import { transToSwitchPaths } from './PartlistUtils';

const NoContentText = styled.div`
  justify-content: center;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const PartlistComposite = (props) => {
  const [contextValue, dispatch] = useContext(PartlistFormContext);
  const { formData } = contextValue;
  const { fieldConfig, parentFieldConfig, isViewMode, partItemPrice, disabled, partItemInfo, onChange, isDebugMode } = props;
  const { key, label, visiable, multipleItems, showCostByKey, items, multiple, fieldType } = fieldConfig;
  const { group, needCePolicy = false } = parentFieldConfig;

  let renderCount = 1;
  let { treePaths, formDataPaths } = props;

  const groups = _fpGet(formDataPaths)(formData);
  if (fieldConfig.multiple) {
    if (groups && Array.isArray(groups)) {
      renderCount = groups.length;
    }
  }

  useEffect(() => {
    if (fieldType !== 'composite') return;
    dispatch({ type: 'SET_CE_POLICY', needCePolicy });
  }, []);
  // const switchValue = _fpGet(transToSwitchPaths(formDataPaths))(formData);
  return (
    <React.Fragment>
      {
        visiable && (
          <TitlePanel
            id={`part-list-anchor--${key}`}
            treePaths={treePaths}
            formDataPaths={formDataPaths}
            fieldConfig={fieldConfig}
            parentFieldConfig={parentFieldConfig}
            partItemInfo={partItemInfo}
            onChange={onChange}
            groupIndex={-1}
            cost={getCost()}
            showCostByKey={showCostByKey}
            isDebugMode={isDebugMode}
            disabled={disabled}
          />
        )
      }

      <FieldsGroup
        className="fields-group"
        disabled={props.disabled}
      >
        {
          Array.from(new Array(renderCount)).map((f, renderOrder) => {
            return multipleItems ? (
              getMultipleItemField(renderOrder)
            ) : (
                getItemField(renderOrder)
              );
          })
        }
        {
          renderCount === 0 && <NoContentText>你尚未新增{label}</NoContentText>
        }

      </FieldsGroup>
    </React.Fragment>
  );

  function getCost() {
    if (!showCostByKey) return null;
    return _fpGet([group[0], showCostByKey, 'value'])(partItemPrice);
  }

  function getItemField(order) {
    return items.map((item, index) => {
      const nowTreePaths = treePaths.concat('items', index);
      let nowFormDataPaths = [...formDataPaths];
      if (multiple) {
        nowFormDataPaths = nowFormDataPaths.concat(order);
      }
      nowFormDataPaths = nowFormDataPaths.concat(item.key);
      return (
        <Field
          key={`${item.key}_${item.uuid}`}
          treePaths={nowTreePaths}
          formDataPaths={nowFormDataPaths}
          parentFieldConfig={fieldConfig}
          fieldConfig={item}
          partItemInfo={partItemInfo}
          groupIndex={order}
          partItemPrice={partItemPrice}
          disabled={disabled}
          isViewMode={isViewMode}
          isDebugMode={isDebugMode}
        />
      );
    });
  }

  function getMultipleItemField(order) {
    if (renderCount === 0) return null;
    return multipleItems.map((item, index) => {
      if (!groups[order] || groups[order].layoutKey !== item.item) {
        return null;
      }

      let nowFormDataPaths = [...formDataPaths];
      if (multiple) {
        nowFormDataPaths = nowFormDataPaths.concat(order);
      }
      const basicTreePath = treePaths.concat('multipleItems').concat(index).concat('layout');
      const multipleItemsLayouts = _fpGet(treePaths.concat('multipleItems').concat(index).concat('layout'))(contextValue.tree);
      return (
        multipleItemsLayouts.map(layout => (
          <Field
            key={`${layout.key}_${layout.uuid}`}
            treePaths={basicTreePath.concat(index)}
            formDataPaths={nowFormDataPaths.concat(layout.key)}
            parentFieldConfig={fieldConfig}
            fieldConfig={layout}
            partItemInfo={partItemInfo}
            partItemPrice={partItemPrice}
            groupIndex={order}
            disabled={disabled}
            isViewMode={isViewMode}
            isDebugMode={isDebugMode}
          />
        ))
      );
    });
  }
};

PartlistComposite.defaultProps = {};

export default PartlistComposite;
