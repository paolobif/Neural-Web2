import React, { useState, useContext, useEffect } from 'react'
import { io } from "socket.io-client"
import { GlobalContext } from './GlobalContext'
import Sidebar from './components/Sidebar'
import HomeMain from './components/HomeMain'
import Queue from './components/Queue'


function Home({ files }) {
  const globals = useContext(GlobalContext)
  const [selected, setSelected] = useState([])
  const [socket, setSocket] = useState(null)
  const [data, setData] = useState({queue: [],
                                    done: [],
                                    working: [],
                                    progress: 0
                                  })

  useEffect(() => {
    const newSocket = io('/', {
      extraHeaders: {
        'Access-Control-Allow-Origin': "*"
      }
    })

    setSocket(newSocket)
    console.log('connected')
    newSocket.on('progress_data', (queue_info) => {setData(queue_info)})

    const pid = setInterval(() => newSocket.emit('progress_data', ''), 1000)
    return () => {
      clearInterval(pid)
      newSocket.close()
    }
  }, [setSocket])

  return (
    <div className="Home-Page">

      <div className="">
        <div className="row no-gutters">
          <div className="col-5 col-sm-3" style={{maxWidth: "23%"}}>
            <div>
              <Sidebar files={files} selected={selected} setSelected={setSelected}/>
            </div>
          </div>
          <div className="col-md">
            <HomeMain selected={selected} source={files.path}/>
            <Queue data={data} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home

