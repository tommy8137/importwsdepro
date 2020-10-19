import React, { Component, useState, useEffect, useRef } from 'react';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import * as R from 'ramda';
import TableComponent from './TableComponent';
import Filter from '../Filter';
import TopInfo from '../TopInfo';
import Nodata from '../Nodata';


const TableWrap = (props) => {
  const [tableData, setTableData] = useState([]);
  const [contextValue, dispatch] = useContextValue();
  const {
    spaData, spaFilter,
    spaData: {
      materialList,
    },
    // 頁面上方filter control帶得值
    spaFilter: { supplyTypeList, intervalEnable, rangeEnable, interval, range } } = props;

  const { sortInfo } = contextValue;

  useEffect(() => {
    // 拿到最低價的item
    const minPriceItem = _.minBy(materialList, m => m.infoList.unitPrice);
    if (!minPriceItem) {
      setTableData([]);
      return;
    }
    // 最低價
    const minUnitPrice = minPriceItem.infoList.unitPrice;

    // 獲得最低價的index
    const minIndex = minPriceItem ? _.findIndex(materialList, m => m.infoList.unitPrice === minPriceItem.infoList.unitPrice) : 0;
    // 升冪/降冪排序
    const sortFn = sortInfo.map(info => {
      return info.sortOrder === 'asc' ?
        R.ascend(R.path(['infoList', info.dataIndex])) :
        R.descend(R.path(['infoList', info.dataIndex]));
    });

    // 處理filter
    const filterFn = (item) => {
      const price = R.path(['infoList', 'unitPrice'], item);
      const supplyType = R.path(['infoList', 'supplyType'], item);
      const isSupplyType = supplyTypeList.indexOf(supplyType) > -1 || supplyTypeList.length <= 0;
      const { min: intervalMin, max: intervalMax } = interval;
      const { min: rangeMin, max: rangeMax } = range;
      const minPer = minUnitPrice * (1 + rangeMin / 100);
      const maxPer = minUnitPrice * (1 + rangeMax / 100);

      switch (true) {
        case intervalEnable:
          return price >= intervalMin && price <= intervalMax && isSupplyType;
        case rangeEnable:
          return price >= minPer && price <= maxPer && isSupplyType;
        default:
          return isSupplyType;
      }
    };
    // 取得過濾後的list
    const fn = R.pipe(
      R.remove(minIndex, 1),
      R.sortWith(sortFn),
      R.filter(filterFn),
      (val) => _.concat(minPriceItem || [], val)
    );
    const temp = fn(materialList);
    setTableData(temp);
  }, [spaData, spaFilter, sortInfo]);

  const isEmpty = materialList.length <= 0;

  return (
    <React.Fragment>
      <TopInfo tableData={tableData} />
      <Filter />
      {isEmpty ?
        <Nodata /> :
        <TableComponent {...props} tableData={tableData} />}
    </React.Fragment>
  );
};


TableWrap.defaultProps = {};

export default connect(
  (state) => {
    return {
      minPriceItem: state.xray.minPriceItem,
      spaData: state.xray.spaData,
      materialList: state.xray.materialList,
      spaFilter: state.xray.spaFilter,
      specTitle: state.xray.specTitle,
    };
  },
  {
    goToRouter: push
  }
)(TableWrap);
