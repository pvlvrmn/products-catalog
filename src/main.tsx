import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import './App.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import {ThemeProvider} from '@gravity-ui/uikit';
import {configure} from '@gravity-ui/uikit';
import App from './App.tsx'
import store from './slices/index.ts';

configure({
  lang: 'ru',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme='dark'>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
)
