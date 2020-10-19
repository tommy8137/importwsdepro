import React, { useState, useEffect, useRef, } from 'react';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Select from '~~elements/Select';
import { Step1Div } from '~~features/BomManagement/BomDetail/components/ImportFile/ImportFileStyles';

function SourcerStep1(props) {
  const {
    currencyOptions = [],
    selectedCurrency,
    setSelectedCurrency,
    uploadFile,
    updateImportFile = null,
  } = props;


  function handleFileOnChange(file) {
    updateImportFile(file);
  }

  function handleChangeCurrency(opt) {
    setSelectedCurrency(opt);
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

export default SourcerStep1;

