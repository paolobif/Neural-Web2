import React from 'react'

function TrackingSettings() {
  return (
    <div className="mt-2">
      <h6>Tacking Settings</h6>
      <div className="tracking-form">
        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="threshold">Threshold</span>
            <input type="number" className="form-control" id="thresholdVal" placeholder="30" defaultValue="30"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="maxAge">Max Age</span>
            <input type="number" className="form-control" id="maxAgeVal" placeholder="10" defaultValue="10"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="MinHits">Min Hits</span>
            <input type="number" className="form-control track-box" id="minHitsVal" defaultValue="3"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="iouThresh">IOU Threshold</span>
            <input type="number" className="form-control" id="iouThreshVal" defaultValue="0.3"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="startAge">Start Age</span>
            <input type="number" className="form-control" id="startAgeVal" defaultValue="0"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="framerate">Framerate</span>
            <input type="number" className="form-control" id="framerateVal" defaultValue="144"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="slowMove">Slow Move</span>
            <input type="number" className="form-control" id="slowMoveVal" defaultValue="5"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span className="input-group-text" id="deltaOverlap">Delta Overlap</span>
            <input type="number" className="form-control" id="deltaOverlapVal" defaultValue="0.8"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingSettings
