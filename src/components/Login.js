import React, { Component } from "react";
import { loginWithToken } from "./loginService";

function CreateAccount(props) {
  const {
    name,
    email,
    password,
    onNameChange,
    onPasswordChange,
    onEmailChange,
    onCreateAccount,
    onSwitchToLogin
  } = props;
  return (
    <div>
      <h4 className="mv3">Sign Up</h4>
      <input
        value={name}
        onChange={onNameChange}
        type="text"
        placeholder="Your name"
      />
      <div className="flex flex-column">
        <input
          value={email}
          onChange={onEmailChange}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={onPasswordChange}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button onClick={onCreateAccount}>create account</button>
        <button onClick={onSwitchToLogin}>already have an account?</button>
      </div>
    </div>
  );
}
function ExistingLogin(props) {
  const {
    email,
    password,
    onPasswordChange,
    onEmailChange,
    onLogin,
    onSwitchToCreateAccount
  } = props;
  return (
    <div>
      <h4 className="mv3">Login</h4>
      <div className="flex flex-column">
        <input
          value={email}
          onChange={onEmailChange}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={onPasswordChange}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button onClick={onLogin}>Login</button>
        <button onClick={onSwitchToCreateAccount}>
          need to create an account?
        </button>
      </div>
    </div>
  );
}
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
