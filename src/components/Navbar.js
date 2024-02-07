import React from "react";
import { NavLink } from "react-bootstrap";

export default function Navbar() {
  const navbarLinks = ['Home', 'About', 'Add Transaction Form'];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        {navbarLinks.map((link) => (
          <li key={link} className="nav-item">
            <NavLink to={`/${link}`} className="nav-link">
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
