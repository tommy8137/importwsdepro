import React, { useState } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import Select from '~~elements/Select';

const SelectContainer = styled.div`
  width: 12rem;
  margin: 0 1rem;
`;

function EdmVersionIdSelect(props) {
  const { edmVersionIdList = [], activeTab } = props;
  const { eeBomProjectID, edmVersionID } = props.match.params;
  const edmVersion = R.path(['edm_version'], activeTab);
  /**
   * 當更改下拉的edm_version_id時， 改變當前的頁面的edm_version_id
   * @param {} edmVersionID edm_version_id
   */
  function handleSelectChange(option) {
    const { value: newEdmVersionID } = option;
    if (eeBomProjectID && newEdmVersionID && newEdmVersionID !== edmVersionID) {
      const url = `/s/bomManagement/ee/detail/${eeBomProjectID}/${newEdmVersionID}`;
      props.history.replace(url);
    }
  }

  /** 轉換成react－select 的格式 */
  const options = edmVersionIdList.map(obj => ({ label: `Version ${obj.status_version}`, value: obj.edm_version_id }));
  const selectedOption = options.reduce((prev, curr) => (curr.value === edmVersionID ? curr : prev), {});

  return (
    <SelectContainer>
      <Select
        target="box"
        width="15rem"
        value={selectedOption}
        options={options}
        onChange={(option) => handleSelectChange(option)}
      />
    </SelectContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.eeBom.activeTab,
    edmVersionIdList: state.eeBom.edmVersionIdList,
  };
};

const mapDispatchToProps = {

};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(EdmVersionIdSelect);

