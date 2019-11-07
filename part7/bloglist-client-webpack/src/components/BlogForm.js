import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import useField from '../hooks/useField'
import Button from './Button'

const AddBlogForm = ({ login, addBlog, onAddBlogSuccess }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const resetFields = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const handleAddBlog = async (event, blog) => {
    event.preventDefault()
    try {
      await addBlog(blog, login.token)
      resetFields()
      onAddBlogSuccess()
    } catch(e) {
      // error handled in addBlog()
      return
    }
  }

  return (
    <form onSubmit={e => handleAddBlog(e, { title: title.value, author: author.value, url: url.value })}>
      <div>
        title 
        <input {...title} />
      </div>
      <div>
        author 
        <input {...author} />
      </div>
      <div>
        url 
        <input {...url} />
      </div>
      <Button primary type="submit">create</Button>
    </form>
  )
}

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps, { addBlog })(AddBlogForm)
