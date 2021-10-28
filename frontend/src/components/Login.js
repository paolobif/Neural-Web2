import React from 'react'

function Login() {
  return (
    <div className="m-4" id="login">
      <h1>Neural Dash</h1>
      <h3 className="mb-2 text-end">login</h3>
      <form action='/' method="post">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input type="username" className="form-control" id="username" name="username" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">Default user is root.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" />
        </div>
        <button type="submit" value="update_state" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
