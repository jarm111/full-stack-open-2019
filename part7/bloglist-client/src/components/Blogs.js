import React from 'react'
import { connect } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blogs = ({ blogs }) => {
  const { pathname } = useLocation()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {sortedBlogs.map(blog => 
        <div key={blog.id} style={blogStyle}>
          <Link to={`${pathname}blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ blogs, login }) => ({
  blogs, login
})

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blogs)
