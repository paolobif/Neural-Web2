import React from 'react'

const style = {
  height: "100%",
  width: "100%",
  borderRadius: "0px",
  overflowY: "auto"
}

function Queue() {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Queue
