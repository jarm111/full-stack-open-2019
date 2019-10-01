import React from 'react'
import { addNew } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(addNew(event.target.anecdote.value))
    store.dispatch(setNotification(`you created '${event.target.anecdote.value}`))
    setTimeout(() => {
      store.dispatch(clearNotification())
    }, 5000)
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
