import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';

import PartlistResource from '~~apis/resource/PartlistResource';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import Icon, { IconName } from '~~elements/Icon';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import PreviewImage from '~~elements/PreviewImage';
import LabelField from './LabelField';

const NormalFieldDiv = styled.div`
  .single-upload-field {
    position: relative;
    .duck-field {
      &--input {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #333333;
        padding-bottom: 4px;
        width: 100%;
        font-size: 0.9rem;
        background: transparent;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        overflow: hidden;
        justify-content: space-between;
        opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};


        .file-box {
          position: relative;
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;
          flex: 0 100%;
          align-items: center;
          min-width: 0;
          vertical-align: middle;
          &-text {
            flex: 0 auto;
            max-width: calc(100% - 6rem);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          /* &-percentage {} */
          &-icon {
            margin-left: 0.5rem;
            min-width: 0;
            display: inline-block;
          }
        }

        /* 按鈕的部份 */
        .function-box {
          position: relative;
          min-width: auto;
          -webkit-flex: 0 auto;
          -ms-flex: 0 auto;
          flex: 0 auto;
          flex-wrap: nowrap;
          white-space: nowrap;
          .green {
            background: #00A99D;
            color: #FFFFFF;
            &:hover {
              cursor: pointer;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
`;

@connect(
  (state) => ({
    emdmImgList: state.bomDetail.emdmImgList,
  }),
  {
    pushNotification: NotificationSystemActions.pushNotification,
  }
)
export default class UploadField extends Component {
  static defaultProps = {
    name: '',
    value: '',
    onChange: () => { },
    fieldConfig: { label: '', require: false, getUrl: '', uploadUrl: '', key: uuidv4() },
  }

  constructor(props) {
    super(props);
    this.triggerFileInput = null;

    this.state = {
      percentage: 0,
      uploading: false,
      fileid: props.value || null, // the id upload api returned => have to be an array
      filename: props.value ? props.value[0] : '', // local file name or file id => string
      isPreview: false,
      image: '', // base 64 format image for preview
      alertMsg: '',
    };
  }


  // FIXME: refactor
  componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.value, nextProps.value) && !this.props.value) {
      this.setState({
        fileid: nextProps.value, // the id upload api returned => have to be an array
        filename: nextProps.value ? nextProps.value[0] : '', // local file name or file id => string
      });
    }
  }


  componentWillUnmount() {
    this.setState({
      percentage: 0,
      uploading: false,
      fileid: null,
      filename: null,
      isPreview: false,
      image: '',
      alertMsg: '',
    });
  }


  /**
   * 檔案上傳
   */
  handleFileOnChange = (e) => {
    e.preventDefault();
    const { fieldConfig: { uploadUrl }, fieldConfig: field, name, onChange, setImages } = this.props;
    const file = e.target.files[0];
    const data = new FormData();
    data.append('image', file);
    const { name: filename } = file;


    // 先驗證圖片大小
    if (file.size > 1024 * 1024) {
      this.setState({
        alertMsg: `您的圖片[${filename}]大小超過1MB，請重新上傳檔案`,
      });
      return;
    }


    PartlistResource.uploadSingleImage(uploadUrl, {
      data,
      onUploadProgress: (progress) => {
        const { loaded, total } = progress;
        this.setState({
          percentage: Math.ceil((loaded / total) * 100),
          uploading: true,
          filename,
        });
      },
    }).then((res) => {
      const { data: { values } } = res;
      const fileid = [values];
      this.setState({
        fileid,
        filename,
      }, () => {
        onChange(fileid);
        setImages([fileid]);
      });
    }).catch((error) => {
      this.setState({
        filename: '',
        fileid: null,
        percentage: 0,
      }, () => {
        this.props.pushNotification({
          message: '上傳失敗，請重新上傳',
          level: 'error'
        });
        this.triggerFileInput.value = '';
        onChange(null);
        setImages([]);
      });
    }).finally(() => {
      this.setState({
        uploading: false,
      });
    });
  }

  handleResetUpload = () => {
    const { name, onChange, fieldConfig: field, setImages } = this.props;
    this.triggerFileInput.value = '';
    this.setState({
      filename: '',
      percentage: 0,
      fileid: null,
    }, () => {
      onChange(null);
      setImages([]);
    });
  }

  togglePreview = (status) => {
    const { fieldConfig: { getUrl } } = this.props;
    const { fileid } = this.state;

    const url = getUrl.replace(':{imageid}', fileid);
    PartlistResource.getImageById(url, fileid)
      .then((res) => {
        const { data: { values: image } } = res;
        this.setState({
          image,
          isPreview: status
        });
      }).catch((error) => {
        this.setState({
          isPreview: status,
        }, () => {
          this.props.pushNotification({
            message: '取得圖片失敗，請稍候再試',
            level: 'error'
          });
          this.triggerFileInput.value = '';
        });
      });
  }

  toggleUrlPreview = (status) => {
    const { emdmImgList } = this.props;
    this.setState({
      image: emdmImgList[0].url,
      isPreview: status
    });
  }

  closePreview = () => {
    this.setState({
      isPreview: false,
    });
  }

  handleCloseAlert = () => {
    this.setState({
      alertMsg: '',
    });
  }

  handleDownload = (e) => {
    const img = this.props.emdmImgList[0];
    fetch(img.url, {
      method: 'GET'
    })
      .then(response => {
        response.arrayBuffer().then((buffer) => {
          const imgUrl = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = imgUrl;
          link.setAttribute('download', img.fileName); // or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { name, value, onChange, fieldConfig, disabled, emdmImgList } = this.props;
    const {
      percentage,
      uploading,
      fileid,
      filename,
      image,
      isPreview,
      alertMsg } = this.state;
    const isEmdmPart = emdmImgList.length > 0;

    return (
      <NormalFieldDiv className="duck-field" disabled={disabled && !isEmdmPart}>
        <LabelField name={name} fieldConfig={fieldConfig} />
        <div className={`single-upload-field e2e-single-upload-field---${fieldConfig.key}`}>
          <div className="duck-field--input">
            {/* 真實的fileupload input */}
            <input
              type="file"
              accept="image/*"
              multiple={false}
              style={{ display: 'none' }}
              ref={fileInput => { this.triggerFileInput = fileInput; }}
              onChange={this.handleFileOnChange}
              className={`e2e-single-upload---${fieldConfig.key}`}
            />
            {/* 顯示檔名、上傳進度、圖片預覽icon: show file name when epro have file or eMDM have file */}
            <div className="file-box">
              {
                (filename || isEmdmPart) &&
                (
                  <React.Fragment>
                    <div className="file-box-text">
                      {isEmdmPart ? emdmImgList[0].fileName : filename}
                    </div>
                    {percentage > 0 ?
                      <div className="file-box-percentage">{`(${percentage}%)`}</div> :
                      null}
                    <Icon
                      size="1.2rem"
                      icon="BtnImage"
                      className={`file-box-icon btn-image e2e-single-upload-btn-preview---${fieldConfig.key}`}
                      onClick={() => (isEmdmPart ? this.toggleUrlPreview(true) : this.togglePreview(true))}
                    />
                  </React.Fragment>
                )
              }
            </div>
            {/* 按鈕們 */}
            <div className="function-box">
              {/* 移除按鈕 */}
              {filename && !disabled && !isEmdmPart &&
                <Button
                  color="transparent"
                  border={false}
                  mini
                  round
                  className={`delete-btn e2e-single-upload-btn-delete---${fieldConfig.key}`}
                  onClick={this.handleResetUpload}
                >
                  <Icon icon={IconName.BtnRemove} size="12px" />
                  Remove
                </Button>}
              {/* 檔案上傳按鈕 */}
              {isEmdmPart ?
                <Button
                  color="transparent"
                  border
                  mini
                  round
                  className={`upload_img_btn green e2e-single-upload-btn-upload---${fieldConfig.key}`}
                  onClick={this.handleDownload}
                >
                  Download
                </Button> :
                <Button
                  color="transparent"
                  border
                  mini
                  round
                  disabled={disabled}
                  className={`upload_img_btn e2e-single-upload-btn-upload---${fieldConfig.key}`}
                  onClick={() => this.triggerFileInput.click()}
                >
                  {filename ? 'Replace Image' : 'Upload Image'}
                </Button>}
            </div>
          </div>
        </div>
        <PreviewImage
          isOpen={isPreview}
          image={image}
          toggleClose={this.closePreview}
          onDownload={isEmdmPart ? this.handleDownload : null}
        />

        <Alert isOpen={alertMsg} type="alarm">
          <div className="row">{alertMsg}</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={this.handleCloseAlert}
              className={`e2e-single-upload-btn-close-alert---${fieldConfig.key}`}
            >
              確定
            </Button>
          </div>
        </Alert>
      </NormalFieldDiv>
    );
  }
}
