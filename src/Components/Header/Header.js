import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__center">
        <div className="header__option">
          <Link className="link" to="/kurkaniimei">
            <h1>KURKII MEI</h1>
          </Link>
        </div>

        <div className="header__option">
          <Link className="link" to="/">
            <h1>STORE</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
