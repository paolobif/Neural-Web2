import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomeMain from './components/HomeMain'

function Home({ files }) {
  const [selected, setSelected] = useState([])

  return (
    <div className="Home-Page">

      <div className="">
        <div className="row no-gutters">
          <div className="col-5 col-sm-3">
            <div>
              <Sidebar files={files} selected={selected} setSelected={setSelected}/>
            </div>
          </div>
          <div className="col-md">
            <HomeMain selected={selected}/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home

