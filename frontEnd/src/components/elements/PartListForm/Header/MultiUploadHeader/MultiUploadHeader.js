import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import _uniq from 'lodash/uniq';
import _fpGet from 'lodash/fp/get';
import PartlistResource from '~~apis/resource/PartlistResource';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import FileRow from './FileRow';
import FileRowByUrl from './FileRowByUrl';

const HeaderContainer = styled.div`
  flex: 0 100%;
  position: sticky;
  z-index: 2;
  top: 0;
  padding: 1rem;
  background-color: #e5e5e5;
  margin-left: -15px;
  width: calc(100% + 30px);
  p {
    margin: 0;
    font-weight: bolder;
  }
  .btn {
    position: absolute;
    right: 2%;
    top: 50%;
    width: auto;
    height: auto;
    line-height: 1;
    border: 1px solid #333;
    font-size: 0.8rem;
    background-color: transparent;
    color: #333;
    transform: translate(0, -50%);
    border-radius: 1.5rem;
  }
`;

const EmptyRow = styled.div`
  height: 2.6875rem;
  border-top: 2px solid #333333;
  border-bottom: 1px solid #333333;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  margin-left: -15px;
  width: calc(100% + 30px);
`;
@connect(
  (state) => ({
    emdmImgList: state.bomDetail.emdmImgList,
  }),
  {
    pushNotification: NotificationSystemActions.pushNotification,
  }
)
export default class MultiUploadHeader extends Component {
  static defaultProps = {
    hasBtn: true,
    text: 'Upload Image'
  }

  constructor(props) {
    super(props);
    this.state = {
      uploadFiles: {},
      alertMsg: '',
    };

    this.triggerFileInput = null;
  }

  componentDidMount() {
    const { formData, fieldConfig: { uploadUrl }, formDataPaths, onChange, setImages } = this.props;
    const value = _fpGet(formDataPaths)(formData) || [];
    // console.log('formData', formData);
    // console.log('formDataPaths', formDataPaths);
    // console.log('value', value);
  }


  handleFileOnChange = async (e) => {
    e.preventDefault();

    const {
      formData, fieldConfig: { uploadUrl }, formDataPaths, onChange, setImages, limit
    } = this.props;
    const value = _fpGet(formDataPaths)(formData) || [];
    const filecount = e.target.files.length;

    // 上傳張數限制
    if (limit && (Object.keys(this.state.uploadFiles).length + filecount) > limit) {
      this.setState({
        alertMsg: `您的上傳圖片張數超過${limit}張`,
      });
      return;
    }

    for (let index = 0; index < filecount; index++) {
      const key = uuidv4();

      // 要送給API的資料
      const file = e.target.files[index];
      const data = new FormData();
      data.append('image', file);

      // layout要顯示檔名
      const { name: filename } = file;

      // 進度call back
      const onUploadProgress = (progress) => {
        const { loaded, total } = progress;
        this.setState({
          uploadFiles: {
            ...this.state.uploadFiles,
            [key]: {
              filename,
              size: total / 1024,
              uploading: true,
              percentage: Math.ceil((loaded / total) * 100),
            }
          }
        });
      };

      // 上傳完成後
      const handleFinishedUpload = (res) => {
        const { data: { values: fileid } } = res;
        const uploadFiles = {
          ...this.state.uploadFiles,
          [key]: {
            ...this.state.uploadFiles[key],
            uploading: false,
            fileid,
          },
          [fileid]: {
            ...this.state.uploadFiles[key],
            uploading: false,
            fileid,
          },
        };
        delete uploadFiles[key];
        this.setState({
          uploadFiles,
        });
      };

      // 錯誤處理
      const handleUploadError = (error) => {
        const { uploadFiles } = this.state;
        delete uploadFiles[key];
        this.setState({
          uploadFiles,
        }, () => {
          this.props.pushNotification({
            message: `圖片[ ${filename} ]上傳失敗，請重新上傳`,
            level: 'error'
          });
        });
      };

      // 結束上傳
      const handleFinally = () => {
        this.triggerFileInput.value = ''; // 清空input裡的值
        const { uploadFiles } = this.state;
        const returnValue = Object.keys(uploadFiles).map(k => uploadFiles[k].fileid).filter(v => !!v);
        onChange(_uniq([...returnValue, ...value]), formDataPaths); // 將值傳回給partlist form
        setImages(_uniq([...returnValue, ...value]));
      };


      // 先驗證圖片大小
      if (file.size > 1024 * 1024) {
        this.setState({
          alertMsg: `您的圖片[${filename}]大小超過1MB，請重新上傳檔案`,
        });
      } else {
        PartlistResource.uploadSingleImage(uploadUrl, {
          data,
          onUploadProgress,
        }).then(handleFinishedUpload)
          .catch(handleUploadError)
          .finally(handleFinally);
      }
    }
  };

  handleRemove = (key) => {
    const { formData, formDataPaths, onChange, setImages } = this.props;
    const { uploadFiles } = this.state;
    const value = _fpGet(formDataPaths)(formData) || [];

    delete uploadFiles[key];
    _remove(value, o => o === key);
    const returnValue = Object.keys(uploadFiles).map(k => uploadFiles[k].fileid).filter(v => !!v);

    this.setState({
      uploadFiles
    }, () => {
      setImages(_uniq([...returnValue, ...value]));
      onChange(_uniq([...returnValue, ...value]), formDataPaths);
    });
  }

  handleCloseAlert = () => {
    this.setState({
      alertMsg: '',
    });
  }

  render() {
    const { formData, text, formDataPaths,
      parentFieldConfig: { label, key: parentFieldKey  },
      fieldConfig: { uploadUrl, getUrl, key },
      disabled, emdmImgList } = this.props;
    const { alertMsg, uploadFiles: uploadFilesState } = this.state;
    const value = _fpGet(formDataPaths)(formData) || [];
    let uploadFiles = {};
    (value || []).forEach((v) => { uploadFiles[v] = { filename: v, percentage: 100, fileid: v }; });
    uploadFiles = { ...uploadFiles, ...uploadFilesState };
    const isEmdmPart = emdmImgList.length > 0;

    return (
      <Fragment>
        <HeaderContainer
          className={`field-group-title e2e-multi-upload-header---${parentFieldKey}`}
          id={`part-list-anchor--${parentFieldKey}`}
        >
          <p>{label}</p>
          {!disabled &&
          <Button
            className={`btn e2e-multi-upload-btn-upload---${key}`}
            color="black"
            onClick={() => this.triggerFileInput.click()}
            disabled={disabled}
          >
            {text}
          </Button>}

          {/* 真實的fileupload input */}
          <input
            type="file"
            accept="image/*"
            multiple={true}
            style={{ display: 'none' }}
            ref={fileInput => { this.triggerFileInput = fileInput; }}
            onChange={this.handleFileOnChange}
            disabled={disabled}
            className={`btn e2e-multi-upload---${key}`}
          />
        </HeaderContainer>
        {/* 預覽的欄位 */}

        <div className="field-group">
          <div className="field-root field-root--6">
            {/* no images message */}
            {(!Object.keys(uploadFiles).length && !emdmImgList.length) &&
              <EmptyRow className={`e2e-multi-upload-empty-row---${key}`}>您尚未上傳圖片</EmptyRow>}
            {/* epro images & emdm image source are difference */}
            {isEmdmPart ?
            emdmImgList.map((img, idx) =>
              (<FileRowByUrl
                key={idx}
                index={idx}
                image={img}
                images={emdmImgList}
                className={`e2e-multi-upload-row---${key}${idx + 1}`}
              />)) :
            Object.keys(uploadFiles).map((k, index) =>
              (<FileRow
                key={k}
                fileinfo={{ ...uploadFiles[k], uploadUrl, getUrl }}
                fileIdList={value} // ['id1', 'id2', 'id3']
                onRemove={() => this.handleRemove(k)}
                disabled={disabled}
                className={`e2e-multi-upload-row---${key}${index + 1}`}
              />))}
          </div>
        </div>


        <Alert isOpen={alertMsg} type="alarm">
          <div className="row">{alertMsg}</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={this.handleCloseAlert}
              className={`e2e-multi-upload-btn-close-alert---${key}`}
            >
              確定
            </Button>
          </div>
        </Alert>
      </Fragment>
    );
  }
}
