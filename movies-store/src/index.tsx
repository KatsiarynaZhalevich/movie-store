import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
const AppContainer = (): JSX.Element => {
  return (
    // <Provider store={this.store}>
    <App />
    // </Provider>
  );
};
ReactDOM.render(<AppContainer />, document.getElementById('root'));
