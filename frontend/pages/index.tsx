import type { NextPage } from 'next'
import { useEffect} from 'react'
import { io } from "socket.io-client";
let socket

import { useStore } from '../store/store'
import Landing from './feed/landing';
import RecommendedFeed from './feed/recommended'

const Home: NextPage = () => {
  const { auth } = useStore();

  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io("");
    
    socket.on("connect", () => {
      console.log("connected");
    });
  };


  return (<>{auth ? <RecommendedFeed /> : <Landing />}</>)
}

export default Home
