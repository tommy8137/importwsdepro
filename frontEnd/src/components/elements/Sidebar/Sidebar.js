import React, { Component } from 'react';
import styled from 'styled-components';

import Icon, { IconName } from '~~elements/Icon/';
import NavLink from '~~elements/NavLink';
import * as R from 'ramda';
import checkingRbac from '~~hoc/CheckingRbac';


import NavDropdown from './NavDropdown';
import NavItem from './NavItem';

const Wrapper = styled.div`
  .logo {
    display: block;
    width: 100%;
    text-align: center;
    padding: 1.5rem 6px 1.5rem 6px;
    transition: 0.3s ease all;
    transform: translate(0, 0);
    &:hover {
      opacity: 0.86;
    }
    .icon {
      width: 4rem;
      max-width: 100%;
      margin-bottom: 1rem;
    }
    p {
      color: #ffffff;
      margin-top: 0.9rem;
      font-weight: 200;
      font-size: 0.96rem;
      letter-spacing: 1.2px;
      margin: 0;
    }
  }
`;

@checkingRbac()
export default class Sidebar extends Component {
  render() {
    const { match: { url, params, }, location: { pathname }, fuzzyCompareRbac } = this.props;

    const canSeeXrayButton = R.path(['View', 'allow', 'xray.me'], this.props.rbac) || R.path(['View', 'allow', 'xray.ee'], this.props.rbac);
    const canSeeCleansheetButton = fuzzyCompareRbac(['Edit', 'allow'], 'cleansheet');
    const canSeeDashboardButton = R.path(['List', 'allow', 'dashboard'], this.props.rbac);
    const canSeeBomManagementButton = R.path(['List', 'allow', 'me_bom_projects'], this.props.rbac) || R.path(['List', 'allow', 'ee_bom_projects'], this.props.rbac);
    const canSeeSettingButton = R.path(['List', 'allow', 'setting.me'], this.props.rbac) || R.path(['List', 'allow', 'setting.ee'], this.props.rbac) || R.path(['List', 'allow', 'permission.all'], this.props.rbac);
    const canSeeDatabaseButton = fuzzyCompareRbac(['Edit', 'allow'], 'database');

    return (
      <Wrapper>
        <NavLink className="logo" id="logo" to="/">
          <Icon icon="IcoLogo" />
          <p>E-PROCUREMENT</p>
        </NavLink>
        {/* Xray */}
        {canSeeXrayButton && <NavItem
          title="X-Ray"
          link="/s/xRay"
          icon={pathname === '/s/xRay' ? <Icon icon="IcoXraySmall1" /> : <Icon icon="IcoXraySmall0" />}
          active={pathname === '/s/xRay'}
        />}

        {/* old clean sheet */}
        {/* {canSeeCleansheetButton && <NavDropdown
          {...this.props}
          title="Clean Sheet"
          link="/s/costgenerator/calculator"
          icon={<Icon icon="IcoCleanSheetSmall" />}
          match={this.props.match}
          routes={[
            { link: '/s/costgenerator/calculator', title: 'Clean Sheet' },
            { link: '/s/costgenerator/database', title: 'DATA BASE' },
          ]}
        />} */}

        {/* Clean Sheet */}
        {canSeeCleansheetButton && <NavDropdown
          {...this.props}
          title="Clean Sheet"
          link="/s/cleanSheet/cleanSheet"
          icon={<Icon icon="IcoCleanSheetSmall" />}
          match={this.props.match}
          routes={[
            { link: '/s/cleanSheet/cleanSheet', title: 'Clean Sheet' },
            { link: '/s/costgenerator/database', title: 'DATA BASE' },
          ]}
        />}

        {/* Dashboard */}
        {canSeeDashboardButton && <NavDropdown
          {...this.props}
          title="Dashboard"
          link="/s/board/ProjectView"
          icon={<Icon icon="IcoDashBoardSmall" />}
          routes={[
            { link: '/s/board/ProjectView', title: 'Project View' },
            { link: '/s/spending/waterfall', title: 'Spending - Waterfall' },
            { link: '/s/spending/month', title: 'Spending - Month' },
          ]}
        />}

        {/* BomManagement */}
        {canSeeBomManagementButton && <NavItem
          title="BOM Management"
          link="/s/bomManagement"
          icon={['/s/bomManagement/me', '/s/bomManagement/ee', '/s/bomManagement/emdm'].includes(pathname) ? <Icon icon="IcoBomSmall1" /> : <Icon icon="IcoBomSmall0" />}
          active={['/s/bomManagement/me', '/s/bomManagement/ee', '/s/bomManagement/emdm'].includes(pathname)}
        />}

        {/* Database */}
        {canSeeDatabaseButton && <NavItem
          title="Database"
          link="/s/database"
          icon={pathname.toLowerCase().includes('/s/database') ? <Icon icon={IconName.IcoDatabaseBlack} /> : <Icon icon={IconName.IcoDatabaseWhite} />}
          active={pathname.toLowerCase().includes('/s/database')}
        />}

        {/* Setting */}
        {canSeeSettingButton && <NavItem
          title="Setting"
          link="/s/setting"
          icon={pathname === '/s/setting' ? <Icon icon="IcoSetting1" /> : <Icon icon="IcoSetting0" />}
          active={pathname === '/s/setting'}
        />}
      </Wrapper>
    );
  }
}
