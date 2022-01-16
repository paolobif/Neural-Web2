import React, { useState } from 'react'
import ProcessConfirmation from './ProcessConfirmation'
import TrackingSettings from './TrackingSettings'

function ProcessForm({ selected, source }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({name: "", type: ""});
  const [circle, setCircle] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault()
    if (selected.length > 0) {
      const processType = e.target.gridRadios.value

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

      const modelParams = {
        type: processType,
        weights: e.target.weights.value
      }

      const saveName =  e.target[0].value

      setForm({name: saveName,
               selected: selected,
               source: source,
               tracking: trackingParams,
               params: modelParams,
               process: processType})
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

        <div className="form-check mt-2">
          <label className="form-check-label" htmlFor="circle">
            Circle Crop
          </label>
          <input className="form-check-input" type="checkbox" value="" id="circle" />
        </div>

        <div className='row mt-3 b-2' >
          <label htmlFor="weights" className="col-sm-2 col-form-label">Weights</label>
          <select id="weights" class="form-select" style={{maxWidth: "500px"}}>
            <optgroup label="Model Weights">
              <option value="416_1_4_full_best200ep.pt">416_1_4_full_best200ep.pt</option>
              <option value="GMC101_10_13_21_best100ep.pt">GMC101_10_13_21_best100ep.pt</option>
            </optgroup>
          </select>
        </div>

        <hr className='mt-4 mb-4'></hr>

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
