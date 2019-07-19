import React from 'react'

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

export default Courses
