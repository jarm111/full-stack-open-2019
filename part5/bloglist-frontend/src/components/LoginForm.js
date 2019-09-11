import React, { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <form onSubmit={(event) => onLogin(event, username, password)}>
      <div>
        username 
        <input 
          type="text"
          value={username}
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password 
        <input 
          type="password"
          value={password}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
