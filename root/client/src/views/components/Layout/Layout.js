import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import './Layout.css'

const Layout = ({ children }) => {
  const { authData, authDispatcher } = useAuth()
  const history = useHistory()

  function onLogoutHandler() {
    authDispatcher({ type: 'CLEAR_TOKEN' })
    localStorage.removeItem('token')
    history.replace('/auth')
  }

  return (
    <>
      <header className="header">
        <Link to="/">
          <div className="logo">React Auth</div>
        </Link>
        <nav>
          <ul>
            {!authData.isAuthenticated ? (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button type="button" onClick={onLogoutHandler}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
