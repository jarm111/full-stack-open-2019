import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setnameFilter ] = useState('')

  useEffect(() => {
    personsService.getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameFilterChange = event => setnameFilter(event.target.value)
  const handleNameChange = event => setNewName(event.target.value.trim)
  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name.toLowerCase() === newName.trim().toLowerCase())) {
      return alert(`${newName} is already added to phonebook`)
    }

    personsService.createPerson({name: newName.trim(), number: newNumber.trim()})
      .then(person => {
        setPersons(persons.concat(person))
      })
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App