import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as R from 'ramda';
import _get from 'lodash/get';
import * as yup from 'yup';
import styled, { injectGlobal } from 'styled-components';
import { Popover, PopoverBody } from 'reactstrap';
import { comma } from '~~utils/Math';

import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import Icon from '~~elements/Icon';
import DownArrowIcon from '~~elements/DownArrowIcon';
import RoundButton from '~~elements/RoundButton';
import { HoverHintCell } from '~~elements/DataGridCommonCell';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .popover--content {
    border: none;

    &.popover-inner {
      width: 16.875rem;
      min-height: 9.0625rem;
      border-radius: 4px;
      border: solid 1px #c0c0c0;
      background-color: #ffffff;
    }
    .popover-body {
      padding: 0rem;
    }
    .popover-body > .content {
      padding: 1rem;
      .content__item {
        display: flex;
        margin-bottom: 1rem;
      }
      .content__item__title {
        color: #808080;
        width: 30%;
        display: inline-block;
      }

      .content__item__input {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #333333;
        /* width: 70%; */

        &:focus {
          outline: none;
          border-color: #00a99d;
        }
      }
      .content__item__error-hint {
        color: red;
        .error-msg-alarm {
          width: 12px;
          /* margin: 0px 0px 15px 0px; */
        }
      }
      .content__btn {
        text-align: right;
      }
    }
  }
`;

const SpaCostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .popover--target {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70%;
    text-align: left;
    border-radius: 4px;
    border: solid 1px #333333;
    background-color: #fff;
    &__content {
      padding: 0 5px;
      display: flex;
      align-items: center;
      width: inherit;
      justify-content: space-between;
    }
  }
`;


const infos = [
  {
    title: 'SPA Cost',
    key: 'spa_cost_up',
    validate: yup.number()
      .transform((convertedValue, originalvalue) => {
        return Number(originalvalue);
      })
      .typeError('請輸入數字')
      .nullable()
  },
  {
    title: '料號',
    key: 'material_name',
    validate: yup.string().max(30, '字數太多')
  },
];


function SPACostCell(props) {
  const { value, cellInfo, helperInfo, onClick } = props;
  const { key, style } = cellInfo;
  const { isEditMode, row, } = helperInfo;
  const valueObj = {
    spa_cost_up: value,
    material_name: _get(row, 'material_name'),
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tmpValueObj, setTmpValueObj] = useState(valueObj);
  const [errorObj, setErrorObj] = useState({ cost: [], material_name: [] });
  let refId = `table-grid-popover-id-${key}`;
  let errorCount = R.pipe(
    // 把陣列攤平
    R.flatten,
    // 計算錯誤的個數
    R.length
  )(Object.values(errorObj));
  const handleInputChange = (e, inputKey, validationSchema) => {
    // TODO 手動輸入到小數點第四位
    let inputValue = e.target.value;
    if (inputValue === '') {
      // 更新表單為null
      setTmpValueObj(prevState => ({ ...prevState, [inputKey]: null }));
      setErrorObj(prevState => ({ ...prevState, [inputKey]: [] }));
      return;
    }

    validationSchema.validate(inputValue)
      .then(() => {
        if (inputKey === 'spa_cost_up') {
          // 在檢查有沒有符合小數點四位
          let regexp = /^\d+(\.\d{1,5})?$/g;
          if (regexp.test(inputValue)) {
            const resultValue = inputValue.endsWith('0') ? inputValue : Number(inputValue);
            setErrorObj(prevState => ({ ...prevState, [inputKey]: [] }));
            setTmpValueObj(prevState => ({ ...prevState, [inputKey]: resultValue }));
          } else {
            setErrorObj(prevState => ({ ...prevState, [inputKey]: ['只能輸入小數點五位'] }));
            setTmpValueObj(prevState => ({ ...prevState, [inputKey]: inputValue }));
          }
        } else {
          setErrorObj(prevState => ({ ...prevState, [inputKey]: [] }));
          setTmpValueObj(prevState => ({ ...prevState, [inputKey]: inputValue }));
        }
      })
      .catch(err => {
        // console.log('>>>>>>>>>>不合法', err);
        setErrorObj(prevState => ({ ...prevState, [inputKey]: err.errors }));
        setTmpValueObj(prevState => ({ ...prevState, [inputKey]: inputValue }));
      });
  };

  useEffect(() => {
    if (isEditMode === false) {
      setIsDropdownOpen(false);
      setErrorObj({ spa_cost_up: [], material_name: [] });
      setTmpValueObj(valueObj);
    }
  }, [isEditMode]);

  useEffect(() => {
    setTmpValueObj(valueObj);
  }, [JSON.stringify(valueObj)]);

  if (isEditMode) {
    return (
      <div className="grid-cell" key={key} style={style}>
        <SpaCostContainer>
          <div
            id={refId}
            className="popover--target"
            onClick={() => setIsDropdownOpen(prevState => !prevState)}
            onKeyUp={() => { }}
          >
            <div className="popover--target__content">
              <div>{comma(R.path(['spa_cost_up'], valueObj))}</div>
              <DownArrowIcon />
            </div>
          </div>
          <Popover
            key={key}
            boundariesElement="window"
            className="popover--content"
            placement="bottom-start"
            isOpen={isDropdownOpen}
            target={refId}
            innerClassName="popover--content"
            hideArrow
          >
            <PopoverBody>
              <div className="content">
                {infos.map(info => {
                  return (
                    <div>
                      <div className="content__item" key={info.title}>
                        <span className="content__item__title">{info.title}</span>
                        <div>
                          <input
                            className="content__item__input"
                            type="text"
                            onChange={(e) => {
                              handleInputChange(e, info.key, info.validate);
                            }}
                            value={R.isNil(tmpValueObj[info.key]) ? '' : tmpValueObj[info.key]}
                          />
                          <div className="content__item__error-hint">
                            {
                              R.prop(info.key, errorObj) && R.prop(info.key, errorObj).length > 0 ?
                                <span>
                                  {R.prop(info.key, errorObj).join(',')}
                                  <Icon icon="IcoAlarmRed" className="error-msg-alarm" />
                                </span> : null
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="content__btn">
                  <RoundButton.BlackButton
                    disabled={errorCount > 0}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      props.updateMEBomTableCellById(row.id, 'spa_cost_up', _get(tmpValueObj, 'spa_cost_up', ''));
                      props.updateMEBomTableCellById(row.id, 'material_name', _get(tmpValueObj, 'material_name', ''));
                      // tooltip也要記得修改
                      props.updateMEBomTableCellById(row.id, 'tooltip', {
                        ..._get(tmpValueObj, 'tooltip', {}),
                        spa_cost: {
                          material_name: tmpValueObj.material_name,
                          total_cost: tmpValueObj.spa_cost_up,
                        },
                      });
                    }}
                  >儲存
                  </RoundButton.BlackButton>
                </div>
              </div>
            </PopoverBody>
          </Popover>

        </SpaCostContainer>
      </div>
    );
  }
  return (
    <HoverHintCell
      onClick={onClick}
      value={comma(value)}
      cellInfo={cellInfo}
      helperInfo={helperInfo}
      tooltipRender={() => (
        <div className="content">
          <div className="item" style={{ display: 'flex' }}>
            <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#9f9f9f' }}>SPA Cost </div>
            <div className="content">${comma(R.path(['spa_cost_up'], valueObj))}</div>
          </div>
          <div className="item" style={{ display: 'flex' }}>
            <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#9f9f9f' }}>料號 </div>
            <div className="content">{R.path(['material_name'], valueObj)}</div>
          </div>
        </div>
      )}
    />);
}


const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  updateMEBomTableCellById: BomDetailActions.updateMEBomTableCellById,
};


export default connect(mapStateToProps, mapDispatchToProps)(SPACostCell);
