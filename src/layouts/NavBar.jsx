import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faHouseChimney, faUser } from '@fortawesome/free-solid-svg-icons'

import './NavBar.css'
import AuthContext from '../context/AuthContext';

function NavBar() {
  const { auth } = useContext(AuthContext)

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
        {auth.token && <li id='navbar-userfavorites'>
          <NavLink to="/user/favorites" style={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
            Favoritos
          </NavLink>
        </li>}
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