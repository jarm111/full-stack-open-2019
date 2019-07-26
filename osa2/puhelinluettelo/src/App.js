import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setnameFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    personsService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const showNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const updatePerson = personToUpdate => {
    if (window.confirm(`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = {...personToUpdate, number: newNumber}
      personsService.update(personToUpdate.id, updatedPerson)
        .then(person => {
          setPersons(persons.map(p => p.id !== person.id ? p : person))
          return person
        })
        .then(person => {
          showNotification(`Updated ${person.name}'s number`, 'success')
        })
        .catch(error => {
          showNotification(`Information of ${personToUpdate.name} has already been removed from the server`, 'error')
          setPersons(persons.filter(p => p.id !== personToUpdate.id))
        })
    }
  }

  const addNewPerson = () => {
    personsService.create({name: newName.trim(), number: newNumber.trim()})
      .then(person => {
        setPersons(persons.concat(person))
        return person
      })
      .then(person => {
        showNotification(`Added ${person.name}`, 'success')
      })
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const matchPerson = persons.find(p => p.name.toLowerCase() === newName.trim().toLowerCase())

    matchPerson !== undefined ? updatePerson(matchPerson) : addNewPerson()
  }

  const handleRemovePerson = id => {
    const name = persons.find(p => p.id === id).name

    if (window.confirm(`Delete ${name} ?`)) {
      personsService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .then(() => {
          showNotification(`Removed ${name}`, 'success')
        })
        .catch(error => {
          showNotification(`Information of ${name} has already been removed from the server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameFilterChange = event => setnameFilter(event.target.value)
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} onRemove={handleRemovePerson} />
    </div>
  )
}

export default App