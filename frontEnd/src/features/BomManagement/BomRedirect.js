import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import _get from 'lodash/get';
import CheckingRbac from '~~hoc/CheckingRbac';
import { BOM_MANAGMENT_URL_PARAM_TYPES } from '~~features/BomManagement/BomManagementConst';

// 這邊用來決定進來BomManagement要導去哪一個tab的頁面
function BomRedirect(props) {
  const {
    // for search
    match,
    getRbacPath
  } = props;

  const path = _get(match, ['path'], '');
  const isME = getRbacPath(['List', 'allow', 'me_bom_projects']);
  const isEE = getRbacPath(['List', 'allow', 'ee_bom_projects']);
  const isMEEE = isME && isEE;

  useEffect(() => {
    if (isMEEE) {
      // 如果同時都有ME跟EE, 預設進入EMDM
      props.history.push(`${path}/${BOM_MANAGMENT_URL_PARAM_TYPES.EMDM}`);
    } else if (isME) {
      // 如果有ME權限，預設進入EMEDM
      props.history.push(`${path}/${BOM_MANAGMENT_URL_PARAM_TYPES.EMDM}`);
    } else {
      // 如果是EE的話就進入EE
      props.history.push(`${path}/${BOM_MANAGMENT_URL_PARAM_TYPES.EE}`);
    }
  }, [isME, isEE]);

  return null;
}

const allowList = [
  ['List', 'allow', 'me_bom_projects'],
  ['List', 'allow', 'ee_bom_projects']
];


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  CheckingRbac(allowList)
)(BomRedirect);
