import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navbarLinks = ['', 'about', 'add-transaction'];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mx-auto">
        {navbarLinks.map((link) => (
          <li key={link} className="nav-item">
            <NavLink to={`/${link}`} className="nav-link">
              {link === '' ? 'Home' : link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
