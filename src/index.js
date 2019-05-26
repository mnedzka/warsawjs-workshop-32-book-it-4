import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import App from './commons/components/App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

store.dispatch({
  type: 'REDUX_INIT',
  text: 'Welcome in BOOKit app from REDUX',
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
