import React from 'react'
import { connect } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'

const User = ({ users }) => {
  const { id } = useParams()

  if (users.length === 0) {
    return null
  }

  const user = users.find(user => user.id === id)

  if (!user) {
    return <Redirect to="/"/>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ users }) => ({ users })

export default connect(mapStateToProps)(User)
