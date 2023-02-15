import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PageProvider } from './contexts/Page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PageProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PageProvider>
);
