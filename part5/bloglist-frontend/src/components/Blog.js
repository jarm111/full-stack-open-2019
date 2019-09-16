import React, { useState } from 'react'

const Blog = ({ blog, onLike, onRemove, showRemove}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
    color: 'white'
  }

  const showDetailsWhenVisible = { display: detailsVisible ? '' : 'none'}
  const showRemoveWhenVisible = { display: showRemove ? '' : 'none'}

  const toggleVisiblity = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={blogStyle} onClick={toggleVisiblity}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showDetailsWhenVisible}>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes <button onClick={event => onLike(event, blog)}>like</button> <br />
        added by {blog.user.name} <br />
        <button style={{...removeButtonStyle, ...showRemoveWhenVisible}} onClick={event => onRemove(event, blog)}>remove</button> <br />
      </div>
    </div>
  )
}

export default Blog