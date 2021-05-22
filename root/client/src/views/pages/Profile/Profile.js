import React from 'react'

import useAuth from '../../hooks/useAuth'
import getAPIDate from '../../../models/api/api'
import './Profile.css'

const Profile = ({ history }) => {
  const newPasswordRef = React.useRef('')
  const { authData, authDispatcher } = useAuth()

  function onPasswordChangeHandler(event) {
    event.preventDefault()

    getAPIDate(
      'patch',
      '/api/user',
      { password: newPasswordRef.current.value },
      { Authorization: `Bearer ${authData.token}` }
    )
      .then((response) => {
        alert(response.data.message)
        authDispatcher({ type: 'CLEAR_TOKEN' })
        localStorage.removeItem('token')
        history.replace('/auth')
      })
      .catch((err) => alert(err.response.data.message))
  }

  return (
    <section className="profile">
      <h1>Your User Profile</h1>
      <form className="form" onSubmit={onPasswordChangeHandler}>
        <div className="control">
          <label htmlFor="new-password">New Password</label>
          <input ref={newPasswordRef} type="password" id="new-password" />
        </div>
        <div className="action">
          <button type="submit">Change Password</button>
        </div>
      </form>
    </section>
  )
}

export default Profile
