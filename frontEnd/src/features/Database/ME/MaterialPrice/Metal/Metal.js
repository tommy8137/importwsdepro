import React, { useState, useEffect } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import ColumnSetting from '~~features/Database/ME/MaterialPrice/ColumnSetting';
import MaterialTable from '~~features/Database/ME/MaterialPrice/MaterialTable';
import LinkModal from '~~features/Database/ME/MaterialPrice/LinkModal';
import useCSDB from '~~features/Database/components/useCSDB';
import { TABLE_NAME } from '~~features/Database/ME/MaterialPrice/MaterialConst';

function MaterialPrice(props) {
  const [subMaterial, setSubMaterial] = useState([]);
  const {
    // state
    linkItem,
    materialPriceList,
    materialPriceDate: date,
    selectedPartCate: { value: partCate },
    // actions
    setMaterialPriceIsEditMode,
    updateMaterialPrice,
    getMaterialPricePartCategory,
    putMaterialPricePartCategory,
    addNewMaterialPriceItem,
    archiveMaterialPriceItem,
    unArchiveMaterialPriceItem,
  } = props;


  const LeftExtendsCSDBPorps = {
    mainTable: materialPriceList,
    date,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'material', keyword: '' },
    onUnArchive: handleLeftUnArchive,
  };

  const RightExtendsCSDBPorps = {
    mainTable: subMaterial,
    date,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'thickness', keyword: '' },
    onUnArchive: handleRightUnArchive,
  };
  const leftCsdb = useCSDB(LeftExtendsCSDBPorps);
  const rightCsdb = useCSDB(RightExtendsCSDBPorps);

  const leftColumnsProps = {
    date,
    partCate,

    ...leftCsdb
  };

  const rightColumnsProps = {
    date,
    partCate,

    ...rightCsdb
  };

  const leftColumns = ColumnSetting.getLeftTableColumn(leftColumnsProps);
  const rightColumns = ColumnSetting.getRightTableColumn(rightColumnsProps);

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
  function handleRightSave(list) {
    const materialId = leftCsdb.selectedRowId;
    const data = {
      nextId: date.nextId,
      materialId,
      subMaterial: list
    };
    updateMaterialPrice(partCate, data);
  }

  function handleLinkSave(list) {
    const data = {
      ...linkItem,
      partCategory: list
    };
    putMaterialPricePartCategory(partCate, data);
  }

  /* Link ----------------------------------------------------------------------------------------------------------*/
  function handleOpenLink() {
    // 左邊取第一個
    const materialId = _get(leftCsdb.checkedList, '0', false);
    const materialItem = _find(materialPriceList, (obj) => obj.id === materialId);
    if (materialItem) {
      const materialName = materialItem.material;
      const newLinkItem = {
        materialId,
        materialName,
      };
      getMaterialPricePartCategory(partCate, newLinkItem);
    }
  }

  /* 新增 -----------------------------------------------------------------------------------------------------------*/
  function handleLeftAddNewItem(data) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data: {
        material: data.itemName,
        density: data.density
      }
    };
    addNewMaterialPriceItem(info);
  }

  function handleRightAddNewItem(data) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL_THICKNESS,
      data: {
        materialId: leftCsdb.selectedRowId,
        thickness: data.thinkness,
        price: data.price
      }
    };
    addNewMaterialPriceItem(info);
  }

  /* 封存 -----------------------------------------------------------------------------------------------------------*/
  function handleLeftArchive() {
    const { checkedList } = leftCsdb;
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data: {
        materialId: checkedList,
      }
    };
    archiveMaterialPriceItem(info);
  }


  function handleRightArchive() {
    const { checkedList } = rightCsdb;
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL_THICKNESS,
      data: {
        materialId: leftCsdb.selectedRowId,
        materialThickness: checkedList
      }
    };
    archiveMaterialPriceItem(info);
  }

  // 解除封存 -----------------------------------------------------------------------------------------------------------*/
  function handleLeftUnArchive(unArchiveList) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data: {
        materialId: unArchiveList,
      }
    };
    unArchiveMaterialPriceItem(info);
  }

  function handleRightUnArchive(unArchiveList) {
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL_THICKNESS,
      data: {
        materialId: leftCsdb.selectedRowId,
        materialThickness: unArchiveList
      }
    };
    unArchiveMaterialPriceItem(info);
  }

  return (
    <div className="multi-table-row">
      <div className="multi-table-col">
        <MaterialTable
          onAdd={handleLeftAddNewItem}
          addModalPath={[partCate, 'left']}
          onArchive={handleLeftArchive}
          columns={leftColumns}
          onLinkSave={handleLinkSave}
          onOpenLink={handleOpenLink}
          showLink={true}
          showEdit={false}
          csdb={leftCsdb}
          placeholder="Enter Material"
        />
      </div>
      <div className="multi-table-col">
        <MaterialTable
          onAdd={handleRightAddNewItem}
          addModalPath={[partCate, 'right']}
          onArchive={handleRightArchive}
          onSave={handleRightSave}
          columns={rightColumns}
          showLink={false}
          showEdit={date.nextId}
          csdb={rightCsdb}
          placeholder="Enter Thickness"
        />
      </div>
      <LinkModal onSave={handleLinkSave} />
    </div>
  );
}

MaterialPrice.defaultProps = {

};

const mapStateToProps = (state) => {
  return {
    linkItem: state.dataBase.materialPrice.linkItem,
    selectedPartCate: state.dataBase.materialPrice.selectedPartCate,
    materialPriceList: state.dataBase.materialPrice.materialPriceList,
    materialPriceDate: state.dataBase.materialPrice.materialPriceDate
  };
};

const mapDispatchToProps = {
  setMaterialPriceIsEditMode: DatabaseActions.setMaterialPriceIsEditMode,
  updateMaterialPrice: DatabaseActions.updateMaterialPrice,
  putMaterialPricePartCategory: DatabaseActions.putMaterialPricePartCategory,
  getMaterialPriceList: DatabaseActions.getMaterialPriceList,
  getMaterialPricePartCategory: DatabaseActions.getMaterialPricePartCategory,
  addNewMaterialPriceItem: DatabaseActions.addNewMaterialPriceItem,
  archiveMaterialPriceItem: DatabaseActions.archiveMaterialPriceItem,
  unArchiveMaterialPriceItem: DatabaseActions.unArchiveMaterialPriceItem,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MaterialPrice);
