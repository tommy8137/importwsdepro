import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Select from '~~elements/Select';
import Icon, { IconName } from '~~elements/Icon';
import moment from 'moment';
import * as R from 'ramda';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import ScheduleModal from '~~features/Database/components/ScheduleModal';
import { PARTCATE } from '~~features/Database/ME/MaterialPrice/MaterialConst';
import Metal from './Metal';
import Plastic from './Plastic';
import Diecut from './Diecut';
import Rubber from './Rubber';


function MaterialPriceTable(props) {
  const {
    // state
    selectedPartCate: { value: partCate },
    // actions
  } = props;

  switch (partCate) {
    case PARTCATE.METAL:
      return <Metal />;
    case PARTCATE.PLASTIC:
      return <Plastic />;
    case PARTCATE.DIECUT:
      return <Diecut />;
    case PARTCATE.RUBBER:
      return <Rubber />;
    default:
      return <Metal />;
  }
}

MaterialPriceTable.defaultProps = {

};

const mapStateToProps = (state) => {
  return {
    leftTableActiveRowId: state.dataBase.materialPrice.leftTableActiveRowId,
    selectedPartCate: state.dataBase.materialPrice.selectedPartCate,
    partCateOptions: state.dataBase.materialPrice.partCateOptions,
    materialPriceList: state.dataBase.materialPrice.materialPriceList,
    materialPriceDate: state.dataBase.materialPrice.materialPriceDate
  };
};

const mapDispatchToProps = {
  getMaterialPriceList: DatabaseActions.getMaterialPriceList,
  setMaterialPriceSelectedPartCate: DatabaseActions.setMaterialPriceSelectedPartCate,
  setMaterialPriceSchedule: DatabaseActions.setMaterialPriceSchedule
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MaterialPriceTable);
