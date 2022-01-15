import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../GlobalContext'
import axios from 'axios'
import File from './minis/File';
import DownloadConfirmation from './minis/DownloadConfirmation';


function ResultFiles() {
  const path = require('path');
  const globals = useContext(GlobalContext)
  const [searchPath, setPath] = useState('')
  const [files, setFiles] = useState(null)
  const [show, setShow] = useState(false)
  const [download, setDownload] = useState(null)


  const fetchResultFiles = async() => {
    let endpoint = '/api/results/available'
    // endpoint = `${globals.host}${endpoint}`

    const params = `?dir=${searchPath}`

    endpoint= endpoint + params
    console.log(endpoint)
    const response = await axios.get(endpoint)
    console.log(response.data.results)
    setFiles(response.data.results)
  }

  const updateEndpoint = () => {
    let endpoint = '/api/results/available'
    // endpoint = `${globals.host}${endpoint}`
    const params = `?dl=1&dir=${searchPath}`  //Sets download param.
    endpoint = endpoint + params
    setDownload(endpoint)
  }

  useEffect(() => {
    fetchResultFiles()
    updateEndpoint()
  }, [searchPath])


  return (
    <div className="p-3 d-flex justify-content-around" style={{color: "white"}}>
      <div>
        <h3 onClick={() => setPath('')}>Results</h3>
        <hr></hr>
        <h6 className="text-start">{searchPath ? searchPath : null}</h6>
        <div className='result-list'>
          {files ?
            files.map(name => <File
              name={name}
              setPath={setPath}
              searchPath={searchPath}/>)
              : console.log("none")
          }
        </div>
        <button
          className="btn btn-info mt-2 btn-sm"
          onClick={() => setShow(true)}
          style={{float:"left"}}>
          Download
        </button>
        <DownloadConfirmation
          show={show}
          setShow={setShow}
          path={searchPath}
          download={download} />
      </div>

      <div>
        <h3>Browse Files</h3>
      </div>
    </div>
  )
}

export default ResultFiles
