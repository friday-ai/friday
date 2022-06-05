import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import App from './components/App/App';
import store from './services/store/store';

import AppProvider from './services/AppProvider';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

registerSW();
