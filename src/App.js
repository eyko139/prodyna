import React, { useState, useEffect } from "react";

import { BrowserRouter,
  Switch,
  Route,
  Link } from "react-router-dom";

import IndexContainer from "./containers/indexContainer";
import ResultContainer from "./containers/resultContainer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexContainer}>
        </Route>
        <Route exact path="/result" component={ResultContainer}>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
