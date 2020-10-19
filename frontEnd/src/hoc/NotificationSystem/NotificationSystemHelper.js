import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NotificationSystemActions from './NotificationSystemActions';

const notificationStyle = {
  Containers: {
    tc: {
      top: '100px',
    },
  },
  NotificationItem: {
    DefaultStyle: {
      position: 'relative',
      width: '31rem', // 496px
      height: '15rem', // 240px
      borderRadius: '4px',
      backdropFilter: 'blur(36px)',
      boxShadow: '0 3px 20px 0 rgba(0, 0, 0, 0.38)',
      border: 'solid 1px #1e1e1e',
      backgroundColor: '#333333',
      color: '#fff'
    },
  },
  Title: {
    DefaultStyle: {
      position: 'absolute',
      top: '-15%',
      left: 'calc((100% - 5.87rem) / 2)',
    }
  },
  MessageWrapper: {
    DefaultStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      fontSize: '1rem',
      wordBreak: 'break-all',
      overflowY: 'auto',
      whiteSpace: 'pre-line',
      textAlign: 'center',
    }
  },
  Dismiss: {
    DefaultStyle: {
      display: 'none'
    },
  }
};

export default function notificationSystemHelper(WrappedComponent) {
  @connect(
    (state) => ({
      notifications: state.notificationSystem.notifications,
    }),
    (dispatch) => ({
      notificationHelperActions: bindActionCreators(NotificationSystemActions, dispatch)
    })
  )
  class NotificationSystemHelperHoc extends Component {
    constructor(props) {
      super(props);
      this._notificationSystem = null;
    }

    componentDidMount() {
      this._notificationSystem = this.notificationSystemRef;
    }

    componentWillReceiveProps(nextProps) {
      const { notifications } = nextProps;
      const notificationIds = notifications.map(notification => notification.uid);
      if (notifications.length > 0) {
        notifications.forEach(notification => {
          this.notificationSystemRef.addNotification({
            ...notification,
            onRemove: () => {
              this.notificationSystemRef.removeNotification(notification.uid);
              this.props.notificationHelperActions.popNotification(notification.uid);
              // return notification.onRemove && notification.onRemove();
            }
          });
        });
      }
    }

    render() {
      return (
        <div className="e2e_notification">
          <WrappedComponent
            {...this.props}
          />
          <NotificationSystem ref={(ref) => { this.notificationSystemRef = ref; }} style={notificationStyle} />
        </div>
      );
    }
  }

  // NotificationSystemHelperHoc.WrappedComponent.propTypes = {
  //   language: PropTypes.string.isRequired,
  //   intlUniversalActions: PropTypes.shape().isRequired
  // };


  return NotificationSystemHelperHoc;
}
