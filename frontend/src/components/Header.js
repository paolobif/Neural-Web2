import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button} from "react-bootstrap";
import axios from 'axios';

import { GlobalContext } from '../GlobalContext';

const linkStyle = {
   color: "white",
  }


function Header({ setFiles }) {
  const path = require('path');
  const globals = useContext(GlobalContext)
  const [pathVal, setPathVal] = useState("")

  const handleChange = (e) => {
    setPathVal(e.target.value)
  }

  const fetchFiles = async() => {
    try {
      const endpoint = path.join('/api/folder/info/', pathVal)
      const apiPath = endpoint
      const response = await axios.get(apiPath)
      setFiles({...response.data, loaded:true})
    } catch (e) {
      alert(`check path...${e}`)
    }
  }

  return (
    <div className="App-header">
      <Link to="/" className="ms-4 nav-link" style={ linkStyle }>
        Worm-Neural
      </Link>
      <div className="path-input d-flex ms-3 me-3">
        <input className="form-control me-2"
                type="text"
                value= ""
                placeholder={ "~/path/to/" }
                aria-label="Search"
                value={ pathVal }
                onChange={ handleChange }>

        </input>
        <Button onClick={fetchFiles} className="btn-light me-2">Load</Button>
      </div>
      <Link to="/results" className="me-4 mb-3 nav-link align-self-end" style={ linkStyle }>
        Results
      </Link>

    </div>
  )
}

export default Header
