import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route , Switch} from "react-router-dom"
import './index.css';
import App from './App';

ReactDOM.render(
  <Router>
    <Route key='others' path="/:tag" component={props => <App {...props} />} />
    <Route key="main" path="/" component={App} exact />
  </Router>,
  document.getElementById("root")
);


