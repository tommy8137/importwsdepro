import 'normalize.css';
import 'antd/es/table/style/css';
import 'antd/es/tree/style/css';
import 'react-datetime/css/react-datetime.css'; // datetime picker CSS
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  // BrowserRouter as Router
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

// import { hot } from 'react-hot-loader';

import 'bootstrap/dist/css/bootstrap.css';


import { store, history } from '~~store';
import styled from 'styled-components';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';

import '~~styles/main.scss';
import Routes from './routes/routes';

const TextBox = styled.div`
  padding: .5rem 3rem;
  text-align: center;
  line-height: 1.5rem;
`;

const getConfirmDom = (msg, callback) => (
  <Alert isOpen={true}>
    <TextBox dangerouslySetInnerHTML={{ __html: msg }} />
    <div className="row">
      <Button color="transparentInModal" border={false} onClick={() => { callback(true); ReactDOM.unmountComponentAtNode(document.getElementById('router_confirm')); }}>CONFIRM</Button>
      <Button color="black" onClick={() => { callback(false); ReactDOM.unmountComponentAtNode(document.getElementById('router_confirm')); }}>BACK</Button>
    </div>
  </Alert>);

// hot-reload issue router 不能重新被產生 https://github.com/reactjs/react-router-redux/issues/364
const Root = () => {
  // 阻止轉頁的alert
  const getConfirmation = (message, callback) => {
    ReactDOM.render(getConfirmDom(message, callback), document.querySelector('#router_confirm'));
  };
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router getUserConfirmation={getConfirmation}>
          <Routes />
        </Router>
      </ConnectedRouter>
    </Provider>
  );
};

// hot(module)(App);

ReactDOM.render(<Root />, document.querySelector('#app'));
