import React from 'react'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faHouseChimney, faUser } from '@fortawesome/free-solid-svg-icons'

import './NavBar.css'

function NavBar() {

  let activeStyle = {
    color: "#C48900",
    textDecoration: "none"
  };
  let inactiveStyle = {
    color: "#FFFFFF",
    textDecoration: "none"
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" style={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
            <FontAwesomeIcon icon={faHouseChimney} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/home" style={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" style={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </li>
      </ul>

    </nav>
  )
}

export default NavBar