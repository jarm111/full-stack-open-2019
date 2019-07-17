import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
  <div>{text} {value}</div>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ({stats}) => {
  const {good, neutral, bad} = stats
  const all = good + neutral + bad

  if (all === 0) return <div>No feedback given</div>

  return (
    <div>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={(good * 1 + bad * -1) / all}/>
      <Statistic text="positive" value={(good / all * 100) + ' %'}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={{good, neutral, bad}}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)