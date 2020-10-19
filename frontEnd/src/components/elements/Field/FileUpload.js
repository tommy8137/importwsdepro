import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Alert from '~~elements/Alert';

const FileUploadDiv = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  padding-bottom: 0.25rem;
  .fileName{
    flex: 0 auto;
    /* margin-bottom: 0.2rem; */
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 1.5rem;
    font-size: 1rem;
    max-width: 68%;
  }
  .uploadFile-btn{
    position: absolute;
    right: 0rem;
    top: 0%;
  }
  .remove-btn {
    position: absolute;
    right: 6rem;
    top: 50%;
    transform: translate(0, -50%);
  }
`;


const FileUpload = (props) => {
  const [fileAlertOpen, setFileAlertOpen] = useState(false);
  const {
    maxFileSize = 30000000,
    multiple = false,
    accept = '.xls, .xlsx, .xlsm',
    uploadFile = '',
    onChange = () => { } } = props;

  const triggerFileInput = useRef(null);


  function handleOnChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      onChange(null);
      setFileAlertOpen(true);
    } else if (file) {
      onChange(file);
    }
    e.target.value = '';
  }

  function handleRemove() {
    onChange(null);
  }
  return (
    <React.Fragment>
      <FileUploadDiv>
        <span className="fileName">{uploadFile && uploadFile.name}</span>
        {uploadFile ?
          <Button
            mini
            round
            color="transparent"
            border={false}
            onClick={handleRemove}
          >
            <Icon icon={IconName.BtnRemove} size="12px" />Remove
          </Button>
          :
          null}
        <Button
          className="uploadFile-btn"
          mini
          round
          color="white"
          border
          onClick={() => triggerFileInput.current.click()}
        >{uploadFile ? 'Replace File' : 'Upload File'}
        </Button>
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple={multiple}
          ref={triggerFileInput}
          onChange={handleOnChange}
        />
      </FileUploadDiv>
      <Alert
        isOpen={fileAlertOpen}
        type="alarm"
      >
        <div className="row">您的檔案格式有誤，請重新上傳</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={(e) => {
              e.stopPropagation();
              setFileAlertOpen(false);
            }}
          >
            確認
          </Button>
        </div>
      </Alert>
    </React.Fragment>
  );
};

export default FileUpload;
