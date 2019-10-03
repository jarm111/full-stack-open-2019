import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotesToShow, vote, setNotification }) => {
  const handleClick = (anecdote) => {
    vote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
    {anecdotesToShow
      .sort((a, b) => b.votes - a.votes)
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

export default connect(mapStateToProps, { vote, setNotification })(AnecdoteList)
