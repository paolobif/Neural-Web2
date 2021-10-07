import React, { useState, useContext, useEffect } from 'react'
import Working from './minis/Working'
import QueueDone from './minis/QueueDone'

const style = {
  height: "100%",
  width: "100%",
  borderRadius: "0px",
  overflowY: "auto"
}

function Queue({ data }) {

  return (
    <div className="container ms-1 ps-4 pe-4 pt-0" >
      <div className="" style={style}>
        <div className="row">
          <div className="col p-0">
            <h5>Queue</h5>
            <div className="mt-4">
              <Working working={data.working} progress={data.progress} />
              <QueueDone items={data.queue} status="info" />
            </div>
          </div>
          <div className="col p-0">
            <h5>Finished</h5>
            <div className="mt-4">
              <QueueDone items={data.done} status="warning" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Queue
