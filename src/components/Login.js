import React, { Component } from "react";
import { loginWithToken } from "./loginService";
import ExistingLogin from "./ExistingLogin";
import CreateAccount from "./CreateAccount";

class Login extends Component {
  state = {
    newAccount: false,
    email: "",
    password: "",
    name: ""
  };

  onValueChange = value => e => {
    const newState = {};
    newState[value] = e.target.value;
    this.setState(newState);
  };
  createAccount = () => {};
  onLogin = () => {};
  render() {
    const { name, email, password, newAccount } = this.state;
    if (newAccount) {
      return (
        <CreateAccount
          onEmailChange={this.onValueChange("email")}
          onPasswordChange={this.onValueChange("password")}
          onNameChange={this.onValueChange("name")}
          onSwitchToLogin={() => this.setState({ newAccount: false })}
          onCreateAccount={this.onCreateAccount}
          name={name}
          email={email}
          password={password}
        />
      );
    } else {
      return (
        <ExistingLogin
          email={email}
          password={password}
          onEmailChange={this.onValueChange("email")}
          onPasswordChange={this.onValueChange("password")}
          onSwitchToCreateAccount={() => this.setState({ newAccount: true })}
          onLogin={this.onLogin}
        />
      );
    }
  }
}

export default Login;
