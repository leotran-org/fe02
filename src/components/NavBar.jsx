import { useState, useEffect } from "react";
import { Sparkle } from "lucide-react";
import navLinks from "../constants/navLinks";
import logo from "../assets/logo.png";
import "./NavBar.css"; 

import React from 'react';

const NavBar = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <a href="#">
            <img src={logo} alt="Leo Tran Logo" draggable="false" />
          </a>
        </div>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="nav-section">
  {navLinks.map((link) => (
    <li key={link.id}>
      <a href={`#${link.id}`} className={link.hoverColor} data-i18n={`nav_${link.id}`}>
        {link.label}
      </a>
    </li>
  ))}
  <li>
    <label className="switch">
      <input type="checkbox" id="toggleButton" defaultChecked />
      <span className="slider"></span>
    </label>
  </li>
</ul>
      </nav>
    </header>
  );
};

export default NavBar;

