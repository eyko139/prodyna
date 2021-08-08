import React from "react";

import { BrowserRouter,
  Switch,
  Route } from "react-router-dom";

import InputContainer from "./containers/inputContainer";
import ResultContainer from "./containers/resultContainer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={InputContainer}>
        </Route>
        <Route exact path="/result" component={ResultContainer}>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
