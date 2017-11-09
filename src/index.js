import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Main from './store/store';

console.log('THIS IS THE ROOT ELEMENT');
ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
