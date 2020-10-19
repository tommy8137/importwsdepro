import React, { Fragment, useState, useEffect } from 'react';
import * as R from 'ramda';
import * as yup from 'yup';
import _get from 'lodash/get';
import Modal from '~~elements/Modal';

import { connect } from 'react-redux';

import Resource from '~~apis/resource';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import { dispatchLoading } from '~~utils/CommonUtils';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';
import BomItemForm from './Fields/BomItemForm';
import DropdownButton from './DropdownButton';
import { bomItemFormConfig } from './Fields/BomItemConfig';

/**
 * 空的表單initial values
 */
let initFormValues = bomItemFormConfig().reduce((prev, curr) => {
  return {
    ...prev,
    // default 有可能是0，所以要用isNil判斷
    [curr.key]: R.isNil(curr.default) ? null : curr.default
  };
}, {});

const BomItemModal = (props) => {
  const [productTypeList, setProductTypeList] = useState([]);
  const {
    bomData: {
      productType = 'NB'
    },
    emdmImgList,
  } = props;

  const [isAlert, setIsAlert] = useState(false);
  const [formData, setFormData] = useState(null);
  const [parentLevelList, setParentLevelList] = useState([]);
  const [formValidateErrorObj, setFormValidateErrorObj] = useState({});
  const [imagePath, setImagePath] = useState('');
  const { modalInfo: { action, isModalOpen, } } = props;
  // For欄位驗證
  const [bomFields, setBomFields] = useState([]);
  const [validRule, setValidRule] = useState([]);
  const [validators, setValidators] = useState({});
  // 依 ODM/OEM 和 Parts Category1 和 Parts Category2 和 Material spec 和M aterial 來決定是否需驗證size相關欄位
  const [noDependencyCombinations, setNoDependencyCombinations] = useState(null);

  const productTypeId = productTypeList.reduce((prev, curr) => (curr.label === productType ? curr.value : prev), '1');
  const productTypeName = productType.toLowerCase();

  /**
   * 一開始進來先取得product type 下拉
   */
  async function getProductTypeList() {
    try {
      const { data } = await Resource.PartlistResource.getProductTypeDropdownList();
      setProductTypeList(data);
    } catch (error) {
      setProductTypeList([]);
      console.log('error >>>', error);
    }
  }
  async function getParentLevelList(level) {
    const { bomID, bomItemId, historyMode } = props;
    const versionid = props?.currentVersion?.value || '';

    if (!level || !bomID) {
      return;
    }

    dispatchLoading(true);
    try {
      // 取得新的parent level選項
      let { data } = await Resource.BomDetailResource.getParentlevel({
        level,
        bomID,
        bomItemId: action === 'Add' ? null : bomItemId,
        versionid: historyMode ? versionid : '',
      });
      setParentLevelList(data);
    } catch (err) {
      props.pushNotification({ message: '取得Parent\'s Item Part Name清單失敗，請稍後再試', level: 'error' });
    }
    dispatchLoading(false);
  }

  const resetAll = (resetParentLevelList = true) => {
    if (resetParentLevelList) {
      setParentLevelList(null);
    }
    setFormData(null);
    setFormValidateErrorObj({});
    setImagePath('');
  };

  const getMeInputBomItem = async (data) => {
    props.toggleLoadingStatus(true);
    try {
      const { bomItemId, bomID, assignItem: { bomDesigneeID }, currentVersion: { value: versionid }, } = props;
      const result = await Resource.BomDetailResource.getBomItem(bomID, bomDesigneeID, bomItemId, { versionid });
      let filteredData = Object.keys(initFormValues).reduce((prev, curr) => {
        return {
          ...prev,
          [curr]: result.data[curr]
        };
      }, {});
      await getParentLevelList(result.data.level);
      setFormData(filteredData);
      if (result.data.image_path) {
        setImagePath(result.data.image_path);
      }
    } catch (err) {
      props.pushNotification({
        message: '取得資料有誤，請稍後再試',
        level: 'error'
      });
    }
    props.toggleLoadingStatus(false);
  };

  useEffect(() => {
    if (action === 'EmdmView' && emdmImgList.length > 0) {
      setImagePath(emdmImgList[0].url);
      setFormData({
        ...formData,
        image_id: emdmImgList[0].fileName,
      });
    }
  }, [JSON.stringify(emdmImgList), action, JSON.stringify(formData)]);

  const updateMeInputBomItem = async (data) => {
    let isSuccess = false;
    const { bomID, bomItemId, assignItem } = props;
    let finalData = {
      ...data,
      productTypeId,
      productTypeName,
      bom_id: bomID,
    };

    props.toggleLoadingStatus(true);
    try {
      const result = await Resource.BomDetailResource.putBomItem(finalData, bomItemId);
      props.pushNotification({
        message: '修改資料成功',
        level: 'success'
      });
      // 再取一次指定人員清單及資料
      props.getBomAssignlist({ bomID, assign: assignItem.bomDesigneeID || 'all' });
      props.getBomItemList({ bomID, assign: assignItem.bomDesigneeID || 'all' });
      props.refreshCurrentVersion(bomID);
      isSuccess = true;
    } catch (err) {
      const { response: { data: { code: errorcode } } } = err;
      props.pushNotification({
        message: getMessageByErrorCode(errorcode, '修改資料有誤，請稍後再試'),
        level: 'error'
      });
      // 關閉子階但仍有子階項目時，自動把with child 打開
      if (errorcode === 'C000201') {
        setFormData(prevState => ({ ...prevState, has_child: true }));
      }
    }
    props.toggleLoadingStatus(false);
    return isSuccess;
  };

  const createMeInputBomItem = async (data) => {
    let isSuccess = false;
    const { bomID, assignItem } = props;
    let finalData = {
      ...data,
      productTypeId,
      productTypeName,
      bom_id: bomID,
      // 可以幫別人新增bomItem: 所以create 時帶入form裡面的ower
      bomDesigneeID: data.owner
    };
    props.toggleLoadingStatus(true);

    try {
      const result = await Resource.BomDetailResource.createBomItem(finalData);
      props.pushNotification({ message: '新增資料成功', level: 'success' });
      // 再取一次指定人員清單及資料
      props.getBomAssignlist({ bomID, assign: assignItem.bomDesigneeID });
      props.getBomItemList({ bomID, assign: assignItem.bomDesigneeID });
      props.refreshCurrentVersion(bomID);
      isSuccess = true;
    } catch (err) {
      const { response: { data: { code: errorcode } } } = err;
      props.pushNotification({ message: getMessageByErrorCode(errorcode, '新增資料有誤，請稍後再試'), level: 'error' });
    }
    props.toggleLoadingStatus(false);
    return isSuccess;
  };

  // 驗證form表單，有錯誤就更新setFormValidateErrorObj
  async function checkIsFormValidAndUpdateErrors(data) {
    return Object.keys(formValidateErrorObj).length <= 0;
  }

  async function handleUpdate() {
    let isValid = await checkIsFormValidAndUpdateErrors(formData);
    if (isValid) {
      let isSuccess = await updateMeInputBomItem(formData);
      if (isSuccess) {
        // 清空表單
        setFormData(initFormValues);
        // 關閉modal
        props.toggleBomItemModal(action, false);
      }
    }
  }

  async function handleSave() {
    let isValid = await checkIsFormValidAndUpdateErrors(formData);
    if (isValid) {
      let isSuccess = await createMeInputBomItem(formData);
      if (isSuccess) {
        // 清空表單
        setFormData(initFormValues);
        // 關閉modal
        props.toggleBomItemModal(action, false);
      }
    }
  }

  async function handleSaveAndNext(initialValue) {
    let isValid = await checkIsFormValidAndUpdateErrors(formData);
    if (isValid) {
      let isSuccess = await createMeInputBomItem(formData);
      if (isSuccess) {
        // 清空，建一張新的Form
        if (formData.level === initialValue.level) {
          resetAll(false);
        } else {
          resetAll(true);
        }
        // 從新塞值
        setFormData(initialValue);
      }
    }
  }

  // 加子層的選項
  async function handleSaveAndAddSubLevel(data) {
    let isValid = await checkIsFormValidAndUpdateErrors(data);
    if (isValid) {
      let isSuccess = await createMeInputBomItem(data);
      if (isSuccess) {
        try {
          const { level, part_name: partName } = data;
          let newLevel = (Number(level) + 1) >= 12 ? 11 : (Number(level) + 1);
          let newSubLeve = newLevel >= 2;
          const { bomID } = props;
          let result = await Resource.BomDetailResource.getParentlevel({ level: newLevel, bomID, bomItemId: null });
          let { id } = result.data.find(i => i.part_name === partName);
          let finalData = {
            ...initFormValues,
            productTypeId,
            productTypeName,
            level: newLevel.toString(),
            sub_leve: newSubLeve,
            parent_level: id
          };
          setParentLevelList(result.data);
          // 清空，建一張新的Form
          resetAll(false);
          // 清空表單
          setFormData(finalData);
        } catch (err) {
          props.pushNotification({ message: 'Add Sub-level失敗，建立全新的表單', level: 'error' });
          setFormData(initFormValues);
        }
      }
    }
  }

  function handleCloseModal() {
    props.toggleBomItemModal(action, false);
    props.resetEmdmBomImage();
  }

  useEffect(() => {
    // 取得 productType下拉
    getProductTypeList();
    switch (action) {
      case 'Edit':
      case 'View':
        // cal api 拿資料
        getMeInputBomItem();
        break;
      case 'EmdmView':
        getMeInputBomItem();
        break;
      case 'Add':
        setParentLevelList([]);
        setFormData({
          ...initFormValues,
          owner: _get(props.assignItem, 'bomDesigneeID', null), // owner要從redux拿default值
        });
        break;
      default:
        setParentLevelList([]);
        setFormData({
          ...initFormValues,
          owner: _get(props.assignItem, 'bomDesigneeID', null), // owner要從redux拿default值
        });
        break;
    }
  }, []);

  // 取得驗證規則
  useEffect(() => {
    // 依 Parts Category2 來決定的驗證規則
    Resource.BomDetailResource.getMeBomValidRule()
      .then(response => {
        const { size } = response.data;
        setValidRule(size);
      })
      .catch(async (error) => {
        console.log('getMeBomValidRule error :::::', error.response);
        props.pushNotification({
          message: '取得驗證規則有誤，請稍後再試',
          level: 'error'
        });
      });

    // 依 Material spec 和 Material 來決定是否需驗證size相關欄位
    Resource.BomDetailResource.getNoDependencyRule()
      .then(response => {
        const { noDependencyRule, noDependencyOemOdmRule } = response.data;
        setNoDependencyCombinations({ noDependencyRule, noDependencyOemOdmRule });
      })
      .catch(async (error) => {
        console.log('getNoDependencyRule error :::::', error.response);
        props.pushNotification({
          message: '取得驗證規則有誤，請稍後再試',
          level: 'error'
        });
      });
  }, [action]);

  const modalConfig = {
    Edit: {
      title: 'Edit Item',
      saveButton: props.canEditWhenNPointSeven,
      saveText: 'Save',
      cancelButton: true,
      cancelText: 'Cancel',
      handleClickSave: () => handleUpdate(),
      handleClickCancel: () => setIsAlert(true),
    },
    Add: {
      title: 'Add New Item',
      saveButton: props.canEditWhenNPointSeven,
      saveText: 'Save',
      cancelButton: true,
      cancelText: 'Cancel',
      handleClickSave: () => handleSave(),
      handleClickCancel: () => setIsAlert(true),
    },
    View: {
      title: 'View Item',
      saveButton: false,
      saveText: 'Save',
      cancelButton: true,
      cancelText: 'Close',
      handleClickSave: null,
      handleClickCancel: handleCloseModal,
    },
    EmdmView: {
      title: 'View Item',
      saveButton: false,
      saveText: 'Save',
      cancelButton: true,
      cancelText: 'Close',
      handleClickSave: null,
      handleClickCancel: handleCloseModal,
    }
  };


  const errorCount = Object.keys(formValidateErrorObj);

  return (
    <Modal.Modal className="bom-item-modal" isOpen={isModalOpen} widthType="middle">
      <Modal.ModalHeader>{modalConfig[action].title}</Modal.ModalHeader>
      <Modal.ModalBody>
        {formData ? <BomItemForm
          formData={formData}
          setFormData={setFormData}
          bomFields={bomFields}
          setBomFields={setBomFields}
          setValidators={setValidators}
          validators={validators}
          setFormValidateErrorObj={setFormValidateErrorObj}
          formValidateErrorObj={formValidateErrorObj}
          imagePath={imagePath}
          setImagePath={setImagePath}
          parentLevelList={parentLevelList}
          getParentLevelList={getParentLevelList}
          validRule={validRule}
          noDependencyCombinations={noDependencyCombinations}
        /> : <div />}
      </Modal.ModalBody>
      <Modal.ModalFooter>
        {/* 取消鈕 */}
        {modalConfig[action].cancelButton &&
          <Button
            color="white"
            onClick={modalConfig[action].handleClickCancel}
          >
            {modalConfig[action].cancelText}
          </Button>}{' '}
        {/* 確認鈕 */}
        {modalConfig[action].saveButton &&
          <Button
            color="black"
            disabled={errorCount.length > 0}
            onClick={modalConfig[action].handleClickSave}
          >
            {modalConfig[action].saveText}
          </Button>
        }
        {
          action === 'Add' ?
            <DropdownButton
              disabled={errorCount.length > 0}
              onAddNew={() => {
                handleSaveAndNext(initFormValues);
              }}
              onAddSameLevel={() => {
                const { level, parent_level: parentLevel, sub_leve: subLeve } = formData;
                let initialValue = { ...initFormValues, level, parent_level: parentLevel, sub_leve: subLeve };
                handleSaveAndNext(initialValue);
              }}
              onAddSubLevel={async () => {
                const { level } = formData;
                if (level === '11') {
                  props.pushNotification({ message: '最多只能到Level 11', level: 'warning' });
                  return;
                }
                handleSaveAndAddSubLevel(formData);
              }}
            /> : <div />
        }
      </Modal.ModalFooter>
      <Alert isOpen={isAlert} type="alarm">
        <div className="row">請確認是否要離開?</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={(e) => {
              e.stopPropagation();
              setIsAlert(false);
              props.toggleBomItemModal(action, false);
            }}
          >
            確定
          </Button>
          <Button
            color="black"
            onClick={(e) => {
              e.stopPropagation();
              setIsAlert(false);
            }}
          >
            取消
          </Button>
        </div>
      </Alert>
    </Modal.Modal>
  );
};


export default connect(
  (state) => {
    return {
      bomID: state.bomDetail.bomID,
      bomItemId: state.bomDetail.bomItemId,
      bomData: state.bomDetail.bomData,
      assignItem: state.bomDetail.assignItem,
      dropdownData: state.bomDetail.dropdownData,
      canEditWhenNPointSeven: state.bomDetail.canEditWhenNPointSeven,
      currentVersion: state.bomDetail.currentVersion,
      historyMode: state.bomDetail.historyMode,
      emdmImgList: state.bomDetail.emdmImgList,
    };
  },
  {
    getBomItemList: BomDetailActions.getBomItemList,
    getBomAssignlist: BomDetailActions.getBomAssignlist,
    toggleBomItemModal: BomDetailActions.toggleBomItemModal,
    refreshCurrentVersion: BomDetailActions.refreshCurrentVersion,
    resetEmdmBomImage: BomDetailActions.resetEmdmBomImage,
    toggleLoadingStatus,
    pushNotification,
  }
)(BomItemModal);
