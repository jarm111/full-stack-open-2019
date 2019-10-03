import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'

const App = ({ initializeAnecdotes }) => {
  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes => initializeAnecdotes(anecdotes)))
  }, [initializeAnecdotes])

  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)