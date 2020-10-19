import React, { Component, PureComponent } from 'react';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import NotificationSystemHelper from '~~hoc/NotificationSystem/NotificationSystemHelper';
import Loader from '~~elements/Loader';
import AppConfig from '~~config';
import FAVICON from '~~static/images/ico_favicon.png';

const SUPPOER_LOCALES = [
  {
    name: 'English',
    value: 'en-US'
  },
  {
    name: '简体中文',
    value: 'zh-CN'
  },
  {
    name: '繁體中文',
    value: 'zh-TW'
  },
];

// @intlUniversalHelper
@NotificationSystemHelper
@connect(
  (state) => {
    return {
      isOnLoading: state.loading.isOnLoading
    };
  },
  {}
)
class App extends Component {
  onSelectLocale = (e) => {
    let lang = e.target.value;
    console.log('語言想要換成', lang, this.props);
    this.props.switchIntl(lang);
  }

  renderLocaleSelector() {
    return (
      <select onChange={this.onSelectLocale} defaultValue="">
        <option value="" disabled>Change Language</option>
        {SUPPOER_LOCALES.map(locale => (
          <option key={locale.value} value={locale.value}>{locale.name}</option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <div data-version={AppConfig.version}>
        <Loader isLoading={this.props.isOnLoading} />
        <Helmet>
          <title>e-Procurement</title>
          <link rel="shortcut icon" type="image/x-icon" href={FAVICON} />
        </Helmet>
        <div>{this.props.children}</div>
      </div>
    );
  }
}


// export default withRouter(App);
export default App;
