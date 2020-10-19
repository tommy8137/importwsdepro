import React, { Component, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import _ from 'lodash';
import { compose } from 'recompose';
import checkingRbac from '~~hoc/CheckingRbac';

import ExportBtns from './ExportBtns';


const TopInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  .left-wrap,
  .right-wrap {
    display: flex;
  }
  .info-wrap {
    display: flex;
    flex-direction: row;
    margin: 0 -1.5rem;
    .info {
      min-width: 0;
      flex: 0 auto;
      padding: 0 1.5rem;
      min-width: 8rem;
      .tit {
          font-size: 1rem;
          color: #8D8D8E;
          margin-bottom: 0.5rem;
      }
      p {
        color: #333;
        font-size: 1.15rem;
        margin: 0;
        font-weight: bolder;

      }
    }
  }

`;

const TopInfo = (props) => {
  const {
    tableData = [],
    spaData: {
      manufacturer = '',
      referencePN = '',
      type1 = '',
      type2 = '',
      materialList = []
    },
  } = props;

  return (
    <TopInfoContainer>
      <div className="left-wrap">
        <div className="info-wrap">
          {
            referencePN &&
            <div className="info">
              <div className="tit">Wistron P/N</div>
              <p>{referencePN}</p>
            </div>
          }
          {
            manufacturer &&
            <div className="info">
              <div className="tit">Menufacturer</div>
              <p>{manufacturer}</p>
            </div>
          }
          <div className="info">
            <div className="tit">Type I</div>
            <p>{type1 || '-'}</p>
          </div>
          <div className="info">
            <div className="tit">Type II</div>
            <p>{type2 || '-'}</p>
          </div>
          <div className="info">
            <div className="tit">Results</div>
            <p>{tableData.length}</p>
          </div>
        </div>
      </div>
      <div className="right-wrap">
        {/* export按鈕跟問號 */}
        <ExportBtns />
      </div>
    </TopInfoContainer>
  );
};

TopInfo.defaultProps = {

};

const mapStateToProps = (state) => {
  return {
    spaData: state.xray.spaData,
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  checkingRbac()
)(TopInfo);
