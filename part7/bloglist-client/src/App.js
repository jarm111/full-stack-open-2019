import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import { initBlogs } from './reducers/blogReducer'
import { loginPersistent } from './reducers/loginReducer'

const App = ({ user, initBlogs, loginPersistent }) => {
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
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <LogoutButton /></p>
      <Togglable buttonLabel="new blog" ref={blogFormToggleRef}>
        <h2>create new</h2>
        <AddBlogForm onAddBlogSuccess={handleAddBlogSuccess}/>
      </Togglable>
      <Blogs />
    </div>
  )

  return (
    <div className="App">
      {user ? showBlogs() : showLoginForm()}
    </div>
  )
}

const mapStateToProps = ({ blogs, user }) => {
  return { blogs, user }
}

export default connect(
  mapStateToProps, 
  { initBlogs, loginPersistent }
)(App)