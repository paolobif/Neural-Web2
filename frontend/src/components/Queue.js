import React, { useState, useContext, useEffect } from 'react'
import { io } from "socket.io-client"
import { GlobalContext } from '../GlobalContext'

const style = {
  height: "100%",
  width: "100%",
  borderRadius: "0px",
  overflowY: "auto"
}

function Queue() {
  const globals = useContext(GlobalContext)
  const [socket, setSocket] = useState(null)

  const sendTest = () => {
    console.log("test sent")
    socket.on('message', () => {
      socket.emit('message', "hi!!")
    })
    

  }

  useEffect(() => {
    const newSocket = io(globals.host, {
      extraHeaders: {
        'Access-Control-Allow-Origin': "*"
      }
    })
    newSocket.on('connect', () => {newSocket.emit('my event', {data: 'Im connected!'})})
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  return (
    <div className="container p-0" >
      <div className="pt-3 main-color" style={style}>
        <div className="row">
          <div className="col p-0">
            <p className="result-header">Queue</p>
            <div style={{backgroundColor:"white", color:"green"}}>
              Test
            </div>
          </div>
          <div className="col p-0">
            <p className="result-header">Finished</p>
            <div style={{backgroundColor:"white", color:"red"}}>
              Test
              <button onclick={sendTest}>hi!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Queue
