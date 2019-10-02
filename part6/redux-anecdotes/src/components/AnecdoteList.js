import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../utils'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  const filter = store.getState().filter

  const handleClick = (anecdote) => {
    store.dispatch(vote(anecdote.id))
    notify(`you voted '${anecdote.content}'`, store)
  }

  return (
    <div>
    {anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
    )}
    </div>
  )
}

export default AnecdoteList
