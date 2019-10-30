import React from 'react'
import { connect } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'
import useField from '../hooks/useField'

const CommentForm = ({ blog, addCommentToBlog }) => {
  const { reset: resetComment, ...comment } = useField('text')

  const handleSubmit = async (event, value) => {
    event.preventDefault()
    try {
      await addCommentToBlog(blog, value)
      resetComment()
    } catch(e) {
      // error handled in addCommentToBlog()
      return
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event, comment.value)}>
      <div>
        <input {...comment}/>
        <button type="submit">add comment</button>
      </div>
    </form>
  )
}

export default connect(null, { addCommentToBlog })(CommentForm)
