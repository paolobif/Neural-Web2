import React, { useState, useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import { useHistory } from 'react-router'
import axios from 'axios'


function Login({ setLoggedIn }) {
  const history = useHistory()
  const globals = useContext(GlobalContext)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    sendLoginRequest()
    console.log('submit')
  }

  const sendLoginRequest = async() => {
    const endpoint = `${globals.host}/login`
    const data = {username: username, password: password}
    const headers = {
      'Access-Control-Allow-Origin': "*",
      'Content-Type': 'application/json'
    }
    try {
      const response = await axios.post(endpoint, data, { headers: headers })
      const token = response.data.access_token
      sessionStorage.setItem("token", token)
      setLoggedIn(true)
      history.push('/')
      console.log("Logged in successfuly!")
    } catch (err) {
      alert("Error: Invalid username or password.")
    }
  }
  

  return (
    <div className="main-color" style={{height: '100vh', backgroundColor: '#282c34'}}>
      <div className="m-4" id="login">
        <h3>Worm Neural</h3>
        <h5 className="mb-5">login</h5>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="username" className="form-control" onChange={(e) => setUsername(e.target.value)} />
            <div id="emailHelp" className="form-text">Default user is root.</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" value="update_state" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
