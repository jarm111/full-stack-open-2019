import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_FAVGENRE } from '../graphql/queries'
import { GET_BOOKS } from '../graphql/queries'
import BooksTable from './BooksTable'

const Recommend = () => {
  const favGenreQuery = useQuery(GET_FAVGENRE)
  const booksQuery = useQuery(GET_BOOKS)
  
  if (favGenreQuery.loading || booksQuery.loading) return <p>Loading...</p>
  if (favGenreQuery.error || booksQuery.error) return <p>Error!</p>

  const { favoriteGenre } = favGenreQuery.data.me
  const { allBooks } = booksQuery.data
  const recommendedBooks = allBooks.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <BooksTable books={recommendedBooks}/>
    </div>
  )
}

export default Recommend
