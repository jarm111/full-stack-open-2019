import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../utils'

const AnecdoteList = ({ anecdotesToShow, vote }) => {
  const handleClick = (anecdote) => {
    vote(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  return (
    <div>
    {anecdotesToShow
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

const filterAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = state => ({
  anecdotesToShow: filterAnecdotes(state)
})

export default connect(mapStateToProps, { vote })(AnecdoteList)
