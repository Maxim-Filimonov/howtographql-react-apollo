import React from "react";

export default function ExistingLogin(props) {
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
