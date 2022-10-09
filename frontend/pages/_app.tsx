import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from 'react';
import { StoreProvider } from '../store/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const firebaseConfig = {
  apiKey: "AIzaSyCb1VDjfWT3SjzvLXYr1cPIY-9LmiPtgNw",
  authDomain: "capstone-project-3900.firebaseapp.com",
  projectId: "capstone-project-3900",
  storageBucket: "capstone-project-3900.appspot.com",
  messagingSenderId: "170406441967",
  appId: "1:170406441967:web:50e7f227c623a2fa12fc1a",
  measurementId: "G-FLJ5F8PLY6"
};

const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => { getAnalytics(initializeApp(firebaseConfig)) }, [])
  return (
    <StoreProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </StoreProvider>
  )
}

export default MyApp
