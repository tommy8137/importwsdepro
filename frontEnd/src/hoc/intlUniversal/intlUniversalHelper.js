import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as intlUniversalActions from './intlUniversalActions';

export default function intlUniversalHelperHoc(WrappedComponent) {
  @connect(
    (state) => ({
      language: state.intl.language,
      initDone: state.intl.initDone
    }),
    (dispatch) => ({
      actions: bindActionCreators(intlUniversalActions, dispatch)
    })
  )
  class intlUniversalHelper extends Component {
    componentDidMount() {
      console.log('[intlUniversalHelper要近來]');
      // init 語系
      this.props.actions.initIntl();
    }

    componentWillUnmount() {
      console.log('[intlUniversalHelper要離開]');
    }

    // 切換語系
    switchIntl = (language) => {
      this.props.actions.switchIntl(language);
    }

    render() {
      // console.log('WrappedComponent.name', WrappedComponent.name);
      return (
        <WrappedComponent
          {...this.props}
          switchIntl={this.switchIntl}
          currentLang={this.props.language}
        />
      );
    }
  }

  // intlUniversalHelper.WrappedComponent.propTypes = {
  //   language: PropTypes.string.isRequired,
  //   intlUniversalActions: PropTypes.shape().isRequired
  // };


  return intlUniversalHelper;
}
