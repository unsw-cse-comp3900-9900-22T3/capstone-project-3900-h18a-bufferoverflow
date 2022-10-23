import { useEffect} from 'react'
import { io, Socket } from "socket.io-client";
let socket

export default () => {
  
  useEffect(() => {
    fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`).finally(() => {
      const socket = io(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`)

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello', 'test')
      })

      socket.on('response', data => {
        console.log('hello', data)
      })

    })
  }, [])

  return <h1>Hi</h1>
}