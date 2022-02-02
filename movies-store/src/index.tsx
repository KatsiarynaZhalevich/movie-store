import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import { compose, createStore } from 'redux';

const AppContainer = (): JSX.Element => {
  const store = createStore(
    reducer,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
ReactDOM.render(<AppContainer />, document.getElementById('root'));
