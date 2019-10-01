import React from 'react'
import { addNew } from '../reducers/anecdoteReducer'
import { notify } from '../utils'

const AnecdoteForm = ({store}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(addNew(event.target.anecdote.value))
    notify(`you created '${event.target.anecdote.value}`, store)
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
