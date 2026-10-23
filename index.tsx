import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Use a named import for the App component as it is not exported as a default.
import { App } from './App';
import './styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Fix: Explicitly type App as React.FC in App.tsx to resolve the JSX component type error */}
    <App />
  </React.StrictMode>
);