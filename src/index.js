import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const BACKEND_URL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
