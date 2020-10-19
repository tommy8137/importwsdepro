import React, { useEffect, useRef, useContext, useState } from 'react';
import { PartlistFormContext } from '~~elements/PartListForm';
import styled, { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Portal from '~~elements/Portal';
import Select from '~~elements/Select';
import _get from 'lodash/get';
import _find from 'lodash/find';
import Resource from '~~apis/resource';
import Icon from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import { dispatchLoading, } from '~~utils/CommonUtils';
import * as PartlistActions from '~~features/BomManagement/BomDetail/BomDetailActions';

import Editor from './Editor';


const DebugProjectInfo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #555;
  padding: 6px;
  max-width: calc((100% - 70rem)/2);
  .info {
    font-size: 0.5rem;
    color: white;
    border-bottom: 1px solid #555;
    &:last-child{
      border-bottom: none;
    }
  }
`;

const SearchBar = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  min-height: 1.8em;
  >input {
    flex: 0 100%;
    border: none;
    box-shadow: none;
    padding: 0.2rem 1rem;
    border-radius: 0.2rem;
    height: 100%;
  }
  >.icon {
    flex: 0 2.5rem;
    padding: 0 6px;
    height: 100%;
  }
`;

const DebugContainer = styled.div`
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  right: 0;
  width: calc((100% - 62rem)/2);
  background-color: white;
  height: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #555;
  .checkbox  {
    color: white;
  }
  .select {
    margin: 0;
    width: 100%;
    font-weight: bolder;
    > div:first-child {
      margin: 0;
      min-height: 1.8em;
      border: none;
    }
  }

  .debug-header {
    flex: 0 auto;
    padding: 4px;
    .debug-header-row {
      display: flex;
      flex-direction: row;
      margin: 0 -4px;
      margin-bottom: 4px;
      &:last-child {
        margin-bottom: 0px;
      }
      .debug-header-col {
        padding: 0px 4px;
        flex: 0 100%;

      }
    }
  }
  .debug-editor {
    flex: 0 100%;
    /* height: calc(100% - 2rem); */
    width: 100%;
    overflow: auto;
    background-color: white;
    > div {
      height:100%;
      width: 100%;
      overflow: hidden;
      overflow-x: auto;
    }
    .jsoneditor-mode-tree {
      max-height: 100%;
    }
  }
  .debug-bottom {
    flex: 0 auto;
    text-align: center;
  }

`;

const globalStyles = injectGlobal`
  #partlist-debug-block{
    position: fixed;
    z-index: 9999;
  }
`;


const DEBUG_TYPES_OPTIONS = [
  { label: 'For Debug', value: 'fordebug', },
  { label: 'Find Key Tool', value: 'findKey', },
  { label: 'partlistPrice', value: 'price', },
  { label: 'partlistValues', value: 'values', },
  { label: 'FormData', value: 'formdata', },
  { label: 'Summary', value: 'summary', },
  { label: 'Layout', value: 'layout' },
  { label: 'Error', value: 'error' },
];

const EDITOR_MODE_OPTIONS = [
  { label: 'Tree', value: 'tree' },
  { label: 'Text', value: 'text' },
  // { label: 'form', value: 'form' },
  // { label: 'code', value: 'code' },
];

const RETURN_KEY_OPTIONS = [
  { label: 'byKey', value: 'byKey' },
  { label: 'existKey', value: 'existKey' },
];


const defaultSelectedMode = _get(EDITOR_MODE_OPTIONS, ['0', 'value'], 'text');
const defaultDebugType = _get(DEBUG_TYPES_OPTIONS, ['0', 'value'], 'price');
const defaultReturnKey = _get(RETURN_KEY_OPTIONS, ['0', 'value'], 'byKey');

const DebugBlock = props => {
  const {
    versionId,
    partlistId,
    bomId,
    partItemValues = {},
    partlistPrice = {},
    initialData,
    partItemLayout = {},
    isViewMode,
    pcbSpec,
    partItemInfo = {},
    denyViewSystemCost,
    validateWithAllErrorMsg
  } = props;

  const { contextValues, dispatch } = useContext(PartlistFormContext);
  const { formData = {}, tree, selectTab, formVersion, errorMessage = {} } = contextValues;


  const [needData, setNeedData] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [returnKey, setReturnKey] = useState(defaultReturnKey);
  const [editorData, setEditorData] = useState({});
  const [tempEditorData, setTempEditorData] = useState({});

  const [selectedMode, setSelectedMode] = useState(defaultSelectedMode);
  const [debugType, setDebugType] = useState(defaultDebugType);

  const selectedModeOpt = _find(EDITOR_MODE_OPTIONS, obj => obj.value === selectedMode, EDITOR_MODE_OPTIONS[0]);
  const selectedDebugTypeOpt = _find(DEBUG_TYPES_OPTIONS, obj => obj.value === debugType, DEBUG_TYPES_OPTIONS[0]);
  const returnKeyOpt = _find(RETURN_KEY_OPTIONS, obj => obj.value === returnKey, RETURN_KEY_OPTIONS[0]);

  const dependsData = getDependsData() || {};

  useEffect(() => {
    let newEditorData = {};
    switch (debugType) {
      case 'fordebug':
        newEditorData = _get(partlistPrice, ['forDebug'], {});
        break;
      case 'findKey':
        newEditorData = {};
        break;
      case 'price':
        newEditorData = partlistPrice;
        break;
      case 'values':
        newEditorData = partItemValues;
        break;
      case 'formdata':
        newEditorData = formData;
        break;
      case 'layout':
        newEditorData = partItemLayout;
        break;
      case 'summary':
        newEditorData = _get(partlistPrice, ['forDebug', 'summary'], {});
        break;
      case 'error':
        newEditorData = errorMessage;
        break;
      default:
        newEditorData = _get(partlistPrice, ['forDebug'], {});
        break;
    }
    setEditorData(newEditorData);
    setTempEditorData(newEditorData);
  }, [
    JSON.stringify(dependsData),
    debugType
  ]);


  /**
   * 取得需要監聽的obj
   */
  function getDependsData() {
    let depends = {};
    switch (debugType) {
      case 'fordebug':
        depends = partlistPrice;
        break;
      case 'findKey':
        depends = {};
        break;
      case 'price':
        depends = partlistPrice;
        break;
      case 'values':
        depends = partItemValues;
        break;
      case 'formdata':
        depends = formData;
        break;
      case 'layout':
        depends = partItemLayout;
        break;
      case 'summary':
        depends = partlistPrice;
        break;
      case 'error':
        depends = errorMessage;
        break;
      default:
        depends = partlistPrice;
        break;
    }
    return depends;
  }

  function handleSearchKeyChange(e) {
    const val = e.target.value;
    setSearchKey(val);
  }

  async function handleSubmitSearchKey() {
    setDebugType('findKey');
    dispatchLoading(true);
    try {
      const params = {
        bomId,
        partlistId,
        versionId,
        searchKey,
        returnKey,
        needData,
      };
      const { data } = await Resource.PartlistResource.getPartlistKeyPath(params);
      setEditorData(data);
    } catch (error) {
      setEditorData({});
    }
    dispatchLoading(false);
  }

  function submitFormdata() {
    dispatch({ type: 'SET_FORM_DATA_ALL', formData: tempEditorData });
    console.log('submit', tempEditorData);
  }

  function handleChangeEditor(newTempEditorData) {
    setTempEditorData(newTempEditorData);
  }
  const { type1, type2, productTypeName, productTypeId } = partItemInfo;

  return (
    <Portal id="partlist-debug-block">
      <DebugProjectInfo>
        <div className="info">bomId: {bomId} </div>
        <div className="info">partlistId: {partlistId} </div>
        <div className="info">versionId: {versionId} </div>
        <div className="info">type1: {type1} </div>
        <div className="info">type2: {type2} </div>
        <div className="info">product Type Name: {productTypeName} </div>
        <div className="info">product Type Id: {productTypeId} </div>
      </DebugProjectInfo>
      <DebugContainer className="debug-container">
        <div className="debug-header">
          <div className="debug-header-row">
            <div className="debug-header-col">
              <Select
                className="select"
                target="box"
                options={EDITOR_MODE_OPTIONS}
                value={selectedModeOpt}
                onChange={opt => setSelectedMode(opt.value)}
              />
            </div>
            <div className="debug-header-col">
              <Select
                className="select"
                target="box"
                options={DEBUG_TYPES_OPTIONS}
                value={selectedDebugTypeOpt}
                onChange={opt => setDebugType(opt.value)}
              />
            </div>
          </div>
          <div className="debug-header-row">
            <div className="debug-header-col">
              <SearchBar
                onSubmit={handleSubmitSearchKey}
              >
                <input
                  type="text"
                  placeholder="key"
                  onChange={handleSearchKeyChange}
                  value={searchKey}
                />
                <Icon
                  icon="IcoSearchWhite"
                  onClick={handleSubmitSearchKey}
                />
              </SearchBar>
            </div>
          </div>
          {
            debugType === 'findKey' &&
            <div className="debug-header-row">
              <div className="debug-header-col">
                <Select
                  className="select"
                  target="box"
                  options={RETURN_KEY_OPTIONS}
                  value={returnKeyOpt}
                  onChange={opt => setReturnKey(opt.value)}
                />
              </div>
              <div className="debug-header-col">
                <Checkbox checked={needData} onChange={() => setNeedData(!needData)}>needData</Checkbox>
              </div>
            </div>
          }
        </div>
        <div className="debug-editor">
          <Editor
            mode={selectedMode}
            value={editorData}
            onChange={handleChangeEditor}
          />
        </div>
        <div className="debug-bottom">
          {debugType === 'formdata' && <Button color="white" onClick={submitFormdata}>Submit FormData</Button>}
        </div>
      </DebugContainer>
    </Portal>
  );
};


const mapStateToProps = (state) => {
  return {
    partItemLayout: state.partlist.partItemLayout,
    partItemValues: state.partlist.partItemValues.partlist_value,
    partlistPrice: state.partlist.partItemPrice.partlist_price,
    partItemInfo: state.partlist.partItemInfo,
    partlistId: state.partlist.partItemInfo.bom_id,
    bomId: state.bomDetail.bomID,
    versionId: state.bomDetail.currentVersion.value
  };
};

const mapDispatchToProps = {

};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(DebugBlock);
