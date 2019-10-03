import React from 'react'
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { notify } from '../utils'

const AnecdoteForm = ({ addNew }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    addNew(event.target.anecdote.value)
    notify(`you created '${event.target.anecdote.value}`)
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default connect(null, { addNew })(AnecdoteForm)
