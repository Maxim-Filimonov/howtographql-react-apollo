import React from "react";
export default function CreateAccount(props) {
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
