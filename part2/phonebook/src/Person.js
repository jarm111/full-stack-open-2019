import React from 'react'

const Person = ({person, onRemove}) => {
  const {name, number} = person
  
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button type="button" onClick={onRemove}>delete</button>
      </td>
    </tr>
  )
}

export default Person
