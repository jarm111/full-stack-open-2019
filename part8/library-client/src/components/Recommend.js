import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import usePrevious from '../hooks/usePrevious'
import { GET_FAVGENRE } from '../graphql/queries'
import { GET_BOOKS } from '../graphql/queries'
import BooksTable from './BooksTable'

const Recommend = ({ show }) => {
  const [getFavGenre, favGenreQuery] = useLazyQuery(GET_FAVGENRE, { fetchPolicy: 'no-cache' })
  const booksQuery = useQuery(GET_BOOKS)
  const prevShow = usePrevious(show)

  useEffect(() => {
    if (show && !prevShow) {
      getFavGenre()
    }
  })
  
  if (!show) return null
  if (!favGenreQuery.called || favGenreQuery.loading || booksQuery.loading || !favGenreQuery.data.me) return <p>Loading...</p>
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
