import React from 'react'
import { addNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(addNew(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
