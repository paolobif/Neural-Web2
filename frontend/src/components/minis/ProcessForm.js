import React, { useState } from 'react'
import ProcessConfirmation from './ProcessConfirmation'
import TrackingSettings from './TrackingSettings'

function ProcessForm({ selected, source }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({name: "", type: ""});


  const submitHandler = (e) => {
    e.preventDefault()
    if (selected.length > 0) {
      const trackingParams = {
        threshold: e.target.thresholdVal.value,
        max_age: e.target.maxAgeVal.value,
        min_hits: e.target.minHitsVal.value,
        iou_threshold: e.target.iouThreshVal.value,
        start_age: e.target.startAgeVal.value,
        framerate: e.target.framerateVal.value,
        slow_move: e.target.slowMoveVal.value,
        delta_overlap: e.target.deltaOverlapVal.value
      }
      console.log(trackingParams)
      const saveName =  e.target[0].value
      const processType = e.target.gridRadios.value
      setForm({name: saveName, type: processType, selected:selected, source:source, tracking:trackingParams})
      setShow(true)
    }
  }

  return (
    <div className="m-3 p-3 form-box">
      <h5>Process Experiment</h5>
      <hr></hr>
      <form onSubmit={submitHandler} className="text-start">
        <div className="row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" placeholder="output folder name" pattern="^\S+$" required></input>
          </div>
        </div>
        <div className="row mt-2">
          <legend className="col-form-label col-sm-2 pt-0">Pipeline</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="1" required></input>
              <label className="form-check-label" htmlFor="gridRadios1">
                Annotations
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="2"></input>
              <label className="form-check-label" htmlFor="gridRadios2">
                Annotations + Tracking
              </label>
            </div>
            <div className="form-check disabled">
              <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="3"></input>
              <label className="form-check-label" htmlFor="gridRadios3">
                Annotations + Tracking + Morphology
              </label>
            </div>
          </div>
        </div>
        <TrackingSettings />
        <div className="row m-4">
          <button
            type="submit"
            className="btn btn-info"
            data-toggle="modal"
            data-target="#exampleModal">
            Submit
          </button>
        </div>
      </form>
      <ProcessConfirmation show={show} setShow={setShow} form={form} />
    </div>
  )
}

export default ProcessForm
