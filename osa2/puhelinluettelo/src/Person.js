import React from 'react'

const Person = ({person}) => {
  const {name, number} = person
  
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
}

export default Person
