import React, { useState, useContext, useEffect } from 'react'
import { io } from "socket.io-client"
import ProcessForm from './minis/ProcessForm'
import { GlobalContext } from '../GlobalContext'


function HomeMain({ selected, source }) {
  const globals = useContext(GlobalContext)
  const [socket, setSocket] = useState(null)

  const sendTest = () => {
    console.log("test sent")
    socket.on('message', () => {'test222'})
    socket.emit('message', "hi!!")

  }

  useEffect(() => {
    const newSocket = io("http://10.0.0.243:5000", {
      extraHeaders: {
        'Access-Control-Allow-Origin': "*"
      }
    })
    setSocket(newSocket)
    newSocket.on('message', () => {console.log('sent')})
    return () => newSocket.close()
  }, [setSocket])

  return (
    <div className="d-flex justify-content-between">
      <div style={{flexGrow: 1}}>
        <ProcessForm selected={selected} source={source}/>
      </div>
      <div className="selected-files mt-2">
        <div className="pt-3 ps-3 text-start">
          Selected Files:
        </div>
        <hr className="m-1" style={{height: "3px", backgroundColor:"white"}}></hr>
        <div className="text-start p-0 ps-4" style={{overflowY: "scroll", maxHeight:"200px"}}>
          {selected.map(file => <p className="p-0 mb-2">{file}</p>)}
        </div>
      </div>
      <button className="btn-primary" onClick={sendTest}>Test Socket</button>
    </div>
  )
}

export default HomeMain
