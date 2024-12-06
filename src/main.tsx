import './config/i18n.config.ts';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import themeConfig from './config/theme-config.ts';
import store from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NuqsAdapter>
        <ThemeProvider theme={themeConfig}>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </NuqsAdapter>
    </BrowserRouter>
  </React.StrictMode>,
);
