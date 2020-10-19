import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Clickoutside from '~~elements/Clickoutside';
import { ResetBtn, DownBtn, UpBtn } from './Btns';
import LoadingIcon from './LoadingIcon';

const DropdownBox = styled.div`
opacity: ${props => (props.disabled ? 0.2 : 1)};
cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
/* pointer-events: ${props => (props.disabled ? 'none' : '')}; */
.wrapper{
  height: 100%;
  display: flex;
  width: 100%;
  align-items: center;
}
.left {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
    margin-left: 1rem;
    justify-content: center;
    .top-row {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        height: 15px;
        .icon {
          /* 等要放日曆的icon再填 */
        }
        .title {
          font-size: 10px;
          opacity: .4;
          text-indent: .15rem;
        }
      }
      .bottom-row {
        font-size: 16px;
        text-indent: .15rem;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        opacity: .7;
        white-space: nowrap;
      }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* width: 1.5rem; */
    margin-right: 1rem;
    &-line {
      border: .5px solid #ccc;
      display: inline-block;
      height: 70%;
      margin: 0px 1rem;
    }
  }
  .loadingIcon{
    position: absolute;
    right: 2rem;
    /* opacity: 0.5; */
  }
`;

const List = styled.div`
  z-index:9;
  overflow: hidden;
  overflow-y: auto;
  height: auto;
  color: #333;
  max-height: 300px;
  /* padding: 1rem 0.8rem; */
  border: solid 0.5px #cccccc;
  background-color: #ffffff;
  border-radius: .2rem;
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  transition: 0.12s ease all;
  transform-origin: center top;
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  transform: ${props => (props.active ? 'translate(0%, 0%) scaleY(1)' : 'translate(0%, 0%) scaleY(0)')};
  opacity: ${props => (props.active ? '1' : '0')};
  p {
    margin: 0;
  }
  > div {
    display: block;
    width: 100%;
    label {
      width: 100%;
    }
  }
`;

export default class Dropdown extends Component {
  static propTypes = {
    /** 可以放icon或checkbox */
    icon: PropTypes.node,
    /** 欄位名稱 */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** 欄位顯示的字 */
    text: PropTypes.string,
    /** 是否要顯示欄位reset鈕 */
    resetBtn: PropTypes.bool,
    /** 下拉內容 */
    children: PropTypes.node,
    /** 欄位reset的function */
    onReset: PropTypes.func,
    /** 欄d是否disable */
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    icon: null,
    title: '',
    text: 'All',
    children: null,
    resetBtn: false,
    disabled: false,
    onReset: () => console.log('Dropdown___onReset'),
  }
  constructor(props) {
    super(props);
    this.state = {
      toggleList: false,
    };
    this.wrapper = React.createRef();
    this.handleClose = this.handleClose.bind(this);
  }
  handleClickOutside = event => {
    this.setState({
      toggleList: false,
    });
  }
  handleClose = () => {
    this.setState({
      toggleList: false,
    });
  }
  handleToggleList = (e) => {
    const { toggleList } = this.state;
    this.setState({
      toggleList: !toggleList,
    });
  }
  handleReset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onReset();
  }
  render() {
    const { icon, title, text, children, resetBtn, disabled, isloading } = this.props;
    const { toggleList } = this.state;
    return (
      <DropdownBox
        disabled={disabled}
        className="dropdown"
        onClick={this.handleToggleList}
      >
        <div className="wrapper" ref={this.wrapper}>
          <div className="left">
            {(title || icon) &&
              <div className="top-row">
                <div className="icon">
                  {icon}
                </div>
                <div className="title">{title}</div>
              </div>}
            <div className="bottom-row">{text}</div>
          </div>
          {isloading ? <LoadingIcon className="loadingIcon" /> : null}
          <div className="right">
            {resetBtn &&
              <ResetBtn onClick={() => console.log('reset')} />}
            {resetBtn && <span className="right-line" />}
            <DownBtn className={toggleList && !disabled ? 'to-up' : ''} onClick={this.handleToggleList} />
          </div>
          <List
            onClick={e => e.stopPropagation()}
            active={toggleList && !disabled}
          >
            <Clickoutside handleBlur={this.handleClickOutside}>
              {children}
            </Clickoutside>
          </List>
        </div>
      </DropdownBox>

    );
  }
}
