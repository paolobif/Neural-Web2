import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';


function FileUpload() {
  const globals = useContext(GlobalContext)
  const [files, setFiles] = useState(null)
  const [destination, setDestination] = useState("videos")
  const [isUploading, setIsUploading] = useState(false)
  const [progessData, setProgressData] = useState(0)
  const [currentFile, setCurrentFile] = useState("")

  // Updates the files that are selected.
  const onFileChange = (event) => {
    setFiles(event.target.files)
    console.log(event.target.files[1])
    console.log(event.target.files['length'])
  }

  // Updates the targeted destination.
  const onDestination = (event) => {
    setDestination(event.target.value)
  }

  // Handles singular file upload.
  const uploadOneFile = async (file) => {
    const endpoint = "/api/files/upload"
    const path = endpoint

    const headers = {
      'Access-Control-Allow-Origin': "*",
      'Content-Type': 'multipart/form-data'
      // 'Content-Type': `multipart/${files.type}`
    }

    const formData = new FormData()
    formData.append("img", file)
    formData.append("name", file.name)
    console.log(file.name)
    formData.append("dest", destination)

    const response = await axios.post(path, formData, {
      headers: headers,
      onUploadProgress: (progressEvent) => {
        // Modifies state
        setCurrentFile(file.name)
        setIsUploading(true)
        // Gets total length
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
        console.log("onUploadProgress", totalLength);
        if (totalLength !== null) {
					setProgressData( Math.round( (progressEvent.loaded * 100) / totalLength) );
        }
      }
    })
    setIsUploading(false)
  }

  // Upload files to the api endpoint.
  const uploadFiles = () => {
    setIsUploading(true)
    for (let i=0; i < files['length']; i ++) {
      console.log(files[i].name)
      uploadOneFile(files[i])
    }
    setIsUploading(false)
    // setCurrentFile("")
  }

  return (
    <div class="mt-3 pt-3">
      <h5>select files and destination</h5>
      <div class="mt-3">
        <input class="form-control" type="file" multiple="multiple" onChange={onFileChange} />
        {/* multiple="multiple" accept="video/*" */}
        <input
          class="form-control"
          list="datalistOptions"
          id="dirselect"
          placeholder="Destination"
          value={destination}
          onChange={onDestination}
        />
        <datalist id="datalistOptions">
          <option value="videos" />
          <option value ="test" />
        </datalist>
        <div class="mt-2">
          <ProgressBar
            className="mt-2"
            variant="info"
            now={progessData}
            label={`${currentFile}`}
          />
        </div>
        <Button
          disabled={isUploading? true : false}
          className="mt-3"
          variant="info"
          onClick={uploadFiles}>Upload
        </Button>
      </div>
    </div>
  )
}

export default FileUpload
