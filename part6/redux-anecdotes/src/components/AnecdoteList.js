import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes

  const handleClick = (id, message) => {
    store.dispatch(vote(id))
    store.dispatch(setNotification(message))
    setTimeout(() => {
      store.dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleClick(anecdote.id, `you voted '${anecdote.content}'`)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList
