import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h2>{props.course.name}</h2>
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
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

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

const Courses = ({courses}) => (
  <>
    {courses.map(course => <Course key={course.name} course={course}/>)}
  </>
)

const App = () => {
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))