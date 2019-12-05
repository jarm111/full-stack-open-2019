import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_AUTHORS } from '../graphql/queries'
import SetBirthyear from './SetBirthyear'

const Authors = ({ isAuthenticated }) => {
  const { data, loading, error } = useQuery(GET_AUTHORS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const { allAuthors: authors } = data

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {isAuthenticated && <SetBirthyear authors={authors}/>}
    </div>
  )
}

export default Authors