import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = ({ blogs, user, onLike, onRemove }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {sortedBlogs.map(blog => <Blog 
        key={blog.id} 
        blog={blog} 
        onLike={onLike} 
        onRemove={onRemove}
        showRemove={blog.user.username === user.username}
      />)}
    </div>
  )
}

const mapStateToProps = ({ blogs, user }) => ({
  blogs, user
})

export default connect(mapStateToProps)(Blogs)
