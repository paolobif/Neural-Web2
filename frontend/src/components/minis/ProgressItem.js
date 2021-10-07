import React, { useState, useEffect, useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { GlobalContext } from '../../GlobalContext'
import { TiDelete } from "react-icons/ti"
import axios from 'axios'

// List from item order: [pid, path, save, process, state, time]
// status is "info" or any other boostrap 5 styling.

function ProgressItem({ item, progress, status }) {
  const style = {
                  backgroundColor: "#282c3",//"#61dafb",
                  width: "95%",
                  borderRadius: "0px",
                  borderLeftRadius: "5px",
                  boxShadow: "5px 5px #61dafb" //#282c34",
                }
  
  const globals = useContext(GlobalContext)

  const deleteItem = async() => {
    const endpoint = `${globals.host}/api/queue/delete/${item[0]}`
    await axios.get(endpoint)
  }

  return (
    <div className="row p-2 mb-4" style={style} >
      <div>
        {
          status == "info" ?
          <h6 className="mb-0">PID: {item[0]} <TiDelete size={"1.4em"} style={{float: "right"}} onClick={deleteItem}/></h6> :
          <h6 className="mb-0">PID: {item[0]} </h6>
        }
        <p className="mb-1 ms-2">
          <i>from:</i> <b>{item[1]}</b>  <i>save:</i> <b>{item[2]}</b> <i>type:</i> <b>{item[3]}</b>
        </p>
        <ProgressBar striped variant={status} now={progress} label={`${progress}%`} className="ms-3"/> 
      </div>
    </div>
  )
}

export default ProgressItem
