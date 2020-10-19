import React from 'react';
import Field from '~~elements/Field';
import { Step1Div } from '~~features/BomManagement/BomDetail/components/ImportFile/ImportFileStyles';

function MaterialPriceStep1(props) {
  const {
    uploadFile,
    updateImportFile = null,
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

export default MaterialPriceStep1;

