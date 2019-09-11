import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'
import loginService from './services/login'
import blogService from './services/blogs'

export default function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await blogService.getAll()
        setBlogs(res)
      } catch(err) {
        console.error('Error', err)
      }
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const persistentLogin = loginService.getPersistentLogin()
    if (persistentLogin) {
      setUser(persistentLogin)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUsername('')
      setPassword('')
      setUser(user)
    } catch(err) {
      console.error('Error', err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    loginService.clearPersistentLogin()
  }

  const showLoginForm = () => (
    <LoginForm 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin}
      />
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <LogoutButton onLogout={handleLogout} /></p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div className="App">
      {user ? showBlogs() : showLoginForm()}
    </div>
  );
}
