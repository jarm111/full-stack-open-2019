import React, { useState, useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'
import loginService from './services/login'
import blogService from './services/blogs'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'

const App = ({ notify, blogs, initBlogs }) => {
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const blogFormToggleRef = useRef()

  const getBlogs = useCallback(
    async () => {
      try {
        initBlogs()
      } catch(err) {
        notify(`${err}`, 'error')
      }
    }, 
    [notify, initBlogs]
  )

  useEffect(() => { getBlogs() }, [getBlogs])

  useEffect(() => {
    const persistentLogin = loginService.getPersistentLogin()
    if (persistentLogin) {
      setUser(persistentLogin)
    }
  }, [])
  
  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      notify(`${user.name} logged in`, 'info')
    } catch(err) {
      if (err.response.status === 401) {
        notify('wrong username or password', 'error')
      } else {
        notify(`${err}`, 'error')
      }
    }
  }

  const handleLogout = () => {
    notify(`${user.name} logged out`, 'info')
    setUser(null)
    loginService.clearPersistentLogin()
  }

  const handleAddBlog = async (event, blog) => {
    event.preventDefault()
    try {
      const created = await blogService.create(blog, user.token)
      notify(`a new blog ${created.title} by ${created.author} added`, 'info')
      getBlogs()
      blogFormRef.current.resetFields()
      blogFormToggleRef.current.toggleVisibility()
    } catch(err) {
      notify(`${err}`, 'error')
    }
  }

  const handleLike = async (event, blog) => {
    event.stopPropagation()
    const updated = { ...blog, likes: blog.likes + 1 }
    try {
      const res = await blogService.update(updated, user.token)
      notify(`liked ${res.title} by ${res.author}`, 'info')
      getBlogs()
    } catch(err) {
      notify(`${err}`, 'error')
    }
  }

  const handleRemove = async (event, blog) => {
    event.stopPropagation()
    if (!window.confirm(`remove ${blog.title} by ${blog.author} ?`)) return
    try {
      await blogService.remove(blog, user.token)
      notify(`removed ${blog.title} by ${blog.author}`, 'info')
      getBlogs()
    } catch(err) {
      notify(`${err}`, 'error')
    }
  }

  const showNotification = () => (
    <Notification />
  )

  const showLoginForm = () => (
    <div>
      <h2>log in to application</h2>
      {showNotification()}
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
        {showNotification()}
        <p>{user.name} logged in <LogoutButton onLogout={handleLogout} /></p>
        <Togglable buttonLabel="new note" ref={blogFormToggleRef}>
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

const mapStateToProps = ({ blogs }) => {
  return { blogs }
}

export default connect(mapStateToProps, { notify, initBlogs })(App)