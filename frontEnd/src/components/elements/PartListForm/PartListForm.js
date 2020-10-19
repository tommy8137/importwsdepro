import React, { useEffect, useRef, useContext, useState } from 'react';
import * as R from 'ramda';
import _get from 'lodash/get';
import { PartlistFormContext } from '~~elements/PartListForm';
import PartlistTabs from './PartlistTabs';
import { getInitFormData, getPCBInitFormData } from './PartlistUtils';
import Field from './Fields';
import DebugBlock from './DebugBlock';

import { FormContainer, FieldsContainer } from './PartlistStyles';


function getInitialData(layout, spec = null, formData = {}, partItemInfo = {}) {
  if (spec) return getPCBInitFormData(layout, spec);
  return getInitFormData(layout, false, formData, partItemInfo);
}


const PartlistForm = props => {
  const { initialData, partItemLayout, isViewMode, pcbSpec, partItemInfo, denyViewSystemCost } = props;
  const { contextValues, dispatch } = useContext(PartlistFormContext);
  const { formData, tree, selectTab, formVersion } = contextValues;
  const formWrap = useRef(null);
  const formRootRef = useRef(null);

  /* debug section */
  const [isDebugMode, setIsDebugMode] = useState(false);
  useEffect(() => {
    if (!window.toggleDebugMode) {
      window.toggleDebugMode = toggleDebugMode;
    }
    return () => {
      window.toggleDebugMode = undefined;
    };
  }, []);
  /* debug section */

  useEffect(() => {
    const { layout } = partItemLayout;
    const needInitial = initialData && Object.keys(initialData).length === 0;
    const tabs = layout.filter(d => d.fieldType === 'tab');
    const initialFormData = needInitial ? getInitialData(layout, pcbSpec, {}, partItemInfo) : initialData;

    dispatch({ type: 'SET_TREE', tree: layout });
    dispatch({ type: 'SET_SELECT_TABS', tabs });
    dispatch({ type: 'SET_SELECT_TAB', selectTab: R.path([0, 'key'], tabs) });
    dispatch({ type: 'SET_FORM_DATA_ALL', formData: initialFormData });
    dispatch({ type: 'SET_ON_SUMBIT_FUNC', onSubmit: props.onSubmit });
    dispatch({ type: 'SET_PARTLIST_INFO', partItemInfo: props.partItemInfo });

    // 先拿掉, 這邊會拿到其他tab的錯誤訊息,反而跟component的打架
    // dispatch({ type: 'SET_ERROR_MESSAGE', errorMessage: checkErrors(layout, initialFormData, partItemInfo), validateWithAllErrorMsg });

    return () => {
      dispatch({ type: 'CLEAR_FORM_DATA', formData: {} });
    };
  }, [formVersion]);


  const backToPartlistTop = () => {
    if (!formRootRef) return;
    formRootRef.current.scrollTop = 0;
  };

  function toggleDebugMode(newIsDebugMode) {
    setIsDebugMode(newIsDebugMode);
  }

  const treeInTabIndex = tree.findIndex(t => t.key === selectTab);
  const treeInTab = tree[treeInTabIndex];

  useEffect(() => {
    if (_get(treeInTab, ['needCePolicy']) !== undefined) {
      dispatch({ type: 'SET_CE_POLICY', needCePolicy: treeInTab.needCePolicy });
    }
  }, [_get(treeInTab, ['needCePolicy'])]);


  if (!R.keys(formData).length || !treeInTab) { return (null); }

  return (
    <FormContainer className="form-container" innerRef={formWrap}>
      <PartlistTabs backToTop={backToPartlistTop} denyViewSystemCost={denyViewSystemCost} />
      {isDebugMode && <DebugBlock />}
      <FieldsContainer className="filed-container" ref={formRootRef}>
        {
          <Field
            key={treeInTab.key}
            parentFieldConfig={tree}
            formDataPaths={[treeInTab.key]}
            treePaths={[treeInTabIndex]}
            partItemInfo={props.partItemInfo}
            partItemPrice={props.partItemPrice}
            fieldConfig={treeInTab}
            isDebugMode={isDebugMode}
            isViewMode={isViewMode}
          />
        }
      </FieldsContainer>
    </FormContainer>
  );
};

PartlistForm.defaultProps = {
  isViewMode: false,
  partItemLayout: {
    layout: [],
    fomulas: []
  },
  partItemInfo: {
    bom_id: '',
    type1: '',
    type2: '',
    wistronpn: '',
    productType: '',
  },
  partItemPrice: {

  },
  initialData: {},
  onSubmit: () => { },
  pcbSpec: null,
  validateWithAllErrorMsg: false,
};

export default PartlistForm;
