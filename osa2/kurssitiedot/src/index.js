import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Part = (props) => (
  <p>{props.part} {props.exercises}</p>
)

const Content = ({course}) => (
  <>
    {course.parts.map(e => <Part key={e.id} part={e.name} exercises={e.exercises} />)}
  </>
)

const Total = ({course}) => {
  let total = 0;

  for (let i = 0; i < course.parts.length; i++) {
    total += course.parts[i].exercises
  }

  return (
    <p>
      <strong>total of exercises {total}</strong>
    </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))