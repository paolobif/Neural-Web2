import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import SidebarItem from './minis/SidebarItem'

function Sidebar({ files, selected, setSelected }) {
  const [all, setAll] = useState(true)

  const updateSelected = () => {
    if (all) {
      setSelected(files.names)
    } else {
      setSelected([])
    }
    setAll(!all)
  }
  

  const displayFiles = () => {
    if (files.loaded) {
      const names = files.names
      return (
        <>
          {names.map(name => <SidebarItem filename={name} selected={selected} setSelected={setSelected} key={name}/>)}
        </> 
      )
    } else {
      return (<></>)
    }
  }

  return (
    <div className="main-color fs-7 mt-2">
      <div className="d-flex p-3 justify-content-between align-items-end">
        files :
        <Button size="sm" 
          variant="dark" 
          style={{color: "#282c34", backgroundColor: "#5bc0de", border:"None"}}
          onClick={updateSelected}
          disabled={files.loaded ? false : true}>
          {all ? "select all" : "deselect all"}
        </Button>
      </div>
      <hr className="m-1" style={{height: "3px", backgroundColor:"white"}}></hr>
      <div className="file-list mb-2">
        {displayFiles()}
      </div>
    </div>
  )

}

export default Sidebar
