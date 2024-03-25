import NiceModal from '@ebay/nice-modal-react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import './index.css';
import router from './routes/router';
import './utils/i18n';
import theme from './utils/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
  },
});

const rootContainer = document.getElementById('root');

if (rootContainer !== null) {
  const root = createRoot(rootContainer);

  root.render(
    <StrictMode>
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
    </StrictMode>,
  );

  registerSW();
}
