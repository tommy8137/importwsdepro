import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';

import Radio from '~~elements/Radio';
import Button from '~~elements/Button';

const ChooseVersionModal = styled(Modal.Modal)`
  .modal-body {
    @media (max-width: 1366px) {
      height: 20rem;
    }
    height: 32rem;
    overflow-y: scroll;
    position: sticky;
    .version-title {
      padding: 0.5rem 1.25rem;
      height: 36px;
      line-height: 36px;
      background-color: #e5e5e5;
      font-family: Roboto;
      font-size: 18px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.17;
      letter-spacing: normal;
      text-align: left;
    }
    .version-list {
      padding: 1.25rem;
    }
    .radio-version {
      height: 2.8125rem;
      display: flex;
      align-items: center;
      &.empty {
        justify-content: center;
      }
    }
  }
`;

export default class BomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: null,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({
        selectedID: nextProps.defaultValue
      });
    }
  }


  handleChangeRadio = (e) => {
    const { target: { value: selectedID } } = e;
    this.setState({
      selectedID
    });
  }

  handleClickCancel = (e) => {
    this.props.onClickCancel();
    this.setState({
      selectedID: null,
    });
  }

  handleClickChoose = (e) => {
    const { selectedID } = this.state;
    this.props.onClickChoose(selectedID);
  }


  render() {
    const { isOpen, versionList } = this.props;
    const { selectedID } = this.state;
    const isNoVersion = versionList.length === 0;
    return (
      <ChooseVersionModal
        isOpen={isOpen}
      >
        <Modal.ModalHeader>
          Choose eEDM Version
        </Modal.ModalHeader>
        <Modal.ModalBody>
          <div className="version-title">
            Version
          </div>
          <div className="version-list">
            {isNoVersion && <div className="radio-version empty">目前尚無版本資料</div>}
            {versionList.map(v => (
              <div className="radio-version" key={v.version}>
                <Radio
                  name={v.version}
                  value={v.id}
                  onChange={this.handleChangeRadio}
                  checked={selectedID === v.id}
                >
                  {v.version}
                </Radio>
              </div>
              ))}
          </div>
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button color="white" onClick={this.handleClickCancel}>Cancel</Button>
          {/* 有版本時會自動選第一個，沒有版本時鎖Choose鈕 */}
          <Button color="black" disabled={isNoVersion} onClick={this.handleClickChoose}>Choose</Button>
        </Modal.ModalFooter>
      </ChooseVersionModal>);
  }
}

// [ref] formik remote submit: https://stackoverflow.com/a/53383909
