import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App.jsx';
//<BrowserRouter> is the top-level React Router component that makes React Router work.
//Only a signle <BrowserRouter> needs to be rendered and any components that need to use
//routing features must be nested within it, thus the convention is to wrapt the <App> component
import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <App />
  </Router>
  </React.StrictMode>
);
