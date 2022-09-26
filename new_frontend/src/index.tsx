import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Main } from './pages/main';

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
