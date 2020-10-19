import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '~~features/App/Header';

// 檢查有沒有登入的token，有才可以繼續瀏覽，沒有就導回login
// state 可以記錄狀態
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // console.log('[PublicRoute]propsprops', props);
      // console.log('[PublicRoute]rest', rest);
      if (rest.withHeader) {
        return (
          <div>
            <Header />
            <Component {...props} {...rest} />
          </div>
        );
      }
      return (
        <Component {...props} {...rest} />
      );
    }}
  />
);

PublicRoute.propTypes = {
  // location: PropTypes.shape().isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string
  }),
  component: PropTypes.func.isRequired
};

PublicRoute.defaultProps = {
  location: {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: ''
  }
};

export default PublicRoute;
