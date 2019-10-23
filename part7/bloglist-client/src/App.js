import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'
import { initBlogs, addBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { login, logout,  loginPersistent } from './reducers/loginReducer'

const App = ({ blogs, user, initBlogs, addBlog, likeBlog, removeBlog, login, logout,  loginPersistent }) => {
  const blogFormRef = useRef()
  const blogFormToggleRef = useRef()

  useEffect(() => { 
    initBlogs() 
  }, [initBlogs])

  useEffect(() => {
    loginPersistent()
  }, [loginPersistent])
  
  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    login(username, password)
  }

  const handleLogout = () => {
    logout()
  }

  const handleAddBlog = async (event, blog) => {
    event.preventDefault()
    try {
      await addBlog(blog, user.token)
      blogFormRef.current.resetFields()
      blogFormToggleRef.current.toggleVisibility()
    } catch(e) {
      // error handled in addBlog()
      return
    }
  }

  const handleLike = async (event, blog) => {
    event.stopPropagation()
    await likeBlog(blog, user.token)
  }

  const handleRemove = async (event, blog) => {
    event.stopPropagation()
    if (!window.confirm(`remove ${blog.title} by ${blog.author} ?`)) {
      return
    }
    await removeBlog(blog, user.token)
  }

  const showLoginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm 
        onLogin={handleLogin}
      />
    </div>
  )

  const showBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in <LogoutButton onLogout={handleLogout} /></p>
        <Togglable buttonLabel="new blog" ref={blogFormToggleRef}>
          <h2>create new</h2>
          <AddBlogForm ref={blogFormRef} onAddBlog={handleAddBlog} />
        </Togglable>
        {sortedBlogs.map(blog => <Blog 
          key={blog.id} 
          blog={blog} 
          onLike={handleLike} 
          onRemove={handleRemove}
          showRemove={blog.user.username === user.username}
        />)}
      </div>
    )
  }

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
  { notify, initBlogs, addBlog, likeBlog, removeBlog, login, logout,  loginPersistent }
)(App)