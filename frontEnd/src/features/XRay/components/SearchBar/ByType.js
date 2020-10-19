import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import Icon, { IconName } from '~~elements/Icon';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import { EnhanceTooltip } from '~~elements/Tooltip';
import * as XrayActions from '~~features/XRay/XrayActions';
import { XRAY_ROLES, XRAY_TYPES, XRAY_EMPTY_SPECITEM, XRAY_EMPTY_SPECGROUP } from '~~features/XRay/XrayConst';

const ByType = (props) => {
  const { searchbarStatus, specItem, productType: productTypeList, type2List, type1List, roleType, selected } = props;
  const { productType = [], type1 = [], type2 = [], sourcer = [] } = selected;
  const sourcerList = props.sourcerList.map(s => s.scode);
  const filterDisabled = (roleType === XRAY_ROLES.EE ? !productType.length : false) || !type1.length || !type2.length;
  const productTypeEl = useRef(null);

  // 如果他是從我的最愛選擇的，那就不能更改下拉內容
  const typeDisabled = specItem.owner;
  // handle productType
  const handleProductTypeChange = val => {
    props.setSelected({ ...selected, productType: val, type1: [], type2: [], sourcer: [] });
  };

  /**
   * on change type1
   * @param {*} val type1的值
   */
  const handleType1Change = value => {
    const { value: val } = value;
    props.setSelected({ ...selected, type1: [val], type2: [], sourcer: [] });
  };

  /**
   * on change type2
   * @param {*} val type1的值
   */
  const handleType2Change = value => {
    const { value: val } = value;
    props.setSelected({ ...selected, type2: [val], sourcer: [] });
  };

  /**
   * on change sourcer
   * @param {*} val sourcer的值
   */
  const handleSourcerChange = value => {
    const val = value.map(item => item.value);
    props.setSelected({ ...selected, sourcer: val });
  };

  // handleReset
  const handleReset = () => {
    props.resetSpecItemAction();
  };

  /**
   * 當按下filter按鈕時
   */
  const handleOnFilter = () => {
    if (type1.length && type2.length) {
      if (roleType === XRAY_ROLES.ME) {
        props.getMeSpecItemsListAction(1);
      } else {
        props.getSpecItemsListAction();
      }
    }
  };

  /**
   * 當點選type1時，get type1 list
   */
  const handleType1Open = () => {
    props.getType1List(roleType, productType);
  };
  /**
   * 當點選type2時，get type2 list
   */
  const handleType2Open = () => {
    if (type1.length) {
      props.getType2List(roleType, productType, type1);
    }
  };

  /**
   * 當點選sourcer時，get sourcer list
   */
  const handleSourcerOpen = () => {
    if (type1.length && type2.length) {
      props.getSourcerList(roleType, productType, type1, type2);
    }
  };

  return (
    <FilterBarPanel
      width="100%"
      height="4rem"
      onReset={handleReset}
      filterDisabled={filterDisabled}
      onFilter={handleOnFilter}
      customClickIcon={<Icon icon={IconName.IcoSearchWhite} size="1.8rem" />}
    >
      <FilterBarGroup>
        {/* 只有在ee的時候才會有product type */}
        {
          roleType === XRAY_ROLES.EE &&
          <FilterBarBox isLoading={searchbarStatus.productType}>
            <Select
              // title="Product Type"
              innerRef={productTypeEl}
              value={productType.map(item => ({ label: item, value: item }))}
              options={productTypeList.map(opt => ({ label: opt, value: opt }))}
              onChange={handleProductTypeChange}
              // onClose={handleProductTypeClose}
              disabled
              isMulti={true}
              target="box"
              border={false}
              placeholder="Product Type"
            />
          </FilterBarBox>
        }
        {
          productType.length > 0 &&
          <EnhanceTooltip
            placement="bottom"
            target={productTypeEl}
          >
            {productType.toString()}
          </EnhanceTooltip>
        }
        <FilterBarBox isLoading={searchbarStatus.type1}>
          <Select
            // title="Type I"
            placeholder="Type I"
            value={{ label: type1[0], value: type1[0] }}
            options={type1List.map(opt => ({ label: opt, value: opt }))}
            onChange={handleType1Change}
            disabled={typeDisabled}
            onOpen={handleType1Open}
            onClose={() => { }}
            target="box"
            border={false}
          />
        </FilterBarBox>
        <FilterBarBox isLoading={searchbarStatus.type2}>
          <Select
            // title="Type II"
            placeholder="Type II"
            value={{ label: type2[0], value: type2[0] }}
            options={type2List.map(opt => ({ label: opt, value: opt }))}
            onChange={handleType2Change}
            disabled={typeDisabled || type1.length <= 0}
            onOpen={handleType2Open}
            onClose={() => { }}
            target="box"
            border={false}
          />
        </FilterBarBox>
        <FilterBarBox isLoading={searchbarStatus.sourcerList}>
          <Select
            // title="Sourcer(非必選)"
            isMulti={true}
            placeholder="Sourcer(非必選)"
            value={sourcer.map(item => ({ label: item, value: item }))}
            options={sourcerList.map(opt => ({ label: opt, value: opt }))}
            onChange={handleSourcerChange}
            disabled={typeDisabled || type1.length <= 0 || type2.length <= 0}
            onOpen={handleSourcerOpen}
            onClose={() => { }}
            target="box"
            border={false}
          />
        </FilterBarBox>
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

ByType.defaultProps = {

};

export default connect(
  (state) => {
    return {
      specItem: state.xray.specItem,
      selected: state.xray.selected,
      roleType: state.xray.roleType,
      searchbarStatus: state.xray.searchbarStatus,
      productType: state.xray.productType,
      type1List: state.xray.type1List,
      type2List: state.xray.type2List,
      sourcerList: state.xray.sourcerList,
    };
  },
  {
    resetSpecItemAction: XrayActions.resetSpecItem,
    setSelected: XrayActions.setSelected,
    getSpecItemsListAction: XrayActions.getSpecItemsList,
    getMeSpecItemsListAction: XrayActions.getMeSpecItemsList,
    getType1List: XrayActions.getType1List,
    getType2List: XrayActions.getType2List,
    getSourcerList: XrayActions.getSourcerList,
    goToRouter: push
  }
)(ByType);
