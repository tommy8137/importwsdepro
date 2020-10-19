import React, { Fragment, useState, useEffect } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import ColumnSetting from '~~features/Database/ME/MaterialPrice/ColumnSetting';
import MaterialTable from '~~features/Database/ME/MaterialPrice/MaterialTable';
import LinkModal from '~~features/Database/ME/MaterialPrice/LinkModal';
import useCSDB from '~~features/Database/components/useCSDB';
import { TABLE_NAME, API_KEY_NAME } from '~~features/Database/ME/MaterialPrice/MaterialConst';

function Diecut(props) {
  const [subMaterial, setSubMaterial] = useState([]);
  const {
    // state
    linkItem,
    materialPriceList,
    materialPriceDate: date,
    selectedPartCate: { value: partCate },
    // actions
    setMaterialPriceIsEditMode,
    putMaterialPricePartCategory,
    getMaterialPricePartCategory,
    putMaterialSpec,
    putMaterialPriceCommonParameter,
    addNewMaterialPriceItem,
    archiveMaterialPriceItem,
    getMaterialPriceDieCutDropDown,
    unArchiveMaterialPriceItem = () => { },
    dieCutType2DropDwon = [],
  } = props;

  const LeftExtendsCSDBPorps = {
    date,
    mainTable: materialPriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'materialSpec', keyword: '' },
    showArchive: false,
    onUnArchive: handleLeftUnArchive,
  };

  const RightExtendsCSDBPorps = {
    date,
    mainTable: subMaterial,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'material', keyword: '' },
    onUnArchive: handleRightUnArchive,
  };
  const leftCsdb = useCSDB(LeftExtendsCSDBPorps);
  const rightCsdb = useCSDB(RightExtendsCSDBPorps);
  // 檢查左右兩邊的id是否有對到可以link
  const materialSpecId = _get(leftCsdb.checkedList, '0', false);
  const materialId = _get(rightCsdb.checkedList, '0', false);
  const materialSpecItem = _find(materialPriceList, (obj) => obj.id === materialSpecId);
  const materialSublist = _get(materialSpecItem, 'subMaterial', []);
  const materialItem = _find(materialSublist, obj => obj.id === materialId);
  const materialSpecName = _get(materialSpecItem, 'materialSpec', '');
  const materialName = _get(materialItem, 'material', '');

  const canLink = (materialItem && materialSpecItem);

  const leftColumnsProps = {
    partCate,
    date,
    ...leftCsdb
  };

  const rightColumnsProps = {
    date,
    partCate,
    ...rightCsdb
  };

  const leftColumns = ColumnSetting.getLeftTableColumn(leftColumnsProps);
  const rightColumns = ColumnSetting.getRightTableColumn(rightColumnsProps);

  useEffect(() => {
    getMaterialPriceDieCutDropDown();
  }, []);


  /**
   * 取得新的列表或是切換選擇的id, 會重新filter右邊的talbe
   */
  useEffect(() => {
    const selectedItem = _find(materialPriceList, obj => obj.id === leftCsdb.selectedRowId);
    const newSubMaterial = selectedItem ? selectedItem.subMaterial : [];
    setSubMaterial(newSubMaterial);
  }, [JSON.stringify(materialPriceList), leftCsdb.selectedRowId]);
  // 如果左右兩邊任一個是editMode, 就把redux的editMode設定為true
  useEffect(() => {
    if (leftCsdb.isEditMode || rightCsdb.isEditMode) {
      setMaterialPriceIsEditMode(true);
    } else {
      setMaterialPriceIsEditMode(false);
    }
  }, [leftCsdb.isEditMode, rightCsdb.isEditMode]);

  // 如果左邊選了別的rowId, 就把右邊的editMode關掉, 並清空checkbox
  useEffect(() => {
    rightCsdb.setCheckedList([]);
    rightCsdb.setEditMode(false);
  }, [leftCsdb.selectedRowId]);

  /* 編輯 ----------------------------------------------------------------------------------------------------------*/
  function handleLeftSave(list) {
    const data = {
      items: list
    };
    putMaterialSpec(partCate, data);
  }

  function handleRightSave(list) {
    const data = {
      nextId: date.nextId,
      items: list
    };
    putMaterialPriceCommonParameter(partCate, data);
  }

  /* Link ----------------------------------------------------------------------------------------------------------*/
  function handleLinkSave(list) {
    const data = {
      ...linkItem,
      partCategory: list
    };
    putMaterialPricePartCategory(partCate, data);
  }

  function handleOpenLink() {
    if (canLink) {
      const newLinkItem = {
        materialSpecId,
        materialSpecName,
        materialId,
        materialName,
      };
      getMaterialPricePartCategory(partCate, newLinkItem);
    }
  }
  const linkDisabled = (leftCsdb.checkedList.length !== 1 || rightCsdb.checkedList.length !== 1) || !canLink;

  /* 新增 -----------------------------------------------------------------------------------------------------------*/
  function handleLeftAddNewItem(data) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL_SPEC,
      data: {
        materialSpec: data.itemName,
        remark: data.remark,
        partCategory2Id: data.partCategory2Id,
      }
    };
    addNewMaterialPriceItem(info);
  }

  function handleRightAddNewItem(data) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data: {
        materialSpecId: leftCsdb.selectedRowId,
        material: data.itemName,
        value: data.price,
      }
    };
    addNewMaterialPriceItem(info);
  }

  /* 封存 -----------------------------------------------------------------------------------------------------------*/
  function handleLeftArchive() {
    const { checkedList } = leftCsdb;
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL_SPEC,
      data: {
        materialSpecId: checkedList,
      }
    };
    archiveMaterialPriceItem(info);
  }

  function handleRightArchive() {
    const { checkedList } = rightCsdb;
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data: {
        materialSpecId: leftCsdb.selectedRowId,
        materialId: checkedList,
      }
    };
    archiveMaterialPriceItem(info);
  }

  // 解除封存 -----------------------------------------------------------------------------------------------------------*/
  function handleLeftUnArchive(unArchiveList) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL_SPEC,
      data: {
        materialSpecId: unArchiveList,
      }
    };
    console.log('left UnArchive');
    unArchiveMaterialPriceItem(info);
  }

  function handleRightUnArchive(unArchiveList) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data: {
        materialSpecId: leftCsdb.selectedRowId,
        materialId: unArchiveList,
      }
    };
    console.log('right UnArchive');
    unArchiveMaterialPriceItem(info);
  }
  return (
    <div className="multi-table-row">
      <div className="multi-table-col">
        <MaterialTable
          onAdd={handleLeftAddNewItem}
          onArchive={handleLeftArchive}
          addModalPath={[partCate, 'left']}
          columns={leftColumns}
          onSave={handleLeftSave}
          dieCutType2List={dieCutType2DropDwon}
          showLink={false}
          showEdit={true}
          csdb={leftCsdb}
          placeholder="Enter Material Spec"
        />
      </div>
      <div className="multi-table-col">
        <MaterialTable
          onAdd={handleRightAddNewItem}
          addModalPath={[partCate, 'right']}
          onArchive={handleRightArchive}
          linkDisabled={linkDisabled}
          onSave={handleRightSave}
          onOpenLink={handleOpenLink}
          columns={rightColumns}
          showLink={false}
          showEdit={date.nextId}
          csdb={rightCsdb}
          dieCutType2List={dieCutType2DropDwon}
          placeholder="Enter Material"
        />
      </div>
      <LinkModal onSave={handleLinkSave} />
    </div>
  );
}

Diecut.defaultProps = {

};

const mapStateToProps = (state) => {
  return {
    linkItem: state.dataBase.materialPrice.linkItem,
    selectedPartCate: state.dataBase.materialPrice.selectedPartCate,
    materialPriceList: state.dataBase.materialPrice.materialPriceList,
    materialPriceDate: state.dataBase.materialPrice.materialPriceDate,
    dieCutType2DropDwon: state.dataBase.materialPrice.diecut.dieCutType2DropDwon,
  };
};

const mapDispatchToProps = {
  setMaterialPriceIsEditMode: DatabaseActions.setMaterialPriceIsEditMode,
  putMaterialPricePartCategory: DatabaseActions.putMaterialPricePartCategory,
  putMaterialPriceCommonParameter: DatabaseActions.putMaterialPriceCommonParameter,
  putMaterialSpec: DatabaseActions.putMaterialSpec,
  getMaterialPriceList: DatabaseActions.getMaterialPriceList,
  getMaterialPricePartCategory: DatabaseActions.getMaterialPricePartCategory,
  addNewMaterialPriceItem: DatabaseActions.addNewMaterialPriceItem,
  archiveMaterialPriceItem: DatabaseActions.archiveMaterialPriceItem,
  unArchiveMaterialPriceItem: DatabaseActions.unArchiveMaterialPriceItem,
  getMaterialPriceDieCutDropDown: DatabaseActions.getMaterialPriceDieCutDropDown,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Diecut);
