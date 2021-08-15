import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.hydrate(
  <App initialContests={window.data.contests} />,
  document.getElementById('root')
);
