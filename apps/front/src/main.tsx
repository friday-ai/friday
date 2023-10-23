import NiceModal from '@ebay/nice-modal-react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { domAnimation, LazyMotion } from 'framer-motion';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import './index.css';
import './utils/i18n';
import theme from './utils/theme';
import router from './routes/router';

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
            <NiceModal.Provider>
              <CssBaseline />
              <RouterProvider router={router} />
            </NiceModal.Provider>
          </ThemeProvider>
        </QueryClientProvider>
      </LazyMotion>
    </React.StrictMode>
  );

  registerSW();
}
