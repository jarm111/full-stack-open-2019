import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const returnRows = () => persons.map(person => 
    <tr key={person.name}>
      <td>{person.name}</td>
    </tr>
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name.toLowerCase() === newName.trim().toLowerCase())) {
      return alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons.concat({name: newName.trim()}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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