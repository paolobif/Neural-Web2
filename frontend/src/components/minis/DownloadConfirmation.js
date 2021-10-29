import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'

function DownloadConfirmation({ show, setShow, path, download}) {
  const globals = useContext(GlobalContext)
  const handleClose = () => setShow(false);
  

  const extractSaveName = (path) => {
    // Gets directory name from path.
    const splitPath = path.split('/')
    splitPath.reverse()
    let saveName = splitPath[0]
    if (!saveName) {
      saveName = 'results'
    }
    return saveName
  }


  // const test = 'http://10.0.0.243:5000/api/results/available?dl=1?dir=test100'

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Download</Modal.Title>
        </Modal.Header>
        <Modal.Body back style={{backgroundColor: "#EEEEEE"}}>
          <h5>Downloading:</h5>
          <h6>results/{path}</h6>
          <h5>Save as:</h5>
          <h6>{extractSaveName(path)}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose} href={download}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DownloadConfirmation
