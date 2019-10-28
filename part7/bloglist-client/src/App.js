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
import { initBlogs } from './reducers/blogReducer'
import { loginPersistent } from './reducers/loginReducer'

const App = ({ login, initBlogs, loginPersistent }) => {
  const blogFormToggleRef = useRef()

  useEffect(() => { 
    initBlogs() 
  }, [initBlogs])

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
        <Route path="/users">
          {showUsers()}
        </Route>
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
  { initBlogs, loginPersistent }
)(App)