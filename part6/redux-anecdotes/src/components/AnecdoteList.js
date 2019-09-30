import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => store.dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList
