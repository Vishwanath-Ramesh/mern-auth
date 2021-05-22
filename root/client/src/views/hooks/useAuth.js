import React from 'react'
import jwt from 'jwt-decode'
import _ from 'lodash'

const initialState = {
  token: localStorage.getItem('token'),
  userDetails: null,
  isAuthenticated: false,
}

const AuthContext = React.createContext({
  authData: initialState,
  authDispatcher: () => null,
})

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token,
        userDetails: action.payload.userDetails,
        isAuthenticated: true,
      }
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: null,
        userDetails: null,
        isAuthenticated: false,
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

function computerInitialState(defaultState) {
  let token = null
  let idToken = null

  token = localStorage.getItem('token')

  if (!_.isEmpty(token)) idToken = jwt(token)

  return {
    ...defaultState,
    token,
    userDetails: idToken?.userId,
    isAuthenticated: !!token,
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    authReducer,
    initialState,
    computerInitialState
  )

  return (
    <AuthContext.Provider value={{ authData: state, authDispatcher: dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return React.useContext(AuthContext)
}
