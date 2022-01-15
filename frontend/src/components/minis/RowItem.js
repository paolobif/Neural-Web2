import React, { useContext } from 'react'

function RowItem({ form }) {

  const processTypes = {
    1: "Annotations",
    2: "Annotations + Tracking",
    3: "Annotations + Tracking + Morphology"
  }

  return (
    <div className="container">
       <div className="row">
        <div className="col">
          Save Name:
        </div>
        <div className="col-8">
          <b>{form.name}</b>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col">
          Source:
        </div>
        <div className="col-8">
          <b>{form.source}</b>
        </div>
      </div>
      <div className="row">
        <div className="col">
          Videos:
        </div>
        <div className="col-8">
          <div className="d-flex flex-wrap">
            {form.selected.map(n => <div className="me-2">{n},</div>)}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          Pipeline:
        </div>
        <div className="col-8">
          {processTypes[form.params.type]}
        </div>
      </div>
      <div className="row">
        <div className="col">
          Weights:
        </div>
        <div className="col-8">
          {form.params.weights}
        </div>
      </div>
      <hr></hr>
      {/* <div className="row">
        <div className="col">
          Model Params:
        </div>
        <div className="col-8">
          {
            Object.keys(modelSet).map(val =>
              <div
                key={val}
                className="row">{val} : {modelSet[val] ? modelSet[val].toString() : "NA"}
              </div>
            )
          }
        </div>
      </div> */}
    </div>
  )
}

export default RowItem
