import React, { useState, useRef } from 'react';

import styled from 'styled-components';
import Modal from '~~elements/Modal';
import * as R from 'ramda';

import Button from '~~elements/Button';
import useComponentSize from '~~hooks/useComponentSize';
import ModuleDataGrid from '../DataGrid/ViewAllDataGrid/ModuleDataGrid';


const ModalWrap = styled(Modal.Modal)`
  .modal-header {
    border-bottom: none;
    padding: 1rem 1rem;
    .modal-title {
      justify-content: flex-start;
      .title-text {
      font-weight: normal;
      text-align: left;
      }
    }
    .cost {
      display: flex;
      margin: 1rem 0 0 0;
      .caculate {
        margin-right: 2rem;
        font-size: 0.875rem;
        color: #808080;
        .num {
          font-size: 1rem;
          color: #333333;
        }
      }
    }
  }

  .modal-body{
    padding: 1.25rem 1rem 2.5rem;
  }

  .modal-footer {
    border-top: none;
  }
`;

const ByModuleTableModal = (props) => {
  const [sortInfo, setSortInfo] = useState([{
    sortOrder: 'asc',
    dataIndex: 'type1'
  }]);

  function getOrder(data) {
    const { sortOrder, dataIndex } = sortInfo[0];
    let sortedRows;
    switch (sortOrder) {
      case 'asc': {
        const condition = R.ascend(R.prop(dataIndex));
        sortedRows = R.sort(condition, data);
        break;
      }
      case 'desc': {
        const condition = R.descend(R.prop(dataIndex));
        sortedRows = R.sort(condition, data);
        break;
      }
      default: {
        sortedRows = data;
        break;
      }
    }
    return sortedRows;
  }
  return (
    <ModalWrap isOpen={props.isOpen} toggle={props.toggleModal} widthType="large">
      <Modal.ModalHeader>
        {props.header}
        {props.renderCostInfo()}
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <ModuleDataGrid
          rows={getOrder(props.info)}
          height={props.height - 120}
          sortInfo={sortInfo}
          updateSortInfo={(updatedObj) => {
            let updatedList = [].concat(updatedObj);
            // 更新sort
            setSortInfo(updatedList);
          }}
        />
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="black" onClick={props.toggleModal}>關閉</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default ByModuleTableModal;

