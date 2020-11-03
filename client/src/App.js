import React from 'react';
import { Provider } from 'react-redux';
import Routing from './router/index';
import store, { history } from './store/index';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
    <Provider store={store}>
      <BrowserRouter  history={history}>
        <Routing />
      </BrowserRouter>
    </Provider>
);

export default App;
