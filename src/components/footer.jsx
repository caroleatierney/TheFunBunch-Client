import React from 'react'
import {Link, NavLink } from 'react-router-dom';
import logo from '../assets/react.svg';

function Footer() {
  return (

  <footer>
    &copy; CopyRight {new Date().getFullYear()}
  </footer>
  )
}

export  default Footer