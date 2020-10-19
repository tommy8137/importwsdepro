import React, { Component } from 'react';
import Modal from '~~elements/Modal';
import styled from 'styled-components';

import Button, { BTN_COLOR } from '~~elements/Button';
import ExportButton from './component/ExportButton';
import DataGrid from './component/ModuleDataGrid';

const ModalWrap = styled(Modal.Modal)`
  /* modal的高度 */
  &.modal-dialog {
    max-width: 72.5rem;

    /* 標頭 */
    .modal-header {
      padding: 1.875rem 2.5rem 1rem 2.5rem;
      border-bottom: unset;
      .modal-title {
        .title-text {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    /* 內容 */
    .modal-body {
      overflow-y: hidden;
      padding: 0.25rem 2.5rem 1.5625rem 2.5rem;

      /* 1200px */
      @media (min-width: 1200px) {
        height: 520px;
       };

       /* 1800 */
      @media (min-width: 1800px) {
        height: 700px;
      };
    }
  }



  /* header置中 */
  .modal-title {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const EmptyRow = styled.div`
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${props => `${document.documentElement.clientHeight - 300}px`};
  .title {
    font-size: 1.375rem;
    font-weight: bolder;
    line-height: 3rem;
  }
  .context {
    font-size: 1rem;
  }
`;

/**
 * 可以匯出module detail的column type
 */
const EXPORT_BY_COLUMNTYPE = ['EE', 'PCB'];

export default class ModuleDetail extends Component {
  render() {
    const {
      moduleName,
      moduleList,
      toggleModuleDetail,
      isOpen,
      columnType,
      onExport,
    } = this.props;

    return (
      <ModalWrap isOpen={isOpen} widthType="large">
        <Modal.ModalHeader tag="div" className="modal-header">
          <span>{moduleName}</span>
          {EXPORT_BY_COLUMNTYPE.includes(columnType) &&
            <ExportButton
              onClick={onExport}
            />}
        </Modal.ModalHeader>
        <Modal.ModalBody>
          <DataGrid
            rows={moduleList}
            columnType={columnType}
            emptyRow={
              <EmptyRow>
                <div className="title">目前尚無資料</div>
                {/* <div className="context">您可以透過 Add New Item 或 Import 按鈕新增</div> */}
              </EmptyRow>}
          />

        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button
            color={BTN_COLOR.BLACK}
            onClick={() => toggleModuleDetail(false)}
          >
          Close
          </Button>
        </Modal.ModalFooter>
      </ModalWrap>
    );
  }
}
