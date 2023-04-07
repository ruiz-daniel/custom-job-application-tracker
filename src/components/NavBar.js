import React, { useRef } from 'react'

import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'

function NavBar({ onLogin, onLogout }) {
  const userMenu = useRef(null)
  const userMenuItems = [
    {
      label: localStorage.getItem('username')
        ? localStorage.getItem('display_name')
        : 'Guest',
    },
    {
      label: localStorage.getItem('userid') ? 'Logout' : 'Login',
      command: localStorage.getItem('userid') ? onLogout : onLogin,
    },
  ]

  return (
    <div className="navbar">
      <h3>Custom Job Tracker</h3>
      <Avatar
        icon="pi pi-user"
        size="large"
        shape="circle"
        onClick={(e) => userMenu.current.toggle(e)}
      />
      <Menu model={userMenuItems} popup ref={userMenu} />
    </div>
  )
}

export default NavBar
