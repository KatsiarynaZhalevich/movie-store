import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
const AppContainer = (): JSX.Element => {
  console.log('1');
  return (
    // <Provider store={this.store}>
    <App />
    // </Provider>
  );
};
ReactDOM.render(<AppContainer />, document.getElementById('root'));
