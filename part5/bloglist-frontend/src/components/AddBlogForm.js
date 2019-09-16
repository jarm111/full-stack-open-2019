import React, { useState, forwardRef, useImperativeHandle } from 'react'

const AddBlogForm = ({ onAddBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useImperativeHandle(ref, () => ({
    resetFields: () => {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }))

  return (
    <form onSubmit={e => onAddBlog(e, { title, author, url })}>
      <div>
        title 
        <input 
          type="text"
          value={title}
          name="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        author 
        <input 
          type="text"
          value={author}
          name="author"
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url 
        <input 
          type="text"
          value={url}
          name="url"
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default forwardRef(AddBlogForm)
