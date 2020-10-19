import React, { Fragment } from 'react';
import Icon from '~~elements/Icon';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';
import { Step2Div, ErrorBox } from '~~features/BomManagement/BomDetail/components/ImportFile/ImportFileStyles';


function MaterialPriceStep2(props) {
  const {
    passCount = 0,
    failCount = 0,
    failRows = []
  } = props;
  return (
    <Fragment>
      {/* 成功及失敗資料筆數 */}
      <Step2Div>
        <div className="left">
          <div>Success<Icon icon="IcoGreenCheck" /></div>
          <div>Failure<Icon icon="IcoRedFail" /></div>
        </div>
        <div className="right">
          <div>{passCount} items(s)</div>
          <div>
            {failCount} item(s)
            {failCount ?
              <div className="IcoDiv">
                <Icon icon="IcoInstruction" />
                <div className="instruction">
                  讀取失敗可能因為您的資料中有空白列或格式錯誤。您可以返回上一步重新上傳檔案，或選擇繼續下一步。
                </div>
              </div>
              : null}
          </div>
        </div>
      </Step2Div>

      {/* 失敗的詳細資料 */}
      <ErrorBox>
        <p className="error-title">Error Details</p>
        <div className="error-detail">
          {failCount > 0 && <p className="error-detail-item">Please check the following information:</p>}
          {failRows.map((row, index) => (<p className="error-detail-item" key={index}>Sheet:{row.sheetName}, Material Spec: {row.materialSpec}, Material: {row.material}, 錯誤訊息: {getMessageByErrorCode(row.errorCode)}</p>))}
        </div>
      </ErrorBox>
    </Fragment>
  );
}

export default MaterialPriceStep2;

