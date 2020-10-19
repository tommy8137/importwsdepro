import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { checkAuth } from '~~utils/Auth';

// 檢查有沒有登入的token，有才可以繼續瀏覽，沒有就導回login
// state 可以記錄狀態
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      /* console.log('propsprops', props, rest); */
      return (
        checkAuth()
          ? <Component {...props} />
          : <Redirect
            to={{
              pathname: '/login',
              state: { fromPath: props.location }
            }}
          />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  // location: PropTypes.shape().isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string
  }),
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]).isRequired,
};

PrivateRoute.defaultProps = {
  component: null,
  location: {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: ''
  }
};

export default PrivateRoute;
