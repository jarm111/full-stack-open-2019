import React from 'react'
import { connect } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import Button from './Button'

const RemoveButton = styled(Button)`
  display: ${props => props.show ? '' : 'none'}
`

const CommentList = styled.ul`
  list-style-type: circle;

  li {
    margin-left: 1.5em;
  }
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
      {blog.likes} likes <Button onClick={() => handleLike()}>like</Button> <br />
      added by {blog.user.name} <br />
      <RemoveButton show={blog.user.username === login.username} onClick={() => handleRemove()}>remove</RemoveButton> <br />
      <h4>comments</h4>
      <CommentForm blog={blog} />
      <CommentList>
        {blog.comments.map(comment => 
          <li key={comment.id}>{comment.content}</li>
        )}
      </CommentList>
    </div>
  )
}

const mapStateToProps = ({ blogs, login }) => ({ blogs, login })

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blog)