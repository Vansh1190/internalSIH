import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreProvider } from 'easy-peasy';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
<StoreProvider store={store}>
    <App />
  </StoreProvider>
);