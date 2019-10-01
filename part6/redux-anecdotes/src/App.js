import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = ({ store }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm store={store}/>
      <AnecdoteList store={store} />
      <Notification store={store} />  
    </div>
  )
}

export default App