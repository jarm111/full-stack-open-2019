import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../graphql/mutations'
import { saveToken } from '../utils/localStorage'

const Login = ({ setToken, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN)

  const handleSubmit = async e => {
    e.preventDefault()

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      setToken(token)
      saveToken(token)
      setUsername('')
      setPassword('')
      onLogin()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
