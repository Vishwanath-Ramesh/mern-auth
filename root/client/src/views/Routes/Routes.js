import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import useAuth from '../hooks/useAuth'

const UserProfile = lazy(() => import('../pages/Profile/Profile'))
const AuthPage = lazy(() => import('../pages/Auth/Auth'))
const HomePage = lazy(() => import('../pages/Home/Home'))
const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))

const Routes = () => {
  const { authData } = useAuth()

  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!authData.isAuthenticated && (
              <Route exact path="/auth" component={AuthPage} />
            )}
            {authData.isAuthenticated && (
              <Route exact path="/profile" component={UserProfile} />
            )}
            <Route path="/404" component={PageNotFound} />
            <Redirect to="/404" />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default Routes
