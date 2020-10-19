import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import _fpGet from 'lodash/fp/get';
import _fpSet from 'lodash/fp/set';
import _fpRemove from 'lodash/fp/remove';

import styled from 'styled-components';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import Field from '~~elements/Field';
import Switch from '~~elements/Switch';
import Select from '~~elements/Select';
import { comma } from '~~utils/Math';
import { PartlistFormContext } from '~~elements/PartListForm';
import { getInitFormData } from '../PartlistUtils';

const LabelContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #333;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;

  &.label-field-gray {
    border: none;
    background-color: #e0e0e0;
    padding: 8px 15px;
    margin-left: -15px;
    width: calc(100% + 30px);
    z-index: ${p => p.zIndex || 3};
  }
  &.label-field-black {
    /* margin: -1rem auto; */
    border: none;
    background-color: #333;
    padding: 8px 12px;
    z-index: 1001;
    p {
      color: white;
    }
    .right-control {
      .btn {
        &.btn-another {
          border: 1px solid white;
          color: white;
        }
      }
    }
  }
  .right-control {
    white-space: nowrap;
    .btn {
      display: inline-block;
      vertical-align: middle;
      width: auto;
      height: auto;
      line-height: 1;
      border-radius: 1.5rem;
      padding: 0.6rem 1rem;
      margin-right: 0.5rem;
      font-size: 0.8rem;
      &:last-child {
        margin-right: 0;
      }
      &.remove-btn {
        border: none;
        width: auto;
        height: auto;
        background-color: transparent;
        span {
          display: inline-block;
          vertical-align: middle;
          font-size: 0.8rem;
          margin-left: 5px;
        }
      }
      &.btn-another {
        color: #333;
        border: 1px solid #333;
        background-color: transparent;
      }
      &.btn-cancel {
        color: #333;
        border: 1px solid #333;
        background-color: transparent;
      }
      &.btn-save {
        color: white;
        border: 1px solid transparent;
        background-color: #00a99d;
      }
    }

    .switch-box {
      display: inline-block;
      vertical-align: middle;
      margin-right: 2rem;
      &:last-child {
        margin-right: 0rem;
      }
      p,
      .switch {
        display: inline-block;
        vertical-align: middle;
        margin:0;
      }
      p {
        margin-right: 1rem;
      }
    }
  }
  .field {
    display: flex;
    flex: 0 100%;
    align-items: center;
    p {
      margin: 0;
      flex: 0 auto;
    }
    input {
      border: none;
      display: block;
      width: 100%;
      transition: 0.3s ease all;
      background-color: transparent;
    }
    .edit-btn {
      padding: 0;
      width: 2rem;
      height: 2rem;
      display: block;
      background-color: transparent;
      border: none;
      cursor: pointer;
      &:focus {
        outline: 0;
      }
    }
  }
`;

const TitlePanel = props => {
  const [contextValue, dispatch] = useContext(PartlistFormContext);
  const { formData, tree } = contextValue;
  const {
    fieldConfig: { switchable, multiple, label, level, editable, maxGroupCount, minGroupCount, visiable, key, multipleItems },
    parentFieldConfig,
    value,
    formDataPaths,
    treePaths,
    groupIndex,
    cost,
    showCostByKey,
    isDebugMode,
    disabled,
  } = props;

  const zIndex = 1000 - treePaths[treePaths.length - 1];
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState();

  const groupDataPath = (parentFieldConfig.multiple && !multiple) ? formDataPaths.slice(0, formDataPaths.length - 2) : formDataPaths;
  const groupData = _fpGet(groupDataPath)(formData) || [];
  const groupCount = groupData.length;
  const btnText = typeof multiple === 'string' ? multiple : 'Add Another';
  // const switchableText = typeof multiple === 'string' ? switchable : '';
  // const switchableValue = _fpGet(transToSwitchPaths(formDataPaths))(formData);
  const e2eKeys = `${key}${groupIndex + 1}`;

  useEffect(() => {
    if (editable) {
      props.onChange((value !== label && value) ? value : label, formDataPaths);
    }
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onEdit = () => {
    setTitle(value);
    setEdit(true);
  };

  const onCancel = () => {
    setEdit(false);
  };

  const onSave = () => {
    setEdit(false);
    if (typeof props.onChange === 'function') {
      props.onChange(title, formDataPaths);
    }
  };

  // const onChangeSwtich = (e) => {
  //   props.onChange(e.target.checked, transToSwitchPaths(formDataPaths));
  // };

  const onRemove = () => {
    const groups = _fpGet(formDataPaths.slice(0, formDataPaths.length - 2))(formData);
    dispatch({ type: 'SET_FORM_DATA_ALL', formData: _fpSet(formDataPaths.slice(0, formDataPaths.length - 2), _fpRemove((item) => item.uuid === groups[groupIndex].uuid)(groups))(formData) });
  };

  const onAddAnother = (treeNode = _fpGet(treePaths)(tree)) => {
    // 原本的
    // const old = { ...getInitFormData(treeNode, true, false), layoutKey: treeNode.item };

    const { item } = treeNode;
    // 這個group的path
    const groupPath = formDataPaths.concat(groupCount);
    // 取得新的group node
    const newGroupItem = {
      // 取得預設值
      ...getInitFormData(treeNode, true),
      layoutKey: item,
    };
    // 新的form adata
    const newFormData = _fpSet(groupPath, newGroupItem)(formData);
    dispatch({ type: 'SET_FORM_DATA_ALL', formData: newFormData });
  };

  const getClass = () => {
    switch (level) {
      case 0:
        return 'label-field-black';
      case 1:
        return 'label-field-gray';
      case 2:
        return '';
      default:
        return '';
    }
  };

  const getMultiItemIndex = (labelName) => {
    return groupData.filter((item, index) => groupIndex >= index && item.layoutKey === labelName).length;
  };

  if (!visiable) return null;
  return (
    <LabelContainer className={`label-field ${getClass()}`} zIndex={zIndex}>
      <div className={`field e2e-title-field----${e2eKeys}`} id={props.id}>
        {
          editable && !disabled ? (
            <React.Fragment>
              {
                edit ?
                  <input value={title} onChange={onChangeTitle} className={`e2e-title-input----${e2eKeys}`} /> :
                  <React.Fragment>
                    <p>{value}</p>
                    <button className={`edit-btn e2e-title-edit-btn----${e2eKeys}`} onClick={onEdit}>
                      <Icon icon="BtnEditBomGray" />
                    </button>
                  </React.Fragment>}
            </React.Fragment>
          ) : (<p>{label}{(multiple && !multipleItems) && <span>({groupCount})</span>}</p>)
        }
        {((parentFieldConfig.multiple && !parentFieldConfig.multipleItems) && !editable && treePaths[treePaths.length - 1] === 0) && <span>&nbsp;- {groupIndex + 1}</span>}
        {((parentFieldConfig.multiple && parentFieldConfig.multipleItems) && !editable) && <span>&nbsp; {getMultiItemIndex(label)}</span>}
      </div>
      <div className="right-control">
        <React.Fragment>
          {
            edit ? (
              <React.Fragment>
                <Button className={`btn btn-cancel e2e-title-btn-cancel----${e2eKeys}`} color="black" onClick={onCancel}>取消</Button>
                <Button className={`btn btn-save e2e-title-btn-save----${e2eKeys}`} color="black" onClick={onSave}>儲存</Button>
              </React.Fragment>
            ) :
              (
                <React.Fragment>
                  {/* {
                  (switchable) && (
                    <div className="switch-box">
                      <p>{switchableText}</p>
                      <Switch
                        checked={switchableValue}
                        onChange={onChangeSwtich}
                        disabled={disabled}
                        className={`e2e-title-switch----${e2eKeys}`}
                      />
                    </div>
                  )
                } */}

                  {
                    (multiple && !multipleItems) && !disabled && (maxGroupCount !== minGroupCount) && (
                      <Button
                        disabled={groupCount >= (maxGroupCount || Number.MAX_SAFE_INTEGER)}
                        color="black"
                        onClick={() => onAddAnother()}
                        className={`btn btn-another e2e-title-btn-another----${e2eKeys}`}
                      >{btnText}
                      </Button>
                    )
                  }
                  {
                    (multiple && multipleItems) && !disabled && (
                      <Select
                        options={multipleItems.map((item, idx) => ({ label: item.item, value: item.item, item }))}
                        onChange={(item) => onAddAnother(item.item)}
                        target="button"
                        label={`Add ${label}`}
                        alignRight
                        disabled={disabled}
                        className={`e2e-title-select----${e2eKeys}`}
                      />
                    )
                  }
                  {
                    (parentFieldConfig.multipleItems || (parentFieldConfig.multiple && !multiple && groupCount > parentFieldConfig.minGroupCount && treePaths[treePaths.length - 1] === 0)) && !disabled && (
                      <Button
                        color="white"
                        border
                        onClick={onRemove}
                        className={`btn remove-btn e2e-title-btn-remove----${e2eKeys}`}
                      >
                        <Icon icon={IconName.BtnRemove} size="12px" />
                        <span>Remove</span>
                      </Button>
                    )
                  }
                </React.Fragment>
              )
          }
          {
            (showCostByKey && isDebugMode) &&
            <div className="debug-span">
              costByKey: {showCostByKey}
            </div>
          }
          {
            cost !== null && <span>$ {comma(cost, 5)}</span>
          }
        </React.Fragment>
      </div>
    </LabelContainer>
  );
};


TitlePanel.defaultProps = {
  cost: null
};

export default TitlePanel;
