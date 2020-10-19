import React, { Component, Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';
import { exportTxt } from '~~utils/CommonUtils';
import { EnhanceTooltip } from '~~elements/Tooltip';

const Div = styled.div`
display: flex;
align-items: center;
justify-content: center;
>div{
line-height: 3rem;
}
.left{
  margin-right: 2rem;
  >div{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon{
    width: 1rem;
    margin-left: 0.5rem
  }
}
.right{
  display: flex;
  flex-direction: column;
  >div{
    display: flex;
    align-items: center;
  }
  .icon{
    width: 0.8rem; 
    margin-left: 0.5rem;
  }
  .IcoDiv{
    position: relative;
    &:hover{
      .instruction {
        opacity: 1;
        visibility: visible;
        transform: translate(0,0);
      }
    }
  }
  .instruction{
    background: white;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
    position: absolute;
    left: 2rem;
    top: -3.5rem;
    border-radius: 0.2rem;
    width: 16rem;
    padding: 0.6rem 1rem ;
    opacity: 0;
    visibility: hidden;
    line-height: 1.5rem;
    font-size: 0.8rem;
    transform: translate(-12px, 0);
    transition: 0.3s ease all;
  }
}
`;

/* 錯誤訊息詳細內容 */
const ErrorBox = styled.div`
  padding: 1rem 0.375rem 0 0.375rem;
  color: #333333;
  font-size: 1rem;
  position: relative;
  .export-btn {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }
  .error-title {
    line-height: 1.25rem;
    margin-bottom: unset;
  }
  .error-detail {
    border: 1px solid #d7d7d7;
    height: 11.75rem;
    overflow-y: auto;
    padding: 0.5rem;
    &-item {
      margin-bottom: unset;
    }
  }
`;

const ImportErrorList = (props) => {
  const {
    passCount = 0,
    failCount = 0,
    failRows = [],
    errorTxtFileName = '',
  } = props;

  const iconEl = useRef(null);

  /**
   * 匯出錯誤txt
   */
  function handleExportErrorTxt() {
    const exportString = failRows.reduce((prev, curr) => {
      const { item, errorCode } = curr;
      const errorMsg = getMessageByErrorCode(errorCode);
      return `${prev}Row ${item} ${errorMsg}\r\n`;
    }, '');
    exportTxt(exportString, errorTxtFileName);
  }

  return (
    <Fragment>
      {/* 成功及失敗資料筆數 */}
      <Div>
        <div className="left">
          <div>Success<Icon icon="IcoGreenCheck" /></div>
          <div>Failure<Icon icon="IcoRedFail" /></div>
        </div>
        <div className="right">
          <div>{passCount} {passCount === 1 ? 'item' : 'items'}</div>
          <div>
            {failCount} {failCount === 1 ? 'item' : 'items'}
            <div ref={iconEl}>
              <Icon icon={IconName.IcoInstruction} />
            </div>
            <EnhanceTooltip target={iconEl} placement="right">
              讀取失敗可能因為您的資料中有空白列或格式錯誤。您可以返回上一步重新上傳檔案，或選擇繼續下一步。
            </EnhanceTooltip>
          </div>
        </div>
      </Div>

      {/* 失敗的詳細資料 */}
      <ErrorBox>
        {
          failCount > 0 &&
          <Button
            className="export-btn"
            color="transparent"
            round
            disabled={false}
            onClick={handleExportErrorTxt}
          >
            <Icon icon={IconName.IcoExport} size="1rem" />
            Export
          </Button>
        }
        <p className="error-title">Error Details</p>
        <div className="error-detail">
          {failCount > 0 && <p className="error-detail-item">Please check the following row(s):</p>}
          {failRows.map(row => (<p className="error-detail-item">Row {row.item} {getMessageByErrorCode(row.errorCode)}</p>))}
        </div>
      </ErrorBox>
    </Fragment>
  );
};

export default ImportErrorList;
