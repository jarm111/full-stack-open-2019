import React from 'react'
import { connect } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogContainer = styled.div`
  padding: 0.6em;
  border: 1px solid;
  margin-bottom: 0.5em;
  border-radius: 3px;
`

const Blogs = ({ blogs }) => {
  const { pathname } = useLocation()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog => 
        <BlogContainer key={blog.id}>
          <Link to={`${pathname}blogs/${blog.id}`}>{blog.title}</Link>
        </BlogContainer>
      )}
    </div>
  )
}

const mapStateToProps = ({ blogs, login }) => ({
  blogs, login
})

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blogs)
