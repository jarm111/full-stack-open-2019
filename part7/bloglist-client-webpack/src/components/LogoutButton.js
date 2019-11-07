import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import Button from './Button'

const LogoutButton = ({ onLogout }) => (
  <Button type="button" name="logout" onClick={onLogout}>logout</Button>
)

export default connect(null, { onLogout: logout })(LogoutButton)
