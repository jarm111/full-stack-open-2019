import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/userReducer'

const Users = ({ users, initUsers }) => {
  useEffect(() => {
    initUsers()
  })

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
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const mapStateToProps = ({ users }) => ({ users })

export default connect(mapStateToProps, { initUsers })(Users)
