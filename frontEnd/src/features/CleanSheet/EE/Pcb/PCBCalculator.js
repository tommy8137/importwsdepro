import React, { Fragment, useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid';
import * as R from 'ramda';
import _fpSet from 'lodash/fp/set';
import _get from 'lodash/get';
import checkingRbac from '~~hoc/CheckingRbac';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import { PartListForm, PartlistFormContext } from '~~elements/PartListForm';
import { getInitFormData, getPCBInitFormData } from '~~elements/PartListForm/PartlistUtils';
import PartlistResource from '~~apis/resource/PartlistResource';
import ByReference from './components/ByReference';
import * as PCBCalculatorActions from './PCBCalculatorActions';
import { SEARCH_METHOD, WHITE_LIST } from './PCBCalculatorConst';


const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 margin: 2rem 0;

.form-area{
  background: #ffffff;
  margin: 1.25rem 15rem;
  padding-bottom: 8rem;
  position: relative;
  &.view-mode{
    opacity: 0.4;
    cursor: not-allowed;
  }
}

`;

const TabBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 20%;
margin-bottom: 1.5rem;

`;

const RedirectBtn = styled(NavLink)`
  background: #333333;
  color: white;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
  border-radius: 3px;
  position: absolute;
  bottom: 2.5rem;
  right: 3.125rem;
  &:focus{
    box-shadow: none;
  }
  &:hover{
    text-decoration: none;
    opacity: 0.95;
    color: white
  }
  &[disabled]{
    color: white;
    opacity: 0.5;
  }
`;


const PCBCalculator = (props) => {
  const {
    activeSearchMethod,
    isViewMode,
    wistronpn,
    pcbLayout,
    originalSpecByPn,
    originalFormData,

    switchSearchMethod,
    updateTypeIIValue,
    updateWistronPnValue,
    setIsViewMode,
    getFormLayout,
    resetFormLayout,
    getPcbSpec,
    calculatePcb,
    calculateWistronPnPcb,
    resetDataSource,
    keepOriginalFormData,
  } = props;
  const { handleSubmit, validation, forceRender } = useContext(PartlistFormContext);

  useEffect(() => {
    const { state } = props.location;
    getFormLayout('pcbCleanSheet');
    if (state && state.isReset) {
      resetAllData();
      handleSearchMethodChange(SEARCH_METHOD.BY_CATERGORY);
    }

    return () => {
      resetFormLayout();
    };
  }, []);

  useEffect(() => {
    forceRender();
  }, [
    JSON.stringify(originalSpecByPn),
    JSON.stringify(originalFormData),
  ]);

  return (
    <Wrapper>
      <TabBox>
        Search By
        <Button
          round
          color={activeSearchMethod === SEARCH_METHOD.BY_CATERGORY ? 'black' : 'transparent'}
          onClick={() => handleSearchMethodChange(SEARCH_METHOD.BY_CATERGORY)}
        >
          Category
        </Button>
        <Button
          round
          color={activeSearchMethod === SEARCH_METHOD.BY_REFERENCE_PN ? 'black' : 'transparent'}
          onClick={() => handleSearchMethodChange(SEARCH_METHOD.BY_REFERENCE_PN)}
        >
          Reference P/N
        </Button>
      </TabBox>
      {
        activeSearchMethod === SEARCH_METHOD.BY_CATERGORY ?
          <div />
          :
          <ByReference
            value={wistronpn}
            handleValueChange={handelePNChange}
            handleSearchPcbSpec={handleSetSpecByPn}
            resetAllData={resetAllData}
          />
      }
      {pcbLayout &&
      <div className={isViewMode ? 'form-area view-mode' : 'form-area'}>
        {<PartListForm
          partItemInfo={{ typei: 'PCB' }}
          partItemLayout={pcbLayout}
          onSubmit={onFormSubmit}
          isViewMode={isViewMode}
          initialData={originalFormData}
          pcbSpec={originalSpecByPn}
        />}
        <RedirectBtn
          to={{
          pathname: '/g/calculator/pcbResult',
        }}
          onClick={handleSubmit}
          disabled={isViewMode || !validation()}
        >
        Calculate
          <Icon icon={IconName.IcoArrowRight} size="1.8rem" />
        </RedirectBtn>
      </div>}
    </Wrapper>
  );

  /**
   * handleSearchMethodChange做的事：
   * 1. 變換set spec方式
   * 2. 關閉pcb表單
   * 3. 清空type ii的值
   * 4. 清空wistronpn的值
   * 5. 清空表單的值
   * 6. 清空Table的所有Source
   * @param {string} method byCategory 或 byReferencePn
   */
  function handleSearchMethodChange(method) {
    switchSearchMethod(method);
    updateWistronPnValue('');
    keepOriginalFormData({});
    resetDataSource();
    setIsViewMode(true);
    if (method === SEARCH_METHOD.BY_CATERGORY) {
      setIsViewMode(false);
    }
  }

  /**
   * handelePNChange做的事：
   * 1. 更新wistronpn的值
   * @param {*} val wistronpn的value
   */
  function handelePNChange(val) {
    updateWistronPnValue(val);
  }

  /**
   * handleSetSpecByPn做的事：
   *  1. 搜尋spec
   *  2. 清空Table的所有Source
   *  3. 清空表單的值
   */
  function handleSetSpecByPn() {
    const params = {
      wistronpn,
    };
    getPcbSpec(params);
    resetDataSource();
    keepOriginalFormData({});
  }

  function getInitialData(layout, spec = null) {
    if (spec) return getPCBInitFormData(layout, spec);
    return getInitFormData(layout);
  }

  /**
   * resetAllData做的事：
   *  1. 清空Table的所有Source
   *  2. 清空typeii的值
   *  3. 清空wistronpn的值
   *  4. 清空表單的值
   *  5. 關閉pcb表單
   */
  function resetAllData() {
    resetDataSource();
    updateWistronPnValue('');
    keepOriginalFormData({});
    setIsViewMode(true);
    forceRender();
  }

  async function onFormSubmit(error, data, formData) {
    // console.log('error, data, formData', error, data, formData);

    const result = data.Price.pcb;
    if (activeSearchMethod === SEARCH_METHOD.BY_CATERGORY) {
      const payload = result.manufacturer.length > 0 ?
        result.manufacturer.map(item => {
          return {
            id: uuid.v4(),
            content: {
              formData: _fpSet(['pcbTab', 'PcbManufacturer', 'manufacturer'], item)(formData),
              Price: {
                ...result,
                manufacturer: item,
                wistronpn: '',
              },
              spec: null,
            }
          };
        }) : [];
      keepOriginalFormData(formData);
      calculatePcb(payload);
    } else {
      // 記下最原始spec的payload
      const originalSpecPayload = await Promise.all((_get(originalSpecByPn, 'manufacturer', [])).map(async item => {
        const orignalFormData = _fpSet(['pcbTab', 'PcbManufacturer', 'manufacturer'], item)(getInitialData(pcbLayout, originalSpecByPn));
        return {
          id: uuid.v4(),
          content: {
            formData: orignalFormData,
            Price: {
              ...(await PartlistResource.getPriceObj(orignalFormData, pcbLayout)).data.pcb,
              manufacturer: item,
              wistronpn,
              remark: result.remark,
            },
            spec: originalSpecByPn || []
          }
        };
      }));
      //  按下calculate時的所有payload
      const allPayload = result.manufacturer.length > 0 ?
        result.manufacturer.map(item => {
          return {
            id: uuid.v4(),
            content: {
              formData: _fpSet(['pcbTab', 'PcbManufacturer', 'manufacturer'], item)(formData),
              Price: {
                ...result,
                manufacturer: item,
                wistronpn: '',
              },
              spec: null,
            }
          };
        }) : [];

      // 如果沒有 originalSpecByPn
      // if (!originalSpecByPn) {
      //   keepOriginalFormData(formData);
      //   calculatePcb(allPayload);
      // }

      // Start ----進行比對----

      // 如果沒有 originalSpecByPn 就不要再繼續下去
      // if (!originalSpecByPn) return;
      /**
       * 比對所有白名單裡的key, 比對結果是一個陣列(resultList)
       * 如果全部都是true就代表兩組spec完全一樣
       */
      const compareWithEachSpec = (item, origin) => {
        const resultList = WHITE_LIST.map(key => {
          const itemValue = item.content.Price[key] === null ?  item.content.Price[key] : item.content.Price[key].toString();
          const originValue = origin.content.Price[key] === null ?  origin.content.Price[key] : origin.content.Price[key].toString();
          return itemValue === originValue;
        });
        if (resultList.every(isSpecSame => isSpecSame === true)) {
          return true;
        }
        return false;
      };

      /**
       * 把原始資料一個一個拿出來比對, 比對的結果是一個陣列(resultList)
       * 如果全部都是false就代表這筆資料不等於任何一個原始資料, 是一筆新的資料
       */
      const compareWithOrigin = (item) => {
        const resultList = originalSpecPayload.map(origin => compareWithEachSpec(item, origin));
        if (resultList.every(isItemSame => isItemSame === false)) return true;
        return false;
      };

      /**
       * 把資料一個一個拿去和原始資料比對
       * 如果跟原始資料不一樣就丟到 payloadExcludeOriginalSpec 裡
       */
      const payloadExcludeOriginalSpec = allPayload.filter(item => {
        return compareWithOrigin(item);
      });

      // End ----進行比對----
      keepOriginalFormData(formData);
      calculateWistronPnPcb(originalSpecPayload);
      calculatePcb(payloadExcludeOriginalSpec);
    }
  }
};


const allowList = [
  ['Edit', 'allow', 'cleansheet.ee.cal.pcb']
];

export default checkingRbac(allowList)(connect(
  (state) => {
    return {
      activeSearchMethod: state.pcbCalculator.activeSearchMethod,
      isViewMode: state.pcbCalculator.isViewMode,
      wistronpn: state.pcbCalculator.wistronpn,
      pcbLayout: state.pcbCalculator.pcbLayout,
      originalSpecByPn: state.pcbCalculator.originalSpecByPn,
      originalFormData: state.pcbCalculator.originalFormData,
    };
  },
  {
    switchSearchMethod: PCBCalculatorActions.switchSearchMethod,
    updateWistronPnValue: PCBCalculatorActions.updateWistronPnValue,
    setIsViewMode: PCBCalculatorActions.setIsViewMode,
    getFormLayout: PCBCalculatorActions.getFormLayout,
    resetFormLayout: PCBCalculatorActions.resetFormLayout,
    getPcbSpec: PCBCalculatorActions.getPcbSpec,
    calculatePcb: PCBCalculatorActions.calculatePcb,
    calculateWistronPnPcb: PCBCalculatorActions.calculateWistronPnPcb,
    keepOriginalFormData: PCBCalculatorActions.keepOriginalFormData,
    resetDataSource: PCBCalculatorActions.resetDataSource,

  }
)(PCBCalculator));

