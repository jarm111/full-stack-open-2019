import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LogoutButton from '../components/LogoutButton'

const NavMenu = ({ login }) => {
  const menuStyle = {
    padding: 5,
    backgroundColor: 'LightGrey',
  }

  const menuItemStyle = {
    paddingRight: 10,
    display: 'inline'
  }

  return (
    <div style={menuStyle}>
      <Link style={menuItemStyle} to="/">blogs</Link>
      <Link style={menuItemStyle} to="/users">users</Link>
      <div style={menuItemStyle}>{login.name} logged in <LogoutButton /></div>
    </div>
  )
}

const mapDispatchToProps = ({ login }) => ({ login })

export default connect(mapDispatchToProps)(NavMenu)
