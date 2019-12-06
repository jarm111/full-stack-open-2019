import React, { useState }from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { GET_BOOKS } from '../graphql/queries'
import { GET_BOOKS_BY_GENRE } from '../graphql/queries'
import BooksTable from './BooksTable'

const Books = () => {
  const [genreSelection, setGenreSelection] = useState('')
  const getBooksQuery = useQuery(GET_BOOKS)
  const [getBooksByGenre, booksByGenreQuery] = useLazyQuery(GET_BOOKS_BY_GENRE)

  if (getBooksQuery.loading || booksByGenreQuery.loading) return <p>Loading...</p>
  if (getBooksQuery.error || booksByGenreQuery.error) return <p>Error!</p>

  const handleGenreSelection = e => {
    const selection = e.target.innerHTML
    setGenreSelection(selection)
    getBooksByGenre({
      variables: { 
        genre: selection
      } 
    })
  }

  const { allBooks } = getBooksQuery.data

  const genreList = allBooks
    .map(book => book.genres)
    .flat()
    .filter((item, i, ar) => ar.indexOf(item) === i)

  const books = genreSelection ? 
    booksByGenreQuery.data.allBooks
    : 
    allBooks

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books}/>
      <div>
        {genreList.map(genre => 
          <button 
            key={genre} 
            onClick={e => handleGenreSelection(e)}>
            {genre}
          </button>)}
        <button onClick={() => setGenreSelection('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books