import React, { forwardRef, useImperativeHandle } from 'react'
import { useField } from '../hooks'

const AddBlogForm = ({ onAddBlog }, ref) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useImperativeHandle(ref, () => ({
    resetFields: () => {
      title.reset()
      author.reset()
      url.reset()
    }
  }))

  return (
    <form onSubmit={e => onAddBlog(e, { title: title.value, author: author.value, url: url.value })}>
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
      <button type="submit">create</button>
    </form>
  )
}

export default forwardRef(AddBlogForm)
