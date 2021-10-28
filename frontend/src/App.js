import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalContext } from "./GlobalContext"
import { FileContext } from "./FileContext"
import Header from './components/Header';
import Home from "./Home";
import Results from "./Results";


import './App.css';

const globalsDefault = {
  host: "http://10.0.0.243:5000"
}



function App() {
  const [files, setFiles] = useState({names: "", source: "", loaded: false})

  return (
    <Router>
      <GlobalContext.Provider value={ globalsDefault }>

        <div className="App">
          <Header setFiles={setFiles} />

          <Switch>

            <Route exact path="/">
              <Home files={files} />
            </Route>

            <Route exact path="/results">
              <div>
                <Results />
              </div>
            </Route>

          </Switch>
        </div>

      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
