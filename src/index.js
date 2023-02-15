import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import { App } from './pages/App/App';
import { Login } from './pages/Login/Login';

import './assets/scss/_base_.scss';
import './assets/fonts/font.scss';
import { SignUp } from './pages/SignUp/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/app' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
