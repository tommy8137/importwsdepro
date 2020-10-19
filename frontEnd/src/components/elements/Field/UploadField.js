import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import _isEqual from 'lodash/isEqual';

import Icon, { IconName } from '~~elements/Icon';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import PreviewImage from '~~elements/PreviewImage';

const NormalFieldDiv = styled.div`
  .duck-field--input {
    display: none;
  }
  .single-upload-field {
    position: relative;
    .duck-field {
      &--input {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #333333;
        width: 100%;
        /* height: 2.05rem; */
        height: 38px;
        font-size: 0.9rem;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
        > input {
          display: none;
        }
        /* 顯示文字的部份 */
        .file-box {
          position: relative;
          /* height: 1.15rem; */
          flex: 0 100%;
          max-width: calc(100% - 12rem);
          &-text {
            /* max-width: calc(100% - 4.2rem); */
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        /* 按鈕的部份 */
        .function-box {
          position: relative;
          display: flex;
          justify-content: flex-end;
          white-space: nowrap;

          }
        }
      }
    }
`;

const UploadField = (props) => {
  const inputEl = useRef(null);
  const {
    maxFileSize = 1024 * 1024,
    disabled,
    value,
    onChange
  } = props;

  const [alertMsg, setAlertMsg] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (!value) {
      inputEl.current.value = '';
      setFileName('');
      onChange(null);
    }
  }, [value]);

  function handleReset() {
    inputEl.current.value = '';
    setFileName('');
    onChange(null);
  }

  /**
   * 當點擊upload按鈕時
   */
  function handleClickUpload() {
    if (inputEl.current) {
      inputEl.current.click();
    }
  }

  function handleFileChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const { name: filename, size: fileSize } = file;

    // 先驗證圖片大小
    // if (file.size > maxFileSize) {
    //   return;
    // }
    setFileName(filename);
    onChange(file);
  }

  function handleCloseAlert() {
    setAlertMsg(`您的圖片[${fileName}]大小超過1MB，請重新上傳檔案`);
  }

  return (
    <React.Fragment>
      <NormalFieldDiv className="duck-field" disabled={disabled}>
        <div className="single-upload-field">
          <div className="duck-field--input">
            {/* 真實的fileupload input */}
            <input
              type="file"
              // accept="image/*"
              multiple={false}
              ref={inputEl}
              onChange={handleFileChange}
            />
            {/* 顯示檔名、上傳進度、圖片預覽icon */}
            <div className="file-box">
              <div className="file-box-text">{fileName}</div>
              {/* {fileName &&
              <div className="file-box-icon">
                <Icon
                  icon="BtnImage"
                  onClick={() => this.togglePreview(true)}
                />
              </div>} */}
            </div>
            {/* 按鈕們 */}
            <div className="function-box">
              {/* 移除按鈕 */}
              {fileName && !disabled &&
                <Button
                  round
                  border={false}
                  color="transparent"
                  onClick={handleReset}
                >
                  <Icon icon={IconName.BtnRemove} size="12px" />
                  Remove
                </Button>}
              {/* 檔案上傳按鈕 */}
              <Button
                round
                border
                color="transparent"
                onClick={handleClickUpload}
                type="button"
                disabled={disabled}
              >
                {fileName ? 'Replace File' : 'Select File'}
              </Button>
            </div>

          </div>
        </div>
      </NormalFieldDiv>
      <Alert isOpen={alertMsg} type="alarm">
        <div className="row">{alertMsg}</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={handleCloseAlert}
          >
            確定
          </Button>
        </div>
      </Alert>
    </React.Fragment>
  );
};

export default UploadField;
