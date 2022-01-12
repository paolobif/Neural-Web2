import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalContext } from "./GlobalContext"
import { FileContext } from "./FileContext"
import Header from './components/Header';
import Home from "./Home";
import Results from "./Results";
import Login from "./Login";
import Permissioned from "./Permissioned";

import './App.css';


const globalsDefault = {
  host: "http://localhost:5000"
}


function App() {
  const [files, setFiles] = useState({names: "", source: "", loaded: false})
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Router>
      <GlobalContext.Provider value={ globalsDefault }>

        <div className="App">
          <Switch>

            <Route exact path="/login">
              {
                loggedIn ?
                <Login setLoggedIn={setLoggedIn}/> :
                <><Header setFiles={setFiles} /><Home files={files} /></>
              }
            </Route>

            <Route exact path="/">
              {
                loggedIn ?
                <><Header setFiles={setFiles} /><Home files={files} /></> :
                <Login setLoggedIn={setLoggedIn}/>
              }
            </Route>

            <Route exact path="/results">
              {
                loggedIn ?
                <><Header setFiles={setFiles} /><Results /></> :
                <Login setLoggedIn={setLoggedIn}/>
              }
            </Route>

          </Switch>
        </div>

      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
