import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthResource from '~~apis/resource/AuthResource';
import { getPureToken } from '~~utils/Auth';
import _ from 'lodash';
import * as R from 'ramda';


const rolefile = {
  CE: ['ME', 'EE'],
  RD: ['ME', 'ME_TM_FM', 'EE'],
  SOURCER: ['ME', 'EE'],
  PM: ['ACCOUNT'],
  ADMIN: ['ADMIN'],
};

export default function checkingRole(whiteList, blackList = null) {
  return (WrappedComponent) => {
    return (class CheckingRole extends Component {
      constructor() {
        super();
        this.state = {
          permission: {
            ME: false,
            CE: false,
            EE: false,
            ADMIN: false,
            ACCOUNT: false,
            CONTACT_WINDOW: false,
            ME_TM_FM: false,
            PM: false,
            RD: false,
            SOURCER: false,
          },
          isAllow: null,
        };
      }

      async componentWillMount() {
        try {
          // 先整理好設定的白名單
          // input 轉成profile的格式，只列出白名單
          let allowRoles = this.getAllowList(whiteList);

          // 把黑名單從白名單中剔除
          allowRoles = this.rmDenyList(allowRoles, blackList);

          const res = await AuthResource.checkUserRole(`${getPureToken()}`);
          const { data: { isAdmin, isCe, isMe, isEe, isAccount,
            isContactWindow, isMeTmFm, isPm, isRd, isSourcer, userID } } = res;
          const permission = {
            ME: isMe,
            CE: isCe,
            EE: isEe,
            ADMIN: isAdmin,
            ACCOUNT: isAccount,
            CONTACT_WINDOW: isContactWindow,
            ME_TM_FM: isMeTmFm,
            PM: isPm,
            RD: isRd,
            SOURCER: isSourcer,
            userID, // permission裡帶User工號
          };

          // const isAllow = allowList.reduce((isPass, current) => isPass || permission[current.toUpperCase()], false);
          const isAllow = this.checkPermissionExist(allowRoles, permission);

          this.setState({
            permission,
            isAllow,
          }, () => {
            // console.log('permission::::', permission);
            // console.log('isAllow::::', isAllow);
          });
        } catch (error) {
          console.error(error);
          // 如果API有出錯  就直接登出!!!!!!!
          sessionStorage.clear();
          this.setState({
            isAllow: false,
          });
        }
      }
      getAllowList(allowList) {
        let allowRoles = {};

        // 白名單是一個陣列
        if (allowList.length > 0) {
          allowList.forEach((allowItem) => {
            if (_.isString(allowItem)) {
              // input給的是string 有兩種可能：(1) 給的是rolename, (2) 給的是roletype
              const hasName = R.has(allowItem);
              const hasType = arr => R.contains(allowItem, arr);
              if (hasName(rolefile)) {
                // 給的是rolename
                allowRoles = {
                  ...allowRoles,
                  [allowItem]: rolefile[allowItem]
                };
              } else {
                // 給的是roletype
                Object.keys(rolefile).forEach((name) => {
                  if (hasType(rolefile[name])) {
                    allowRoles = {
                      ...allowRoles,
                      [name]: [..._.get(allowRoles, name, []), allowItem],
                    };
                  }
                });
              }
            } else if (_.isPlainObject(allowItem)) {
              // input 給的是object的話，判斷有在角色清單裡之後，直接塞進allowRoles裡
              const pairlist = _.toPairs(allowItem);
              pairlist.forEach((p) => {
                const name = p[0];
                const type = p[1];
                if (!R.contains(type, rolefile[name])) {
                  return;
                }

                allowRoles = {
                  ...allowRoles,
                  [name]: [..._.get(allowRoles, name, []), type]
                };
              });
            }
          });
          return allowRoles;
        }

        // 白名單是一個空陣列
        if (allowList.length === 0) {
          return rolefile;
        }

        return {};
      }


      /**
       將allow的清單剔除deny的清單
      */
      rmDenyList(allowRoles, denyList) {
        if (denyList) {
          denyList.forEach((denyItem) => {
            // array裡是role type或role name字串
            if (_.isString(denyItem)) {
              // 給的是rolename
              const hasName = R.has(denyItem);
              const hasType = arr => R.contains(denyItem, arr);
              if (hasName(allowRoles)) {
                // 給的是rolename
                delete allowRoles[denyItem];
              } else {
                // 給的是roletype
                Object.keys(allowRoles).forEach((name) => {
                  _.remove(allowRoles[name], allowItem => allowItem === denyItem);
                });
              }
            } else if (_.isPlainObject(denyItem)) {
              // input 給的是object的話，判斷有在角色清單裡之後，直接塞進allowRoles裡
              const pairlist = _.toPairs(denyItem);
              pairlist.forEach((p) => {
                const name = p[0];
                const type = p[1];
                _.remove(allowRoles[name], allowItem => allowItem === type);
              });
            }
          });
        }
        return allowRoles;
      }

      /**
       * 判斷user是否符合白名單
       * @param {*} allowRoles
       * @param {*} permission
       */
      checkPermissionExist(allowRoles, permission) {
        // 如果allowRoles的內容跟系統內所有角色內容相同，則直接讓user可以看到頁面
        if (_.isEqual(allowRoles, rolefile)) {
          return true;
        }
        const isTrue = d => d;
        const userRole = R.filter(isTrue, permission); // get user permission role name, role type
        const prmsName = Object.keys(userRole).filter(name => _.get(allowRoles, name, false)); // get role name in userRole properties
        const isAllow = prmsName.length > 0 ? Object.keys(userRole).reduce((ispass, current) => ispass || R.contains(current, allowRoles[prmsName[0]]), false) : false;
        return isAllow;
      }


      render() {
        const { permission, isAllow } = this.state;

        if (isAllow === null) {
          return <div />;
        }
        return (
          (isAllow ?
            <div>
              <WrappedComponent
                {...this.props}
                permission={permission}
              />
            </div> :
            <Redirect
              to={{ pathname: '/', }}
            />)
        );
      }
    });
  };
}
