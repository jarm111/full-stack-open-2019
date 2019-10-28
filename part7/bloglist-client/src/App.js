import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { loginPersistent } from './reducers/loginReducer'

const App = ({ login, initBlogs, initUsers, loginPersistent }) => {
  const blogFormToggleRef = useRef()

  useEffect(() => { 
    initBlogs()
    initUsers()
  }, [initBlogs, initUsers])

  useEffect(() => {
    loginPersistent()
  }, [loginPersistent])

  const handleAddBlogSuccess = () => {
    blogFormToggleRef.current.toggleVisibility()
  }

  const showLoginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )

  const showBlogs = () => (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormToggleRef}>
        <h2>create new</h2>
        <AddBlogForm onAddBlogSuccess={handleAddBlogSuccess}/>
      </Togglable>
      <Blogs />
    </div>
  )

  const showUsers = () => (
    <div>
      <h2>users</h2>
      <Users />
    </div>
  )

  const showContent = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{login.name} logged in <LogoutButton /></p>
      <Switch>
        <Route exact path="/">
          {showBlogs()}
        </Route>
        <Route exact path="/users">
          {showUsers()}
        </Route>
        <Route path="/users/:id" render={({ match }) => <User id={match.params.id}/>} />
      </Switch>
    </div>
  )

  return (
    <Router>
      <div className="App">
        {login ? showContent() : showLoginForm()}
      </div>
    </Router>
  )
}

const mapStateToProps = ({ blogs, login }) => {
  return { blogs, login }
}

export default connect(
  mapStateToProps, 
  { initBlogs, initUsers, loginPersistent }
)(App)