import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SET_BIRTHYEAR } from '../graphql/mutations'
import { GET_AUTHORS } from '../graphql/queries'

const SetBirthyear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    // onError: handleError,
    refetchQueries: [{ query: GET_AUTHORS }],
  })

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('submit birthdate')

    await setBirthYear({
      variables: { name, setBornTo: parseInt(born) }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input 
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
