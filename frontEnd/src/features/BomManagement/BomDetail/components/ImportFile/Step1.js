import React, { useState, useEffect, useRef, } from 'react';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Icon, { IconName } from '~~elements/Icon';
import { Step1Div } from './ImportFileStyles';

function Step1(props) {
  const {
    uploadFile,
    updateImportFile,
  } = props;

  function handleFileOnChange(file) {
    updateImportFile(file);
  }

  return (
    <Step1Div>
      <Field.Row>
        <Field.Field width="100%">
          <Field.Label title="BOM File" />
          <Field.FileUpload
            uploadFile={uploadFile}
            maxFileSize={30000000}
            accept=".xls, .xlsx, .xlsm"
            onChange={handleFileOnChange}
          />
        </Field.Field>
      </Field.Row>
    </Step1Div>
  );
}

export default Step1;

