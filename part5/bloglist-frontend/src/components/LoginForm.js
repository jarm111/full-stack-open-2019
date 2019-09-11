import React from 'react'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
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
            type="text"
            value={password}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
