import React, { useState, useContext } from 'react'
import Sidebar from './components/Sidebar'
import HomeMain from './components/HomeMain'
import Queue from './components/Queue'


function Home({ files }) {
  const [selected, setSelected] = useState([])

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
            <Queue />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home

