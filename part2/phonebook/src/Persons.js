import React from 'react'
import Person from './Person'

const Persons = ({persons, nameFilter, onRemove}) => {
  const returnRows = () => {
    const personsToShow = nameFilter
      ? persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))
      : persons

    return personsToShow.map((person, i) => <Person key={person.id} person={person} onRemove={() => onRemove(person.id)}/>)
  }

  return (
    <table>
      <tbody>
        {returnRows()}
      </tbody>
    </table>
  )
}

export default Persons
