import React from 'react'
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { notify } from '../utils'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = ({ addNew }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    addNew(newAnecdote)
    notify(`you created '${content}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default connect(null, { addNew })(AnecdoteForm)
