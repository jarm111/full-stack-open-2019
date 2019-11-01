import React from 'react'
import { connect } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const RemoveButton = styled.button`
  background-color: Blue;
  color: White;
  display: ${props => props.show ? '' : 'none'}
`

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

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={() => handleLike()}>like</button> <br />
      added by {blog.user.name} <br />
      <RemoveButton show={blog.user.username === login.username} onClick={() => handleRemove()}>remove</RemoveButton> <br />
      <h4>comments</h4>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map(comment => 
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ blogs, login }) => ({ blogs, login })

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blog)