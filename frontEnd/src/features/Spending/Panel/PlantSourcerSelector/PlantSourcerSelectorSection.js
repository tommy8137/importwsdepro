import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { compose, withHandlers, withState, lifecycle, withStateHandlers } from 'recompose';
import * as R from 'ramda';
import { connect } from 'react-redux';

import * as PlantSourcerSelectorActions from './PlantSourcerSelectorActions';
import ListCheckboxSelector from './ListCheckboxSelector';

const borderColor = '#ccc';
const PlantSourcerSelectorSectionDiv = styled.div`
  &.plant-sourcer-selector-section {
    display: flex;
    height: 100%;
    /* min-width: 620px; */
    .flex1 {
      flex: 1;
    }
  }
  .verticle-seperatate-line {
    width: 0;
    height: 100%;
    /* border: solid 1px ${borderColor}; */
    border: 0;
    border-left: 1px solid ${borderColor};
    margin: 0 1rem;
    padding: 0;
  }
`;

@connect(
  (state) => {
    const plantRelated = {
      filteredPlants: state.plantSourcerSelector.filteredPlants,
      plantsGroupByBg: state.plantSourcerSelector.plantsGroupByBg,
      selectedPlantCodeList: state.plantSourcerSelector.selectedPlantCodeList,
      selectedFilteredBgList: state.plantSourcerSelector.selectedFilteredBgList
    };
    const sourcerRelated = {
      filteredSourcers: state.plantSourcerSelector.filteredSourcers,
      selectedSourcerCodeList: state.plantSourcerSelector.selectedSourcerCodeList,
      selectedFilteredRoleList: state.plantSourcerSelector.selectedFilteredRoleList,
      sourcersGroupByRole: state.plantSourcerSelector.sourcersGroupByRole,
    };
    return {
      ...plantRelated,
      ...sourcerRelated,
    };
  },

  (dispatch) => {
    const plantRelated = {
      getPlants: PlantSourcerSelectorActions.getPlants,
      updateSelectedPlantOption: PlantSourcerSelectorActions.updateSelectedPlantOption,
      filterAvailablePlantList: PlantSourcerSelectorActions.filterAvailablePlantList,
    };
    const sourcerRelated = {
      getSourcers: PlantSourcerSelectorActions.getSourcers,
      filterAvailableRoleList: PlantSourcerSelectorActions.filterAvailableRoleList,
      updateSelectedSourcerOption: PlantSourcerSelectorActions.updateSelectedSourcerOption,
    };
    return {
      actions: bindActionCreators({
        ...plantRelated,
        ...sourcerRelated,
      }, dispatch),
    };
  }
)
export default class PlantSourcerSelectorSection extends Component {
  // componentDidMount() {
  //   this.props.actions.getPlants();
  //   this.props.actions.getSourcers();
  // }
  render() {
    const {
      filteredPlants, plantsGroupByBg, selectedPlantCodeList, selectedFilteredBgList,
      filteredSourcers, selectedSourcerCodeList, selectedFilteredRoleList, sourcersGroupByRole,
      actions } = this.props;
    return (
      <PlantSourcerSelectorSectionDiv className="plant-sourcer-selector-section">
        <div className="flex1">
          <ListCheckboxSelector
            title="Plant"
            filteredDataList={filteredPlants}
            dataBadgeGroupBy={plantsGroupByBg}
            selectedDataIdList={selectedPlantCodeList}
            selectedFilteredBagesList={selectedFilteredBgList}
            onChangeSelectedOptions={actions.updateSelectedPlantOption}
            onFilterAvailableDataList={actions.filterAvailablePlantList}
          />
        </div>

        <div className="verticle-seperatate-line" />
        <div className="flex1">
          <ListCheckboxSelector
            title="人員清單"
            filteredDataList={filteredSourcers}
            dataBadgeGroupBy={sourcersGroupByRole}
            selectedDataIdList={selectedSourcerCodeList}
            selectedFilteredBagesList={selectedFilteredRoleList}
            onChangeSelectedOptions={actions.updateSelectedSourcerOption}
            onFilterAvailableDataList={actions.filterAvailableRoleList}
          />
        </div>
        <div className="verticle-seperatate-line" />
      </PlantSourcerSelectorSectionDiv>

    );
  }
}
