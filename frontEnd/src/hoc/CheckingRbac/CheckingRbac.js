import React, { Component, useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import AuthResource from '~~apis/resource/AuthResource';
import * as R from 'ramda';

const initialRbac = {
  List: {
    allow: {},
    deny: {}
  },
  CreateNextStatus: {
    allow: {},
    deny: {}
  },
  Edit: {
    allow: {},
    deny: {}
  },
  Export: {
    allow: {},
    deny: {}
  },
  View: {
    allow: {},
    deny: {}
  }
};

function checkingRbac(path) {
  return (WrappedComponent) => {
    return (
      class CheckingRbac extends Component {
        constructor() {
          super();
          this.state = {
            finished: false,
            rbac: initialRbac
          };
        }
        async componentWillMount() {
          const res = await AuthResource.checkRbac();
          const temp = R.map(a => R.map(b => R.mergeAll(b.map(c => ({ [c]: true }))), a), res.data);
          this.setState({
            finished: true,
            rbac: temp
          });
          // console.log('>> RBAC >>', temp);
        }

        /**
         * @param {*} path ['View', 'allow', 'ee_bom_projects']
         */
        getRbacPath = (p = []) => {
          const { rbac } = this.state;
          return R.path(p, rbac);
        }

        /**
         *
         * @param {array} actionAndEffect ['View', 'allow']
         * @param {string} policy 'ee_bom_projects'
         */
        fuzzyCompareRbac = (actionAndEffect, policy) => {
          const policies = this.getRbacPath(actionAndEffect);
          return policies && Object.keys(policies).findIndex(key => key.startsWith(policy)) !== -1;
        }

        render() {
          const { finished, rbac } = this.state;
          const getRbacPath = (p = []) => R.path(p, rbac);
          const component =
            (<WrappedComponent
              {...this.props}
              rbac={rbac}
              getRbacPath={getRbacPath}
              fuzzyCompareRbac={this.fuzzyCompareRbac}
            />);

          if (finished) {
            if (path) {
              const isAllow = R.filter(p => R.path(p, rbac), path).length > 0;
              if (isAllow) {
                return component;
              }
              console.log('趕出去');
              return (<Redirect
                to={{ pathname: '/', }}
              />);
            }
            return component;
          }
          return (null);
        }
      });
  };
}

export default checkingRbac;
