import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import SearchBar from '~~elements/SearchInput';
import Button, { BTN_COLOR } from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import Select from '~~elements/Select';
import CheckingRbac from '~~hoc/CheckingRbac';
import PartListWrap from './PartListWrap';
import * as BomDetailActions from '../BomDetailActions';
import BomTabs from '../BomTabs';
import ExportBtn from './components/ExportBtn';

const BomHead = styled.div`
  margin-bottom: 0.5rem;
  padding: 0rem 1rem 0 3rem;
  border-bottom: 1px solid #d0d0d0;
  .bom-info {
    display: flex;
    margin-bottom: 0.5rem;
    label {
      flex: 0 auto;
      margin-right: 4rem;
      &:last-child {
        margin-right: 0px;
      }
      span {
        color: #808080;
        font-size: 0.875rem;
        white-space: nowrap;
      }
      p {
        margin: 0;
        margin-top: 0.625rem;
        font-size: 1rem;
        font-weight: bolder;
        color: #333333;
        font-weight: bolder;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .bom-tabs {
    position: relative;
    display: flex;
    .navitem--link {
      flex: 0 auto;;
      padding: 0.6rem 0rem;
      border-bottom: 4px solid transparent;
      margin-right: 4rem;
      &:last-child {
        margin-right: 0px;
      }
      &.active {
        border-bottom: 4px solid #fcc900;
        p {
          color: #333333;
        }
      }
      p {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        font-size: 1rem;
        font-weight: normal;
        color: #808080;
      }
      .unread {
        display: inline-block;
        vertical-align: middle;
        background-color: red;
        font-size: 0.4rem;
        color: white;
        padding: 4px;
        border-radius: 1rem;
        margin-left: 0.5rem;
        line-height: 1;
      }
    }
  }
  /* 右邊按鈕及下拉 */
  .right-control {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(0, -50%);
    z-index: 9;
    display: flex;
    align-items: center;
    button {
      margin: 0 0.4rem;
      .button {
        width: 0.9rem;
        margin-right: 0.4rem;
      }
    }
    /* 選擇版本的下拉 */
    .version-select {
      width: 9.6875rem;
    }
  }
`;

const ToggleBtn = styled(Button)`
  border: none;
  .icon {
    display: inline-block;
  }
  .icon-menu {
    width: 1.5rem;
  }
  .icon-arrow {
    width: 0.8rem;
  }
`;


const SearchBox = styled.div`
  display: flex;
  margin-top: 0.875rem;
`;

@connect(
  (state) => {
    return {
      bomData: state.bomDetail.bomData,
      bomID: state.bomDetail.bomID,
      assignItem: state.bomDetail.assignItem,
      searchValue: state.bomDetail.searchValue,
      isInputBomInfoOpen: state.bomDetail.isInputBomInfoOpen,
      currentVersion: state.bomDetail.currentVersion,
      versionsList: state.bomDetail.versionsList,
      historyMode: state.bomDetail.historyMode,
    };
  },
  {
    getBomDetailAction: BomDetailActions.getBomDetail,
    updateSearchValue: BomDetailActions.updateSearchValue,
    getBomItemList: BomDetailActions.getBomItemList,
    toggleInputBomInfo: BomDetailActions.toggleInputBomInfo,
    getBomAssignlist: BomDetailActions.getBomAssignlist,
    updateCurrentVersion: BomDetailActions.updateCurrentVersion,
    cancelEditMEBomTable: BomDetailActions.cancelEditMEBomTable,
    setIsEditMode: BomDetailActions.setIsEditMode,

  }
)

@CheckingRbac()
export default class PartList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() { }


  handleClickSearch = () => {
    const { assignItem: { bomDesigneeID: assign = 'all' }, bomID } = this.props;
    this.props.getBomItemList({
      bomID,
      assign
    });
  };

  handleSelectChange = (option) => {
    const { bomID, assignItem: { bomDesigneeID } } = this.props;
    this.props.updateCurrentVersion(option);
    this.props.getBomAssignlist({ bomID, assign: bomDesigneeID });
    this.props.getBomItemList({ bomID, assign: bomDesigneeID });
    this.props.cancelEditMEBomTable(); // 在Edit cost時切換版本要取消編輯
    this.props.setIsEditMode(false);
  };

  render() {
    const {
      bomData: { projectName, totalPartlistCount, unEditCount },
      searchValue,
      isInputBomInfoOpen,
      versionsList,
      currentVersion,
      assignItem: { assign },
      meBomId
    } = this.props;

    // 可以complete version的人才可以看到版本下拉選單
    const allowComplete = this.props.getRbacPath(['VersionComplete', 'allow', 'me_bom_projects']);
    const canExport = this.props.getRbacPath(['Export', 'allow', 'me_bom_projects']);
    const allowQuotation = this.props.getRbacPath(['Export', 'allow', 'me_bom_projects.quotation_reference']);


    const handleToggleInfo = () => {
      this.props.toggleInputBomInfo(!isInputBomInfoOpen);
    };
    return (
      <React.Fragment>
        <BomHead>
          <Collapse isOpen={isInputBomInfoOpen}>
            <div className="bom-info">
              <label>
                <span>Project Name</span>
                <p>{projectName}</p>
              </label>
              <label>
                <span>Total PartList Items</span>
                <p>{totalPartlistCount}</p>
              </label>
            </div>
          </Collapse>
          <div className="bom-tabs">
            <BomTabs unEditCount={unEditCount} />
            <div className="right-control">
              {/* Export的按鈕。在All的tab(assign === '')，才可以export */}
              {assign === '' ? <ExportBtn disabled={!canExport} bomId={meBomId} versionId={currentVersion} /> : null}
              {assign === '' ? <ExportBtn disabled={!allowQuotation} bomId={meBomId} versionId={currentVersion} exportType="quotation" /> : null}
              {/* 選擇版本的下拉選單 */}
              {allowComplete &&
              <div className="version-select">
                <Select
                  target="box"
                  options={versionsList}
                  value={currentVersion}
                  onChange={this.handleSelectChange}
                />
              </div>}
              {/* 上方info的開關 */}
              <ToggleBtn
                round
                border={false}
                color={BTN_COLOR.TRANSPARENT}
                onClick={handleToggleInfo}
              >
                <Icon className="icon-menu" icon="IcoMenu" />
                {
                isInputBomInfoOpen ?
                  <Icon className="icon-arrow" icon={IconName.IconArrowUpBlack} /> :
                  <Icon className="icon-arrow" icon={IconName.IconArrowDownBlack} />
              }

              </ToggleBtn>
            </div>
          </div>
        </BomHead>

        {/* 搜尋 */}
        <SearchBox>
          <SearchBar
            value={searchValue.partlist}
            placeholder="請輸入Part Name or Number"
            onKeywordChange={partlist => this.props.updateSearchValue({ partlist })}
            onClickSearch={this.handleClickSearch}
          />
        </SearchBox>
        <PartListWrap />
      </React.Fragment>
    );
  }
}
