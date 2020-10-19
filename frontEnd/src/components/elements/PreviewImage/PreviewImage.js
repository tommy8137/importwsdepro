import React from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Icon from '~~elements/Icon';
import Button from '~~elements/Button';

const Wrapper = styled(Modal.Modal)`
  .modal-content {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    height: 100vh;
    position: relative;
  .arrow{
    border: 2px solid rgba(255, 255, 255, 1);
    width: 1.5rem;
    height: 1.5rem;
    transform: rotate(-45deg);
    position: absolute;
    cursor: pointer;
    &.--left{
      border-bottom: none;
      border-right: none;
      left: -5rem;
    }
    &.--right{
      border-top: none;
      border-left: none;
      right: -5rem;
    }
  }
  .image{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 90%;
    }
    .btn-close{
      width: 1.5rem;
      cursor: pointer;
      position: absolute;
      top: -0.7rem;
      right: 0.8rem;
    }
  }
  .download-btn {
    margin-top: 1rem;
  }
  .dots{
    display: flex;
    margin-top: 1rem;
    .dot{
      width: 0.8rem;
      height: 0.8rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 50%;
      margin: 0 0.5rem;
      cursor: pointer;
      &.active{
        transition: 0.3s ease all;
        background: #333333;
        border: 1px solid rgba(255, 255, 255, 1);
      }
    }
  }
}
`;

const PreviewImage = (props) => {
  const {
    isSingle,
    imgIdList,
    isOpen,
    activeIndex,
    image,
    handlePreviewImg,
    toggleClose,
    onDownload,
  } = props;

  function onLeft() {
    if (activeIndex > 0) {
      // console.log('上一張');
      handlePreviewImg(activeIndex - 1);
    } else if (activeIndex === 0) {
      // console.log('最後一張');
      handlePreviewImg(imgIdList.length - 1);
    }
  }

  function onRight() {
    if (activeIndex < imgIdList.length - 1) {
      // console.log('下一張');
      handlePreviewImg(activeIndex + 1);
    } else if (activeIndex === imgIdList.length - 1) {
      // console.log('第一張');
      handlePreviewImg(0);
    }
  }

  function handleClickDot(index) {
    handlePreviewImg(index);
  }


  return (
    <Wrapper isOpen={isOpen}>
      {/* 往左的箭頭 */}
      {!isSingle && <div className="arrow --left" onClick={() => onLeft()} onKeyUp={() => {}} />}

      {/* 圖片 */}
      <div className="image">
        <Icon
          icon="BtnCloseImage"
          className="btn-close"
          onClick={toggleClose}
        />
        <img src={image} alt="" />

        {/* Download button */}
        <div className="download-btn">
          {onDownload ?
            <Button
              round
              color="white"
              onClick={onDownload}
            >
              <Icon icon="IcoDownload" className="field--icon download" size="1rem" />
              Download
            </Button> :
            null }
        </div>

        {/* 下面的點點。有幾張圖片就有幾個點點，只有一張的話就沒有點點。 */}
        {!isSingle &&
        <div className="dots">
          {imgIdList.map((item, index) => {
              return (
                <div
                  key={item}
                  className={activeIndex === index ? 'dot active' : 'dot'}
                  onKeyUp={() => {}}
                  onClick={() => handleClickDot(index)}
                />
              );
            })}
        </div>}
      </div>

      {/* 往右的箭頭 */}
      { !isSingle && <div className="arrow --right" onClick={() => onRight()} onKeyUp={() => {}} />}
    </Wrapper>
  );
};


PreviewImage.defaultProps = {
  /** 是否開啟 */
  isOpen: false,
  /** 圖片的base64或url */
  image: '',
  /** 控制開關的function */
  toggleClose: () => {},

  // 輪播才需要的props
  /** 是否為單張圖片 */
  isSingle: true,
  /** 所有圖片的id */
  imgIdList: [],
  /** 圖片的index */
  activeIndex: 0,
  /** 換圖片要用的function */
  handlePreviewImg: () => {}
};

export default PreviewImage;

