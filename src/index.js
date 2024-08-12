import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes> 
        <Route path="/" element={<App />} /> 
        <Route path="/admin" element={<App isAdmin/>} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
