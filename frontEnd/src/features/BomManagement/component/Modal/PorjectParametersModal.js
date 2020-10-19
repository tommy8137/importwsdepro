import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import Button from '~~elements/Button';
import { Tabs, Tab, TabsContainer } from '~~elements/Tabs';
import Field from '~~elements/Field';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';

const EditBomModal = styled(Modal.Modal)`
  .modal-content{
    min-height: 43rem
  }
`;

// tab 名稱對應表
const GROUP_NAME_MAPPING = {
  plastic: 'Plastic',
  metal: 'Metal',
};


function PorjectParametersModal(props) {
  const [errors, setErrors] = useState({});
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [paramsData, setParamsData] = useState([]);

  const {
    parameterDataBomId = '',
    parameterData: { bomParams = [] },
    isOpen,
    onChangeModal = () => { },
    toggleParameterModal = () => { },
    putBomParameter = () => { },
  } = props;

  // 畫面需要顯示的欄位
  const fields = paramsData.filter(obj => obj.group_name === selectedTab);


  useEffect(() => {
    setParamsData(bomParams);
  }, [JSON.stringify(bomParams)]);

  useEffect(() => {
    if (bomParams.length) {
      const newTabs = bomParams.map(obj => {
        return obj.group_name;
      });
      const uniqTabs = _uniqBy(newTabs, obj => obj);
      setTabs(uniqTabs);
      if (selectedTab === null && uniqTabs.length) {
        setSelectedTab(uniqTabs[0]);
      }
    } else {
      setTabs([]);
      setParamsData([]);
      setSelectedTab(null);
    }
  }, [JSON.stringify(paramsData)]);


  useEffect(() => {
    const newErrors = paramsData.reduce((prev, curr) => {
      const { value, id } = curr;
      const isValueNull = value === null || value === '';
      if (isValueNull) {
        return { ...prev, [id]: '此欄位為必填' };
      }
      return prev;
    }, {});
    setErrors(newErrors);
  }, [JSON.stringify(paramsData)]);

  function handleCancel() {
    toggleParameterModal(false);
  }

  function handleClickTab(tabText) {
    setSelectedTab(tabText);
  }

  function handleChange(key, value) {
    const newParamsData = paramsData.reduce((prev, curr) => {
      return [
        ...prev,
        {
          ...curr,
          value: curr.id === key ? value : curr.value
        }
      ];
    }, []);
    setParamsData(newParamsData);
  }

  function handleSave() {
    const newBomParams = paramsData.map(obj => ({ id: obj.id, value: obj.value }));
    const data = {
      bomParams: newBomParams
    };
    console.log('params data >>>>', data);
    putBomParameter(parameterDataBomId, data);
  }

  const hasError = Object.keys(errors).length > 0;
  const isSaveDisabled = fields.length <= 0 || hasError;
  return (
    <EditBomModal isOpen={isOpen}>
      <Modal.ModalHeader>
        BOM Information
      </Modal.ModalHeader>
      <TabsContainer>
        <Tabs>
          {
            tabs.map(tabValue => {
              const tabText = GROUP_NAME_MAPPING[tabValue] || tabValue;
              return (
                <Tab
                  onClick={() => handleClickTab(tabValue)}
                  active={selectedTab === tabValue}
                >
                  {tabText}
                </Tab>);
            })
          }
        </Tabs>
      </TabsContainer>
      <Modal.ModalBody>
        {/* 表單內容 */}
        <div className="form-box">
          <Field.Row>
            {
              fields.map(field => {
                const {
                  id: key,
                  label_name: label,
                  value_type: dataType,
                } = field;

                const value = _get(field, 'value', '');
                const errorMessage = _get(errors, key, '');
                return (
                  <Field.Field width="50%">
                    <Field.Label
                      isRequired
                      title={label}
                    />
                    <Field.ConvertInput
                      onChange={val => handleChange(key, val)}
                      value={value}
                      dataType="float"
                    />
                    {errorMessage && <Field.FieldError errorMessage={errorMessage} />}
                  </Field.Field>
                );
              })
            }
          </Field.Row>
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleCancel}>
          Close
        </Button>
        <Button
          color="black"
          onClick={handleSave}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </Modal.ModalFooter>
    </EditBomModal>
  );
}


const mapStateToProps = (state) => {
  return {
    parameterDataBomId: state.bomManagement.parameterDataBomId,
    parameterData: state.bomManagement.parameterData,
  };
};
const mapDispatchToProps = {
  toggleParameterModal: BomManagementActions.toggleParameterModal,
  putBomParameter: BomManagementActions.putBomParameter,
};


const allowList = [
  ['List', 'allow', 'me_bom_projects'],
];

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PorjectParametersModal);

