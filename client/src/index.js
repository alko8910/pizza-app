import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createStore } from 'redux';
import allReducers from './redux/index';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
