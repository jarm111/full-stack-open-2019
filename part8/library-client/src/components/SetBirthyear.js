import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SET_BIRTHYEAR } from '../graphql/mutations'
import { GET_AUTHORS } from '../graphql/queries'

const SetBirthyear = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    // onError: handleError,
    refetchQueries: [{ query: GET_AUTHORS }],
  })

  const handleSelect = ({ target }) => {
    setName(target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    await setBirthYear({
      variables: { name, setBornTo: parseInt(born) }
    })

    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <select value={name} onChange={handleSelect}>
          {authors.map(author => (<option key={author.name} value={author.name}>{author.name}</option>))}
        </select>
        <div>
          born
          <input 
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear
