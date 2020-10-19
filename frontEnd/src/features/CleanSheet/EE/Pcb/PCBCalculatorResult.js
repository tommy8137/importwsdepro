import React, { Fragment, useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Alert from '~~elements/Alert';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import Table from '~~elements/Table';
import { PartListForm, PartlistFormContext } from '~~elements/PartListForm';
import PcbResultColumn from './components/ColumnSetting';
import * as PCBCalculatorActions from './PCBCalculatorActions';
import { SEARCH_METHOD } from './PCBCalculatorConst';


const TABLE_MARGIN_TOP = 280;
const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 margin: 2rem 0;
.upper-zone{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 5%;
  flex: 0 auto;
  .info-box{
    &--title{
      opacity: 0.6
    }
    &--content{
      font-weight: bolder;
      font-size: 1.2rem;
    }
  }
}
.table-zone{
  flex: 0 100%;
  padding: 1.5rem 2rem;
  width: 100%;
}
`;

const TopTable = styled(Table)`

.ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #ffffff;
  }

.ant-table-tbody{
  &:last-child{
    border-bottom: 2px solid #7c90a9;
  }

}

.ant-table-body::-webkit-scrollbar:horizontal {
  display: ${props => (props.showScroll ? '' : 'none')}
}


`;

const BottomTable = styled(Table)`

.ant-table-empty .ant-table-body {
    overflow-x: auto !important;
    overflow-y: auto !important;
}

.ant-table-placeholder{
  display: ${props => (props.showHeader ? '' : 'none')};
}

`;


const PCBCalculateResult = (props) => {
  const {
    activeSearchMethod,
    isViewMode,
    wistronpn,
    pcbLayout,
    resultList,
    fixedList,

    getFormLayout,
    resetFormLayout,
    reCalculatePcb,
    exportPcb,
  } = props;

  const { handleSubmit, validation, forceRender } = useContext(PartlistFormContext);
  const [tableHeight, setTableHeight] = useState(document.documentElement.clientHeight - TABLE_MARGIN_TOP);
  const [setIsEditModalOpen, setEditModal] = useState(false);
  const [isAlertModalOpen, setAlertModal] = useState(false);
  const [pcbItem, setPcbItem] = useState(null);

  useEffect(() => {
    syncScroll();

    return () => {
      resetFormLayout();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResizeTableHeight);
    handleResizeTableHeight(document.documentElement.clientHeight - TABLE_MARGIN_TOP);
    if (fixedList.length > 0 && resultList.length > 0) {
      handleResizeTableHeight((document.documentElement.clientHeight - TABLE_MARGIN_TOP) / 2);
    }

    return () => {
      window.removeEventListener('resize', handleResizeTableHeight);
    };
  }, [JSON.stringify(fixedList), JSON.stringify(resultList)]);

  return (
    <Wrapper>
      <div className="upper-zone">
        <div className="info-box">
          <div className="info-box--title">Search by {getText()}</div>
          <div className="info-box--content"> {isViewMode ? '－' : wistronpn}</div>
        </div>
        <Button
          round
          color="transparent"
          onClick={handleExport}
          disabled={resultList.length === 0 && fixedList.length === 0}
        >
          <Icon icon={IconName.IcoExport} size="1rem" />
          Export
        </Button>
      </div>
      <div className="table-zone">
        <BottomTable
          showHeader={activeSearchMethod === SEARCH_METHOD.BY_CATERGORY}
          headerColor="blue"
          columns={PcbResultColumn()}
          pagination={false}
          dataSource={resultList}
          scroll={{ y: tableHeight, x: 2000 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => handleRowClick(event, record, rowIndex),
              };
          }}
          title={() => (
            activeSearchMethod === SEARCH_METHOD.BY_REFERENCE_PN &&
            <TopTable
              headerColor="blue"
              columns={PcbResultColumn()}
              dataSource={fixedList}
              scroll={{ y: tableHeight, x: 2000 }}
              pagination={false}
              showScroll={resultList.length === 0}
            />
          )}
        />
      </div>
      <Modal.Modal isOpen={setIsEditModalOpen} widthType="middle">
        <Modal.ModalHeader>
          Edit PCB
        </Modal.ModalHeader>
        <Modal.ModalBody>
          {pcbLayout &&
          <PartListForm
            partItemLayout={pcbLayout}
            initialData={pcbItem.content.formData}
            onSubmit={onFormSubmit}
          />}
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button color="white" onClick={(e) => handleSettingAlertModal(true)}>Cancel</Button>
          <Button disabled={!validation()} color="black" onClick={handleSubmit} >Save</Button>
        </Modal.ModalFooter>
        {/* 警告視窗 */}
        <Alert isOpen={isAlertModalOpen} type="alarm">
          <div className="row">Are you sure you want to leave without saving？</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={(e) => {
              handleSettingAlertModal(false);
              handleCancel();
            }}
            >
            Leave
            </Button>
            <Button
              color="black"
              onClick={(e) => handleSettingAlertModal(false)}
            >
            Cancel
            </Button>
          </div>
        </Alert>
      </Modal.Modal>
    </Wrapper>
  );

  function handleResizeTableHeight(height) {
    setTableHeight(height);
  }

  function syncScroll() {
    document
      .querySelectorAll('.ant-table-body')
      .forEach(ele => { ele.addEventListener('scroll', setScroll); });

    function setScroll() {
      const { scrollLeft } = this;
      document
        .querySelectorAll('.ant-table-body')
        .forEach(ele => { ele.scrollLeft = scrollLeft; });
    }
  }

  function handleExport() {
    let infoList = resultList.map(item => item.info);
    if (activeSearchMethod === SEARCH_METHOD.BY_REFERENCE_PN) {
      infoList = [
        ...fixedList.map(item => item.info),
        ...resultList.map(item => item.info)
      ];
    }
    // console.log('infoList >>>', infoList);
    exportPcb(infoList);
  }

  function handleRowClick(event, record, rowIndex) {
    getFormLayout('pcbCleanSheetEdit');
    setPcbItem(record);
    setEditModal(true);
    forceRender();
  }

  function getText() {
    let searchBy = '';
    if (!isViewMode) {
      switch (activeSearchMethod) {
        case SEARCH_METHOD.BY_CATERGORY:
          searchBy = 'Category';
          break;
        case SEARCH_METHOD.BY_REFERENCE_PN:
          searchBy = 'Reference P/N';
          break;
        default:
          break;
      }
    }
    return searchBy;
  }

  function handleCancel() {
    setEditModal(false);
    resetFormLayout();
  }

  function handleSettingAlertModal(status) {
    setAlertModal(status);
  }

  function onFormSubmit(error, data, formData) {
    // console.log('error, data, formData', error, data, formData);

    const result = data.Price.pcb;
    const payload = [{
      id: pcbItem.id,
      content: {
        formData,
        Price: {
          ...result,
          wistronpn: '',
        },
        spec: pcbItem.content.spec,
      }
    }
    ];

    reCalculatePcb(payload);
    setEditModal(false);
  }
};


export default connect(
  (state) => {
    return {
      activeSearchMethod: state.pcbCalculator.activeSearchMethod,
      isViewMode: state.pcbCalculator.isViewMode,
      wistronpn: state.pcbCalculator.wistronpn,
      pcbLayout: state.pcbCalculator.pcbLayout,
      resultList: state.pcbCalculator.resultList,
      fixedList: state.pcbCalculator.fixedList,
    };
  },
  {
    getFormLayout: PCBCalculatorActions.getFormLayout,
    resetFormLayout: PCBCalculatorActions.resetFormLayout,
    reCalculatePcb: PCBCalculatorActions.reCalculatePcb,
    exportPcb: PCBCalculatorActions.exportPcb,
  }
)(PCBCalculateResult);

