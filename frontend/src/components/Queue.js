import React, { useState, useContext, useEffect } from 'react'
import { io } from "socket.io-client"
import { GlobalContext } from '../GlobalContext'
import Working from './minis/Working'
import QueueDone from './minis/QueueDone'

const style = {
  height: "100%",
  width: "100%",
  borderRadius: "0px",
  overflowY: "auto"
}

function Queue() {
  const globals = useContext(GlobalContext)
  const [socket, setSocket] = useState(null)
  const [data, setData] = useState({queue: [],
                                    done: [],
                                    working: [],
                                    progress: 0
                                  })


  useEffect(() => {
    const newSocket = io(globals.host, {
      extraHeaders: {
        'Access-Control-Allow-Origin': "*"
      }
    })
    
    setSocket(newSocket)
    console.log('connected')
    newSocket.on('progress_data', (queue_info) => {setData(queue_info)})

    const pid = setInterval(() => newSocket.emit('progress_data', ''), 200)
    return () => {
      clearInterval(pid)
      newSocket.close()
    }
  }, [setSocket])

  return (
    <div className="container ms-1 ps-4 pe-4 pt-0" >
      <div className="" style={style}>
        <div className="row">
          <div className="col p-0">
            <h5>Queue</h5>
            <div className="mt-4">
              <Working working={data.working} progress={data.progress} />
              <QueueDone items={data} status="info" />
            </div>
          </div>
          <div className="col p-0">
            <h5>Finished</h5>
            <div style={{color:"red"}}>
              Test
              {data ?
                data.progress :
                null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Queue
