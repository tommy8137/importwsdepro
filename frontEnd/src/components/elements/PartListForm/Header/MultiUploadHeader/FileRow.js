import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Icon, { IconName } from '~~elements/Icon';
import PartlistResource from '~~apis/resource/PartlistResource';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import PreviewImage from '~~elements/PreviewImage';

const Div = styled.div`
  height: 2.6875rem;
  border-bottom: 1px solid #333333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* 顯示文字的部份 */
  .file-box {
    position: relative;
    &-text {
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: calc(100% / 3 - 1rem);
      max-width: 40%;
    }
    &-size {
      width: calc(100% / 3 - 1rem);
    }


    /* 按鈕的部份 */
    &-function {
      width: calc(100% / 3 - 1rem);
      position: relative;
      height: 1.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .delete-btn {
        width: 5rem;
        height: inherit;
        border: none;
        color: #333333;
        font-size: 12px;
        cursor: pointer;
        border-radius: 1rem;
        line-height: 14px;
        transition: .3s ease all;
        text-align: right;
        display: flex;
        justify-content: space-around;
        align-items: center;

        &:focus {
          outline: none;
        }
        &:hover {
          color: #555;
          &:active {
            color: #333;
          }
        }
      }
      .btn-image {
        width: 1.25rem;
        cursor: pointer;
      }
    }
  }
  &.file-box:nth-of-type(1) {
    border-top: 2px solid #333;
  }

`;

@connect(
  (state) => ({}),
  {
    pushNotification: NotificationSystemActions.pushNotification,
  }
)
export default class FileRow extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      image: '',
      activeIndex: 0,
    };
  }

  /**
   * togglePreview是個別preview
   * @param {boolean} showPreview 是否開啟preview
   */
  togglePreview = (showPreview) => {
    const { fileinfo: { fileid, getUrl }, fileIdList } = this.props;
    const url = getUrl.replace(':{imageid}', fileid);
    PartlistResource.getImageById(url, fileid)
      .then((res) => {
        const { data: { values: image } } = res;
        this.setState({
          image,
          showPreview,
          activeIndex: fileIdList.indexOf(fileid)
        });
      }).catch((error) => {
        console.log('取得圖片失敗 >>>', error.response);
        this.setState({
          image: '',
          showPreview: false,
        }, () => {
          this.props.pushNotification({
            message: '取得圖片失敗，請稍候再試',
            level: 'error'
          });
        });
      });
  }

  /**
 *handlePreviewMultiImg是可以輪播
 * @param {Array} list image id 的list
 * @param {Number} index 第幾個image id
 */
  handlePreviewMultiImg = (index) => {
    const { fileIdList } = this.props;
    const apiUrl = `/bom/partlist/getImage/${fileIdList[index]}`;
    PartlistResource.getImageById(apiUrl)
      .then(res => {
        const { data: { values: base64 } } = res;
        this.setState({
          image: base64,
          activeIndex: index
        });
      })
      .catch(error => {
        console.log('取得圖片失敗 >>>', error.response);
        this.props.pushNotification({
          message: '取得圖片失敗，請稍候再試',
          level: 'error'
        });
      }
      );
  }

  render() {
    const { fileinfo: { filename, percentage, size, getUrl, fileid }, onRemove, fileIdList, disabled } = this.props;
    const { showPreview, image, activeIndex } = this.state;

    return (
      <Fragment>
        <Div className="file-box">
          <div className="file-box-text" title={filename}>{filename}({percentage}%)</div>
          {size && <div className="file-box-size">{size}KB</div>}

          {/* 按鈕們 */}
          <div className="file-box-function">
            {filename &&
            <Icon
              icon="BtnImage"
              className="btn-image"
              onClick={() => this.togglePreview(true)}
            />}
            {/* 移除按鈕 */}
            {filename && !disabled &&
            <button type="button" className="delete-btn" onClick={e => onRemove()}>
              <Icon icon={IconName.BtnRemove} size="12px" />
              Remove
            </button>}
          </div>

        </Div>
        {image &&
        <PreviewImage
          isOpen={showPreview}
          isSingle={fileIdList.length === 1}
          imgIdList={fileIdList}
          activeIndex={activeIndex}
          image={image}
          handlePreviewImg={this.handlePreviewMultiImg}
          toggleClose={() => this.setState({ showPreview: false })}
        />}
      </Fragment>
    );
  }
}
