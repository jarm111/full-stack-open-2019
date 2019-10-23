import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const Blogs = ({ blogs, user, likeBlog, removeBlog }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const handleLike = (event, blog) => {
    event.stopPropagation()
    likeBlog(blog, user.token)
  }

  const handleRemove = (event, blog) => {
    event.stopPropagation()
    if (!window.confirm(`remove ${blog.title} by ${blog.author} ?`)) {
      return
    }
    removeBlog(blog, user.token)
  }

  return (
    <div>
      {sortedBlogs.map(blog => <Blog 
        key={blog.id} 
        blog={blog} 
        onLike={handleLike} 
        onRemove={handleRemove}
        showRemove={blog.user.username === user.username}
      />)}
    </div>
  )
}

const mapStateToProps = ({ blogs, user }) => ({
  blogs, user
})

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blogs)
