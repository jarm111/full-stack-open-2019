import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({stats}) => {
  const {good, neutral, bad} = stats
  const all = good + neutral + bad

  return (
    <>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {all === 0 ? 0 : (good * 1 + bad * -1) / all}</div>
      <div>positive {all === 0 ? 0 : good / all * 100} %</div>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics stats={{good, neutral, bad}}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)