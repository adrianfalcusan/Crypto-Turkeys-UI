import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__center">
        <div className="header__option">
          <Link className="link" to="/">
            <h1>Cotetz</h1>
          </Link>
        </div>

        <div className="header__option">
          <Link className="link" to="/kurkaniimei">
            <h1>Kurkanii mei</h1>
          </Link>
        </div>

        <div className="header__option">
          <Link className="link" to="/kurkan-shop">
            <h1>Magazin</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
