import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Icon, { IconName } from '~~elements/Icon';
import Button, { BTN_COLOR } from '~~elements/Button';
import Select from '~~elements/Select';
import { MainBackRow, MainTitleRow } from '~~features/Database/DatabaseStyles';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import ScheduleModal from '~~features/Database/components/ScheduleModal';
import Constants from '~~features/Database/DatabaseConstant';
import Content from './ContentSetting';


const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  color: rgba(0,0,0,0.75);
  font-size: 0.9rem;
  border-radius: 4px;
  letter-spacing: 0.5px;
  margin: 0.2rem 0rem;
  transition: .3s ease all;
  cursor: pointer;
  &:hover{
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    text-decoration: none;
    color: rgba(0,0,0,0.75);
  }
`;

function PlasticCleanSheet(props) {
  const [openSchedule, setOpenSchedule] = useState(false);
  const { schedule, productTypeList, activeProductType } = props;

  useEffect(() => {
    props.getProductType(Constants.FORMULA_TYPE.plastic);
  }, []);

  useEffect(() => {
    if (openSchedule) {
      props.getSchedule(Constants.FORMULA_TYPE.plastic);
    }
  }, [openSchedule]);

  function handleRedirect(info) {
    const searchParams = Object.keys(activeProductType).reduce((prev, curr) => {
      if (activeProductType[curr]) { prev.set(curr, activeProductType[curr]); }
      return prev;
    }, new URLSearchParams());

    // 把product type存到search裡
    props.history.push({
      pathname: info.routerName,
      search: `?${searchParams.toString()}`
    });
  }

  const handleSave = (date) => {
    console.log('handleSave', date);
    setOpenSchedule(false);
    props.setSchedule(date);
  };
  return (
    <Fragment>
      {/* Back按鈕 */}
      <MainBackRow>
        <NavLink to="/s/database/me" className="navlink">
          <Icon icon={IconName.IcoArrowLeftBlack} size="0.75rem" />
          <span>Back</span>
        </NavLink>
      </MainBackRow>

      {/* 標頭 與 按鈕 */}
      <MainTitleRow>
        <span>Plastic Clean Sheet</span>
        <div className="select-container">
          <Select
            onChange={props.setProductType}
            target="box"
            placeholder="Product Type"
            options={productTypeList}
            value={activeProductType}
          />
        </div>
        <Button
          round
          color={BTN_COLOR.BLACK}
          onClick={e => setOpenSchedule(true)}
        >
          <Icon icon={IconName.IcoAddWhite} size="0.75rem" />
          Schedule New
        </Button>
      </MainTitleRow>

      {/* 內容 */}
      {Content.map(item => (
        <div className="groupBox" key={item.group}>
          <div className="groupTitle">
            {item.group}
          </div>
          {item.btns.filter(info => info.routerName !== '').map(btn => {
            return (
              <Btns
                onClick={() => handleRedirect(btn)}
                onKeyUp={() => { }}
              >
                {btn.title}
                <Icon icon={IconName.IcoArrowRightBlack} size="0.6rem" />
              </Btns>

            );
          })
          }
        </div>
      ))
    }
      <ScheduleModal
        isOpen={openSchedule && schedule}
        defaultValue={schedule}
        onSave={handleSave}
        onCancel={() => setOpenSchedule(false)}
      />
    </Fragment>
  );
}


const mapStateToProps = (state) => {
  return {
    schedule: state.dataBase.common.schedule,
    activeProductType: state.dataBase.common.activeProductType,
    productTypeList: state.dataBase.common.productTypeList
  };
};

const mapDispatchToProps = {
  getSchedule: DatabaseActions.getSchedule,
  setSchedule: DatabaseActions.setSchedule,
  getProductType: DatabaseActions.getProductType,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PlasticCleanSheet);
