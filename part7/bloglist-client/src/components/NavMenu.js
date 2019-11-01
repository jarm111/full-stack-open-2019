import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LogoutButton from '../components/LogoutButton'

const menuItemStyles = [
  'padding-right: 10px; display: inline;'
]

const LinkMenuItem = styled(Link)(menuItemStyles)
const MenuItem = styled.div(menuItemStyles)

const Menu = styled.div`
  padding: 5px;
  background-color: LightGrey;
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
