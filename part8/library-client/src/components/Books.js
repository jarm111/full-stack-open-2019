import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
    }
  }
`

const Books = (props) => {
  const { data, loading, error } = useQuery(GET_BOOKS)

  if (!props.show) return null
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const { allBooks: books } = data

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books