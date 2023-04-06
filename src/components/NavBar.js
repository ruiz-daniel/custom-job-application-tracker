import React, { useRef } from 'react'

import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'

function NavBar() {
  const userMenu = useRef(null)
  const userMenuItems = [
    {
      label: sessionStorage.getItem('username')
        ? sessionStorage.getItem('display_name')
        : 'Guest',
    },
    {
      label: sessionStorage.getItem('userid') ? 'Logout' : 'Login',
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
