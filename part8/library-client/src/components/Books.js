import React, { useState }from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_BOOKS } from '../graphql/queries'
import BooksTable from './BooksTable'

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
      <BooksTable books={filteredBooks}/>
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