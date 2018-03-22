import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";

import logo from "../logo.svg";
import "../styles/App.css";
import LinkList from "./LinkList";
import Header from "./Header";
import CreateLink from "./CreateLink";
import Login from "./Login";
import Search from "./Search";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/top" component={LinkList} />
            <Route exact path="/new/:page" component={LinkList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
