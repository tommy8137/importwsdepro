import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '~~elements/Button';
import Resource from '~~apis/resource';
import Alert from '~~elements/Alert';
import Icon, { IconName } from '~~elements/Icon';
import PreviewImage from '~~elements/PreviewImage';

import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import baseFieldStyles, { baseReactSelect } from './FieldStyles';

const NormalFieldDiv = styled.div`
  ${baseFieldStyles};
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
        opacity: ${({ readOnly }) => (readOnly ? 0.5 : 1)};

        /* 顯示文字的部份 */
        .file-box {
          position: relative;
          height: 1.15rem;
          width: calc(100% - 11.1rem);
          white-space: nowrap;
          div {
            display: inline-block;
            vertical-align: middle;
            margin-left: .1rem;
          }
          &-text {
            max-width: calc(100% - 4.2rem);
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &-percentage {
            width: 3rem;
          }
          &-icon {
            width: 1.2rem;
            cursor: pointer;
          }
        }

        /* 按鈕的部份 */
        .function-box {
          display: flex;
          position: relative;
          min-width: 11rem;
          height: 1.6rem;
          .upload_img_btn {
            height: inherit;
            border-radius: 1rem;
            font-size: 0.4rem;
            letter-spacing: 1px;
            outline: none;
            border: 1px solid #333333;
            color: #333333;
            position: absolute;
            right: 0;
            &.green {
              background: #00A99D;
              color: #FFFFFF;
              &:hover {
                cursor: pointer;
                color: #FFFFFF;
              }
            }
            &:hover:not(:disabled) {
              cursor: ${({ readOnly }) => (readOnly ? 'default' : 'pointer')};
              color: #333333;
              border-color: #333333;
            }
          }

          .delete-btn {
            width: 5rem;
            height: inherit;
            border: none;
            color: #333333;
            font-size: 12px;
            cursor: ${({ readOnly }) => (readOnly ? 'default' : 'pointer')};
            border-radius: 1rem;
            line-height: 14px;
            transition: .3s ease all;
            display: flex;
            justify-content: space-around;
            align-items: center;
            opacity: ${({ readOnly }) => (readOnly ? 0.5 : 1)};

            &:focus {
              outline: none;
            }
            &:hover:not(:disabled) {
              color: #555;
              &:active {
                color: #333;
              }
            }
          }
        }

      }
    }
  }
`;

const ImageField = (props) => {
  const triggerFileInput = useRef();
  const { value, field: { label, require, key, readOnly }, withDownload } = props;

  const [filename, setFilename] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [alertConfig, setAlertConfig] = useState({ open: false, msg: '' });
  const [previewOpen, setPreviewOpen] = useState(false);

  const resetInput = () => {
    props.setImagePath('');
    setFilename('');
    triggerFileInput.current.value = '';
  };

  useEffect(() => {
    if (!value) {
      resetInput();
    }
  }, [value]);

  const handleResetUpload = () => {
    // 按下reset的時候把input清空，並把config設為預設值
    resetInput();
    props.onChange(key, null);
    // todo onchange
  };

  const handleFileOnChange = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    const data = new FormData();
    const { size, name } = file;
    data.append('image', file);
    // 先驗證圖片大小不能超過1MB
    if (size > 1024 * 1024) {
      triggerFileInput.current.value = '';
      setAlertConfig({ open: true, msg: `您的圖片[${name}]大小超過1MB，請重新上傳檔案` });
      return;
    }
    setAlertConfig({ open: false, msg: '' });
    setFilename(name);

    const onUploadProgress = (progress) => {
      // 處理進度條
      const { loaded, total } = progress;
      const percent = Math.ceil((loaded / total) * 100);
      setPercentage(percent);
    };

    try {
      const res = await Resource.BomDetailResource.uploadImage(data, onUploadProgress);
      const { id, data: imagePath } = res.data;
      setPercentage(0);
      console.log('image上傳成功:', res);
      props.onChange(key, id);
      // 更新預覽照片的path
      props.setImagePath(imagePath);
    } catch (error) {
      // 處理上傳失敗
      resetInput();
      props.onChange(key, null);
      props.pushNotification({
        message: '上傳失敗，請重新上傳',
        level: 'error'
      });
    }
  };


  const fileDisplayName = filename || value;

  const handleDownload = (e) => {
    fetch(props.imagePath, {
      method: 'GET'
    })
      .then(response => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileDisplayName); // or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <NormalFieldDiv readOnly={readOnly && !(withDownload && fileDisplayName)} className="duck-field">
      <div className="duck-field--label-zone">
        <label className="duck-field--label-zone--label" htmlFor={key}>
          {label}
        </label>
        {require ? <div className="duck-field--label-zone--requiredMark">*</div> : null}
      </div>
      <div className="single-upload-field">
        <div className="duck-field--input">
          {/* 真實的fileupload input */}
          <input
            id={key}
            type="file"
            accept="image/*"
            multiple={false}
            disabled={readOnly}
            style={{ display: 'none' }}
            ref={triggerFileInput}
            onChange={handleFileOnChange}
          />
          {/* 顯示檔名、上傳進度、圖片預覽icon */}
          <div className="file-box">
            <div className="file-box-text">{fileDisplayName}</div>
            {percentage > 0 && <div className="file-box-percentage">({percentage}%)</div>}
            {(fileDisplayName && props.imagePath) &&
              <div className="file-box-icon">
                <Icon
                  icon="BtnImage"
                  className="btn-image"
                  onClick={() => setPreviewOpen(true)}
                />
              </div>}
          </div>
          {/* 按鈕們 */}
          <div className="function-box">
            {/* 移除按鈕 */}
            {fileDisplayName && !readOnly &&
              <button type="button" className="delete-btn" onClick={handleResetUpload}>
                <Icon icon={IconName.BtnRemove} size="12px" />
                Remove
              </button>
            }
            {/* 檔案上傳按鈕 */}
            {withDownload && fileDisplayName ?
              <button
                className="upload_img_btn green"
                onClick={handleDownload}
                type="button"
              >
                Download
              </button> :
              <button
                className="upload_img_btn"
                onClick={() => triggerFileInput.current.click()}
                type="button"
                disabled={readOnly}
              >
                {fileDisplayName ? 'Replace Image' : 'Upload Image'}
              </button>}
          </div>

        </div>
      </div>
      <PreviewImage
        isOpen={previewOpen}
        image={props.imagePath}
        toggleClose={() => setPreviewOpen(false)}
      />

      <Alert isOpen={alertConfig.open} type="alarm">
        <div className="row">{alertConfig.msg}</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={() => setAlertConfig({ open: false, msg: '' })}
          >確定
          </Button>
        </div>
      </Alert>
    </NormalFieldDiv >
  );
};

ImageField.defaultProps = {
  field: {
    label: '',
    require: false,
    key: '',
    readOnly: false
  },
  onChange: () => { },
  formData: {},
  value: '',
  // 預覽照片時需要用到的path
  imagePath: ''
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  pushNotification: NotificationSystemActions.pushNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageField);

