import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import _sortBy from 'lodash/sortBy';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Select from '~~elements/Select';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';

const SelectContainer = styled.div`
  width: 6rem;
  margin-left: 1rem;
`;


const SKU_OPTIONS = [
  { label: 'SKU0', value: 'sku0' },
  { label: 'SKU1', value: 'sku1' },
  { label: 'SKU2', value: 'sku2' },
  { label: 'SKU3', value: 'sku3' },
  { label: 'SKU4', value: 'sku4' },
  { label: 'SKU5', value: 'sku5' },
];


function SkuSelector(props) {
  const {
    bomID = '',
    getBomItemList = () => { },
    selectedSkuNum = 'sku1',
    setSelectedSkuNum = () => { }
  } = props;


  const selectedOption = _find(SKU_OPTIONS, obj => obj.value === selectedSkuNum, SKU_OPTIONS[0]);

  function handleOnChange(opt) {
    const { value: newSelectedSkuNum } = opt;
    setSelectedSkuNum(newSelectedSkuNum);
    if (bomID && selectedSkuNum) {
      const params = { bomID };
      getBomItemList(params);
    }
  }

  return (
    <SelectContainer>
      <Select
        target="box"
        options={SKU_OPTIONS}
        value={selectedOption}
        onChange={handleOnChange}
      />
    </SelectContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    selectedSkuNum: state.bomDetail.selectedSkuNum,
    bomID: state.bomDetail.bomID,
  };
};

const mapDispatchToProps = {
  getBomItemList: BomDetailActions.getBomItemList,
  setSelectedSkuNum: BomDetailActions.setSelectedSkuNum,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SkuSelector);

