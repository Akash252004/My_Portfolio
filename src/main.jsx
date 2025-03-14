import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'
import theme from './styles/theme'

const root = document.getElementById('root');

try {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  root.innerHTML = `
    <div style="
      padding: 2rem;
      text-align: center;
      color: #ff4444;
      font-family: Arial, sans-serif;
    ">
      <h1>Something went wrong</h1>
      <p>${error.message}</p>
      <button onclick="window.location.reload()" style="
        padding: 0.5rem 1rem;
        margin-top: 1rem;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">
        Reload Page
      </button>
    </div>
  `;
} 