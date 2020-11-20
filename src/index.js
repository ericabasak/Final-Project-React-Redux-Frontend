import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import toDoAppReducer from './reducers/toDoAppReducer';
// import {
//   createStore,
//   applyMiddleware
// } from 'redux';
// import thunk from 'redux-thunk';

const store = createStore(toDoAppReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

