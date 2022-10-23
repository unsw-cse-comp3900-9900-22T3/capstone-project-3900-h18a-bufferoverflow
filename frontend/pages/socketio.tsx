import { useEffect} from 'react'
import { io, Socket } from "socket.io-client";
let socket

export default () => {
  
  useEffect(() => {
    fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat`).finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('hello', data => {
        console.log('hello', data)
      })

      socket.on('a user connected', () => {
        console.log('a user connected')
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })
  }, [])

  return <h1>Hi</h1>
}