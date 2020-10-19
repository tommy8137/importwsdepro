import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import Select from '~~elements/Select';
import Icon, { IconName } from '~~elements/Icon';
import { EnhanceTooltip } from '~~elements/Tooltip';
import DropdownInput from '~~elements/DropdownInput';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import * as XrayActions from '~~features/XRay/XrayActions';


const ByReference = (props) => {
  const productTypeEl = useRef(null);
  const { roleType, selected, referencePN } = props;
  const { productType = [], type1 = [], type2 = [] } = selected;

  /**
   * @param {*} val 數入的p/n的值
   */
  const handleOnChange = val => {
    props.setReferencePNAction(val);
  };

  /**
   * 按下xx之後清空specItem
   */
  const handleReset = () => {
    props.resetSpecItemAction();
  };

  /**
   * 按下分析時
   */
  const handleOnFilter = () => {
    const data = {
      partNumber: referencePN
    };
    props.getSpecItemByPartNumberAction(roleType, data);
  };

  return (
    <FilterBarPanel
      width="100%"
      height="4rem"
      onReset={handleReset}
      filterDisabled={!referencePN}
      onFilter={handleOnFilter}
      customClickIcon={<Icon icon={IconName.IcoSearchWhite} size="1.8rem" />}
    >
      <FilterBarGroup>
        <DropdownInput
          title="Wistron P/N"
          value={referencePN}
          onChange={handleOnChange}
        />
        {/* proctduct type 如果有選，才顯示tooltip */}
        <FilterBarBox>
          <Select
           // title="Product Type"
            placeholder="Product Type"
            innerRef={productTypeEl}
            value={productType.map(item => ({ label: item, value: item }))}
            isMulti={true}
            target="box"
            border={false}
            disabled
          />
        </FilterBarBox>
        {
          productType.length > 0 &&
          <EnhanceTooltip
            placement="bottom"
            target={productTypeEl}
          >
            {productType.toString()}
          </EnhanceTooltip>
        }
        {/* type1 */}
        <FilterBarBox>
          <Select
            // title="Type I"
            placeholder="Type I"
            value={{ label: type1[0], value: type1[0] }}
            disabled
            target="box"
            border={false}
          />
        </FilterBarBox>
        {/* type2 */}
        <FilterBarBox>
          <Select
            // title="Type II"
            placeholder="Type II"
            value={{ label: type2[0], value: type2[0] }}
            disabled
            target="box"
            border={false}
          />
        </FilterBarBox>
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

ByReference.defaultProps = {

};

export default connect(
  (state) => {
    return {
      specItem: state.xray.specItem,
      selected: state.xray.selected,
      roleType: state.xray.roleType,
      referencePN: state.xray.referencePN,
    };
  },
  {
    getSpecItemByPartNumberAction: XrayActions.getSpecItemByPartNumber,
    resetSpecItemAction: XrayActions.resetSpecItem,
    setReferencePNAction: XrayActions.setReferencePN,
    goToRouter: push
  }
)(ByReference);
