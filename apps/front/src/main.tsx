import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { domAnimation, LazyMotion } from 'framer-motion';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import './index.css';
import Root from './routes/Root';
import theme from './utils/theme';
import './utils/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const rootContainer = document.getElementById('root');

if (rootContainer !== null) {
  const root = createRoot(rootContainer);

  root.render(
    <React.StrictMode>
      <LazyMotion features={domAnimation}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </LazyMotion>
    </React.StrictMode>
  );

  registerSW();
}
