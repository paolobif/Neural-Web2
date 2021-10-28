import React from 'react'
import { BsFolder } from 'react-icons/bs'
import { AiOutlineFile } from 'react-icons/ai'

function File({ name, searchPath, setPath }) {
  const path = require('path')
  
  const openFolder = () => {
    console.log(searchPath, name)
    const isDirectory = checkPathType(name)
    const newPath = path.join(searchPath, name)
    if (isDirectory) {
      setPath(newPath)
    } else {
      alert('Please select a directory.')
    }
  }
  
  return (
    <div 
      className="m-1"
      style={{textAlign: "left"}}
      onClick={openFolder}>
        {checkPathType(name) ? 
          <BsFolder style={{marginBottom: "3px"}} /> :
          <AiOutlineFile style={{marginBottom: "4px"}} />} {name}
    </div>
  )
}
 
export default File


const checkPathType = (name) => {
  // Takes string path and then checks if the path is
  // a directory or a file.
  if (name.includes('.')) {
    return false
  } else {
    return true
  }
}
