import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LogoutButton from '../components/LogoutButton'

const menuItemStyles = [
  'padding-right: 1em; display: inline; font-size: 1.2em'
]

const LinkMenuItem = styled(Link)(menuItemStyles)
const MenuItem = styled.div(menuItemStyles)

const Menu = styled.div`
  padding: 1em 3em;
  background-color: LightCoral;
  margin-bottom: 1em;
`

const NavMenu = ({ login }) => {
  return (
    <Menu>
      <LinkMenuItem to="/">blogs</LinkMenuItem>
      <LinkMenuItem to="/users">users</LinkMenuItem>
      <MenuItem>{login.name} logged in <LogoutButton /></MenuItem>
    </Menu>
  )
}

const mapDispatchToProps = ({ login }) => ({ login })

export default connect(mapDispatchToProps)(NavMenu)
