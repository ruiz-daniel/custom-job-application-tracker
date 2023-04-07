import React from 'react'

function NavBar({ onLogin, onLogout, onRegister }) {

  return (
    <div className="navbar">
      <h3>Custom Job Tracker</h3>
      <span className='navbar-right'>
        {!localStorage.getItem('access_token') && <p onClick={onLogin}>Sign in</p>}
        {!localStorage.getItem('access_token') && <p onClick={onRegister}>Sign Up</p>}
        <h4>{localStorage.getItem('display_name') || 'Guest'}</h4>
        {localStorage.getItem('access_token') && <p onClick={onLogout}>Logout</p>}
      </span>
    </div>
  )
}

export default NavBar
