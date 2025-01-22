import logo from "../../assets/logo.svg";
import "../../styles/header.css";

import React from "react";

 function Header() {
  return (
    <header className="header-header">
      <img src={logo} className="header-logo" alt="logo" />
      <p>
        Edit <code>src/header.js</code> and save to reload.
      </p>
      <a
        className="header-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React  By Loïc.k
      </a>
    </header>
  );
}

export default Header