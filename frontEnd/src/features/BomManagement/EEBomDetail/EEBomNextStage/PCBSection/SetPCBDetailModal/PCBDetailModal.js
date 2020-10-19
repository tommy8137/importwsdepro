import React, { Fragment, useState, useEffect } from 'react';
import Modal from '~~elements/Modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as R from 'ramda';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import RoundButton from '~~elements/RoundButton';
import Portal from '~~elements/Portal';
import PCBMainTable from './PCBMainTable';
import * as PCBDetailActions from './PCBDetailActions';
import { PATH, MODAL_ACTION, BOARD_TYPE } from './PcbDetailConst';

const PCBDetailModal = (props) => {
  const [data, setData] = useState([]);
  const [canSave, setCanSave] = useState(true);
  const [isAlertPN, setIsAlertPN] = useState(false);
  const [isOnDelAlert, setOnDelAlert] = useState(false);
  const [boardType, setBoardType] = useState('');

  const {
    // state
    PCBList,

    getPcbLayout,
    setPCBItem,
    setPcbModalPath,
    getPCBList,
    updatePCBItem,
    deletePCBItem,

    // props
    edmVersionID,
    toggle,
    isViewMode,
    delInfo,
    setDelInfo,
  } = props;

  useEffect(() => {
    getPCBList(edmVersionID);
  }, []);

  useEffect(() => {
    setData(PCBList);
    const initList = PCBList.map(x => ({
      type: x.type,
      id: x.id,
      isChecked: false
    }));
    const groupData = _.groupBy(initList, item => (item.type === 0 ? BOARD_TYPE.MAIN : BOARD_TYPE.SMALL));
    const mainList = R.path([BOARD_TYPE.MAIN], groupData) || [];
    setDelInfo(BOARD_TYPE.MAIN, mainList);
    const smallList = R.path([BOARD_TYPE.SMALL], groupData) || [];
    setDelInfo(BOARD_TYPE.SMALL, smallList);
  }, [PCBList]);

  function handleListChange(item) {
    const temp = R.map(it => (item.id === it.id ? item : it), data);
    setData(temp);
  }

  function handleDeleteAlert(board) {
    setOnDelAlert(true);
    setBoardType(board);
  }

  function handleDelete() {
    setOnDelAlert(false);
    const idList = delInfo[boardType].filter(item => item.isChecked).map(item => item.id);
    deletePCBItem(idList);
  }

  const changed = R.without(PCBList, data).map(d => {
    return {
      ...d,
      qty: d.qty === null ? 0 : d.qty,
      cost: d.cost === null ? 0 : d.cost,
      is_count: d.is_count === null ? false : d.is_count,
    };
  });

  function handleSave() {
    const temp = _.groupBy(data.filter(i => i.is_count === true), o => o.PcbStageNo);
    const isMulti = Object.keys(temp).map(key => temp[key].length).some(item => item > 1);
    if (isMulti) {
      setIsAlertPN(true);
    } else {
      updatePCBItem(changed);
    }
  }

  function onEdit(item)  {
    getPcbLayout('pcbEdit');
    setPCBItem(item);
    setPcbModalPath({
      path: PATH.PCB_SPECS_MODAL,
      title: 'Edit PCB 主板',
      actionType: MODAL_ACTION.EDIT,
      boardType: BOARD_TYPE.MAIN,
      wistronpn: item.wistronpn,
      isViewMode
    });
  }

  function onSmallEdit(item) {
    getPcbLayout('pcbEdit');
    setPCBItem(item);
    setPcbModalPath({
      path: PATH.PCB_SPECS_MODAL,
      title: 'Edit PCB 小板',
      actionType: MODAL_ACTION.EDIT,
      boardType: BOARD_TYPE.SMALL,
      wistronpn: item.wistronpn,
      isViewMode
    });
  }

  function onAdd()  {
    setPcbModalPath({
      path: PATH.ADD_PCB_MODAL,
      title: 'Add PCB 主板',
      actionType: MODAL_ACTION.ADD,
      boardType: BOARD_TYPE.MAIN,
    });
  }

  function onSmallAdd() {
    setPcbModalPath({
      path: PATH.ADD_PCB_MODAL,
      title: 'Add PCB 小板',
      actionType: MODAL_ACTION.ADD,
      boardType: BOARD_TYPE.SMALL,
    });
  }

  const groupData = _.groupBy(data, item => (item.type === BOARD_TYPE.MAIN ? 'motherboardList' : 'boardList'));
  const motherboardList = R.path(['motherboardList'], groupData) || [];
  const boardList = R.path(['boardList'], groupData) || [];
  const saveAble = !(canSave && changed.length);

  return (
    <Fragment>
      <Modal.ModalHeader>
        {isViewMode ? 'View PCB Detail' : 'Set PCB Detail'}
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="box mainPCBBox">
          <div className="sub-title">
            <div>PCB 主板</div>
            { !isViewMode &&
            <div>
              {delInfo[BOARD_TYPE.MAIN].filter(i => i.isChecked).length > 0 &&
              <RoundButton.BlackButton onClick={() => handleDeleteAlert(BOARD_TYPE.MAIN)}>
                Delete Items
              </RoundButton.BlackButton>}
              <RoundButton.WhiteButton onClick={onAdd} e2e="addMainBtn">
                Add 主板
              </RoundButton.WhiteButton>
            </div>
            }
          </div>
          <PCBMainTable
            boardType={BOARD_TYPE.MAIN}
            isViewMode={isViewMode}
            data={motherboardList}
            onChange={handleListChange}
            setCanSave={setCanSave}
            onEdit={onEdit}
            setDelInfo={setDelInfo}
            delItems={delInfo[BOARD_TYPE.MAIN]}
          />
        </div>
        <div className="box smallPCBBox">
          <div className="sub-title">
            <div>PCB 小板</div>
            { !isViewMode &&
            <div>
              {delInfo[BOARD_TYPE.SMALL].filter(i => i.isChecked).length > 0 &&
              <RoundButton.BlackButton onClick={() => handleDeleteAlert(BOARD_TYPE.SMALL)}>
                Delete Items
              </RoundButton.BlackButton>}
              <RoundButton.WhiteButton onClick={onSmallAdd} e2e="addSmallBtn">
                Add 小板
              </RoundButton.WhiteButton>
            </div>
          }
          </div>
          <PCBMainTable
            boardType={BOARD_TYPE.SMALL}
            isViewMode={isViewMode}
            data={boardList}
            onChange={handleListChange}
            setCanSave={setCanSave}
            onEdit={onSmallEdit}
            setDelInfo={setDelInfo}
            delItems={delInfo[BOARD_TYPE.SMALL]}
          />
        </div>
      </Modal.ModalBody>
      {isViewMode ?
        <Modal.ModalFooter>
          <Button color="black" onClick={() => toggle(false)}>Close</Button>
        </Modal.ModalFooter>
        :
        <Modal.ModalFooter>
          <Button e2e="pcbCancelBtn" color="white" onClick={() => toggle(false)}>Cancel</Button>
          <Button e2e="pcbSaveBtn" color="black" onClick={handleSave} disabled={saveAble}>Save</Button>
        </Modal.ModalFooter>}
      {/* 版號重複時的警告 */}
      <Alert isOpen={isAlertPN} type="alarm" e2e="alert_same_pcb">
        <div className="row">您重複勾選了相同的PCB NO._Stage，請重新勾選。</div>
        <div className="row">
          <Button
            e2e="reselectBtn"
            color="transparentInModal"
            border={false}
            onClick={(e) => {
              e.stopPropagation();
              setIsAlertPN(false);
            }}
          >
              重新勾選
          </Button>
        </div>
      </Alert>
      {/* 刪除的警告 */}
      <Portal id="pab-main-table-before-delete-hint">
        <Alert isOpen={isOnDelAlert} type="alarm">
          <div className="row">{`你確定要刪除該${boardType === BOARD_TYPE.MAIN ? '主板' : '小板'}`}?</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={() => handleDelete()}
            >
              刪除
            </Button>
            <Button
              color="black"
              onClick={() => setOnDelAlert(false)}
            >
              取消
            </Button>
          </div>
        </Alert>
      </Portal>
    </Fragment >
  );
};

export default connect(
  (state) => {
    return {
      PCBList: state.pcbDetail.PCBList,
      delInfo: state.pcbDetail.delInfo,
      pcbModalInfo: state.pcbDetail.pcbModalInfo,
    };
  },
  {
    setPCBItem: PCBDetailActions.setPCBItem,
    setPcbModalPath: PCBDetailActions.setPcbModalPath,
    updatePCBItem: PCBDetailActions.updatePCBItem,
    deletePCBItem: PCBDetailActions.deletePCBItem,
    getPCBList: PCBDetailActions.getPCBList,
    getPcbLayout: PCBDetailActions.getPcbLayout,
    setDelInfo: PCBDetailActions.setDelInfo,
  }
)(PCBDetailModal);

