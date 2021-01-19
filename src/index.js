import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import AppChess from './AppChess';
// import AppTest from './AppTest';
// import AppChessGame from './components2/AppChessGame';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppChess/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
