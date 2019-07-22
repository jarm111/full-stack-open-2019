import React from 'react'
import Person from './Person'

const Persons = ({persons, nameFilter}) => {
  const returnRows = () => {
    const personsToShow = nameFilter
      ? persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))
      : persons

    return personsToShow.map(person => <Person key={person.name} person={person} />)
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
