import React from 'react'
import useField from '../hooks/useField'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import Button from './Button'

const LoginForm = ({ login }) => {
  const username = useField('text')
  delete username.reset
  const password = useField('password')
  delete password.reset

  const handleLogin = (event, username, password) => {
    event.preventDefault()
    login(username, password)
  }

  return (
    <form onSubmit={(event) => handleLogin(event, username.value, password.value)}>
      <div>
        username 
        <input {...username}/>
      </div>
      <div>
        password 
        <input {...password}/>
      </div>
      <Button type="submit">login</Button>
    </form>
  )
}

export default connect(null, { login })(LoginForm)
