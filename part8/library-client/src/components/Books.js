import React, { useState }from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_BOOKS } from '../graphql/queries'

const Books = (props) => {
  const [genreSelection, setGenreSelection] = useState('')
  const { data, loading, error } = useQuery(GET_BOOKS)

  if (!props.show) return null
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const { allBooks: books } = data
  const genreList = books
    .map(book => book.genres)
    .flat()
    .filter((item, i, ar) => ar.indexOf(item) === i)
  const filteredBooks = genreSelection ? 
    books.filter(book => book.genres.includes(genreSelection)) 
    : 
    books

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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genreList.map(genre => 
          <button 
            key={genre} 
            onClick={e => setGenreSelection(e.target.innerHTML)}>
            {genre}
          </button>)}
        <button onClick={() => setGenreSelection('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books