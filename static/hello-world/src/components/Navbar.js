import React from 'react'
import logo from '../images/logo.png';
import search from '../images/search.png';
import email from '../images/email.png';
import menu from '../images/menu.png';
export default function Navbar() {
 

  return (
    <div><nav className="navbar">
      <img className="logo" src={logo} alt="logo" />
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search..." />
        <button type="submit" className="search-button">
          <img src={search} alt="Search" className="search-icon" />
        </button>
        <img src={email} alt="email" className="navbarimg" />
        <img src={menu} alt="email" className="navbarimg2" />
      </div>
    </nav></div>
  )
}
