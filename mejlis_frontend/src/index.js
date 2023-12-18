import React from 'react' ;
import ReactDOM from 'react-dom/client';
//import {createRoot} from 'react-dom/client' ;
import {BrowserRouter as Router} from 'react-router-dom' ;

import App from './App' ;
import './index.css' ;

/* ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
); */
//import reportWebVitals from "web-vitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

//reportWebVitals();