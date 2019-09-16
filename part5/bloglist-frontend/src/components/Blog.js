import React, { useState } from 'react'

const Blog = ({ blog, onLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: detailsVisible ? '' : 'none'}

  const toggleVisiblity = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={blogStyle} onClick={toggleVisiblity}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes <button onClick={event => onLike(event, blog)}>like</button> <br />
        added by {blog.user.name} <br />
      </div>
    </div>
  )
}

export default Blog