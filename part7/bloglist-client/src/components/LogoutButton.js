import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LogoutButton = ({ onLogout }) => (
  <button type="button" name="logout" onClick={onLogout}>logout</button>
)

export default connect(null, { onLogout: logout })(LogoutButton)
