import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routing from './router/index';
import store, { history } from './store/index';

const App = () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routing />
      </ConnectedRouter>
    </Provider>
);

export default App;
