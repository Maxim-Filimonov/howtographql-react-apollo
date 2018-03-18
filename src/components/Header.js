import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { isLoggedIn } from "./loginService";
export function Header(props) {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex black">
        <div className="fw7 mr1">Kinda News</div>
        <Link to="/" className="ml1 black no-underline">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 black no-underline">
          submit
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Header);
