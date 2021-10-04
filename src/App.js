import React from "react";
import "./App.css";
import "generalcss/styles.css";
import "card/dist/index.css";
import "popup/dist/index.css";
import "toaster/dist/index.css";
import "button/dist/index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Quiz from "./questionnary/Quiz";
import Header from "./header/Header";
import ToasterDisplay from "toaster";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/TestCardGame/quiz/:subject">
          <Quiz />
        </Route>
      </Switch>
      <ToasterDisplay />
    </BrowserRouter>
  );
}

export default App;
