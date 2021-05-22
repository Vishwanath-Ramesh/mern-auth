import React from 'react'
import { useHistory } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import getAPIData from '../../../models/api/api'
import './Auth.css'

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      }
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
      }
    case 'CLEAR_INPUTS':
      return {
        ...state,
        email: '',
        password: '',
      }
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        isLogin: !state.isLogin,
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const AuthForm = () => {
  const initialState = {
    email: '',
    password: '',
    isLogin: true,
  }
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  const { authDispatcher } = useAuth()
  const history = useHistory()

  function onSubmitHandler(event) {
    event.preventDefault()

    const url = `/auth/${state.isLogin ? 'login' : 'signup'}`

    getAPIData('post', url, { email, password })
      .then(({ data }) => {
        if (state.isLogin) {
          localStorage.setItem('token', data.token)
          authDispatcher({
            type: 'SET_TOKEN',
            payload: { token: data.token, userDetails: data.userId },
          })
          history.replace('/profile')
        } else {
          dispatch({ type: 'CLEAR_INPUTS' })
          dispatch({ type: 'TOGGLE_LOGIN' })
          history.replace('/auth')
        }
      })
      .catch((err) => alert(err.response.data.message))
  }

  const { isLogin, email, password } = state

  return (
    <section className="auth">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="control">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={({ target }) =>
              dispatch({ type: 'SET_EMAIL', payload: target.value })
            }
          />
        </div>
        <div className="control">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={({ target }) =>
              dispatch({ type: 'SET_PASSWORD', payload: target.value })
            }
          />
        </div>
        <div className="actions">
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className="toggle"
            onClick={() => dispatch({ type: 'TOGGLE_LOGIN' })}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
