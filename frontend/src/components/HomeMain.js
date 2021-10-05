import React, {useState} from 'react'
import ProcessForm from './minis/ProcessForm'

function HomeMain({ selected, source }) {

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
    </div>
  )
}

export default HomeMain
