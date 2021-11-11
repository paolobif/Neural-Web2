import React from 'react'

function TrackingSettings() {
  return (
    <div className="mt-2">
      <h6>Tacking Settings</h6>
      <div className="tracking-form">
        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="threshold">Threshold</span>
            <input type="number" class="form-control" id="thresholdVal" placeholder="30" value="30"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="maxAge">Max Age</span>
            <input type="number" class="form-control" id="maxAgeVal" placeholder="10" value="10"/>
          </div>
        </div>
        
        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="MinHits">Min Hits</span>
            <input type="number" class="form-control track-box" id="minHitsVal" placeholder="3" value="3"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="iouThresh">IOU Threshold</span>
            <input type="number" class="form-control" id="iouThreshVal" placeholder="0.3" value="0.3"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="startAge">Start Age</span>
            <input type="number" class="form-control" id="startAgeVal" placeholder="0" value="0"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="framerate">Framerate</span>
            <input type="number" class="form-control" id="framerateVal" placeholder="144" value="144"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="slowMove">Slow Move</span>
            <input type="number" class="form-control" id="slowMoveVal" placeholder="5" value="5"/>
          </div>
        </div>

        <div className="track-box">
          <div className="input-group input-grou-sm m-1">
            <span class="input-group-text" id="deltaOverlap">Delta Overlap</span>
            <input type="number" class="form-control" id="deltaOverlapVal" placeholder="0.8" value="0.8"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingSettings
