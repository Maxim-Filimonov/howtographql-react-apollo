import React, { Component } from "react";
import { loginWithToken } from "./loginService";
import ExistingLogin from "./ExistingLogin";
import CreateAccount from "./CreateAccount";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const SIGNUP_MUTATION = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

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
  createAccount = async () => {
    console.log("creating account");
    const { password, email, name } = this.state;
    const result = await this.props.signUp({
      variables: {
        password,
        email,
        name
      }
    });
    const { token } = result.data.signup;
    loginWithToken(token);
    this.props.history.push("/");
  };
  onLogin = async () => {
    const { password, email } = this.state;
    const result = await this.props.login({
      variables: {
        email,
        password
      }
    });
    const { token } = result.data.login;
    loginWithToken(token);
    this.props.history.push("/");
  };
  render() {
    const { name, email, password, newAccount } = this.state;
    if (newAccount) {
      return (
        <CreateAccount
          onEmailChange={this.onValueChange("email")}
          onPasswordChange={this.onValueChange("password")}
          onNameChange={this.onValueChange("name")}
          onSwitchToLogin={() => this.setState({ newAccount: false })}
          onCreateAccount={this.createAccount}
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

export default compose(
  graphql(SIGNUP_MUTATION, { name: "signUp" }),
  graphql(LOGIN_MUTATION, { name: "login" })
)(Login);
