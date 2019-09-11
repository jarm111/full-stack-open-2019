import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'
import loginService from './services/login'
import blogService from './services/blogs'
import AddBlogForm from './components/AddBlogForm';

export default function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  
  const blogFormRef = useRef()

  const getBlogs = useCallback(
    async () => {
      try {
        const res = await blogService.getAll()
        setBlogs(res)
      } catch(err) {
        console.error('Error', err)
      }
    }, 
    []
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
      const user = await loginService.login({username, password})
      setUser(user)
    } catch(err) {
      console.error('Error', err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    loginService.clearPersistentLogin()
  }

  const handleAddBlog = async (event, blog) => {
    event.preventDefault()
    try {
      const created = await blogService.create(blog, user.token)
      console.log('created', created)
      getBlogs()
      blogFormRef.current.resetFields()
    } catch(err) {
      console.error('Error', err)
    }
  }

  const showLoginForm = () => (
    <div>
      <h2>log in to application</h2>
      <LoginForm 
          onLogin={handleLogin}
      />
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <LogoutButton onLogout={handleLogout} /></p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      <h2>create new</h2>
      <AddBlogForm ref={blogFormRef} onAddBlog={handleAddBlog} />
    </div>
  )

  return (
    <div className="App">
      {user ? showBlogs() : showLoginForm()}
    </div>
  );
}
