import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Gotta check the index.html and make sure id=root');
}
const root = createRoot(container);
root.render(<App />);
