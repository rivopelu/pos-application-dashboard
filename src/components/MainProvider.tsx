import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { ThemeProvider } from '@mui/material';
import themeConfig from '../config/theme-config.ts';
import { Provider } from 'react-redux';
import store from '../redux/store.ts';

export function MainProvider(props: IProps) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <NuqsAdapter>
          <ThemeProvider theme={themeConfig}>
            <Provider store={store}>{props.children}</Provider>
          </ThemeProvider>
        </NuqsAdapter>
      </BrowserRouter>
    </React.StrictMode>
  );
}

interface IProps {
  children: ReactNode;
}