import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import _mapKeys from 'lodash/mapKeys';
import { NormalField, SelectField } from '~~features/BomManagement/component/Fields';
import Button from '~~elements/Button';
import RoundButton from '~~elements/RoundButton';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import ErrorMsg from '~~features/BomManagement/EEProjectList/Modal/ViewBomModal/ErrorMsg';
import * as PCBDetailActions from './PCBDetailActions';
import { PATH } from './PcbDetailConst';

const Wrapper = styled.div`
  .modal-body{
    padding: 3rem 8rem;
    overflow: unset
  }
  .inline-btns {
    display: block;
    margin-bottom: 1rem;
    p,
    .btn {
      display: inline-block;
      vertical-align: middle;
    }
    p {
      margin: 0;
      font-size: 0.8rem;
      margin-right: 1rem;
    }
    .btn {
      margin-right: 1rem;
      font-size: 0.8rem;
      &.active {
        background-color: black;
      }
    }
  }
`;

const PNComponent = (props) => {
  let ref = useRef(null);
  return (
    <div className="pn-hint" ref={ref}>
      Wistron P/N&nbsp;&nbsp;
      <Tooltip
        overlay={<p>輸入參考料號後，將於下一步，自動帶入該料號的SPEC內容</p>}
        placement="top"
        arrowContent={<div className="rc-tooltip-arrow-inner" />}
      >
        <span>&#63;</span>
      </Tooltip>
    </div>
  );
};

function AddPCBModal(props) {
  const form = useRef(null);
  const {
    // state
    pcbModalInfo: { title },

    setPCBItem,
    getPcbLayout,
    getSpecByPn,
    setPcbModalPath,
  } = props;
  const [addby, setAddby] = useState(1);


  const partnameSchema = Yup.object().shape({
    partNumber: Yup
      .string('料號格式錯誤')
      .required('請輸入料號'),
  });

  function onType2Submit() {
    getPcbLayout('pcb');
    setPCBItem();
    setPcbModalPath({
      path: PATH.PCB_SPECS_MODAL,
    });
  }

  const onPartnameSubmit = (values) => {
    getPcbLayout('pcb');
    getSpecByPn(values.partNumber);
  };

  const onBack = () => {
    setPcbModalPath({
      path: PATH.PCB_DETAIL_MODAL,
    });
  };
  const onSubmit = () => {
    if (addby === 1) {
      onType2Submit();
    } else form.current.handleSubmit();
  };
  return (
    <Wrapper>
      <Modal.ModalHeader>{title}</Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="inline-btns">
          <p>Add by</p>
          <RoundButton.WhiteButton e2e="type2Btn" className={`${addby === 1 ? 'active' : ''}`} onClick={() => setAddby(1)}>Type II</RoundButton.WhiteButton>
          <RoundButton.WhiteButton e2e="refBtn" className={`${addby === 2 ? 'active' : ''}`} onClick={() => setAddby(2)}>Reference P/N</RoundButton.WhiteButton>
        </div>
        <div className="box-content">
          {addby === 1 && <div /> }
          {addby === 2 &&
                (
                  <div>
                    <Formik
                      ref={form}
                      initialValues={{ partNumber: '' }}
                      validationSchema={partnameSchema}
                      onSubmit={onPartnameSubmit}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                      }) => {
                        return (
                          <Form>
                            <Field
                              name="partNumber"
                              labelTitle={<PNComponent />}
                              component={NormalField}
                              readOnly={false}
                            />
                            {
                              errors.partNumber &&
                              <ErrorMsg className="error-msg" name="partNumber">{errors.partNumber}</ErrorMsg>
                            }
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                )
              }
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={onBack}>Cancel</Button>
        <Button e2e="pcbNextBtn" color="black" onClick={onSubmit}>Next Step</Button>
      </Modal.ModalFooter>
    </Wrapper>
  );
}

export default connect(
  (state) => {
    return {
      pcbModalInfo: state.pcbDetail.pcbModalInfo,
    };
  },
  {
    setPCBItem: PCBDetailActions.setPCBItem,
    getSpecByPn: PCBDetailActions.getSpecByPn,
    getPcbLayout: PCBDetailActions.getPcbLayout,
    setPcbModalPath: PCBDetailActions.setPcbModalPath,

    pushNotification: NotificationSystemActions.pushNotification,
    toggleLoadingStatus: LoadingActions.toggleLoadingStatus,
  }
)(AddPCBModal);

