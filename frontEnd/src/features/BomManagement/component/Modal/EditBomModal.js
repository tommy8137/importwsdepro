import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';

const HeaderBtn = styled(Button)`
  position: absolute;
  right: 0px;
  top: 5px;
`;

const EditBomModal = styled(Modal.Modal)`
  .modal-content{
    min-height: 43rem
  }
  .form-box {
    visibility: visible;
    opacity: 1;
    position: relative;
    left: 0px;
    transition: .3s ease all;
  }
  .hide {
    position: absolute;
    top: 0;
    left: -100%;
    opacity: 0;
    visibility: hidden;
    transition: .3s ease all;
  }
`;

const Tabs = styled.div`
  width: 100%;
  text-align: left;
  padding: 1rem 3.125rem 1rem 3.125rem;
  .tab {
    display: inline-block;
    height: 40px;
    opacity: 0.3;
    font-family: Roboto;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    cursor: pointer;
    margin-right: 30px;
    color: #404040;
    border: none;
  }
  .active {
    border-bottom: 6px solid #f5c910;
    opacity: 1;
    transition: .3s ease all;
  }
`;
export default class BomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      viewMode: true, // 只能看不能編輯
      shouldSubmit: false,
      isAlert: false
    };
    this.submitStep1Form = null;
    this.submitStep2Form = null;
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({
        viewMode: true,
        step: 1,
      });
    }
  }

  handleAlert = (status) => {
    this.setState({ isAlert: status });
  }

  handleClickCancel = (e) => {
    this.props.onClickCancel();
    this.setState({
      viewMode: true,
      step: 1,
    });
  }

  bindSubmitStep1 = (step1Form) => {
    this.submitStep1Form = step1Form;
  }

  bindSubmitStep2 = (step2Form) => {
    this.submitStep2Form = step2Form;
  }


  /**
   * step1 form 資料存檔
   */
  handleSubmitStep1Form = (bomProject) => {
    this.props.onDetailChange({ bomProject });
    if (this.state.shouldSubmit) {
      this.props.onClickSave();
    }
  }

  /**
   * step2 form 資料存檔
   */
  handleSubmitStep2Form = (bomDesignee) => {
    this.props.onDetailChange({ bomDesignee });
    if (this.state.shouldSubmit) {
      this.props.onClickSave();
    }
  }

  handleClickActiveForm = (step, e) => {
    // 切換頁籤
    this.setState({
      step,
      shouldSubmit: false,
    }, () => {
      // 每次切換form就要保存另一個form的資料
      if (step === 1) {
        this.submitStep2Form(e);
      } else {
        this.submitStep1Form(e);
      }
    });
  }

  handleClickSave = (e, step) => {
    // TODO: 要SAVE之前應該兩邊的form都要檢查資料內容，有error的就要切到該頁籤
    // 送回去給action
    this.setState({
      shouldSubmit: true,
    }, () => {
      // submit 2個form
      if (step === 1) {
        this.submitStep1Form(e);
      } else {
        this.submitStep2Form(e);
      }
    });
  }

  handleSwitchMode = (e) => {
    this.setState({
      viewMode: false,
    });
  }

  render() {
    const { isOpen } = this.props;
    const { step, viewMode } = this.state;
    return (
      <div>
        <EditBomModal isOpen={isOpen}>
          <Modal.ModalHeader>
            {viewMode ? 'BOM Information' : 'Edit BOM Information'}
            {viewMode &&
              <HeaderBtn
                color="transparent"
                round
                mini
                onClick={this.handleSwitchMode}
              >Edit BOM Info
              </HeaderBtn>}
          </Modal.ModalHeader>
          {/* BOM Information / Assignment選擇 */}
          <Tabs>
            <div
              className={`tab ${step === 1 ? 'active' : ''}`}
              onClick={e => this.handleClickActiveForm(1, e)}
              onKeyDown={null}
            >
              BOM Information
            </div>
            <div
              className={`tab ${step === 2 ? 'active' : ''}`}
              onClick={e => this.handleClickActiveForm(2, e)}
              onKeyDown={null}
            >
              Assignment
            </div>
          </Tabs>
          <Modal.ModalBody>
            {/* 表單內容 */}
            <div className={`form-box ${step === 1 ? '' : 'hide'}`}>
              <Step1Form
                viewMode={viewMode}
                isEdit
                bindSubmitForm={this.bindSubmitStep1}
                onSubmitForm={this.handleSubmitStep1Form}
              />
            </div>
            <div className={`form-box ${step === 2 ? '' : 'hide'}`}>
              <Step2Form
                viewMode={viewMode}
                isEdit
                bindSubmitForm={this.bindSubmitStep2}
                onSubmitForm={this.handleSubmitStep2Form}
              />
            </div>
          </Modal.ModalBody>
          <Modal.ModalFooter>
            <Button color="white" onClick={viewMode ? this.handleClickCancel : () => this.handleAlert(true)}>
              {viewMode ? 'Close' : 'Cancel'}
            </Button>
            {!viewMode && <Button color="black" onClick={e => this.handleClickSave(e, step)}>Save</Button>}
          </Modal.ModalFooter>
        </EditBomModal>
        <Alert isOpen={this.state.isAlert} type="alarm">
          <div className="row">請確認是否要離開?</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={(e) => {
                e.stopPropagation();
                this.handleAlert(false);
                this.handleClickCancel();
              }}
            >
              確定
            </Button>
            <Button
              color="black"
              onClick={(e) => {
                e.stopPropagation();
                this.handleAlert(false);
              }}
            >
              取消
            </Button>
          </div>
        </Alert>
      </div>);
  }
}
