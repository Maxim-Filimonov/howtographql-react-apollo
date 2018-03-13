import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

export function Header(props) {
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div>
        <Link to="/">new</Link>
        <div>|</div>
        <Link to="/create">submit</Link>
      </div>
    </div>
  );
}

export default withRouter(Header);
