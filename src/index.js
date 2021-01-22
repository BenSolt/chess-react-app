import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// import AppChess1 from './AppChess';
// import AppTest from './AppTest';

// Test to create Queen
// import AppGameCreate from './AppGameCreate';

// has Green dots
import AppChess3 from './AppGame3';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppChess3/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
