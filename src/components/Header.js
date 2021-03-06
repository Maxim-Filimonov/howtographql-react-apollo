import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { isLoggedIn, logOut } from "./loginService";
export function Header(props) {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex black">
        <div className="fw7 mr1">Kinda News</div>
        <Link to="/top" className="ml1 black no-underline">
          top
        </Link>
        <div className="ml1">|</div>
        <Link to="/" className="ml1 black no-underline">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 black no-underline">
          search
        </Link>
        <div className="ml1">
          {isLoggedIn() ? (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/create" className="ml1 black no-underline">
                submit
              </Link>
              <button
                className="ml1 black bg-transparent bn pointer rightl"
                onClick={logOut}
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="black no-underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
