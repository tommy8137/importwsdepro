import intl from 'react-intl-universal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '~~features/Auth/AuthActions';

export default function idleDetectHelper(WrappedComponent) {
  @connect(
    state => ({}),
    dispatch => ({
      actions: bindActionCreators({ logout }, dispatch)
    }),
  )
  class idleDetectHelper extends Component {
    state = {
      timeout: 1000 * 60 * 15,
      idle: false,
      events: ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    }

    componentDidMount() {
      this.attachEvents();
      this.setTimeout();
      window.addEventListener('beforeunload', this.handleWindowClose);
    }

    componentWillUnmount() {
      // console.log('有人離開了');
      clearTimeout(this.timeoutId);
      this.removeEvents();
      window.removeEventListener('beforeunload', this.handleWindowClose);
    }

    setTimeout() {
      this.timeoutId = setTimeout(() => {
        this.handleChange(true);
        // console.log('時間到');
        this.props.actions.logout();
      }, this.state.timeout);
    }

    handleWindowClose = (event) => {
      // console.log('我來了！！！！', event);
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return true;
    }

    // 加入監聽事件的動作
    attachEvents() {
      this.state.events.forEach(event => {
        window.addEventListener(event, this.handleEvent, true);
      });
    }

    // 移除監聽事件的動作
    removeEvents() {
      this.state.events.forEach(event => {
        window.removeEventListener(event, this.handleEvent, true);
      });
    }

    handleChange(idle) {
      this.setState({ idle });
    }

    handleEvent = () => {
      // 如果是idle的狀態，就改成不idle
      if (this.state.idle) {
        this.handleChange(false);
      }
      // console.log('延長時間(計時器歸零, 重新放一個計時器)');
      // 計時器歸零
      clearTimeout(this.timeoutId);
      // 重新放一個計時器
      this.setTimeout();
    }

    timeoutId = null;

    render() {
      // console.log('!!!...this.props', this.state);
      // console.log('!!!...this.state', this.state);
      return (
        <WrappedComponent
          {...this.props}
          idle={this.state.idle}
        />
      );
    }
  }

  // idleDetectHelper.WrappedComponent.propTypes = {
  //   language: PropTypes.string.isRequired,
  //   intlUniversalActions: PropTypes.shape().isRequired
  // };


  return idleDetectHelper;
}
