import React, { useEffect, useRef, useContext, useState } from 'react';
import * as R from 'ramda';
import { PartlistFormContext } from '~~elements/PartListForm';
import styled, { injectGlobal, StyleInjector, createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Portal from '~~elements/Portal';
import Select from '~~elements/Select';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { JsonEditor } from 'jsoneditor-react';
import Resource from '~~apis/resource';
import * as PartlistActions from '~~features/BomManagement/BomDetail/BomDetailActions';

import './jsoneditor.css';

const EditorBox = styled.div`
  height: 100%;
  > div {
    height:100%;
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
  }
  .jsoneditor-mode-tree {
    max-height: 100%;
  }
`;

const Editor = props => {
  const { mode, value = {} } = props;
  const editorEl = useRef(null);

  useEffect(() => {
    const jsonEditorEl = _get(editorEl, ['current', 'jsonEditor'], false);
    if (jsonEditorEl && typeof jsonEditorEl.setMode === 'function') {
      jsonEditorEl.setMode(mode);
    }
  }, [mode]);

  useEffect(() => {
    const jsonEditorEl = _get(editorEl, ['current', 'jsonEditor'], false);
    if (jsonEditorEl && typeof jsonEditorEl.set === 'function') {
      jsonEditorEl.update(value);
    }
  }, [value]);


  return (
    <EditorBox className="json-editor">
      <JsonEditor
        {...props}
        ref={editorEl}
      />
    </EditorBox>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = {

};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Editor);
