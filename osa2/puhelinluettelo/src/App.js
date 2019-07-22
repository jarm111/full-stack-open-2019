import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setnameFilter ] = useState('')

  const returnRows = () => {
    const personsToShow = nameFilter
      ? persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))
      : persons

    return personsToShow.map(person => 
      <tr key={person.name}>
        <td>{person.name}</td>
        <td>{person.number}</td>
      </tr>
    )
  }

  const handleNameFilterChange = event => setnameFilter(event.target.value)
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name.toLowerCase() === newName.trim().toLowerCase())) {
      return alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons.concat({name: newName.trim(), number: newNumber.trim()}))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with: <input value={nameFilter} onChange={handleNameFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {returnRows()}
        </tbody>
      </table>
    </div>
  )

}

export default App