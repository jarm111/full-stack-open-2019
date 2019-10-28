import React from 'react'
import { connect } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'


const Blog = ({ blogs, login, likeBlog, removeBlog }) => {
  const { id } = useParams()

  if (blogs.length === 0) {
    return null
  }

  const blog = blogs.find(user => user.id === id)

  if (!blog) {
    return <Redirect to="/" />
  }

  const handleLike = () => {
    likeBlog(blog, login.token)
  }

  const handleRemove = () => {
    if (!window.confirm(`remove ${blog.title} by ${blog.author} ?`)) {
      return
    }
    removeBlog(blog, login.token)
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
    color: 'white'
  }

  const showRemoveWhenVisible = { display: blog.user.username === login.username ? '' : 'none' }

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={() => handleLike()}>like</button> <br />
      added by {blog.user.name} <br />
      <button style={{ ...removeButtonStyle, ...showRemoveWhenVisible }} onClick={() => handleRemove()}>remove</button> <br />
    </div>
  )
}

const mapStateToProps = ({ blogs, login }) => ({ blogs, login })

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blog)