import React from 'react'
import { NavLink } from "react-router-dom";

function NavBar() {

  let activeStyle = {
    color: "#C48900",
    textDecoration: "none"
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/home" style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Buscar</NavLink>
        </li>
      </ul>

    </nav>
  )
}

export default NavBar