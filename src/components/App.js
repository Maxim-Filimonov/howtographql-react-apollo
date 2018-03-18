import React, { Component } from "react";
import { Switch, Route } from "react-router";

import logo from "../logo.svg";
import "../styles/App.css";
import LinkList from "./LinkList";
import Header from "./Header";
import CreateLink from "./CreateLink";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
