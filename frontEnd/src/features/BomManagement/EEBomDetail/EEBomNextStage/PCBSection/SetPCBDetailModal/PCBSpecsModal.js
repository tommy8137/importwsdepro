import React, { Fragment, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import _fpSet from 'lodash/fp/set';
import Button from '~~elements/Button';
import Alert from '~~elements/Alert';
import { PartListForm, PartlistFormContext } from '~~elements/PartListForm';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import * as PCBDetailActions from './PCBDetailActions';
import { PATH, MODAL_ACTION, BOARD_TYPE } from './PcbDetailConst';


function PCBSpecsModal(props) {
  const {
    // state
    pcbModalInfo: {
      title,
      actionType,
      boardType,
      isViewMode,
    },
    edmVersionID,
    pcbModalInfo,
    pcbLayout,
    pcbItem,

    setPcbModalPath,
    setPCBItem,
    createPCBItem,
    updatePCBItem,
    resetPcbLayout
  } = props;

  const { handleSubmit, validation } = useContext(PartlistFormContext);
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    return () => {
      resetPcbLayout();
      setPCBItem();
      setPcbModalPath({
        wistronpn: '',
        isViewMode: false,
      });
    };
  }, []);

  async function onFormSubmit(error, data, formData) {
    if (error) console.error('error', error);

    const result = data.Price.pcb;
    if (actionType === MODAL_ACTION.ADD) {
      const payload = result.manufacturer.length > 0 ?
        result.manufacturer.map(item => {
          return {
            ...pcbItem,
            type: boardType,
            edm_version_id: edmVersionID,
            supply_type: result.supply_type,
            content: {
              formData: _fpSet(['pcbTab', 'PcbManufacturer', 'manufacturer'], item)(formData),
              Price: {
                ...result,
                manufacturer: item,
              },
              spec: pcbItem.spec
            }
          };
        }) : [];
      createPCBItem(payload);
    } else {
      const payload = [{
        ...pcbItem,
        type: boardType,
        edm_version_id: edmVersionID,
        supply_type: result.supply_type,
        content: {
          formData,
          Price: result,
          spec: pcbItem.content.spec
        }
      }
      ];
      updatePCBItem(payload);
    }
  }

  function onBack() {
    if (actionType === MODAL_ACTION.ADD) {
      setPcbModalPath({
        path: PATH.ADD_PCB_MODAL,
        title: boardType === BOARD_TYPE.MAIN ? 'Add PCB 主板' : 'Add PCB 小板',
      });
    } else {
      setPcbModalPath({
        path: PATH.PCB_DETAIL_MODAL,
        title: 'Set PCB Detail',
      });
    }
  }

  return (
    <Fragment>
      <Modal.ModalHeader hasBack onClickBack={onBack}>
        {isViewMode ? title.replace(/Edit/, 'View') : title}
      </Modal.ModalHeader>
      <Modal.ModalBody>
        {pcbLayout &&
        <PartListForm
          partItemInfo={pcbModalInfo}
          partItemLayout={pcbLayout}
          isViewMode={isViewMode}
          initialData={pcbItem.content.formData}
          onSubmit={onFormSubmit}
          pcbSpec={pcbItem.spec}
        />
        }
      </Modal.ModalBody>
      {isViewMode ?
        null :
        <Modal.ModalFooter>
          <Button
            color="white"
            onClick={() => setIsAlert(true)}
            className="e2e-modal-btn-cancel---pcbform"
          >Cancel
          </Button>
          <Button
            color="black"
            onClick={handleSubmit}
            disabled={!validation()}
            className="e2e-modal-btn-save---pcbform"
          >Save
          </Button>
        </Modal.ModalFooter>}
      {actionType === MODAL_ACTION.ADD ?
        <Alert isOpen={isAlert} type="alarm">
          <div className="row">您尚未完成新增，是否仍要離開？</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={(e) => {
                e.stopPropagation();
                setIsAlert(false);
                onBack();
              }}
              className="e2e-alert-modal-btn-close---pcbform"
            >
              離開
            </Button>
            <Button
              color="black"
              onClick={(e) => {
                e.stopPropagation();
                setIsAlert(false);
              }}
              className="e2e-alert-modal-btn-cancel---pcbform"
            >
              取消
            </Button>
          </div>
        </Alert>
        :
        <Alert isOpen={isAlert} type="alarm">
          <div className="row">您是否要在離開前儲存變更？</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={(e) => {
                e.stopPropagation();
                setIsAlert(false);
                onBack();
              }}
              className="e2e-alert-modal-btn-cancel---pcbform"
            >
              取消
            </Button>
            <Button
              color="black"
              onClick={(e) => {
                e.stopPropagation();
                setIsAlert(false);
                handleSubmit();
              }}
              disabled={!validation()}
              className="e2e-alert-modal-btn-close-with-save---pcbform"
            >
              儲存變更
            </Button>
          </div>
        </Alert>}
    </Fragment>
  );
}


export default connect(
  (state) => {
    return {
      edmVersionID: state.pcbDetail.edmVersionID,
      pcbLayout: state.pcbDetail.pcbLayout,
      PCBList: state.pcbDetail.PCBList,
      pcbModalInfo: state.pcbDetail.pcbModalInfo,
      pcbItem: state.pcbDetail.pcbItem,
    };
  },
  {
    setPCBItem: PCBDetailActions.setPCBItem,
    setPcbModalPath: PCBDetailActions.setPcbModalPath,
    createPCBItem: PCBDetailActions.createPCBItem,
    updatePCBItem: PCBDetailActions.updatePCBItem,
    deletePCBItemAction: PCBDetailActions.deletePCBItem,
    resetPcbLayout: PCBDetailActions.resetPcbLayout,
    toggleLoadingStatus,
    pushNotification,
  }
)(PCBSpecsModal);
