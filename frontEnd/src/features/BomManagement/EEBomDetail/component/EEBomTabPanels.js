import React from 'react';
import styled from 'styled-components';

const EEBomTabPanelsWrapper = styled.div`
  &.eebom-tabs-content-wrapper {
    /* height: 1px; */
    /* .panel-content {
      height: inherit;
    } */
    .tab__panel {
      &.hide {
        display: none;
      }
    }
  }
`;

function EEBomTabPanels(props) {
  return (
    <EEBomTabPanelsWrapper className="eebom-tabs-content-wrapper">
      {props.tabsList.map((item, index) => {
        if (props.highlightIndex === index) {
          return (
            <div className="panel-content" key={index}>{item.render()}</div>
          );
        }
        return (
          <div key={index} />
        );
      })}
    </EEBomTabPanelsWrapper>
  );
}


export default EEBomTabPanels;
