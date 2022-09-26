import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Main } from './pages/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './pages/test';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ResetPassword } from './pages/reset-password';
import { Upload } from './pages/upload';
import { Provider } from 'react-redux';
import { store } from './store/store';

const firebaseConfig = {
  apiKey: "AIzaSyCb1VDjfWT3SjzvLXYr1cPIY-9LmiPtgNw",
  authDomain: "capstone-project-3900.firebaseapp.com",
  projectId: "capstone-project-3900",
  storageBucket: "capstone-project-3900.appspot.com",
  messagingSenderId: "170406441967",
  appId: "1:170406441967:web:50e7f227c623a2fa12fc1a",
  measurementId: "G-FLJ5F8PLY6"
};

getAnalytics(initializeApp(firebaseConfig))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<Main />} />
            <Route path="register" element={<Register />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="test" element={<Test />} />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
