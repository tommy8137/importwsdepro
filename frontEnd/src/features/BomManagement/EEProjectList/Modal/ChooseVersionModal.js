import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Table from '~~elements/Table';
import _get from 'lodash/get';

import Button from '~~elements/Button';

import ChooseVersionColumnSetting from './ChooseVersionColumnSetting';


const ChooseVersionModal = props => {
  /**
   * 當按下底下close時
   */
  function handleClickCancel() {
    props.onClickCancel();
  }

  /**
   * click version row
   * @param {*} event click event
   * @param {*} record version data
   */
  function handleClickRow(event, record) {
    const { id: edmVersionID, version: edmVersion } = record;
    event.stopPropagation();
    props.onClickChoose(edmVersionID);
  }

  const { isOpen, versionList = [] } = props;
  const isNoVersion = versionList.length === 0;

  return (
    <Modal.Modal
      isOpen={isOpen}
    >
      <Modal.ModalHeader>
        Choose eEDM Version
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Table
          headerColor="blue"
          onRow={(record, rowIndex) => {
            return {
              onClick: event => handleClickRow(event, record)
            };
          }}
          rowKey={record => `${record.eebom_project_id}-${record.id}`}
          columns={ChooseVersionColumnSetting(props)}
          dataSource={versionList}
          // onChange={handleTableChange}
          pagination={false}
        />
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>Close</Button>
      </Modal.ModalFooter>
    </Modal.Modal>);
};

export default ChooseVersionModal;

// // [ref] formik remote submit: https://stackoverflow.com/a/53383909
