import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../utils'

const AnecdoteList = ({ anecdotes, filter, vote }) => {
  const handleClick = (anecdote) => {
    vote(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
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

const mapStateToProps = state => ({
  anecdotes: state.anecdotes,
  filter: state.filter
})

export default connect(mapStateToProps, { vote })(AnecdoteList)
