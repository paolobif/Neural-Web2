import React, {useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import RowItem from './RowItem'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'

function ProcessConfirmation({ show, setShow, form }) {
  const globals = useContext(GlobalContext)

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  /**
   * Sends post request to API with process request.
   * If there is an error will not add item to the queue and
   * returns error.
   */
  const handleConfirm = async() => {
    // Add process to queue.
    try {
      // handle request
      const data = {form:form}
      const headers = {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`
      }
      const response = await axios.post(`/api/queue/append`, data, { headers: headers })
      handleClose()
    } catch(e) {
      alert("Error adding item to the queue... check you are logged in.")
      console.log(e)
    }
    setShow(false)
  }


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Process</Modal.Title>
        </Modal.Header>
        <Modal.Body back="true" style={{backgroundColor: "#EEEEEE"}}>
          <RowItem form={form} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default ProcessConfirmation
