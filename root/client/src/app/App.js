import React from 'react'
import ErrorBoundary from '../views/pages/ErrorBoundary/ErrorBoundary'

import { AuthProvider } from '../views/hooks/useAuth'
import Routes from '../views/Routes/Routes'
import './App.css'

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
