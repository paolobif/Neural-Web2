import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalContext } from "./GlobalContext"
import { FileContext } from "./FileContext"
import Header from './components/Header';
import Home from "./Home";


import './App.css';

const globalsDefault = {
  host: "http://192.168.86.248:5000"
}



function App() {
  const [files, setFiles] = useState(false)

  return (
    <Router>
      <GlobalContext.Provider value={ globalsDefault }>

        <div className="App">
          <Header setFiles={setFiles} />

          <Switch>

            <Route exact path="/">
              <Home files={files} />
            </Route>

            <Route exact path="/about">
              <div>
                about page
              </div>
            </Route>

          </Switch>  
        </div>

      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
