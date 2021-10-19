import React, { useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';


function FileUpload() {
  const globals = useContext(GlobalContext)
  const [files, setFiles] = useState(null)
  const [destination, setDestination] = useState("videos")

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
    const path = `${globals.host}${endpoint}`

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

    const response = await axios.post(path, formData, { headers: headers })
  }

  // Upload files to the api endpoint.
  const uploadFiles = () => {
    for (let i=0; i < files['length']; i ++) {
      console.log(files[i].name)
      uploadOneFile(files[i])
    }
  }

  return (
    <div class="mt-3 pt-3">
      <h5>select files and destination</h5>
      <div class="mt-3">
        <input class="form-control" type="file" multiple="multiple" onChange={onFileChange} /> 
        {/* multiple="multiple" accept="video/*" */}
        <input class="form-control" list="datalistOptions" id="dirselect" placeholder="Destination" value="videos" onChange={onDestination} />
        <datalist id="datalistOptions">
          <option value="videos" />
          <option value ="" />
        </datalist>
        <Button
          className="mt-3"
          variant="info"
          onClick={uploadFiles}>Upload
        </Button>
      </div>
    </div>
  )
}

export default FileUpload
