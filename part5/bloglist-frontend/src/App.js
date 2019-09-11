import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog'
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
      <p>{user.name} logged in</p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div className="App">
      {user ? showBlogs() : showLoginForm()}
    </div>
  );
}
