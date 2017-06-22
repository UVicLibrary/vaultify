import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './css/index.css';
import './css/App.css';

import configureStore from './store/configureStore'
import routes from './routes.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const store = configureStore();                   

class App extends React.Component {
  render() {
    return routes;
  }
}

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.getElementById('root')
);


