import React from 'react'
import { connect } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'

const Users = ({ users }) => {
  const { pathname } = useLocation()

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
          <tr key={user.id}>
            <td>
              <Link to={`${pathname}/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const mapStateToProps = ({ users }) => ({ users })

export default connect(mapStateToProps)(Users)
