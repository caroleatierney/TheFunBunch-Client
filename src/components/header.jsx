import React from 'react';
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (

  <header>

    <h1>The Fun Bunch</h1>
    {/* <Link to ="/" className='logo'>
        <img src={logo} alt="ReactJs" /> ReactJs
    </Link> */}

    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
    </nav>
  </header>
  )
}

export  default Header