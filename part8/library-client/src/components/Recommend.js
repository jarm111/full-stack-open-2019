import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_FAVGENRE } from '../graphql/queries'
import { GET_BOOKS_BY_GENRE } from '../graphql/queries'
import BooksTable from './BooksTable'

const Recommend = () => {
  const { 
    data: { 
      me: { favoriteGenre } = {} 
    } = {}, 
    ...favGenreQuery 
  } = useQuery(GET_FAVGENRE)

  const skip = favoriteGenre === undefined
  const variables = {
    genre: favoriteGenre
  }

  const { 
    data: { 
      allBooks: recommendedBooks = [] 
    } = {}, 
    ...booksQuery 
  } = useQuery(GET_BOOKS_BY_GENRE, { skip, variables })
  
  if (favGenreQuery.loading || booksQuery.loading) return <p>Loading...</p>
  if (favGenreQuery.error || booksQuery.error) return <p>Error!</p>

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <BooksTable books={recommendedBooks}/>
    </div>
  )
}

export default Recommend
