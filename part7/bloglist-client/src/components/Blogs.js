import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const Blogs = ({ blogs, login, likeBlog, removeBlog }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const handleLike = (event, blog) => {
    event.stopPropagation()
    likeBlog(blog, login.token)
  }

  const handleRemove = (event, blog) => {
    event.stopPropagation()
    if (!window.confirm(`remove ${blog.title} by ${blog.author} ?`)) {
      return
    }
    removeBlog(blog, login.token)
  }

  return (
    <div>
      {sortedBlogs.map(blog => <Blog 
        key={blog.id} 
        blog={blog} 
        onLike={handleLike} 
        onRemove={handleRemove}
        showRemove={blog.user.username === login.username}
      />)}
    </div>
  )
}

const mapStateToProps = ({ blogs, login }) => ({
  blogs, login
})

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blogs)
