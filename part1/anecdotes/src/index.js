import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getDifferentRandom = (previous, min, max) => {
    // prevent infinite loop
    if (min === max) return min;

    let random = previous;
    while(random === previous) {
      random = getRandomInt(min, max)
    }
    return random
  }

  const getMaxElementIndex = (arr) => arr.indexOf(Math.max(...arr))

  const handleVoteClick = () => {
    const clone = Array.from(votes)
    clone[selected] +=1
    return setVotes(clone)
  }

  const handleNextClick = () => setSelected(getDifferentRandom(selected, 0, anecdotes.length -1))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>{`has ${votes[selected]} votes`}</div>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[getMaxElementIndex(votes)]}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)